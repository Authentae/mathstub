/**
 * Double-Trigger RSU IPO/M&A acceleration calculator.
 *
 * Pre-IPO RSUs typically have a "double-trigger" vesting structure: both
 * (1) time-based service vesting AND (2) a liquidity event (IPO or M&A
 * acquisition) must occur before shares vest. When the liquidity event
 * fires, ALL time-vested-but-liquidity-blocked shares become taxable
 * W-2 income on a single date at the trigger-date FMV. For tech workers
 * holding 5,000–50,000 shares of a startup that just IPO'd, this is a
 * once-in-a-lifetime tax event measured in six or seven figures.
 *
 * Math:
 *   taxableIncome = shares × triggerFmv
 *   federalSupplementalWithheld = taxableIncome × 22% (or 37% on excess > $1M)
 *   realFederalOwed = taxableIncome × marginalRate
 *   federalShortfall = realFederalOwed − federalSupplementalWithheld
 *   stateSupplementalWithheld = taxableIncome × stateSupplementalRate
 *   realStateOwed = taxableIncome × stateMarginalRate
 *   stateShortfall = realStateOwed − stateSupplementalWithheld
 *   sellToCoverShares = (federalWithheld + stateWithheld + ficaWithheld) / triggerFmv
 *
 * Pure math — no React/Next/DOM imports. Portable to the Chrome ext and
 * Anthropic skill ports.
 */

import { TaxCalcError } from './types';

// IRS supplemental withholding rate thresholds (IRC §3402(g) + Treas. Reg.
// §31.3402(g)-1(a)(2)). On the first $1M of YTD supplemental wages, 22%
// flat. Above $1M, 37% on the excess.
const SUPPLEMENTAL_LOW_RATE = 0.22;
const SUPPLEMENTAL_HIGH_RATE = 0.37;
const SUPPLEMENTAL_HIGH_THRESHOLD_USD = 1_000_000;

// FICA: 6.2% Social Security (up to wage base) + 1.45% Medicare uncapped
// + 0.9% Additional Medicare above $200k single / $250k MFJ. Simplified
// to a flat blended rate here; the dedicated FICA module in lib/tax/fica.ts
// has the precise wage-base + Additional-Medicare logic.
const FICA_FLAT_RATE_APPROX = 0.0145; // Medicare only; SS wage base usually exceeded by tech workers

export interface DoubleTriggerRsuInput {
  /** Total time-vested shares released on the trigger date. */
  sharesReleased: number;
  /** FMV per share at the trigger event (IPO open price or M&A deal price). */
  triggerFmvUsd: number;
  /** Federal marginal rate (decimal, e.g., 0.35 for 35%). */
  federalMarginalRate: number;
  /** State marginal rate (decimal). Use 0 for TX/FL/NV/WA. */
  stateMarginalRate: number;
  /**
   * State supplemental withholding rate (decimal). For most states this
   * is the top marginal; CA uses 10.23% (RTC §18663). Use 0 for no-tax states.
   */
  stateSupplementalRate: number;
  /**
   * YTD supplemental wages already paid this year (RSU vests, prior bonuses).
   * Used to determine whether the $1M threshold has been crossed.
   */
  ytdSupplementalWagesUsd?: number;
  /**
   * Whether Social Security wage base has been hit YTD. If true, only
   * Medicare 1.45% (+ 0.9% Additional Medicare above threshold) applies.
   * Default true for $200k+ tech workers — they typically max out SS by
   * mid-year on regular salary alone.
   */
  ficaSsAlreadyMaxed?: boolean;
}

export interface DoubleTriggerRsuResult {
  taxableW2IncomeUsd: number;
  federalSupplementalWithheldUsd: number;
  federalSupplementalEffectiveRate: number;
  federalRealOwedUsd: number;
  federalShortfallUsd: number;
  stateSupplementalWithheldUsd: number;
  stateRealOwedUsd: number;
  stateShortfallUsd: number;
  ficaWithheldUsd: number;
  /** Total cash short at filing: fed + state shortfall, AFTER all withholding. */
  totalShortfallUsd: number;
  /** Shares the broker will withhold to cover taxes (sell-to-cover). */
  sellToCoverShares: number;
  /** Net shares delivered to the employee after sell-to-cover. */
  netSharesDelivered: number;
  /** Net cash value of the delivered shares at trigger FMV. */
  netSharesValueUsd: number;
}

