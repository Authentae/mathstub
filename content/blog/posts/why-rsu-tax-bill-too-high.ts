import type { BlogPost } from '../registry';

export const whyRsuTooHigh: BlogPost = {
  slug: 'why-rsu-tax-bill-too-high',
  title: 'Why your RSU tax bill seems too high — the 22% withholding gap, explained',
  description:
    'Your employer withholds 22% federal on RSU vests under the supplemental-wage rule, but your real marginal rate may be 32–37%. Here is the math, the source of the rule, and how to avoid an April surprise.',
  datePublished: '2026-04-15',
  dateModified: '2026-05-19',
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
        'Got an RSU vest this year, then a tax bill in April that made you blink twice? You are not alone, and the cause is almost always the same: your employer only held back 22% in federal tax, but your real tax rate is a lot higher. That gap is your shortfall — and for a typical tech worker in the 32% or 35% bracket, it usually lands somewhere between $2,000 and $30,000 on a single vest.',
    },
    { type: 'h2', text: 'How RSU withholding works' },
    {
      type: 'p',
      text:
        'When RSUs vest, the IRS treats their value as regular wages. But because vests do not land on your normal pay schedule, employers fall back on a flat "bonus-style" withholding rate set by the IRS:',
    },
    {
      type: 'ul',
      items: [
        '22% on the first $1,000,000 of bonus-style pay you get in a calendar year.',
        '37% on every dollar of bonus-style pay above $1,000,000.',
      ],
    },
    {
      type: 'p',
      text:
        'Your employer uses these rates no matter what your real tax bracket is. The 22% is not based on your personal situation — it is a one-size-fits-all default set by the Treasury. The gap between that flat rate and your real rate is what blindsides people in April.',
    },
    { type: 'h2', text: 'Where the 22% rule came from' },
    {
      type: 'p',
      text:
        'This bonus-withholding rule goes back to the 1986 Tax Reform Act and has barely changed since. The Treasury set 22% as a rough stand-in for the average person’s rate on extra wages — which made sense back when most people were in the 25% bracket. After the 2017 tax law dropped the brackets, the flat rate happened to line up with the new third bracket. But for anyone in the 32%, 35%, or 37% bracket (most senior tech workers), that flat rate now holds back too little.',
    },
    {
      type: 'p',
      text:
        'There is no way for the rule to adjust based on your actual wages. The flat 22% applies whether you make $80,000 or $800,000.',
    },
    { type: 'h2', text: 'Worked example — single filer, $200k salary, $50k vest' },
    {
      type: 'p',
      text:
        'You are single, earn $200,000 in regular wages, and get a $50,000 RSU vest in March. Just the federal part (ignoring state, Medicare, and Social Security to keep it clean):',
    },
    {
      type: 'ul',
      items: [
        'Your employer holds back 22% × $50,000 = **$11,000**.',
        'With the vest, your total income for the year is $250,000. At 2026 single brackets, your rate at $250k is 35%.',
        'The federal tax you actually owe on the $50,000 vest: $50,000 × 35% = **$17,500**.',
        'Shortfall: $17,500 − $11,000 = **$6,500** owed at filing.',
      ],
    },
    {
      type: 'p',
      text:
        'Add the California state shortfall (~$1,000–$2,000 on top, since CA also holds back a flat 10.23% vs a ~12.3% real rate) plus the extra-Medicare reconciliation, and your April bill often clears the IRS’s $1,000 safe-harbor line — which can tack on an underpayment penalty on top of the tax itself.',
    },
    {
      type: 'callout',
      text:
        'Run your own numbers with the RSU Tax Shortfall calculator — everything stays in your browser, nothing gets sent to a server. If your projected shortfall tops $1,000 for the year, you have underpayment-penalty exposure worth fixing before December 31.',
    },
    { type: 'h2', text: 'A few states make it worse' },
    {
      type: 'p',
      text:
        'Some states use their own flat bonus rate on RSU vests, just like the federal rule:',
    },
    {
      type: 'ul',
      items: [
        '**California** — holds back 10.23%, but the top rate is 13.3% (or 14.3% above $1M with the mental-health surcharge). Real gap: 2–4 points.',
        '**New York** — holds back 11.7% for high earners; top rate is 10.9% state plus up to 3.876% NYC. The state gap can be small, but it adds up with the NYC tax for city residents.',
        '**Texas, Florida, Washington, Tennessee, Nevada, South Dakota, Wyoming** — 0% state, no gap.',
      ],
    },
    {
      type: 'p',
      text:
        'For a California tech worker, the combined federal + state shortfall on a $50,000 vest at that same $250k total income comes to roughly $8,500 — close to a fifth of the vest, owed back to the tax authorities by April.',
    },
    { type: 'h2', text: 'When 22% is actually enough' },
    {
      type: 'p',
      text:
        'If your income (vest included) keeps you in the 22% federal bracket, then 22% withholding covers the federal part just fine — no shortfall. That happens for:',
    },
    {
      type: 'ul',
      items: [
        'Single filers with total taxable income under ~$48,000 in 2026 (the 22% bracket tops out at $48,475 for singles).',
        'Married-filing-jointly with combined taxable income under ~$96,950.',
        'Smaller vests on lower salaries — say a $5,000 vest for someone earning $50,000, which stays inside the 22% bracket.',
      ],
    },
    {
      type: 'p',
      text:
        'For most tech workers with senior salaries plus equity, this safe zone does not apply. But it is worth knowing: 22% is not too low for everyone — just for high earners.',
    },
    { type: 'h2', text: 'How to fix it before December 31' },
    {
      type: 'p',
      text:
        'Two approved ways to cover the shortfall before year-end:',
    },
    {
      type: 'ol',
      items: [
        '**Form W-4 line 4(c) — "Extra withholding."** Open your payroll system (Workday, ADP, Gusto), find the W-4, and enter a flat dollar amount on Line 4(c) ("Additional withholding per pay period"). Federal withholding counts as paid evenly across the whole year — so even a Q4 top-up retroactively patches earlier under-withholding without the per-quarter penalty math. This is the better fix.',
        '**A quarterly estimated payment via IRS Direct Pay.** Pay the shortfall as a "Form 1040 estimated tax" payment at irs.gov/payments. It only counts from the day you pay — it does not retroactively fix earlier under-withholding. Use this if you miss the W-4 window before December 31.',
      ],
    },
    { type: 'h2', text: 'The longer-term fix: ask about the aggregate method' },
    {
      type: 'p',
      text:
        'The IRS also lets employers use the "aggregate method" instead of the flat 22% — adding the vest to your regular paycheck and withholding at your effective rate from the IRS tables. For high earners, that usually produces 28–32% federal withholding, much closer to your real rate.',
    },
    {
      type: 'p',
      text:
        'Most companies stick with the flat method because it is simpler. A minority (some financial firms, some older industrials) use the aggregate method. Both are legal. You usually cannot pick — but it is worth asking HR or reading your equity plan to find out which one applies, so you know whether to expect a shortfall.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The 22% federal withholding on RSU vests is the IRS’s default, set by the Treasury. For most tech workers in the 32%, 35%, or 37% bracket, it holds back 10-15 points too little on the federal side. That gap is your April surprise. Fix it before December 31 with Form W-4 line 4(c) — the single best tool, because withholding counts as paid evenly all year, retroactively patching the earlier shortfall. The math is not magic; the IRS rule was just built for a 1986 payroll world, not for modern equity comp.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding rule); Treas. Reg. §31.3402(g)-1 (flat-rate method); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); IRC §6654 (underpayment-of-estimated-tax penalty); IRC §6654(g)(1) (withholding deemed paid evenly across the year); IRS Publication 15-T (Federal Income Tax Withholding Methods, 2026); IRS Publication 505 (Tax Withholding and Estimated Tax); IRS Form W-4 instructions; Cal. Code Regs. tit. 18, §17041 (CA Mental Health Services Tax surcharge).',
    },
  ],
};
