/**
 * W-4 Step 4(c) — extra-withholding-per-pay-period calculator.
 *
 * Implements the math behind IRS Form W-4 Line 4(c): "Extra withholding.
 * Enter any additional tax you want withheld each pay period." The line is
 * the single most-effective tool for closing a federal withholding shortfall
 * because withholding (unlike quarterly estimates) is statutorily deemed
 * spread ratably across the year under IRC §6654(g)(1) — meaning a Q4 W-4
 * correction retroactively cures a Q1–Q3 underpayment when computing the
 * §6654 safe harbor.
 *
 * Inputs: projected annual federal tax owed, withholding already done YTD,
 * planned baseline withholding for the rest of the year (i.e. the trajectory
 * without any W-4 change), and remaining pay periods. Optional inputs for
 * §6654 safe-harbor evaluation: prior-year federal tax + prior-year AGI +
 * filing status.
 *
 * Outputs: the shortfall in dollars, the suggested Line 4(c) per-pay-period
 * extra amount that fully closes the shortfall, and a §6654 safe-harbor
 * verdict (current state, post-W-4-fix state, which safe-harbor branch
 * applies).
 *
 * Pure math — no React/Next/DOM imports. Same engine usable from the
 * planned Chrome extension and Anthropic skill ports.
 */

import { TaxCalcError } from './types';

export type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';

export interface W4Step4cInput {
  /**
   * Projected total federal income tax owed for the current year. Get this
   * from the user's last 1040 line + adjustments for current-year vests +
   * bonuses, or from the Mathstub RSU/Bonus shortfall calc output.
   */
  projectedAnnualTaxUsd: number;
  /** Federal income tax withheld year-to-date across all paychecks. */
  withholdingYtdUsd: number;
  /**
   * Projected baseline federal income tax withholding for the remainder of
   * the year — i.e. what payroll will withhold if the user does NOTHING.
   * For most users this is (per-paycheck baseline) × remainingPayPeriods.
   */
  projectedRemainingWithholdingUsd: number;
  /** Pay periods remaining in the year after today. Typical: biweekly = 26/yr. */
  remainingPayPeriods: number;
  /**
   * Optional: total federal tax owed on the prior year's 1040 (Line 24 of
   * the 1040 form for the prior year). Needed to compute the §6654
   * prior-year-based safe harbor.
   */
  priorYearTaxUsd?: number;
  /**
   * Optional: AGI from the prior year's 1040 (Line 11). Determines whether
   * the §6654 high-income 110% factor applies (AGI > $150k) instead of
   * the 100% factor.
   */
  priorYearAgiUsd?: number;
  /**
   * Optional: filing status for the prior year. Affects the high-income
   * AGI threshold ($150k normally; $75k for MFS).
   */
  priorYearFilingStatus?: FilingStatus;
}

export type SafeHarborBranch =
  | 'current-year-90pct'
  | 'prior-year-100pct'
  | 'prior-year-110pct'
  | 'none-needed'
  | 'unknown';

export interface SafeHarborSnapshot {
  /** Dollars Mathstub computes must be paid in (W/H + estimates) by year-end. */
  thresholdUsd: number;
  /** Which §6654 branch defines the threshold. */
  branch: SafeHarborBranch;
  /** Will the user clear the threshold given current trajectory? */
  willClear: boolean;
  /** The minimum dollar shortfall against the threshold (0 if clearing). */
  shortfallVsThresholdUsd: number;
}

export interface W4Step4cResult {
  /** Projected total withholding for the year on the no-change trajectory. */
  baselineAnnualWithholdingUsd: number;
  /** Dollar shortfall against the projected total tax owed (0 if no shortfall). */
  shortfallUsd: number;
  /** Recommended per-pay-period Line 4(c) entry to close the shortfall. */
  perPeriodExtraUsd: number;
  /** Rounded-up per-pay-period entry (nearest $5) — what to actually enter. */
  perPeriodExtraRoundedUsd: number;
  /** §6654 safe-harbor view (only present if prior-year inputs supplied). */
  safeHarbor: {
    /** Snapshot if the user makes NO W-4 change. */
    current: SafeHarborSnapshot;
    /** Snapshot AFTER applying the recommended Line 4(c) entry. */
    afterFix: SafeHarborSnapshot;
  } | null;
}

const SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD_REGULAR = 150_000;
const SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD_MFS = 75_000;
const SAFE_HARBOR_HIGH_INCOME_FACTOR = 1.1; // 110%
const SAFE_HARBOR_REGULAR_FACTOR = 1.0; // 100%
const SAFE_HARBOR_CURRENT_YEAR_FACTOR = 0.9; // 90%
const SAFE_HARBOR_PENALTY_DOLLAR_FLOOR_USD = 1_000; // §6654(e)(1) — no penalty if total tax owed - withholding < $1,000

