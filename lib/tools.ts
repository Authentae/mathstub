export type ToolStatus = 'live' | 'planned';

/**
 * Topic grouping for the homepage calculator directory (and reusable for
 * future nav / sitemap clustering). Every tool MUST carry a category so it
 * appears in a labeled group on the homepage; an uncategorized tool falls
 * into a defensive "More" bucket rather than silently disappearing.
 */
export type ToolCategory =
  | 'rsu'
  | 'options'
  | 'espp-startup'
  | 'withholding'
  | 'multistate'
  | 'roth';

export interface Tool {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  status: ToolStatus;
  category: ToolCategory;
  emoji?: string;
}

export const tools: Tool[] = [
  {
    id: 'rsu-tax-shortfall',
    slug: 'rsu-tax-shortfall',
    title: 'RSU Tax Withholding Shortfall Calculator',
    shortTitle: 'RSU Tax Shortfall',
    summary:
      'Estimate the gap between what your employer withholds at RSU vest (22% or 37%) and what you actually owe at your marginal rate.',
    status: 'live',
    category: 'rsu',
    emoji: '📈',
  },
  {
    id: 'rsu-cost-basis',
    slug: 'rsu-cost-basis',
    title: 'RSU Cost Basis Correction Calculator',
    shortTitle: 'RSU Cost Basis Fix',
    summary:
      'Brokers report $0 cost basis on RSU sales, double-taxing income already on your W-2. See your correct basis (FMV at vest), the tax you’d overpay, and the exact Form 8949 code-B adjustment.',
    status: 'live',
    category: 'rsu',
    emoji: '🧮',
  },
  {
    id: 'espp-qualifying-disposition',
    slug: 'espp-qualifying-disposition',
    title: 'ESPP Qualifying Disposition Tax Calculator',
    shortTitle: 'ESPP Qualifying Disposition',
    summary:
      'Split a §423 ESPP sale into ordinary income vs. long-term capital gain, apply federal LTCG + NIIT + state tax, and compare against disqualifying treatment.',
    status: 'live',
    category: 'espp-startup',
    emoji: '🧾',
  },
  {
    id: 'iso-amt',
    slug: 'iso-amt',
    title: 'ISO Exercise AMT Calculator',
    shortTitle: 'ISO / AMT',
    summary:
      'Estimate the Alternative Minimum Tax on an ISO exercise, the cash required, and the AMT credit you’ll carry forward — plus a same-year-sale comparison.',
    status: 'live',
    category: 'options',
    emoji: '⚡',
  },
  {
    id: 'quarterly-estimated-tax',
    slug: 'quarterly-estimated-tax',
    title: 'Quarterly Estimated Tax Safe-Harbor Calculator',
    shortTitle: 'Quarterly Estimated Tax',
    summary:
      'Compute your IRS §6654 safe-harbor target, see the per-quarter cumulative payment schedule, and get the exact dollar amount to send before the next due date.',
    status: 'live',
    category: 'withholding',
    emoji: '🗓️',
  },
  {
    id: 'amt-credit-recovery',
    slug: 'amt-credit-recovery',
    title: 'AMT Credit Recovery Calculator',
    shortTitle: 'AMT Credit Recovery',
    summary:
      'Project your IRC §53 Minimum Tax Credit (Form 8801) recovery year-by-year — see when the balance hits $0 based on your projected income.',
    status: 'live',
    category: 'options',
    emoji: '♻️',
  },
  {
    id: 'nso-exercise',
    slug: 'nso-exercise',
    title: 'NSO Exercise Tax Calculator',
    shortTitle: 'NSO Exercise',
    summary:
      'Estimate the ordinary-income tax + FICA on a non-qualified stock option exercise — bargain element, supplemental withholding, marginal-rate shortfall, and state.',
    status: 'live',
    category: 'options',
    emoji: '🎯',
  },
  {
    id: 'bonus-tax-shortfall',
    slug: 'bonus-tax-shortfall',
    title: 'Bonus Tax Withholding Shortfall Calculator',
    shortTitle: 'Bonus Tax Shortfall',
    summary:
      'Estimate the gap between the flat 22% (or 37%) supplemental withholding on your cash bonus and what you actually owe at your marginal rate.',
    status: 'live',
    category: 'withholding',
    emoji: '💵',
  },
  {
    id: 'state-stock-comp',
    slug: 'state-stock-comp',
    title: 'State Stock-Comp Tax Lookup',
    shortTitle: 'State Stock-Comp Lookup',
    summary:
      'Top marginal rate, supplemental withholding, AMT status, and LTCG treatment for RSU/ESPP/ISO income across all 50 states + DC.',
    status: 'live',
    category: 'multistate',
    emoji: '🗺️',
  },
  {
    id: 'mega-backdoor-roth',
    slug: 'mega-backdoor-roth',
    title: 'Mega-Backdoor Roth Calculator',
    shortTitle: 'Mega-Backdoor Roth',
    summary:
      'Estimate the after-tax 401(k) room your plan leaves under the §415(c) $70k cap — the source of the Mega-Backdoor Roth that high earners use for $30–46k/yr of extra Roth space.',
    status: 'live',
    category: 'roth',
    emoji: '🌀',
  },
  {
    id: 'backdoor-roth-ira',
    slug: 'backdoor-roth-ira',
    title: 'Backdoor Roth IRA Calculator',
    shortTitle: 'Backdoor Roth IRA',
    summary:
      'Roth IRA phaseout check + pro-rata tax (§408(d)(2)) on the Trad-to-Roth conversion if you have a pre-tax IRA balance. With basis-isolation recommendation + 30-year projection.',
    status: 'live',
    category: 'roth',
    emoji: '🔁',
  },
  {
    id: 'w4-step-4c',
    slug: 'w4-step-4c',
    title: 'W-4 Step 4(c) Extra-Withholding Calculator',
    shortTitle: 'W-4 4(c)',
    summary:
      'Turn a federal tax shortfall into the exact Line 4(c) entry. §6654(g)(1) deems withholding ratable across the year — so a Q4 W-4 fix retroactively cures Q1–Q3 underpayment.',
    status: 'live',
    category: 'withholding',
    emoji: '🧾',
  },
  {
    id: 'form-6251',
    slug: 'form-6251',
    title: 'Form 6251 AMT Calculator (Multi-Source)',
    shortTitle: 'Form 6251 AMT',
    summary:
      'Full Form 6251 walkthrough combining W-2 wages + 1099 self-employment + ISO bargain element + SALT add-back. Computes AMTI, AMT exemption with phaseout, TMT, AMT owed, and the recoverable §53 credit estimate.',
    status: 'live',
    category: 'options',
    emoji: '⚖️',
  },
  {
    id: 'ca-540nr',
    slug: 'ca-540nr',
    title: 'CA Form 540NR Apportionment Calculator',
    shortTitle: 'CA 540NR',
    summary:
      'Vest-by-vest CA tax for tech workers who moved CA→TX (or CA→NV/FL/WA) mid-vest. Implements FTB Pub 1004 work-source allocation + §19136 safe-harbor target + Q4 540-ES recommendation.',
    status: 'live',
    category: 'multistate',
    emoji: '🐻',
  },
  {
    id: 'roth-sequencer',
    slug: 'roth-sequencer',
    title: 'Backdoor + Mega-Backdoor Roth Sequencing Optimizer',
    shortTitle: 'Roth Sequencer',
    summary:
      'Combines the 2 standalone Roth calculators into one sequenced playbook. When to do basis isolation first (pre-tax IRA + §408(d)(2) pro-rata), Mega-Backdoor next, traditional Backdoor last. Total annual Roth capacity unlocked across all paths.',
    status: 'live',
    category: 'roth',
    emoji: '🔀',
  },
  {
    id: 'double-trigger-rsu',
    slug: 'double-trigger-rsu',
    title: 'Double-Trigger RSU IPO/M&A Tax Calculator',
    shortTitle: 'Double-Trigger RSU',
    summary:
      'The trigger-day tax bomb when your pre-IPO startup goes public or gets acquired. Federal + state shortfall vs supplemental withholding, sell-to-cover share count, net cash value at trigger FMV.',
    status: 'live',
    category: 'rsu',
    emoji: '🚀',
  },
  {
    id: 'qsbs',
    slug: 'qsbs',
    title: 'QSBS / Section 1202 Exclusion Calculator',
    shortTitle: 'QSBS / §1202',
    summary:
      'How much of your startup-stock gain is federal-tax-free under IRC §1202. Models the new 2025 (OBBBA) tiered 50/75/100% exclusion, the greater-of-$15M-or-10×-basis cap, the 28%-rate gain on the taxable portion, and state non-conformity.',
    status: 'live',
    category: 'espp-startup',
    emoji: '🦄',
  },
];

/** Display order + labels for the homepage calculator directory groups. */
export const toolCategoryOrder: ToolCategory[] = [
  'rsu',
  'options',
  'espp-startup',
  'withholding',
  'multistate',
  'roth',
];

export const toolCategoryMeta: Record<
  ToolCategory,
  { label: string; emoji: string }
> = {
  rsu: { label: 'RSUs', emoji: '📈' },
  options: { label: 'Stock options & AMT', emoji: '⚡' },
  'espp-startup': { label: 'ESPP & startup equity', emoji: '🦄' },
  withholding: { label: 'Bonuses, W-4 & estimated tax', emoji: '🗓️' },
  multistate: { label: 'Multi-state moves', emoji: '🗺️' },
  roth: { label: 'Roth & retirement', emoji: '🔁' },
};

export function liveTools(): Tool[] {
  return tools.filter((t) => t.status === 'live');
}

export function findTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
