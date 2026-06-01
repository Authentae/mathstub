import { TaxCalcError, type FilingStatus, type TaxYear } from './types';
import { ltcgTax, niitOnGain } from './ltcg-brackets';

/**
 * QSBS (Qualified Small Business Stock) — IRC §1202 gain-exclusion calculator.
 *
 * Computes how much of a startup-stock gain is excluded from federal tax, the
 * tax actually owed, and the savings versus a normal long-term capital gain.
 *
 * KEY RULES (all triple-verified against Tax Foundation, Wilson Sonsini, and
 * The Tax Adviser/RSM before this module was written):
 *
 * Per-issuer cap = greater of (cap floor) or (10 × cost basis), where the
 *   floor is $15,000,000 for stock ISSUED on/after 2025-07-04 (OBBBA) and
 *   $10,000,000 for stock issued before that date.
 *
 * Exclusion % by holding period:
 *   - Stock issued on/after 2025-07-04 (OBBBA tiered): 3y→50%, 4y→75%, 5y+→100%.
 *   - Stock issued before 2025-07-04 (legacy): 5y+→100%, otherwise 0%.
 *     (We model the modern 100%-exclusion era; pre-2010 50%/75% acquisition
 *      vintages are out of scope and noted in the UI.)
 *
 * Tax on the INCLUDED (non-excluded) portion of QSBS gain within the cap is the
 * special 28% §1(h) "28%-rate gain" — NOT the ordinary 15/20% LTCG rate — plus
 * 3.8% NIIT. This is what produces the published effective max rates of
 * 15.9% (3y/50%), 7.95% (4y/75%), and 0% (5y/100%).
 *
 * Gain ABOVE the per-issuer cap is taxed as ordinary long-term capital gain
 * (stacked on the user's other income) plus NIIT.
 *
 * Sources: IRC §1202; IRC §1(h) (28%-rate gain); IRC §1411 (NIIT); OBBBA 2025
 * (Pub. L. 119-21). State conformity varies and is applied only via an optional
 * user-supplied state rate (e.g. California does not conform → 0 exclusion at
 * the state level; the user can model that by entering their state rate, which
 * this module applies to the FULL gain).
 *
 * NO React/Next/DOM imports — pure math, portable.
 */

/** §1(h) "28%-rate gain" applied to the taxable half/quarter of partial QSBS exclusions. */
export const QSBS_28_RATE = 0.28;

const OBBBA_CAP_FLOOR = 15_000_000;
const LEGACY_CAP_FLOOR = 10_000_000;

export interface QsbsInput {
  /** Total sale proceeds for the QSBS shares, USD. */
  proceedsUsd: number;
  /** Your cost basis (what you paid to acquire the shares — strike × shares for exercised options). */
  costBasisUsd: number;
  /** Whole years held since acquiring the SHARES (exercise date for options). */
  holdingYears: number;
  /** True if the stock was issued on/after 2025-07-04 (OBBBA tiered rules + $15M floor). */
  issuedUnderObbba: boolean;
  filingStatus: FilingStatus;
  taxYear: TaxYear;
  /** Your other taxable income — sets where the above-cap LTCG stacks + NIIT threshold. */
  otherTaxableIncomeUsd: number;
  /** Optional state tax rate on the gain (0–1). States like CA don't conform to §1202. */
  stateRate?: number;
}

export interface QsbsResult {
  gainUsd: number;
  /** Per-issuer cap = max(floor, 10 × basis). */
  perIssuerCapUsd: number;
  /** Fraction of the capped gain excluded (0, 0.5, 0.75, or 1). */
  exclusionPct: number;
  /** Gain within the cap that is excluded from federal tax. */
  excludedGainUsd: number;
  /** Gain within the cap that is still taxable (at the 28% rate). */
  includedWithinCapUsd: number;
  /** Gain above the per-issuer cap — taxed as ordinary LTCG. */
  aboveCapGainUsd: number;

  /** Federal tax owed WITH QSBS applied. */
  federalTaxWithQsbsUsd: number;
  /** Federal tax that WOULD be owed with no QSBS (ordinary LTCG + NIIT). */
  federalTaxWithoutQsbsUsd: number;
  /** Federal tax saved by QSBS. */
  federalSavingsUsd: number;

  /** State tax on the full gain (states that don't conform tax it all). */
  stateTaxUsd: number;

  /** Effective federal rate on the gain WITH QSBS (federalTaxWithQsbs / gain). */
  effectiveFederalRatePct: number;
  notes: string[];
}

function exclusionFor(holdingYears: number, issuedUnderObbba: boolean): number {
  if (issuedUnderObbba) {
    if (holdingYears >= 5) return 1;
    if (holdingYears >= 4) return 0.75;
    if (holdingYears >= 3) return 0.5;
    return 0;
  }
  // Legacy (issued before OBBBA): full 5-year hold for 100%, else nothing.
  return holdingYears >= 5 ? 1 : 0;
}

