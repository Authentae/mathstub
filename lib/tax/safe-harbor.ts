import type {
  Quarter,
  QuarterlyBreakdown,
  SafeHarborInput,
  SafeHarborResult,
} from './types';
import { TaxCalcError } from './types';

const SAFE_HARBOR_PENALTY_THRESHOLD_USD = 1_000;
const HIGH_INCOME_AGI_THRESHOLD_REGULAR = 150_000;
const HIGH_INCOME_AGI_THRESHOLD_MFS = 75_000;
const HIGH_INCOME_PRIOR_YEAR_FACTOR = 1.1;
const REGULAR_PRIOR_YEAR_FACTOR = 1.0;
const CURRENT_YEAR_FACTOR = 0.9;

// IRS underpayment-penalty rate is the federal short-term rate + 3 percentage points,
// reset quarterly. It was 8% through 2025 but stepped down in 2026: 7% for Q1
// (Jan–Mar) and 6% for Q2 (Apr–Jun). We use 7% as the planning estimate.
// Source: IRS quarterly interest-rate news releases for Q1/Q2 2026 (IRC §6621).
const APPROX_PENALTY_ANNUAL_RATE = 0.07;

const DUE_DATES_LABEL: Record<Quarter, string> = {
  1: 'April 15',
  2: 'June 15',
  3: 'September 15',
  4: 'January 15 (following year)',
};

function validate(input: SafeHarborInput): void {
  const numericFields: Array<[keyof SafeHarborInput, number]> = [
    ['expectedCurrentYearTaxUsd', input.expectedCurrentYearTaxUsd],
    ['priorYearTaxUsd', input.priorYearTaxUsd],
    ['priorYearAgiUsd', input.priorYearAgiUsd],
    ['expectedAnnualWithholdingUsd', input.expectedAnnualWithholdingUsd],
    ['estimatedPaymentsMadeUsd', input.estimatedPaymentsMadeUsd],
  ];
  for (const [name, value] of numericFields) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (![1, 2, 3, 4].includes(input.nextQuarter)) {
    throw new TaxCalcError(`Invalid nextQuarter: ${input.nextQuarter}`);
  }
}

function highIncomeThresholdFor(filingStatus: SafeHarborInput['filingStatus']): number {
  return filingStatus === 'mfs'
    ? HIGH_INCOME_AGI_THRESHOLD_MFS
    : HIGH_INCOME_AGI_THRESHOLD_REGULAR;
}

/**
 * Compute the IRS §6654 underpayment safe-harbor for federal estimated tax,
 * the per-quarter target schedule, and a recommended next payment.
 *
 * Rule (IRC §6654 + IRS Pub 505 ch. 2):
 *  - No penalty if total tax owed at filing < $1,000.
 *  - Otherwise, no penalty if cumulative payments by each quarterly due date are
 *    at least the LESSER of:
 *       (a) 90% × current-year tax, OR
 *       (b) 100% × prior-year tax (110% if prior-year AGI > $150,000;
 *           > $75,000 if MFS).
 *  - Withholding is treated as paid evenly across the year by default
 *    (Reg. §1.6654-2(d)). Estimated payments are credited to the quarter actually paid.
 *
 * V1 simplifications:
 *  - Assumes the user keeps their withholding rate steady through year-end.
 *  - Does NOT model the annualized-income method (Form 2210 Schedule AI), which
 *    benefits people with lumpy income (e.g. RSU vest in Q4).
 *  - Penalty estimate uses a flat 8% annual rate as a planning approximation.
 */
