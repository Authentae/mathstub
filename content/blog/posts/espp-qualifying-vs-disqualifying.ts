import type { BlogPost } from '../registry';

export const esppQualifyingVsDisqualifying: BlogPost = {
  slug: 'espp-qualifying-vs-disqualifying-disposition',
  title: 'ESPP qualifying vs disqualifying disposition: the holding-period math',
  description:
    'Whether your ESPP sale is a "qualifying" or "disqualifying" disposition changes how much is taxed as ordinary income vs capital gain. The two-part holding test is the key. Here is the rule with worked examples for both outcomes.',
  datePublished: '2026-05-14',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'An ESPP disposition is "qualifying" if you sell at least 2 years after the offering date AND at least 1 year after the purchase date. Qualifying dispositions tax the lesser of the actual gain or the offering-date discount as ordinary income, and the rest as long-term capital gain. Disqualifying dispositions (selling earlier) tax the full purchase-date discount as ordinary income regardless of later price moves.',
  keyPoints: [
    'ESPP sales are "qualifying" or "disqualifying" based on two holding-period tests.',
    'Qualifying needs BOTH: 2 years from offering date AND 1 year from purchase date.',
    'Qualifying dispositions tax less as ordinary income and more as capital gain.',
    'Disqualifying dispositions tax the full discount as ordinary income.',
    'The discount is usually 15% off the lower of two prices (the "lookback").',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'An ESPP (Employee Stock Purchase Plan) lets you buy your company\'s stock at a discount — usually 15% off, and often with a "lookback" that prices off the lower of two prices: the one on the offering date or the one on the purchase date. It is one of the best deals in equity comp. But how much tax you pay when you sell comes down entirely to a two-part timing test that decides whether your sale is "qualifying" or "disqualifying."',
    },
    {
      type: 'p',
      text:
        'The gap between the two can be thousands of dollars on the exact same shares — and it depends on dates, not on how the stock did. Here is the rule, plus the math for each outcome.',
    },
    { type: 'h2', text: 'The two-part timing test' },
    {
      type: 'p',
      text:
        'Your sale only counts as a "qualifying disposition" if BOTH of these are true:',
    },
    {
      type: 'ol',
      items: [
        'At least 2 years have passed since the OFFERING date (the day the purchase period started).',
        'At least 1 year has passed since the PURCHASE date (the day you actually bought the shares).',
      ],
    },
    {
      type: 'p',
      text:
        'Sell before hitting either mark and it is a "disqualifying disposition." Both tests go by the calendar, and there is no partial credit. Miss one by a single day and the whole sale is disqualifying.',
    },
    {
      type: 'callout',
      text:
        'The offering date (sometimes called the grant date or enrollment date) is when the offering period begins — NOT when you bought. The purchase date is when the shares are actually bought, usually every 6 months. The 2-year clock runs from the offering date; the 1-year clock runs from the purchase date. You have to clear both.',
    },
    { type: 'h2', text: 'Disqualifying: the whole discount is regular income' },
    {
      type: 'p',
      text:
        'If you sell before clearing both timing tests, the discount you got at purchase is taxed as regular income — no matter what the stock did afterward. The bargain element (what the shares were worth at purchase minus what you actually paid) becomes regular income and gets added to your W-2. Any gain or loss on top of that, from purchase to sale, is a capital gain or loss.',
    },
    {
      type: 'p',
      text:
        'Worked example. Offering-date price $100, 15% discount, purchase-date price $120. Thanks to the lookback, you buy at 85% of the lower price ($100) = $85/share. You sell soon after buying, at $130:',
    },
    {
      type: 'ul',
      items: [
        'What the shares were worth at purchase: $120. What you paid: $85. The discount: $35/share — taxed as regular income.',
        'Sale price $130 − value at purchase $120 = $10/share short-term capital gain.',
        'On 100 shares: $3,500 regular income + $1,000 short-term gain.',
        'The $3,500 is taxed at your regular rate (could be 32-37%); the $1,000 short-term gain is taxed at that same regular rate too.',
      ],
    },
    { type: 'h2', text: 'Qualifying: less regular income, more capital gain' },
    {
      type: 'p',
      text:
        'If you hold long enough to clear both tests, the tax treatment gets better. The part taxed as regular income is the SMALLER of two numbers: (a) your actual gain, or (b) the discount measured back at the OFFERING date. Everything else is a long-term capital gain, taxed at the lower rate.',
    },
    {
      type: 'p',
      text:
        'Same numbers — offering price $100, 15% discount, purchase price $120, your cost $85 — but now you hold 2+ years from the offering date and 1+ year from purchase, then sell at $130:',
    },
    {
      type: 'ul',
      items: [
        'Regular income = the smaller of: your actual gain ($130 − $85 = $45) OR the offering-date discount (15% of $100 = $15). The smaller is $15/share.',
        'What is left: $130 − $85 − $15 = $30/share, taxed as a long-term capital gain.',
        'On 100 shares: $1,500 regular income + $3,000 long-term capital gain.',
        'Compare that to the disqualifying case: $3,500 regular + $1,000 short. Going qualifying shifts $2,000 from your regular rate down to the lower long-term rate.',
      ],
    },
    {
      type: 'callout',
      text:
        'The regular-income piece of a qualifying sale is based on the OFFERING-date discount (15% of the offering price), which is often a lot smaller than the discount measured at purchase. That is the built-in reason qualifying sales get taxed less as regular income — the regular slice is capped at that offering-date discount.',
    },
    { type: 'h2', text: 'When holding longer is NOT worth it' },
    {
      type: 'p',
      text:
        'The tax savings from a qualifying sale are real, but they are not the only thing to weigh. Sitting on company stock for an extra 1-2 years just to qualify stacks more of your money into one stock and adds market risk. If that stock drops 20% while you wait, the tax savings get wiped out by the loss.',
    },
    {
      type: 'ul',
      items: [
        'Selling right away (disqualifying) locks in the discount as a guaranteed return, even after you pay regular-income tax on it.',
        'Holding for qualifying treatment is a bet that the stock keeps its value over the extra time.',
        'Spreading your money around often matters more than the tax-rate difference — especially if your ESPP is a big chunk of your net worth.',
        'The discount itself (often 15%) is locked in at purchase no matter which type of sale it ends up being — you never lose that part.',
      ],
    },
    {
      type: 'callout',
      text:
        'For most people, the smart ESPP play is simple: contribute the max, sell right away to pocket the guaranteed discount, and spread the cash into other investments. The qualifying-sale tax savings rarely make up for the risk of holding a single stock for years. But if you were planning to hold anyway, qualifying treatment is a nice bonus.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §423 (employee stock purchase plans); IRC §423(a) (holding period requirements for qualifying dispositions); IRC §421(b) (disqualifying disposition treatment); IRC §83 (ordinary income on bargain element); IRS Publication 525 (Taxable and Nontaxable Income); IRS Form 3922 (Transfer of Stock Acquired Through an ESPP).',
    },
  ],
};
