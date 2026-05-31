import type { BlogPost } from '../registry';

export const yearEndChecklist: BlogPost = {
  slug: 'year-end-equity-comp-checklist',
  title: 'Year-end equity comp tax checklist (RSUs, ESPP, ISO, NSO)',
  description:
    'A 10-item December checklist to avoid surprises on next April\'s return when your compensation includes RSUs, ESPP, or stock options. Each item links back to the calculator and the deeper article that explains the mechanic.',
  datePublished: '2026-04-30',
  dateModified: '2026-05-19',
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
        'December is your last real chance to do anything about this year’s equity-comp taxes. Five things lock shut at midnight on December 31: donating appreciated stock, harvesting tax losses, maxing your 401(k) and HSA, the ISO timing that decides whether you get the good tax rate, and a W-4 line 4(c) update that can patch earlier under-withholding. Miss the window, and your only option is paying full price at the April reckoning. Here are the 10 items that matter, each with the rule behind it and a link to the deeper post.',
    },
    { type: 'h2', text: 'The 10-item December checklist' },
    { type: 'h3', text: '1. Pull your year-to-date pay and estimate your total federal tax' },
    {
      type: 'p',
      text:
        'Grab your latest paystub. Note your year-to-date wages, year-to-date federal tax withheld, and year-to-date bonus-style pay (look for "RSU" or "Bonus" lines). Estimate the rest of the year by adding your remaining paychecks plus any vests still coming. Compare what has been withheld against what you will actually owe. The gap is your shortfall.',
    },
    { type: 'h3', text: '2. Run the RSU Tax Shortfall calculator for each vest still coming' },
    {
      type: 'p',
      text:
        'For every RSU vest expected before December 31, drop the vest amount plus your year-to-date wages into the calculator. It works out the federal gap (22% held back vs your real rate) and the state piece. If your total shortfall for the year tops $1,000, you have underpayment-penalty exposure.',
    },
    { type: 'h3', text: '3. Top up Form W-4 line 4(c) before your last December paycheck' },
    {
      type: 'p',
      text:
        'This is the single most powerful December move. Federal withholding counts as paid evenly across the whole year, so a December top-up retroactively patches earlier under-withholding — wiping out the per-quarter penalty risk. Take your projected shortfall, divide it by the paychecks you have left (usually 1-2 in late December), and enter that on line 4(c). The dedicated post on extra W-4 withholding for RSUs walks through the exact steps by payroll system (Workday, ADP, Rippling, and so on).',
    },
    { type: 'h3', text: '4. Check your ESPP holding periods' },
    {
      type: 'p',
      text:
        'For each ESPP batch you bought in earlier years, work out two dates: 2 years from the offering date AND 1 year from the purchase date. The LATER of those is when the batch qualifies for the better tax treatment. If you are thinking about selling, that date decides whether your gain gets the favorable split or whether the whole discount is taxed as regular income. The ESPP qualifying-vs-disqualifying post has the full math.',
    },
    { type: 'h3', text: '5. Estimate AMT on any ISO buys this year' },
    {
      type: 'p',
      text:
        'For ISOs you bought this year (or are about to buy before December 31), work out your discount: (share value when you bought − your buy price) × shares. That amount counts toward the AMT — added to your AMT income, not your regular income. Run the ISO/AMT calculator with your full-year income to estimate the AMT due. That cash bill can be bigger than the regular income tax on your wages.',
    },
    { type: 'h3', text: '6. Line up your 1099-B cost-basis fix for any RSUs you sold' },
    {
      type: 'p',
      text:
        'For any RSU shares you sold this year, your broker will send a 1099-B in January reporting the sale. Most brokers list your cost as $0 — which would tax the vested value twice. You will fix it on Form 8949 column (g): your real cost is the vest-day value. December is a good time to make sure your broker can give you the per-batch vest-day values you will need. See the how-to-report-RSU-tax-return post.',
    },
    { type: 'h3', text: '7. Max out 401(k) and HSA before year-end' },
    {
      type: 'p',
      text:
        'Pre-tax 401(k) and HSA contributions cut your taxable wages dollar-for-dollar — directly lowering the tax on your next dollar of bonus-style income. 2026 limits (projected): $24,000 401(k) plus $8,000 catch-up at 50+; $4,400/$8,750 HSA self/family plus $1,000 catch-up at 55+. If your 401(k) plan allows it, the mega-backdoor Roth can add up to $46,500 more in after-tax money converted to Roth.',
    },
    { type: 'h3', text: '8. Harvest tax losses before December 31' },
    {
      type: 'p',
      text:
        'Selling investments at a loss offsets your gains dollar-for-dollar, plus up to $3,000 of regular income a year. Anything extra carries forward indefinitely. Watch the wash-sale rule — do not rebuy the same investment within 30 days before or after the sale. One caveat: harvesting losses does NOT offset the regular-income part of an RSU vest (only the gain on shares you held and then sold).',
    },
    { type: 'h3', text: '9. Decide on charitable stock gifts' },
    {
      type: 'p',
      text:
        'Donating appreciated stock you have held over a year (instead of selling it and donating the cash) skips the capital-gains tax AND gets you a deduction at the full value — up to 30% of your income for this kind of property. The transfer has to be DONE by December 31 to count this year. Donor-advised funds (Fidelity Charitable, Schwab Charitable, Vanguard) let you bank the deduction now and pick the charities later. Especially handy in a year when a big RSU vest pushed you into a higher bracket.',
    },
    { type: 'h3', text: '10. Sort out state sourcing if you moved' },
    {
      type: 'p',
      text:
        'If you changed states during the vesting period of any RSU that vested this year, the income may get split between states based on where you worked. California and New York are aggressive about grabbing their workday slice even after you move out. Spot any cross-state vests and plan to file a part-year return (Form 540NR for California, IT-203 for New York) plus your new state’s return. See the multi-state RSU sourcing post for California.',
    },
    {
      type: 'callout',
      text:
        'If you do just one thing this December: run the RSU shortfall calculator for your next vest and update W-4 line 4(c). Those two moves alone fix 80% of April surprises and take 15 minutes total.',
    },
    { type: 'h2', text: 'What locks shut at midnight on December 31' },
    {
      type: 'p',
      text:
        'Five kinds of tax moves cannot be done once the year ends:',
    },
    {
      type: 'ul',
      items: [
        '**Charitable stock gifts.** The shares have to actually land in the charity’s brokerage account (not just be started) by December 31 to count this year. Give it 5-10 business days for the transfer.',
        '**Tax-loss harvesting.** The losing sale has to settle by December 31 — so it needs to go through by about December 30 at the latest.',
        '**401(k) and HSA contributions.** 401(k) money has to run through payroll by your last December paycheck. Payroll-based HSA contributions have to be done by year-end too (direct HSA deposits get until April 15).',
        '**ISO timing.** Selling ISO shares before they qualify changes your gain from the good rate to regular income. The window is exactly 2 years from grant + 1 year from buying — so if you can wait one more month, the batch may flip to qualifying.',
        '**Form W-4 line 4(c).** The "counts as paid evenly all year" trick only works for tax withheld during the calendar year. A January update cannot reach back and fix last year.',
      ],
    },
    { type: 'h2', text: 'What you CAN still fix after December 31' },
    {
      type: 'ul',
      items: [
        '**IRA contributions (Traditional or Roth).** Deadline is April 15 of next year — a full extra buffer.',
        '**HSA contributions (if not through payroll).** April 15 deadline for direct deposits to an HSA like Fidelity HSA.',
        '**SEP-IRA / Solo 401(k) (if self-employed).** Up to your extended filing deadline (October 15 with an extension) for a prior-year contribution.',
        '**The 1099-B cost-basis fix on Form 8949.** Done at filing time, not before year-end — but only if you have the per-batch vest-day values.',
        '**Form 2210 Schedule AI (annualized income method).** Filed with your 1040; it can shrink the underpayment penalty on shortfalls that showed up late in the year.',
      ],
    },
    { type: 'h2', text: 'For complex situations — get a CPA before December 31' },
    {
      type: 'p',
      text:
        'Five signs the December window is too tight for a do-it-yourself pass:',
    },
    {
      type: 'ol',
      items: [
        'Total RSU + bonus + NSO + ISO income over $500k for the year.',
        'You bought ISOs this year and the AMT is a real number (over $10k).',
        'You moved states during the vesting period of a big RSU.',
        'A pre-IPO double-trigger lockup expired this year.',
        'Multiple employers in the same year with overlapping equity grants.',
      ],
    },
    {
      type: 'p',
      text:
        'A CPA consult runs $200-500 for the planning chat. For any of the triggers above, the savings or avoided penalties usually pay for it 10x over. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Ten items — fifteen minutes for the easy ones, a CPA call for the hard ones. The single biggest move is updating Form W-4 line 4(c) before your last December paycheck — because withholding counts as paid evenly all year, a December top-up retroactively patches the earlier shortfall with no per-quarter penalty. Charitable stock gifts and tax-loss harvesting are next most urgent, since they lock shut at midnight on December 31. Everything else has more wiggle room — but running this checklist every December is what prevents the April surprise nearly every first-time equity-comp employee runs into.',
    },
    {
      type: 'p',
      text:
        'For the specific math: RSU Tax Shortfall, Bonus Tax Shortfall, ISO/AMT, NSO Exercise, ESPP Qualifying Disposition, AMT Credit Recovery, Quarterly Estimated Tax — every calculator on Mathstub runs in your browser, no signup, and your inputs never leave your device. Use the Year-End Tax Quick Checklist PDF (free download on the calculator pages) to print the list and check items off as you go.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §6654 (underpayment of estimated tax); IRC §6654(g)(1) (withholding treated as paid evenly); IRC §56(b)(3) (ISO bargain element as AMT preference); IRC §1211(b) ($3,000 capital loss offset of ordinary income); IRC §1091 (wash sale rule); IRC §170(b)(1)(C) (charitable contribution limits for appreciated property); IRC §423 (ESPP qualifying disposition); IRC §422 (ISO qualifying disposition); IRC §1012 (cost basis); Form 2210 + Schedule AI (Annualized Income Installment Method); Form 8949 (sales of capital assets); IRS Publication 525 (Taxable and Nontaxable Income); IRS Publication 526 (Charitable Contributions); IRS Publication 17 (Your Federal Income Tax).',
    },
  ],
};
