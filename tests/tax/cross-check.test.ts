import { describe, it, expect } from 'vitest';
import { calculateEsppQualifying } from '@tax/espp';
import { calculateIsoAmt } from '@tax/iso-amt';
import { calculateRsuShortfall } from '@tax/rsu-shortfall';
import type { EsppQualifyingInput, IsoAmtInput, RsuShortfallInput } from '@tax/types';

/**
 * Cross-check tests: each scenario is hand-computed against the underlying IRS rule
 * in the comment block, then locked to the exact dollar value the calc must produce.
 * If a future change to the calc breaks one of these, the failure should force a
 * re-derivation rather than a silent number-bump.
 *
 * Sources:
 *  - ESPP qualifying disposition rule: IRC §423(c); Treas. Reg. §1.423-2(k);
 *    Form 3922 Box 2/Box 4 semantics (broker-reported grant-date FMV and
 *    deemed option price under the discount).
 *  - AMT on ISO exercise: IRC §56(b)(3); Form 6251 line 2i (Exercise of
 *    incentive stock options) and the 26%/28% rate schedule on Form 6251.
 *  - RSU supplemental withholding: IRC §3402(g); Treas. Reg. §31.3402(g)-1
 *    (22% up to $1M YTD supplemental wages, 37% above); IRS Pub 15.
 *  - FICA on supplemental wages: IRC §3101; SSA wage base; §3101(b)(2)
 *    Additional Medicare 0.9% above $200k single / $250k MFJ.
 */

