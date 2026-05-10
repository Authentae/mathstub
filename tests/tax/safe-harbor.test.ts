import { describe, it, expect } from 'vitest';
import { calculateSafeHarbor, SAFE_HARBOR_RULES } from '@tax/safe-harbor';
import { TaxCalcError, type SafeHarborInput } from '@tax/types';

const baseInput: SafeHarborInput = {
  taxYear: 2025,
  filingStatus: 'single',
  expectedCurrentYearTaxUsd: 80_000,
  priorYearTaxUsd: 60_000,
  priorYearAgiUsd: 200_000,
  expectedAnnualWithholdingUsd: 50_000,
  estimatedPaymentsMadeUsd: 0,
  nextQuarter: 1,
};

describe('calculateSafeHarbor — safe harbor selection', () => {
  it('computes 90% of current year ($72,000) and high-income prior year ($66,000)', () => {
    const r = calculateSafeHarbor(baseInput);
    expect(r.safeHarbor90PctCurrentUsd).toBeCloseTo(72_000, 2);
    expect(r.safeHarborPriorYearUsd).toBeCloseTo(66_000, 2);
    expect(r.highIncomeRuleApplies).toBe(true);
  });

  it('picks the LESSER of the two as the target ($66,000)', () => {
    const r = calculateSafeHarbor(baseInput);
    expect(r.safeHarborTargetUsd).toBeCloseTo(66_000, 2);
  });

  it('uses 100% (not 110%) when prior-year AGI is below $150k', () => {
    const r = calculateSafeHarbor({
      ...baseInput,
      priorYearAgiUsd: 120_000,
    });
    expect(r.highIncomeRuleApplies).toBe(false);
    expect(r.safeHarborPriorYearUsd).toBeCloseTo(60_000, 2);
  });

  it('uses $75k threshold for MFS filers', () => {
    const noHigh = calculateSafeHarbor({
      ...baseInput,
      filingStatus: 'mfs',
      priorYearAgiUsd: 70_000,
    });
    expect(noHigh.highIncomeRuleApplies).toBe(false);

    const high = calculateSafeHarbor({
      ...baseInput,
      filingStatus: 'mfs',
      priorYearAgiUsd: 80_000,
    });
    expect(high.highIncomeRuleApplies).toBe(true);
  });
});

describe('calculateSafeHarbor — coverage analysis', () => {
  it('flags underpayment risk when withholding alone falls below target', () => {
    // Target $66k, withholding $50k → $16k gap, current-year balance $30k > $1k floor.
    const r = calculateSafeHarbor(baseInput);
    expect(r.yearEndGapUsd).toBeCloseTo(16_000, 2);
    expect(r.isUnderpaymentRisk).toBe(true);
  });

  it('clears underpayment risk when withholding meets target', () => {
    const r = calculateSafeHarbor({
      ...baseInput,
      expectedAnnualWithholdingUsd: 70_000,
    });
    expect(r.yearEndGapUsd).toBe(0);
    expect(r.isUnderpaymentRisk).toBe(false);
    expect(r.notes.some((n) => n.includes('on track'))).toBe(true);
  });

  it('clears risk when filing balance is at or below $1,000 floor (§6654)', () => {
    // Current-year tax $9,000, withholding $8,000.
    // 90%-rule = $8,100 → target = $8,100 (high-income prior $11k × 1.1 = $12,100 is higher).
    // Year-end gap = $100, but filing balance = $1,000 ≤ §6654 floor → no penalty.
    const r = calculateSafeHarbor({
      ...baseInput,
      expectedCurrentYearTaxUsd: 9_000,
      expectedAnnualWithholdingUsd: 8_000,
      priorYearTaxUsd: 10_000,
      priorYearAgiUsd: 200_000,
    });
    expect(r.yearEndGapUsd).toBeCloseTo(100, 2);
    expect(r.isUnderpaymentRisk).toBe(false);
    expect(r.notes.some((n) => n.includes('$1,000 §6654 floor'))).toBe(true);
  });
});

