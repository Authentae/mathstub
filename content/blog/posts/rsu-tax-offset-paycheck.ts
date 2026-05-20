import type { BlogPost } from '../registry';

export const rsuTaxOffsetPaycheck: BlogPost = {
  slug: 'rsu-tax-offset-paycheck',
  title: 'What is the RSU tax offset on my paycheck? Plain-English explanation',
  description:
    'The "RSU tax offset" line on your paystub is not a real charge. It is an accounting placeholder your payroll software uses to reconcile the RSU vest income that already had taxes withheld via share-withholding (sell-to-cover). Net effect on take-home: zero.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'The "RSU tax offset" on your paystub is not a real deduction — it is a balancing entry that cancels out the RSU vest income shown elsewhere on the same paystub. The actual tax was already withheld through share-withholding (sell-to-cover) when the shares vested. Net effect on your take-home cash: zero. It is unusual-looking but mathematically correct.',
  blocks: [
    {
      type: 'p',
      text:
        'You open your paystub after an RSU vest and see a strange line: "RSU tax offset" or "Section 132 offset" or "Net taxable RSU offset" — often a four-figure negative number. Your first reaction is panic. It looks like the company is taking even more out of your check. Calm down. The offset is not a real deduction. It is a paystub-accounting trick to balance the math when shares (not cash) are used to pay your tax bill.',
    },
    {
      type: 'callout',
      text:
        'Net effect on your take-home cash: zero. The offset cancels out an equal-sized "income" line for the RSU vest. You can verify this in 30 seconds by adding all positive lines and subtracting all deductions — your paycheck still ties to what you expected.',
    },
    { type: 'h2', text: 'Why the offset exists in the first place' },
    {
      type: 'p',
      text:
        'When RSUs vest, two things happen simultaneously:',
    },
    {
      type: 'ol',
      items: [
        'The full fair-market value of the vested shares is added to your taxable wages for the period (W-2 Box 1).',
        'A portion of the shares is withheld and sold by the broker to cover federal, state, FICA, and Medicare tax on the vest. This is called "share withholding" or "sell-to-cover."',
      ],
    },
    {
      type: 'p',
      text:
        'The cash from the sold shares pays your tax bill — but it never flows through your paycheck. Your payroll system still needs to record the FULL vest value as income (for W-2 reporting) and the taxes-paid amount as withholding. The "RSU tax offset" line is an accounting balance that prevents the system from double-paying you in cash.',
    },
    { type: 'h2', text: 'Worked example — 100 RSUs vest at $50/share' },
    {
      type: 'p',
      text:
        'Your employer vests 100 RSU shares at $50/share = $5,000 gross. Your supplemental withholding is 35% combined (federal + state + FICA + Medicare), so the broker withholds 35 shares to cover $1,750 of tax. You receive 65 shares net.',
    },
    {
      type: 'p',
      text:
        'On your next paystub, you see roughly these lines (numbers approximated):',
    },
    {
      type: 'ul',
      items: [
        '+ Regular wages: $5,000 (your normal salary)',
        '+ RSU vest income: $5,000 (the FULL vest, not just the 65 shares you kept)',
        '− Federal income tax: $1,100 (22% × $5,000 supplemental)',
        '− State tax: $512 (10.23% × $5,000 in CA)',
        '− Medicare: $73',
        '− Social Security: $310 (if not yet maxed)',
        '− 401(k) etc: $500',
        '− **RSU tax offset: −$5,000**',
        '= Net pay: about $2,505',
      ],
    },
    {
      type: 'p',
      text:
        'The RSU tax offset (−$5,000) cancels the RSU vest income (+$5,000) on the cash side, because the vest was paid to you in SHARES, not cash. Your $2,505 net pay reflects only your regular salary minus deductions plus the cash from your normal paycheck. Tax on the vest is already paid (35 shares were sold and the IRS got the cash).',
    },
    { type: 'h2', text: 'Common variations in the line-item name' },
    {
      type: 'p',
      text:
        'Different payroll systems label this offset differently. All mean the same thing:',
    },
    {
      type: 'ul',
      items: [
        '"RSU tax offset" (most common, used by ADP, Workday)',
        '"Section 132 offset" (Section 132 of the IRC covers fringe benefits, sometimes reused as a label)',
        '"Net taxable RSU offset"',
        '"Equity offset" or "Stock vest offset"',
        '"Imputed income offset"',
        '"Non-cash compensation offset"',
      ],
    },
    { type: 'h2', text: 'Three real things to verify on your paystub' },
    {
      type: 'p',
      text:
        'While the offset itself is not real, three things ARE worth checking after a vest:',
    },
    {
      type: 'ol',
      items: [
        '**The vest gross matches your equity statement.** Your broker (Schwab, Fidelity, ETrade, Carta) should show 100 shares × $50 FMV = $5,000 gross. The paystub RSU vest income line should match. If they differ, ask payroll.',
        '**The shares withheld match the tax withheld.** 35 shares × $50 = $1,750 should roughly equal the sum of federal + state + FICA + Medicare lines on the same paystub. Differences are usually rounding (broker withholds whole shares; the tax is rounded up).',
        '**YTD Box 1 wages reflect the vest.** By year-end, your W-2 Box 1 should include the cumulative vested FMV. Cross-check December paystub YTD wages against Box 1 of W-2 in January.',
      ],
    },
    { type: 'h2', text: 'When the offset signals an actual problem' },
    {
      type: 'p',
      text:
        'The offset is almost always benign. Three rare cases where it indicates a real error:',
    },
    {
      type: 'ul',
      items: [
        '**Offset does not equal the vest gross.** If RSU vest income is $5,000 but the offset is −$4,500, something is mis-coded — possibly $500 of the vest was paid in cash rather than shares. Ask payroll for clarification.',
        '**Offset appears without a matching vest income line.** This indicates the payroll system is recording withholding without the corresponding income — would result in over-deducted taxes and potential reconciliation issues at year-end.',
        '**Multiple offsets in the same period.** If you see two or more "RSU tax offset" lines, it may mean two separate vests were processed in one pay cycle — verify against your equity statement.',
      ],
    },
    { type: 'h2', text: 'How this connects to the bigger RSU tax picture' },
    {
      type: 'p',
      text:
        'Share-withholding (and the offset entry that accounts for it) is your employer\'s way of withholding taxes on RSUs by selling some of your shares. The 22% federal supplemental rate is the default, which is often below high earners\' actual marginal rate — creating the "April surprise" shortfall. The offset line itself is fine; it is the underlying 22% withholding rate you should worry about.',
    },
    {
      type: 'p',
      text:
        'Use our RSU Tax Shortfall calculator to project whether you are under-withheld for the year. If yes, fix it before year-end by topping up Form W-4 line 4(c) — withholding is treated as paid evenly across the year under IRC §6654(g), so a late-year top-up retroactively cures earlier under-withholding.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'The "RSU tax offset" on your paystub is an accounting entry — not a real deduction. It cancels out the gross RSU vest income that was paid to you in shares (not cash). Net effect on your take-home: zero. The real thing to watch is whether the 22% supplemental rate on the same paystub is enough to cover your full-year tax bill — usually it is not for high earners.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §3402(g) (supplemental wages); Treas. Reg. §31.3402(g)-1; IRS Publication 525 (Taxable and Nontaxable Income); IRS Form W-2 instructions.',
    },
  ],
};
