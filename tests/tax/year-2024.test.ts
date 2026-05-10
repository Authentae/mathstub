import { describe, it, expect } from 'vitest';
import {
  federalIncomeTax,
  federalMarginalRate,
  standardDeduction,
} from '@tax/federal-brackets';
import { ssWageBase } from '@tax/fica';
import { ltcgMarginalRate, ltcgTax } from '@tax/ltcg-brackets';
import { amtExemption, tentativeMinimumTax } from '@tax/amt-brackets';

// 2024 actuals come from IRS Rev. Proc. 2023-34 + SSA Fact Sheet 2024.
// These tests lock the prior-year tables so back-testing remains valid.
describe('Tax year 2024 — federal brackets (Rev. Proc. 2023-34)', () => {
  it('standard deduction matches 2024 single ($14,600) and mfj ($29,200)', () => {
    expect(standardDeduction(2024, 'single')).toBe(14_600);
    expect(standardDeduction(2024, 'mfj')).toBe(29_200);
    expect(standardDeduction(2024, 'hoh')).toBe(21_900);
  });

  it('marginal rate at $50k single 2024 = 22% (above $47,150 threshold)', () => {
    expect(federalMarginalRate(50_000, 'single', 2024)).toBeCloseTo(0.22, 4);
  });

  it('marginal rate at $11,599 single 2024 = 10% (just below $11,600)', () => {
    expect(federalMarginalRate(11_599, 'single', 2024)).toBeCloseTo(0.1, 4);
  });

  it('marginal rate at $700k single 2024 = 37%', () => {
    expect(federalMarginalRate(700_000, 'single', 2024)).toBeCloseTo(0.37, 4);
  });

  it('total tax at $50k single 2024 cross-checks against bracket math', () => {
    // 11,600 × 0.10 + (47,150 − 11,600) × 0.12 + (50,000 − 47,150) × 0.22
    // = 1,160 + 4,266 + 627 = 6,053
    expect(federalIncomeTax(50_000, 'single', 2024)).toBeCloseTo(6_053, 2);
  });
});

describe('Tax year 2024 — Social Security wage base', () => {
  it('SSA Fact Sheet 2024: $168,600', () => {
    expect(ssWageBase(2024)).toBe(168_600);
  });
});

describe('Tax year 2024 — LTCG / qualified dividend brackets', () => {
  it('0% bracket caps at $47,025 single', () => {
    expect(ltcgMarginalRate(47_025, 'single', 2024)).toBe(0.15);
    expect(ltcgMarginalRate(47_024, 'single', 2024)).toBe(0);
  });

  it('20% bracket starts at $518,900 single', () => {
    expect(ltcgMarginalRate(518_900, 'single', 2024)).toBe(0.2);
  });

  it('mfj 15% threshold is $94,050', () => {
    expect(ltcgMarginalRate(94_050, 'mfj', 2024)).toBe(0.15);
    expect(ltcgMarginalRate(94_049, 'mfj', 2024)).toBe(0);
  });

  it('LTCG tax: $50k gain on $200k single ordinary = $7,500 (all 15%)', () => {
    expect(ltcgTax(200_000, 50_000, 'single', 2024)).toBeCloseTo(7_500, 2);
  });
});

describe('Tax year 2024 — AMT (Rev. Proc. 2023-34)', () => {
  it('exemption single $85,700; mfj $133,300', () => {
    expect(amtExemption(100_000, 'single', 2024)).toBe(85_700);
    expect(amtExemption(100_000, 'mfj', 2024)).toBe(133_300);
  });

  it('phaseout starts at $609,350 single', () => {
    // At AMTI 700,000 → reduction = (700k − 609.35k) × 0.25 = 22,662.50
    expect(amtExemption(700_000, 'single', 2024)).toBeCloseTo(85_700 - 22_662.5, 2);
  });

  it('TMT 26%/28% breakpoint = $232,600 (single)', () => {
    // single 2024, AMTI 500k, exemption 85,700, base = 414,300
    // 232,600 × 0.26 + (414,300 − 232,600) × 0.28
    expect(tentativeMinimumTax(500_000, 'single', 2024)).toBeCloseTo(
      232_600 * 0.26 + (414_300 - 232_600) * 0.28,
      2,
    );
  });
});