describe('calculateSafeHarbor — quarterly schedule', () => {
  it('produces 4 quarters with monotonically increasing cumulative target', () => {
    const r = calculateSafeHarbor(baseInput);
    expect(r.quarters).toHaveLength(4);
    for (let i = 1; i < 4; i++) {
      expect(r.quarters[i]!.cumulativeTargetUsd).toBeGreaterThan(
        r.quarters[i - 1]!.cumulativeTargetUsd,
      );
    }
    // Q4 cumulative target = full safe-harbor target.
    expect(r.quarters[3]!.cumulativeTargetUsd).toBeCloseTo(r.safeHarborTargetUsd, 2);
  });

  it('Q1 cumulative target = 25% of safe-harbor target', () => {
    const r = calculateSafeHarbor(baseInput);
    expect(r.quarters[0]!.cumulativeTargetUsd).toBeCloseTo(16_500, 2); // 66k × 0.25
  });

  it('cumulative paid through Q1 = withholding × 25% (no estimates yet)', () => {
    const r = calculateSafeHarbor(baseInput);
    // 50k × 0.25 = 12.5k
    expect(r.quarters[0]!.cumulativePaidUsd).toBeCloseTo(12_500, 2);
    expect(r.quarters[0]!.cumulativeShortfallUsd).toBeCloseTo(4_000, 2); // 16.5k − 12.5k
  });
});

describe('calculateSafeHarbor — recommended next payment', () => {
  it('Q1 recommendation closes the cumulative gap through Q1', () => {
    // Q1 target $16,500; paid by end Q1 = $12,500 → recommend $4,000.
    const r = calculateSafeHarbor(baseInput);
    expect(r.recommendedNextPaymentUsd).toBeCloseTo(4_000, 2);
  });

  it('Q4 recommendation covers full year-end gap if Q1-Q3 missed', () => {
    const r = calculateSafeHarbor({ ...baseInput, nextQuarter: 4 });
    // Target $66k; withholding through Q4 = $50k; estimates $0 → gap $16k.
    expect(r.recommendedNextPaymentUsd).toBeCloseTo(16_000, 2);
  });

  it('zero recommendation when fully covered by withholding', () => {
    const r = calculateSafeHarbor({
      ...baseInput,
      expectedAnnualWithholdingUsd: 70_000,
    });
    expect(r.recommendedNextPaymentUsd).toBe(0);
  });

  it('credits estimated payments already made when computing next-quarter recommendation', () => {
    // Made $5k in Q1 already, entering Q2.
    // Q2 cumulative target = 66k × 0.5 = 33k.
    // Paid through Q2 = withholding 50k × 0.5 + 5k estimate = 30k.
    // Recommendation = 3k.
    const r = calculateSafeHarbor({
      ...baseInput,
      nextQuarter: 2,
      estimatedPaymentsMadeUsd: 5_000,
    });
    expect(r.recommendedNextPaymentUsd).toBeCloseTo(3_000, 2);
  });
});

describe('calculateSafeHarbor — penalty estimate', () => {
  it('zero penalty when no shortfall', () => {
    const r = calculateSafeHarbor({
      ...baseInput,
      expectedAnnualWithholdingUsd: 70_000,
    });
    expect(r.estimatedPenaltyUsd).toBe(0);
  });

  it('positive penalty estimate when shortfall persists across quarters', () => {
    const r = calculateSafeHarbor(baseInput);
    expect(r.estimatedPenaltyUsd).toBeGreaterThan(0);
  });
});

describe('calculateSafeHarbor — validation', () => {
  it('throws on negative current-year tax', () => {
    expect(() =>
      calculateSafeHarbor({ ...baseInput, expectedCurrentYearTaxUsd: -1 }),
    ).toThrow(TaxCalcError);
  });
  it('throws on negative withholding', () => {
    expect(() =>
      calculateSafeHarbor({ ...baseInput, expectedAnnualWithholdingUsd: -1 }),
    ).toThrow(TaxCalcError);
  });
  it('throws on invalid quarter', () => {
    expect(() =>
      calculateSafeHarbor({ ...baseInput, nextQuarter: 5 as 1 | 2 | 3 | 4 }),
    ).toThrow(TaxCalcError);
  });
});

describe('SAFE_HARBOR_RULES', () => {
  it('exposes statutory factors', () => {
    expect(SAFE_HARBOR_RULES.penaltyThresholdUsd).toBe(1_000);
    expect(SAFE_HARBOR_RULES.currentYearFactor).toBe(0.9);
    expect(SAFE_HARBOR_RULES.priorYearFactorRegular).toBe(1.0);
    expect(SAFE_HARBOR_RULES.priorYearFactorHighIncome).toBe(1.1);
    expect(SAFE_HARBOR_RULES.highIncomeAgiThreshold).toBe(150_000);
    expect(SAFE_HARBOR_RULES.highIncomeAgiThresholdMfs).toBe(75_000);
  });
});
