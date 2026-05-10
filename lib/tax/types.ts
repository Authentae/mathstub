export type FilingStatus = 'single' | 'mfj' | 'mfs' | 'hoh';
export type TaxYear = 2024 | 2025 | 2026;

export interface RsuShortfallInput {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  /** Fair market value of shares vested in this event, USD. */
  vestGrossUsd: number;
  /** Year-to-date supplemental wages already paid (RSU vests, bonuses) BEFORE this vest. */
  ytdSupplementalWagesUsd: number;
  /** Year-to-date regular W-2 wages BEFORE this vest. */
  ytdRegularWagesUsd: number;
  /** Other taxable income for the year (spouse W-2, dividends, interest, etc.). */
  otherTaxableIncomeUsd: number;
  /** Pre-tax deductions YTD (401k, HSA) reducing federal taxable wages. */
  preTaxDeductionsUsd: number;
  /** Two-letter state code, e.g. "CA". Use "XX" if unknown / no state tax. */
  stateCode: string;
  /** Optional override for state marginal rate as a percentage (e.g. 9.3). */
  stateOverrideRatePct?: number;
  /** True if the user has already maxed Social Security wage base via another employer. */
  ficaAlreadyMaxed?: boolean;
}

export interface FicaBreakdown {
  ssUsd: number;
  medicareUsd: number;
  additionalMedicareUsd: number;
}

export interface RsuShortfallResult {
  vestGrossUsd: number;

  withheldFederalUsd: number;
  withheldStateUsd: number;
  withheldFicaUsd: number;

  expectedFederalUsd: number;
  expectedStateUsd: number;
  expectedFicaUsd: number;

  /** expectedTotal - withheldTotal. Positive = owe more, negative = refund expected. */
  shortfallUsd: number;

  /** If the safe-harbor threshold is exceeded, suggested quarterly estimate. */
  suggestedQuarterlyEstimateUsd: number;
  /** If shortfall is positive, suggested per-paycheck extra W-4 withholding for the rest of the year. */
  suggestedExtraW4PerPaycheckUsd: number;
  /** Approximate bi-weekly paychecks remaining this calendar year from "today". */
  paychecksRemainingThisYear: number;
  /** True if shortfall exceeds the IRS safe-harbor threshold ($1,000). */
  isUnderpaymentRisk: boolean;

  marginalFederalRatePct: number;
  effectiveFederalRatePct: number;
  marginalStateRatePct: number;

  /** Federal supplemental withholding rate applied to this vest, as a fraction (0.22 or 0.37 typically). */
  appliedFederalSupplementalRate: number;
}

export type IsoScenario = 'exercise-and-hold' | 'exercise-and-sell-same-year';

export interface IsoAmtInput {
  taxYear: TaxYear;
  filingStatus: FilingStatus;

  /** Strike price per share, USD. */
  strikePricePerShareUsd: number;
  /** Fair market value per share on the exercise date, USD. */
  fmvAtExercisePerShareUsd: number;
  /** Number of options exercised. */
  sharesExercised: number;

  /** Year-to-date regular W-2 wages (excluding any same-year disqualifying ordinary income). */
  ytdRegularWagesUsd: number;
  /** Other taxable income for the year (spouse W-2, dividends, interest, etc.). */
  otherTaxableIncomeUsd: number;
  /** Pre-tax deductions YTD (401k, HSA). */
  preTaxDeductionsUsd: number;

  stateCode: string;
  stateOverrideRatePct?: number;

  scenario: IsoScenario;
  /**
   * Per-share sale price for `exercise-and-sell-same-year`. If omitted, defaults
   * to FMV at exercise (a "cashless" same-day-sale at exercise FMV). Ignored for
   * `exercise-and-hold`.
   */
  salePricePerShareUsd?: number;
}

export interface IsoAmtResult {
  scenario: IsoScenario;

  bargainElementPerShareUsd: number;
  totalBargainElementUsd: number;

