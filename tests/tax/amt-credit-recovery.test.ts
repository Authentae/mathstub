import { describe, it, expect } from 'vitest';
import {
  calculateAmtCreditRecovery,
  type AmtCreditRecoveryInput,
} from '@tax/amt-credit-recovery';
import { TaxCalcError } from '@tax/types';

const baseInput: AmtCreditRecoveryInput = {
  startingTaxYear: 2026,
  filingStatus: 'single',
  creditBalanceUsd: 35_000,
  projectedIncomeUsd: 220_000,
  preTaxDeductionsUsd: 23_500,
  annualIncomeGrowthPct: 0.04,
  yearsToProject: 10,
};

describe('calculateAmtCreditRecovery — happy path', () => {
  it('returns a 10-row schedule by default', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    expect(r.schedule).toHaveLength(10);
    expect(r.startingCreditBalanceUsd).toBe(35_000);
  });

  it('schedule rows are chronological from startingTaxYear', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    for (let i = 0; i < r.schedule.length; i++) {
      expect(r.schedule[i]!.taxYear).toBe(2026 + i);
    }
  });

  it('income grows at the specified rate year-over-year', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    // Year 0 = $220,000. Year 1 should be ~ $220k * 1.04 = $228,800.
    expect(r.schedule[0]!.projectedIncomeUsd).toBe(220_000);
    expect(r.schedule[1]!.projectedIncomeUsd).toBeGreaterThan(220_000);
    expect(r.schedule[1]!.projectedIncomeUsd).toBeLessThan(230_000);
    // Compounds — year 5 should be substantially larger than year 0.
    expect(r.schedule[5]!.projectedIncomeUsd).toBeGreaterThan(220_000 * 1.2);
  });

  it('credit balance is monotonically non-increasing', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    for (let i = 1; i < r.schedule.length; i++) {
      expect(r.schedule[i]!.remainingCreditBalanceUsd).toBeLessThanOrEqual(
        r.schedule[i - 1]!.remainingCreditBalanceUsd,
      );
    }
  });

  it('credit applied each year never exceeds usable-this-year or remaining', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    for (const row of r.schedule) {
      expect(row.creditAppliedUsd).toBeLessThanOrEqual(row.creditUsableThisYearUsd);
      // Applied is bounded by the prior remaining balance — applied + remaining <= what was available at start of year.
      expect(row.creditAppliedUsd).toBeGreaterThanOrEqual(0);
    }
  });

  it('netFederalTax equals regular minus applied credit', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    for (const row of r.schedule) {
      // Each field is independently Math.round-ed in the source, so the sum
      // can be off by up to 1 dollar from naive subtraction. Allow that.
      const diff = Math.abs(
        row.netFederalTaxUsd - (row.regularFederalTaxUsd - row.creditAppliedUsd),
      );
      expect(diff).toBeLessThanOrEqual(1);
    }
  });

  it('totalCreditApplied sums to <= starting balance', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    expect(r.totalCreditAppliedUsd).toBeLessThanOrEqual(r.startingCreditBalanceUsd);
  });
});

describe('calculateAmtCreditRecovery — recovery completion', () => {
  it('flags yearsToFullRecovery when credit is fully applied within horizon', () => {
    const r = calculateAmtCreditRecovery({
      ...baseInput,
      creditBalanceUsd: 5_000, // small balance, easy recovery
    });
    expect(r.yearsToFullRecovery).not.toBeNull();
    expect(r.yearsToFullRecovery!).toBeGreaterThanOrEqual(1);
    expect(r.remainingBalanceAfterHorizonUsd).toBe(0);
  });

  it('returns null yearsToFullRecovery when balance exceeds horizon capacity', () => {
    const r = calculateAmtCreditRecovery({
      ...baseInput,
      creditBalanceUsd: 5_000_000, // unrealistically large
      yearsToProject: 3,
    });
    expect(r.yearsToFullRecovery).toBeNull();
    expect(r.remainingBalanceAfterHorizonUsd).toBeGreaterThan(0);
    expect(r.notes.some((n) => n.includes('still have'))).toBe(true);
  });

  it('adds an MFS note for married-filing-separately scenarios', () => {
    const r = calculateAmtCreditRecovery({ ...baseInput, filingStatus: 'mfs' });
    expect(r.notes.some((n) => n.includes('Married-filing-separately'))).toBe(true);
  });
});

