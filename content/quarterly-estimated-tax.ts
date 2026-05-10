export const quarterlyEstimatedTaxContent = {
  slug: 'quarterly-estimated-tax',
  title: 'Quarterly Estimated Tax Safe-Harbor Calculator',
  metaTitle: 'Quarterly Estimated Tax Safe-Harbor Calculator (IRS §6654)',
  metaDescription:
    'Free calculator that figures out your IRS §6654 safe-harbor target, your per-quarter cumulative payment schedule, and exactly what to send the IRS by the next due date to avoid an underpayment penalty.',
  h1: 'Quarterly Estimated Tax Safe-Harbor Calculator',
  lede:
    'The IRS underpayment penalty has nothing to do with what you owe at filing — it has everything to do with whether you paid enough by each quarterly due date. This calculator works out the §6654 safe-harbor minimum you need to hit, splits it across the four quarters, and tells you what to send before the next due date.',
  lastUpdated: '2026-05-10',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Estimate this year’s total federal tax',
      text: 'Use last year’s return as a starting point, then adjust for known changes (RSU vests, ISO exercises, big bonuses, side income).',
    },
    {
      name: 'Pull last year’s numbers',
      text: 'You need prior-year total federal tax (Form 1040 line 24) and prior-year AGI (line 11). Prior-year AGI determines whether the 100% or 110% rule applies.',
    },
    {
      name: 'Add expected withholding and any estimated payments already made',
      text: 'Total federal withholding for the full year (W-2 + 1099) and the dollar sum of estimated payments you’ve already sent.',
    },
    {
      name: 'Pick the next quarter and read the recommended payment',
      text: 'The calculator shows the lower of the two safe-harbor amounts, the per-quarter target, and exactly what to send for the next due date.',
    },
  ],
  faqs: [
    {
      q: 'What is the §6654 safe harbor?',
      a: 'IRC §6654 imposes a penalty if you under-pay your federal tax during the year. To avoid the penalty, you must have paid (through withholding + estimates) at least the LESSER of (a) 90% of this year’s tax or (b) 100% of last year’s tax — 110% if your prior-year AGI was over $150,000 ($75,000 if MFS). See IRS Publication 505 (Tax Withholding and Estimated Tax), chapter 2.',
    },
    {
      q: 'When are estimated payments due?',
      a: 'Federal due dates are April 15, June 15, September 15, and January 15 of the following year. If a due date falls on a weekend or federal holiday, it shifts to the next business day. State estimated-tax dates often differ — check your state’s revenue department.',
    },
    {
      q: 'How is withholding treated vs. estimated payments?',
      a: 'Per Treas. Reg. §1.6654-2(d), federal withholding is treated as paid evenly throughout the year — even if it was actually all withheld in December. Estimated payments are credited to the quarter in which they were paid. This is why a Q4 RSU vest can leave you exposed for Q1–Q3 even if you pay in full at year end.',
    },
    {
      q: 'Why is there a $1,000 floor?',
      a: 'IRC §6654(e)(1) says no underpayment penalty applies if your total tax owed at filing is less than $1,000 after subtracting withholding. So if your numbers are small enough, you don’t need to worry about quarterlies at all.',
    },
    {
      q: 'What is the annualized-income method?',
      a: 'If your income is uneven across the year (common for RSU vests, freelance contracts, or commission-heavy sales), Form 2210 Schedule AI lets you "annualize" income by quarter so you don’t get penalized for under-paying in early quarters when you hadn’t earned the income yet. This calculator does NOT model Schedule AI in v1 — it uses the simpler "even payments" assumption.',
    },
    {
      q: 'How is the penalty calculated?',
      a: 'The IRS underpayment-penalty rate is the federal short-term rate + 3 percentage points, reset quarterly (IRC §6621). For 2025–2026 it has hovered around 8% annualized. Form 2210 computes the penalty per-quarter based on how long each shortfall stayed unpaid. The number we show is a planning estimate using a flat 8%, NOT the exact Form 2210 result.',
    },
    {
      q: 'Should I use 90% of this year or 100/110% of last year?',
      a: 'Pick whichever produces the SMALLER target — that’s your minimum. Most people in a stable income year find prior-year-rule simpler because it’s a known number. People expecting big income drops use the 90%-of-current rule. Switching mid-year is fine — the IRS just looks at year-end totals.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it’s an estimate based on IRS Publication 505, IRC §6654, and the inputs you provide. It does not consider state estimated tax, AMT, multi-state residency, or annualized-income (Form 2210 Schedule AI) special rules. For decisions involving real money, talk to a licensed tax professional.',
    },
  ],
} as const;
