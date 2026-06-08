/**
 * Form 6251 multi-source AMT calculator.
 *
 * Computes federal Alternative Minimum Tax from W-2 wages + 1099 self-
 * employment + ISO bargain element + SALT add-back + standard/itemized
 * deduction. Covers the 95% case for tech workers with equity comp who
 * need to know what their full Form 6251 line will read at filing time.
 *
 * What this DOES handle (in scope for v1):
 *  - W-2 wages (includes vested RSU as ordinary W-2 income)
 *  - 1099 self-employment net income (Schedule C output)
 *  - ISO bargain element (Form 6251 line 2i — biggest AMT preference)
 *  - SALT add-back (TCJA-capped $10k SALT deduction added back for AMT;
 *    Form 6251 line 2a portion related to state + local taxes)
 *  - Standard vs itemized deduction
 *  - AMT exemption + phaseout (delegates to amt-brackets.ts)
 *  - 26%/28% AMT rate breakpoint (delegates to tentativeMinimumTax)
 *  - Regular tax via federal-brackets.ts
 *  - Recoverable AMT credit estimate (the ISO-attributable portion only)
 *
 * What this does NOT handle in v1 (acceptable scope cuts for the 95% case):
 *  - Form 6251 line 2b–2h misc adjustments (passive activity, depreciation,
 *    incentive stock options exercised but disposed in same year, etc.)
 *  - State AMT (CA/IA/MN/CT have personal AMT — covered separately by the
 *    Mathstub state-stock-comp calc)
 *  - Foreign tax credit AMT interaction
 *  - NIIT calculation (separate calc)
 *  - LTCG preferential rate within AMT (uses the AMT LTCG capital-gains
 *    rate worksheet on Form 6251 — line 36 series; out of scope for v1
 *    which assumes ordinary-income treatment for simplicity)
 *
 * Pure math — no React/Next/DOM imports. Same engine usable from the
 * Chrome extension and Anthropic skill ports.
 */

import { amtExemption, tentativeMinimumTax } from './amt-brackets';
import { federalIncomeTax, standardDeduction } from './federal-brackets';
import { TaxCalcError, type FilingStatus, type TaxYear } from './types';

export interface Form6251Input {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  /** W-2 Box 1 wages — includes vested RSU + bonus already-recognized ordinary income. */
  w2WagesUsd: number;
  /**
   * 1099 self-employment net income (Schedule C profit). Subject to
   * self-employment tax too, but this calc focuses on AMT — see the
   * Mathstub Quarterly Estimated Tax calc for SE-tax handling.
   */
  selfEmploymentNetUsd: number;
  /**
   * ISO bargain element = (FMV at exercise − strike price) × shares
   * exercised during the year. Treated as an AMT preference item under
   * IRC §56(b)(3) for any ISO held past calendar year-end. If the ISO
   * was disposed of in the same year (disqualifying disposition), the
   * bargain element flows into W-2 wages instead — pass 0 here in that
   * case to avoid double-counting.
   */
  isoBargainElementUsd: number;
  /**
   * Whether the user is taking the standard deduction or itemizing.
   */
  deductionType: 'standard' | 'itemized';
  /**
   * Total itemized deductions (Schedule A). Only used when
   * deductionType === 'itemized'. Defaults to 0.
   */
  itemizedDeductionsUsd?: number;
  /**
   * SALT (state + local + property) tax deduction actually taken on
   * Schedule A. Capped at $10k under TCJA ($5k MFS) — this is the
   * amount added back as AMT preference (Form 6251 line 2a). When the
   * user is taking the standard deduction, SALT add-back is 0 (no
   * SALT was deducted to add back).
   */
  saltDeductionUsd?: number;
  /**
   * Other AMT adjustments — sum of Form 6251 lines 2b through 2j that
   * aren't already captured above. Default 0 for most tech workers.
   */
  otherAmtAdjustmentsUsd?: number;
}

export interface Form6251Result {
  /** Total income (W-2 + 1099). Equivalent to AGI in this simplified model. */
  totalIncomeUsd: number;
  /** Standard or itemized deduction applied. */
  deductionAppliedUsd: number;
  /** Regular taxable income (Form 1040 line 15 equivalent). */
  regularTaxableIncomeUsd: number;
  /** Regular federal income tax (before credits). */
  regularTaxUsd: number;
  /** Form 6251 line 1: regular taxable income before exemptions. */
  amtiBeforeAdjustmentsUsd: number;
  /** Form 6251 line 2a: SALT add-back. */
  saltAddBackUsd: number;
  /** Form 6251 line 2i: ISO bargain element. */
  isoAdjustmentUsd: number;
  /** Form 6251 line 2j: other adjustments. */
  otherAdjustmentsUsd: number;
  /** Form 6251 line 4: AMTI before exemption. */
  amtiUsd: number;
  /** Form 6251 line 5: AMT exemption (post-phaseout). */
  amtExemptionUsd: number;
  /** Form 6251 line 6: AMT taxable income. */
  amtTaxableIncomeUsd: number;
  /** Form 6251 line 7: tentative minimum tax. */
  tentativeMinimumTaxUsd: number;
  /** Form 6251 line 9: AMT owed (TMT − regular tax, floored at 0). */
  amtOwedUsd: number;
  /** Whether AMT applies (line 9 > 0). */
  amtApplies: boolean;
  /**
   * Estimated portion of AMT recoverable in future years via Form 8801.
   * Approximation: the AMT attributable to "deferral" items, primarily
   * the ISO bargain element. Per IRC §53, AMT from exclusion items
   * (SALT, etc.) is NOT recoverable.
   */
  recoverableCreditEstimateUsd: number;
}

