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
      'See the gap between the 22% (or 37%) your employer holds back when RSUs vest and what you’ll actually owe at your real tax rate.',
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
      'Brokers report $0 cost basis on RSU sales, which double-taxes income already on your W-2. See your correct basis (the share price on your vest day), what you’d overpay, and the exact one-line Form 8949 fix.',
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
      'See how much of your ESPP sale is taxed as regular income vs. the lower long-term gains rate, with federal, state, and the 3.8% investment surtax — and whether holding long enough to “qualify” actually saves you money.',
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
      'Estimate the Alternative Minimum Tax (AMT) when you exercise ISOs, the cash you’ll need, and the credit you get back in later years — plus a sell-the-same-year comparison.',
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
      'Find the “safe harbor” amount you need to prepay to avoid an IRS underpayment penalty, see the schedule quarter by quarter, and get the exact dollar amount to send before the next deadline.',
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
      'If you paid AMT in a past year, you’re owed a credit back. Project how much you recover each year (Form 8801) and when the balance reaches $0, based on your future income.',
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
      'Estimate the income tax and payroll (FICA) bill when you exercise non-qualified stock options (NSOs) — the “spread” you’re taxed on, what’s withheld, the gap to your real rate, and state tax.',
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
      'See the gap between the flat 22% (or 37%) held back on your cash bonus and what you’ll actually owe at your real tax rate.',
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
      'Look up the top tax rate, withholding, AMT, and capital-gains treatment for RSU/ESPP/ISO income in any of the 50 states + DC.',
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
      'Find the extra after-tax 401(k) room your plan allows under the $70k total cap — the “Mega-Backdoor Roth” move high earners use for $30–46k/yr of extra Roth savings.',
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
      'Check if your income is over the Roth IRA limit, and the tax on a “backdoor” conversion if you hold pre-tax IRA money (the pro-rata rule) — plus how to avoid it and a 30-year projection.',
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
      'Turn a tax shortfall into the exact number to put on your W-4 Line 4(c). Because withholding counts as paid evenly across the year, a late-year fix can retroactively cover the earlier quarters.',
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
      'Full Alternative Minimum Tax (Form 6251) walkthrough combining your W-2 wages, freelance 1099 income, ISO exercises, and state-tax add-back — to compute the AMT you owe and the credit you get back.',
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
      'Vest-by-vest California tax if you moved out of CA (to TX/NV/FL/WA) partway through earning your RSUs — how much California still taxes, the penalty-safe target, and what to prepay.',
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
      'Combines both Roth moves into one ordered playbook — what to do first, next, and last (clear out pre-tax IRA money, then Mega-Backdoor, then Backdoor) to maximize your tax-free Roth savings for the year.',
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
      'The tax hit when your pre-IPO startup goes public or gets acquired and your RSUs finally pay out. Federal + state shortfall vs. what’s withheld, shares sold to cover it, and your net cash.',
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
      'How much of your startup-stock gain is completely federal-tax-free under the QSBS rule (§1202). Covers the new 2025 tiers (50/75/100%), the dollar cap, the rate on the taxable part, and states that don’t follow it.',
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
