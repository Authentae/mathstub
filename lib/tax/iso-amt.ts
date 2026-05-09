import { amtExemption, tentativeMinimumTax } from './amt-brackets';
import {
  federalIncomeTax,
  federalMarginalRate,
  standardDeduction,
} from './federal-brackets';
import { stateMarginalRate } from './state-rates';
import type { IsoAmtInput, IsoAmtResult } from './types';
import { TaxCalcError } from './types';

function validate(input: IsoAmtInput): void {
  const numericFields: Array<[keyof IsoAmtInput, number]> = [
    ['strikePricePerShareUsd', input.strikePricePerShareUsd],
    ['fmvAtExercisePerShareUsd', input.fmvAtExercisePerShareUsd],
    ['sharesExercised', input.sharesExercised],
    ['ytdRegularWagesUsd', input.ytdRegularWagesUsd],
    ['otherTaxableIncomeUsd', input.otherTaxableIncomeUsd],
    ['preTaxDeductionsUsd', input.preTaxDeductionsUsd],
  ];
  for (const [name, value] of numericFields) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.sharesExercised === 0) {
    throw new TaxCalcError('sharesExercised must be greater than 0');
  }
  if (input.fmvAtExercisePerShareUsd === 0) {
    throw new TaxCalcError('fmvAtExercisePerShareUsd must be greater than 0');
  }
  if (
    input.salePricePerShareUsd !== undefined &&
    (!Number.isFinite(input.salePricePerShareUsd) || input.salePricePerShareUsd < 0)
  ) {
    throw new TaxCalcError(`Invalid salePricePerShareUsd: ${input.salePricePerShareUsd}`);
  }
}

/**
 * Compute the federal AMT and state-tax impact of an ISO exercise.
 *
 * Two scenarios:
 *  - `exercise-and-hold`: bargain element = (FMV − strike) × shares becomes an AMT
 *    preference item. AMTI = regular taxable income + bargain element. AMT owed =
 *    max(0, tentative minimum tax − regular federal tax). Generates AMT credit
 *    carryforward equal to the AMT paid (offsets future regular tax in years TMT < regular).
 *  - `exercise-and-sell-same-year`: bargain element converts to ordinary W-2 income
 *    (capped at salePrice − strike if sold below FMV). No AMT preference. Tax delta
 *    is just marginal federal + state on the added ordinary income.
 *
 * Out of scope for v1: multi-state residency, NQDC interactions, AMT credit recapture
 * across multiple ISO years, foreign tax credit interactions, ESPP+ISO same-year stacking.
 */
