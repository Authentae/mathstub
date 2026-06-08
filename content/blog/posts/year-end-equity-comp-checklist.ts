import type { BlogPost } from '../registry';

export const yearEndChecklist: BlogPost = {
  slug: 'year-end-equity-comp-checklist',
  title: 'Year-end equity comp tax checklist (RSUs, ESPP, ISO, NSO)',
  description:
    'A 10-item December checklist to avoid surprises on next April\'s return when your compensation includes RSUs, ESPP, or stock options. Each item links back to the calculator and the deeper article that explains the mechanic.',
  datePublished: '2026-04-30',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth', 'carta'],
  quickAnswer:
    'Run this in December: (1) project YTD withholding vs actual tax owed, (2) top up Form W-4 line 4(c) if shortfall > $1,000, (3) check ESPP qualifying-disposition holding periods, (4) model AMT on any ISO exercises, (5) confirm 1099-B cost-basis adjustments for vested RSUs sold, (6) max 401(k) and HSA, (7) tax-loss harvest, (8) decide on charitable stock gifts, (9) verify state residency sourcing, (10) export records for your CPA.',
  keyPoints: [
    'A 10-item December checklist to dodge an April tax surprise on your equity pay.',
    'Start by comparing what was withheld this year against what you will actually owe.',
    'If you are short by more than $1,000, add extra W-4 withholding before year-end.',
    'Five moves lock in at midnight Dec 31: charity stock gifts, loss harvesting, 401(k)/HSA, ISO timing, and W-4.',
    'Things like IRA contributions and fixing your 1099-B basis can wait until April.',
    "The two highest-value steps take 15 minutes: run the shortfall calculator and update line 4(c).",
  ],
  blocks: [
    {
      type: 'p',
      text:
        'December is the last useful month to act on equity-comp tax planning for the current year. Five things go irreversible at midnight on December 31: charitable donations of appreciated stock, tax-loss harvesting, 401(k) and HSA contribution caps, ISO holding-period decisions that affect qualifying-disposition status, and Form W-4 line 4(c) updates that retroactively cure earlier under-withholding. Miss the window and the only fix is paying full ordinary rates at April reconciliation. This checklist walks the 10 items that matter, with the IRC citation and deeper-post link for each.',
    },
    { type: 'h2', text: 'The 10-item December checklist' },
    { type: 'h3', text: '1. Pull your YTD wages and project total federal tax' },
    {
      type: 'p',
      text:
        'Open your most recent paystub. Note YTD W-2 wages, YTD federal withholding, and YTD supplemental wages (look for "RSU" or "Bonus" line items). Project the rest of the year by adding remaining paychecks at your regular rate plus any expected vests. Compare YTD withholding against your projected total federal tax. The gap is the shortfall.',
    },
    { type: 'h3', text: '2. Run the RSU Tax Shortfall calculator for each remaining vest' },
    {
      type: 'p',
      text:
        'For every RSU vest expected before December 31, plug the vest gross + your projected YTD wages into the calculator. It computes the federal supplemental withholding gap (22% vs your real marginal rate) and the state piece. If the cumulative annual shortfall exceeds $1,000, you have IRC §6654 underpayment-penalty exposure.',
    },
    { type: 'h3', text: '3. Top up Form W-4 line 4(c) before the last December paycheck' },
    {
      type: 'p',
      text:
        'The single most powerful December action. Federal withholding is treated as paid evenly across the year per IRC §6654(g)(1), so a December W-4 top-up retroactively cures earlier under-withholding — eliminating per-quarter penalty risk. Divide the projected shortfall by the number of remaining paychecks (typically 1-2 in late December) and enter on line 4(c). See the dedicated extra-w4-withholding-rsu post for step-by-step mechanics by payroll system (Workday, ADP, Rippling, etc.).',
    },
    { type: 'h3', text: '4. Check ESPP qualifying-disposition holding periods' },
    {
      type: 'p',
      text:
        'For each ESPP lot purchased in prior years, calculate two dates: 2 years from the offering date AND 1 year from the purchase date. The LATER date is when the lot qualifies for §423 preferential treatment. If you\'re considering a sale, the qualifying date determines whether the gain split is favorable (qualifying) or fully ordinary on the discount (disqualifying). See the espp-qualifying-vs-disqualifying-disposition post for the full math.',
    },
    { type: 'h3', text: '5. Model AMT on any ISO exercises this year' },
    {
      type: 'p',
      text:
        'For ISOs you exercised in the current year (or are about to exercise before December 31), compute the bargain element (FMV at exercise − strike) × shares. This becomes an AMT preference item under IRC §56(b)(3) — added to your AMT income, not your regular ordinary income. Run the ISO/AMT calculator with your full-year income to estimate AMT due. The cash bill from AMT can dwarf the federal income tax on regular wages.',
    },
    { type: 'h3', text: '6. Confirm 1099-B cost-basis adjustments for vested RSUs sold' },
    {
      type: 'p',
      text:
        'For any RSU shares sold during the year, your broker will issue Form 1099-B in January reporting the sale. Most brokers report cost basis as $0 — which would double-tax the vested value. Plan to adjust on Form 8949 column (g): correct basis = FMV at vest. December is the right time to verify your broker can provide the per-lot FMV-at-vest data needed for the adjustment. See the how-to-report-rsu-tax-return post.',
    },
    { type: 'h3', text: '7. Max 401(k) and HSA contributions before year-end' },
    {
      type: 'p',
      text:
        'Pre-tax 401(k) and HSA contributions reduce your W-2 Box 1 ordinary income dollar-for-dollar — directly cutting the marginal-rate tax on the next dollar of supplemental income. 2026 limits (projected): $24,000 401(k) elective + $8,000 catch-up at 50+; $4,400/$8,750 HSA self/family + $1,000 catch-up at 55+. The mega-backdoor Roth (if your 401(k) plan supports it) can add up to $46,500 more in after-tax contributions converted to Roth.',
    },
    { type: 'h3', text: '8. Tax-loss harvest before December 31' },
    {
      type: 'p',
      text:
        'Realized capital losses offset realized capital gains dollar-for-dollar plus up to $3,000 of ordinary income per year under IRC §1211(b). Excess losses carry forward indefinitely. Watch the §1091 wash-sale rule — do not repurchase the same security within 30 days before or after the sale. Tax-loss harvesting does NOT offset the ordinary-income portion of an RSU vest (only the capital-gain portion of post-vest appreciation if you sold).',
    },
    { type: 'h3', text: '9. Decide on charitable stock gifts' },
    {
      type: 'p',
      text:
        'Donating appreciated long-term stock directly (instead of selling and donating cash) avoids capital-gains tax AND gives you a deduction at FMV — up to 30% of AGI for long-term appreciated property per IRC §170(b)(1)(C). Transfers must be COMPLETED by December 31 for current-year deduction. Donor-advised funds (Fidelity Charitable, Schwab Charitable, Vanguard) let you stockpile the deduction this year and distribute to specific charities later. Especially powerful in a year with concentrated RSU vest income pushing you into a higher bracket.',
    },
    { type: 'h3', text: '10. Verify state-residency sourcing if you moved' },
    {
      type: 'p',
      text:
        'If you changed states during the vesting period for any RSU that vested this year, the income may be split between states based on workday allocation. California and New York are aggressive about claiming the workday-fractional portion even after you move out. Identify any cross-state vests and plan to file a part-year resident return (Form 540NR for CA, IT-203 for NY) plus your new-state resident return. See the multi-state-rsu-sourcing-california post.',
    },
    {
      type: 'callout',
      text:
        'If you do nothing else this December, run the RSU shortfall calculator for your next vest and update W-4 line 4(c). Those two actions alone fix 80% of April surprises and take 15 minutes total.',
    },
    { type: 'h2', text: 'What goes irreversible at midnight on December 31' },
    {
      type: 'p',
      text:
        'Five categories of tax-planning moves cannot be made after the calendar year ends:',
    },
    {
      type: 'table',
      caption: 'Locks at midnight on December 31',
      headers: ['Action', 'The deadline detail'],
      rows: [
        ['Charitable stock donation', 'Must land in the charity’s account by 12/31 (allow 5–10 days)'],
        ['Tax-loss harvesting', 'Sale must execute by ~12/30 (T+1 settlement)'],
        ['401(k) / payroll HSA', 'Through your final December paycheck'],
        ['ISO disqualifying-disposition timing', 'One more month can flip a lot to qualifying'],
        ['W-4 line 4(c) top-up', 'Only current-year wages get the even-spread §6654(g)(1) treatment'],
      ],
    },
    { type: 'h2', text: 'Things you CAN fix after December 31' },
    {
      type: 'table',
      caption: 'You can still do these after Dec 31',
      headers: ['Action', 'Deadline'],
      rows: [
        ['IRA contributions (Traditional / Roth)', 'April 15'],
        ['Direct HSA contributions', 'April 15'],
        ['SEP-IRA / Solo 401(k) (self-employed)', 'Up to Oct 15 with extension'],
        ['1099-B cost-basis fix (Form 8949)', 'At filing'],
        ['Form 2210 Schedule AI', 'At filing — can cut the penalty'],
      ],
    },
    { type: 'h2', text: 'For complex situations — get a CPA consult before December 31' },
    {
      type: 'p',
      text:
        'Five trigger conditions where the December planning window is too tight for a DIY pass:',
    },
    {
      type: 'ol',
      items: [
        'Total RSU + bonus + NSO + ISO income > $500k for the year.',
        'You exercised ISOs in the current year and AMT is a meaningful number (>$10k).',
        'You moved states during the vesting period for a large RSU.',
        'Pre-IPO double-trigger lockup expiration happened this year.',
        'Multiple employers in the same year with overlapping equity grants.',
      ],
    },
    {
      type: 'p',
      text:
        'A CPA consult costs $200-500 for the planning conversation. For any of the above triggers, the savings on optimization or avoided penalties typically pays for it 10x. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Ten items, fifteen minutes for the simple ones, a CPA call for the complex ones. The single highest-leverage action is updating Form W-4 line 4(c) before the last December paycheck — the §6654(g)(1) evenly-paid mechanic means a December top-up retroactively cures earlier under-withholding without per-quarter penalty risk. Charitable stock gifts and tax-loss harvesting are the next most time-sensitive because they go irreversible at midnight on December 31. Everything else has more flexibility, but the rhythm of running this checklist every December prevents the April surprise that almost every first-time equity-comp employee experiences.',
    },
    {
      type: 'p',
      text:
        'For specific calculations: RSU Tax Shortfall, Bonus Tax Shortfall, ISO/AMT, NSO Exercise, ESPP Qualifying Disposition, AMT Credit Recovery, Quarterly Estimated Tax — every calculator on Mathstub runs in your browser, no signup, inputs never leave your device. Use the Year-End Tax Quick Checklist PDF (free download via the calculator pages) to print the list and check off items as you go.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §6654 (underpayment of estimated tax); IRC §6654(g)(1) (withholding treated as paid evenly); IRC §56(b)(3) (ISO bargain element as AMT preference); IRC §1211(b) ($3,000 capital loss offset of ordinary income); IRC §1091 (wash sale rule); IRC §170(b)(1)(C) (charitable contribution limits for appreciated property); IRC §423 (ESPP qualifying disposition); IRC §422 (ISO qualifying disposition); IRC §1012 (cost basis); Form 2210 + Schedule AI (Annualized Income Installment Method); Form 8949 (sales of capital assets); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 526 (Charitable Contributions); IRS Publication 17 (Your Federal Income Tax).',
    },
  ],
};
