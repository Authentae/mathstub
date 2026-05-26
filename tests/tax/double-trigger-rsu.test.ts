import { describe, expect, it } from 'vitest';
import { calculateDoubleTriggerRsu } from '@tax/double-trigger-rsu';
import { TaxCalcError } from '@tax/types';

describe('calculateDoubleTriggerRsu — basic mechanic', () => {
  it("10,000 shares at $30 = $300k W-2 income; 22% supplemental, 37% marginal", () => {
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 10_000,
      triggerFmvUsd: 30,
      federalMarginalRate: 0.37,
      stateMarginalRate: 0.093, // CA
      stateSupplementalRate: 0.1023, // CA supplemental
      ytdSupplementalWagesUsd: 0,
      ficaSsAlreadyMaxed: true,
    });
    expect(r.taxableW2IncomeUsd).toBe(300_000);
    // Federal: 300k × 22% = $66k withheld; real 300k × 37% = $111k owed
    expect(r.federalSupplementalWithheldUsd).toBe(66_000);
    expect(r.federalRealOwedUsd).toBe(111_000);
    expect(r.federalShortfallUsd).toBe(45_000); // 15% gap × 300k
    // State: 300k × 10.23% withheld = $30,690; real 300k × 9.3% = $27,900 (over-withheld)
    expect(r.stateSupplementalWithheldUsd).toBe(30_690);
    expect(r.stateRealOwedUsd).toBe(27_900);
    expect(r.stateShortfallUsd).toBe(0); // over-withheld
  });

  it("crosses $1M YTD supplemental threshold — blends 22% + 37%", () => {
    // YTD = $800k, release another $400k → first $200k at 22%, next $200k at 37%
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 20_000,
      triggerFmvUsd: 20,
      federalMarginalRate: 0.37,
      stateMarginalRate: 0,
      stateSupplementalRate: 0,
      ytdSupplementalWagesUsd: 800_000,
    });
    expect(r.taxableW2IncomeUsd).toBe(400_000);
    // Withheld: 200k × 22% + 200k × 37% = 44k + 74k = $118k
    expect(r.federalSupplementalWithheldUsd).toBe(118_000);
    // Effective rate = 118/400 = 29.5%
    expect(r.federalSupplementalEffectiveRate).toBeCloseTo(0.295, 3);
  });

  it("entire release above $1M YTD — 37% on the whole thing", () => {
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 10_000,
      triggerFmvUsd: 50,
      federalMarginalRate: 0.37,
      stateMarginalRate: 0,
      stateSupplementalRate: 0,
      ytdSupplementalWagesUsd: 1_200_000, // already past $1M
    });
    expect(r.federalSupplementalWithheldUsd).toBe(500_000 * 0.37);
    expect(r.federalShortfallUsd).toBe(0); // 37% supplemental = 37% marginal → no gap
  });
});

describe('calculateDoubleTriggerRsu — sell-to-cover mechanic', () => {
  it("computes share count broker withholds for taxes", () => {
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 10_000,
      triggerFmvUsd: 30,
      federalMarginalRate: 0.37,
      stateMarginalRate: 0.093,
      stateSupplementalRate: 0.1023,
    });
    // Total withheld: 66k fed + 30,690 state + 4,350 FICA (1.45% × 300k) = 101,040
    // sellToCover = 101,040 / 30 = 3,368 shares (rounded up)
    expect(r.sellToCoverShares).toBeGreaterThan(3_000);
    expect(r.sellToCoverShares).toBeLessThan(3_400);
    expect(r.netSharesDelivered).toBe(10_000 - r.sellToCoverShares);
  });
});

describe('calculateDoubleTriggerRsu — no-state-tax states', () => {
  it("Texas: 0 state withholding, no state shortfall", () => {
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 5_000,
      triggerFmvUsd: 25,
      federalMarginalRate: 0.35,
      stateMarginalRate: 0,
      stateSupplementalRate: 0,
    });
    expect(r.stateSupplementalWithheldUsd).toBe(0);
    expect(r.stateRealOwedUsd).toBe(0);
    expect(r.stateShortfallUsd).toBe(0);
  });
});

describe('calculateDoubleTriggerRsu — validation', () => {
  it('throws on negative shares', () => {
    expect(() =>
      calculateDoubleTriggerRsu({
        sharesReleased: -100,
        triggerFmvUsd: 30,
        federalMarginalRate: 0.37,
        stateMarginalRate: 0.093,
        stateSupplementalRate: 0.1023,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on rates passed as percentages instead of decimals', () => {
    expect(() =>
      calculateDoubleTriggerRsu({
        sharesReleased: 10_000,
        triggerFmvUsd: 30,
        federalMarginalRate: 37, // wrong — should be 0.37
        stateMarginalRate: 0.093,
        stateSupplementalRate: 0.1023,
      }),
    ).toThrow(TaxCalcError);
  });
});

describe('calculateDoubleTriggerRsu — real IPO scenarios', () => {
  it("Pre-IPO engineer, 15,000 RSUs, $40 IPO open, CA resident", () => {
    const r = calculateDoubleTriggerRsu({
      sharesReleased: 15_000,
      triggerFmvUsd: 40,
      federalMarginalRate: 0.37,
      stateMarginalRate: 0.133,
      stateSupplementalRate: 0.1023,
      ytdSupplementalWagesUsd: 0,
    });
    expect(r.taxableW2IncomeUsd).toBe(600_000);
    // 22% supplemental on all $600k (below $1M threshold)
    expect(r.federalSupplementalWithheldUsd).toBe(132_000);
    // Real federal owed: 600k × 37% = $222k → shortfall $90k
    expect(r.federalShortfallUsd).toBe(90_000);
    // Real CA owed: 600k × 13.3% = $79,800; CA supplemental withheld 10.23% = $61,380 → shortfall $18,420
    expect(r.stateShortfallUsd).toBe(18_420);
    // Total shortfall: $108,420
    expect(r.totalShortfallUsd).toBe(108_420);
  });
});
