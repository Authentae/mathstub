import type { BlogPost } from '../registry';

export const extraW4: BlogPost = {
  slug: 'extra-w4-withholding-rsu',
  title: 'How to set extra W-4 withholding to cover an RSU shortfall (step-by-step)',
  description:
    'Step-by-step guide to using Form W-4 line 4(c) to withhold extra federal tax from each paycheck and avoid an April surprise. Plus the mechanic that makes W-4 the right tool 90% of the time: IRC §6654(g)(1) treats withholding as paid evenly across the year.',
  datePublished: '2026-04-22',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'empower'],
  quickAnswer:
    'To cover an RSU shortfall: log into your payroll system (Workday, ADP, Gusto, Rippling, Justworks), open Form W-4, and enter a flat dollar amount on line 4(c) labelled "Additional withholding per pay period". Withholding is treated as paid evenly across the year per IRC §6654(g)(1), so a Q4 top-up retroactively cures earlier under-withholding — unlike a late quarterly estimated payment, which only counts from the date it is paid. The single most powerful tool for cleaning up an equity-comp tax shortfall mid-year.',
  keyPoints: [
    'Form W-4 line 4(c) lets you add a flat extra dollar amount to each paycheck’s tax.',
    'To find the amount: divide your shortfall by the pay periods left this year.',
    'Update it in your payroll system (Workday, ADP, Gusto) — no math, no IRS forms.',
    'Big perk: the IRS treats withholding as paid evenly all year, even a Q4 top-up.',
    'That beats a late estimated payment, which only counts from the day you pay it.',
    'Undo it next January, or you’ll over-withhold all year and lend the IRS money free.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'The simplest and most powerful way to plug an RSU withholding shortfall is to update your W-4 so your employer takes extra federal tax from every regular paycheck for the rest of the year. The W-4 redesign in 2020 (under the Tax Cuts and Jobs Act simplification) made this materially easier than the old allowances system — there is now a dedicated "Extra withholding" line that takes a flat dollar amount with no math required.',
    },
    {
      type: 'p',
      text:
        'This post walks the step-by-step mechanics, the rule that makes Form W-4 line 4(c) more powerful than a quarterly estimated payment (IRC §6654(g)(1)), and the most common mistakes that cost real money.',
    },
    { type: 'h2', text: 'Step 1: Calculate the shortfall' },
    {
      type: 'p',
      text:
        'Use the RSU Tax Shortfall calculator. Enter your vest amount, YTD wages, state, and filing status. The "Suggested extra W-4 per paycheck" line tells you exactly what dollar amount to enter on line 4(c). The calculator divides the projected shortfall by remaining bi-weekly paychecks in the year, so it produces a precise per-paycheck number.',
    },
    {
      type: 'p',
      text:
        'For a typical $50,000 RSU vest in March with a $200k base salary in California: the projected federal+state shortfall is roughly $7,000, which divided across ~20 remaining bi-weekly paychecks works out to ~$350 per paycheck on line 4(c).',
    },
    { type: 'h2', text: 'Step 2: Open Form W-4 in your payroll system' },
    {
      type: 'p',
      text:
        'Most modern employers let you update W-4 directly in their HR portal. Specific menus by system:',
    },
    {
      type: 'table',
      caption: 'Where to find Form W-4 in your payroll system',
      headers: ['System', 'Path to the W-4'],
      rows: [
        ['Workday', 'Pay → Withholding Elections → Federal → Update'],
        ['ADP / Workforce Now', 'Myself → Pay → Tax Withholdings → Federal W-4'],
        ['Rippling', 'Pay → Tax Withholding → Federal'],
        ['Justworks', 'Personal → Tax Info → Federal W-4'],
        ['Gusto', 'Documents → Tax Forms → Federal W-4'],
        ['Paychex Flex', 'Profile → Payroll → Tax Setup → Federal W-4'],
      ],
    },
    {
      type: 'p',
      text:
        'If your employer does not have a self-service option, request the latest Form W-4 (2026 revision) from HR or download from irs.gov. Fill it in, sign, and return to payroll. Paper updates typically take 1-2 pay cycles to take effect.',
    },
    { type: 'h2', text: 'Step 3: Fill line 4(c)' },
    {
      type: 'p',
      text:
        'You do NOT need to redo the full W-4 from scratch. Skip the income/dependents/multiple-jobs sections if they are already set correctly. Go directly to Step 4 "Other Adjustments" and find line 4(c) labeled "Extra withholding. Enter any additional tax you want withheld each pay period."',
    },
    {
      type: 'p',
      text:
        'Enter the per-paycheck dollar amount from Step 1. Common values: $150-$500 per paycheck for moderate shortfalls, $500-$1,500 per paycheck for large vests. Save and submit.',
    },
    { type: 'h2', text: 'Step 4: Verify on your next paystub' },
    {
      type: 'p',
      text:
        'After your W-4 update takes effect (next pay cycle for most payroll systems), check your paystub:',
    },
    {
      type: 'ul',
      items: [
        'The "Federal Income Tax" deduction line should jump by the amount you entered on 4(c).',
        'If it did not change, your update did not propagate — re-submit and ping payroll.',
        'If it jumped by less than expected, you may be hitting a per-paycheck cap your employer\'s payroll system enforces — most allow at least $5,000 per paycheck.',
      ],
    },
    { type: 'h2', text: 'Step 5: Undo it next year (this is the most common mistake)' },
    {
      type: 'callout',
      text:
        'After year-end, REMEMBER to undo the W-4 change if the vest was a one-time event. Otherwise you will over-withhold all of next year and effectively give the IRS an interest-free loan of $7,000-$30,000 over the next 12 months.',
    },
    {
      type: 'p',
      text:
        'The set-it-and-forget-it trap costs real money. A January W-4 review every year (or the moment you receive a notice of next year\'s vest amount) is the right rhythm. If you have annual RSU vests and the same shortfall pattern repeats, leave the W-4 in place. If the shortfall was a one-time vest or a year-end bonus that won\'t recur, undo it.',
    },
    { type: 'h2', text: 'Why W-4 beats quarterly estimates — the §6654(g)(1) mechanic' },
    {
      type: 'p',
      text:
        'The single biggest reason W-4 is the preferred fix: IRC §6654(g)(1) treats federal income tax withheld from wages as if it were paid in equal installments on each of the four estimated-tax due dates — regardless of WHEN during the year the withholding actually happened.',
    },
    {
      type: 'p',
      text:
        'Concrete example. You have a $200,000 RSU vest in March that creates a $30,000 federal shortfall. Two paths to cure:',
    },
    {
      type: 'table',
      caption: '$30k shortfall from a March vest, both cured in November',
      headers: ['', 'W-4 line 4(c)', 'Q4 estimated payment'],
      rows: [
        ['How the IRS credits it', 'Spread evenly across all 4 quarters', 'Only to Q4 (when paid)'],
        ['Q1–Q3 underpayment', 'Cured retroactively', 'Still under-paid'],
        ['**§6654 penalty**', '**$0**', '**~$450+**'],
      ],
    },
    {
      type: 'p',
      text:
        'For a 9-month underpayment of $7,500 at the current 8% APR penalty rate (IRC §6621), Path B costs an additional $450 in penalties that Path A avoids entirely. For larger shortfalls, the difference compounds.',
    },
    { type: 'h2', text: 'When W-4 alone is not enough' },
    {
      type: 'p',
      text:
        'Two cases where you need a combination:',
    },
    {
      type: 'ol',
      items: [
        '**Late-Q4 vests** — if the vest happens in November or December, there aren\'t enough remaining paychecks to absorb the shortfall via W-4. Solve: make a Q4 estimated payment for most of the shortfall + use W-4 for the residual.',
        '**>$50k shortfall** — even with monthly paychecks, $50k+ across 6 months = $8k/paycheck which can hit payroll-system caps or eat into take-home cash flow. Combine W-4 with an estimated payment to spread the cash impact.',
      ],
    },
    { type: 'h2', text: 'State withholding W-4 equivalent' },
    {
      type: 'p',
      text:
        'Most states have their own W-4 equivalent for state withholding (CA Form DE-4, NY IT-2104, etc.). The federal Form W-4 only controls federal withholding. If you have a meaningful state-tax shortfall on top of federal, file the state W-4 equivalent with a similar "extra withholding" amount. The state-specific rules vary on whether withholding is treated as paid evenly across the year (most follow the federal rule).',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Updating Form W-4 line 4(c) is the single most powerful tool for cleaning up an RSU withholding shortfall mid-year. It works because IRC §6654(g)(1) treats withholding as paid evenly across the year — so a Q4 W-4 top-up retroactively cures earlier under-withholding without triggering a per-quarter penalty. Five steps: calculate the shortfall, find your payroll system\'s W-4 page, fill line 4(c), verify the next paystub, undo it next year if the vest was a one-time event. Combine with a Q4 estimated payment for shortfalls over $50,000 or vests too late in the year for W-4 alone to absorb.',
    },
    {
      type: 'p',
      text:
        'If you want a single dashboard that shows the impact of equity comp across your overall finances (and the projected tax bill), free tools like Empower can pull your accounts and project taxes alongside investments — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402 (federal income tax withholding rules); IRC §6654 (Underpayment of Estimated Tax by Individuals); IRC §6654(g)(1) (withholding treated as paid evenly across the year); IRC §6621 (interest rate on underpayments); IRS Form W-4 (2026 revision) instructions; IRS Publication 505 (Tax Withholding and Estimated Tax); IRS Publication 15-T (Federal Income Tax Withholding Methods).',
    },
  ],
};
