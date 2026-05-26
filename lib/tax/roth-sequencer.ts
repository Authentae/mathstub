/**
 * Backdoor + Mega-Backdoor Roth sequencing optimizer.
 *
 * Fills the OR-question gap between the 2 standalone calculators: should
 * I do Mega-Backdoor first, traditional Backdoor first, or both? And if
 * I have a pre-tax IRA balance that breaks the pro-rata rule, what is
 * the basis-isolation move that unlocks the traditional Backdoor?
 *
 * Delegates the underlying math to:
 *   - calculateMegaBackdoor (lib/tax/mega-backdoor-roth.ts)
 *   - calculateBackdoorRoth (lib/tax/backdoor-roth-ira.ts)
 *
 * Returns a step-by-step playbook + combined annual Roth capacity.
 *
 * Pure math — no React/Next/DOM imports. Portable to the Chrome ext and
 * Anthropic skill ports.
 */

import { calculateBackdoorRoth, type BackdoorRothResult } from './backdoor-roth-ira';
import { calculateMegaBackdoor, type MegaBackdoorResult } from './mega-backdoor-roth';
import { TaxCalcError, type FilingStatus, type TaxYear } from './types';

export interface RothSequencerInput {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  age: number;
  magi: number;
  /** Federal marginal rate (decimal, e.g. 0.32). */
  marginalRate: number;
  /** Pre-tax Traditional IRA balance year-end. Triggers basis-isolation step if > 0. */
  preTaxIraBalance: number;
  /** YTD employee elective deferral (pre-tax + Roth 401(k) combined). */
  employeeElectiveDeferral: number;
  /** Expected annual employer match $. */
  employerMatch: number;
  employerProfitSharing?: number;
  /** Does the 401(k) plan allow after-tax contributions? */
  planAllowsAfterTax: boolean;
  /** Does the plan allow in-service distribution OR in-plan Roth conversion (IRR)? */
  planAllowsConversion: boolean;
  /** Does the plan accept rollovers IN from outside IRAs (basis-isolation receiver)? */
  planAcceptsRolloversIn?: boolean;
  yearsToRetirement?: number;
  expectedReturnRate?: number;
}

export type SequencerStepKind =
  | 'basis-isolation' // Roll pre-tax IRA into 401(k) so pro-rata doesn't break the traditional Backdoor
  | 'mega-backdoor' // After-tax 401(k) → Roth conversion
  | 'backdoor-ira' // Non-deductible Traditional IRA contribution → Roth conversion
  | 'direct-roth' // Direct Roth IRA contribution (when MAGI below phaseout — no backdoor needed)
  | 'no-action'; // Blocked or already covered

export interface SequencerStep {
  kind: SequencerStepKind;
  /** 1-based step order. */
  order: number;
  /** Headline ("Do this first: …"). */
  headline: string;
  /** Body with the math. */
  body: string;
  /** Dollar capacity unlocked by this step (Roth contribution added). */
  rothCapacityUsd: number;
  /** Blocker explanation if this step is skipped (rendered greyed-out). */
  blockedReason: string | null;
}

export interface RothSequencerResult {
  mega: MegaBackdoorResult;
  backdoor: BackdoorRothResult;
  steps: SequencerStep[];
  /** Total annual Roth capacity unlocked across all live steps. */
  totalAnnualRothCapacityUsd: number;
  /** Decision summary headline (e.g., "Mega-Backdoor first: $35,500. Then Backdoor IRA: $7,000."). */
  recommendationHeadline: string;
}

function validate(input: RothSequencerInput): void {
  const positive: Array<[keyof RothSequencerInput, number | undefined]> = [
    ['magi', input.magi],
    ['marginalRate', input.marginalRate],
    ['preTaxIraBalance', input.preTaxIraBalance],
    ['employeeElectiveDeferral', input.employeeElectiveDeferral],
    ['employerMatch', input.employerMatch],
  ];
  for (const [name, value] of positive) {
    if (value === undefined || !Number.isFinite(value) || value < 0) {
      throw new TaxCalcError(`Invalid ${String(name)}: ${value}`);
    }
  }
  if (input.age < 0 || input.age > 120) {
    throw new TaxCalcError(`Age out of range: ${input.age}`);
  }
  if (input.marginalRate > 1) {
    throw new TaxCalcError(`marginalRate is a decimal — got ${input.marginalRate} (try 0.32 instead of 32)`);
  }
}

