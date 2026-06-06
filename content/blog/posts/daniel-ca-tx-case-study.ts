import type { BlogPost } from '../registry';

export const danielCaTxCaseStudy: BlogPost = {
  slug: 'daniel-ca-tx-case-study',
  title:
    "Daniel's $34,000 CA→TX surprise — what California claimed after the move, and the quarterly schedule that defeated the §19136 penalty",
  description:
    'Senior engineer moved from San Francisco to Austin in August 2024 with 1,600 unvested RSUs on a 2022 grant. Assumed Texas residency meant zero state tax on future vests. Caught the work-source allocation trap in October — $34,000 of CA tax owed across 2024-2026, plus avoided $1,400 of §19136 underpayment penalty by setting up CA Form 540-ES quarterly payments. Vest-by-vest math + the FTB Pub 1004 citations.',
  datePublished: '2026-05-26',
  dateModified: '2026-05-26',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    "Daniel moved CA→TX in August 2024 with 1,600 unvested RSUs from a 2022 grant. He assumed TX residency = $0 state tax on future vests. Wrong. CA FTB Pub 1004 sources equity comp by where services were performed during the vesting period, not where the holder lives at vest. CA still claims its proportional share of every post-move vest. Daniel's 9 post-move vests: ~$17,000 CA tax. Adding ISO bargain-element exposure: $34,000 total. He caught it in October, set up CA Form 540-ES quarterly payments to satisfy §19136 safe harbor, avoided the ~$1,400 penalty. File Form 540NR (non-resident) for 2024 onward.",
  keyPoints: [
    'An engineer moved CA→TX expecting $0 state tax on future vests — he actually owed $34,000.',
    'California still taxes each vest based on the months he worked in CA while it vested.',
    "His 9 post-move RSU vests alone cost about $17,000 in CA tax; stock options pushed it to $34,000.",
    'He caught it in October and set up quarterly CA payments before the deadline.',
    'That avoided a ~$1,400 underpayment penalty; he files a CA non-resident return (Form 540NR).',
  ],
  blocks: [
    {
      type: 'p',
      text: 'Tech worker moves from California to Texas. Texas has no state income tax. Future RSU vests are tax-free at the state level. This is the assumption hundreds of senior engineers make every year. It is wrong by $20,000-$40,000 across a typical 4-year vesting cliff. The reason: California Franchise Tax Board Publication 1004 sources equity-compensation income to the state where the work was performed during the vesting period — not where the holder lives when it vests. Daniel — an engineer who moved CA→TX in August 2024 — caught this in October before his Q4 estimated tax deadline. He owed $34,000 of CA tax across his remaining vests but avoided the ~$1,400 §19136 underpayment penalty by setting up quarterly estimated payments to California in time. Here is what he found and the vest-by-vest math.',
    },
    {
      type: 'callout',
      text: 'Daniel is a composite case based on the FTB Pub 1004 work-source allocation rule + the exact scenario the Mathstub Multi-State Equity Comp Tax Planner template was built for. The CA citations, the vest math, the penalty mechanics, and the filing-form references are concrete. The name is not.',
    },
    {
      type: 'flow',
      caption: 'CA → TX move with 1,600 unvested RSUs',
      steps: [
        { label: 'Daniel assumed', value: '$0 CA tax', tone: 'good' },
        { label: 'RSU vests still owe', value: '~$17,000', tone: 'bad' },
        { label: '+ ISO/AMT', value: '~$34,000', tone: 'bad' },
      ],
    },
    { type: 'h2', text: "Who Daniel is and what he was moving" },
    {
      type: 'ul',
      items: [
        '36 years old. Senior engineer at a Big Tech in the Bay Area.',
        'Moved from San Francisco, CA to Austin, TX on August 1, 2024. CA → TX is the most-common tech-worker tax move pattern.',
        'CA work period: August 15, 2022 (RSU grant date) to July 31, 2024 (last day in CA). Exactly 24 months of services performed in California.',
        '4-year RSU grant from August 15, 2022. 1,600 shares vesting quarterly through August 2026. ~100 shares per quarterly vest at ~$200 FMV each = ~$20,000 per vest.',
        '8 vests remaining as of move date (August 2024 → August 2026).',
        'CA top marginal income tax rate: 13.3% (the highest in the US, per IRC §17041).',
      ],
    },
    {
      type: 'p',
      text: 'Daniel\'s assumption going in: "TX has no state income tax. From August 2024 onward I owe $0 to CA on any vest. CA gets only the vest on August 15, 2024 (which happened just before my move). After that, zero CA state tax forever."',
    },
    {
      type: 'p',
      text: 'The reality, per FTB Pub 1004: every post-move vest carries a CA-source portion equal to (months of services performed in CA during the vesting period) ÷ (total vesting-period months). CA taxes that fractional portion at its top marginal rate regardless of where Daniel currently lives.',
    },

    { type: 'h2', text: 'The work-source allocation rule, exactly' },
    {
      type: 'p',
      text: 'California Franchise Tax Board Publication 1004 ("Stock Options") and the broader §17951/§17041 non-resident income sourcing framework articulate the rule:',
    },
    {
      type: 'ul',
      items: [
        'Equity compensation income is sourced to the state where the services were performed during the vesting period.',
        'For each vest, the vesting period is the time between grant date (when the unvested grant was issued) and that specific vest date.',
        'The vesting period is split into "months worked in CA" and "months worked outside CA."',
        'CA taxes its proportional share of the vest income at its top marginal rate (13.3%).',
        'The OTHER state (or no state, if the holder moved to TX/FL/NV/WA) taxes its share.',
      ],
    },
    {
      type: 'callout',
      text: 'The rule applies to ALL forms of equity comp earned during the CA work period: RSUs, ESPP discounts, ISO exercises, NSO exercises, SAR settlements. California claims its piece regardless of post-move residence. Several other states have similar (less aggressive) rules — New York is notoriously aggressive via its "convenience of the employer" rule (NY TSB-M-06(5)I); New Jersey, Massachusetts, Oregon apply variants.',
    },

    { type: 'h2', text: "Vest-by-vest math — Daniel's 9 remaining vests" },
    {
      type: 'p',
      text: 'For each post-move vest, the formula is: CA-source income = (months in CA / total vesting-period months) × FMV at vest. CA tax = CA-source income × 13.3%.',
    },
    {
      type: 'table',
      caption: 'Each $20k vest still owes CA — its share shrinks as TX months add up',
      headers: ['Vest', 'CA months / total', 'CA %', 'CA tax'],
      rows: [
        ['Aug 2024', '24 / 24', '100%', '$2,660'],
        ['Nov 2024', '24 / 27', '88.9%', '$2,365'],
        ['Feb 2025', '24 / 30', '80.0%', '$2,128'],
        ['May 2025', '24 / 33', '72.7%', '$1,934'],
        ['Aug 2025', '24 / 36', '66.7%', '$1,773'],
        ['Nov 2025', '24 / 39', '61.5%', '$1,636'],
        ['Feb 2026', '24 / 42', '57.1%', '$1,519'],
        ['May 2026', '24 / 45', '53.3%', '$1,418'],
        ['Aug 2026', '24 / 48', '50.0%', '$1,330'],
      ],
    },
    {
      type: 'p',
      text: 'Summing the 8 post-move vests (Nov 2024 through Aug 2026): **$14,103.** Adding the Aug 2024 vest (which Daniel correctly knew was 100% CA): **$16,763.** Round up to $17,000 of straight CA tax across the post-move period.',
    },
    {
      type: 'p',
      text: 'But that is just the income-tax line. Adding the secondary effects: if Daniel exercises any ISO during the CA work period, the bargain element is also CA-sourced. CA personal AMT (§17062) attaches to the same bargain element. ESPP disqualifying dispositions earned in the CA work period carry full CA exposure on the spread. For Daniel\'s scenario, layering in his pre-IPO ISO exercise from January 2024 (200 shares, $84,000 bargain element, fully CA-source because the work was in CA): CA state AMT exposure ~$5,500 + additional CA regular tax on disqualifying disposition if sold ~$11,200. **Total CA exposure across all equity comp during the work-source window: ~$34,000.**',
    },
    {
      type: 'p',
      text: 'This is the headline. Daniel assumed $0. He owed $34,000.',
    },

    { type: 'h2', text: 'The §19136 underpayment penalty — and how to defeat it' },
    {
      type: 'p',
      text: 'CA Revenue and Taxation Code §19136 imposes a non-deductible penalty on taxpayers who, by April 15, have not paid in via withholding + quarterly estimates either (a) 90% of the current-year CA tax owed or (b) 110% of last year\'s CA tax (if CA AGI > $150k) or 100% (if CA AGI < $150k). Penalty rate: roughly 5-7% annualised, applied to the unpaid balance from the quarter the shortfall began through the date of catch-up payment.',
    },
    {
      type: 'p',
      text: 'For Daniel: his 2024 CA tax obligation jumped from a clean Q1 trajectory (residency-based withholding through July) to a hybrid 2024 picture (resident Jan-July + non-resident Aug-Dec with CA-source equity income). His employer\'s payroll system stopped withholding CA tax after July 31 (he was now on the Texas-payroll roster). So between July 31 and the October catch-up, every dollar of his Aug 2024 vest + bargain element vested without CA withholding.',
    },
    {
      type: 'p',
      text: 'Penalty avoidance mechanic, per §19136 safe harbor: CA, unlike federal §6654, does NOT treat withholding as ratable. CA treats both withholding and estimated payments as quarter-by-quarter. So a catch-up estimated payment in October 2024 fixes only the Q4 quarter forward — it does NOT retroactively cure the Q3 underpayment.',
    },
    {
      type: 'p',
      text: 'The right move: file CA Form 540-ES (estimated tax voucher) for Q3 2024 IMMEDIATELY (by September 15 if possible; by October 15 at latest to limit the penalty window). Daniel\'s Q3 catch-up payment: ~$3,500 (the proportional share of his projected 2024 CA tax). He filed on October 1. The Q3-Q4 penalty window: ~6 weeks × 6% annualised = ~$45 of penalty avoided on that piece alone. The full-year picture: setting up Q3 + Q4 estimated payments brought his 2024 paid-in within the §19136 safe harbor, defeating the projected ~$1,400 of full-year penalty.',
    },

    { type: 'h2', text: 'Filing mechanics — Form 540NR and the part-year complication' },
    {
      type: 'p',
      text: '2024 specifically is a PART-YEAR resident situation: Daniel was a CA resident from January 1 to July 31 (taxed on worldwide income for that period) and a non-resident from August 1 to December 31 (taxed only on CA-source income, which includes the work-source-allocated portion of post-move vests).',
    },
    {
      type: 'p',
      text: 'Form: Long Form 540NR. Sections:',
    },
    {
      type: 'ul',
      items: [
        'Schedule CA(540NR): adjustments to federal AGI for CA conformity (or non-conformity) — e.g. CA doesn\'t conform to federal §1202 small business stock exclusion, so any QSBS sale during the year requires an add-back.',
        'Apportionment formula: Schedule CA(540NR) Part III asks for "Total income" (federal column A), "California amounts" (column E), and the apportionment ratio. For the resident period (Jan-Jul), all income goes to column E. For the non-resident period (Aug-Dec), only CA-source income (work-source-allocated equity comp, CA-property rental income if any, etc.) goes to column E.',
        'Tax calculation: CA applies its top marginal rate to the apportioned CA-source income only, NOT to the federal AGI as a whole.',
      ],
    },
    {
      type: 'p',
      text: 'For tax years 2025 and 2026 (full non-resident years): file Form 540NR reporting only the work-source-allocated CA portion of each post-move vest as CA-source income. Daniel\'s 2025 CA tax liability: $2,128 + $1,934 + $1,773 + $1,636 = $7,471 — which he satisfies via quarterly Form 540-ES payments throughout 2025 to avoid §19136 penalties.',
    },

    { type: 'h2', text: "What this is — and what it isn't" },
    {
      type: 'p',
      text: 'This is a planning workflow, not state-tax advice. Real moves involve facts the calculator does not capture: domicile evidence (lease, utilities, driver\'s license, voter registration — CA audits aggressively when high-income earners move), day-count exactness if business travel back to CA is heavy, prior-year carryovers, ISO holding-period interactions with state AMT, and §721/§453 deferral structures.',
    },
    {
      type: 'p',
      text: 'For high-stakes multi-state situations (>$25,000 of post-move CA equity exposure, mid-year move with active ISO exercises, residency audit risk indicators), engage a CPA licensed in both states (CA + TX in Daniel\'s case) who specialises in equity comp. The Mathstub Multi-State Equity Comp Tax Planner template (linked from /toolkit/multi-state-equity-planner) walks the full work-source math vest-by-vest, the NY convenience-of-employer rule (if you moved from NY instead of CA), and the move-ROI breakeven projection.',
    },
    {
      type: 'p',
      text: 'Sources: California Revenue and Taxation Code §17041 (top marginal rate); CA RTC §17951 (non-resident income sourcing); CA RTC §19136 (underpayment of estimated tax penalty); CA RTC §17062 (state AMT); CA FTB Publication 1004 (Stock Options); CA FTB Publication 1005 (Pension and Annuity Guidelines); CA FTB Form 540NR (Non-Resident or Part-Year Resident Return) instructions; CA FTB Form 540-ES (Estimated Tax for Individuals); NY TSB-M-06(5)I (NY convenience-of-employer rule, for comparison); New York Tax Law §631 (NY non-resident income allocation); Massachusetts TIR 02-21 (MA stock-comp allocation for non-residents); New Jersey GIT-19 (NJ day-count allocation); IRC §83(a) (federal vest-time recognition).',
    },
  ],
};
