import { describe, expect, it } from 'vitest';
import {
  calculateBackdoorRoth,
  iraContributionLimit,
  rothPhaseout,
} from '../../lib/tax/backdoor-roth-ira';

describe('iraContributionLimit', () => {
  it('2025 base = $7,000', () => {
    expect(iraContributionLimit(2025, 30)).toBe(7_000);
  });
  it('adds $1,000 catch-up at 50+', () => {
    expect(iraContributionLimit(2025, 50)).toBe(8_000);
    expect(iraContributionLimit(2025, 65)).toBe(8_000);
  });
});

describe('rothPhaseout', () => {
  it('2025 single: $150k–$165k', () => {
    expect(rothPhaseout(2025, 'single')).toEqual({ full: 150_000, none: 165_000 });
  });
  it('2025 MFJ: $236k–$246k', () => {
    expect(rothPhaseout(2025, 'mfj')).toEqual({ full: 236_000, none: 246_000 });
  });
  it('MFS: $0–$10k (always)', () => {
    expect(rothPhaseout(2025, 'mfs')).toEqual({ full: 0, none: 10_000 });
  });
});

describe('calculateBackdoorRoth — eligibility paths', () => {
  it('low MAGI single → direct Roth available, no backdoor needed', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 100_000,
      preTaxIraBalance: 0,
      marginalRate: 0.24,
    });
    expect(r.eligibility).toBe('direct-roth-available');
    expect(r.directRothAllowed).toBe(7_000);
    expect(r.backdoorAmount).toBe(0);
    expect(r.totalRothContribution).toBe(7_000);
  });

  it('high MAGI single → pure backdoor', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 0,
      marginalRate: 0.35,
    });
    expect(r.eligibility).toBe('backdoor-required');
    expect(r.directRothAllowed).toBe(0);
    expect(r.backdoorAmount).toBe(7_000);
    expect(r.totalRothContribution).toBe(7_000);
  });

  it('MAGI in phaseout band → partial direct + topped-up backdoor', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 157_500, // halfway through $150k-$165k phaseout
      preTaxIraBalance: 0,
      marginalRate: 0.32,
    });
    expect(r.eligibility).toBe('partial-direct');
    expect(r.directRothAllowed).toBeGreaterThan(3_000);
    expect(r.directRothAllowed).toBeLessThan(4_000); // ~$3,500
    expect(r.backdoorAmount).toBeGreaterThan(3_000);
    expect(r.totalRothContribution).toBe(7_000);
  });

  it('MFS trapped → near-zero direct', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'mfs',
      age: 30,
      magi: 50_000,
      preTaxIraBalance: 0,
      marginalRate: 0.22,
    });
    expect(r.eligibility).toBe('mfs-trapped');
    expect(r.directRothAllowed).toBe(0);
    expect(r.backdoorAmount).toBe(7_000);
  });
});

describe('calculateBackdoorRoth — pro-rata rule', () => {
  it('no pre-tax IRA balance → no pro-rata tax', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 0,
      marginalRate: 0.35,
    });
    expect(r.proRataTaxablePct).toBe(0);
    expect(r.proRataTaxOwed).toBe(0);
    expect(r.needsBasisIsolation).toBe(false);
  });

  it('large pre-tax IRA balance → most of conversion taxable', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 93_000, // $93k pre-tax + $7k backdoor = $100k total → 93% taxable
      marginalRate: 0.35,
    });
    expect(r.proRataTaxablePct).toBeCloseTo(0.93, 2);
    expect(r.proRataTaxOwed).toBeCloseTo(7_000 * 0.93 * 0.35, 0); // ~$2,279
    expect(r.needsBasisIsolation).toBe(true);
  });

  it('pre-tax balance equals backdoor amount → 50/50', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 7_000,
      marginalRate: 0.32,
    });
    expect(r.proRataTaxablePct).toBeCloseTo(0.5, 2);
    expect(r.proRataTaxOwed).toBeCloseTo(7_000 * 0.5 * 0.32, 0);
    expect(r.needsBasisIsolation).toBe(true);
  });
});

describe('calculateBackdoorRoth — projections', () => {
  it('30-year compounding at 7% on $7k ≈ $53,279', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 0,
      marginalRate: 0.35,
      yearsToRetirement: 30,
      expectedReturnRate: 0.07,
    });
    // 7000 * 1.07^30 ≈ 53,279
    expect(r.oneTimeProjection).toBeGreaterThan(52_000);
    expect(r.oneTimeProjection).toBeLessThan(55_000);
  });

  it('recurring $7k for 30 years at 7% ≈ $660k', () => {
    const r = calculateBackdoorRoth({
      taxYear: 2025,
      filingStatus: 'single',
      age: 30,
      magi: 250_000,
      preTaxIraBalance: 0,
      marginalRate: 0.35,
      yearsToRetirement: 30,
      expectedReturnRate: 0.07,
    });
    // FV annuity = 7000 * ((1.07^30 - 1) / 0.07) ≈ 661,000
    expect(r.recurringProjection).toBeGreaterThan(660_000);
    expect(r.recurringProjection).toBeLessThan(670_000);
  });
});

describe('calculateBackdoorRoth — input validation', () => {
  it('rejects negative MAGI', () => {
    expect(() =>
      calculateBackdoorRoth({
        taxYear: 2025,
        filingStatus: 'single',
        age: 30,
        magi: -100,
        preTaxIraBalance: 0,
        marginalRate: 0.22,
      }),
    ).toThrow();
  });
  it('rejects negative pre-tax IRA balance', () => {
    expect(() =>
      calculateBackdoorRoth({
        taxYear: 2025,
        filingStatus: 'single',
        age: 30,
        magi: 100_000,
        preTaxIraBalance: -1,
        marginalRate: 0.22,
      }),
    ).toThrow();
  });
  it('rejects out-of-range marginal rate', () => {
    expect(() =>
      calculateBackdoorRoth({
        taxYear: 2025,
        filingStatus: 'single',
        age: 30,
        magi: 100_000,
        preTaxIraBalance: 0,
        marginalRate: 0.9,
      }),
    ).toThrow();
  });
});