function validate(input: DoubleTriggerRsuInput): void {
  const positive: Array<[keyof DoubleTriggerRsuInput, number | undefined]> = [
    ['sharesReleased', input.sharesReleased],
    ['triggerFmvUsd', input.triggerFmvUsd],
    ['federalMarginalRate', input.federalMarginalRate],
    ['stateMarginalRate', input.stateMarginalRate],
    ['stateSupplementalRate', input.stateSupplementalRate],
    ['ytdSupplementalWagesUsd', input.ytdSupplementalWagesUsd],
  ];
  for (const [name, value] of positive) {
    if (value !== undefined && (!Number.isFinite(value) || value < 0)) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.federalMarginalRate > 1 || input.stateMarginalRate > 1 || input.stateSupplementalRate > 1) {
    throw new TaxCalcError('Rates must be decimals (e.g., 0.35 not 35).');
  }
}

export function calculateDoubleTriggerRsu(input: DoubleTriggerRsuInput): DoubleTriggerRsuResult {
  validate(input);

  const taxableW2IncomeUsd = input.sharesReleased * input.triggerFmvUsd;

  // Federal supplemental withholding — 22% on portion below $1M YTD
  // supplemental, 37% on the excess. Blend across the threshold.
  const ytdSupp = input.ytdSupplementalWagesUsd ?? 0;
  const beforeThreshold = Math.max(0, SUPPLEMENTAL_HIGH_THRESHOLD_USD - ytdSupp);
  const lowPortion = Math.min(taxableW2IncomeUsd, beforeThreshold);
  const highPortion = Math.max(0, taxableW2IncomeUsd - lowPortion);
  const federalSupplementalWithheldUsd =
    lowPortion * SUPPLEMENTAL_LOW_RATE + highPortion * SUPPLEMENTAL_HIGH_RATE;
  const federalSupplementalEffectiveRate =
    taxableW2IncomeUsd > 0 ? federalSupplementalWithheldUsd / taxableW2IncomeUsd : 0;

  const federalRealOwedUsd = taxableW2IncomeUsd * input.federalMarginalRate;
  const federalShortfallUsd = Math.max(0, federalRealOwedUsd - federalSupplementalWithheldUsd);

  const stateSupplementalWithheldUsd = taxableW2IncomeUsd * input.stateSupplementalRate;
  const stateRealOwedUsd = taxableW2IncomeUsd * input.stateMarginalRate;
  const stateShortfallUsd = Math.max(0, stateRealOwedUsd - stateSupplementalWithheldUsd);

  // FICA — Medicare-only if SS already maxed (default true for $200k+ earners).
  // Additional Medicare 0.9% kicks in above $200k single / $250k MFJ on top
  // of the regular 1.45%, but for simplicity we use the flat 1.45% here;
  // tech workers with significant double-trigger income will already be in
  // the additional-medicare zone — they should add 0.9% to their input
  // federal marginal rate for that effect.
  const ficaSsAlreadyMaxed = input.ficaSsAlreadyMaxed ?? true;
  const ficaRate = ficaSsAlreadyMaxed ? FICA_FLAT_RATE_APPROX : FICA_FLAT_RATE_APPROX + 0.062;
  const ficaWithheldUsd = taxableW2IncomeUsd * ficaRate;

  const totalWithheld =
    federalSupplementalWithheldUsd + stateSupplementalWithheldUsd + ficaWithheldUsd;
  const totalShortfallUsd = federalShortfallUsd + stateShortfallUsd;

  // Sell-to-cover: broker sells enough shares at triggerFmv to cover the
  // total tax withheld (fed + state + FICA). The employee gets the rest.
  const sellToCoverShares =
    input.triggerFmvUsd > 0 ? totalWithheld / input.triggerFmvUsd : 0;
  const netSharesDelivered = Math.max(0, input.sharesReleased - sellToCoverShares);
  const netSharesValueUsd = netSharesDelivered * input.triggerFmvUsd;

  return {
    taxableW2IncomeUsd: Math.round(taxableW2IncomeUsd),
    federalSupplementalWithheldUsd: Math.round(federalSupplementalWithheldUsd),
    federalSupplementalEffectiveRate: Math.round(federalSupplementalEffectiveRate * 10000) / 10000,
    federalRealOwedUsd: Math.round(federalRealOwedUsd),
    federalShortfallUsd: Math.round(federalShortfallUsd),
    stateSupplementalWithheldUsd: Math.round(stateSupplementalWithheldUsd),
    stateRealOwedUsd: Math.round(stateRealOwedUsd),
    stateShortfallUsd: Math.round(stateShortfallUsd),
    ficaWithheldUsd: Math.round(ficaWithheldUsd),
    totalShortfallUsd: Math.round(totalShortfallUsd),
    sellToCoverShares: Math.ceil(sellToCoverShares), // broker rounds up
    netSharesDelivered: Math.floor(input.sharesReleased - Math.ceil(sellToCoverShares)),
    netSharesValueUsd: Math.round(
      Math.floor(input.sharesReleased - Math.ceil(sellToCoverShares)) * input.triggerFmvUsd,
    ),
  };
}
