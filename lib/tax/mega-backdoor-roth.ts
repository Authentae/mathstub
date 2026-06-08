/**
 * Mega-Backdoor Roth contribution calculator.
 *
 * For tech workers with employer-sponsored 401(k) plans that allow
 * **after-tax contributions** AND either **in-service distributions** or
 * **in-plan Roth conversions (IRR)**, the IRS §415 overall limit (~$70k)
 * leaves room above the standard employee elective deferral ($23.5k) for
 * tens of thousands of additional Roth space per year.
 *
 *   §415(c) total contributions
 *   = employee elective deferral
 *     + employer match
 *     + after-tax employee contributions       ← Mega-Backdoor source
 *     + any employer profit-sharing
 *
 *   After-tax room = §415 limit − (elective + employer match + profit-sharing)
 *
 * The after-tax contributions are then converted (in-service distribution
 * or in-plan Roth conversion) to a Roth IRA / Roth 401(k), unlocking
 * tax-free growth on contributions that wouldn't otherwise fit in any
 * Roth vehicle (most high earners are over the direct-Roth-IRA income
 * limit and can only access $7,000/yr via Backdoor Roth — the
 * Mega-Backdoor adds an order of magnitude more space).
 *
 * Cited: IRC §415(c), §402(g); IRS Notice 2014-54 (basis isolation);
 * Rev. Rul. 2014-9. 2025 limits from IRS Notice 2024-80.
 */

import type { TaxYear } from './types';

export const MEGA_BACKDOOR_RULES = {
  source: 'IRC §415(c), §402(g); IRS Notice 2024-80 (2025 limits)',
} as const;

/**
 * §415(c) overall annual contribution limit per IRS.
 * 2026 limit not yet announced (typically late Oct of prior year);
 * we default to the 2025 limit + a conservative 1.5% COLA placeholder.
 */
export function section415Limit(taxYear: TaxYear): number {
  switch (taxYear) {
    case 2024:
      return 69_000;
    case 2025:
      return 70_000;
    case 2026:
      return 72_000; // IRS Notice 2025-67.
    default:
      return 70_000;
  }
}

/** §402(g)(1) employee elective deferral limit (pre-tax + Roth 401(k) combined). */
export function electiveDeferralLimit(taxYear: TaxYear, age: number): number {
  // Base limit
  let base: number;
  switch (taxYear) {
    case 2024:
      base = 23_000;
      break;
    case 2025:
      base = 23_500;
      break;
    case 2026:
      base = 24_500; // IRS Notice 2025-67.
      break;
    default:
      base = 23_500;
  }
  // Age 50+ catch-up
  let catchUp = 0;
  if (age >= 50) {
    catchUp = taxYear === 2024 ? 7_500 : taxYear === 2025 ? 7_500 : 8_000;
  }
  // SECURE 2.0 super catch-up for ages 60–63 (effective 2025). Published
  // explicitly at $11,250 for both 2025 and 2026 (IRS Notice 2024-80 /
  // 2025-67) — not a clean 150% of the indexed 50+ catch-up, so use the
  // stated figure rather than recomputing.
  if (age >= 60 && age <= 63 && taxYear >= 2025) {
    catchUp = 11_250;
  }
  return base + catchUp;
}

export interface MegaBackdoorInput {
  taxYear: TaxYear;
  age: number;
  /** Current YTD employee elective deferral (pre-tax + Roth combined). */
  employeeElectiveDeferral: number;
  /** Expected annual employer match $. */
  employerMatch: number;
  /** Expected employer non-elective / profit-sharing $. Often 0. */
  employerProfitSharing?: number;
  /** Does the 401(k) plan allow after-tax contributions? */
  planAllowsAfterTax: boolean;
  /** Does the plan allow in-service distribution OR in-plan Roth conversion (IRR)? */
  planAllowsConversion: boolean;
  /** Projection horizon — years until you tap the money. */
  yearsToRetirement?: number;
  /** Assumed annual return for projection (default 7%). */
  expectedReturnRate?: number;
}

