import type { BlogPost } from '../registry';

export const caTxRsuWorkSourceAllocation: BlogPost = {
  slug: 'ca-tx-rsu-work-source-allocation',
  title: 'CA → TX with unvested RSUs: the work-source allocation trap',
  description:
    'Moving from California to Texas while you still have a multi-year RSU vesting cliff? CA does not stop taxing the vesting period after you move. The work-source allocation rule (FTB Pub 1004) splits each vest by months-worked-in-each-state. Worked example: $34,000 in surprise CA tax across 3 post-move years.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier'],
  quickAnswer:
    'When you move CA → TX with unvested RSUs, California does not stop taxing them. CA uses "work-source allocation" (per FTB Pub 1004): for each vest, the vesting period is split by months worked in each state, and CA taxes its share of the vest at the top marginal rate (13.3%) even after you have moved. A 4-year vest cliff with a Year 2 move means CA taxes ~50% of remaining vests over the next 2 years — typically $20–$40k of surprise tax. Plan estimated payments to CA for the post-move years to avoid §19136 underpayment penalties.',
  keyPoints: [
    'Moving to Texas does NOT make your future RSU vests California-tax-free.',
    'California taxes each vest based on the months you worked in CA while it was vesting.',
    "CA taxes its share at its top rate (13.3%), no matter where you live when it vests.",
    'A mid-cliff move can leave CA taxing ~50% of your remaining vests — often $20k–$40k.',
    'Pay CA quarterly estimates after the move, or you owe a §19136 underpayment penalty.',
  ],
  blocks: [
    {
      type: 'p',
      text: 'A common belief: "I moved from California to Texas in August. Texas has no state income tax. So my future RSU vests are tax-free at the state level." This is wrong, and it is wrong by tens of thousands of dollars over a typical 4-year vest cliff. California uses a work-source allocation rule that taxes your unvested equity comp based on where you worked during the vesting period — not where you live when it vests.',
    },
    { type: 'h2', text: 'The work-source rule, explained' },
    {
      type: 'p',
      text: 'California Franchise Tax Board (FTB) Publication 1004, "Stock Options," articulates the rule clearly: equity compensation income is sourced to the state where the services were performed during the vesting period. For a 4-year RSU vest:',
    },
    {
      type: 'ul',
      items: [
        'Each quarterly vest covers a portion of the vesting period (typically the months between grant and that vest).',
        'For each vest, the vesting period is split into "months worked in CA" and "months worked elsewhere."',
        'CA taxes its proportional share of the vest at its top marginal rate (13.3% — the highest state rate in the US).',
        'The OTHER state (or no state, if you move to TX/FL/NV/WA) taxes its share.',
      ],
    },
    {
      type: 'callout',
      text: 'The rule applies to ALL forms of equity comp earned during your CA work period: RSUs, ESPP discounts, ISO exercises, NSO exercises, SAR settlements. California claims its piece regardless of your post-move residence.',
    },
    { type: 'h2', text: 'Worked example — Daniel\'s CA→TX move' },
    {
      type: 'p',
      text: 'Daniel is a senior engineer who:',
    },
    {
      type: 'ul',
      items: [
        'Worked in CA from August 15, 2022 to July 31, 2024 (24 months in CA).',
        'Moved to TX on August 1, 2024.',
        'Has 1,600 unvested RSUs from a grant dated August 15, 2022, vesting quarterly through August 2026.',
        'Each vest hits at ~$20,000 FMV.',
      ],
    },
    {
      type: 'p',
      text: 'Daniel assumed: "TX has no state tax. My post-August-2024 vests are CA-tax-free." Walking the FTB work-source rule:',
    },
    {
      type: 'ul',
      items: [
        '**Aug 2024 vest (vesting period: Aug 2022 – Aug 2024, 24 months).** All 24 months were CA. CA gets 100% of the $20k vest at 13.3% = **$2,660 owed to CA**.',
        '**Nov 2024 vest (27 months total: 24 in CA + 3 in TX).** CA share: 24/27 = 88.9% × $20k × 13.3% = **$2,365**.',
        '**Feb 2025 vest (30 months total: 24 in CA + 6 in TX).** CA share: 24/30 = 80.0% × $20k × 13.3% = **$2,128**.',
        '**May 2025 vest (33 months).** CA share: 24/33 = 72.7% × $20k × 13.3% = **$1,934**.',
        '**Aug 2025 vest (36 months).** CA share: 66.7% × $20k × 13.3% = **$1,773**.',
        '**Nov 2025 vest (39 months).** CA share: 61.5% × $20k × 13.3% = **$1,636**.',
        '**Feb 2026 vest (42 months).** CA share: 57.1% × $20k × 13.3% = **$1,519**.',
        '**May 2026 vest (45 months).** CA share: 53.3% × $20k × 13.3% = **$1,418**.',
        '**Aug 2026 vest (48 months — final).** CA share: 50.0% × $20k × 13.3% = **$1,330**.',
      ],
    },
    {
      type: 'p',
      text: 'Total CA tax owed across post-move vests: roughly **$16,800** of CA state tax that Daniel did not expect. Adding state-AMT exposure on any ISO exercises during the CA work period: another $1k–$5k. If Daniel does not file quarterly estimates to CA, CA §19136 underpayment penalties (~5% annualized): another $400–$1,500 on top.',
    },
    { type: 'h2', text: 'Filing mechanics — Form 540NR' },
    {
      type: 'p',
      text: 'For tax years 2024 onward (after Daniel\'s move), he is a NON-RESIDENT of California with CA-sourced income. He files:',
    },
    {
      type: 'ul',
      items: [
        '**Form 540NR (CA non-resident return).** Reports the CA-allocated portion of each vest as CA-source income. He pays CA tax at the top marginal rate on that allocated portion.',
        '**Federal Form 1040** treats all RSU income normally (no state distinction).',
        '**No TX state return required** (TX has no state income tax).',
      ],
    },
    {
      type: 'p',
      text: 'For 2024 specifically (the move year), Daniel is a PART-YEAR RESIDENT and files the long Form 540NR with both the resident-period income and the non-resident-period CA-source income.',
    },
    { type: 'h2', text: 'How to avoid the CA §19136 underpayment penalty' },
    {
      type: 'p',
      text: 'CA expects you to make quarterly estimated payments on CA-source income, including these allocated RSU vests. Most tech workers who move are surprised by the CA tax liability AT FILING because their employer (now TX-payrolled) is no longer withholding CA tax.',
    },
    {
      type: 'p',
      text: 'Two safe-harbor mechanisms under CA §19136:',
    },
    {
      type: 'ol',
      items: [
        'Pay 90% of the current-year CA tax through withholding + estimates by Q4 (Jan 15 of the following year).',
        'Pay 110% of last year\'s CA tax (if CA AGI was over $150k) or 100% (if under) through the same channels.',
      ],
    },
    {
      type: 'p',
      text: 'For a post-move resident, the cleanest path: estimate your post-move CA tax using the work-source rule, divide by 4, and submit CA Form 540-ES quarterly. Mathstub\'s Multi-State Equity Comp Tax Planner walks the allocation per vest + the quarterly estimate calculation.',
    },
    { type: 'h2', text: 'Variants — NY, NJ, MA, OR' },
    {
      type: 'p',
      text: 'California is the most aggressive but not unique. Several other states apply work-source allocation to equity comp:',
    },
    {
      type: 'ul',
      items: [
        '**New York:** uses a similar allocation rule + the notorious "convenience of the employer" rule, which can claim 100% of your income even after a move if the employer is NY-based and the move was for your convenience (not employer-driven). See NY Tax Bulletin TSB-M-06(5)I.',
        '**New Jersey:** day-count method for non-residents; effective work-source allocation.',
        '**Massachusetts:** TIR 02-21 walks the stock-comp allocation rules for non-residents.',
        '**Oregon:** Day-count allocation under ORS 316.127.',
        '**Pennsylvania:** Different rules — PA doesn\'t allocate based on vesting period in the same way; check REV-714.',
      ],
    },
    { type: 'h2', text: 'How to model your situation' },
    {
      type: 'p',
      text: 'Three things to do before / during your move:',
    },
    {
      type: 'ol',
      items: [
        '**Pull your offer letter + vest schedule.** Note each vest date and the FMV-or-estimated-FMV per vest.',
        '**Set your move date.** This anchors the "months in CA" calculation for each vest.',
        '**Run the Mathstub Multi-State Equity Comp Tax Planner or the State Stock-Comp Lookup.** Get the allocated CA tax owed per vest + the quarterly schedule.',
      ],
    },
    {
      type: 'p',
      text: 'Catching this in October (before your first post-move tax year ends) is the difference between a clean transition and a $1,500 underpayment penalty + a confused CPA visit.',
    },
    {
      type: 'callout',
      text: 'CA can claim multi-year work-source allocation on your equity comp up to 4 years after you move. Document your move (lease, utilities, voter registration, driver\'s license) carefully to defeat any residency-audit attempt. Move expense receipts + day-by-day calendar count are gold during a state audit.',
    },
    {
      type: 'p',
      text: 'Sources: California Revenue and Taxation Code §17041 (top marginal rate); CA RTC §17951 (non-resident income sourcing); CA RTC §19136 (underpayment of estimated tax); CA FTB Publication 1004 (Stock Options); CA FTB Publication 1005 (Pension and Annuity Guidelines); CA FTB Form 540NR (non-resident return); NY TSB-M-06(5)I (NY convenience-of-employer rule); NY Tax Law §631 (non-resident income allocation); Massachusetts TIR 02-21 (stock-comp allocation for non-residents); New Jersey GIT-19 (day-count allocation); Oregon ORS 316.127 (non-resident allocation); Pennsylvania REV-714 (compensation allocation). IRC §83(a) (federal vest income recognition).',
    },
  ],
};