describe('calculateAmtCreditRecovery — horizon bounds', () => {
  it('clamps yearsToProject to the [1, 30] range', () => {
    const tooHigh = calculateAmtCreditRecovery({ ...baseInput, yearsToProject: 100 });
    expect(tooHigh.schedule.length).toBe(30);

    const tooLow = calculateAmtCreditRecovery({ ...baseInput, yearsToProject: 0 });
    expect(tooLow.schedule.length).toBe(1);
  });

  it('defaults to 10 years when yearsToProject is omitted', () => {
    const { yearsToProject: _, ...rest } = baseInput;
    const r = calculateAmtCreditRecovery(rest);
    expect(r.schedule.length).toBe(10);
  });

  it('treats annualIncomeGrowthPct=0 as constant income across years', () => {
    const r = calculateAmtCreditRecovery({
      ...baseInput,
      annualIncomeGrowthPct: 0,
    });
    for (const row of r.schedule) {
      expect(row.projectedIncomeUsd).toBe(220_000);
    }
  });
});

describe('calculateAmtCreditRecovery — validation', () => {
  it('throws on zero credit balance', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, creditBalanceUsd: 0 }),
    ).toThrow(TaxCalcError);
  });

  it('throws on negative credit balance', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, creditBalanceUsd: -1 }),
    ).toThrow(TaxCalcError);
  });

  it('throws on negative projected income', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, projectedIncomeUsd: -1 }),
    ).toThrow(TaxCalcError);
  });

  it('throws on non-finite credit balance (Infinity)', () => {
    expect(() =>
      calculateAmtCreditRecovery({
        ...baseInput,
        creditBalanceUsd: Number.POSITIVE_INFINITY,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on non-finite credit balance (NaN)', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, creditBalanceUsd: Number.NaN }),
    ).toThrow(TaxCalcError);
  });

  it('throws on extreme growth rate (>100%)', () => {
    expect(() =>
      calculateAmtCreditRecovery({
        ...baseInput,
        annualIncomeGrowthPct: 2,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on extreme negative growth rate (<-50%)', () => {
    expect(() =>
      calculateAmtCreditRecovery({
        ...baseInput,
        annualIncomeGrowthPct: -0.75,
      }),
    ).toThrow(TaxCalcError);
  });

  it('accepts zero growth rate without throwing', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, annualIncomeGrowthPct: 0 }),
    ).not.toThrow();
  });

  it('accepts maximum allowed positive growth (100%)', () => {
    expect(() =>
      calculateAmtCreditRecovery({ ...baseInput, annualIncomeGrowthPct: 1 }),
    ).not.toThrow();
  });
});

describe('calculateAmtCreditRecovery — filing status variants', () => {
  it.each(['single', 'mfj', 'mfs', 'hoh'] as const)(
    'returns a valid schedule for filing status %s',
    (filingStatus) => {
      const r = calculateAmtCreditRecovery({ ...baseInput, filingStatus });
      expect(r.schedule.length).toBeGreaterThan(0);
      expect(r.startingCreditBalanceUsd).toBe(35_000);
      // Regular tax should be positive for each filing status at $220k income.
      expect(r.schedule[0]!.regularFederalTaxUsd).toBeGreaterThan(0);
    },
  );
});

describe('calculateAmtCreditRecovery — notes', () => {
  it('always includes the bracket-projection caveat', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    expect(r.notes.some((n) => n.includes('starting-year tax brackets'))).toBe(true);
  });

  it('always includes the state AMT caveat', () => {
    const r = calculateAmtCreditRecovery(baseInput);
    expect(r.notes.some((n) => n.includes('State-level AMT'))).toBe(true);
  });
});
