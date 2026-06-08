import type { BlogPost } from '../registry';

export const supplementalRule: BlogPost = {
  slug: '22-vs-37-supplemental-withholding',
  title: '22% vs 37% supplemental wage withholding, explained',
  description:
    'The IRS supplemental-wage rule taxes your RSU and bonus payments at 22% — until you cross $1M in YTD supplemental wages, when it jumps to 37%. Here is exactly how the threshold works, including the multi-employer edge case and what to do when 37% is still not enough.',
  datePublished: '2026-04-18',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Employers withhold federal tax on bonuses and RSU vests at a flat 22% on the first $1,000,000 of supplemental wages paid in a calendar year, then 37% on every dollar above that. The threshold is per-employee per-employer per-year, not per-payment. Multi-employer mid-year switches reset the counter, which can create an under-withholding gap. Rule: Treas. Reg. §31.3402(g)-1; IRS Pub 15-T.',
  keyPoints: [
    'Bonuses and RSU vests are withheld at a flat 22%, then 37% past $1M in a year.',
    'That $1M limit resets for each employer — so switching jobs mid-year can under-withhold a lot.',
    'These flat rates are usually too low if your real tax bracket is higher than 22%.',
    'At the very top, even 37% misses state, Medicare, and local taxes that stack on top.',
    'Fix a shortfall before Dec 31: add extra withholding on your W-4 or pay the IRS directly.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'IRS Publication 15-T defines a "supplemental wage" as compensation paid in addition to regular wages — most commonly bonuses, commissions, severance, accumulated leave payouts, and RSU vests. The federal withholding rule on supplemental wages is straightforward in shape: 22% flat, until you cross $1M in a year, then 37%. The threshold mechanics trip people up — especially anyone with multiple employers, mid-year job changes, or large vests near year-end.',
    },
    { type: 'h2', text: 'The two rates' },
    {
      type: 'table',
      caption: 'The flat supplemental-withholding rates',
      headers: ['YTD supplemental wages (per employer)', 'Federal withholding'],
      rows: [
        ['First $1,000,000', '22%'],
        ['Every dollar above $1M', '37%'],
      ],
    },
    {
      type: 'p',
      text:
        'These are flat withholding rates, not your tax rate. The 37% mandatory rate matches the top federal bracket — coincidentally, since the rates were last updated in the 2017 Tax Cuts and Jobs Act. The 22% rate is a one-size-fits-all default that under-withholds for anyone above the 22% bracket (which is most senior tech workers).',
    },
    { type: 'h2', text: 'The threshold is per-employer, per-year' },
    {
      type: 'p',
      text:
        'If you change jobs mid-year, both employers reset the $1M counter independently. That means you could legitimately have $1.8M in supplemental wages — say, $900k from each of two employers — with $0 withheld at the 37% rate. The IRS does not communicate YTD supplemental wage history between employers. At filing, your actual marginal rate (37%) applies to the full amount, but only $396k was withheld federally (22% × $1.8M). The shortfall: ~$270k at filing.',
    },
    {
      type: 'p',
      text:
        'This mid-year job-change trap is common for senior tech workers leaving one company for another with similar comp. Every job change with $500k+ of supplemental wages already paid earlier in the year should prompt a quarterly estimated tax payment or a Form W-4 line 4(c) top-up at the new employer.',
    },
    { type: 'h2', text: 'How a vest that crosses the threshold gets withheld' },
    {
      type: 'p',
      text:
        'If your YTD supplemental wages going into a vest are $800k and the vest is $400k, the math:',
    },
    {
      type: 'table',
      caption: '$800k YTD supplemental, then a $400k vest',
      headers: ['Slice of the vest', 'Rate', 'Withheld'],
      rows: [
        ['First $200k (brings YTD to $1M)', '22%', '$44,000'],
        ['Next $200k (above $1M)', '37%', '$74,000'],
        ['**Total on the $400k vest**', '**29.5% blended**', '**$118,000**'],
      ],
    },
    {
      type: 'p',
      text:
        'For a high-bracket worker, this 29.5% blended withholding is still well below the actual 37% marginal rate plus state and Medicare layers — so even crossing into the 37% mandatory rate does not eliminate the shortfall. The all-in real marginal can hit 50%+ at the top.',
    },
    {
      type: 'callout',
      text:
        'Crossing the $1M YTD supplemental threshold is also a wage-base event for several adjacent rules: confirmed by Treas. Reg. §31.3402(g)-1(b). The threshold is calculated as cumulative supplemental wages paid by ONE employer over the calendar year.',
    },
    { type: 'h2', text: 'Why 37% is still not enough at the very top' },
    {
      type: 'p',
      text:
        'Once your total taxable income passes the top federal bracket threshold ($626,350 single, $751,600 MFJ in 2025; projected ~$640k single in 2026), every additional dollar of ordinary income is taxed at:',
    },
    {
      type: 'table',
      caption: 'A top NYC earner’s true marginal rate',
      headers: ['Layer', 'Rate'],
      rows: [
        ['Federal', '37%'],
        ['Additional Medicare (§3101(b)(2))', '0.9%'],
        ['New York state', '10.9%'],
        ['NYC local', '3.876%'],
        ['**True marginal**', '**~51.7%**'],
      ],
    },
    {
      type: 'p',
      text:
        'So the 37% supplemental withholding still leaves a ~14-point gap to the real marginal rate at the very top. Other high-tax states stack similarly: California up to 14.3% (with the mental-health surcharge), New Jersey ~13%, DC ~10.75%. Additional Medicare applies above $200k single / $250k joint.',
    },
    { type: 'h2', text: 'Worked example — mid-year job change' },
    {
      type: 'p',
      text:
        'You leave Employer A in June with $600k of YTD supplemental wages already paid (large pre-IPO RSU lockup vest in March). You start at Employer B in July with a $300k signing bonus paid that month. Each employer\'s view:',
    },
    {
      type: 'flow',
      caption: 'Two employers · $900k supplemental · one year',
      steps: [
        { label: 'Withheld (22%)', value: '$198k', tone: 'bad' },
        { label: 'Actually owed (37%)', value: '$333k', tone: 'bad' },
        { label: 'April shortfall', value: '$135k', tone: 'bad' },
      ],
    },
    {
      type: 'table',
      caption: 'Each employer resets the $1M counter from $0',
      headers: ['Employer', 'Supplemental paid', 'Withheld'],
      rows: [
        ['A (Jan–Jun)', '$600,000', '$132,000 (22%)'],
        ['B (Jul onward)', '$300,000', '$66,000 (22%)'],
        ['**Combined**', '**$900,000**', '**$198,000 (22% blended)**'],
      ],
    },
    {
      type: 'p',
      text:
        'At your real 37% marginal rate (total income is well above the ~$626k top-bracket threshold), the actual federal tax is $900,000 × 37% = **$333,000** — a **$135,000 shortfall** at filing.',
    },
    {
      type: 'p',
      text:
        'The IRS does not require either employer to track the other\'s supplemental wages. The reconciliation happens entirely at your 1040 — and any underpayment triggers the IRC §6654 penalty unless you covered the gap via Form W-4 line 4(c) extra withholding or a quarterly estimated tax payment before December 31.',
    },
    { type: 'h2', text: 'How to fix the under-withholding' },
    {
      type: 'ol',
      items: [
        '**Top up Form W-4 line 4(c) at your current employer.** Calculate the expected shortfall (use the RSU Tax Shortfall calculator for an estimate, or just compute your marginal rate gap × supplemental wages) and divide by remaining pay periods. Enter the per-paycheck dollar amount. Treated as paid evenly across the year per IRC §6654(g)(1) — retroactively cures earlier under-withholding.',
        '**Quarterly estimated tax payment via IRS Direct Pay.** Pay the calculated shortfall as a "Form 1040 estimated tax" payment at irs.gov/payments. Only counts from the payment date — use if you missed the W-4 window.',
        '**Combination approach.** For a >$100k shortfall, split between W-4 top-up (treated as paid evenly) and a Q4 estimated payment (covers the headline amount immediately). This balances the two methods.',
      ],
    },
    { type: 'h2', text: 'Aggregate method as an alternative' },
    {
      type: 'p',
      text:
        'Treas. Reg. §31.3402(g)-1(a)(2) lets employers use the "aggregate method" instead of the 22% flat — adding the supplemental wages to your regular paycheck wages and withholding at your effective rate from the IRS withholding tables. For high earners this often produces 28-32% federal withholding on the supplemental amount, much closer to actual marginal rate.',
    },
    {
      type: 'p',
      text:
        'Most companies default to the flat-rate method because it is operationally simpler. A minority use aggregate. Both are legal. You usually cannot pick — check your offer letter or equity plan document to find out which method applies, so you know whether to expect a shortfall.',
    },
    { type: 'h2', text: 'When to talk to a CPA' },
    {
      type: 'ul',
      items: [
        '**Multi-employer mid-year switch with $500k+ supplemental wages.** The 22%-reset-per-employer trap.',
        '**Double-trigger vests around an IPO.** Cumulative ordinary income concentrated in one year, often crossing the $1M threshold mid-vest.',
        '**Crossing the $1M YTD supplemental threshold for the first time.** Cash-flow planning matters when withholding suddenly jumps from 22% to 37%.',
        '**Multi-state residency during the same year supplemental wages were paid.** State sourcing layers compound the federal-side shortfall.',
      ],
    },
    {
      type: 'callout',
      text:
        'If your situation is complicated (multiple employers in one year, double-trigger vests around an IPO, or you cross the $1M threshold), it is worth $200-400 to have a CPA do the calculation once and confirm. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The 22%/37% supplemental withholding rule is a per-employer, per-year mechanic — not a true marginal-rate calculation. The 22% rate under-withholds for anyone above the 22% federal bracket. The 37% rate at the very top still leaves a gap to actual marginal rate when state, Additional Medicare, and local taxes stack. The single most expensive trap is the multi-employer mid-year switch where each employer\'s $1M threshold resets independently. Cover the shortfall before December 31 via Form W-4 line 4(c) or a quarterly estimated payment to avoid IRC §6654 underpayment penalties.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding rule); Treas. Reg. §31.3402(g)-1 (flat-rate method); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); Treas. Reg. §31.3402(g)-1(b) ($1M threshold mechanics); IRC §6654 (underpayment-of-estimated-tax penalty); IRC §6654(g)(1) (withholding deemed paid evenly across the year); IRC §3101(b)(2) (Additional Medicare Tax 0.9%); IRS Publication 15-T (Federal Income Tax Withholding Methods, 2026); IRS Form W-4 instructions.',
    },
  ],
};
