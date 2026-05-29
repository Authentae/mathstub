import { describe, it, expect } from 'vitest';
import { calculateRsuCostBasis } from '@tax/rsu-cost-basis';
import { TaxCalcError } from '@tax/types';

describe('calculateRsuCostBasis', () => {
  it('computes the classic $0-basis long-term double-tax case', () => {
    // 100 shares, $50 FMV at vest, sold $60, broker basis $0, long-term,
    // single, $300k income, 2026. (Hand-verified in the build notes.)
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 0,
      holdingPeriod: 'long',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 300_000,
    });
    expect(r.correctCostBasisUsd).toBe(5_000);
    expect(r.brokerReportedBasisUsd).toBe(0);
    expect(r.proceedsUsd).toBe(6_000);
    expect(r.reportedGainUsd).toBe(6_000);
    expect(r.correctGainUsd).toBe(1_000);
    expect(r.basisAdjustmentUsd).toBe(5_000);
    expect(r.isLikelyDoubleTaxed).toBe(true);
    expect(r.capGainsRate).toBeCloseTo(0.15, 5); // LTCG 15% at $300k single 2026
    expect(r.federalOverpaidUsd).toBe(750); // 5_000 * 0.15
    expect(r.niitOverpaidUsd).toBeCloseTo(190, 5); // 3.8% of 5_000 (income > $200k)
    expect(r.stateOverpaidUsd).toBe(0);
    expect(r.totalOverpaidUsd).toBeCloseTo(940, 5);
  });

  it('Form 8949 identity: proceeds - brokerBasis + (g adjustment) = true gain', () => {
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 0,
      holdingPeriod: 'long',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 300_000,
    });
    // Column (h) = (d) - (e) - (g-as-positive-reduction)
    expect(r.proceedsUsd - r.brokerReportedBasisUsd - r.basisAdjustmentUsd).toBe(
      r.correctGainUsd,
    );
  });

  it('treats a short-term sale at the ordinary marginal rate', () => {
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 0,
      holdingPeriod: 'short',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 300_000,
    });
    // $300k single 2026 ordinary marginal = 35%.
    expect(r.capGainsRate).toBeCloseTo(0.35, 5);
    expect(r.federalOverpaidUsd).toBe(1_750); // 5_000 * 0.35
    expect(r.niitOverpaidUsd).toBeCloseTo(190, 5);
    expect(r.totalOverpaidUsd).toBeCloseTo(1_940, 5);
  });

  it('reports no double-tax when the broker already reported the correct basis', () => {
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 50, // broker got it right
      holdingPeriod: 'long',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 300_000,
    });
    expect(r.basisAdjustmentUsd).toBe(0);
    expect(r.isLikelyDoubleTaxed).toBe(false);
    expect(r.totalOverpaidUsd).toBe(0);
  });

  it('adds state tax on the over-reported amount', () => {
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 0,
      holdingPeriod: 'long',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 300_000,
      stateCapGainsRate: 0.093,
    });
    expect(r.stateOverpaidUsd).toBeCloseTo(465, 5); // 5_000 * 0.093
  });

  it('shows a misreported basis but $0 overpayment in the 0% LTCG bracket', () => {
    const r = calculateRsuCostBasis({
      sharesSold: 100,
      fmvAtVestPerShare: 50,
      salePricePerShare: 60,
      brokerReportedBasisPerShare: 0,
      holdingPeriod: 'long',
      filingStatus: 'single',
      taxYear: 2026,
      taxableIncomeUsd: 30_000, // below the 0% LTCG ceiling and the NIIT threshold
    });
    expect(r.isLikelyDoubleTaxed).toBe(true);
    expect(r.capGainsRate).toBe(0);
    expect(r.niitOverpaidUsd).toBe(0);
    expect(r.totalOverpaidUsd).toBe(0);
  });

  it('throws when shares sold is zero or negative', () => {
    expect(() =>
      calculateRsuCostBasis({
        sharesSold: 0,
        fmvAtVestPerShare: 50,
        salePricePerShare: 60,
        brokerReportedBasisPerShare: 0,
        holdingPeriod: 'long',
        filingStatus: 'single',
        taxYear: 2026,
        taxableIncomeUsd: 300_000,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on negative values', () => {
    expect(() =>
      calculateRsuCostBasis({
        sharesSold: 100,
        fmvAtVestPerShare: -50,
        salePricePerShare: 60,
        brokerReportedBasisPerShare: 0,
        holdingPeriod: 'long',
        filingStatus: 'single',
        taxYear: 2026,
        taxableIncomeUsd: 300_000,
      }),
    ).toThrow(TaxCalcError);
  });
});
