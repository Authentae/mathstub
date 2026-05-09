import { describe, it, expect } from 'vitest';
import { ltcgMarginalRate, ltcgTax, niitOnGain, NIIT } from '@tax/ltcg-brackets';
import { TaxCalcError } from '@tax/types';

describe('ltcgMarginalRate', () => {
  it('returns 0% in the bottom bracket (single 2025)', () => {
    expect(ltcgMarginalRate(40_000, 'single', 2025)).toBe(0);
  });
  it('returns 15% in the middle bracket', () => {
    expect(ltcgMarginalRate(150_000, 'single', 2025)).toBe(0.15);
  });
  it('returns 20% in the top bracket', () => {
    expect(ltcgMarginalRate(700_000, 'single', 2025)).toBe(0.2);
  });
  it('mfj uses higher thresholds than single', () => {
    expect(ltcgMarginalRate(80_000, 'mfj', 2025)).toBe(0);
    expect(ltcgMarginalRate(80_000, 'single', 2025)).toBe(0.15);
  });
  it('throws on negative income', () => {
    expect(() => ltcgMarginalRate(-1, 'single', 2025)).toThrow(TaxCalcError);
  });
});

describe('ltcgTax', () => {
  it('zero gain → zero tax', () => {
    expect(ltcgTax(100_000, 0, 'single', 2025)).toBe(0);
  });
  it('all-in 15% bracket: $50k gain on $200k ordinary = $7,500', () => {
    expect(ltcgTax(200_000, 50_000, 'single', 2025)).toBeCloseTo(7_500, 2);
  });
  it('gain spans 0%/15% threshold for low earner (single 2025: 0% up to $48,350)', () => {
    // ordinary income 30k, gain 50k → first 18,350 at 0%, remaining 31,650 at 15%
    const tax = ltcgTax(30_000, 50_000, 'single', 2025);
    expect(tax).toBeCloseTo(31_650 * 0.15, 2);
  });
  it('gain spans 15%/20% threshold (single 2025: 20% above $533,400)', () => {
    // ordinary income 500k, gain 100k → first 33,400 at 15%, last 66,600 at 20%
    const tax = ltcgTax(500_000, 100_000, 'single', 2025);
    expect(tax).toBeCloseTo(33_400 * 0.15 + 66_600 * 0.2, 2);
  });
  it('throws on negative ordinary income', () => {
    expect(() => ltcgTax(-1, 100, 'single', 2025)).toThrow(TaxCalcError);
  });
  it('returns 0 for negative gain (loss)', () => {
    expect(ltcgTax(100_000, -5_000, 'single', 2025)).toBe(0);
  });
});

describe('niitOnGain', () => {
  it('zero below threshold (single $200k)', () => {
    expect(niitOnGain(150_000, 30_000, 'single')).toBe(0);
  });
  it('partial — only the portion above threshold is taxed', () => {
    // single threshold $200k, ordinary $180k + gain $50k = $230k MAGI, $30k over.
    // Investment income $50k, taxable amount = min($50k, $30k over) = $30k.
    expect(niitOnGain(180_000, 50_000, 'single')).toBeCloseTo(30_000 * 0.038, 2);
  });
  it('full — all gain taxed when ordinary already above threshold', () => {
    expect(niitOnGain(300_000, 20_000, 'single')).toBeCloseTo(20_000 * 0.038, 2);
  });
  it('mfj has $250k threshold', () => {
    expect(niitOnGain(220_000, 20_000, 'mfj')).toBe(0);
    expect(niitOnGain(240_000, 30_000, 'mfj')).toBeCloseTo(20_000 * 0.038, 2);
  });
  it('zero on negative gain', () => {
    expect(niitOnGain(300_000, -10_000, 'single')).toBe(0);
  });
});

describe('NIIT constants', () => {
  it('exposes 3.8% rate and statutory thresholds', () => {
    expect(NIIT.rate).toBe(0.038);
    expect(NIIT.thresholds.single).toBe(200_000);
    expect(NIIT.thresholds.mfj).toBe(250_000);
    expect(NIIT.thresholds.mfs).toBe(125_000);
  });
});
