import { TaxCalcError, type FilingStatus, type TaxYear } from './types';
import { federalMarginalRate } from './federal-brackets';
import { ltcgMarginalRate, niitOnGain } from './ltcg-brackets';

/**
 * RSU cost-basis correction — the "$0 cost basis / taxed twice" fix.
 *
 * At vest, the FMV of RSU shares is added to W-2 box 1 as ordinary income
 * (IRC §83(a)) — already taxed. That FMV becomes your per-share cost basis.
 * But under §6045(g) brokers report only the "as-acquired" basis on Form
 * 1099-B box 1e, which for RSUs (acquired for $0 cash) is usually $0. File off
 * the broker's understated basis and the capital gain is overstated, so the
 * vest income gets taxed a second time.
 *
 * The fix is Form 8949 with adjustment code B: report the broker's basis, then
 * a column (g) negative adjustment that raises basis to FMV-at-vest.
 *
 * Sources: IRC §83(a) (FMV at vest = ordinary income / basis); §6045(g)
 * (broker basis reporting); §1411 (NIIT); IRS Form 8949 Instructions (code B);
 * IRS Pub 525, Pub 550, Pub 551.
 */

export type HoldingPeriod = 'long' | 'short';

export interface RsuCostBasisInput {
  /** Number of shares sold. */
  sharesSold: number;
  /** Per-share FMV on the vest date = your correct cost basis per share. */
  fmvAtVestPerShare: number;
  /** Per-share sale price (proceeds per share). */
  salePricePerShare: number;
  /** Cost basis per share the broker reported on 1099-B box 1e (usually 0). */
  brokerReportedBasisPerShare: number;
  /** 'long' if held > 1 year after vest, else 'short'. */
  holdingPeriod: HoldingPeriod;
  filingStatus: FilingStatus;
  taxYear: TaxYear;
  /** Taxable income — picks the capital-gains rate and the NIIT (MAGI proxy). */
  taxableIncomeUsd: number;
  /** Optional state tax rate on the gain (0–1). */
  stateCapGainsRate?: number;
}

export interface RsuCostBasisResult {
  /** Correct total cost basis = shares × FMV at vest. */
  correctCostBasisUsd: number;
  /** Basis the broker reported = shares × broker per-share basis. */
  brokerReportedBasisUsd: number;
  /** Total sale proceeds. */
  proceedsUsd: number;
  /** Gain you'd report off the broker's (understated) basis. */
  reportedGainUsd: number;
  /** Your true capital gain after the correction. */
  correctGainUsd: number;
  /** Form 8949 column (g) adjustment — the over-reported, already-taxed amount. */
  basisAdjustmentUsd: number;
  /** Whether the basis looks understated (double-tax risk). */
  isLikelyDoubleTaxed: boolean;
  /** Capital-gains rate applied (LT bracket, or ST = ordinary marginal). */
  capGainsRate: number;
  /** Federal capital-gains tax you'd overpay without the fix. */
  federalOverpaidUsd: number;
  /** NIIT (§1411) you'd overpay on the wrongly-included gain. */
  niitOverpaidUsd: number;
  /** State tax you'd overpay without the fix. */
  stateOverpaidUsd: number;
  /** Total tax overpaid without the Form 8949 fix. */
  totalOverpaidUsd: number;
}

export function calculateRsuCostBasis(
  input: RsuCostBasisInput,
): RsuCostBasisResult {
  const {
    sharesSold,
    fmvAtVestPerShare,
    salePricePerShare,
    brokerReportedBasisPerShare,
    holdingPeriod,
    filingStatus,
    taxYear,
    taxableIncomeUsd,
    stateCapGainsRate = 0,
  } = input;

  if (sharesSold <= 0) {
    throw new TaxCalcError('Shares sold must be greater than zero.');
  }
  if (
    fmvAtVestPerShare < 0 ||
    salePricePerShare < 0 ||
    brokerReportedBasisPerShare < 0 ||
    taxableIncomeUsd < 0
  ) {
    throw new TaxCalcError('Values cannot be negative.');
  }
  if (stateCapGainsRate < 0 || stateCapGainsRate > 1) {
    throw new TaxCalcError('State rate must be between 0 and 1.');
  }

  const correctCostBasisUsd = sharesSold * fmvAtVestPerShare;
  const brokerReportedBasisUsd = sharesSold * brokerReportedBasisPerShare;
  const proceedsUsd = sharesSold * salePricePerShare;

  const reportedGainUsd = proceedsUsd - brokerReportedBasisUsd;
  const correctGainUsd = proceedsUsd - correctCostBasisUsd;

  // The over-reported (already-taxed) amount = the Form 8949 (g) adjustment.
  // Floored at 0: if the broker over-reported basis, there's nothing to fix here.
  const basisAdjustmentUsd = Math.max(
    0,
    correctCostBasisUsd - brokerReportedBasisUsd,
  );
  const isLikelyDoubleTaxed = basisAdjustmentUsd > 0;

  const capGainsRate =
    holdingPeriod === 'long'
      ? ltcgMarginalRate(taxableIncomeUsd, filingStatus, taxYear)
      : federalMarginalRate(taxableIncomeUsd, filingStatus, taxYear);

  const federalOverpaidUsd = basisAdjustmentUsd * capGainsRate;
  // NIIT (§1411) applies to investment income — both long- and short-term gains.
  const niitOverpaidUsd = niitOnGain(
    taxableIncomeUsd,
    basisAdjustmentUsd,
    filingStatus,
  );
  const stateOverpaidUsd = basisAdjustmentUsd * stateCapGainsRate;
  const totalOverpaidUsd =
    federalOverpaidUsd + niitOverpaidUsd + stateOverpaidUsd;

  return {
    correctCostBasisUsd,
    brokerReportedBasisUsd,
    proceedsUsd,
    reportedGainUsd,
    correctGainUsd,
    basisAdjustmentUsd,
    isLikelyDoubleTaxed,
    capGainsRate,
    federalOverpaidUsd,
    niitOverpaidUsd,
    stateOverpaidUsd,
    totalOverpaidUsd,
  };
}
