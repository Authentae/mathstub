import type { BlogPost } from '../registry';

export const taxNumbers2026: BlogPost = {
  slug: '2026-equity-comp-tax-numbers',
  title: '2026 equity comp tax numbers: every rate, bracket, and limit in one place',
  description:
    'The verified 2026 figures a tech worker with RSUs, ISOs, NSOs, or ESPP actually needs — federal brackets, standard deduction, the OBBBA-changed AMT, long-term capital gains, FICA wage base, supplemental withholding, and retirement limits. Each number cited to its IRS source.',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'For 2026: the standard deduction is $16,100 single / $32,200 married-jointly; the 37% top bracket starts at $640,600 single / $768,700 MFJ; the AMT exemption is $90,100 single / $140,200 MFJ but — new under the One Big Beautiful Bill Act — it now phases out starting at $500k/$1M at 50¢ per dollar; the Social Security wage base is $184,500; supplemental wages withhold at 22% (37% above $1M YTD); and the 401(k) elective limit is $24,500 with a $72,000 overall §415(c) cap.',
  keyPoints: [
    'Standard deduction 2026: $16,100 single, $32,200 married-jointly, $24,150 head of household.',
    'The big 2026 change is AMT: OBBBA cut the exemption phaseout start to $500k/$1M and doubled the phaseout rate to 50¢ — more ISO exercisers will owe AMT.',
    'RSUs and bonuses withhold federal at a flat 22% up to $1M of supplemental wages, 37% above — your real rate is often 32–37%.',
    'Social Security stops at $184,500 of wages; Medicare never stops; an extra 0.9% kicks in above $200k.',
    '401(k): $24,500 elective + up to $72,000 all-in (§415(c)); IRA $7,500; Roth IRA phases out at $153k–$168k single / $242k–$252k MFJ.',
    'The IRS underpayment-penalty rate dropped to 7% (Q1) / 6% (Q2) for 2026, down from 8%.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'If your pay includes equity, almost every tax decision comes down to a handful of numbers that change each year. This page collects the 2026 figures that matter for RSUs, ISOs, NSOs, and ESPP, each tied to the IRS source that sets it. Where a 2026 number is different from what you might expect, it is usually because of the One Big Beautiful Bill Act (OBBBA), which changed several parameters beyond the normal inflation adjustment — most importantly the Alternative Minimum Tax.',
    },
    { type: 'h2', text: 'Federal income tax brackets (2026)' },
    {
      type: 'table',
      caption: 'Where each marginal rate begins — taxable income',
      headers: ['Rate', 'Single', 'Married filing jointly'],
      rows: [
        ['10%', '$0', '$0'],
        ['12%', '$12,400', '$24,800'],
        ['22%', '$50,400', '$100,800'],
        ['24%', '$105,700', '$211,400'],
        ['32%', '$201,775', '$403,550'],
        ['35%', '$256,225', '$512,450'],
        ['37%', '$640,600', '$768,700'],
      ],
    },
    {
      type: 'p',
      text:
        'These are taxable-income thresholds — income after your standard or itemized deduction. A single filer does not reach the 37% bracket until $640,600 of taxable income. Most equity-comp earners sit in the 24%, 32%, or 35% band, which is exactly why flat 22% supplemental withholding leaves a gap (see below).',
    },
    { type: 'h2', text: 'Standard deduction (2026)' },
    {
      type: 'table',
      headers: ['Filing status', '2026 standard deduction'],
      rows: [
        ['Single', '$16,100'],
        ['Married filing jointly', '$32,200'],
        ['Head of household', '$24,150'],
        ['Married filing separately', '$16,100'],
      ],
    },
    { type: 'h2', text: 'Alternative Minimum Tax (2026) — the big OBBBA change' },
    {
      type: 'callout',
      text:
        'OBBBA reset the AMT exemption phaseout to 2018 levels AND doubled the phaseout speed. For 2026 the exemption starts disappearing at $500,000 (single) / $1,000,000 (MFJ) and shrinks by 50¢ for every $1 of AMTI above that — versus 25¢ before. If you exercise and hold ISOs, more of your exemption is clawed back, so AMT bites at lower income than in prior years.',
    },
    {
      type: 'table',
      caption: 'AMT parameters, 2026',
      headers: ['Parameter', 'Single', 'Married filing jointly'],
      rows: [
        ['Exemption amount', '$90,100', '$140,200'],
        ['Exemption phaseout starts at', '$500,000', '$1,000,000'],
        ['Phaseout rate', '50¢ per $1 (OBBBA)', '50¢ per $1 (OBBBA)'],
        ['26% → 28% rate breakpoint', '$244,500', '$244,500'],
      ],
    },
    {
      type: 'p',
      text:
        'AMT is its own parallel tax: you compute tentative minimum tax (26% on AMT income up to the breakpoint, 28% above) and pay the higher of that or your regular tax. The ISO bargain element (fair market value minus strike, times shares) is the most common preference item that pushes tech workers into AMT. Note the standard deduction is not allowed for AMT — it gets added back to AMT income — so even standard-deduction filers feel the calculation.',
    },
    {
      type: 'p',
      text:
        'The practical effect of the OBBBA change: a single filer who exercises and holds ISOs now starts losing the $90,100 exemption at $500,000 of AMT income instead of around $640,000, and loses it twice as fast. The exemption is fully gone by roughly $680,000 of AMT income (single) — at $500,000 plus $90,100 divided by the 50¢ rate. That means a moderately large ISO exercise stacked on a normal tech salary can trigger AMT in 2026 where the same exercise would have stayed under the line in 2025. If you are planning an exercise-and-hold, model it before December 31, because splitting the exercise across two calendar years is the main lever for staying under the AMT crossover.',
    },
    { type: 'h2', text: 'Long-term capital gains & NIIT (2026)' },
    {
      type: 'table',
      caption: 'LTCG / qualified-dividend rate thresholds — taxable income',
      headers: ['Rate', 'Single', 'Married filing jointly'],
      rows: [
        ['0%', 'up to $49,450', 'up to $98,900'],
        ['15%', '$49,450–$545,500', '$98,900–$613,700'],
        ['20%', 'above $545,500', 'above $613,700'],
        ['+ NIIT 3.8%', 'MAGI over $200,000', 'MAGI over $250,000'],
      ],
    },
    {
      type: 'p',
      text:
        'Shares held more than a year after vesting (RSUs) or after exercise (options) get these preferential rates on the appreciation. The 3.8% Net Investment Income Tax stacks on top once your modified AGI crosses the threshold — and those NIIT thresholds are fixed by statute, never inflation-adjusted.',
    },
    { type: 'h2', text: 'Payroll taxes & supplemental withholding (2026)' },
    {
      type: 'table',
      headers: ['Item', '2026 figure'],
      rows: [
        ['Social Security wage base', '$184,500 (6.2% up to this; then it stops)'],
        ['Medicare', '1.45% on all wages (no cap)'],
        ['Additional Medicare', '+0.9% on wages over $200k single / $250k MFJ'],
        ['Supplemental withholding — first $1M YTD', '22% federal (flat)'],
        ['Supplemental withholding — above $1M YTD', '37% federal'],
      ],
    },
    {
      type: 'flow',
      caption: 'Why a vest under-withholds for a high earner',
      steps: [
        { label: 'Withheld at vest', value: '22%' },
        { label: 'Your real bracket', value: '32–37%', tone: 'bad' },
        { label: 'Gap you owe later', value: '10–15 pts', tone: 'bad' },
      ],
    },
    {
      type: 'p',
      text:
        'RSU vests and cash bonuses are "supplemental wages." Employers withhold a flat 22% federal on the first $1,000,000 of supplemental wages in the year, and 37% on anything above that. If your marginal rate is 32% or 35%, the 22% withholding leaves a shortfall you must cover via a W-4 line 4(c) top-up or a quarterly estimate.',
    },
    { type: 'h2', text: 'Retirement contribution limits (2026)' },
    {
      type: 'table',
      headers: ['Limit', '2026 amount'],
      rows: [
        ['401(k) elective deferral (§402(g))', '$24,500'],
        ['401(k) catch-up (age 50+)', '+$8,000'],
        ['401(k) super catch-up (age 60–63)', '+$11,250'],
        ['Overall defined-contribution cap (§415(c))', '$72,000'],
        ['Traditional / Roth IRA', '$7,500 (+$1,100 catch-up at 50+)'],
        ['Roth IRA income phaseout — single', '$153,000–$168,000 MAGI'],
        ['Roth IRA income phaseout — MFJ', '$242,000–$252,000 MAGI'],
      ],
    },
    {
      type: 'p',
      text:
        'The §415(c) overall cap ($72,000) minus your elective deferral, employer match, and any profit-sharing is your Mega-Backdoor Roth room if your plan allows after-tax contributions plus in-service conversion. High earners over the Roth IRA phaseout use the Backdoor Roth (non-deductible Traditional IRA → convert) for the $7,500.',
    },
    { type: 'h2', text: 'Estimated tax & underpayment penalty (2026)' },
    {
      type: 'table',
      headers: ['Item', '2026 figure'],
      rows: [
        ['Underpayment penalty rate — Q1 (Jan–Mar)', '7% annualized'],
        ['Underpayment penalty rate — Q2 (Apr–Jun)', '6% annualized'],
        ['Safe harbor (prior-year AGI ≤ $150k)', 'pay 100% of last year’s tax'],
        ['Safe harbor (prior-year AGI > $150k)', 'pay 110% of last year’s tax'],
        ['De minimis — no penalty if balance under', '$1,000'],
      ],
    },
    {
      type: 'p',
      text:
        'The IRS underpayment rate (federal short-term rate + 3 points, set quarterly under IRC §6621) stepped down from 8% in 2025 to 7% then 6% in 2026. Withholding is treated as paid evenly across the year, so a December W-4 line 4(c) top-up can retroactively cure an earlier shortfall and defeat the penalty — a quarterly estimate only counts from the date you pay it.',
    },
    { type: 'h2', text: 'Which calculator runs each of these?' },
    {
      type: 'table',
      headers: ['Your situation', 'Calculator'],
      rows: [
        ['RSU vest under-withheld?', 'RSU Tax Shortfall'],
        ['Cash bonus under-withheld?', 'Bonus Tax Shortfall'],
        ['Exercising ISOs — will I owe AMT?', 'ISO / AMT, or Form 6251 multi-source'],
        ['Exercising NSOs', 'NSO Exercise Tax'],
        ['Selling ESPP shares', 'ESPP Qualifying Disposition'],
        ['Need a quarterly estimate', 'Quarterly Estimated Tax'],
        ['Mega-Backdoor / Backdoor Roth room', 'Roth Sequencer'],
      ],
    },
    {
      type: 'p',
      text:
        'Every Mathstub calculator runs in your browser with no signup — inputs never leave your device — and defaults to the 2026 tax year using exactly the figures on this page. Bookmark this reference and re-check it each January, because most of these numbers move with inflation (and occasionally with legislation like OBBBA).',
    },
    {
      type: 'p',
      text:
        'Sources: IRS Rev. Proc. 2025-32 (2026 inflation adjustments — brackets, standard deduction, AMT, LTCG); IRC §55–§56 and OBBBA (Pub. L. 119-21) for the AMT exemption phaseout change; IRC §1411 (NIIT); SSA news release, October 2025 ($184,500 wage base); IRC §3402(g) and Treas. Reg. §31.3402(g)-1 (22%/37% supplemental withholding); IRS Notice 2025-67 (2026 retirement plan limits — §402(g), §415(c), IRA); IRC §6621 and IRS quarterly interest-rate releases (underpayment rate); IRC §6654 (estimated-tax safe harbor). Figures verified against the IRS newsroom and Tax Foundation 2026 tables as of June 2026. Educational information, not tax advice — confirm high-stakes decisions with a CPA.',
    },
  ],
};