function validate(input: W4Step4cInput): void {
  const positive: Array<[keyof W4Step4cInput, number | undefined]> = [
    ['projectedAnnualTaxUsd', input.projectedAnnualTaxUsd],
    ['withholdingYtdUsd', input.withholdingYtdUsd],
    ['projectedRemainingWithholdingUsd', input.projectedRemainingWithholdingUsd],
    ['remainingPayPeriods', input.remainingPayPeriods],
  ];
  for (const [name, value] of positive) {
    if (value === undefined || !Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.remainingPayPeriods < 1) {
    throw new TaxCalcError(
      'remainingPayPeriods must be ≥1 — if there are no pay periods left, the W-4 fix cannot be applied this year.',
    );
  }
  if (input.priorYearTaxUsd !== undefined && (!Number.isFinite(input.priorYearTaxUsd) || input.priorYearTaxUsd < 0)) {
    throw new TaxCalcError(`Invalid priorYearTaxUsd: ${input.priorYearTaxUsd}`);
  }
  if (input.priorYearAgiUsd !== undefined && (!Number.isFinite(input.priorYearAgiUsd) || input.priorYearAgiUsd < 0)) {
    throw new TaxCalcError(`Invalid priorYearAgiUsd: ${input.priorYearAgiUsd}`);
  }
}

function highIncomeThresholdFor(status: FilingStatus | undefined): number {
  return status === 'mfs'
    ? SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD_MFS
    : SAFE_HARBOR_HIGH_INCOME_AGI_THRESHOLD_REGULAR;
}

function snapshotForPaidIn(
  paidInUsd: number,
  input: W4Step4cInput,
): SafeHarborSnapshot {
  // The §6654(e)(1) $1,000 floor: if owed - paid < $1,000, no penalty applies
  // regardless of safe-harbor branch.
  const owedNetOfPaid = Math.max(0, input.projectedAnnualTaxUsd - paidInUsd);
  if (owedNetOfPaid < SAFE_HARBOR_PENALTY_DOLLAR_FLOOR_USD) {
    return {
      thresholdUsd: 0,
      branch: 'none-needed',
      willClear: true,
      shortfallVsThresholdUsd: 0,
    };
  }

  // 90% current-year branch is always available.
  const currentYearThreshold =
    input.projectedAnnualTaxUsd * SAFE_HARBOR_CURRENT_YEAR_FACTOR;

  // Prior-year branch only applies if user supplied prior-year inputs.
  let priorYearThreshold = Infinity;
  let priorYearBranch: SafeHarborBranch = 'unknown';
  if (input.priorYearTaxUsd !== undefined) {
    const highIncomeFactor =
      input.priorYearAgiUsd !== undefined &&
      input.priorYearAgiUsd > highIncomeThresholdFor(input.priorYearFilingStatus);
    const factor = highIncomeFactor
      ? SAFE_HARBOR_HIGH_INCOME_FACTOR
      : SAFE_HARBOR_REGULAR_FACTOR;
    priorYearThreshold = input.priorYearTaxUsd * factor;
    priorYearBranch = highIncomeFactor ? 'prior-year-110pct' : 'prior-year-100pct';
  }

  // Pick the LOWER of the two thresholds — taxpayer always uses the
  // less-demanding safe harbor.
  const threshold = Math.min(currentYearThreshold, priorYearThreshold);
  const branch: SafeHarborBranch =
    threshold === currentYearThreshold
      ? 'current-year-90pct'
      : priorYearBranch;
  const willClear = paidInUsd >= threshold;
  const shortfallVsThresholdUsd = willClear ? 0 : threshold - paidInUsd;
  return {
    thresholdUsd: Math.round(threshold),
    branch,
    willClear,
    shortfallVsThresholdUsd: Math.round(shortfallVsThresholdUsd),
  };
}

function roundUpToNearest(value: number, step: number): number {
  return Math.ceil(value / step) * step;
}

export function calculateW4Step4c(input: W4Step4cInput): W4Step4cResult {
  validate(input);

  const baselineAnnualWithholdingUsd =
    input.withholdingYtdUsd + input.projectedRemainingWithholdingUsd;
  const shortfallUsd = Math.max(
    0,
    input.projectedAnnualTaxUsd - baselineAnnualWithholdingUsd,
  );

  const perPeriodExtraUsd =
    shortfallUsd === 0 ? 0 : shortfallUsd / input.remainingPayPeriods;
  const perPeriodExtraRoundedUsd =
    perPeriodExtraUsd === 0 ? 0 : roundUpToNearest(perPeriodExtraUsd, 5);

  const supplyEnoughForSafeHarbor =
    input.priorYearTaxUsd !== undefined ||
    input.projectedAnnualTaxUsd > 0;
  const safeHarbor = supplyEnoughForSafeHarbor
    ? {
        current: snapshotForPaidIn(baselineAnnualWithholdingUsd, input),
        afterFix: snapshotForPaidIn(
          baselineAnnualWithholdingUsd +
            perPeriodExtraRoundedUsd * input.remainingPayPeriods,
          input,
        ),
      }
    : null;

  return {
    baselineAnnualWithholdingUsd: Math.round(baselineAnnualWithholdingUsd),
    shortfallUsd: Math.round(shortfallUsd),
    perPeriodExtraUsd: Math.round(perPeriodExtraUsd * 100) / 100,
    perPeriodExtraRoundedUsd,
    safeHarbor,
  };
}
