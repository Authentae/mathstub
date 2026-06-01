import { describe, it, expect } from 'vitest';
import { calculateQsbs } from '@tax/qsbs';
import { TaxCalcError } from '@tax/types';

// High earner so the above-gain income sits in the 20% LTCG band + over the
// NIIT threshold — matches the "top 23.8%" framing in the blog post.
const base = {
  filingStatus: 'single' as const,
  taxYear: 2026 as const,
  otherTaxableIncomeUsd: 600_000,
  issuedUnderObbba: true,
};

describe('calculateQsbs — verified effective rates (OBBBA tiers)', () => {
  it('5-year hold = 100% excluded = $0 federal tax (blog example: $5M gain)', () => {
    const r = calculateQsbs({
      ...base,
      proceedsUsd: 5_050_000,
      costBasisUsd: 50_000,
      holdingYears: 5,
    });
    expect(r.gainUsd).toBe(5_000_000);
    expect(r.exclusionPct).toBe(1);
    expect(r.excludedGainUsd).toBe(5_000_000);
    expect(r.federalTaxWithQsbsUsd).toBe(0);
    expect(r.effectiveFederalRatePct).toBe(0);
    // Without QSBS: $5M at 20% LTCG + 3.8% NIIT = 23.8% = $1,190,000 (blog figure).
    expect(r.federalTaxWithoutQsbsUsd).toBeCloseTo(1_190_000, 0);
    expect(r.federalSavingsUsd).toBeCloseTo(1_190_000, 0);
  });

  it('3-year hold = 50% excluded → ~15.9% effective federal rate', () => {
    const r = calculateQsbs({
      ...base,
      proceedsUsd: 1_000_000,
      costBasisUsd: 0,
      holdingYears: 3,
    });
    expect(r.exclusionPct).toBe(0.5);
    expect(r.excludedGainUsd).toBe(500_000);
    expect(r.includedWithinCapUsd).toBe(500_000);
    // included 500k × (28% + 3.8%) = 500k × 31.8% = 159,000 → 15.9% of the $1M gain.
    expect(r.federalTaxWithQsbsUsd).toBeCloseTo(159_000, 0);
    expect(r.effectiveFederalRatePct).toBeCloseTo(15.9, 1);
  });

  it('4-year hold = 75% excluded → ~7.95% effective federal rate', () => {
    const r = calculateQsbs({
      ...base,
      proceedsUsd: 1_000_000,
      costBasisUsd: 0,
      holdingYears: 4,
    });
    expect(r.exclusionPct).toBe(0.75);
    expect(r.includedWithinCapUsd).toBe(250_000);
    // included 250k × 31.8% = 79,500 → 7.95% of $1M.
    expect(r.federalTaxWithQsbsUsd).toBeCloseTo(79_500, 0);
    expect(r.effectiveFederalRatePct).toBeCloseTo(7.95, 2);
  });
});

describe('calculateQsbs — caps and edges', () => {
  it('per-issuer cap is the greater of $15M floor or 10x basis', () => {
    const lowBasis = calculateQsbs({ ...base, proceedsUsd: 20_000_000, costBasisUsd: 100_000, holdingYears: 5 });
    expect(lowBasis.perIssuerCapUsd).toBe(15_000_000); // 10x basis = $1M < $15M floor

    const highBasis = calculateQsbs({ ...base, proceedsUsd: 30_000_000, costBasisUsd: 2_000_000, holdingYears: 5 });
    expect(highBasis.perIssuerCapUsd).toBe(20_000_000); // 10x basis = $20M > $15M floor
  });

  it('gain above the per-issuer cap is taxed as ordinary LTCG', () => {
    // $20M gain, $0 basis → cap $15M. $15M excluded (100%), $5M above cap taxed.
    const r = calculateQsbs({ ...base, proceedsUsd: 20_000_000, costBasisUsd: 0, holdingYears: 5 });
    expect(r.perIssuerCapUsd).toBe(15_000_000);
    expect(r.excludedGainUsd).toBe(15_000_000);
    expect(r.aboveCapGainUsd).toBe(5_000_000);
    // above-cap $5M at 20% + 3.8% = $1,190,000; within-cap fully excluded.
    expect(r.federalTaxWithQsbsUsd).toBeCloseTo(1_190_000, 0);
    expect(r.notes.some((n) => n.includes('per-issuer cap'))).toBe(true);
  });

  it('held under 3 years (OBBBA): no exclusion, taxed as ordinary LTCG', () => {
    const r = calculateQsbs({ ...base, proceedsUsd: 1_000_000, costBasisUsd: 0, holdingYears: 2 });
    expect(r.exclusionPct).toBe(0);
    expect(r.excludedGainUsd).toBe(0);
    // No QSBS benefit → with == without.
    expect(r.federalTaxWithQsbsUsd).toBeCloseTo(r.federalTaxWithoutQsbsUsd, 5);
    expect(r.federalSavingsUsd).toBe(0);
  });

  it('legacy (pre-OBBBA) stock: all-or-nothing at 5 years', () => {
    const fourYr = calculateQsbs({ ...base, issuedUnderObbba: false, proceedsUsd: 1_000_000, costBasisUsd: 0, holdingYears: 4 });
    expect(fourYr.exclusionPct).toBe(0); // 4 years gets nothing under legacy rule
    const fiveYr = calculateQsbs({ ...base, issuedUnderObbba: false, proceedsUsd: 1_000_000, costBasisUsd: 0, holdingYears: 5 });
    expect(fiveYr.exclusionPct).toBe(1);
    expect(fiveYr.perIssuerCapUsd).toBe(10_000_000); // legacy $10M floor
  });

  it('applies a non-conforming state rate to the FULL gain', () => {
    const r = calculateQsbs({ ...base, proceedsUsd: 5_050_000, costBasisUsd: 50_000, holdingYears: 5, stateRate: 0.133 });
    // Federal $0 (fully excluded) but CA taxes all $5M at 13.3%.
    expect(r.federalTaxWithQsbsUsd).toBe(0);
    expect(r.stateTaxUsd).toBeCloseTo(665_000, 0);
  });
});

describe('calculateQsbs — validation', () => {
  it('throws on negative proceeds', () => {
    expect(() => calculateQsbs({ ...base, proceedsUsd: -1, costBasisUsd: 0, holdingYears: 5 })).toThrow(TaxCalcError);
  });
  it('throws on out-of-range state rate', () => {
    expect(() => calculateQsbs({ ...base, proceedsUsd: 1_000_000, costBasisUsd: 0, holdingYears: 5, stateRate: 1.5 })).toThrow(TaxCalcError);
  });
  it('zero gain returns zero tax and zero rate', () => {
    const r = calculateQsbs({ ...base, proceedsUsd: 50_000, costBasisUsd: 50_000, holdingYears: 5 });
    expect(r.gainUsd).toBe(0);
    expect(r.federalTaxWithQsbsUsd).toBe(0);
    expect(r.effectiveFederalRatePct).toBe(0);
  });
});