export function calculateRothSequencer(input: RothSequencerInput): RothSequencerResult {
  validate(input);

  const mega = calculateMegaBackdoor({
    taxYear: input.taxYear,
    age: input.age,
    employeeElectiveDeferral: input.employeeElectiveDeferral,
    employerMatch: input.employerMatch,
    employerProfitSharing: input.employerProfitSharing,
    planAllowsAfterTax: input.planAllowsAfterTax,
    planAllowsConversion: input.planAllowsConversion,
    yearsToRetirement: input.yearsToRetirement,
    expectedReturnRate: input.expectedReturnRate,
  });

  const backdoor = calculateBackdoorRoth({
    taxYear: input.taxYear,
    filingStatus: input.filingStatus,
    age: input.age,
    magi: input.magi,
    preTaxIraBalance: input.preTaxIraBalance,
    marginalRate: input.marginalRate,
    yearsToRetirement: input.yearsToRetirement,
    expectedReturnRate: input.expectedReturnRate,
  });

  const steps: SequencerStep[] = [];
  let order = 1;

  // STEP 1 (conditional): Basis isolation — only if user has pre-tax IRA balance
  // AND they actually need the backdoor path (MAGI above phaseout).
  const needsBackdoor =
    backdoor.eligibility === 'backdoor-required' || backdoor.eligibility === 'partial-direct';
  if (needsBackdoor && input.preTaxIraBalance > 0) {
    if (input.planAcceptsRolloversIn === false) {
      steps.push({
        kind: 'basis-isolation',
        order: order++,
        headline: 'BLOCKED — Basis isolation not available',
        body: `You have $${input.preTaxIraBalance.toLocaleString()} in pre-tax Traditional IRAs and your 401(k) plan does NOT accept rollovers IN. The pro-rata rule (IRC §408(d)(2)) will make ${(backdoor.proRataTaxablePct * 100).toFixed(1)}% of your Backdoor conversion taxable — costing $${Math.round(backdoor.proRataTaxOwed).toLocaleString()} in conversion tax. Options: (a) skip Backdoor and rely on Mega-Backdoor only; (b) ask your plan administrator to enable rollover-in; (c) do a one-time Roth conversion on the pre-tax balance and pay the tax.`,
        rothCapacityUsd: 0,
        blockedReason: 'plan does not accept rollovers IN',
      });
    } else {
      steps.push({
        kind: 'basis-isolation',
        order: order++,
        headline: `Step ${order - 1}: Roll your $${input.preTaxIraBalance.toLocaleString()} pre-tax Traditional IRA into your 401(k)`,
        body: `Pro-rata rule (IRC §408(d)(2)) treats all Traditional IRA balances as a single pool when you do a Backdoor conversion. With $${input.preTaxIraBalance.toLocaleString()} of pre-tax money on file, ${(backdoor.proRataTaxablePct * 100).toFixed(1)}% of your Backdoor conversion becomes taxable — that's $${Math.round(backdoor.proRataTaxOwed).toLocaleString()} of conversion tax you avoid by isolating the basis FIRST. Rollover-in of pre-tax IRA balance to your 401(k) clears the pro-rata pool and unlocks a clean Backdoor.`,
        rothCapacityUsd: 0,
        blockedReason: null,
      });
    }
  }

  // STEP 2: Mega-Backdoor (the big number for most plans that allow it)
  if (mega.megaBackdoorAmount > 0) {
    steps.push({
      kind: 'mega-backdoor',
      order: order++,
      headline: `Step ${order - 1}: Mega-Backdoor Roth — $${mega.megaBackdoorAmount.toLocaleString()}/yr`,
      body: `Your 401(k) plan allows both after-tax contributions AND in-service distribution. After your elective deferral ($${input.employeeElectiveDeferral.toLocaleString()}) + employer match ($${input.employerMatch.toLocaleString()})${input.employerProfitSharing ? ' + profit-sharing ($' + input.employerProfitSharing.toLocaleString() + ')' : ''} use $${mega.spaceUsed.toLocaleString()} of the IRC §415(c) $${mega.section415Limit.toLocaleString()} cap, the remaining $${mega.afterTaxRoom.toLocaleString()} can be contributed as after-tax then converted to Roth (IRS Notice 2014-54). Recurring 30-year projection: $${mega.recurringProjection.toLocaleString()}.`,
      rothCapacityUsd: mega.megaBackdoorAmount,
      blockedReason: null,
    });
  } else if (mega.blockedReason) {
    const explanations: Record<string, string> = {
      'plan-no-after-tax': "Your 401(k) plan does not allow after-tax contributions — Mega-Backdoor is not available. Talk to HR; some plans offer it but require an opt-in.",
      'plan-no-conversion': "Your plan allows after-tax contributions but does NOT support in-service distribution or in-plan Roth conversion. The after-tax money stays tax-deferred (not Roth). You can still do this and convert at separation.",
      'no-room': 'No after-tax room available — your elective deferral + employer match + profit-sharing already fill the §415(c) cap.',
    };
    steps.push({
      kind: 'mega-backdoor',
      order: order++,
      headline: 'Mega-Backdoor blocked',
      body: explanations[mega.blockedReason] ?? 'Mega-Backdoor not available.',
      rothCapacityUsd: 0,
      blockedReason: mega.blockedReason,
    });
  }

  // STEP 3: Backdoor IRA (or direct Roth if MAGI is low enough)
  if (backdoor.eligibility === 'direct-roth-available' && backdoor.directRothAllowed > 0) {
    steps.push({
      kind: 'direct-roth',
      order: order++,
      headline: `Step ${order - 1}: Direct Roth IRA — $${backdoor.directRothAllowed.toLocaleString()}/yr`,
      body: `Your MAGI ($${input.magi.toLocaleString()}) is below the ${input.filingStatus === 'single' ? 'single' : input.filingStatus} Roth IRA phaseout — no backdoor maneuver needed. Contribute directly to your Roth IRA.`,
      rothCapacityUsd: backdoor.directRothAllowed,
      blockedReason: null,
    });
  } else if (backdoor.totalRothContribution > 0) {
    const ineligibleForBackdoor =
      input.preTaxIraBalance > 0 && input.planAcceptsRolloversIn === false;
    if (ineligibleForBackdoor) {
      steps.push({
        kind: 'backdoor-ira',
        order: order++,
        headline: 'Backdoor IRA blocked by pro-rata',
        body: `Pre-tax IRA balance of $${input.preTaxIraBalance.toLocaleString()} cannot be isolated (plan rejects rollover-in). Doing the Backdoor here would cost $${Math.round(backdoor.proRataTaxOwed).toLocaleString()} in pro-rata conversion tax. Skip for now; do Mega-Backdoor only.`,
        rothCapacityUsd: 0,
        blockedReason: 'pro-rata',
      });
    } else {
      const bodyParts = [
        `Annual IRA contribution limit: $${backdoor.contributionLimit.toLocaleString()} (${backdoor.eligibility === 'partial-direct' ? `partial direct $${backdoor.directRothAllowed.toLocaleString()} + backdoor $${backdoor.backdoorAmount.toLocaleString()}` : `pure backdoor $${backdoor.backdoorAmount.toLocaleString()}`}).`,
      ];
      if (input.preTaxIraBalance === 0) {
        bodyParts.push("Pro-rata rule clean — $0 of conversion is taxable because you have $0 pre-tax IRA basis.");
      } else if (steps.some((s) => s.kind === 'basis-isolation' && s.blockedReason === null)) {
        bodyParts.push('After Step 1 (basis isolation), pro-rata is clean and $0 of the conversion is taxable.');
      }
      bodyParts.push(`Recurring 30-year projection: $${backdoor.recurringProjection.toLocaleString()}.`);
      steps.push({
        kind: 'backdoor-ira',
        order: order++,
        headline: `Step ${order - 1}: Backdoor Roth IRA — $${backdoor.totalRothContribution.toLocaleString()}/yr`,
        body: bodyParts.join(' '),
        rothCapacityUsd: backdoor.totalRothContribution,
        blockedReason: null,
      });
    }
  }

  // If nothing populated, drop a no-action step
  if (steps.length === 0) {
    steps.push({
      kind: 'no-action',
      order: 1,
      headline: 'No Roth maneuver currently available',
      body: 'Mega-Backdoor blocked AND traditional Backdoor blocked (likely MFS-trapped or both plan issues). Consider direct Roth 401(k) contributions instead, or talk to HR about plan amendments.',
      rothCapacityUsd: 0,
      blockedReason: 'all-blocked',
    });
  }

  const totalAnnualRothCapacityUsd = steps.reduce((acc, s) => acc + s.rothCapacityUsd, 0);

  // Recommendation headline
  let recommendationHeadline = '';
  if (totalAnnualRothCapacityUsd === 0) {
    recommendationHeadline = 'No Roth capacity available with current plan + MAGI inputs.';
  } else {
    const liveSteps = steps.filter((s) => s.rothCapacityUsd > 0);
    const parts = liveSteps.map((s) => {
      const labels: Partial<Record<SequencerStepKind, string>> = {
        'mega-backdoor': 'Mega-Backdoor',
        'backdoor-ira': 'Backdoor IRA',
        'direct-roth': 'Direct Roth',
      };
      return `${labels[s.kind]} $${s.rothCapacityUsd.toLocaleString()}`;
    });
    recommendationHeadline = parts.join(' + ') + ` = $${totalAnnualRothCapacityUsd.toLocaleString()}/yr Roth.`;
  }

  return {
    mega,
    backdoor,
    steps,
    totalAnnualRothCapacityUsd,
    recommendationHeadline,
  };
}