function validate(input: Form6251Input): void {
  const fields: Array<[keyof Form6251Input, number | undefined]> = [
    ['w2WagesUsd', input.w2WagesUsd],
    ['selfEmploymentNetUsd', input.selfEmploymentNetUsd],
    ['isoBargainElementUsd', input.isoBargainElementUsd],
    ['itemizedDeductionsUsd', input.itemizedDeductionsUsd],
    ['saltDeductionUsd', input.saltDeductionUsd],
    ['otherAmtAdjustmentsUsd', input.otherAmtAdjustmentsUsd],
  ];
  for (const [name, value] of fields) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
}

export function calculateForm6251(input: Form6251Input): Form6251Result {
  validate(input);

  const totalIncomeUsd = input.w2WagesUsd + input.selfEmploymentNetUsd;

  const deductionAppliedUsd =
    input.deductionType === 'standard'
      ? standardDeduction(input.taxYear, input.filingStatus)
      : input.itemizedDeductionsUsd ?? 0;

  const regularTaxableIncomeUsd = Math.max(0, totalIncomeUsd - deductionAppliedUsd);
  const regularTaxUsd = federalIncomeTax(
    regularTaxableIncomeUsd,
    input.filingStatus,
    input.taxYear,
  );

  // Form 6251 line 1 starts from line 15 of the 1040 — regular taxable income.
  const amtiBeforeAdjustmentsUsd = regularTaxableIncomeUsd;

  // Line 2a — SALT add-back. Only adds back if itemizing (no SALT deducted on standard).
  const saltAddBackUsd =
    input.deductionType === 'itemized' ? input.saltDeductionUsd ?? 0 : 0;

  // Line 2i — ISO bargain element (held past calendar year-end).
  const isoAdjustmentUsd = input.isoBargainElementUsd;

  // Lines 2b–2h (other AMT preference/adjustment items) — passed through from a
  // single user-supplied aggregate rather than itemized line by line.
  const otherAdjustmentsUsd = input.otherAmtAdjustmentsUsd ?? 0;

  // Line 4 — AMTI.
  const amtiUsd =
    amtiBeforeAdjustmentsUsd + saltAddBackUsd + isoAdjustmentUsd + otherAdjustmentsUsd;

  // Line 5 — AMT exemption (post-phaseout).
  const amtExemptionUsd = amtExemption(amtiUsd, input.filingStatus, input.taxYear);

  // Line 6 — AMT taxable income.
  const amtTaxableIncomeUsd = Math.max(0, amtiUsd - amtExemptionUsd);

  // Line 7 — TMT.
  const tentativeMinimumTaxUsd = tentativeMinimumTax(
    amtiUsd,
    input.filingStatus,
    input.taxYear,
  );

  // Line 9 — AMT owed (above regular tax).
  const amtOwedUsd = Math.max(0, tentativeMinimumTaxUsd - regularTaxUsd);

  // Recoverable credit estimate: the ratio of ISO bargain element to total
  // AMT preference items, multiplied by the AMT owed. This is a planning
  // estimate; the actual Form 8801 calculation is more nuanced (it depends
  // on the deferral/exclusion classification line by line and the regular
  // tax in future years).
  const totalAdjustments = saltAddBackUsd + isoAdjustmentUsd + otherAdjustmentsUsd;
  const deferralRatio = totalAdjustments > 0 ? isoAdjustmentUsd / totalAdjustments : 0;
  const recoverableCreditEstimateUsd = Math.round(amtOwedUsd * deferralRatio);

  return {
    totalIncomeUsd: Math.round(totalIncomeUsd),
    deductionAppliedUsd: Math.round(deductionAppliedUsd),
    regularTaxableIncomeUsd: Math.round(regularTaxableIncomeUsd),
    regularTaxUsd: Math.round(regularTaxUsd),
    amtiBeforeAdjustmentsUsd: Math.round(amtiBeforeAdjustmentsUsd),
    saltAddBackUsd: Math.round(saltAddBackUsd),
    isoAdjustmentUsd: Math.round(isoAdjustmentUsd),
    otherAdjustmentsUsd: Math.round(otherAdjustmentsUsd),
    amtiUsd: Math.round(amtiUsd),
    amtExemptionUsd: Math.round(amtExemptionUsd),
    amtTaxableIncomeUsd: Math.round(amtTaxableIncomeUsd),
    tentativeMinimumTaxUsd: Math.round(tentativeMinimumTaxUsd),
    amtOwedUsd: Math.round(amtOwedUsd),
    amtApplies: amtOwedUsd > 0,
    recoverableCreditEstimateUsd,
  };
}
