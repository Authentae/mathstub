import type { FilingStatus, TaxYear } from './types';
import { TaxCalcError } from './types';

interface AmtTable {
  /** AMT exemption amount before phaseout. */
  exemption: Record<FilingStatus, number>;
  /** AMTI threshold above which the exemption phases out. */
  phaseoutStart: Record<FilingStatus, number>;
  /**
   * Exemption phaseout rate per $1 of AMTI above phaseoutStart. 25¢ for
   * 2018–2025; OBBBA accelerated it to 50¢ starting 2026.
   */
  phaseoutRate: number;
  /** AMTI threshold where the 26%→28% rate change occurs. */
  rateBreakpoint: Record<FilingStatus, number>;
}

// 2024 (Rev. Proc. 2023-34).
const AMT_2024: AmtTable = {
  exemption: {
    single: 85_700,
    mfj: 133_300,
    mfs: 66_650,
    hoh: 85_700,
  },
  phaseoutStart: {
    single: 609_350,
    mfj: 1_218_700,
    mfs: 609_350,
    hoh: 609_350,
  },
  phaseoutRate: 0.25,
  rateBreakpoint: {
    single: 232_600,
    mfj: 232_600,
    mfs: 116_300,
    hoh: 232_600,
  },
};

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
  phaseoutRate: 0.25,
  rateBreakpoint: {
    single: 239_100,
    mfj: 239_100,
    mfs: 119_550,
    hoh: 239_100,
  },
};

// 2026 — IRS Rev. Proc. 2025-32, as amended by the One Big Beautiful Bill Act.
// OBBBA returned the exemption phaseout START to 2018 levels ($500k single /
// $1M MFJ) AND doubled the phaseout RATE from 25¢ to 50¢ per $1 of excess AMTI.
// Verified against IRS + Tax Foundation 2026 tables (checked 2026-06).
const AMT_2026: AmtTable = {
  exemption: {
    single: 90_100,
    mfj: 140_200,
    mfs: 70_100,
    hoh: 90_100,
  },
  phaseoutStart: {
    single: 500_000,
    mfj: 1_000_000,
    mfs: 500_000,
    hoh: 500_000,
  },
  phaseoutRate: 0.5,
  rateBreakpoint: {
    single: 244_500,
    mfj: 244_500,
    mfs: 122_250,
    hoh: 244_500,
  },
};

const AMT_LOW_RATE = 0.26;
const AMT_HIGH_RATE = 0.28;

function tableFor(taxYear: TaxYear): AmtTable {
  return taxYear === 2024 ? AMT_2024 : taxYear === 2025 ? AMT_2025 : AMT_2026;
}

/**
 * AMT exemption available to a filer with the given AMTI.
 * Exemption phases out at the year's phaseout rate (25¢ for 2018–2025, 50¢ from
 * 2026 per OBBBA) per $1 of AMTI above the phaseout start, fully exhausted when
 * (AMTI − phaseoutStart) × rate ≥ baseExemption.
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
  const reduction = Math.max(0, amtiUsd - phaseoutStart) * table.phaseoutRate;
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
} as const;

/** Exemption phaseout rate for a given year (25¢ pre-2026, 50¢ from 2026 per OBBBA). */
export function amtPhaseoutRate(taxYear: TaxYear): number {
  return tableFor(taxYear).phaseoutRate;
}
