import type { FilingStatus, TaxYear } from './types';
import { TaxCalcError } from './types';

interface AmtTable {
  /** AMT exemption amount before phaseout. */
  exemption: Record<FilingStatus, number>;
  /** AMTI threshold above which the exemption phases out (25¢ per $1). */
  phaseoutStart: Record<FilingStatus, number>;
  /** AMTI threshold where the 26%→28% rate change occurs. */
  rateBreakpoint: Record<FilingStatus, number>;
}

// 2025 (Rev. Proc. 2024-40).
const AMT_2025: AmtTable = {
  exemption: {
    single: 88_100,
    mfj: 137_000,
    mfs: 68_500,
    hoh: 88_100,
  },
  phaseoutStart: {
    single: 626_350,
    mfj: 1_252_700,
    mfs: 626_350,
    hoh: 626_350,
  },
  rateBreakpoint: {
    single: 239_100,
    mfj: 239_100,
    mfs: 119_550,
    hoh: 239_100,
  },
};

// 2026 projected (~2.8% CPI). Replace with IRS Rev. Proc. when published.
const AMT_2026: AmtTable = {
  exemption: {
    single: 90_567,
    mfj: 140_836,
    mfs: 70_418,
    hoh: 90_567,
  },
  phaseoutStart: {
    single: 643_888,
    mfj: 1_287_776,
    mfs: 643_888,
    hoh: 643_888,
  },
  rateBreakpoint: {
    single: 245_795,
    mfj: 245_795,
    mfs: 122_898,
    hoh: 245_795,
  },
};

const AMT_LOW_RATE = 0.26;
const AMT_HIGH_RATE = 0.28;
const AMT_PHASEOUT_RATE = 0.25;

function tableFor(taxYear: TaxYear): AmtTable {
  return taxYear === 2025 ? AMT_2025 : AMT_2026;
}

/**
 * AMT exemption available to a filer with the given AMTI.
 * Exemption phases out at 25¢ per $1 of AMTI above the phaseout start, fully exhausted
 * when (AMTI − phaseoutStart) × 0.25 ≥ baseExemption.
 */
export function amtExemption(
  amtiUsd: number,
  filingStatus: FilingStatus,
  taxYear: TaxYear,
): number {
  if (!Number.isFinite(amtiUsd) || amtiUsd < 0) {
    throw new TaxCalcError(`Invalid AMTI: ${amtiUsd}`);
  }
  const table = tableFor(taxYear);
  const base = table.exemption[filingStatus];
  const phaseoutStart = table.phaseoutStart[filingStatus];
  const reduction = Math.max(0, amtiUsd - phaseoutStart) * AMT_PHASEOUT_RATE;
  return Math.max(0, base - reduction);
}

/**
 * Tentative Minimum Tax (TMT) = 26% × min(AMT base, breakpoint) + 28% × excess.
 * AMT base = max(0, AMTI − exemption). Returns TMT in USD.
 */
export function tentativeMinimumTax(
  amtiUsd: number,
  filingStatus: FilingStatus,
  taxYear: TaxYear,
): number {
  if (!Number.isFinite(amtiUsd) || amtiUsd < 0) {
    throw new TaxCalcError(`Invalid AMTI: ${amtiUsd}`);
  }
  const table = tableFor(taxYear);
  const exemption = amtExemption(amtiUsd, filingStatus, taxYear);
  const base = Math.max(0, amtiUsd - exemption);
  const breakpoint = table.rateBreakpoint[filingStatus];
  if (base <= breakpoint) return base * AMT_LOW_RATE;
  return breakpoint * AMT_LOW_RATE + (base - breakpoint) * AMT_HIGH_RATE;
}

export const AMT_RATES = {
  low: AMT_LOW_RATE,
  high: AMT_HIGH_RATE,
  phaseoutRate: AMT_PHASEOUT_RATE,
} as const;
