import { describe, it, expect } from 'vitest';
import { calculateEsppQualifying, ESPP_QUALIFYING_RULES } from '@tax/espp';
import { TaxCalcError, type EsppQualifyingInput } from '@tax/types';

// Reference scenario:
//   Offer date Jan 1, 2022 — offer-date FMV $100/share
//   Purchase date Jun 30, 2022 — purchase-date FMV $120/share
//   15% discount → purchase price = min($100,$120) × 0.85 = $85/share
//   Sale date Jul 1, 2024 (>2y from offer, >1y from purchase → qualifying) at $150/share
//   100 shares
const baseInput: EsppQualifyingInput = {
  taxYear: 2025,
  filingStatus: 'single',
  offerDateFmvUsd: 100,
  purchaseDateFmvUsd: 120,
  discountPct: 15,
  sharesPurchased: 100,
  salePricePerShareUsd: 150,
  offerDate: '2022-01-01',
  purchaseDate: '2022-06-30',
  saleDate: '2024-07-01',
  ytdRegularWagesUsd: 200_000,
  otherTaxableIncomeUsd: 0,
  preTaxDeductionsUsd: 23_500,
  stateCode: 'CA',
};

describe('calculateEsppQualifying — happy path', () => {
  it('detects qualifying disposition (>2y offer, >1y purchase)', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.isQualifying).toBe(true);
    expect(r.monthsFromOffer).toBeGreaterThanOrEqual(24);
    expect(r.monthsFromPurchase).toBeGreaterThanOrEqual(12);
  });

  it('purchase price = min(offer, purchase) × (1 - discount) = $85', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.purchasePricePerShareUsd).toBeCloseTo(85, 4);
  });

  it('ordinary income capped at offer-date discount ($15/share)', () => {
    // realizedGain = 150 - 85 = 65; cap = 100 × 0.15 = 15. Lesser = 15.
    const r = calculateEsppQualifying(baseInput);
    expect(r.ordinaryIncomePerShareUsd).toBeCloseTo(15, 4);
    expect(r.totalOrdinaryIncomeUsd).toBeCloseTo(1_500, 2);
  });

  it('capital gain = realized - ordinary = $50/share, $5,000 total LTCG', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.capitalGainPerShareUsd).toBeCloseTo(50, 4);
    expect(r.totalCapitalGainUsd).toBeCloseTo(5_000, 2);
  });

  it('total proceeds = 150 × 100 = $15,000', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.totalSharesProceedsUsd).toBe(15_000);
  });

  it('federal LTCG taxed at 15% for $200k single CA earner', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.marginalLtcgRatePct).toBeCloseTo(15, 1);
    expect(r.federalLtcgTaxUsd).toBeCloseTo(750, 2);
  });

  it('qualifying saves money vs. disqualifying for typical case', () => {
    const r = calculateEsppQualifying(baseInput);
    expect(r.qualifyingSavingsVsDisqualifyingUsd).toBeGreaterThan(0);
    expect(r.disqualifyingComparisonTaxUsd).toBeGreaterThan(r.totalTaxUsd);
  });

  it('net proceeds = gross proceeds - basis - tax', () => {
    const r = calculateEsppQualifying(baseInput);
    const basis = r.purchasePricePerShareUsd * baseInput.sharesPurchased;
    expect(r.netProceedsAfterTaxUsd).toBeCloseTo(
      r.totalSharesProceedsUsd - basis - r.totalTaxUsd,
      2,
    );
  });
});

describe('calculateEsppQualifying — disposition timing', () => {
  it('flags disqualifying when sold <1y from purchase', () => {
    const r = calculateEsppQualifying({
      ...baseInput,
      saleDate: '2022-12-31',
    });
    expect(r.isQualifying).toBe(false);
  });

  it('flags disqualifying when held <2y from offer even if >1y from purchase', () => {
    const r = calculateEsppQualifying({
      ...baseInput,
      offerDate: '2023-01-01',
      purchaseDate: '2023-06-30',
      saleDate: '2024-08-01', // >1y from purchase but only ~19mo from offer
    });
    expect(r.isQualifying).toBe(false);
    expect(r.monthsFromPurchase).toBeGreaterThanOrEqual(12);
    expect(r.monthsFromOffer).toBeLessThan(24);
  });
});

