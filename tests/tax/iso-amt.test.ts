import { describe, it, expect } from 'vitest';
import { calculateIsoAmt } from '@tax/iso-amt';
import { TaxCalcError, type IsoAmtInput } from '@tax/types';

// Reference: a typical pre-IPO startup ISO exercise.
//   Strike $2, FMV $20, exercising 10,000 options → bargain element $180,000.
//   Single filer with $200k W-2 wages, CA, $23.5k 401k.
const baseInput: IsoAmtInput = {
  taxYear: 2025,
  filingStatus: 'single',
  strikePricePerShareUsd: 2,
  fmvAtExercisePerShareUsd: 20,
  sharesExercised: 10_000,
  ytdRegularWagesUsd: 200_000,
  otherTaxableIncomeUsd: 0,
  preTaxDeductionsUsd: 23_500,
  stateCode: 'CA',
  scenario: 'exercise-and-hold',
};

describe('calculateIsoAmt — exercise-and-hold', () => {
  it('computes bargain element correctly', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.bargainElementPerShareUsd).toBe(18);
    expect(r.totalBargainElementUsd).toBe(180_000);
  });

  it('cash required to exercise = strike × shares', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.cashRequiredToExerciseUsd).toBe(20_000);
  });

  it('AMTI = regular taxable income + bargain element', () => {
    const r = calculateIsoAmt(baseInput);
    // Regular taxable income base: 200k - 23.5k - 15k (single std ded 2025) = 161,500
    expect(r.regularTaxableIncomeBaseUsd).toBeCloseTo(161_500, 2);
    expect(r.amtiUsd).toBeCloseTo(161_500 + 180_000, 2);
  });

  it('AMT > 0 for typical pre-IPO exercise', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.amtOwedUsd).toBeGreaterThan(0);
  });

  it('AMT credit carryforward equals AMT paid', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.amtCreditCarryforwardUsd).toBe(r.amtOwedUsd);
  });

  it('regular taxable income unchanged on exercise-and-hold', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.regularTaxableIncomeAfterUsd).toBe(r.regularTaxableIncomeBaseUsd);
    expect(r.additionalOrdinaryIncomeUsd).toBe(0);
    expect(r.additionalFederalOrdinaryTaxUsd).toBe(0);
    expect(r.additionalStateTaxUsd).toBe(0);
  });

  it('flags CA AMT note for California filers with bargain', () => {
    const r = calculateIsoAmt(baseInput);
    expect(r.notes.some((n) => n.includes('California'))).toBe(true);
  });

  it('no AMT triggered when bargain element is small relative to income', () => {
    const r = calculateIsoAmt({
      ...baseInput,
      sharesExercised: 100, // bargain only 1,800
    });
    expect(r.amtOwedUsd).toBe(0);
    expect(r.notes.some((n) => n.includes('No AMT'))).toBe(true);
  });

  it('zero bargain (strike >= FMV) → no AMT and explanatory note', () => {
    const r = calculateIsoAmt({
      ...baseInput,
      strikePricePerShareUsd: 25,
      fmvAtExercisePerShareUsd: 20,
    });
    expect(r.totalBargainElementUsd).toBe(0);
    expect(r.amtOwedUsd).toBe(0);
    expect(r.notes.some((n) => n.includes('no bargain element'))).toBe(true);
  });

  it('AMT scales up with exercise size', () => {
    const small = calculateIsoAmt({ ...baseInput, sharesExercised: 5_000 });
    const big = calculateIsoAmt({ ...baseInput, sharesExercised: 50_000 });
    expect(big.amtOwedUsd).toBeGreaterThan(small.amtOwedUsd);
  });
});