export interface MegaBackdoorResult {
  /** §415 overall limit for the tax year. */
  section415Limit: number;
  /** §402(g) elective deferral limit including any catch-up. */
  electiveLimit: number;
  /** Sum of elective deferral + employer match + employer profit-sharing. */
  spaceUsed: number;
  /** Available room for after-tax employee contributions. */
  afterTaxRoom: number;
  /** Mega-Backdoor amount — equals afterTaxRoom if plan supports it, else 0. */
  megaBackdoorAmount: number;
  /** Why amount is 0 (when applicable). */
  blockedReason: 'plan-no-after-tax' | 'plan-no-conversion' | 'no-room' | null;
  /**
   * Projected after-growth Roth balance from doing this ONCE this year,
   * compounded at expectedReturnRate over yearsToRetirement.
   */
  oneTimeProjection: number;
  /**
   * Projected balance if you do this EVERY year for yearsToRetirement years,
   * assuming the same amount each year compounded at expectedReturnRate.
   */
  recurringProjection: number;
  /** Federal income tax NOT paid on the future growth (Roth = tax-free). */
  taxFreeGrowthOneTime: number;
}

/**
 * Calculate available Mega-Backdoor Roth room for the given year.
 */
export function calculateMegaBackdoor(input: MegaBackdoorInput): MegaBackdoorResult {
  if (input.age < 0 || input.age > 120) {
    throw new Error('Age must be between 0 and 120');
  }
  if (input.employeeElectiveDeferral < 0) {
    throw new Error('Employee elective deferral cannot be negative');
  }
  if (input.employerMatch < 0) {
    throw new Error('Employer match cannot be negative');
  }
  const profitSharing = input.employerProfitSharing ?? 0;
  if (profitSharing < 0) {
    throw new Error('Employer profit-sharing cannot be negative');
  }
  const years = input.yearsToRetirement ?? 20;
  if (years < 0 || years > 60) {
    throw new Error('Years to retirement must be between 0 and 60');
  }
  const rate = input.expectedReturnRate ?? 0.07;
  if (rate < -0.5 || rate > 1) {
    throw new Error('Expected return rate must be reasonable (-50% to 100%)');
  }

  const limit = section415Limit(input.taxYear);
  const electiveLimit = electiveDeferralLimit(input.taxYear, input.age);

  // Clip elective deferral to its statutory cap
  const electiveDeferral = Math.min(input.employeeElectiveDeferral, electiveLimit);
  const spaceUsed = electiveDeferral + input.employerMatch + profitSharing;
  const afterTaxRoom = Math.max(0, limit - spaceUsed);

  let blockedReason: MegaBackdoorResult['blockedReason'] = null;
  let megaBackdoorAmount = afterTaxRoom;

  if (!input.planAllowsAfterTax) {
    blockedReason = 'plan-no-after-tax';
    megaBackdoorAmount = 0;
  } else if (!input.planAllowsConversion) {
    blockedReason = 'plan-no-conversion';
    megaBackdoorAmount = 0;
  } else if (afterTaxRoom === 0) {
    blockedReason = 'no-room';
    megaBackdoorAmount = 0;
  }

  // Compounding projections
  const growthFactor = Math.pow(1 + rate, years);
  const oneTimeProjection = megaBackdoorAmount * growthFactor;
  // Future value of annuity (end-of-period contribution)
  const recurringProjection =
    rate === 0 ? megaBackdoorAmount * years : megaBackdoorAmount * ((growthFactor - 1) / rate);

  // Tax-free growth on one-time = (projection - principal)
  // The tax savings vs. equivalent taxable-brokerage growth depends on LTCG bracket;
  // we report the raw growth that's now tax-free, which is the more conservative number
  const taxFreeGrowthOneTime = oneTimeProjection - megaBackdoorAmount;

  return {
    section415Limit: limit,
    electiveLimit,
    spaceUsed,
    afterTaxRoom,
    megaBackdoorAmount,
    blockedReason,
    oneTimeProjection,
    recurringProjection,
    taxFreeGrowthOneTime,
  };
}
