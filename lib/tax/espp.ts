import { federalMarginalRate, standardDeduction } from './federal-brackets';
import { ltcgMarginalRate, ltcgTax, niitOnGain } from './ltcg-brackets';
import { stateMarginalRate } from './state-rates';
import type { EsppQualifyingInput, EsppQualifyingResult } from './types';
import { TaxCalcError } from './types';

const QUALIFYING_MONTHS_FROM_OFFER = 24;
const QUALIFYING_MONTHS_FROM_PURCHASE = 12;
const LONG_TERM_MONTHS = 12;

function parseIsoDate(s: string, label: string): Date {
  if (typeof s !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
    throw new TaxCalcError(`Invalid ${label}: expected YYYY-MM-DD, got "${s}"`);
  }
  const d = new Date(`${s}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) {
    throw new TaxCalcError(`Invalid ${label}: ${s}`);
  }
  return d;
}

function monthsBetween(from: Date, to: Date): number {
  const years = to.getUTCFullYear() - from.getUTCFullYear();
  const months = to.getUTCMonth() - from.getUTCMonth();
  let total = years * 12 + months;
  if (to.getUTCDate() < from.getUTCDate()) total -= 1;
  return total;
}

function validate(input: EsppQualifyingInput): void {
  const numericFields: Array<[keyof EsppQualifyingInput, number]> = [
    ['offerDateFmvUsd', input.offerDateFmvUsd],
    ['purchaseDateFmvUsd', input.purchaseDateFmvUsd],
    ['discountPct', input.discountPct],
    ['sharesPurchased', input.sharesPurchased],
    ['salePricePerShareUsd', input.salePricePerShareUsd],
    ['ytdRegularWagesUsd', input.ytdRegularWagesUsd],
    ['otherTaxableIncomeUsd', input.otherTaxableIncomeUsd],
    ['preTaxDeductionsUsd', input.preTaxDeductionsUsd],
  ];
  for (const [name, value] of numericFields) {
    if (!Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.discountPct > 50) {
    throw new TaxCalcError(`Discount ${input.discountPct}% exceeds plausible ESPP range`);
  }
  if (input.offerDateFmvUsd === 0 || input.purchaseDateFmvUsd === 0) {
    throw new TaxCalcError('FMV inputs must be greater than 0');
  }
  if (input.sharesPurchased === 0) {
    throw new TaxCalcError('sharesPurchased must be greater than 0');
  }
}

/**
 * Compute the federal/state tax on a qualifying-disposition sale of §423 ESPP shares.
 *
 * Rules used:
 *  - Purchase price per share = lower(offerFMV, purchaseFMV) × (1 - discount).
 *    (Standard §423 lookback. If the plan has no lookback, set both FMVs equal.)
 *  - Qualifying disposition requires >2 years from offer date AND >1 year from purchase date.
 *  - On qualifying sale, ordinary income per share = LESSER of:
 *       (a) offerFMV × discount  (the "discount on offer date"), or
 *       (b) salePrice - purchasePrice  (the actual gain; floored at 0 if loss)
 *    Capital gain per share = salePrice - purchasePrice - ordinaryIncome (LTCG; can be a loss).
 *  - State tax modeled at marginal state rate × (ordinary + LTCG). Most states (incl. CA)
 *    do not give preferential LTCG treatment.
 *  - Federal LTCG taxed across the 0/15/20 brackets stacking on top of projected ordinary
 *    taxable income, plus 3.8% NIIT above MAGI thresholds.
 *
 * The result also includes a disqualifying-disposition comparison so users can see
 * how much the qualifying treatment is saving them.
 */
export function calculateEsppQualifying(input: EsppQualifyingInput): EsppQualifyingResult {
  validate(input);

  const offerDate = parseIsoDate(input.offerDate, 'offerDate');
  const purchaseDate = parseIsoDate(input.purchaseDate, 'purchaseDate');
  const saleDate = parseIsoDate(input.saleDate, 'saleDate');
  if (purchaseDate < offerDate) {
    throw new TaxCalcError('purchaseDate must be on or after offerDate');
  }
  if (saleDate < purchaseDate) {
    throw new TaxCalcError('saleDate must be on or after purchaseDate');
  }

  const monthsFromOffer = monthsBetween(offerDate, saleDate);
  const monthsFromPurchase = monthsBetween(purchaseDate, saleDate);
  const isQualifying =
    monthsFromOffer >= QUALIFYING_MONTHS_FROM_OFFER &&
    monthsFromPurchase >= QUALIFYING_MONTHS_FROM_PURCHASE;

  const discount = input.discountPct / 100;
  const lowerFmv = Math.min(input.offerDateFmvUsd, input.purchaseDateFmvUsd);
  const purchasePricePerShare = lowerFmv * (1 - discount);

  const realizedGainPerShare = input.salePricePerShareUsd - purchasePricePerShare;
  const offerDateDiscountPerShare = input.offerDateFmvUsd * discount;

  // Qualifying ordinary income = lesser of offer-date discount and actual gain (floored at 0).
  const ordinaryIncomePerShareQual = Math.max(
    0,
    Math.min(offerDateDiscountPerShare, realizedGainPerShare),
  );
  const capitalGainPerShareQual = realizedGainPerShare - ordinaryIncomePerShareQual;

  const totalOrdinaryIncomeUsd = ordinaryIncomePerShareQual * input.sharesPurchased;
  const totalCapitalGainUsd = capitalGainPerShareQual * input.sharesPurchased;
  const totalSharesProceedsUsd = input.salePricePerShareUsd * input.sharesPurchased;

  // Projected ordinary taxable income for the year (used to size marginal rates / LTCG bracket).
  const totalGrossOrdinary =
    input.ytdRegularWagesUsd + input.otherTaxableIncomeUsd + totalOrdinaryIncomeUsd;
  const ordinaryTaxableIncomeUsd = Math.max(
    0,
    totalGrossOrdinary - input.preTaxDeductionsUsd - standardDeduction(input.taxYear, input.filingStatus),
  );

  const marginalFederalRate = federalMarginalRate(
    ordinaryTaxableIncomeUsd,
    input.filingStatus,
    input.taxYear,
  );
  const federalOrdinaryTaxUsd = totalOrdinaryIncomeUsd * marginalFederalRate;

  // LTCG portion stacks on top of ordinary taxable income.
  const ltcgGainForFederal = Math.max(0, totalCapitalGainUsd);
  const federalLtcgTaxUsd = ltcgTax(
    ordinaryTaxableIncomeUsd,
    ltcgGainForFederal,
    input.filingStatus,
    input.taxYear,
  );
  const niitUsd = niitOnGain(ordinaryTaxableIncomeUsd, ltcgGainForFederal, input.filingStatus);

  const marginalStateRate = stateMarginalRate(
    input.stateCode,
    ordinaryTaxableIncomeUsd,
    input.filingStatus,
    input.taxYear,
    input.stateOverrideRatePct,
  );
  // Most states tax both ordinary and capital gains as ordinary at the marginal rate.
  // Use sum (gains can be negative — a loss reduces state tax, capped at 0 below).
  const stateTaxableUsd = totalOrdinaryIncomeUsd + totalCapitalGainUsd;
  const stateTaxUsd = Math.max(0, stateTaxableUsd) * marginalStateRate;

  const totalTaxUsd = federalOrdinaryTaxUsd + federalLtcgTaxUsd + niitUsd + stateTaxUsd;

  const basisPaidUsd = purchasePricePerShare * input.sharesPurchased;
  const netProceedsAfterTaxUsd = totalSharesProceedsUsd - basisPaidUsd - totalTaxUsd;

  const marginalLtcgRatePct =
    ltcgMarginalRate(ordinaryTaxableIncomeUsd + ltcgGainForFederal, input.filingStatus, input.taxYear) *
    100;

  // Disqualifying comparison: ordinary income = purchaseDateFMV - purchasePrice (the
  // "bargain element" on purchase date, NOT capped). Remainder of sale proceeds is
  // capital gain — LT if sale > 1y from purchase, else ST. We treat ST as ordinary at
  // the marginal federal rate.
  const disqOrdinaryPerShare = Math.max(
    0,
    input.purchaseDateFmvUsd - purchasePricePerShare,
  );
  // Capital gain in disqualifying = sale price - (purchasePrice + disqOrdinary)
  //                              = sale price - purchaseDateFMV (when bargain element > 0)
  const disqCapitalPerShare = input.salePricePerShareUsd - purchasePricePerShare - disqOrdinaryPerShare;
  const disqOrdinaryTotal = disqOrdinaryPerShare * input.sharesPurchased;
  const disqCapitalTotal = disqCapitalPerShare * input.sharesPurchased;

  const disqOrdinaryTaxableIncome = Math.max(
    0,
    input.ytdRegularWagesUsd +
      input.otherTaxableIncomeUsd +
      disqOrdinaryTotal -
      input.preTaxDeductionsUsd -
      standardDeduction(input.taxYear, input.filingStatus),
  );
  const disqMarginalFederalRate = federalMarginalRate(
    disqOrdinaryTaxableIncome,
    input.filingStatus,
    input.taxYear,
  );
  const disqFedOrdinary = disqOrdinaryTotal * disqMarginalFederalRate;
  const isLongTermFromPurchase = monthsFromPurchase >= LONG_TERM_MONTHS;
  const disqGainForFederal = Math.max(0, disqCapitalTotal);
  const disqFedCapital = isLongTermFromPurchase
    ? ltcgTax(disqOrdinaryTaxableIncome, disqGainForFederal, input.filingStatus, input.taxYear)
    : disqGainForFederal * disqMarginalFederalRate;
  const disqNiit = isLongTermFromPurchase
    ? niitOnGain(disqOrdinaryTaxableIncome, disqGainForFederal, input.filingStatus)
    : 0;
  const disqStateRate = stateMarginalRate(
    input.stateCode,
    disqOrdinaryTaxableIncome,
    input.filingStatus,
    input.taxYear,
    input.stateOverrideRatePct,
  );
  const disqStateTax = Math.max(0, disqOrdinaryTotal + disqCapitalTotal) * disqStateRate;
  const disqualifyingComparisonTaxUsd =
    disqFedOrdinary + disqFedCapital + disqNiit + disqStateTax;

  return {
    isQualifying,
    monthsFromOffer,
    monthsFromPurchase,

    purchasePricePerShareUsd: purchasePricePerShare,
    ordinaryIncomePerShareUsd: ordinaryIncomePerShareQual,
    capitalGainPerShareUsd: capitalGainPerShareQual,

    totalSharesProceedsUsd,
    totalOrdinaryIncomeUsd,
    totalCapitalGainUsd,

    federalOrdinaryTaxUsd,
    federalLtcgTaxUsd,
    niitUsd,
    stateTaxUsd,
    totalTaxUsd,

    netProceedsAfterTaxUsd,
    marginalFederalRatePct: marginalFederalRate * 100,
    marginalLtcgRatePct,
    marginalStateRatePct: marginalStateRate * 100,

    disqualifyingComparisonTaxUsd,
    qualifyingSavingsVsDisqualifyingUsd: disqualifyingComparisonTaxUsd - totalTaxUsd,
  };
}

export const ESPP_QUALIFYING_RULES = {
  monthsFromOffer: QUALIFYING_MONTHS_FROM_OFFER,
  monthsFromPurchase: QUALIFYING_MONTHS_FROM_PURCHASE,
} as const;