describe('calculateIsoAmt — exercise-and-sell-same-year', () => {
  it('converts bargain to ordinary income, no AMT', () => {
    const r = calculateIsoAmt({ ...baseInput, scenario: 'exercise-and-sell-same-year' });
    expect(r.amtOwedUsd).toBe(0);
    expect(r.additionalOrdinaryIncomeUsd).toBe(180_000);
    expect(r.additionalFederalOrdinaryTaxUsd).toBeGreaterThan(0);
  });

  it('uses sale price (cap on ordinary) when sold below FMV at exercise', () => {
    // Sold at $10 vs FMV 20: realized = (10−2) × 10k = 80k vs bargain cap 180k → ordinary = 80k
    const r = calculateIsoAmt({
      ...baseInput,
      scenario: 'exercise-and-sell-same-year',
      salePricePerShareUsd: 10,
    });
    expect(r.additionalOrdinaryIncomeUsd).toBe(80_000);
  });

  it('zero ordinary income when sold below strike', () => {
    const r = calculateIsoAmt({
      ...baseInput,
      scenario: 'exercise-and-sell-same-year',
      salePricePerShareUsd: 1, // below strike 2
    });
    expect(r.additionalOrdinaryIncomeUsd).toBe(0);
    expect(r.notes.some((n) => n.includes('Sale price below strike'))).toBe(true);
  });

  it('state tax applies on disqualifying ordinary income (CA)', () => {
    const r = calculateIsoAmt({ ...baseInput, scenario: 'exercise-and-sell-same-year' });
    expect(r.additionalStateTaxUsd).toBeGreaterThan(0);
  });

  it('no state tax in TX', () => {
    const r = calculateIsoAmt({
      ...baseInput,
      scenario: 'exercise-and-sell-same-year',
      stateCode: 'TX',
    });
    expect(r.additionalStateTaxUsd).toBe(0);
  });

  it('totalTaxIncrease lines up with the 3 components', () => {
    const r = calculateIsoAmt({ ...baseInput, scenario: 'exercise-and-sell-same-year' });
    expect(r.totalTaxIncreaseUsd).toBeCloseTo(
      r.amtOwedUsd + r.additionalFederalOrdinaryTaxUsd + r.additionalStateTaxUsd,
      2,
    );
  });
});

describe('calculateIsoAmt — comparison: hold vs same-year-sell', () => {
  it('exercise-and-hold typically generates AMT credit; same-year-sell pays ordinary tax', () => {
    const hold = calculateIsoAmt(baseInput);
    const sameYear = calculateIsoAmt({ ...baseInput, scenario: 'exercise-and-sell-same-year' });
    expect(hold.amtOwedUsd).toBeGreaterThan(0);
    expect(hold.additionalOrdinaryIncomeUsd).toBe(0);
    expect(sameYear.amtOwedUsd).toBe(0);
    expect(sameYear.additionalOrdinaryIncomeUsd).toBe(180_000);
  });
});

describe('calculateIsoAmt — validation', () => {
  it('throws on zero shares', () => {
    expect(() => calculateIsoAmt({ ...baseInput, sharesExercised: 0 })).toThrow(TaxCalcError);
  });
  it('throws on zero FMV', () => {
    expect(() => calculateIsoAmt({ ...baseInput, fmvAtExercisePerShareUsd: 0 })).toThrow(
      TaxCalcError,
    );
  });
  it('throws on negative strike', () => {
    expect(() => calculateIsoAmt({ ...baseInput, strikePricePerShareUsd: -1 })).toThrow(
      TaxCalcError,
    );
  });
  it('throws on negative wages', () => {
    expect(() => calculateIsoAmt({ ...baseInput, ytdRegularWagesUsd: -1 })).toThrow(TaxCalcError);
  });
  it('throws on unknown state', () => {
    expect(() => calculateIsoAmt({ ...baseInput, stateCode: 'ZZ' })).toThrow(TaxCalcError);
  });
  it('throws on negative sale price', () => {
    expect(() =>
      calculateIsoAmt({
        ...baseInput,
        scenario: 'exercise-and-sell-same-year',
        salePricePerShareUsd: -1,
      }),
    ).toThrow(TaxCalcError);
  });
});
