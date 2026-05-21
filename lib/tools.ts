export type ToolStatus = 'live' | 'planned';

export interface Tool {
  id: string;
  slug: string;
  title: string;
  shortTitle: string;
  summary: string;
  status: ToolStatus;
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
    emoji: '📈',
  },
  {
    id: 'espp-qualifying-disposition',
    slug: 'espp-qualifying-disposition',
    title: 'ESPP Qualifying Disposition Tax Calculator',
    shortTitle: 'ESPP Qualifying Disposition',
    summary:
      'Split a §423 ESPP sale into ordinary income vs. long-term capital gain, apply federal LTCG + NIIT + state tax, and compare against disqualifying treatment.',
    status: 'live',
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
    emoji: '🌀',
  },
];

export function liveTools(): Tool[] {
  return tools.filter((t) => t.status === 'live');
}

export function findTool(slug: string): Tool | undefined {
  return tools.find((t) => t.slug === slug);
}
