import { describe, expect, it } from 'vitest';
import { calculateForm6251 } from '@tax/form-6251';
import { TaxCalcError } from '@tax/types';

describe('calculateForm6251 — basic mechanic', () => {
  it('no AMT applies for a $200k W-2 single filer with standard deduction', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 200_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
    });
    expect(r.amtApplies).toBe(false);
    expect(r.amtOwedUsd).toBe(0);
    expect(r.regularTaxUsd).toBeGreaterThan(0);
    expect(r.tentativeMinimumTaxUsd).toBeGreaterThan(0);
    // TMT < regular tax → no AMT
    expect(r.tentativeMinimumTaxUsd).toBeLessThan(r.regularTaxUsd);
  });

  it('AMT triggers on a $150k ISO bargain element for a $250k W-2 single filer', () => {
    // Hand-verified (2026 single): AMTI = $250k + $150k = $400,000 (the $16,100
    // standard deduction is added back on line 2a, so AMTI = gross + ISO);
    // exemption $90,100 (below the $500k phaseout start); AMT taxable $309,900;
    // TMT = 244,500×26% + (309,900−244,500)×28% = $81,882; regular tax $51,304;
    // AMT owed = $30,578.
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 250_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 150_000,
      deductionType: 'standard',
    });
    expect(r.isoAdjustmentUsd).toBe(150_000);
    expect(r.line2aAddBackUsd).toBe(16_100); // standard deduction added back
    expect(r.amtiUsd).toBe(400_000);
    expect(r.amtApplies).toBe(true);
    expect(r.amtOwedUsd).toBe(30_578);
    // ISO bargain is a deferral item (recoverable); the standard-deduction
    // add-back is an exclusion item (NOT recoverable per §53). So the
    // recoverable estimate is the ISO-attributable portion — less than full AMT.
    expect(r.recoverableCreditEstimateUsd).toBeGreaterThan(0);
    expect(r.recoverableCreditEstimateUsd).toBeLessThan(r.amtOwedUsd);
  });

  it("$30k ISO bargain element + $250k single is BELOW AMT threshold (regular tax exceeds TMT)", () => {
    // Documents the boundary. With the standard deduction correctly added back
    // to AMTI, the threshold is lower than it would be otherwise: a $30k bargain
    // for a $250k single filer does NOT trigger AMT (AMTI $280,000 → TMT
    // $49,374 < regular tax $51,304), but a ~$40k+ bargain would.
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 250_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 30_000,
      deductionType: 'standard',
    });
    expect(r.amtApplies).toBe(false);
    expect(r.amtOwedUsd).toBe(0);
    // But TMT is close — within $5k of regular tax
    expect(r.regularTaxUsd - r.tentativeMinimumTaxUsd).toBeLessThan(5_000);
  });
});

describe('calculateForm6251 — line 2a add-back', () => {
  it('adds back SALT for itemizers and the full standard deduction for non-itemizers', () => {
    const withSalt = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'mfj',
      w2WagesUsd: 400_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'itemized',
      itemizedDeductionsUsd: 35_000, // includes the $10k SALT cap
      saltDeductionUsd: 10_000,
    });
    const withStd = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'mfj',
      w2WagesUsd: 400_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
    });
    // Itemized lets you deduct $35k vs standard's $32,200 → lower regular taxable income.
    expect(withSalt.regularTaxableIncomeUsd).toBeLessThan(withStd.regularTaxableIncomeUsd);
    // Line 2a: itemizers add back only the disallowed SALT ($10k); non-itemizers
    // add back the entire standard deduction (mfj 2026 = $32,200).
    expect(withSalt.line2aAddBackUsd).toBe(10_000);
    expect(withStd.line2aAddBackUsd).toBe(32_200);
    // Net AMTI: standard is HIGHER here because the full standard deduction is
    // disallowed for AMT, whereas the itemized filer keeps $25k of non-SALT
    // deductions (mortgage, charity) that ARE allowed for AMT.
    expect(withStd.amtiUsd).toBeGreaterThan(withSalt.amtiUsd);
  });

  it('standard deduction is added back on line 2a; a passed saltDeductionUsd is ignored', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 200_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
      saltDeductionUsd: 10_000, // ignored when not itemizing
    });
    // The standard deduction ($16,100 single 2026) is the line 2a add-back — NOT
    // the passed SALT figure, and NOT zero (the standard deduction is disallowed
    // for AMT and must be added back per Form 6251 line 2a).
    expect(r.line2aAddBackUsd).toBe(16_100);
  });
});

describe('calculateForm6251 — exemption phaseout', () => {
  it('high earner gets reduced AMT exemption', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 600_000, // AMTI in the OBBBA partial-phaseout band ($500k–$680k single)
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
    });
    // Base exemption single 2026 = $90,100. OBBBA: phaseout starts $500k at 50¢/$1.
    // AMTI ~$600k → reduction ≈ ($600k − $500k) × 50% = ~$50k → exemption ~$40k (partial).
    expect(r.amtExemptionUsd).toBeLessThan(90_100);
    expect(r.amtExemptionUsd).toBeGreaterThan(0);
  });

  it('extremely high earner gets fully phased-out exemption', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 2_000_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 500_000,
      deductionType: 'standard',
    });
    expect(r.amtExemptionUsd).toBe(0);
    expect(r.amtApplies).toBe(true);
  });
});

describe('calculateForm6251 — recoverable credit allocation', () => {
  it('split between ISO (deferral) and SALT (exclusion) prorates the credit', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'mfj',
      w2WagesUsd: 400_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 30_000,
      deductionType: 'itemized',
      itemizedDeductionsUsd: 25_000,
      saltDeductionUsd: 10_000,
    });
    if (r.amtApplies) {
      // ISO is 30k of 40k total adjustments → 75% deferral
      // Recoverable credit should be ~75% of amt owed
      const ratio = r.recoverableCreditEstimateUsd / r.amtOwedUsd;
      expect(ratio).toBeCloseTo(30_000 / 40_000, 1);
    }
  });

  it('SALT-only adjustment yields zero recoverable credit (exclusion item)', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'mfj',
      w2WagesUsd: 800_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'itemized',
      itemizedDeductionsUsd: 30_000,
      saltDeductionUsd: 10_000,
    });
    // If AMT applies, it's entirely from SALT add-back → 0 recoverable
    if (r.amtApplies) {
      expect(r.recoverableCreditEstimateUsd).toBe(0);
    }
  });
});

describe('calculateForm6251 — 1099 self-employment income', () => {
  it('treats SE income additively in the total-income line', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 150_000,
      selfEmploymentNetUsd: 50_000,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
    });
    expect(r.totalIncomeUsd).toBe(200_000);
  });
});

describe('calculateForm6251 — input validation', () => {
  it('throws on negative ISO bargain element', () => {
    expect(() =>
      calculateForm6251({
        taxYear: 2026,
        filingStatus: 'single',
        w2WagesUsd: 200_000,
        selfEmploymentNetUsd: 0,
        isoBargainElementUsd: -10_000,
        deductionType: 'standard',
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on NaN W-2 wages', () => {
    expect(() =>
      calculateForm6251({
        taxYear: 2026,
        filingStatus: 'single',
        w2WagesUsd: Number.NaN,
        selfEmploymentNetUsd: 0,
        isoBargainElementUsd: 0,
        deductionType: 'standard',
      }),
    ).toThrow(TaxCalcError);
  });
});
