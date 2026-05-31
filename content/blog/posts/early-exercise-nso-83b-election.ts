import type { BlogPost } from '../registry';

export const earlyExerciseNso83b: BlogPost = {
  slug: 'early-exercise-nso-83b-election',
  title: 'Early-Exercising NSOs: the 83(b) election that can save you a fortune',
  description:
    'If your company lets you early-exercise NSOs, an 83(b) election within 30 days can lock in today\'s low spread as your taxable moment — converting future ordinary income into long-term capital gain. Here is the mechanism, the risk, and the worked math.',
  datePublished: '2026-05-18',
  dateModified: '2026-05-18',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Early-exercising NSOs and filing an 83(b) election within 30 days makes the bargain element taxable now — at today\'s (usually tiny) spread — instead of at each vest. This starts your long-term capital-gains holding clock immediately and converts future appreciation from ordinary income into capital gain. The risk: if the shares become worthless or you leave before vesting, you cannot recover the tax you prepaid.',
  keyPoints: [
    'Early exercise + 83(b) lets you pay tax on the spread NOW, while it is small.',
    'It converts future growth from ordinary income into long-term capital gain.',
    'The 83(b) election must be filed within 30 days of exercise — no exceptions.',
    'It starts the 1-year long-term capital-gains clock immediately.',
    'The risk: if you leave or the shares tank, the prepaid tax is gone.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Early exercise plus an 83(b) election is one of the most powerful moves you can make with startup equity — and one of the most misunderstood. Get it right, at the right time, and you can turn a future six-figure income-tax bill into a much smaller capital-gains bill. Get it wrong, or do it at the wrong time, and you have just prepaid tax on shares you might never be able to sell.',
    },
    {
      type: 'p',
      text:
        'The whole thing rests on a quirk in how the tax code treats stock that has not vested yet — plus a 30-day deadline the IRS enforces with zero mercy. Here is exactly how it works.',
    },
    { type: 'h2', text: 'What "early exercise" means' },
    {
      type: 'p',
      text:
        'Normally you can only exercise options as they vest — a little at a time. But some companies, especially young startups, let you buy the ENTIRE grant right away, before any of it has vested. You pay the strike price for all the shares now, even though they are still on the vesting schedule. If you leave before they vest, the company just buys the unvested ones back at what you paid.',
    },
    {
      type: 'p',
      text:
        'So why pay for shares before they vest? Because when you exercise this early — back when the strike price and what the shares are worth are basically the same number — there is almost no taxable gap between them. And that tiny gap is the whole reason the 83(b) election matters.',
    },
    { type: 'h2', text: 'The 83(b) election: pay the tax on the spread now' },
    {
      type: 'p',
      text:
        'Normally, when you exercise an NSO, the "bargain element" — the gap between what the shares are worth and your strike price — gets taxed as regular income at each vest. As the company grows, that gap grows too. So you end up paying regular income tax on a bigger and bigger number every time another batch vests.',
    },
    {
      type: 'p',
      text:
        'The 83(b) election flips that on its head. By filing it within 30 days of early-exercising, you choose to be taxed on the gap NOW — at the moment you exercise — for the whole grant, vested or not. If you exercise the instant the option is granted, what the shares are worth usually equals the strike price, so the gap is basically zero and you owe little or no tax. And from then on, every bit of future growth is taxed as a capital gain instead of regular income.',
    },
    {
      type: 'callout',
      text:
        'The 83(b) election has to be filed with the IRS within 30 days of the day you exercise. No extensions, no late-filing forgiveness, no exceptions. Blow the deadline and the whole benefit is gone — your shares go back to being taxed as regular income at each vest. Mail it certified, return-receipt requested, and keep the proof.',
    },
    { type: 'h2', text: 'The worked math' },
    {
      type: 'p',
      text:
        'Say you have 100,000 NSOs at a $0.10 strike, granted when the shares are also worth $0.10. You early-exercise all of them on day one and file an 83(b).',
    },
    {
      type: 'ul',
      items: [
        'Cost to exercise: 100,000 × $0.10 = $10,000.',
        'The gap at exercise: $0.10 (value) − $0.10 (strike) = $0. Regular income to report: $0.',
        'You file the 83(b) within 30 days — locking in $0 of regular income.',
        'Four years later the company is bought at $20/share. Your 100,000 shares are now worth $2,000,000.',
        'Because you held more than 1 year past exercise, the entire $1,990,000 gain is a long-term capital gain.',
      ],
    },
    {
      type: 'p',
      text:
        'Now compare that to NOT early-exercising: that $1,990,000 of growth would have been taxed as regular income as the shares vested — at up to 37% federal plus state, potentially $800,000+ in tax. As a long-term capital gain (20% federal + 3.8% NIIT), it is roughly $475,000. The 83(b) election saved over $300,000.',
    },
    { type: 'h2', text: 'The risk side (this part is real)' },
    {
      type: 'p',
      text:
        'An 83(b) election is a bet that the company will make it. If it does not, you have prepaid tax and put up exercise money you cannot fully get back:',
    },
    {
      type: 'ul',
      items: [
        'If you leave before vesting, the company buys back your unvested shares at cost — and you lose both the time and any tax you prepaid on the gap.',
        'If the company folds and the shares become worthless, your exercise cost ($10,000 here) is a capital loss — but you can only write off $3,000/year of capital losses against regular income.',
        'If you exercised when the gap was already big, the regular-income tax you prepaid can be a lot — and you do not get it back if the shares later crater.',
      ],
    },
    {
      type: 'callout',
      text:
        'The 83(b) election is at its best when the gap is near zero — usually very early, when the strike price and the share value are about the same. Exercising early when the gap is already large means a real out-of-pocket tax bill today, on money you have not actually cashed in — with no refund if the shares later go to zero. The closer to the grant date, the lower the risk.',
    },
    { type: 'h2', text: 'Who should think about this' },
    {
      type: 'ul',
      items: [
        'Early startup employees whose strike price is still very low and close to the share value.',
        'People who really believe in the company and have the cash to exercise (and cover any small tax) without sweating it.',
        'People who could afford to lose the entire exercise cost if the company fails.',
        'Anyone whose company actually allows early exercise — plenty do not.',
      ],
    },
    {
      type: 'callout',
      text:
        'An 83(b) election cannot be undone, and the 30-day deadline is hard. Before you early-exercise a big grant, confirm the math and the filing with a CPA — the downside of getting it wrong (missing the deadline, or prepaying tax on shares that fail) is brutal. Mathstub matches you with equity-comp specialists via Harness Wealth — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(b) (election to include in gross income in year of transfer); Treas. Reg. §1.83-2 (how and when to make the election); IRC §83(a) (general rule — taxation at vesting absent election); IRC §1222 (long-term capital gain holding period); IRC §1211(b) ($3,000 capital loss limitation); IRS Publication 525 (Taxable and Nontaxable Income).',
    },
  ],
};
