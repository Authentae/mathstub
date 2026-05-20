import type { BlogPost } from '../registry';

export const supplementalRule: BlogPost = {
  slug: '22-vs-37-supplemental-withholding',
  title: '22% vs 37% supplemental wage withholding, explained',
  description:
    'The IRS supplemental-wage rule taxes your RSU and bonus payments at 22% — until you cross $1M in YTD supplemental wages, when it jumps to 37%. Here is exactly how the threshold works, including the multi-employer edge case and what to do when 37% is still not enough.',
  datePublished: '2026-04-18',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Employers withhold federal tax on bonuses and RSU vests at a flat 22% on the first $1,000,000 of supplemental wages paid in a calendar year, then 37% on every dollar above that. The threshold is per-employee per-employer per-year, not per-payment. Multi-employer mid-year switches reset the counter, which can create an under-withholding gap. Rule: Treas. Reg. §31.3402(g)-1; IRS Pub 15-T.',
  blocks: [
    {
      type: 'p',
      text:
        'IRS Publication 15-T defines a "supplemental wage" as compensation paid in addition to regular wages — most commonly bonuses, commissions, severance, accumulated leave payouts, and RSU vests. The federal withholding rule on supplemental wages is straightforward in shape: 22% flat, until you cross $1M in a year, then 37%. The threshold mechanics trip people up — especially anyone with multiple employers, mid-year job changes, or large vests near year-end.',
    },
    { type: 'h2', text: 'The two rates' },
    {
      type: 'ul',
      items: [
        '**22%** on the first $1,000,000 of supplemental wages paid to you by a single employer in the calendar year.',
        '**37%** on every dollar above $1,000,000.',
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
      type: 'ul',
      items: [
        'First $200k of the vest (bringing YTD supplemental to $1M): withheld at 22% = $44,000.',
        'Next $200k of the vest (above $1M): withheld at 37% = $74,000.',
        'Total withheld on the $400k vest: $118,000.',
        'Blended effective rate: 29.5%.',
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
      type: 'ul',
      items: [
        '**Federal** — 37% (matches supplemental rate, so no federal gap above $1M YTD supplemental).',
        '**Additional Medicare** — 0.9% on all wages above $200k (single) / $250k (joint) YTD per IRC §3101(b)(2).',
        '**State income tax** — up to 13.3% in CA (or 14.3% with the Mental Health Services Tax surcharge), 10.9% in NY, ~13% in NJ, ~10.75% in DC.',
        '**NYC local tax** — up to 3.876% for residents.',
      ],
    },
    {
      type: 'p',
      text:
        'A senior NYC-resident tech worker in the 37% federal bracket faces a true marginal rate of approximately 51.7% (37% federal + 0.9% Add\'l Medicare + 10.9% NY state + 3.876% NYC). The 37% supplemental withholding alone leaves a 14-point gap to actual marginal rate at the very top.',
    },
    { type: 'h2', text: 'Worked example — mid-year job change' },
    {
      type: 'p',
      text:
        'You leave Employer A in June with $600k of YTD supplemental wages already paid (large pre-IPO RSU lockup vest in March). You start at Employer B in July with a $300k signing bonus paid that month. Each employer\'s view:',
    },
    {
      type: 'ul',
      items: [
        'Employer A withheld 22% × $600,000 = **$132,000** (well under their $1M threshold).',
        'Employer B withholds 22% × $300,000 = **$66,000** (starts at $0 YTD from their perspective).',
        'Combined withheld: $198,000 on $900,000 supplemental = blended **22%**.',
        'Actual federal tax owed at the 37% marginal rate (since total income is now well above $626k bracket): $900,000 × 37% = $333,000.',
        'Shortfall: $135,000 at filing time.',
      ],
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
