import type { BlogPost } from '../registry';

export const multiStateRsuSourcingCalifornia: BlogPost = {
  slug: 'multi-state-rsu-sourcing-california',
  title: 'Multi-state RSU sourcing: California workday allocation explained',
  description:
    'Moving in or out of California before an RSU vest does not always escape California tax. The Franchise Tax Board sources RSU income to California based on the percentage of the vesting period you worked there — even if you live elsewhere on vest day. Here is the math, with worked examples for the most common move scenarios.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'California uses "workday allocation" to source RSU income: at each vest, the FTB calculates the percentage of working days during the vesting period that were physically performed in California and applies that fraction to the FMV. If you worked 60% of the vesting period in CA and 40% in TX, CA claims 60% of the vest regardless of where you live on vest day. Same rule applies in reverse for inbound movers. Per FTB Pub 1004; Cal. Code Regs. tit. 18, §17951-4(d).',
  keyPoints: [
    'Moving out of California before a vest does not fully escape California tax.',
    'California taxes based on where you did the work, not where you live at vesting.',
    'The math: CA workdays from grant to vest, divided by your total workdays.',
    'That fraction of the vest is California-source income and gets taxed there.',
    'The rule works in reverse too: moving into CA can lower your CA share.',
    'Track your workdays carefully — California audits this aggressively.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'The most expensive misunderstanding in tech-worker tax planning is the assumption that moving out of California before a vest escapes California tax on that vest. It does not — at least not entirely. California uses a "workday allocation" rule that sources RSU income based on where you worked during the vesting period, not where you live when the shares deliver. For a $200,000 vest from a 4-year grant where you worked 3 years in California and 1 year in Texas, California claims 75% of the income — $150,000 — and taxes it at up to 13.3%.',
    },
    { type: 'h2', text: 'What "sourcing" means' },
    {
      type: 'p',
      text:
        'Every state applies its income tax to wages "sourced to" that state. For regular salary, that\'s simple: you work in a state, that state taxes the wages you earn there. For deferred compensation like RSUs, the question gets harder — the income is earned over a multi-year vesting period that may span multiple states.',
    },
    {
      type: 'p',
      text:
        'Most states have settled on some version of workday allocation: the FMV at vest gets split by the ratio of workdays you spent in each state during the vesting period. California is the most aggressive about enforcement and has the highest rate, so this matters most for movers in and out of California.',
    },
    {
      type: 'callout',
      text:
        'California sources RSU income to CA based on workdays during the vesting period (FTB Pub 1004, Cal. Code Regs. tit. 18, §17951-4(d)) — NOT based on where you live on vest day. Moving the week before a vest does not move the tax bill.',
    },
    { type: 'h2', text: 'Worked example 1 — outbound: CA → TX mid-vest' },
    {
      type: 'p',
      text:
        'You receive a 4-year RSU grant in January 2022 worth 1,000 shares total, vesting 25% per year. You work in California for 3 years (Jan 2022 – Dec 2024), then move to Texas in January 2025 for the final year. In January 2026, the final 250 shares vest at $200/share = $50,000 FMV.',
    },
    {
      type: 'p',
      text:
        'California\'s claim on this final tranche:',
    },
    {
      type: 'ul',
      items: [
        'Vesting period for THIS tranche = Jan 2022 – Jan 2026 (4 years total).',
        'Workdays in CA during the period = ~750 (3 years × 250 days).',
        'Workdays in TX during the period = ~250 (1 year × 250 days).',
        'CA allocation fraction = 750 / 1,000 = 75%.',
        'CA-sourced income = $50,000 × 0.75 = **$37,500**.',
        'CA tax at the 9.3% marginal rate = ~$3,488.',
      ],
    },
    {
      type: 'p',
      text:
        'You owe California $3,488 on a vest that happened entirely while you were a Texas resident. Texas does not tax wages, so the federal supplemental withholding (22% + Medicare + Add\'l Medicare + Social Security if applicable) is the only other tax. Total combined: federal + CA = ~$15,000 on the $50,000 vest.',
    },
    { type: 'h2', text: 'Worked example 2 — inbound: TX → CA mid-vest' },
    {
      type: 'p',
      text:
        'Reverse scenario. You receive a 4-year grant in January 2022 while working in Texas. After 3 years (Dec 2024), you accept a CA-based role and move to San Francisco. The final tranche vests in January 2026 at $50,000 FMV.',
    },
    {
      type: 'ul',
      items: [
        'Vesting period = Jan 2022 – Jan 2026 (4 years).',
        'Workdays in TX = ~750. Workdays in CA = ~250.',
        'CA allocation fraction = 250 / 1,000 = 25%.',
        'CA-sourced income = $50,000 × 0.25 = **$12,500**.',
        'CA tax at the 9.3% rate = ~$1,163.',
      ],
    },
    {
      type: 'p',
      text:
        'Despite living in California when the vest happens, only 25% gets taxed by California (the portion earned while you actually worked there). The rest is Texas-source, which means zero state tax. This is the rare case where moving INTO California before a vest actually helps you, because the bulk of the income was earned elsewhere.',
    },
    { type: 'h2', text: 'How "workdays" actually get counted' },
    {
      type: 'p',
      text:
        'The FTB does not require you to track every day. The default convention is calendar workdays in each state — typically counted as your physical presence Monday-Friday, excluding holidays. For a typical year that\'s ~250 workdays. Travel days count as the state where you spent the most hours that day.',
    },
    {
      type: 'p',
      text:
        'Practical tracking methods (in order of how aggressive the FTB will be about substantiation):',
    },
    {
      type: 'ol',
      items: [
        '**Calendar entries + receipts.** Google Calendar, hotel bookings, flight records can substantiate physical presence. Best for partial-year moves.',
        '**Driver\'s license + voter registration + utility bills.** Establishes domicile in the new state but does not by itself prove workdays.',
        '**Mobile location data.** Some CPAs pull Google Timeline / Apple Significant Locations as supporting documentation for FTB audits.',
        '**Pure pro-rata calendar split.** Simplest method: count calendar months in each state and apply the fraction. Works well when moves are clean and on month boundaries.',
      ],
    },
    { type: 'h2', text: 'Trailing nexus — when CA still claims you after the move' },
    {
      type: 'p',
      text:
        'California has aggressive "trailing nexus" rules: just leaving CA doesn\'t end the state\'s tax claim if you have ongoing ties (real estate, family, registered vehicles, voter registration). If FTB audits and finds you maintained domicile in CA after the physical move, they can claim a higher fraction of the vest.',
    },
    {
      type: 'p',
      text:
        'Strong nexus-breaking actions when moving out of CA:',
    },
    {
      type: 'ul',
      items: [
        'Sell or rent (don\'t leave vacant) any CA real estate.',
        'Register vehicles in the new state.',
        'Get a new state driver\'s license and surrender CA license.',
        'Register to vote in the new state.',
        'Update doctor, dentist, gym to the new state.',
        'Keep CA bank accounts open but make the new-state account your primary.',
        'Spouse and children also move (FTB has caught cases where spouse stayed).',
      ],
    },
    { type: 'h2', text: 'How federal withholding interacts' },
    {
      type: 'p',
      text:
        'Your employer\'s payroll system usually handles federal withholding correctly (22% supplemental) regardless of state. Most payroll systems also auto-source the state withholding based on your current home address on the vest date — which means they may UNDER-withhold California if you\'ve already moved to TX (because they\'re using your TX address). That creates a state-tax shortfall at filing time.',
    },
    {
      type: 'p',
      text:
        'Fix: when you move out of California with unvested RSUs, notify payroll. Some employers will continue withholding California state tax on the workday-allocated fraction; others will not. If payroll won\'t, plan to make a CA estimated tax payment to FTB or face an underpayment situation at filing time.',
    },
    { type: 'h2', text: 'New York and other workday-allocation states' },
    {
      type: 'p',
      text:
        'New York applies similar workday-allocation rules with its own twists:',
    },
    {
      type: 'ul',
      items: [
        'NY uses workdays for state-sourced wages including RSU vests (NY Tax Law §631; NYS TSB-M-86 (1)I).',
        'NYC adds a separate local resident tax based on where you live on vest day, NOT on workday allocation. This can lead to surprising results when you move between NY state and NYC.',
        'NY allows a credit for taxes paid to other states on the same income, partially offsetting double-state taxation.',
        'NJ, MA, OR, and a handful of other high-tax states also apply some form of workday allocation. Specifics vary by state — get a CPA licensed in each affected state.',
      ],
    },
    { type: 'h2', text: 'What to file and when' },
    {
      type: 'p',
      text:
        'If you owe CA tax on workday-allocated RSU income after moving out:',
    },
    {
      type: 'ol',
      items: [
        '**Form 540NR** — California Nonresident or Part-Year Resident Income Tax Return. Files alongside your federal 1040 and your new-state resident return.',
        '**Schedule CA (540NR)** — adjustments separating CA-source from non-CA income.',
        '**Schedule W-2** — show CA-source wages on the line for state wages.',
        'For inbound moves (TX → CA), file Form 540 (full resident) for the year you became a CA resident, but use Schedule CA(540) to back out the pre-move-period RSU portion as non-CA-sourced.',
      ],
    },
    { type: 'h2', text: 'When to talk to a CPA' },
    {
      type: 'ul',
      items: [
        'Any CA-to-no-tax-state move with > $50,000 of unvested RSU value remaining.',
        'Pre-IPO equity where the vest values aren\'t yet known and the workday-allocation fractions matter a lot.',
        'Spouse/family staying behind in CA (FTB residency trap).',
        'ISO exercises stacked with the move (federal AMT + multi-state).',
        'Multiple intermediate states (e.g., CA → WA → TX over 3 years).',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'California sources RSU income based on workdays during the vesting period, not on residency at vest. Moving out before a vest does not zero out the state tax — it only excludes the portion of the vesting period spent in the new state. The math is: CA-sourced income = (CA workdays / total vesting workdays) × FMV at vest. The same rule works in reverse for inbound movers, which is the rare case where moving into CA before a big vest can save state tax.',
    },
    {
      type: 'p',
      text:
        'For projecting the federal piece of an RSU vest after a move (where the state portion is now CA-allocated), use the RSU Tax Shortfall calculator. For state-by-state rate comparisons before deciding where to move, see the State Stock-Comp Lookup. For a CPA-grade analysis on a complex multi-state move, Harness Wealth matches you with equity-comp specialists — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: California FTB Publication 1004 (Stock Options); Cal. Code Regs. tit. 18, §17951-4 (Sourcing of compensation); IRC §83(a) (RSU taxation); NY Tax Law §631; NYS TSB-M-86 (1)I (workday-allocation guidance); IRS Publication 525 (Taxable and Nontaxable Income); FTB Form 540NR instructions; FTB Schedule CA (540NR) instructions.',
    },
  ],
};
