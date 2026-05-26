/**
 * California Form 540NR work-source apportionment calculator for equity comp.
 *
 * Implements FTB Pub 1004 — equity compensation income is sourced to the
 * state where services were performed during the vesting period, NOT where
 * the holder lives at vest. CA still claims its proportional share of every
 * post-move vest after a CA→elsewhere move.
 *
 * Pure math — no React/Next/DOM imports. Same engine usable from the Chrome
 * extension and Anthropic skill ports.
 *
 * For each vest, the calculator computes:
 *   CA-source income = (months in CA / total vesting-period months) × FMV at vest
 *   CA tax owed     = CA-source income × CA top marginal rate (13.3%)
 *
 * Also computes the §19136 underpayment-penalty estimate and the safe-harbor
 * paid-in amount needed to defeat it.
 */

import { TaxCalcError } from './types';

const CA_TOP_MARGINAL_RATE = 0.133;
const CA_PENALTY_ANNUAL_RATE_APPROX = 0.06; // §19136 penalty hovers ~5-7%; we use 6% as a planning estimate
const SAFE_HARBOR_HIGH_INCOME_FACTOR = 1.1; // 110% — applies when CA AGI > $150k
const SAFE_HARBOR_REGULAR_FACTOR = 1.0;
const SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD = 150_000;

export interface CaVestInput {
  /** Vest label (e.g. "Nov 2024 vest"). */
  label: string;
  /** Months elapsed from grant date to this vest date (the vesting period). */
  vestingPeriodMonths: number;
  /**
   * Months of those vesting-period months that the holder physically
   * performed services in California. ≤ vestingPeriodMonths.
   */
  monthsInCalifornia: number;
  /** FMV of the vest at the vest date (shares × FMV/share). */
  fmvAtVestUsd: number;
}

export interface Ca540NrInput {
  /** All remaining vests to evaluate. The Aug 2024 last-CA vest can also be included. */
  vests: CaVestInput[];
  /**
   * Optional: prior-year CA tax (1040 line equivalent from CA 540 or 540NR).
   * Needed for the §19136 prior-year safe-harbor branch.
   */
  priorYearCaTaxUsd?: number;
  /**
   * Optional: prior-year CA AGI. Determines whether the §19136 110% factor
   * applies (AGI > $150k) instead of the 100% factor.
   */
  priorYearCaAgiUsd?: number;
  /**
   * Approximate days the year-end shortfall would sit unpaid before April
   * 15 — used to estimate the §19136 penalty rate × duration impact.
   * Default 120 days (Sept 15 → Jan 15 typical underpayment window).
   */
  shortfallDaysUnpaid?: number;
}

export interface CaVestBreakdown {
  label: string;
  vestingPeriodMonths: number;
  monthsInCalifornia: number;
  caAllocationPct: number;
  fmvAtVestUsd: number;
  caSourceIncomeUsd: number;
  caTaxOwedUsd: number;
}

export interface Ca540NrResult {
  vestBreakdown: CaVestBreakdown[];
  /** Sum of CA tax across all vests. */
  totalCaTaxUsd: number;
  /** Total CA-source income across all vests (helps verify Form 540NR Schedule CA column E). */
  totalCaSourceIncomeUsd: number;
  /** Effective CA tax rate across the vest portfolio = totalCaTax / totalCaSourceIncome. */
  effectiveCaRate: number;
  /** §19136 safe-harbor target (lower of 90% current or 110% prior-year if applicable). */
  safeHarborThresholdUsd: number;
  /**
   * Estimated penalty if no estimated payments are made and the entire CA
   * liability hits at April 15 filing. Planning estimate only.
   */
  estimatedPenaltyUsd: number;
  /** Recommended Q4 §540-ES estimated payment to satisfy safe harbor. */
  recommendedQ4EstimateUsd: number;
}

