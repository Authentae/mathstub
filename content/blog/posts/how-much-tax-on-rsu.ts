import type { BlogPost } from '../registry';

export const howMuchTaxOnRsu: BlogPost = {
  slug: 'how-much-tax-will-i-pay-on-rsu',
  title: 'How much tax will I pay on my RSU? The 30–40% answer, with the actual math',
  description:
    'Most US tech workers pay 30–40% of their RSU vest value in combined federal, state, and FICA tax. Walk the exact math by bracket, state, and income level — then plug your numbers into the calculator.',
  datePublished: '2026-05-18',
  dateModified: '2026-05-18',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'Most US tech workers pay 30-40% of an RSU vest in combined federal income tax, state tax, and FICA. Effective rate by state at the 32% federal bracket: ~34% in Texas/Florida/Washington, ~39% in Illinois/Massachusetts, ~43% in California, ~46% in New York City. Your employer typically withholds at 22% federal supplemental — well below most workers\' real marginal rate, hence the April surprise.',
  keyPoints: [
    'Most US tech workers lose 30–40% of an RSU vest to combined tax.',
    'Four taxes stack at vest: federal, state, Medicare, and Social Security.',
    'No-tax states (TX, FL, WA) land near 34%; California can reach 43–46%.',
    'Your employer usually withholds just 22% federal — below your real rate.',
    'That gap between 22% and your true rate is the classic April tax surprise.',
    'Rule of thumb: a $50k vest is really worth about $28–35k after tax.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Short answer: most US tech workers pay 30–40% of an RSU vest in combined federal, state, and FICA tax. The exact number depends on four inputs — your federal bracket, your state, whether you have already maxed Social Security for the year, and how big the vest is relative to your other wages. Here is the math.',
    },
    { type: 'h2', text: 'The four taxes that stack on an RSU vest' },
    {
      type: 'p',
      text:
        'When RSUs vest, the IRS treats the fair-market value of the shares as ordinary wages on your W-2. Four separate taxes apply:',
    },
    {
      type: 'ul',
      items: [
        '**Federal income tax** — your marginal bracket, somewhere between 22% and 37% for most equity-comp employees.',
        '**State income tax** — 0% in TX/FL/WA, up to ~13.3% in CA (or higher with mental-health surcharge).',
        '**Medicare** — 1.45% on every dollar of wages.',
        '**Additional Medicare** — extra 0.9% on wages above $200,000 YTD.',
        '**Social Security** — 6.2% on wages up to the wage base ($168,600 in 2025; $176,100 projected for 2026). Drops off once you cross the base.',
      ],
    },
    {
      type: 'callout',
      text:
        'Your employer withholds at the IRS "supplemental wage" rate of 22% federal — not your actual marginal rate. If you are in the 32% or 35% bracket, the employer is under-withholding the federal piece by 10–13 percentage points. That gap shows up at April filing.',
    },
    { type: 'h2', text: 'Worked example — single filer, $200k base, $50k RSU vest, California' },
    {
      type: 'p',
      text:
        'You are single, earning $200,000 in regular W-2 wages, and you receive a $50,000 RSU vest in March. You have already paid Social Security on the first $176,100 of wages, so SS does not apply to the vest. Here is the actual tax owed on the vest:',
    },
    {
      type: 'ul',
      items: [
        'Federal — at $250,000 total income you are in the 35% marginal bracket. $50,000 × 35% = **$17,500**.',
        'California — at $250,000 you are in the 9.3% bracket. $50,000 × 9.3% = **$4,650**.',
        'Medicare — $50,000 × 1.45% = **$725**.',
        'Additional Medicare — entire $50k is above the $200k YTD threshold, so $50,000 × 0.9% = **$450**.',
        'Social Security — $0 (already maxed).',
      ],
    },
    {
      type: 'p',
      text:
        'Total tax owed: **$23,325 on $50,000 = 46.6%**. Your employer withheld at the 22% federal + 10.23% CA supplemental rates: $11,000 + $5,115 + $725 + $450 = $17,290 (34.6%). The April shortfall: **~$6,000**.',
    },
    { type: 'h2', text: 'Worked example — single filer, $120k base, $30k RSU vest, Texas' },
    {
      type: 'p',
      text:
        'Lower income, no state tax, smaller vest. Same single filer in TX:',
    },
    {
      type: 'ul',
      items: [
        'Federal — at $150,000 total income you are in the 24% marginal bracket. $30,000 × 24% = **$7,200**.',
        'Texas state tax — **$0**.',
        'Medicare — $30,000 × 1.45% = **$435**.',
        'Additional Medicare — none of the vest is above the $200k YTD threshold = **$0**.',
        'Social Security — first ~$26,100 of the vest is below the wage base, taxed at 6.2% = **$1,618**. Remaining $3,900 above the cap = $0.',
      ],
    },
    {
      type: 'p',
      text:
        'Total: **$9,253 on $30,000 = 30.8%**. Employer withholds at 22% federal + 1.45% Medicare + ~6.2% SS = roughly $8,895 (29.6%). Tiny ~$360 shortfall in this case.',
    },
    { type: 'h2', text: 'Quick reference — typical effective rate by state and bracket' },
    {
      type: 'p',
      text:
        'Approximate total tax on an RSU vest as a percentage of vest FMV, for a single filer in the 32% federal bracket (combined income $200–500k), assuming SS already maxed:',
    },
    {
      type: 'ul',
      items: [
        'Texas / Florida / Washington (0% state): ~34%',
        'Illinois (4.95% flat): ~39%',
        'Massachusetts (5%): ~39%',
        'New York (6.85% state + ~3.9% NYC for residents): ~43% (NYC) / ~39% (rest of NY)',
        'California (9.3–13.3% by income): ~43–46%',
        'New York City + CA top bracket equivalent: ~46–47% (highest in the US)',
      ],
    },
    {
      type: 'p',
      text:
        'Add 3.8% Net Investment Income Tax if your MAGI exceeds $200k single / $250k joint — though NIIT only applies to investment income, not wage income, so it usually does NOT hit RSU vests directly. It can hit the capital-gain portion if you hold and later sell at a gain.',
    },
    { type: 'h2', text: 'Why your withholding feels too low (and what to do)' },
    {
      type: 'p',
      text:
        'The flat 22% federal supplemental rate is the single biggest source of "April surprise" tax bills for tech workers. Here is the fix sequence:',
    },
    {
      type: 'ol',
      items: [
        'After each vest, estimate the gap between actual tax owed and what was withheld. Use our RSU Tax Shortfall calculator — it runs the math above for any state, bracket, and vest size.',
        'If the cumulative YTD shortfall exceeds $1,000, you are at risk of an IRC §6654 underpayment penalty. Two ways to fix it: (a) make a quarterly estimated tax payment via IRS Direct Pay, or (b) update Form W-4 Line 4(c) to withhold extra from your remaining paychecks.',
        'The W-4 fix is usually better because withholding is treated as paid evenly throughout the year, even if you concentrate it in Q4. Quarterly estimated payments are treated as paid only on the payment date — so a late Q4 catch-up does not retroactively fix an early-year shortfall.',
      ],
    },
    { type: 'h2', text: 'Edge cases that change the number significantly' },
    {
      type: 'ul',
      items: [
        '**Vest above $1M YTD in supplemental wages.** Federal supplemental rate jumps to 37% mandatory (no choice). Total effective tax on the next dollar can reach 50%+ in CA.',
        '**Already maxed Social Security via a prior job.** If you switched employers mid-year, your new employer does not know about the SS already paid. You may be over-withheld; reclaim on Form 1040 Schedule 3.',
        '**State residency change between grant and vest.** Some states (CA, NY) source RSU income to the state where you worked during the vesting period. If you moved, you may owe partial-year tax to both states.',
        '**Aggregate withholding method.** A minority of employers use the IRS aggregate method instead of the 22% flat — withholds at your actual marginal payroll rate. Total deduction looks higher but matches your actual liability better.',
        '**Pre-tax 401(k) and HSA contributions** reduce W-2 Box 1 ordinary income but do NOT reduce the FMV reported on RSU vests. The vest is taxed in full regardless of 401(k) contributions.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Plan on 30–40% combined tax on every RSU vest. The flat 22% federal supplemental rate is a deposit, not your final tax. Build the gap into your mental model: when you see "RSU vest: $50k" in your account, the spendable amount after April reconciliation is usually $28–35k. The rest is tax owed, even if your paycheck shows a higher net.',
    },
    {
      type: 'p',
      text:
        'Run the actual math for your situation in the calculator. If the projected shortfall is over $1,000, fix it this month — not in April — via W-4 Line 4(c). The §6654 safe harbor only catches you if you act before year-end.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g); Treas. Reg. §31.3402(g)-1; IRS Publication 15 and 15-T (2026); IRC §6654 (estimated tax safe harbor); IRC §1411 (Net Investment Income Tax); IRC §3101 (FICA); IRS Topic 451 (Wages and Compensation).',
    },
  ],
};
