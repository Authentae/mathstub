import { describe, expect, it } from 'vitest';
import { calculateW4Step4c } from '@tax/w4-step-4c';
import { TaxCalcError } from '@tax/types';

describe('calculateW4Step4c — basic shortfall mechanic', () => {
  it('zero shortfall when withholding meets the projected tax owed', () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 60_000,
      withholdingYtdUsd: 40_000,
      projectedRemainingWithholdingUsd: 20_000,
      remainingPayPeriods: 10,
    });
    expect(r.shortfallUsd).toBe(0);
    expect(r.perPeriodExtraUsd).toBe(0);
    expect(r.perPeriodExtraRoundedUsd).toBe(0);
    expect(r.baselineAnnualWithholdingUsd).toBe(60_000);
  });

  it('computes per-period extra to close the shortfall', () => {
    // Owed $80k, withheld $65k → $15k short, 10 periods → $1,500/period
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 80_000,
      withholdingYtdUsd: 50_000,
      projectedRemainingWithholdingUsd: 15_000,
      remainingPayPeriods: 10,
    });
    expect(r.shortfallUsd).toBe(15_000);
    expect(r.perPeriodExtraUsd).toBe(1_500);
    expect(r.perPeriodExtraRoundedUsd).toBe(1_500);
  });

  it('rounds the per-period extra UP to the nearest $5', () => {
    // Owed $74,000, withheld $60,037 → $13,963 short, 18 periods → $775.72/p
    // Rounded UP to nearest $5: $780
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 74_000,
      withholdingYtdUsd: 45_000,
      projectedRemainingWithholdingUsd: 15_037,
      remainingPayPeriods: 18,
    });
    expect(r.shortfallUsd).toBe(13_963);
    expect(r.perPeriodExtraUsd).toBeCloseTo(775.72, 1);
    expect(r.perPeriodExtraRoundedUsd).toBe(780);
  });

  it("respects §6654(e)(1) $1,000 floor — no safe-harbor flag if owed − paid < $1k", () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 60_500,
      withholdingYtdUsd: 50_000,
      projectedRemainingWithholdingUsd: 10_000,
      remainingPayPeriods: 4,
    });
    // Owed 60,500 − Paid 60,000 = 500 < $1,000 floor → branch 'none-needed'
    expect(r.safeHarbor).not.toBeNull();
    expect(r.safeHarbor!.current.branch).toBe('none-needed');
    expect(r.safeHarbor!.current.willClear).toBe(true);
  });
});

describe('calculateW4Step4c — §6654 safe-harbor branching', () => {
  it('current-year 90% branch when no prior-year inputs supplied', () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 100_000,
      withholdingYtdUsd: 60_000,
      projectedRemainingWithholdingUsd: 25_000,
      remainingPayPeriods: 10,
    });
    // Threshold = 100k × 90% = 90k; paid = 85k → short by 5k
    expect(r.safeHarbor!.current.branch).toBe('current-year-90pct');
    expect(r.safeHarbor!.current.thresholdUsd).toBe(90_000);
    expect(r.safeHarbor!.current.willClear).toBe(false);
    expect(r.safeHarbor!.current.shortfallVsThresholdUsd).toBe(5_000);
  });

  it("prior-year 100% branch when prior AGI ≤ $150k", () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 100_000,
      withholdingYtdUsd: 60_000,
      projectedRemainingWithholdingUsd: 25_000,
      remainingPayPeriods: 10,
      priorYearTaxUsd: 70_000,
      priorYearAgiUsd: 140_000, // ≤ $150k → 100% factor
      priorYearFilingStatus: 'single',
    });
    // current-year 90% = 90k; prior-year 100% = 70k → user gets the lower (70k)
    expect(r.safeHarbor!.current.branch).toBe('prior-year-100pct');
    expect(r.safeHarbor!.current.thresholdUsd).toBe(70_000);
    expect(r.safeHarbor!.current.willClear).toBe(true); // paid 85k > 70k
  });

  it("prior-year 110% branch when prior AGI > $150k", () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 100_000,
      withholdingYtdUsd: 60_000,
      projectedRemainingWithholdingUsd: 25_000,
      remainingPayPeriods: 10,
      priorYearTaxUsd: 70_000,
      priorYearAgiUsd: 200_000, // > $150k → 110% factor
      priorYearFilingStatus: 'single',
    });
    // current-year 90% = 90k; prior-year 110% = 77k → user gets the lower (77k)
    expect(r.safeHarbor!.current.branch).toBe('prior-year-110pct');
    expect(r.safeHarbor!.current.thresholdUsd).toBe(77_000);
    expect(r.safeHarbor!.current.willClear).toBe(true); // paid 85k > 77k
  });

  it('MFS uses the $75k threshold instead of $150k', () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 100_000,
      withholdingYtdUsd: 60_000,
      projectedRemainingWithholdingUsd: 25_000,
      remainingPayPeriods: 10,
      priorYearTaxUsd: 70_000,
      priorYearAgiUsd: 100_000, // > $75k MFS threshold → 110% factor
      priorYearFilingStatus: 'mfs',
    });
    expect(r.safeHarbor!.current.branch).toBe('prior-year-110pct');
    expect(r.safeHarbor!.current.thresholdUsd).toBe(77_000);
  });

  it('post-fix snapshot reflects the new paid-in amount with rounded extra', () => {
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 100_000,
      withholdingYtdUsd: 50_000,
      projectedRemainingWithholdingUsd: 15_000,
      remainingPayPeriods: 10,
      // No prior-year inputs → only current-year 90% branch applies
    });
    // Shortfall = 100k − 65k = 35k; per-period = 3,500 (already a $5 multiple)
    expect(r.shortfallUsd).toBe(35_000);
    expect(r.perPeriodExtraRoundedUsd).toBe(3_500);
    // After-fix paid = 65k + 3,500×10 = 100k → clears the 90% threshold
    expect(r.safeHarbor!.afterFix.willClear).toBe(true);
    expect(r.safeHarbor!.afterFix.shortfallVsThresholdUsd).toBe(0);
  });
});

