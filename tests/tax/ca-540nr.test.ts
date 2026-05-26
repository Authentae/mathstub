import { describe, expect, it } from 'vitest';
import { calculateCa540Nr } from '@tax/ca-540nr';
import { TaxCalcError } from '@tax/types';

describe('calculateCa540Nr — work-source allocation math', () => {
  it('100% CA allocation when all vesting months were in CA', () => {
    const r = calculateCa540Nr({
      vests: [
        { label: 'Aug 2024 vest', vestingPeriodMonths: 24, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      ],
    });
    expect(r.vestBreakdown[0]!.caAllocationPct).toBe(1);
    expect(r.vestBreakdown[0]!.caSourceIncomeUsd).toBe(20_000);
    expect(r.vestBreakdown[0]!.caTaxOwedUsd).toBe(2_660); // 20k × 13.3%
  });

  it("matches Daniel's case study — 9-vest portfolio after CA→TX move", () => {
    // From /blog/daniel-ca-tx-case-study: 24 months in CA, 4-year vest cliff
    // through Aug 2026, $20k per quarterly vest.
    const vests = [
      { label: 'Aug 2024', vestingPeriodMonths: 24, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Nov 2024', vestingPeriodMonths: 27, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Feb 2025', vestingPeriodMonths: 30, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'May 2025', vestingPeriodMonths: 33, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Aug 2025', vestingPeriodMonths: 36, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Nov 2025', vestingPeriodMonths: 39, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Feb 2026', vestingPeriodMonths: 42, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'May 2026', vestingPeriodMonths: 45, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      { label: 'Aug 2026', vestingPeriodMonths: 48, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
    ];
    const r = calculateCa540Nr({ vests });
    // Sum should be approximately $16,800 (per Daniel's case study before
    // adding ISO bargain element exposure). Round-trip allowing $200 tolerance
    // for accumulated rounding.
    expect(r.totalCaTaxUsd).toBeGreaterThan(16_500);
    expect(r.totalCaTaxUsd).toBeLessThan(17_100);
    // Aug 2024 vest at 100% allocation = $2,660
    expect(r.vestBreakdown[0]!.caTaxOwedUsd).toBe(2_660);
    // Aug 2026 vest at 50% allocation (24/48) = $1,330
    expect(r.vestBreakdown[8]!.caTaxOwedUsd).toBe(1_330);
  });

  it('§19136 safe-harbor uses 110% factor when prior-year AGI > $150k', () => {
    const r = calculateCa540Nr({
      vests: [
        { label: 'vest', vestingPeriodMonths: 36, monthsInCalifornia: 24, fmvAtVestUsd: 20_000 },
      ],
      priorYearCaTaxUsd: 10_000,
      priorYearCaAgiUsd: 200_000, // > $150k → 110%
    });
    // current-year 90% threshold: 0.9 × (24/36 × 20k × 13.3%) = 0.9 × 1,773 = 1,596
    // prior-year 110% threshold: 11,000
    // Lower = current-year 90%
    expect(r.safeHarborThresholdUsd).toBe(1_596);
  });

  it('§19136 safe-harbor uses 100% factor when prior-year AGI ≤ $150k', () => {
    const r = calculateCa540Nr({
      vests: [
        { label: 'vest', vestingPeriodMonths: 36, monthsInCalifornia: 24, fmvAtVestUsd: 100_000 },
      ],
      priorYearCaTaxUsd: 5_000,
      priorYearCaAgiUsd: 140_000, // ≤ $150k → 100%
    });
    // current-year 90% = 0.9 × (24/36 × 100k × 13.3%) = 0.9 × 8,867 = 7,980
    // prior-year 100% = 5,000
    // Lower = prior-year 100%
    expect(r.safeHarborThresholdUsd).toBe(5_000);
  });

  it('throws on negative monthsInCalifornia', () => {
    expect(() =>
      calculateCa540Nr({
        vests: [{ label: 'x', vestingPeriodMonths: 24, monthsInCalifornia: -1, fmvAtVestUsd: 10_000 }],
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws when monthsInCalifornia > vestingPeriodMonths', () => {
    expect(() =>
      calculateCa540Nr({
        vests: [{ label: 'x', vestingPeriodMonths: 12, monthsInCalifornia: 24, fmvAtVestUsd: 10_000 }],
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on empty vest array', () => {
    expect(() => calculateCa540Nr({ vests: [] })).toThrow(TaxCalcError);
  });

  it('penalty estimate scales with days unpaid', () => {
    const r60 = calculateCa540Nr({
      vests: [{ label: 'v', vestingPeriodMonths: 24, monthsInCalifornia: 24, fmvAtVestUsd: 100_000 }],
      shortfallDaysUnpaid: 60,
    });
    const r180 = calculateCa540Nr({
      vests: [{ label: 'v', vestingPeriodMonths: 24, monthsInCalifornia: 24, fmvAtVestUsd: 100_000 }],
      shortfallDaysUnpaid: 180,
    });
    expect(r180.estimatedPenaltyUsd).toBeGreaterThan(r60.estimatedPenaltyUsd);
    // Roughly 3× since days are 60→180
    const ratio = r180.estimatedPenaltyUsd / r60.estimatedPenaltyUsd;
    expect(ratio).toBeCloseTo(3, 0);
  });
});
