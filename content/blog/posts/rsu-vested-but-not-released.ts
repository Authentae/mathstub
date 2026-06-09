import type { BlogPost } from '../registry';

export const rsuVestedNotReleased: BlogPost = {
  slug: 'rsu-vested-but-not-released',
  title: 'RSU vested but not released: what it means (and when you can sell)',
  description:
    '"Vested" means you have earned your RSUs; "released" (also called settled or distributed) means the shares have actually been delivered to your brokerage account. Here is why there is a gap between the two, when you are taxed, and the pre-IPO case where vested shares stay unreleased for years.',
  datePublished: '2026-06-09',
  dateModified: '2026-06-09',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    '"Vested" means you have met the requirement (usually time on the job) to earn the RSUs — they are now yours. "Released" (also called settled or distributed) means the company has actually delivered those shares into your brokerage account, which is the moment you can sell them. For public companies the gap is usually just a few days of settlement processing. For private / pre-IPO companies with double-trigger RSUs, you can be fully vested but unreleased for years, until a liquidity event (IPO or acquisition) triggers delivery. You owe ordinary income tax when the shares are delivered and no longer at risk of forfeiture (FMV that day, reported on your W-2), not on the original grant date.',
  keyPoints: [
    'Vested = you earned the shares. Released = the shares are actually in your account.',
    'For public companies the gap is usually only a few days (settlement processing).',
    'You cannot sell until shares are released AND a trading window is open.',
    'You are taxed when shares are delivered and no longer forfeitable — at that day\'s FMV, on your W-2.',
    'Big exception: private/pre-IPO "double-trigger" RSUs can stay vested-but-unreleased for years.',
    'If you just saw "vested, not released" on your equity portal, it is almost always normal processing.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You log into your equity portal (Schwab, Fidelity, Shareworks, Carta, E*TRADE) and your RSUs say "vested" — but the shares are not in your account yet, and you cannot sell them. The status reads "vested, not released" or "vested, not distributed." This is one of the most common equity-comp confusions, and in the vast majority of cases it is completely normal. Here is exactly what the two words mean and why they are not the same thing.',
    },
    { type: 'h2', text: 'Vested vs released — the difference' },
    {
      type: 'table',
      caption: 'Two different milestones',
      headers: ['', 'Vested', 'Released (settled / distributed)'],
      rows: [
        ['What it means', 'You met the requirement to earn the shares', 'The shares are actually delivered to your brokerage account'],
        ['Triggered by', 'Time worked (and any performance condition)', 'The company processing and settling the vest'],
        ['Can you sell?', 'Not yet', 'Yes — once a trading window is open'],
        ['Typical timing', 'The vest date on your grant schedule', 'Same day to a few business days later (public co.)'],
      ],
    },
    {
      type: 'analogy',
      text:
        'Think of it like a paycheck on payday. "Vested" is your pay being approved — you earned it, it is yours. "Released" is the direct deposit actually landing in your bank account. There is usually a short processing lag between the two, and you cannot spend the money until it lands.',
    },
    { type: 'h2', text: 'Why there is a gap' },
    {
      type: 'p',
      text:
        'For a normal public-company RSU, the gap between vest and release is just operational. A few things cause it:',
    },
    {
      type: 'ul',
      items: [
        'Settlement processing. Payroll has to calculate the income, withhold the tax (usually by selling or holding back shares), and instruct the transfer agent to deliver the rest. This takes a day or several.',
        'Tax withholding mechanics. Sell-to-cover or share-withholding has to execute first, which can add a settlement day (trades settle on a T+1 basis).',
        'Trading blackout windows. Even after release, public-company employees often cannot sell during earnings blackout periods — so "released" does not always mean "sellable today."',
        'Quarterly or batched release schedules. Some companies release vested shares on a fixed cadence rather than the instant each tranche vests.',
      ],
    },
    {
      type: 'callout',
      text:
        'If you are at a public company and just hit a vest date, "vested but not released" almost always resolves itself within a few business days. It is processing, not a problem. Check back after your company\'s stated release window before worrying.',
    },
    { type: 'h2', text: 'When am I taxed — at vest or at release?' },
    {
      type: 'p',
      text:
        'Under IRC §83, RSU value becomes taxable ordinary income when the shares are transferred to you and are no longer subject to a substantial risk of forfeiture — in plain terms, when they are delivered and truly yours to keep. For standard public-company single-trigger RSUs, vesting and release happen so close together that the income is recognized at that point, valued at the fair market value on the delivery date, and reported in Box 1 of your W-2. The tax does not wait for you to sell, and it is not based on the original grant-date price.',
    },
    {
      type: 'flow',
      caption: 'The standard public-company timeline',
      steps: [
        { label: 'Vest date', value: 'earned' },
        { label: 'Release (days later)', value: 'delivered + taxed', tone: 'bad' },
        { label: 'You sell', value: 'when window opens', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'Because the FMV at release is taxed as wages but your employer only withholds federal tax at the flat 22% supplemental rate (37% above $1M of supplemental wages for the year), most equity-comp earners are under-withheld and owe more at filing. That gap is exactly what the RSU Tax Shortfall calculator estimates.',
    },
    {
      type: 'p',
      text:
        'A common follow-up: does it matter that the stock moved between my vest date and the release date? In practice the taxable wage amount is set by the FMV on the delivery date your employer uses for the W-2, so a few days of price movement can slightly change the income figure — but the difference is small because the gap is short. The price that matters far more is the one on the day you eventually sell: any gain or loss from the release-date FMV to the sale price is a separate capital gain or loss, short-term if you sell within a year of release and long-term after. Your cost basis is the FMV that was already taxed as wages, so check your 1099-B does not report $0 basis (a common broker error that double-taxes you).',
    },
    { type: 'h2', text: 'The big exception: double-trigger RSUs (private / pre-IPO)' },
    {
      type: 'p',
      text:
        'At private and pre-IPO companies, RSUs almost always have two vesting conditions — "double-trigger." The first trigger is the normal time-based service condition; the second is a liquidity event (an IPO or acquisition). You can satisfy the time requirement and be "vested" on your schedule, but the shares are NOT released and NOT taxed until the second trigger fires. This is why a startup employee can be fully time-vested for years with shares that still show as unreleased — there is simply no public market and no liquidity event yet.',
    },
    {
      type: 'table',
      caption: 'Single-trigger vs double-trigger',
      headers: ['', 'Public single-trigger', 'Private double-trigger'],
      rows: [
        ['Releases when', 'Shortly after each vest date', 'After IPO/acquisition (the 2nd trigger)'],
        ['Taxed when', 'At release (days after vest)', 'At the liquidity event'],
        ['Vested-but-unreleased gap', 'A few days', 'Months to years'],
      ],
    },
    {
      type: 'p',
      text:
        'When that liquidity event finally hits, a large block of double-trigger RSUs can release and become taxable all at once — often pushing you into the top bracket and creating a big supplemental-withholding shortfall in a single year. If that is your situation, model it with the Double-Trigger RSU calculator before the event so the tax bill is not a surprise.',
    },
    { type: 'h2', text: 'When can I actually sell?' },
    {
      type: 'ol',
      items: [
        'The shares must be released (delivered to your brokerage account).',
        'You must be outside any company trading blackout window.',
        'You must not be restricted by an IPO lock-up period (typically 90–180 days for newly public companies).',
        'If you are an insider (Section 16 officer) or hold material non-public information, additional restrictions apply — check with your General Counsel.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Vested means earned; released means delivered. For public-company RSUs the two are only days apart — "vested but not released" is normal settlement processing, not an error, and you are taxed at release on that day\'s FMV. For private double-trigger RSUs, vested-but-unreleased is the default state for years until an IPO or acquisition, at which point a large taxable release can land all at once. Either way, the taxable event is delivery, not the grant date and not the day you eventually sell — so plan for the withholding gap when the shares finally hit your account.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83 (property transferred in connection with services — income when no longer subject to substantial risk of forfeiture); IRC §83(i) and §409A (timing for private-company equity); IRC §3402(g) and Treas. Reg. §31.3402(g)-1 (22%/37% supplemental withholding); IRS Publication 525 (Taxable and Nontaxable Income). Educational information, not tax advice — confirm specifics with a CPA, especially for pre-IPO double-trigger grants.',
    },
  ],
};