describe('calculateEsppQualifying — pricing edge cases', () => {
  it('lookback flat (no purchase-date appreciation): ordinary cap = realized gain', () => {
    // If purchaseFMV == offerFMV == $100, cap = $15, realized gain = sale - 85.
    // If sale = $90, realized = $5. Lesser = $5 ordinary, $0 capital gain.
    const r = calculateEsppQualifying({
      ...baseInput,
      offerDateFmvUsd: 100,
      purchaseDateFmvUsd: 100,
      salePricePerShareUsd: 90,
    });
    expect(r.purchasePricePerShareUsd).toBeCloseTo(85, 4);
    expect(r.ordinaryIncomePerShareUsd).toBeCloseTo(5, 4);
    expect(r.capitalGainPerShareUsd).toBeCloseTo(0, 4);
  });

  it('sale below purchase price → ordinary income = 0, capital loss', () => {
    const r = calculateEsppQualifying({
      ...baseInput,
      salePricePerShareUsd: 70, // below $85 purchase price
    });
    expect(r.ordinaryIncomePerShareUsd).toBe(0);
    expect(r.capitalGainPerShareUsd).toBeCloseTo(-15, 4);
    expect(r.totalCapitalGainUsd).toBeCloseTo(-1_500, 2);
    expect(r.federalLtcgTaxUsd).toBe(0);
    expect(r.niitUsd).toBe(0);
  });

  it('purchase-date FMV lower than offer-date FMV uses lower for purchase price', () => {
    const r = calculateEsppQualifying({
      ...baseInput,
      offerDateFmvUsd: 200,
      purchaseDateFmvUsd: 80,
      salePricePerShareUsd: 150,
    });
    // purchase price = 80 × 0.85 = 68
    expect(r.purchasePricePerShareUsd).toBeCloseTo(68, 4);
    // ordinary cap = 200 × 0.15 = 30, realized = 150 - 68 = 82 → ordinary = 30
    expect(r.ordinaryIncomePerShareUsd).toBeCloseTo(30, 4);
  });

  it('NIIT kicks in for high earners with capital gains', () => {
    const r = calculateEsppQualifying({
      ...baseInput,
      ytdRegularWagesUsd: 300_000,
      sharesPurchased: 1_000, // larger gain
    });
    expect(r.niitUsd).toBeGreaterThan(0);
  });

  it('no-tax state has zero state tax', () => {
    const r = calculateEsppQualifying({ ...baseInput, stateCode: 'TX' });
    expect(r.stateTaxUsd).toBe(0);
    expect(r.marginalStateRatePct).toBe(0);
  });

  it('respects state override rate', () => {
    const r = calculateEsppQualifying({ ...baseInput, stateOverrideRatePct: 5 });
    expect(r.marginalStateRatePct).toBeCloseTo(5, 4);
  });
});

describe('calculateEsppQualifying — validation', () => {
  it('throws on zero shares', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, sharesPurchased: 0 })).toThrow(TaxCalcError);
  });
  it('throws on zero offer FMV', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, offerDateFmvUsd: 0 })).toThrow(TaxCalcError);
  });
  it('throws on negative discount', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, discountPct: -5 })).toThrow(TaxCalcError);
  });
  it('throws on implausibly large discount', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, discountPct: 80 })).toThrow(TaxCalcError);
  });
  it('throws on malformed date', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, saleDate: '2024/07/01' })).toThrow(TaxCalcError);
  });
  it('throws if saleDate before purchaseDate', () => {
    expect(() =>
      calculateEsppQualifying({ ...baseInput, saleDate: '2022-01-01' }),
    ).toThrow(TaxCalcError);
  });
  it('throws if purchaseDate before offerDate', () => {
    expect(() =>
      calculateEsppQualifying({ ...baseInput, offerDate: '2023-01-01' }),
    ).toThrow(TaxCalcError);
  });
  it('throws on unknown state', () => {
    expect(() => calculateEsppQualifying({ ...baseInput, stateCode: 'ZZ' })).toThrow(TaxCalcError);
  });
});

describe('ESPP_QUALIFYING_RULES', () => {
  it('exposes the 24mo / 12mo holding rules', () => {
    expect(ESPP_QUALIFYING_RULES.monthsFromOffer).toBe(24);
    expect(ESPP_QUALIFYING_RULES.monthsFromPurchase).toBe(12);
  });
});