export function calculateSafeHarbor(input: SafeHarborInput): SafeHarborResult {
  validate(input);

  const safeHarbor90PctCurrentUsd =
    input.expectedCurrentYearTaxUsd * CURRENT_YEAR_FACTOR;
  const highIncomeRuleApplies =
    input.priorYearAgiUsd > highIncomeThresholdFor(input.filingStatus);
  const priorYearFactor = highIncomeRuleApplies
    ? HIGH_INCOME_PRIOR_YEAR_FACTOR
    : REGULAR_PRIOR_YEAR_FACTOR;
  const safeHarborPriorYearUsd = input.priorYearTaxUsd * priorYearFactor;

  // The taxpayer must meet the LOWER of the two — whichever is smaller is the
  // minimum total they need paid in to avoid §6654 penalty.
  const safeHarborTargetUsd = Math.min(safeHarbor90PctCurrentUsd, safeHarborPriorYearUsd);

  const totalProjectedPaidUsd =
    input.expectedAnnualWithholdingUsd + input.estimatedPaymentsMadeUsd;
  const yearEndGapUsd = Math.max(0, safeHarborTargetUsd - totalProjectedPaidUsd);

  // Per-quarter cumulative target (target × q/4) and cumulative paid.
  // Withholding pro-rata (q/4 × annual). Estimated payments: assume user has only
  // made payments for quarters BEFORE nextQuarter; treat them as made evenly across
  // those quarters (simplification — actual quarter timing matters but we don't
  // track per-payment dates in v1).
  const quartersBeforeNext = input.nextQuarter - 1;
  const estPaidPerPriorQuarter =
    quartersBeforeNext > 0 ? input.estimatedPaymentsMadeUsd / quartersBeforeNext : 0;

  const quarters: QuarterlyBreakdown[] = ([1, 2, 3, 4] as const).map((q) => {
    const cumulativeTargetUsd = safeHarborTargetUsd * (q / 4);
    const withholdingByQ = input.expectedAnnualWithholdingUsd * (q / 4);
    const estPaidByQ =
      q < input.nextQuarter ? estPaidPerPriorQuarter * q : input.estimatedPaymentsMadeUsd;
    const cumulativePaidUsd = withholdingByQ + estPaidByQ;
    const cumulativeShortfallUsd = Math.max(0, cumulativeTargetUsd - cumulativePaidUsd);
    return {
      quarter: q,
      dueDateLabel: DUE_DATES_LABEL[q],
      cumulativeTargetUsd,
      cumulativePaidUsd,
      cumulativeShortfallUsd,
    };
  });

  // Recommended next payment: bring cumulative-paid up to cumulative-target by end of
  // nextQuarter. Already-paid by then = withholding pro-rata + all estimates already made.
  const targetByNextQ = safeHarborTargetUsd * (input.nextQuarter / 4);
  const paidByNextQBeforeNewPayment =
    input.expectedAnnualWithholdingUsd * (input.nextQuarter / 4) +
    input.estimatedPaymentsMadeUsd;
  const recommendedNextPaymentUsd = Math.max(0, targetByNextQ - paidByNextQBeforeNewPayment);

  const isUnderpaymentRisk =
    yearEndGapUsd > 0 &&
    Math.max(0, input.expectedCurrentYearTaxUsd - totalProjectedPaidUsd) >
      SAFE_HARBOR_PENALTY_THRESHOLD_USD;

  // Approximate penalty: weighted-average underpayment × 8% × time outstanding.
  // We sum quarter-cumulative shortfalls × ~3 months / 12 each (rough). This is a
  // planning estimate, not the IRS Form 2210 calculation.
  const approxPenaltyUsd = quarters.reduce((acc, q) => {
    const monthsOutstanding = (4 - q.quarter + 1) * 3; // remaining months in year for that quarter
    return acc + q.cumulativeShortfallUsd * APPROX_PENALTY_ANNUAL_RATE * (monthsOutstanding / 12);
  }, 0);

  const notes: string[] = [];
  if (highIncomeRuleApplies) {
    notes.push(
      `Prior-year AGI exceeds the high-income threshold ($150,000; $75,000 if MFS), so the prior-year rule is 110% — not the standard 100%.`,
    );
  }
  if (safeHarbor90PctCurrentUsd < safeHarborPriorYearUsd) {
    notes.push(
      'The 90%-of-current-year rule produces the smaller target, so that is your safe-harbor minimum. Use this when current-year tax is lower than last year.',
    );
  } else {
    notes.push(
      'The prior-year rule produces the smaller target, so that is your safe-harbor minimum. This is the most predictable choice when income is rising.',
    );
  }
  if (yearEndGapUsd === 0) {
    notes.push('You are already on track to meet safe harbor through withholding alone.');
  }
  if (
    yearEndGapUsd > 0 &&
    Math.max(0, input.expectedCurrentYearTaxUsd - totalProjectedPaidUsd) <=
      SAFE_HARBOR_PENALTY_THRESHOLD_USD
  ) {
    notes.push(
      'You are below the $1,000 §6654 floor — even though you are below the safe-harbor target, no underpayment penalty applies because your filing balance will be under $1,000.',
    );
  }

  return {
    safeHarbor90PctCurrentUsd,
    safeHarborPriorYearUsd,
    highIncomeRuleApplies,
    safeHarborTargetUsd,
    totalProjectedPaidUsd,
    yearEndGapUsd,
    isUnderpaymentRisk,
    recommendedNextPaymentUsd,
    quarters,
    estimatedPenaltyUsd: approxPenaltyUsd,
    notes,
  };
}

export const SAFE_HARBOR_RULES = {
  penaltyThresholdUsd: SAFE_HARBOR_PENALTY_THRESHOLD_USD,
  highIncomeAgiThreshold: HIGH_INCOME_AGI_THRESHOLD_REGULAR,
  highIncomeAgiThresholdMfs: HIGH_INCOME_AGI_THRESHOLD_MFS,
  currentYearFactor: CURRENT_YEAR_FACTOR,
  priorYearFactorRegular: REGULAR_PRIOR_YEAR_FACTOR,
  priorYearFactorHighIncome: HIGH_INCOME_PRIOR_YEAR_FACTOR,
  approxPenaltyAnnualRate: APPROX_PENALTY_ANNUAL_RATE,
} as const;