export function calculateIsoAmt(input: IsoAmtInput): IsoAmtResult {
  validate(input);

  const notes: string[] = [];
  const sharesExercised = input.sharesExercised;
  const bargainElementPerShareUsd = Math.max(
    0,
    input.fmvAtExercisePerShareUsd - input.strikePricePerShareUsd,
  );
  const totalBargainElementUsd = bargainElementPerShareUsd * sharesExercised;
  const cashRequiredToExerciseUsd = input.strikePricePerShareUsd * sharesExercised;

  if (bargainElementPerShareUsd === 0) {
    notes.push('Strike ≥ FMV at exercise — no bargain element, no AMT impact.');
  }

  // Regular taxable income BEFORE the ISO event.
  const grossOrdinaryBefore =
    input.ytdRegularWagesUsd + input.otherTaxableIncomeUsd;
  const regularTaxableIncomeBaseUsd = Math.max(
    0,
    grossOrdinaryBefore - input.preTaxDeductionsUsd - standardDeduction(input.taxYear, input.filingStatus),
  );

  let regularTaxableIncomeAfterUsd = regularTaxableIncomeBaseUsd;
  let additionalOrdinaryIncomeUsd = 0;
  let amtiUsd = regularTaxableIncomeBaseUsd;

  if (input.scenario === 'exercise-and-hold') {
    // Bargain element is an AMT preference; doesn't touch regular taxable income.
    amtiUsd = regularTaxableIncomeBaseUsd + totalBargainElementUsd;
  } else {
    // Disqualifying same-year sale: bargain becomes ordinary income, capped at
    // (sale − strike) × shares if sold below FMV.
    const salePrice = input.salePricePerShareUsd ?? input.fmvAtExercisePerShareUsd;
    const realizedPerShare = Math.max(0, salePrice - input.strikePricePerShareUsd);
    const ordinaryPerShare = Math.min(bargainElementPerShareUsd, realizedPerShare);
    additionalOrdinaryIncomeUsd = ordinaryPerShare * sharesExercised;
    regularTaxableIncomeAfterUsd = regularTaxableIncomeBaseUsd + additionalOrdinaryIncomeUsd;
    amtiUsd = regularTaxableIncomeAfterUsd; // no AMT preference: it reverses out
    if (salePrice < input.strikePricePerShareUsd) {
      notes.push(
        'Sale price below strike — no ordinary income recognized; you have a capital loss instead.',
      );
    }
  }

  const amtExemptionUsd = amtExemption(amtiUsd, input.filingStatus, input.taxYear);
  const tentativeMinimumTaxUsd = tentativeMinimumTax(amtiUsd, input.filingStatus, input.taxYear);
  const regularFederalTaxUsd = federalIncomeTax(
    regularTaxableIncomeAfterUsd,
    input.filingStatus,
    input.taxYear,
  );
  const regularFederalTaxBaselineUsd = federalIncomeTax(
    regularTaxableIncomeBaseUsd,
    input.filingStatus,
    input.taxYear,
  );

  const amtOwedUsd =
    input.scenario === 'exercise-and-hold'
      ? Math.max(0, tentativeMinimumTaxUsd - regularFederalTaxUsd)
      : 0;

  const marginalFederalRate = federalMarginalRate(
    regularTaxableIncomeAfterUsd,
    input.filingStatus,
    input.taxYear,
  );
  const additionalFederalOrdinaryTaxUsd = Math.max(
    0,
    regularFederalTaxUsd - regularFederalTaxBaselineUsd,
  );

  const marginalStateRate = stateMarginalRate(
    input.stateCode,
    regularTaxableIncomeAfterUsd,
    input.filingStatus,
    input.taxYear,
    input.stateOverrideRatePct,
  );
  // State tax: most states do NOT have AMT (CA does, but we model state at marginal × ordinary
  // income added — i.e. state impact only on disqualifying same-year sale). CA AMT modeling is
  // out of scope for v1; flag a note instead.
  const additionalStateTaxUsd = additionalOrdinaryIncomeUsd * marginalStateRate;
  if (input.scenario === 'exercise-and-hold' && input.stateCode === 'CA' && totalBargainElementUsd > 0) {
    notes.push(
      'California has its own AMT (~7%) on ISO bargain element. v1 does not model state AMT — expect additional CA AMT roughly 7% of the bargain element above CA exemption.',
    );
  }

  // AMT credit carryforward equals the AMT paid this year (simplification — IRS actually
  // distinguishes "deferral" vs "exclusion" preferences; ISO bargain is a deferral preference,
  // so the entire AMT generated by ISO carries forward as credit).
  const amtCreditCarryforwardUsd = amtOwedUsd;

  if (input.scenario === 'exercise-and-hold' && amtOwedUsd > 0) {
    notes.push(
      `You generate roughly ${formatUsd(amtCreditCarryforwardUsd)} of AMT credit that carries forward and offsets regular federal tax in future years when your regular tax exceeds your TMT.`,
    );
  }
  if (input.scenario === 'exercise-and-hold' && totalBargainElementUsd > 0 && amtOwedUsd === 0) {
    notes.push(
      'No AMT triggered — your regular federal tax is high enough that TMT does not exceed it. Track this carefully if income changes.',
    );
  }

  const totalTaxIncreaseUsd =
    amtOwedUsd + additionalFederalOrdinaryTaxUsd + additionalStateTaxUsd;

  return {
    scenario: input.scenario,

    bargainElementPerShareUsd,
    totalBargainElementUsd,

    regularTaxableIncomeBaseUsd,
    regularTaxableIncomeAfterUsd,

    amtiUsd,
    amtExemptionUsd,
    tentativeMinimumTaxUsd,
    regularFederalTaxUsd,
    amtOwedUsd,

    additionalOrdinaryIncomeUsd,
    additionalFederalOrdinaryTaxUsd,
    additionalStateTaxUsd,

    amtCreditCarryforwardUsd,

    totalTaxIncreaseUsd,
    cashRequiredToExerciseUsd,
    marginalFederalRatePct: marginalFederalRate * 100,
    marginalStateRatePct: marginalStateRate * 100,

    notes,
  };
}

function formatUsd(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}
