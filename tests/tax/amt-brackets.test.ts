import { describe, it, expect } from 'vitest';
import { amtExemption, tentativeMinimumTax, AMT_RATES, amtPhaseoutRate } from '@tax/amt-brackets';
import { TaxCalcError } from '@tax/types';

describe('amtExemption', () => {
  it('returns full exemption below phaseout threshold (single 2025: $88,100)', () => {
    expect(amtExemption(200_000, 'single', 2025)).toBe(88_100);
  });
  it('phases out at 25¢ per $1 above threshold', () => {
    // 2025 single: phaseout starts at 626,350. At AMTI 700,000, reduction = (700k - 626.35k) × 0.25 = 18,412.50
    expect(amtExemption(700_000, 'single', 2025)).toBeCloseTo(88_100 - 18_412.5, 2);
  });
  it('fully phased out at high AMTI', () => {
    // Fully gone at 626,350 + 88,100/0.25 = 626,350 + 352,400 = 978,750
    expect(amtExemption(1_500_000, 'single', 2025)).toBe(0);
  });
  it('mfj has higher exemption + phaseout (2025: $137,000 / $1,252,700)', () => {
    expect(amtExemption(1_000_000, 'mfj', 2025)).toBe(137_000);
  });
  it('throws on negative AMTI', () => {
    expect(() => amtExemption(-1, 'single', 2025)).toThrow(TaxCalcError);
  });
});

describe('tentativeMinimumTax', () => {
  it('returns 0 when AMTI is at or below exemption', () => {
    expect(tentativeMinimumTax(50_000, 'single', 2025)).toBe(0);
  });
  it('applies 26% in the lower band', () => {
    // single 2025, AMTI 200k, exemption 88,100, base = 111,900 < 239,100 → 26% × 111,900 = 29,094
    expect(tentativeMinimumTax(200_000, 'single', 2025)).toBeCloseTo(111_900 * 0.26, 2);
  });
  it('blends 26%/28% across the rate breakpoint', () => {
    // single 2025, AMTI 500k, exemption 88,100, base = 411,900
    // 239,100 × 0.26 + (411,900 − 239,100) × 0.28 = 62,166 + 48,384 = 110,550
    expect(tentativeMinimumTax(500_000, 'single', 2025)).toBeCloseTo(
      239_100 * 0.26 + (411_900 - 239_100) * 0.28,
      2,
    );
  });
  it('phaseout reduces exemption → larger AMT base', () => {
    const t = tentativeMinimumTax(800_000, 'single', 2025);
    // exemption at 800k = 88,100 − (800k − 626.35k) × 0.25 = 88,100 − 43,412.5 = 44,687.5
    // base = 800k − 44,687.5 = 755,312.5
    // 239,100 × 0.26 + (755,312.5 − 239,100) × 0.28
    expect(t).toBeCloseTo(239_100 * 0.26 + (755_312.5 - 239_100) * 0.28, 2);
  });
  it('throws on negative AMTI', () => {
    expect(() => tentativeMinimumTax(-1, 'single', 2025)).toThrow(TaxCalcError);
  });
});

describe('AMT_RATES', () => {
  it('exposes 26%/28% rates', () => {
    expect(AMT_RATES.low).toBe(0.26);
    expect(AMT_RATES.high).toBe(0.28);
  });
});

describe('2026 OBBBA AMT changes', () => {
  it('phaseout rate is 25¢ through 2025, 50¢ from 2026', () => {
    expect(amtPhaseoutRate(2025)).toBe(0.25);
    expect(amtPhaseoutRate(2026)).toBe(0.5);
  });
  it('full exemption below the lowered $500k single phaseout start (2026: $90,100)', () => {
    expect(amtExemption(400_000, 'single', 2026)).toBe(90_100);
  });
  it('phases out at 50¢ per $1 above the OBBBA threshold', () => {
    // single 2026: starts at 500,000. At AMTI 600,000, reduction = 100,000 × 0.5 = 50,000.
    expect(amtExemption(600_000, 'single', 2026)).toBeCloseTo(90_100 - 50_000, 2);
  });
  it('mfj exemption fully phased out far sooner than the pre-OBBBA projection', () => {
    // mfj 2026: start 1,000,000; gone at 1,000,000 + 140,200/0.5 = 1,280,400.
    expect(amtExemption(1_300_000, 'mfj', 2026)).toBe(0);
  });
});
