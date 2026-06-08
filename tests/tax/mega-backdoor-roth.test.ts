import { describe, expect, it } from 'vitest';
import {
  calculateMegaBackdoor,
  electiveDeferralLimit,
  section415Limit,
} from '../../lib/tax/mega-backdoor-roth';

describe('section415Limit', () => {
  it('returns correct limit for 2024', () => {
    expect(section415Limit(2024)).toBe(69_000);
  });
  it('returns correct limit for 2025', () => {
    expect(section415Limit(2025)).toBe(70_000);
  });
  it('returns correct limit for 2026', () => {
    expect(section415Limit(2026)).toBe(72_000);
  });
});

describe('electiveDeferralLimit', () => {
  it('returns base limit for under-50', () => {
    expect(electiveDeferralLimit(2025, 30)).toBe(23_500);
    expect(electiveDeferralLimit(2025, 49)).toBe(23_500);
  });
  it('adds catch-up at 50+', () => {
    expect(electiveDeferralLimit(2025, 50)).toBe(23_500 + 7_500);
    expect(electiveDeferralLimit(2025, 55)).toBe(23_500 + 7_500);
  });
  it('applies SECURE 2.0 super catch-up for ages 60–63 in 2025', () => {
    // Super catch-up = max($10k, 150% × $7.5k) = max($10k, $11.25k) = $11,250
    expect(electiveDeferralLimit(2025, 60)).toBe(23_500 + 11_250);
    expect(electiveDeferralLimit(2025, 63)).toBe(23_500 + 11_250);
    // Age 64 reverts to standard catch-up
    expect(electiveDeferralLimit(2025, 64)).toBe(23_500 + 7_500);
  });
  it('does NOT apply super catch-up in 2024 (SECURE 2.0 effective 2025)', () => {
    expect(electiveDeferralLimit(2024, 60)).toBe(23_000 + 7_500);
  });
});

describe('calculateMegaBackdoor — standard cases', () => {
  it('typical FAANG L5: $23,500 elective + $11k match → $35,500 of after-tax room', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      yearsToRetirement: 25,
    });
    expect(r.section415Limit).toBe(70_000);
    expect(r.spaceUsed).toBe(34_500);
    expect(r.afterTaxRoom).toBe(35_500);
    expect(r.megaBackdoorAmount).toBe(35_500);
    expect(r.blockedReason).toBeNull();
  });

  it('blocked: plan does not allow after-tax → 0 amount but room is calculated', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: false,
      planAllowsConversion: true,
      yearsToRetirement: 25,
    });
    expect(r.afterTaxRoom).toBe(35_500);
    expect(r.megaBackdoorAmount).toBe(0);
    expect(r.blockedReason).toBe('plan-no-after-tax');
  });

  it('blocked: plan does not allow in-plan conversion → 0 amount', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: false,
      yearsToRetirement: 25,
    });
    expect(r.afterTaxRoom).toBe(35_500);
    expect(r.megaBackdoorAmount).toBe(0);
    expect(r.blockedReason).toBe('plan-no-conversion');
  });

  it('blocked: §415 already maxed → 0 room', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 30_000,
      employerProfitSharing: 16_500,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
    });
    expect(r.afterTaxRoom).toBe(0);
    expect(r.megaBackdoorAmount).toBe(0);
    expect(r.blockedReason).toBe('no-room');
  });

  it('catch-up eligible (age 50+) does NOT reduce after-tax room', () => {
    // §415 limit includes catch-up implicitly per IRS; the elective limit
    // increases but the after-tax space is what's left of the §415 cap
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 52,
      employeeElectiveDeferral: 31_000, // includes $7.5k catch-up
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
    });
    expect(r.electiveLimit).toBe(31_000);
    expect(r.spaceUsed).toBe(42_000);
    expect(r.afterTaxRoom).toBe(28_000);
  });
});

describe('calculateMegaBackdoor — projections', () => {
  it('one-time $35,500 compounded at 7% for 25 years', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      yearsToRetirement: 25,
      expectedReturnRate: 0.07,
    });
    // 35500 * (1.07)^25 ≈ 192,700
    expect(r.oneTimeProjection).toBeGreaterThan(190_000);
    expect(r.oneTimeProjection).toBeLessThan(196_000);
    // Tax-free growth = projection - principal
    expect(r.taxFreeGrowthOneTime).toBeCloseTo(r.oneTimeProjection - 35_500, 0);
  });

  it('recurring annuity: $35,500/yr at 7% for 25 years ≈ $2.24M', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      yearsToRetirement: 25,
      expectedReturnRate: 0.07,
    });
    // FV = 35500 * ((1.07^25 - 1) / 0.07) ≈ 2,247,000
    expect(r.recurringProjection).toBeGreaterThan(2_200_000);
    expect(r.recurringProjection).toBeLessThan(2_300_000);
  });

  it('zero return rate uses simple multiplication', () => {
    const r = calculateMegaBackdoor({
      taxYear: 2025,
      age: 32,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      yearsToRetirement: 10,
      expectedReturnRate: 0,
    });
    expect(r.oneTimeProjection).toBe(35_500);
    expect(r.recurringProjection).toBe(355_000);
  });
});

describe('calculateMegaBackdoor — input validation', () => {
  it('rejects negative age', () => {
    expect(() =>
      calculateMegaBackdoor({
        taxYear: 2025,
        age: -1,
        employeeElectiveDeferral: 0,
        employerMatch: 0,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
      }),
    ).toThrow();
  });
  it('rejects negative elective deferral', () => {
    expect(() =>
      calculateMegaBackdoor({
        taxYear: 2025,
        age: 30,
        employeeElectiveDeferral: -500,
        employerMatch: 0,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
      }),
    ).toThrow();
  });
  it('rejects negative employer match', () => {
    expect(() =>
      calculateMegaBackdoor({
        taxYear: 2025,
        age: 30,
        employeeElectiveDeferral: 0,
        employerMatch: -100,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
      }),
    ).toThrow();
  });
  it('rejects out-of-range return rate', () => {
    expect(() =>
      calculateMegaBackdoor({
        taxYear: 2025,
        age: 30,
        employeeElectiveDeferral: 0,
        employerMatch: 0,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
        expectedReturnRate: 2, // 200%
      }),
    ).toThrow();
  });
});
