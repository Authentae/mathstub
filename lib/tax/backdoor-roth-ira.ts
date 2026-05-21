/**
 * Backdoor Roth IRA contribution calculator.
 *
 * High earners over the Roth IRA AGI phaseout cannot contribute directly to
 * a Roth IRA. The "Backdoor Roth" workaround:
 *   1. Make a non-deductible Traditional IRA contribution (~$7,000/yr in 2025).
 *   2. Convert that Traditional IRA balance to a Roth IRA (the conversion is
 *      tax-free because the basis equals the contribution).
 *
 * The pro-rata rule (IRC §408(d)(2)) complicates this when you have ANY
 * pre-existing pre-tax Traditional IRA balance. The IRS treats all your
 * Traditional IRAs as one pool for conversion-tax purposes:
 *
 *   taxable_fraction = pre_tax_balance / (pre_tax_balance + after_tax_basis)
 *
 * To "isolate" the basis and escape pro-rata, you roll your pre-tax Traditional
 * IRA balance into a 401(k) (which is NOT subject to pro-rata) BEFORE the
 * conversion happens — typically in the same calendar year, well before Dec 31.
 *
 * Cited: IRC §408A, §408(d)(2), §219; IRS Pub 590-A/B; Form 8606 instructions.
 * 2025 limits from IRS Notice 2024-80.
 */

import type { FilingStatus, TaxYear } from './types';

export const BACKDOOR_ROTH_RULES = {
  source: 'IRC §408A, §408(d)(2); IRS Pub 590-A; Form 8606',
} as const;

interface PhaseoutRange {
  full: number; // below this: full direct Roth allowed
  none: number; // at/above this: no direct Roth allowed
}

/** Roth IRA AGI phaseout ranges by filing status. */
export function rothPhaseout(taxYear: TaxYear, filingStatus: FilingStatus): PhaseoutRange {
  // 2025 numbers per IRS Notice 2024-80
  switch (taxYear) {
    case 2024:
      return filingStatus === 'mfj'
        ? { full: 230_000, none: 240_000 }
        : filingStatus === 'mfs'
          ? { full: 0, none: 10_000 }
          : { full: 146_000, none: 161_000 };
    case 2025:
      return filingStatus === 'mfj'
        ? { full: 236_000, none: 246_000 }
        : filingStatus === 'mfs'
          ? { full: 0, none: 10_000 }
          : { full: 150_000, none: 165_000 };
    case 2026:
      // 2026 not yet announced; placeholder ~+3%
      return filingStatus === 'mfj'
        ? { full: 243_000, none: 253_000 }
        : filingStatus === 'mfs'
          ? { full: 0, none: 10_000 }
          : { full: 154_000, none: 169_000 };
    default:
      return { full: 150_000, none: 165_000 };
  }
}

/** Annual IRA contribution limit (Traditional + Roth combined ceiling). */
export function iraContributionLimit(taxYear: TaxYear, age: number): number {
  let base: number;
  switch (taxYear) {
    case 2024:
      base = 7_000;
      break;
    case 2025:
      base = 7_000;
      break;
    case 2026:
      base = 7_500; // placeholder
      break;
    default:
      base = 7_000;
  }
  const catchUp = age >= 50 ? 1_000 : 0;
  return base + catchUp;
}

export interface BackdoorRothInput {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  age: number;
  /** Modified AGI (closely tracks AGI for most filers). */
  magi: number;
  /** Pre-tax Traditional IRA balance at year-end across all Traditional IRAs. */
  preTaxIraBalance: number;
  /** Federal marginal rate (decimal, e.g. 0.32). */
  marginalRate: number;
  /** Years until you tap the money (default 30). */
  yearsToRetirement?: number;
  /** Expected annual return (default 7%). */
  expectedReturnRate?: number;
}

export type BackdoorEligibility =
  | 'direct-roth-available' // MAGI below phaseout — no need for backdoor
  | 'partial-direct' // MAGI in phaseout band — partial direct + topped-up backdoor
  | 'backdoor-required' // MAGI above phaseout — pure backdoor
  | 'mfs-trapped'; // MFS with $0–$10k phaseout — almost no Roth space

