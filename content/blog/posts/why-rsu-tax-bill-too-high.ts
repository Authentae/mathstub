import type { BlogPost } from '../registry';

export const whyRsuTooHigh: BlogPost = {
  slug: 'why-rsu-tax-bill-too-high',
  title: 'Why your RSU tax bill seems too high — the 22% withholding gap, explained',
  description:
    'Your employer withholds 22% federal on RSU vests under the supplemental-wage rule, but your real marginal rate may be 32–37%. Here is the math, the source of the rule, and how to avoid an April surprise.',
  datePublished: '2026-04-15',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'Your employer withholds federal tax on RSU vests at a flat 22% under IRS supplemental-wage rules, but your real marginal rate is often 32-37%. The gap creates an April surprise that hits high earners hardest. Fix it before year-end by topping up Form W-4 line 4(c) (treated as paid evenly across the year per IRC §6654(g)) or making a quarterly estimated payment via IRS Direct Pay.',
  keyPoints: [
    'Your employer only holds back 22% in federal tax when RSUs vest.',
    'But high earners are often really in the 32-37% tax bracket.',
    'That gap is why you can owe thousands more in April than expected.',
    'On a $50k vest at a 35% rate, the federal shortfall is about $6,500.',
    'Best fix: add extra withholding on Form W-4 line 4(c) before year-end.',
    'A W-4 top-up counts as paid all year, so it erases the earlier shortfall.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'If you got an RSU vest this year and a tax bill that made you blink twice in April, you are not alone. The cause is almost always the same: your employer withheld federal income tax at a flat 22% under IRS supplemental-wage rules, but your actual marginal rate is much higher. The gap between those two numbers is the shortfall — and for a typical tech worker in the 32% or 35% bracket, it routinely lands between $2,000 and $30,000 on a single vest.',
    },
    { type: 'h2', text: 'How RSU withholding works' },
    {
      type: 'p',
      text:
        'When RSUs vest, the IRS treats their fair-market value as ordinary wages. But because vests do not happen on a regular pay cycle, employers default to a flat "supplemental wage" withholding rate published by the IRS in Publication 15-T:',
    },
    {
      type: 'ul',
      items: [
        '22% on the first $1,000,000 of supplemental wages paid to you in the calendar year.',
        '37% on every dollar of supplemental wages above $1,000,000.',
      ],
    },
    {
      type: 'p',
      text:
        'Your employer applies these rates regardless of your actual tax bracket. The 22% number is not based on any specific worker\'s tax situation — it is a one-size-fits-all default set by Treasury under Treas. Reg. §31.3402(g)-1. The gap between this flat rate and your real marginal rate is what creates the April surprise.',
    },
    {
      type: 'analogy',
      text: 'Think of the 22% like a restaurant that adds an automatic 22% tip to every table. Fine if 22% is what you meant to leave — but if your bill really calls for 35%, you\'re short, and you only find out when the bill is reconciled in April. The IRS uses one flat "tip" for everyone instead of your real rate.',
    },
    { type: 'h2', text: 'Where the 22% rule came from' },
    {
      type: 'p',
      text:
        'The supplemental-wage withholding rule traces back to the 1986 Tax Reform Act and has been adjusted only modestly since. Treasury set 22% as an approximation of the average filer\'s marginal rate on incremental wages — historically reasonable when most filers landed in the 25% bracket. After the 2017 Tax Cuts and Jobs Act lowered the brackets to 22%, the flat rate happened to match the new third bracket — but for anyone in the 32%, 35%, or 37% brackets (most senior tech workers), the rate now under-withholds materially.',
    },
    {
      type: 'p',
      text:
        'There is no mechanism in the rule for the employer to adjust based on your actual W-2 wages. The flat 22% applies whether you earn $80,000 or $800,000.',
    },
    { type: 'h2', text: 'Worked example — single filer, $200k base, $50k vest' },
    {
      type: 'p',
      text:
        'You are single, earn $200,000 in regular W-2 wages, and receive a $50,000 RSU vest in March. Federal piece only (ignoring state, Medicare, Social Security for clarity):',
    },
    {
      type: 'flow',
      caption: 'Where the $6,500 surprise comes from',
      steps: [
        { label: 'Vest value', value: '$50,000' },
        { label: 'Withheld (22%)', value: '$11,000', tone: 'bad' },
        { label: 'Really owed (35%)', value: '$17,500' },
        { label: 'April shortfall', value: '$6,500', tone: 'bad' },
      ],
    },
    {
      type: 'ul',
      items: [
        'Employer withholds federal supplemental at 22% × $50,000 = **$11,000**.',
        'Your total taxable income for the year (with the vest) is $250,000. At 2026 single brackets, the marginal rate at $250k is 35%.',
        'Actual federal tax owed on the $50,000 vest at the margin: $50,000 × 35% = **$17,500**.',
        'Shortfall: $17,500 − $11,000 = **$6,500** owed at filing time.',
      ],
    },
    {
      type: 'p',
      text:
        'Add California state shortfall (~$1,000–$2,000 on top, since CA supplemental is also a flat 10.23% vs ~12.3% marginal) and Additional Medicare reconciliation, and the all-in April balance owed often crosses the IRS $1,000 safe-harbor threshold under IRC §6654 — triggering an underpayment penalty in addition to the tax itself.',
    },
    {
      type: 'callout',
      text:
        'Run your own number with the RSU Tax Shortfall calculator — inputs stay in your browser, nothing is sent to a server. If the projected shortfall exceeds $1,000 for the year, you have IRC §6654 underpayment-penalty exposure that should be addressed before December 31.',
    },
    {
      type: 'embed',
      calc: 'rsu-shortfall',
      caption: 'Your vest, your number — live',
    },
    { type: 'h2', text: 'State withholding makes it worse in a few states' },
    {
      type: 'p',
      text:
        'Some states apply a flat supplemental rate to RSU vests, mirroring the federal rule:',
    },
    {
      type: 'table',
      caption: 'State supplemental rate vs real top rate',
      headers: ['State', 'Withheld at vest', 'Real top rate', 'Gap'],
      rows: [
        ['California', '10.23%', '13.3%+', '2–4 pts'],
        ['New York', '11.7%', '10.9% + NYC', 'compounds with NYC'],
        ['TX / FL / WA / NV', '0%', '0%', 'none'],
      ],
    },
    {
      type: 'ul',
      items: [
        '**California** — 10.23% supplemental, but top marginal is 13.3% (or 14.3% above $1M with the Mental Health Services Tax surcharge under Cal. Code Regs. tit. 18, §17041). Real marginal gap: 2–4 percentage points.',
        '**New York** — 11.7% supplemental for high earners, top marginal 10.9% state + up to 3.876% NYC. The gap can be small at state level but compounds with NYC local tax for residents.',
        '**Texas, Florida, Washington, Tennessee, Nevada, South Dakota, Wyoming** — 0% state, no gap.',
      ],
    },
    {
      type: 'p',
      text:
        'For a CA tech worker, the combined federal + state shortfall on a $50,000 vest with the same $250k total income works out to roughly $8,500 — close to a fifth of the net vest value, owed back to tax authorities by April.',
    },
    { type: 'h2', text: 'When 22% is actually enough (the under-the-radar case)' },
    {
      type: 'p',
      text:
        'If your taxable income (including the vest) keeps you in the 22% federal bracket, then 22% supplemental withholding correctly covers the federal piece — no shortfall. This happens for:',
    },
    {
      type: 'ul',
      items: [
        'Single filers with total taxable income under ~$48,000 in 2026 (the top of the 22% bracket starts at $48,475 for singles).',
        'Married-filing-jointly with combined taxable income under ~$96,950.',
        'Smaller vests on lower base salaries — e.g., a $5,000 vest for someone earning $50,000 base stays inside the 22% bracket.',
      ],
    },
    {
      type: 'p',
      text:
        'For most tech workers with senior salaries plus equity, this safe zone does not apply. But it is worth knowing: 22% is not under-withholding for everyone, just for high earners.',
    },
    { type: 'h2', text: 'How to fix it before December 31' },
    {
      type: 'p',
      text:
        'Two approved methods to cover the shortfall before year-end:',
    },
    {
      type: 'ol',
      items: [
        '**Form W-4 line 4(c) — "Extra withholding".** Open your payroll system (Workday, ADP, Gusto), find the W-4 form, enter a flat dollar amount on Line 4(c) labeled "Additional withholding per pay period." Federal withholding is treated as paid evenly across the year per IRC §6654(g)(1) — so a Q4 top-up retroactively cures earlier under-withholding without triggering the per-quarter underpayment math. This is the preferred fix.',
        '**Quarterly estimated tax payment via IRS Direct Pay.** Pay the shortfall as a "Form 1040 estimated tax" payment at irs.gov/payments. Only counts from the payment date — does not retroactively fix earlier-year under-withholding. Use this if you missed the W-4 window before December 31.',
      ],
    },
    { type: 'h2', text: 'Long-term fix: aggregate-method withholding' },
    {
      type: 'p',
      text:
        'Treas. Reg. §31.3402(g)-1(a)(2) authorizes employers to use the "aggregate method" instead of the 22% flat — adding the vest to your regular paycheck wages and withholding at your effective rate from the IRS withholding tables. For high earners this typically produces 28–32% federal withholding, much closer to the actual marginal rate.',
    },
    {
      type: 'p',
      text:
        'Most companies default to the flat supplemental method because it is operationally simpler. A minority (some financial-services firms, some legacy industrials) use aggregate. Both are legal. You usually cannot pick — but it is worth asking HR or reading your equity plan document to find out which method applies, so you know whether to expect a shortfall or not.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The 22% federal supplemental withholding rate is the IRS-mandated default for RSU vests, set by Treasury under Treas. Reg. §31.3402(g)-1. For most tech workers in the 32%, 35%, or 37% bracket, that flat rate under-withholds the actual federal tax by 10-15 percentage points. The gap is the April surprise. Fix it before December 31 with Form W-4 line 4(c) — the most powerful single tool because §6654(g) treats withholding as paid evenly throughout the year, retroactively curing earlier under-withholding. The math is not magic; the IRS rule was just designed for a 1986 payroll system, not for modern equity comp.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding rule); Treas. Reg. §31.3402(g)-1 (flat-rate method); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); IRC §6654 (underpayment-of-estimated-tax penalty); IRC §6654(g)(1) (withholding deemed paid evenly across the year); IRS Publication 15-T (Federal Income Tax Withholding Methods, 2026); IRS Publication 505 (Tax Withholding and Estimated Tax); IRS Form W-4 instructions; Cal. Code Regs. tit. 18, §17041 (CA Mental Health Services Tax surcharge).',
    },
  ],
};