  /** Regular taxable income for the year BEFORE this ISO exercise. */
  regularTaxableIncomeBaseUsd: number;
  /** Regular taxable income AFTER this ISO event (only changes on disqualifying same-year sale). */
  regularTaxableIncomeAfterUsd: number;

  /** Alternative Minimum Taxable Income (AMTI) used for AMT calc. */
  amtiUsd: number;
  amtExemptionUsd: number;
  /** Tentative Minimum Tax. */
  tentativeMinimumTaxUsd: number;
  /** Regular federal tax on regularTaxableIncomeAfter (used for AMT comparison). */
  regularFederalTaxUsd: number;
  /** AMT actually owed = max(0, TMT − regular federal tax). Zero on disqualifying same-year sale. */
  amtOwedUsd: number;

  /** Additional ordinary income added (only nonzero on disqualifying same-year sale). */
  additionalOrdinaryIncomeUsd: number;
  /** Additional federal tax on the disqualifying ordinary income at marginal rate. */
  additionalFederalOrdinaryTaxUsd: number;
  /** Additional state tax on the disqualifying ordinary income at marginal rate. */
  additionalStateTaxUsd: number;

  /** AMT credit generated this year (carries forward to offset future regular tax). */
  amtCreditCarryforwardUsd: number;

  totalTaxIncreaseUsd: number;
  cashRequiredToExerciseUsd: number;
  marginalFederalRatePct: number;
  marginalStateRatePct: number;

  /** Notes returned to the UI explaining edge cases (e.g. "no AMT triggered"). */
  notes: string[];
}

export type EsppDispositionType = 'qualifying' | 'disqualifying';

export interface EsppQualifyingInput {
  taxYear: TaxYear;
  filingStatus: FilingStatus;

  /** Per-share fair market value on the offer/grant date (start of offering period). */
  offerDateFmvUsd: number;
  /** Per-share fair market value on the purchase date (end of offering period). */
  purchaseDateFmvUsd: number;
  /** Plan discount as a percentage, typically 15. */
  discountPct: number;
  /** Number of shares purchased in this lot. */
  sharesPurchased: number;
  /** Per-share sale price. */
  salePricePerShareUsd: number;

  /** ISO YYYY-MM-DD. Used to verify qualifying-disposition holding requirements. */
  offerDate: string;
  purchaseDate: string;
  saleDate: string;

  /** YTD regular W-2 wages (before this disposition). */
  ytdRegularWagesUsd: number;
  /** Other taxable income for the year (spouse W-2, dividends, etc.). */
  otherTaxableIncomeUsd: number;
  /** Pre-tax deductions YTD (401k, HSA). */
  preTaxDeductionsUsd: number;

  stateCode: string;
  stateOverrideRatePct?: number;
}

export interface EsppQualifyingResult {
  /** True if both holding requirements are met (>2y from offer, >1y from purchase). */
  isQualifying: boolean;
  /** Whole months elapsed from offer date to sale date. */
  monthsFromOffer: number;
  /** Whole months elapsed from purchase date to sale date. */
  monthsFromPurchase: number;

  purchasePricePerShareUsd: number;
  ordinaryIncomePerShareUsd: number;
  capitalGainPerShareUsd: number;

  totalSharesProceedsUsd: number;
  totalOrdinaryIncomeUsd: number;
  totalCapitalGainUsd: number;

  federalOrdinaryTaxUsd: number;
  federalLtcgTaxUsd: number;
  niitUsd: number;
  stateTaxUsd: number;
  totalTaxUsd: number;

  netProceedsAfterTaxUsd: number;
  marginalFederalRatePct: number;
  marginalLtcgRatePct: number;
  marginalStateRatePct: number;

  /** Comparison: total tax if sold today as a disqualifying disposition instead. */
  disqualifyingComparisonTaxUsd: number;
  /** Difference: positive = qualifying saves you this much vs. disqualifying. */
  qualifyingSavingsVsDisqualifyingUsd: number;
}

export class TaxCalcError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'TaxCalcError';
  }
}
