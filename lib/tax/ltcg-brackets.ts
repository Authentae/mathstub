import type { FilingStatus, TaxYear } from './types';
import { TaxCalcError } from './types';

interface LtcgBracket {
  /** Lower bound (inclusive) of taxable income, USD. */
  from: number;
  /** Marginal LTCG rate as a fraction. */
  rate: number;
}

type LtcgTable = Record<FilingStatus, LtcgBracket[]>;

// IRS Rev. Proc. 2023-34 (tax year 2024) LTCG / qualified dividend brackets.
const LTCG_2024: LtcgTable = {
  single: [
    { from: 0, rate: 0 },
    { from: 47_025, rate: 0.15 },
    { from: 518_900, rate: 0.2 },
  ],
  mfj: [
    { from: 0, rate: 0 },
    { from: 94_050, rate: 0.15 },
    { from: 583_750, rate: 0.2 },
  ],
  mfs: [
    { from: 0, rate: 0 },
    { from: 47_025, rate: 0.15 },
    { from: 291_850, rate: 0.2 },
  ],
  hoh: [
    { from: 0, rate: 0 },
    { from: 63_000, rate: 0.15 },
    { from: 551_350, rate: 0.2 },
  ],
};

// IRS Rev. Proc. 2024-40 (tax year 2025) LTCG / qualified dividend brackets.
const LTCG_2025: LtcgTable = {
  single: [
    { from: 0, rate: 0 },
    { from: 48_350, rate: 0.15 },
    { from: 533_400, rate: 0.2 },
  ],
  mfj: [
    { from: 0, rate: 0 },
    { from: 96_700, rate: 0.15 },
    { from: 600_050, rate: 0.2 },
  ],
  mfs: [
    { from: 0, rate: 0 },
    { from: 48_350, rate: 0.15 },
    { from: 300_000, rate: 0.2 },
  ],
  hoh: [
    { from: 0, rate: 0 },
    { from: 64_750, rate: 0.15 },
    { from: 566_700, rate: 0.2 },
  ],
};

// IRS Rev. Proc. 2025-32 (tax year 2026) LTCG / qualified dividend brackets.
// Verified against Tax Foundation 2026 tables (checked 2026-06).
const LTCG_2026: LtcgTable = {
  single: [
    { from: 0, rate: 0 },
    { from: 49_450, rate: 0.15 },
    { from: 545_500, rate: 0.2 },
  ],
  mfj: [
    { from: 0, rate: 0 },
    { from: 98_900, rate: 0.15 },
    { from: 613_700, rate: 0.2 },
  ],
  mfs: [
    { from: 0, rate: 0 },
    { from: 49_450, rate: 0.15 },
    { from: 306_850, rate: 0.2 },
  ],
  hoh: [
    { from: 0, rate: 0 },
    { from: 66_200, rate: 0.15 },
    { from: 579_600, rate: 0.2 },
  ],
};

// Net Investment Income Tax (3.8%) MAGI thresholds — fixed by statute, not inflation-indexed.
const NIIT_RATE = 0.038;
const NIIT_THRESHOLD: Record<FilingStatus, number> = {
  single: 200_000,
  mfj: 250_000,
  mfs: 125_000,
  hoh: 200_000,
};

function ltcgTableFor(taxYear: TaxYear, filingStatus: FilingStatus): LtcgBracket[] {
  const table = taxYear === 2024 ? LTCG_2024 : taxYear === 2025 ? LTCG_2025 : LTCG_2026;
  return table[filingStatus];
}

/**
 * Marginal federal LTCG rate (fraction) at the given total taxable income.
 * Long-term capital gain "stacks" on top of ordinary income for bracket purposes,
 * so callers should pass income INCLUDING the gain (or above-gain ordinary income +
 * the gain itself) to find the rate the gain is taxed at.
 */
export function ltcgMarginalRate(
  taxableIncomeIncludingGainUsd: number,
  filingStatus: FilingStatus,
  taxYear: TaxYear,
): number {
  if (!Number.isFinite(taxableIncomeIncludingGainUsd) || taxableIncomeIncludingGainUsd < 0) {
    throw new TaxCalcError(`Invalid taxable income: ${taxableIncomeIncludingGainUsd}`);
  }
  const brackets = ltcgTableFor(taxYear, filingStatus);
  let rate = brackets[0]!.rate;
  for (const b of brackets) {
    if (taxableIncomeIncludingGainUsd >= b.from) rate = b.rate;
    else break;
  }
  return rate;
}

/**
 * Federal LTCG tax on a gain that stacks on top of `ordinaryTaxableIncomeUsd`.
 * Walks the brackets so that gains crossing thresholds are taxed correctly
 * (e.g. part at 15%, part at 20%).
 */
export function ltcgTax(
  ordinaryTaxableIncomeUsd: number,
  gainUsd: number,
  filingStatus: FilingStatus,
  taxYear: TaxYear,
): number {
  if (!Number.isFinite(ordinaryTaxableIncomeUsd) || ordinaryTaxableIncomeUsd < 0) {
    throw new TaxCalcError(`Invalid ordinary income: ${ordinaryTaxableIncomeUsd}`);
  }
  if (!Number.isFinite(gainUsd)) {
    throw new TaxCalcError(`Invalid gain: ${gainUsd}`);
  }
  if (gainUsd <= 0) return 0;
  const brackets = ltcgTableFor(taxYear, filingStatus);
  let tax = 0;
  let cursor = ordinaryTaxableIncomeUsd;
  const top = ordinaryTaxableIncomeUsd + gainUsd;
  for (let i = 0; i < brackets.length; i++) {
    const cur = brackets[i]!;
    const next = brackets[i + 1];
    const segmentLow = Math.max(cur.from, cursor);
    const segmentHigh = next ? Math.min(next.from, top) : top;
    if (segmentHigh > segmentLow) {
      tax += (segmentHigh - segmentLow) * cur.rate;
      cursor = segmentHigh;
    }
    if (!next || cursor >= top) break;
  }
  return tax;
}

/**
 * Net Investment Income Tax (3.8%) on the portion of investment income above
 * the MAGI threshold. Approximated using ordinary income + gain as MAGI proxy.
 */
export function niitOnGain(
  ordinaryTaxableIncomeUsd: number,
  investmentGainUsd: number,
  filingStatus: FilingStatus,
): number {
  if (!Number.isFinite(ordinaryTaxableIncomeUsd) || ordinaryTaxableIncomeUsd < 0) {
    throw new TaxCalcError(`Invalid ordinary income: ${ordinaryTaxableIncomeUsd}`);
  }
  if (!Number.isFinite(investmentGainUsd)) {
    throw new TaxCalcError(`Invalid investment gain: ${investmentGainUsd}`);
  }
  if (investmentGainUsd <= 0) return 0;
  const threshold = NIIT_THRESHOLD[filingStatus];
  const magi = ordinaryTaxableIncomeUsd + investmentGainUsd;
  if (magi <= threshold) return 0;
  const taxableAmount = Math.min(investmentGainUsd, magi - threshold);
  return taxableAmount * NIIT_RATE;
}

export const LTCG_RATES = {
  rates: [0, 0.15, 0.2] as const,
} as const;

export const NIIT = {
  rate: NIIT_RATE,
  thresholds: NIIT_THRESHOLD,
} as const;
