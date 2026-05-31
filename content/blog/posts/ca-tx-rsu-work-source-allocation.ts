import type { BlogPost } from '../registry';

export const caTxRsuWorkSourceAllocation: BlogPost = {
  slug: 'ca-tx-rsu-work-source-allocation',
  title: 'Moved from CA to TX? Your RSUs are still partly California-taxed',
  description:
    'California taxes the portion of your RSU income you earned while working in California — even if you vest after moving to Texas. The allocation is based on workdays between grant and vest. Here is how the CA FTB sources equity comp, with a worked example.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'California taxes RSU income based on the share of workdays you spent in California between grant and vest. Move to Texas partway through the vesting period and California still taxes the CA-workday fraction. The allocation uses the grant-to-vest workday ratio per FTB guidance (Schedule S / FTB Pub 1004). Texas has no income tax, but that does not erase the California-source portion.',
  keyPoints: [
    'California taxes the part of your RSU income you earned while physically working in CA.',
    'The split is based on workdays in CA between grant and vest — not where you live at vest.',
    'Moving to Texas before vest does NOT make the CA-source portion disappear.',
    'You file a CA nonresident return (540NR) for the CA-source slice after you move.',
    'Keep a workday log — the FTB can audit the allocation years later.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You did everything right. You took the Texas job, sold the California house, and waved goodbye to that 13.3% state income tax. Then your RSUs vest — and your tax software (or your old employer\'s payroll) shows that California *still* wants a piece. That is not a glitch. California taxes equity comp based on where you were working when you earned it, not where you live on the day it vests.',
    },
    {
      type: 'p',
      text:
        'This trips up a ton of tech workers who move from the Bay Area to Austin, Seattle, or Miami. The California Franchise Tax Board (the FTB) has a specific, well-documented way of splitting RSU income across state lines, and it all comes down to **workdays**.',
    },
    { type: 'h2', text: 'The rule: it is about where you worked, day by day' },
    {
      type: 'p',
      text:
        'RSUs are pay you earn slowly over time — usually across the stretch between when they are granted and when each batch vests. To figure out California\'s share, the state asks one question: of all the workdays between grant and vest, how many were physically spent in California?',
    },
    {
      type: 'p',
      text:
        'Take that fraction, multiply it by what the vest is worth, and that is your California income. The rest belongs to wherever you worked the other days — Texas, in this case, which has no income tax, so that slice dodges state tax completely.',
    },
    {
      type: 'callout',
      text:
        'The fraction is simply: CA workdays divided by total workdays between grant and vest. This is the FTB\'s documented method in Publication 1004 (Stock Options and Deferred Compensation) and on Schedule S. It is not about where you lived at grant or at vest — it is about where you were physically working while the shares were vesting.',
    },
    { type: 'h2', text: 'A worked example' },
    {
      type: 'p',
      text:
        'Say you were granted 4,000 RSUs on January 1, 2024, vesting 25% a year over 4 years. You worked in California for the first 2 years, then moved to Texas on January 1, 2026. Now look at the third vest, on January 1, 2027 (1,000 shares):',
    },
    {
      type: 'ul',
      items: [
        'This batch of 1,000 shares was earned over the 3 years from grant (Jan 2024) to vest (Jan 2027).',
        'Of those 3 years, you worked 2 in California and 1 in Texas.',
        'California\'s share: 2 out of 3 years = 66.7% (counted in workdays, that is roughly 500 of 750).',
        'If the 1,000 shares vest at $100 = $100,000, then $66,700 is California income and CA taxes it.',
        'The other $33,300 is Texas income — no state tax.',
      ],
    },
    {
      type: 'p',
      text:
        'Even though you were a full Texas resident on the day it vested, California still taxes $66,700 of that $100,000 vest — because you earned that part while working in California. At California\'s top 13.3% rate, that is about $8,871 of California tax on a single vest you might have figured was completely tax-free.',
    },
    { type: 'h2', text: 'Why your workday log is your best friend' },
    {
      type: 'p',
      text:
        'The whole split rides on how many workdays you spent in each state. If you cannot back up your numbers, the FTB gets to fill in the blanks — and they tend to assume *more* California days than you actually worked. A solid workday log is your defense if they ever come asking.',
    },
    {
      type: 'ul',
      items: [
        'Keep a calendar of where you physically worked each day during the vesting period.',
        'Hang onto travel records (flights, hotel receipts) that prove your out-of-state workdays.',
        'Remember: vacation days and weekends usually do not count as workdays — the math uses workdays, not every day on the calendar.',
        'Keep all of this for at least 4 years after the vest — that is how long the FTB has to audit you.',
      ],
    },
    { type: 'h2', text: 'How filing works once you have moved' },
    {
      type: 'p',
      text:
        'For every year you have California RSU income but live somewhere else, you file Form 540NR (California\'s Nonresident or Part-Year Resident Return). You report California\'s slice of each vest as CA income. If your new state has an income tax, it might give you a credit for what you paid California — but Texas has no income tax, so there is no credit to offset it. The California tax is just pure extra.',
    },
    {
      type: 'p',
      text:
        'And this keeps going for years after you move — right up until the last batch you were granted while working in California has fully vested. A 4-year grant from your final California year can mean filing as a California nonresident for 4 or more years to come.',
    },
    { type: 'h2', text: 'When to get help' },
    {
      type: 'ul',
      items: [
        'You moved partway through a vesting period and have several grants with overlapping CA/non-CA workdays.',
        'You have a big vest (over $100k) where the split really moves your tax bill.',
        'You also exercised ISOs or sold ESPP shares around the move — those follow different sourcing rules.',
        'The FTB sent you a notice questioning how you split it.',
      ],
    },
    {
      type: 'callout',
      text:
        'Splitting equity comp across states is one of the most-audited areas for tech workers who relocate. If you have a big California-source vest after moving, a CPA who knows the FTB rules is worth the fee. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: California FTB Publication 1004 (Stock Options and Deferred Compensation); California Schedule S (Other State Tax Credit); California Form 540NR (Nonresident or Part-Year Resident Return); Cal. Code Regs. tit. 18, §17951-5 (sourcing of deferred compensation); R&TC §17041 (nonresident taxation of CA-source income).',
    },
  ],
};
