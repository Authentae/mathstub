import { federalIncomeTax, standardDeduction } from './federal-brackets';
import { tentativeMinimumTax } from './amt-brackets';
import type { FilingStatus, TaxYear } from './types';
import { TaxCalcError } from './types';

const MAX_YEARS = 30;

export interface AmtCreditRecoveryInput {
  startingTaxYear: TaxYear;
  filingStatus: FilingStatus;
  /** Carryforward MTC balance from prior-year Form 8801 line 26. */
  creditBalanceUsd: number;
  /** Projected total income (gross) in the starting tax year. */
  projectedIncomeUsd: number;
  /** Pre-tax deductions taken from gross income before standard deduction. */
  preTaxDeductionsUsd: number;
  /** Optional: annual income growth rate (e.g. 0.04 for 4%). Default 0. */
  annualIncomeGrowthPct?: number;
  /** Maximum number of years to project (default 10, capped at 30). */
  yearsToProject?: number;
}

export interface AmtCreditRecoveryYearRow {
  taxYear: number;
  projectedIncomeUsd: number;
  taxableIncomeUsd: number;
  regularFederalTaxUsd: number;
  tentativeMinimumTaxUsd: number;
  creditUsableThisYearUsd: number;
  creditAppliedUsd: number;
  remainingCreditBalanceUsd: number;
  netFederalTaxUsd: number;
}

export interface AmtCreditRecoveryResult {
  startingCreditBalanceUsd: number;
  schedule: AmtCreditRecoveryYearRow[];
  totalCreditAppliedUsd: number;
  remainingBalanceAfterHorizonUsd: number;
  yearsToFullRecovery: number | null;
  notes: string[];
}

function validate(input: AmtCreditRecoveryInput): void {
  const fields: Array<[keyof AmtCreditRecoveryInput, number]> = [
    ['creditBalanceUsd', input.creditBalanceUsd],
    ['projectedIncomeUsd', input.projectedIncomeUsd],
    ['preTaxDeductionsUsd', input.preTaxDeductionsUsd],
  ];
  for (const [name, value] of fields) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.creditBalanceUsd === 0) {
    throw new TaxCalcError('creditBalanceUsd must be greater than 0');
  }
  const growth = input.annualIncomeGrowthPct ?? 0;
  if (!Number.isFinite(growth) || growth < -0.5 || growth > 1) {
    throw new TaxCalcError(`Invalid annualIncomeGrowthPct: ${growth}`);
  }
}

/**
 * Project the AMT credit (IRC §53 Minimum Tax Credit) recovery schedule.
 *
 * In each future year, the credit usable equals max(0, regular tax − tentative
 * minimum tax). When regular tax > TMT, the difference can be applied against
 * the current-year regular tax up to the carryforward balance.
 *
 * Simplifications:
 *   - No new AMT preference items (e.g. future ISO exercises) generate
 *     additional credit in the projection window.
 *   - State-level AMT (CA Schedule P, NY/MA/MN) is not modeled; the credit
 *     here is federal-only per Form 8801.
 *   - Income is assumed to grow at the specified rate; no bracket creep
 *     from inflation adjustments to the brackets themselves (we use the
 *     starting-year brackets for all projection years as a simplification).
 *   - This is a planning estimate, not tax advice.
 */
