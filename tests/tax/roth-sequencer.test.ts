import { describe, expect, it } from 'vitest';
import { calculateRothSequencer } from '@tax/roth-sequencer';
import { TaxCalcError } from '@tax/types';

describe('calculateRothSequencer — sequencing logic', () => {
  it('full stack: Mega-Backdoor + Backdoor IRA for a $400k MFJ tech worker, no pre-tax IRA', () => {
    const r = calculateRothSequencer({
      taxYear: 2026,
      filingStatus: 'mfj',
      age: 35,
      magi: 400_000,
      marginalRate: 0.32,
      preTaxIraBalance: 0,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
    });
    expect(r.mega.megaBackdoorAmount).toBeGreaterThan(0);
    expect(r.backdoor.totalRothContribution).toBeGreaterThan(0);
    expect(r.steps.length).toBe(2);
    expect(r.steps[0]!.kind).toBe('mega-backdoor');
    expect(r.steps[1]!.kind).toBe('backdoor-ira');
    expect(r.totalAnnualRothCapacityUsd).toBe(
      r.mega.megaBackdoorAmount + r.backdoor.totalRothContribution,
    );
  });

  it('inserts basis-isolation step FIRST when user has pre-tax IRA + needs backdoor', () => {
    const r = calculateRothSequencer({
      taxYear: 2026,
      filingStatus: 'single',
      age: 35,
      magi: 200_000, // above single phaseout
      marginalRate: 0.32,
      preTaxIraBalance: 50_000, // triggers basis isolation
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      planAcceptsRolloversIn: true,
    });
    expect(r.steps[0]!.kind).toBe('basis-isolation');
    expect(r.steps[0]!.blockedReason).toBeNull();
    expect(r.steps[1]!.kind).toBe('mega-backdoor');
    expect(r.steps[2]!.kind).toBe('backdoor-ira');
  });

  it('flags basis-isolation BLOCKED when plan rejects rollover-in', () => {
    const r = calculateRothSequencer({
      taxYear: 2026,
      filingStatus: 'single',
      age: 35,
      magi: 200_000,
      marginalRate: 0.32,
      preTaxIraBalance: 50_000,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
      planAcceptsRolloversIn: false, // plan rejects
    });
    expect(r.steps[0]!.kind).toBe('basis-isolation');
    expect(r.steps[0]!.blockedReason).toBe('plan does not accept rollovers IN');
    // Backdoor IRA step should be marked blocked by pro-rata
    const backdoorStep = r.steps.find((s) => s.kind === 'backdoor-ira');
    expect(backdoorStep?.blockedReason).toBe('pro-rata');
    expect(backdoorStep?.rothCapacityUsd).toBe(0);
  });

  it('no basis-isolation step when MAGI is below phaseout (direct Roth available)', () => {
    const r = calculateRothSequencer({
      taxYear: 2026,
      filingStatus: 'single',
      age: 35,
      magi: 100_000, // below single phaseout
      marginalRate: 0.24,
      preTaxIraBalance: 50_000, // shouldn't matter — no backdoor needed
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: true,
      planAllowsConversion: true,
    });
    expect(r.steps.find((s) => s.kind === 'basis-isolation')).toBeUndefined();
    // Direct Roth should appear
    expect(r.steps.find((s) => s.kind === 'direct-roth')).toBeDefined();
  });

  it('flags mega-backdoor blocked when plan does not allow after-tax', () => {
    const r = calculateRothSequencer({
      taxYear: 2026,
      filingStatus: 'mfj',
      age: 35,
      magi: 400_000,
      marginalRate: 0.32,
      preTaxIraBalance: 0,
      employeeElectiveDeferral: 23_500,
      employerMatch: 11_000,
      planAllowsAfterTax: false, // plan does not allow
      planAllowsConversion: false,
    });
    const megaStep = r.steps.find((s) => s.kind === 'mega-backdoor');
    expect(megaStep?.blockedReason).toBe('plan-no-after-tax');
    expect(megaStep?.rothCapacityUsd).toBe(0);
    // Backdoor IRA should still be available
    expect(r.steps.find((s) => s.kind === 'backdoor-ira')?.rothCapacityUsd).toBeGreaterThan(0);
  });

  it('throws on marginalRate passed as percentage instead of decimal', () => {
    expect(() =>
      calculateRothSequencer({
        taxYear: 2026,
        filingStatus: 'mfj',
        age: 35,
        magi: 400_000,
        marginalRate: 32, // wrong — should be 0.32
        preTaxIraBalance: 0,
        employeeElectiveDeferral: 23_500,
        employerMatch: 11_000,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
      }),
    ).toThrow(TaxCalcError);
  });

  it('throws on negative employer match', () => {
    expect(() =>
      calculateRothSequencer({
        taxYear: 2026,
        filingStatus: 'mfj',
        age: 35,
        magi: 400_000,
        marginalRate: 0.32,
        preTaxIraBalance: 0,
        employeeElectiveDeferral: 23_500,
        employerMatch: -1000,
        planAllowsAfterTax: true,
        planAllowsConversion: true,
      }),
    ).toThrow(TaxCalcError);
  });
});
