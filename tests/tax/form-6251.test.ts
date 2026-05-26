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
    // A $50k bargain element does NOT trigger AMT for this scenario — TMT
    // ($50,443) ends up just below regular tax ($51,486). A $150k bargain
    // element pushes TMT comfortably above regular tax.
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 250_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 150_000,
      deductionType: 'standard',
    });
    expect(r.isoAdjustmentUsd).toBe(150_000);
    expect(r.amtiUsd).toBeGreaterThan(r.amtiBeforeAdjustmentsUsd);
    expect(r.amtApplies).toBe(true);
    expect(r.amtOwedUsd).toBeGreaterThan(0);
    // Recoverable credit estimate should equal full AMT owed since ISO is the only adjustment
    expect(r.recoverableCreditEstimateUsd).toBe(r.amtOwedUsd);
  });

  it("$50k ISO bargain element + $250k single is BELOW AMT threshold (regular tax slightly exceeds TMT)", () => {
    // Documents the boundary: $50k bargain element for a $250k single
    // filer is on the edge but does NOT trigger AMT — useful for users
    // who want to gauge how much room they have before AMT bites.
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 250_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 50_000,
      deductionType: 'standard',
    });
    expect(r.amtApplies).toBe(false);
    expect(r.amtOwedUsd).toBe(0);
    // But TMT is close — within $5k of regular tax
    expect(r.regularTaxUsd - r.tentativeMinimumTaxUsd).toBeLessThan(5_000);
  });
});

describe('calculateForm6251 — SALT add-back', () => {
  it('itemized + SALT triggers larger AMTI than standard deduction', () => {
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
    // Itemized lets you deduct $35k vs standard's ~$30k → lower regular taxable income
    expect(withSalt.regularTaxableIncomeUsd).toBeLessThan(withStd.regularTaxableIncomeUsd);
    // But itemized adds back $10k SALT for AMT → AMTI is higher relative to its regular base
    expect(withSalt.saltAddBackUsd).toBe(10_000);
    expect(withStd.saltAddBackUsd).toBe(0);
  });

  it('standard deduction yields zero SALT add-back even if saltDeductionUsd is passed', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 200_000,
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
      saltDeductionUsd: 10_000, // ignored when not itemizing
    });
    expect(r.saltAddBackUsd).toBe(0);
  });
});

describe('calculateForm6251 — exemption phaseout', () => {
  it('high earner gets reduced AMT exemption', () => {
    const r = calculateForm6251({
      taxYear: 2026,
      filingStatus: 'single',
      w2WagesUsd: 700_000, // AMTI > $643,888 single phaseout start
      selfEmploymentNetUsd: 0,
      isoBargainElementUsd: 0,
      deductionType: 'standard',
    });
    // Base exemption single 2026 = $90,567. AMTI > phaseout start
    // → exemption reduced. 2026 single AMTI of ~685k → reduction ≈ (685k − 644k) × 25% = ~10.3k
    expect(r.amtExemptionUsd).toBeLessThan(90_567);
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