export function calculateAmtCreditRecovery(
  input: AmtCreditRecoveryInput,
): AmtCreditRecoveryResult {
  validate(input);

  const {
    startingTaxYear,
    filingStatus,
    creditBalanceUsd,
    projectedIncomeUsd,
    preTaxDeductionsUsd,
  } = input;
  const growth = input.annualIncomeGrowthPct ?? 0;
  const horizon = Math.min(MAX_YEARS, Math.max(1, input.yearsToProject ?? 10));

  let remaining = creditBalanceUsd;
  let income = projectedIncomeUsd;
  let yearsToFullRecovery: number | null = null;
  const schedule: AmtCreditRecoveryYearRow[] = [];

  // Use the starting-year brackets for all projection years as a simplification.
  const stdDed = standardDeduction(startingTaxYear, filingStatus);

  for (let i = 0; i < horizon && remaining > 0; i++) {
    const taxYear = startingTaxYear + i;
    const taxableIncome = Math.max(0, income - preTaxDeductionsUsd - stdDed);
    const regular = federalIncomeTax(taxableIncome, filingStatus, startingTaxYear);
    // For the AMTI base we conservatively use total income minus pre-tax deductions
    // (no standard deduction reduces AMTI). This may overstate TMT slightly but
    // keeps the projection conservative — credit usability err on the lower side.
    const amti = Math.max(0, income - preTaxDeductionsUsd);
    const tmt = tentativeMinimumTax(amti, filingStatus, startingTaxYear);
    const usableThisYear = Math.max(0, regular - tmt);
    const applied = Math.min(usableThisYear, remaining);
    remaining -= applied;
    const netFederalTax = regular - applied;

    schedule.push({
      taxYear,
      projectedIncomeUsd: Math.round(income),
      taxableIncomeUsd: Math.round(taxableIncome),
      regularFederalTaxUsd: Math.round(regular),
      tentativeMinimumTaxUsd: Math.round(tmt),
      creditUsableThisYearUsd: Math.round(usableThisYear),
      creditAppliedUsd: Math.round(applied),
      remainingCreditBalanceUsd: Math.round(remaining),
      netFederalTaxUsd: Math.round(netFederalTax),
    });

    if (remaining <= 0 && yearsToFullRecovery === null) {
      yearsToFullRecovery = i + 1;
    }

    income *= 1 + growth;
  }

  // Fill any remaining horizon years with $0-applied rows for context.
  for (let i = schedule.length; i < horizon; i++) {
    const taxYear = startingTaxYear + i;
    const taxableIncome = Math.max(0, income - preTaxDeductionsUsd - stdDed);
    const regular = federalIncomeTax(taxableIncome, filingStatus, startingTaxYear);
    const amti = Math.max(0, income - preTaxDeductionsUsd);
    const tmt = tentativeMinimumTax(amti, filingStatus, startingTaxYear);
    const usableThisYear = Math.max(0, regular - tmt);
    schedule.push({
      taxYear,
      projectedIncomeUsd: Math.round(income),
      taxableIncomeUsd: Math.round(taxableIncome),
      regularFederalTaxUsd: Math.round(regular),
      tentativeMinimumTaxUsd: Math.round(tmt),
      creditUsableThisYearUsd: Math.round(usableThisYear),
      creditAppliedUsd: 0,
      remainingCreditBalanceUsd: 0,
      netFederalTaxUsd: Math.round(regular),
    });
    income *= 1 + growth;
  }

  const totalCreditApplied = schedule.reduce((s, r) => s + r.creditAppliedUsd, 0);
  const notes: string[] = [];

  if (yearsToFullRecovery === null && remaining > 0) {
    notes.push(
      `Within the ${horizon}-year horizon, you would still have $${Math.round(remaining).toLocaleString()} of unused credit. Increase the horizon or expect higher future income to recover the full balance. AMT credit carries forward indefinitely under IRC §53(d).`,
    );
  } else if (yearsToFullRecovery !== null) {
    notes.push(
      `Projected full recovery in year ${yearsToFullRecovery} (${startingTaxYear + yearsToFullRecovery - 1}). The credit applies as long as regular tax exceeds tentative minimum tax in that year — any year you re-trigger AMT (e.g. another large ISO exercise), recovery pauses.`,
    );
  }

  if (filingStatus === 'mfs') {
    notes.push(
      'Married-filing-separately AMT exemption is half of MFJ. The MTC schedule is correspondingly slower.',
    );
  }

  notes.push(
    'This projection uses the starting-year tax brackets and AMT exemption for all projection years (no inflation adjustment). Real future-year brackets will differ slightly. The estimate is conservative — actual recovery may be modestly faster as brackets index up.',
  );

  notes.push(
    'State-level AMT (CA Schedule P 540, NY, MA, MN) is not modeled. The federal MTC tracked here is reported on IRS Form 8801. Consult a CPA for state-credit interaction.',
  );

  return {
    startingCreditBalanceUsd: creditBalanceUsd,
    schedule,
    totalCreditAppliedUsd: totalCreditApplied,
    remainingBalanceAfterHorizonUsd: Math.round(remaining),
    yearsToFullRecovery,
    notes,
  };
}
