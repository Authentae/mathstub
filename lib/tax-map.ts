/**
 * Equity-Comp Tax Map — the visual "journey" hub.
 *
 * Organizes all live calculators onto the real timeline a tech worker with
 * equity comp walks: grant → vest → exercise → sell → pay the IRS → recover
 * AMT → move states → build wealth. Each stage links to the calculator(s) that
 * solve the tax at that moment.
 *
 * NO React/Next/DOM imports — data + types only, like lib/tools.ts and
 * lib/toolkit.ts. Calculator metadata (title, emoji, summary) is NOT duplicated
 * here; it's resolved from lib/tools.ts at render time so this stays a single
 * source of truth for *ordering/grouping* only.
 */

import { findTool, type Tool } from './tools';

export interface TaxMapStage {
  id: string;
  /** Sequential step number shown in the node (1-based). */
  step: number;
  /** Emoji shown in the timeline node. */
  emoji: string;
  /** Short stage title. */
  title: string;
  /** One-line, plain-English description of what happens to your money here. */
  blurb: string;
  /** Calculator slugs that solve the tax at this stage. Resolved vs lib/tools. */
  calcSlugs: string[];
  /** Optional non-calculator CTA (used by the intro stage to link /start-here). */
  link?: { href: string; label: string };
}

export const TAX_MAP_STAGES: TaxMapStage[] = [
  {
    id: 'grant',
    step: 1,
    emoji: '🌱',
    title: 'It starts with an offer',
    blurb:
      'You sign on and get equity — RSUs, ISOs, or NSOs. No tax the day you’re granted, but almost every choice from here has a tax bill attached.',
    calcSlugs: [],
    link: { href: '/start-here', label: 'New to all this? Start with the basics' },
  },
  {
    id: 'vest',
    step: 2,
    emoji: '📈',
    title: 'Your RSUs vest',
    blurb:
      'The day shares land in your account, their value is taxed as income — and your employer usually withholds too little. This is where the surprise April bill is born.',
    calcSlugs: ['rsu-tax-shortfall', 'double-trigger-rsu'],
  },
  {
    id: 'bonus',
    step: 3,
    emoji: '💵',
    title: 'A cash bonus lands',
    blurb:
      'Bonuses are withheld at a flat 22%. If your real tax rate is higher, the gap shows up as money you owe later.',
    calcSlugs: ['bonus-tax-shortfall'],
  },
  {
    id: 'exercise',
    step: 4,
    emoji: '⚡',
    title: 'You exercise stock options',
    blurb:
      'Turning options into shares can trigger ordinary income (NSOs) or the Alternative Minimum Tax (ISOs). Run the numbers before you click “exercise.”',
    calcSlugs: ['iso-amt', 'nso-exercise', 'form-6251'],
  },
  {
    id: 'sell',
    step: 5,
    emoji: '🧾',
    title: 'You sell shares',
    blurb:
      'Your broker often reports a $0 cost basis — taxing money you already paid tax on at vest. Catch it before you file, or pay twice.',
    calcSlugs: ['rsu-cost-basis', 'espp-qualifying-disposition'],
  },
  {
    id: 'pay',
    step: 6,
    emoji: '🗓️',
    title: 'Stay ahead of the IRS',
    blurb:
      'Big equity income can mean you owe quarterly — or you can cure it with a single W-4 tweak. Either way, dodge the underpayment penalty.',
    calcSlugs: ['quarterly-estimated-tax', 'w4-step-4c'],
  },
  {
    id: 'recover',
    step: 7,
    emoji: '♻️',
    title: 'Get your AMT back',
    blurb:
      'If an ISO exercise cost you AMT, that money isn’t gone — it returns over future years as a credit. See when your balance hits $0.',
    calcSlugs: ['amt-credit-recovery'],
  },
  {
    id: 'move',
    step: 8,
    emoji: '🗺️',
    title: 'You move states',
    blurb:
      'California doesn’t stop taxing your old vests just because you left. See exactly what each state still claims after a move.',
    calcSlugs: ['ca-540nr', 'state-stock-comp'],
  },
  {
    id: 'wealth',
    step: 9,
    emoji: '🌀',
    title: 'Build tax-free wealth',
    blurb:
      'Once the comp tax is handled, route the surplus into the Roth space most high earners don’t realize they have.',
    calcSlugs: ['mega-backdoor-roth', 'backdoor-roth-ira', 'roth-sequencer'],
  },
];

export interface ResolvedStage extends Omit<TaxMapStage, 'calcSlugs'> {
  calcs: Tool[];
}

/**
 * Resolve each stage's calc slugs against lib/tools, keeping only LIVE tools.
 * Unknown or non-live slugs are dropped (the integrity test guards against
 * that ever happening silently).
 */
export function resolveTaxMap(): ResolvedStage[] {
  return TAX_MAP_STAGES.map(({ calcSlugs, ...rest }) => ({
    ...rest,
    calcs: calcSlugs
      .map((slug) => findTool(slug))
      .filter((t): t is Tool => Boolean(t) && t!.status === 'live'),
  }));
}
