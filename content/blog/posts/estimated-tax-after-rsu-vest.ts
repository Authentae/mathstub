import type { BlogPost } from '../registry';

export const estimatedTax: BlogPost = {
  slug: 'estimated-tax-after-rsu-vest',
  title: 'Should you make estimated tax payments after an RSU vest?',
  description:
    'How the IRS §6654 safe-harbor rule works, when an RSU shortfall triggers an underpayment penalty, and the two ways to fix it — with worked numbers and the exact mechanics of why W-4 line 4(c) beats a Q4 estimated payment for retroactive coverage.',
  datePublished: '2026-04-20',
  dateModified: '2026-06-09',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'You only owe a federal underpayment penalty under IRC §6654 if your total unpaid tax for the year exceeds $1,000 AND your withholding falls below the safe harbor (90% of current-year tax OR 100% of prior-year tax, 110% if prior AGI > $150k). If a vest pushes you past those thresholds, top up Form W-4 line 4(c) before December 31 (treated as paid evenly across the year per §6654(g)(1)) or send a quarterly estimated payment via IRS Direct Pay.',
  keyPoints: [
    'Maybe — you only owe an estimated payment if too little tax was withheld this year.',
    'RSU vests are often withheld at a flat 22%, well below most high earners’ real rate.',
    "The IRS won't penalize you for owing tax, only for prepaying too little during the year.",
    'You’re safe if you prepay 90% of this year’s tax, or 100–110% of last year’s.',
    'No penalty at all if your total unpaid tax for the year is under $1,000.',
    'Best fix: extra W-4 paycheck withholding counts as paid all year, even if you start late.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'A surprise RSU tax shortfall can trigger an IRS underpayment penalty on top of the tax itself. The penalty is small — typically a few hundred to a few thousand dollars depending on shortfall size and how long it sits unpaid — but it is entirely avoidable if you understand the IRC §6654 safe-harbor mechanic. This post walks the rule, the two fix methods, and the mechanic that makes W-4 line 4(c) the right tool 90% of the time.',
    },
    { type: 'h2', text: 'The safe-harbor rule (IRC §6654 / IRS Pub 505)' },
    {
      type: 'p',
      text:
        'You will NOT owe an underpayment penalty for the year if you paid in (via withholding + estimated taxes) at least the smaller of:',
    },
    {
      type: 'flow',
      caption: 'No penalty if you prepay the LOWER of these',
      steps: [
        { label: 'This year', value: '90% of tax' },
        { label: 'OR last year', value: '100% (110% if AGI > $150k)' },
        { label: 'Beat the lower one', value: 'Safe', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'The penalty also doesn\'t apply if your total tax owed at filing is under $1,000 (i.e., withholding already covered all but a trivial amount).',
    },
    {
      type: 'p',
      text:
        'If your only income is W-2 wages and your withholding covers the prior-year safe harbor, you usually do not need to do anything — the prior-year safe harbor is the easy path because the number is known. RSU vests break this — they push your total income up while only being withheld at the 22% flat supplemental rate, so neither the 90% current-year test nor the 110% prior-year test gets covered automatically.',
    },
    { type: 'h2', text: 'Worked example — when the safe harbor breaks' },
    {
      type: 'p',
      text:
        'You\'re single, $200k base salary, no equity in prior years. Total 2024 federal tax: $36,000. AGI in 2024: $190,000 (above $150k, so prior-year safe harbor is 110% × $36k = $39,600).',
    },
    {
      type: 'p',
      text:
        '2025 changes: you get a $200,000 RSU vest in March. Your 2025 total taxable income is now $400,000. At 32% marginal, your projected 2025 federal tax is approximately $90,000.',
    },
    {
      type: 'table',
      caption: '$200k vest · $200k base · single (2025)',
      headers: ['Safe-harbor test', 'Target', 'Met by $74k withholding?'],
      rows: [
        ['Current-year (90% of $90k)', '$81,000', 'No'],
        ['Prior-year (110% of $36k)', '$39,600', '✓ Yes — the lower bar'],
        ['**Result**', '**beat the lower**', '**No penalty**'],
      ],
    },
    {
      type: 'p',
      text:
        'Your withholding ($44,000 from the 22% vest withholding + ~$30,000 from regular base-salary withholding = $74,000) clears the $39,600 prior-year bar — so there is no penalty, even though you still owe more at filing.',
    },
    {
      type: 'p',
      text:
        'The 110%-of-prior-year safe harbor is usually the most forgiving for newly-equity-rich employees — it locks in last year\'s lower number as the threshold. Even with a $90k current-year tax bill and $74k of withholding (a $16k shortfall), you avoid the §6654 penalty because the prior-year test was met.',
    },
    { type: 'h2', text: 'When the prior-year safe harbor does NOT work' },
    {
      type: 'p',
      text:
        'The trap: if you had a big equity year LAST year too, the 110% prior-year target itself becomes large enough to be a meaningful binding test. Example: 2024 you also had a $200k vest. 2024 total federal tax: $80,000. Prior-year safe harbor: 110% × $80,000 = $88,000. The bar is now much higher — and the same 2025 withholding ($74,000) falls below both the current-year 90% test AND the prior-year 110% test.',
    },
    {
      type: 'p',
      text:
        'In this case the §6654 penalty applies on the shortfall. The penalty rate is the federal short-term rate + 3% (currently around 8% APR), calculated per quarter on Form 2210.',
    },
    { type: 'h2', text: 'Two ways to plug the gap' },
    { type: 'h3', text: 'Option 1: Update Form W-4 line 4(c) to withhold extra' },
    {
      type: 'p',
      text:
        'On the latest Form W-4, line 4(c) lets you specify an additional dollar amount to withhold from each regular paycheck. This is almost always the best fix because:',
    },
    {
      type: 'ul',
      items: [
        '**Withholding is treated as paid EVENLY across the entire year per IRC §6654(g)(1).** Even if you top up your W-4 in November, the IRS treats that withholding as if it was spread across all four quarters. A December top-up retroactively cures earlier under-withholding.',
        'Operationally simple — set it once, payroll handles the rest.',
        'No quarterly due-date paperwork.',
        'Resets automatically each January.',
      ],
    },
    { type: 'h3', text: 'Option 2: Make a quarterly estimated tax payment via IRS Direct Pay' },
    {
      type: 'p',
      text:
        'Quarterly due dates for 2026 are April 15, June 15, September 15, and January 15, 2027. Pay the shortfall via IRS Direct Pay (irs.gov/payments) as a "Form 1040 estimated tax" payment.',
    },
    {
      type: 'p',
      text:
        'Critical: estimated payments are credited to the quarter they were paid in, NOT spread across the year. If a $200k vest happens in March and you make a $20k estimated payment in October, the IRS\'s §6654 calculation treats Q1, Q2, and Q3 as still under-paid for the part of the year that included the March vest. You can owe a penalty on the under-paid earlier quarters even after the October payment.',
    },
    {
      type: 'callout',
      text:
        'W-4 line 4(c) is treated as paid evenly across the year per IRC §6654(g)(1) — retroactively cures earlier under-withholding. Quarterly estimated payments are credited to the quarter paid — does not cure under-withholding from earlier quarters. For shortfalls discovered mid-year, the W-4 fix is materially better.',
    },
    { type: 'h2', text: 'When you do NOT need to act' },
    {
      type: 'ul',
      items: [
        'Total annual tax shortfall under $1,000 — under the safe-harbor floor regardless of percentage.',
        'Your prior-year tax was modest and your existing withholding already covers 110% of it (the easy path for first-time equity-comp employees).',
        'You will be claiming a refundable credit large enough to wipe the shortfall (rare for high-income RSU situations).',
        'You\'re receiving the vest in Q4 of a year where you can let withholding ride and just pay the difference at filing — fine if total expected shortfall stays under the safe-harbor threshold.',
      ],
    },
    { type: 'h2', text: 'The combination approach for large shortfalls' },
    {
      type: 'p',
      text:
        'For shortfalls over $50,000, neither method alone is usually enough — there aren\'t enough remaining paychecks to absorb a 5-figure W-4 top-up evenly. The pragmatic approach:',
    },
    {
      type: 'ol',
      items: [
        'Make a Q4 estimated payment (via IRS Direct Pay) covering the bulk of the shortfall immediately. This handles cash-flow.',
        'Update W-4 line 4(c) for any remaining paycheck capacity to spread the residual.',
        'Use Form 2210 Schedule AI ("Annualized Income Installment Method") at filing time to argue that the underpayment for earlier quarters was driven by Q3/Q4 income that didn\'t exist earlier — sometimes reduces the penalty.',
      ],
    },
    {
      type: 'p',
      text:
        'The annualized income installment method on Form 2210 Schedule AI is worth knowing about: it lets you compute your required quarterly payments based on actual income earned by each quarter, rather than assuming income was earned evenly. For RSU vests that happen in Q3 or Q4, this often shifts the penalty calculation favorably.',
    },
    { type: 'h2', text: 'How the penalty is calculated' },
    {
      type: 'p',
      text:
        'IRC §6621 sets the underpayment rate as the federal short-term rate + 3 percentage points, adjusted quarterly. For 2026 it is 7% annualized in Q1 and 6% in Q2 (down from 8% in 2025). The penalty is computed on Form 2210 by calculating the shortfall per quarter and applying the rate from the due date until either the payment date or the April 15 filing deadline.',
    },
    {
      type: 'p',
      text:
        'For a $10,000 annual shortfall that sat unpaid for ~9 months: roughly $600 penalty. Small but annoying — and entirely avoidable with $0 effort if you hit the safe harbor.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'After an RSU vest, check whether your withholding will hit the IRC §6654 safe harbor: 90% of current-year tax OR 100/110% of prior-year tax (lower of the two). If not, the W-4 line 4(c) top-up is almost always the right fix because withholding is treated as paid evenly across the year per §6654(g)(1) — retroactively curing earlier under-withholding. For shortfalls discovered late in the year, combine W-4 with a Q4 estimated payment plus Form 2210 Schedule AI annualization to minimize the penalty.',
    },
    {
      type: 'p',
      text:
        'For projecting whether you hit safe harbor for the year, use the Quarterly Estimated Tax calculator (computes your §6654 target by both methods) and the RSU Tax Shortfall calculator (federal + state piece on a single vest). Both run in your browser, no signup, no inputs sent to a server.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §6654 (Underpayment of Estimated Tax by Individuals); IRC §6654(d)(1)(B) (90% current-year and 100/110% prior-year safe harbor); IRC §6654(g)(1) (withholding treated as paid evenly across the year); IRC §6621 (interest rate on underpayments); IRS Form 2210 (Underpayment of Estimated Tax); IRS Form 2210 Schedule AI (Annualized Income Installment Method); IRS Publication 505 (Tax Withholding and Estimated Tax); IRS Form W-4 instructions.',
    },
  ],
};