describe('Cross-check — ESPP qualifying disposition (§423(c))', () => {
  // Rule (§423(c) / Treas. Reg. §1.423-2(k)):
  //   Ordinary income on QD = LESSER of:
  //     (a) (FMV at grant) × discount, i.e. the discount available at grant; or
  //     (b) actual gain on sale = (sale price − purchase price), floored at 0.
  //   LTCG = (sale price − purchase price) − ordinary income.
  //
  // Hand calc for the base scenario:
  //   Offer-date FMV = $100, purchase-date FMV = $120, discount 15%, 100 shares.
  //   Sale price = $150 per share. Held >2y from offer, >1y from purchase → qualifying.
  //
  //   Purchase price = min($100, $120) × (1 − 0.15) = $85.
  //   Realized per share = $150 − $85 = $65.
  //   Discount cap per share = $100 × 0.15 = $15.
  //   Ordinary income per share = min($15, $65) = $15. Total ordinary = $1,500.
  //   LTCG per share = $65 − $15 = $50. Total LTCG = $5,000.
  const input: EsppQualifyingInput = {
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

  it('locks ordinary income at $1,500 and LTCG at $5,000', () => {
    const r = calculateEsppQualifying(input);
    expect(r.totalOrdinaryIncomeUsd).toBeCloseTo(1_500, 2);
    expect(r.totalCapitalGainUsd).toBeCloseTo(5_000, 2);
  });

  it('locks federal LTCG tax at $750 (15% × $5,000; ordinary taxable income in 15% bracket)', () => {
    // Ordinary taxable income after ESPP ordinary:
    //   200,000 + 0 + 1,500 − 23,500 − 15,000 (single std ded 2025) = 163,000.
    //   Adding $5,000 LTCG → 168,000, still well under $533,400 single 20% threshold.
    //   All $5,000 of gain falls in the 15% LTCG bracket → $750.
    const r = calculateEsppQualifying(input);
    expect(r.federalLtcgTaxUsd).toBeCloseTo(750, 2);
  });

  it('locks NIIT at $0 for single $200k earner (MAGI $168k < $200k threshold)', () => {
    const r = calculateEsppQualifying(input);
    expect(r.niitUsd).toBe(0);
  });

  it('locks federal ordinary tax on $1,500 at 24% marginal = $360', () => {
    // Ordinary taxable income $163k single 2025 → 24% bracket ($103,350–$197,300).
    const r = calculateEsppQualifying(input);
    expect(r.federalOrdinaryTaxUsd).toBeCloseTo(360, 2);
  });

  it('locks CA state tax at $799.50 (12.3% × $6,500 ordinary+LTCG)', () => {
    // CA taxes both ordinary and LTCG as ordinary; v1 uses top marginal 12.3%.
    const r = calculateEsppQualifying(input);
    expect(r.stateTaxUsd).toBeCloseTo(799.5, 2);
  });

  it('locks total tax at $1,909.50', () => {
    const r = calculateEsppQualifying(input);
    expect(r.totalTaxUsd).toBeCloseTo(1_909.5, 2);
  });
});

describe('Cross-check — ISO exercise-and-hold AMT (Form 6251)', () => {
  // Rule (IRC §56(b)(3); Form 6251 line 2a + 2i + rate schedule):
  //   The standard deduction is NOT allowed for AMT — Form 6251 line 2a adds it
  //   back. So AMTI = regular taxable income + standard deduction + ISO bargain
  //   element  (equivalently: gross income − pre-tax 401(k) + bargain element).
  //   Exemption (single 2025) = $88,100, phased out 25¢/$1 above $626,350.
  //   AMT base = max(0, AMTI − exemption).
  //   TMT = 26% × min(base, $239,100) + 28% × max(0, base − $239,100).
  //   AMT owed = max(0, TMT − regular federal tax).
  //
  // Hand calc:
  //   Strike $2, FMV $20, 10,000 shares → bargain element $180,000.
  //   $200,000 W-2, $23,500 401k, single 2025 → regular taxable income:
  //     200,000 − 23,500 − 15,000 = 161,500.
  //   Regular federal tax on $161,500 (single 2025 brackets):
  //     11,925 × 0.10                    =  1,192.50
  //     (48,475 − 11,925) × 0.12         =  4,386.00
  //     (103,350 − 48,475) × 0.22        = 12,072.50
  //     (161,500 − 103,350) × 0.24       = 13,956.00
  //                          regular tax = 31,607.00
  //   AMTI = 200,000 − 23,500 + 180,000 = 356,500 (std deduction added back).
  //     Below phaseout → exemption $88,100.
  //   AMT base = 356,500 − 88,100 = 268,400. Above $239,100 breakpoint.
  //   TMT = 239,100 × 0.26 + (268,400 − 239,100) × 0.28
  //       = 62,166 + 8,204 = 70,370.
  //   AMT owed = 70,370 − 31,607 = 38,763.
  const input: IsoAmtInput = {
    taxYear: 2025,
    filingStatus: 'single',
    strikePricePerShareUsd: 2,
    fmvAtExercisePerShareUsd: 20,
    sharesExercised: 10_000,
    ytdRegularWagesUsd: 200_000,
    otherTaxableIncomeUsd: 0,
    preTaxDeductionsUsd: 23_500,
    stateCode: 'CA',
    scenario: 'exercise-and-hold',
  };

  it('locks regular taxable income at $161,500', () => {
    const r = calculateIsoAmt(input);
    expect(r.regularTaxableIncomeBaseUsd).toBeCloseTo(161_500, 2);
  });

  it('locks regular federal tax at $31,607', () => {
    const r = calculateIsoAmt(input);
    expect(r.regularFederalTaxUsd).toBeCloseTo(31_607, 2);
  });

  it('locks AMTI at $356,500 (gross − 401k + bargain; std deduction added back)', () => {
    const r = calculateIsoAmt(input);
    expect(r.amtiUsd).toBeCloseTo(356_500, 2);
  });

  it('locks AMT exemption at $88,100 (no phaseout)', () => {
    const r = calculateIsoAmt(input);
    expect(r.amtExemptionUsd).toBeCloseTo(88_100, 2);
  });

  it('locks TMT at $70,370', () => {
    const r = calculateIsoAmt(input);
    expect(r.tentativeMinimumTaxUsd).toBeCloseTo(70_370, 2);
  });

  it('locks AMT owed at $38,763', () => {
    const r = calculateIsoAmt(input);
    expect(r.amtOwedUsd).toBeCloseTo(38_763, 2);
  });

  it('AMT credit carryforward equals AMT paid', () => {
    const r = calculateIsoAmt(input);
    expect(r.amtCreditCarryforwardUsd).toBeCloseTo(38_763, 2);
  });
});

describe('Cross-check — RSU shortfall (Reg. §31.3402(g)-1, §6654)', () => {
  // Hand calc for the canonical $50k vest scenario:
  //   $50,000 RSU vest, $200,000 YTD W-2 (already past SS wage base $176,100),
  //   $0 prior supplemental, $0 other income, $23,500 401k, single 2025, CA.
  //
  //   Withheld federal (22% supplemental): $50,000 × 0.22 = $11,000.
  //   Withheld state (CA supplemental 10.23%): $50,000 × 0.1023 = $5,115.
  //   FICA on vest:
  //     SS: YTD wages $200k > $176,100 wage base → SS portion = $0.
  //     Medicare: $50,000 × 0.0145 = $725.
  //     Additional Medicare: YTD already > $200k threshold → full $50,000 × 0.009 = $450.
  //     Total FICA = $0 + $725 + $450 = $1,175.
  //   Withheld total = $11,000 + $5,115 + $1,175 = $17,290.
  //
  //   Projected taxable income = $200k + $50k − $23.5k − $15k std ded = $211,500.
  //   Marginal federal rate (single 2025, $211.5k > $197,300) = 32%.
  //   Expected federal = $50,000 × 0.32 = $16,000.
  //   Marginal CA rate (top marginal 12.3% under $1M) = 12.3%.
  //   Expected state = $50,000 × 0.123 = $6,150.
  //   Expected FICA = $1,175 (FICA is flat).
  //   Expected total = $16,000 + $6,150 + $1,175 = $23,325.
  //
  //   Shortfall = $23,325 − $17,290 = $6,035.
  const input: RsuShortfallInput = {
    taxYear: 2025,
    filingStatus: 'single',
    vestGrossUsd: 50_000,
    ytdSupplementalWagesUsd: 0,
    ytdRegularWagesUsd: 200_000,
    otherTaxableIncomeUsd: 0,
    preTaxDeductionsUsd: 23_500,
    stateCode: 'CA',
  };

  it('locks withheld federal at $11,000 (22%)', () => {
    const r = calculateRsuShortfall(input);
    expect(r.withheldFederalUsd).toBeCloseTo(11_000, 2);
  });

  it('locks withheld FICA at $1,175 (SS maxed; Medicare $725 + Additional Medicare $450)', () => {
    const r = calculateRsuShortfall(input);
    expect(r.withheldFicaUsd).toBeCloseTo(1_175, 2);
  });

  it('locks expected federal at $16,000 (32% marginal × $50k)', () => {
    const r = calculateRsuShortfall(input);
    expect(r.expectedFederalUsd).toBeCloseTo(16_000, 2);
    expect(r.marginalFederalRatePct).toBeCloseTo(32, 1);
  });

  it('locks shortfall at $6,035 = expected $23,325 − withheld $17,290', () => {
    const r = calculateRsuShortfall(input);
    expect(r.shortfallUsd).toBeCloseTo(6_035, 2);
  });

  it('safe-harbor risk flag triggers (shortfall > $1,000 §6654 threshold)', () => {
    const r = calculateRsuShortfall(input);
    expect(r.isUnderpaymentRisk).toBe(true);
    expect(r.suggestedQuarterlyEstimateUsd).toBeCloseTo(6_035, 2);
  });
});