export function calculateQsbs(input: QsbsInput): QsbsResult {
  const {
    proceedsUsd,
    costBasisUsd,
    holdingYears,
    issuedUnderObbba,
    filingStatus,
    taxYear,
    otherTaxableIncomeUsd,
    stateRate = 0,
  } = input;

  if (proceedsUsd < 0 || costBasisUsd < 0) {
    throw new TaxCalcError('Proceeds and cost basis cannot be negative.');
  }
  if (holdingYears < 0 || !Number.isFinite(holdingYears)) {
    throw new TaxCalcError('Holding years must be zero or more.');
  }
  if (otherTaxableIncomeUsd < 0) {
    throw new TaxCalcError('Other taxable income cannot be negative.');
  }
  if (stateRate < 0 || stateRate > 1) {
    throw new TaxCalcError('State rate must be between 0 and 1.');
  }

  const gainUsd = Math.max(0, proceedsUsd - costBasisUsd);
  const capFloor = issuedUnderObbba ? OBBBA_CAP_FLOOR : LEGACY_CAP_FLOOR;
  const perIssuerCapUsd = Math.max(capFloor, 10 * costBasisUsd);

  const exclusionPct = exclusionFor(holdingYears, issuedUnderObbba);

  const cappedGainUsd = Math.min(gainUsd, perIssuerCapUsd);
  const aboveCapGainUsd = Math.max(0, gainUsd - perIssuerCapUsd);

  const excludedGainUsd = cappedGainUsd * exclusionPct;
  const includedWithinCapUsd = cappedGainUsd - excludedGainUsd;

  // Tax WITHOUT QSBS: the whole gain as ordinary long-term capital gain + NIIT.
  const federalTaxWithoutQsbsUsd =
    ltcgTax(otherTaxableIncomeUsd, gainUsd, filingStatus, taxYear) +
    niitOnGain(otherTaxableIncomeUsd, gainUsd, filingStatus);

  // Tax WITH QSBS.
  //   exclusionPct === 0 → the sale does NOT qualify for any §1202 exclusion
  //     (held too short), so it is just an ordinary long-term capital gain —
  //     the special 28% rate does NOT apply. With-QSBS == without-QSBS here.
  //   exclusionPct  >  0 → included-within-cap is "28%-rate gain" (§1(h)(4)) +
  //     NIIT; gain above the per-issuer cap is ordinary LTCG (stacked) + NIIT.
  let federalTaxWithQsbsUsd: number;
  if (exclusionPct === 0) {
    federalTaxWithQsbsUsd = federalTaxWithoutQsbsUsd;
  } else {
    const taxIncludedWithinCap =
      includedWithinCapUsd * QSBS_28_RATE +
      niitOnGain(otherTaxableIncomeUsd, includedWithinCapUsd, filingStatus);
    const taxAboveCap =
      ltcgTax(otherTaxableIncomeUsd, aboveCapGainUsd, filingStatus, taxYear) +
      niitOnGain(otherTaxableIncomeUsd + includedWithinCapUsd, aboveCapGainUsd, filingStatus);
    federalTaxWithQsbsUsd = taxIncludedWithinCap + taxAboveCap;
  }

  const federalSavingsUsd = Math.max(0, federalTaxWithoutQsbsUsd - federalTaxWithQsbsUsd);

  // State: model the conservative case (non-conforming state taxes the full gain).
  const stateTaxUsd = gainUsd * stateRate;

  const effectiveFederalRatePct =
    gainUsd > 0 ? (federalTaxWithQsbsUsd / gainUsd) * 100 : 0;

  const notes: string[] = [];
  if (exclusionPct === 0) {
    notes.push(
      issuedUnderObbba
        ? 'Held under 3 years — no QSBS exclusion yet. Reaching 3 years unlocks 50%.'
        : 'Pre-2025 stock held under 5 years — no QSBS exclusion. Legacy rule is all-or-nothing at 5 years.',
    );
  }
  if (aboveCapGainUsd > 0) {
    notes.push(
      `Gain above the ${perIssuerCapUsd.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })} per-issuer cap is taxed as ordinary long-term capital gain.`,
    );
  }
  if (stateRate > 0) {
    notes.push(
      'State tax is applied to the full gain — many states (e.g. California) do not conform to §1202, so the federal exclusion does not reduce state tax.',
    );
  }

  return {
    gainUsd,
    perIssuerCapUsd,
    exclusionPct,
    excludedGainUsd,
    includedWithinCapUsd,
    aboveCapGainUsd,
    federalTaxWithQsbsUsd,
    federalTaxWithoutQsbsUsd,
    federalSavingsUsd,
    stateTaxUsd,
    effectiveFederalRatePct,
    notes,
  };
}