describe('calculateW4Step4c — input validation', () => {
  it('throws on negative projectedAnnualTaxUsd', () => {
    expect(() =>
      calculateW4Step4c({
        projectedAnnualTaxUsd: -100,
        withholdingYtdUsd: 0,
        projectedRemainingWithholdingUsd: 0,
        remainingPayPeriods: 10,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on zero pay periods (cannot apply the fix)', () => {
    expect(() =>
      calculateW4Step4c({
        projectedAnnualTaxUsd: 50_000,
        withholdingYtdUsd: 30_000,
        projectedRemainingWithholdingUsd: 10_000,
        remainingPayPeriods: 0,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on NaN withholding', () => {
    expect(() =>
      calculateW4Step4c({
        projectedAnnualTaxUsd: 50_000,
        withholdingYtdUsd: Number.NaN,
        projectedRemainingWithholdingUsd: 10_000,
        remainingPayPeriods: 10,
      }),
    ).toThrow(TaxCalcError);
  });
});

describe('calculateW4Step4c — realistic equity-comp scenario', () => {
  it('senior engineer with $13k shortfall + 18 remaining biweekly periods', () => {
    // From the Priya case study: $84k projected federal, $71k baseline
    // withholding, 18 biweekly periods left → suggested 4(c) per period
    const r = calculateW4Step4c({
      projectedAnnualTaxUsd: 84_000,
      withholdingYtdUsd: 53_250, // ~75% of 71k baseline already done
      projectedRemainingWithholdingUsd: 17_750, // remaining 25%
      remainingPayPeriods: 18,
      priorYearTaxUsd: 68_000,
      priorYearAgiUsd: 310_000, // MFJ NY, high-income → 110%
      priorYearFilingStatus: 'mfj',
    });
    // Shortfall: 84k − 71k = 13k
    // Per-period: 13k / 18 = $722.22 → rounded up to $725
    expect(r.shortfallUsd).toBe(13_000);
    expect(r.perPeriodExtraUsd).toBeCloseTo(722.22, 1);
    expect(r.perPeriodExtraRoundedUsd).toBe(725);
    // 110% prior-year = 74,800; current paid 71k → 3,800 short → triggers safe-harbor
    expect(r.safeHarbor!.current.branch).toBe('prior-year-110pct');
    expect(r.safeHarbor!.current.thresholdUsd).toBe(74_800);
    expect(r.safeHarbor!.current.willClear).toBe(false);
    expect(r.safeHarbor!.current.shortfallVsThresholdUsd).toBe(3_800);
    // After-fix: 71k + 725×18 = 71k + 13,050 = 84,050 → clears 74,800
    expect(r.safeHarbor!.afterFix.willClear).toBe(true);
  });
});