function validate(input: Ca540NrInput): void {
  if (!Array.isArray(input.vests) || input.vests.length === 0) {
    throw new TaxCalcError('At least one vest must be provided.');
  }
  for (const v of input.vests) {
    if (!Number.isFinite(v.vestingPeriodMonths) || v.vestingPeriodMonths < 1) {
      throw new TaxCalcError(`Invalid vestingPeriodMonths for ${v.label}: ${v.vestingPeriodMonths}`);
    }
    if (!Number.isFinite(v.monthsInCalifornia) || v.monthsInCalifornia < 0) {
      throw new TaxCalcError(`Invalid monthsInCalifornia for ${v.label}: ${v.monthsInCalifornia}`);
    }
    if (v.monthsInCalifornia > v.vestingPeriodMonths) {
      throw new TaxCalcError(
        `${v.label}: monthsInCalifornia (${v.monthsInCalifornia}) cannot exceed vestingPeriodMonths (${v.vestingPeriodMonths})`,
      );
    }
    if (!Number.isFinite(v.fmvAtVestUsd) || v.fmvAtVestUsd < 0) {
      throw new TaxCalcError(`Invalid fmvAtVestUsd for ${v.label}: ${v.fmvAtVestUsd}`);
    }
  }
}

export function calculateCa540Nr(input: Ca540NrInput): Ca540NrResult {
  validate(input);

  const vestBreakdown: CaVestBreakdown[] = input.vests.map((v) => {
    const caAllocationPct = v.monthsInCalifornia / v.vestingPeriodMonths;
    const caSourceIncomeUsd = caAllocationPct * v.fmvAtVestUsd;
    const caTaxOwedUsd = caSourceIncomeUsd * CA_TOP_MARGINAL_RATE;
    return {
      label: v.label,
      vestingPeriodMonths: v.vestingPeriodMonths,
      monthsInCalifornia: v.monthsInCalifornia,
      caAllocationPct: Math.round(caAllocationPct * 10000) / 10000,
      fmvAtVestUsd: Math.round(v.fmvAtVestUsd),
      caSourceIncomeUsd: Math.round(caSourceIncomeUsd),
      caTaxOwedUsd: Math.round(caTaxOwedUsd),
    };
  });

  const totalCaTaxUsd = vestBreakdown.reduce((acc, v) => acc + v.caTaxOwedUsd, 0);
  const totalCaSourceIncomeUsd = vestBreakdown.reduce((acc, v) => acc + v.caSourceIncomeUsd, 0);
  const effectiveCaRate = totalCaSourceIncomeUsd > 0 ? totalCaTaxUsd / totalCaSourceIncomeUsd : 0;

  // §19136 safe harbor: lower of (a) 90% of current-year CA tax (b) 100%/110% of prior-year
  const currentYearThreshold = totalCaTaxUsd * 0.9;
  let priorYearThreshold = Infinity;
  if (input.priorYearCaTaxUsd !== undefined) {
    const highIncomeFactor =
      input.priorYearCaAgiUsd !== undefined &&
      input.priorYearCaAgiUsd > SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD;
    const factor = highIncomeFactor ? SAFE_HARBOR_HIGH_INCOME_FACTOR : SAFE_HARBOR_REGULAR_FACTOR;
    priorYearThreshold = input.priorYearCaTaxUsd * factor;
  }
  const safeHarborThresholdUsd = Math.min(currentYearThreshold, priorYearThreshold);

  // §19136 penalty estimate: if entire liability hits at filing,
  // penalty ≈ liability × annual_rate × (days_unpaid / 365)
  const daysUnpaid = input.shortfallDaysUnpaid ?? 120;
  const estimatedPenaltyUsd = totalCaTaxUsd * CA_PENALTY_ANNUAL_RATE_APPROX * (daysUnpaid / 365);

  // Q4 540-ES recommendation: bring paid-in to safe-harbor by Jan 15.
  // Assume no prior-year withholding/estimates → user must pay the safe-
  // harbor threshold via Q4 estimate to defeat the penalty.
  const recommendedQ4EstimateUsd = Math.max(0, safeHarborThresholdUsd);

  return {
    vestBreakdown,
    totalCaTaxUsd: Math.round(totalCaTaxUsd),
    totalCaSourceIncomeUsd: Math.round(totalCaSourceIncomeUsd),
    effectiveCaRate: Math.round(effectiveCaRate * 10000) / 10000,
    safeHarborThresholdUsd: Math.round(safeHarborThresholdUsd),
    estimatedPenaltyUsd: Math.round(estimatedPenaltyUsd),
    recommendedQ4EstimateUsd: Math.round(recommendedQ4EstimateUsd),
  };
}