export interface BackdoorRothResult {
  /** Annual IRA contribution cap (Traditional + Roth combined). */
  contributionLimit: number;
  /** What kind of Roth path is available. */
  eligibility: BackdoorEligibility;
  /** Phaseout band for reference. */
  phaseout: PhaseoutRange;
  /** Direct Roth contribution allowed under MAGI rules (could be partial). */
  directRothAllowed: number;
  /** Backdoor-Roth-via-Traditional-IRA amount to use for the remainder. */
  backdoorAmount: number;
  /** Total Roth dollars added this year (direct + backdoor). */
  totalRothContribution: number;
  /** Pro-rata: % of backdoor conversion that becomes taxable. */
  proRataTaxablePct: number;
  /** Pro-rata: $ of conversion tax owed if not isolated. */
  proRataTaxOwed: number;
  /** Recommendation flag — needs to roll pre-tax IRA into 401(k) first. */
  needsBasisIsolation: boolean;
  /** Projected Roth balance from one year's contribution. */
  oneTimeProjection: number;
  /** Projected Roth balance if recurring annually. */
  recurringProjection: number;
  /** Tax-free growth (one-time). */
  taxFreeGrowthOneTime: number;
}

export function calculateBackdoorRoth(input: BackdoorRothInput): BackdoorRothResult {
  if (input.magi < 0) throw new Error('MAGI cannot be negative');
  if (input.age < 0 || input.age > 120) throw new Error('Age out of range');
  if (input.preTaxIraBalance < 0)
    throw new Error('Pre-tax IRA balance cannot be negative');
  if (input.marginalRate < 0 || input.marginalRate > 0.5)
    throw new Error('Marginal rate must be between 0 and 0.5');

  const years = input.yearsToRetirement ?? 30;
  if (years < 0 || years > 60) throw new Error('Years to retirement out of range');
  const rate = input.expectedReturnRate ?? 0.07;
  if (rate < -0.5 || rate > 1) throw new Error('Return rate out of range');

  const limit = iraContributionLimit(input.taxYear, input.age);
  const phaseout = rothPhaseout(input.taxYear, input.filingStatus);

  // Determine direct Roth allowed
  let directRothAllowed = 0;
  let eligibility: BackdoorEligibility;
  if (input.filingStatus === 'mfs' && input.magi >= phaseout.none) {
    // Sub-$10k phaseout — only mostly-zero Roth direct
    eligibility = 'mfs-trapped';
    directRothAllowed = 0;
  } else if (input.magi < phaseout.full) {
    eligibility = 'direct-roth-available';
    directRothAllowed = limit;
  } else if (input.magi >= phaseout.none) {
    eligibility = 'backdoor-required';
    directRothAllowed = 0;
  } else {
    // Partial direct
    eligibility = 'partial-direct';
    const phaseoutSpan = phaseout.none - phaseout.full;
    const phasedOut = (input.magi - phaseout.full) / phaseoutSpan;
    directRothAllowed = Math.floor(limit * (1 - phasedOut) / 10) * 10; // round to nearest $10 down
  }

  const backdoorAmount = Math.max(0, limit - directRothAllowed);
  const totalRothContribution = directRothAllowed + backdoorAmount;

  // Pro-rata calculation
  const totalIraValue = input.preTaxIraBalance + backdoorAmount; // after-tax basis = the new contribution
  const proRataTaxablePct = totalIraValue > 0 ? input.preTaxIraBalance / totalIraValue : 0;
  const proRataTaxOwed = backdoorAmount * proRataTaxablePct * input.marginalRate;
  const needsBasisIsolation = input.preTaxIraBalance > 0 && backdoorAmount > 0;

  // Compounding
  const growthFactor = Math.pow(1 + rate, years);
  const oneTimeProjection = totalRothContribution * growthFactor;
  const recurringProjection =
    rate === 0
      ? totalRothContribution * years
      : totalRothContribution * ((growthFactor - 1) / rate);
  const taxFreeGrowthOneTime = oneTimeProjection - totalRothContribution;

  return {
    contributionLimit: limit,
    eligibility,
    phaseout,
    directRothAllowed,
    backdoorAmount,
    totalRothContribution,
    proRataTaxablePct,
    proRataTaxOwed,
    needsBasisIsolation,
    oneTimeProjection,
    recurringProjection,
    taxFreeGrowthOneTime,
  };
}
