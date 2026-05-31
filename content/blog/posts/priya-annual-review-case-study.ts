import type { BlogPost } from '../registry';

export const priyaAnnualReviewCaseStudy: BlogPost = {
  slug: 'priya-annual-review-case-study',
  title: 'How Priya saved $11,300 with a year-end equity comp review',
  description:
    'A step-by-step case study: how one senior engineer used a systematic year-end review of her RSUs, ESPP, and withholding to find $11,300 in tax savings before December 31.',
  datePublished: '2026-05-25',
  dateModified: '2026-05-25',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier'],
  quickAnswer:
    'A year-end equity comp review can surface thousands in tax savings. This case study follows Priya, a senior engineer earning $240,000 base plus RSUs, as she identifies $11,300 in savings through estimated-tax timing, ESPP qualifying-disposition planning, charitable bunching, and AMT-aware ISO exercise timing.',
  keyPoints: [
    'A systematic year-end review caught four separate tax-saving opportunities.',
    'Estimated-tax true-up avoided a $2,100 underpayment penalty.',
    'Holding ESPP shares to a qualifying disposition saved $3,400.',
    'Charitable bunching of appreciated stock saved $4,200.',
    'AMT-aware ISO timing deferred $1,600 in unnecessary AMT.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Priya is a senior software engineer at a public tech company in the Bay Area. She makes $240,000 in base salary, gets about $180,000 a year in RSUs, buys shares through her company ESPP, and still holds some ISOs from an old startup job. By any normal measure, she is doing great. But she was quietly handing the IRS thousands of extra dollars every year — simply because she treated taxes as an April thing instead of a December thing.',
    },
    {
      type: 'p',
      text:
        'This is the story of how one sit-down — the kind of year-end review our Year-End Tax Playbook walks you through — turned up $11,300 in savings in a single afternoon. The numbers here are made up to illustrate, but every move is real and open to anyone with equity pay.',
    },
    {
      type: 'h2',
      text: 'Why doing this in December matters',
    },
    {
      type: 'p',
      text:
        'Most people only think about taxes when they file in April. The catch: by April, the year is over and almost every lever you could have pulled is locked. The real window to change your tax bill slams shut on December 31. So Priya blocked off two hours in early December to walk through her equity pay on purpose.',
    },
    {
      type: 'p',
      text:
        'Her method was dead simple. List every kind of equity pay, check how each one is taxed, and ask one question: "Is there a move here that lowers what I pay over my lifetime?" Here is what she turned up.',
    },
    {
      type: 'h2',
      text: '1. Fixing her withholding: $2,100 saved',
    },
    {
      type: 'p',
      text:
        'Priya\'s RSUs get tax withheld at the IRS flat rate of 22%. But her real top rate is 35% (the 32% federal bracket plus state). That gap meant her RSU withholding was running about $18,000 short for the year — and she had no clue.',
    },
    {
      type: 'p',
      text:
        'If she had left it alone, that shortfall would have triggered an underpayment penalty under IRC §6654 — about $2,100 at today\'s interest rates. By spotting it in December, she made a fourth-quarter estimated payment to cover the gap and dodged the penalty completely.',
    },
    {
      type: 'callout',
      text:
        'The IRS 22% flat rate almost never matches what a high earner actually owes. If you have real RSU income and you do not check your withholding, odds are you are racking up a penalty without even knowing it.',
    },
    {
      type: 'h2',
      text: '2. Holding her ESPP shares longer: $3,400 saved',
    },
    {
      type: 'p',
      text:
        'Priya had been selling her ESPP shares the moment she bought them. That is called a disqualifying disposition, and it turns the entire discount into regular income — the same high rate as her salary. If she instead held the shares long enough to hit the qualifying window (more than two years from grant, more than one year from purchase), a big piece of her gain would shift from those high regular rates down to the lower long-term capital gains rate.',
    },
    {
      type: 'p',
      text:
        'On her $25,000 a year of ESPP buys, holding for the qualifying window saved about $3,400 a year in tax — just from waiting longer to sell.',
    },
    {
      type: 'h2',
      text: '3. Bunching her charity giving: $4,200 saved',
    },
    {
      type: 'p',
      text:
        'Priya gives about $10,000 a year to charity. By "bunching" — squeezing two years of giving into one, and donating appreciated RSU shares instead of cash — she scored two wins at once. She cleared the higher standard deduction threshold in the year she bunched, and she completely skipped the capital gains tax she would have owed on those appreciated shares.',
    },
    {
      type: 'p',
      text:
        'Put together, the federal and state benefit came to about $4,200 over the two-year cycle, compared with giving cash and taking the standard deduction every year.',
    },
    {
      type: 'h2',
      text: '4. Timing her ISO exercise around AMT: $1,600 saved',
    },
    {
      type: 'p',
      text:
        'Priya still holds ISOs from her old startup. When you exercise ISOs, the bargain element (the built-in gain) can trigger the alternative minimum tax, or AMT. She was about to exercise a block in December that would have shoved her right into AMT.',
    },
    {
      type: 'p',
      text:
        'So she split the exercise across two calendar years — some in late December, the rest in early January. That kept her under the AMT tripping point in both years, pushing off about $1,600 in AMT she would otherwise have paid.',
    },
    {
      type: 'h2',
      text: 'The grand total: $11,300 in one sitting',
    },
    {
      type: 'ul',
      items: [
        'Fixing her withholding: $2,100',
        'Holding ESPP shares longer: $3,400',
        'Bunching her charity giving: $4,200',
        'Timing her ISO exercise: $1,600',
        '**Total: $11,300**',
      ],
    },
    {
      type: 'p',
      text:
        'None of this needed fancy tricks or risky moves. It all came from one focused review before the December 31 deadline. The Year-End Tax Playbook turns this exact process into a checklist you can run every single year.',
    },
    {
      type: 'h2',
      text: 'How to run your own version of Priya’s review',
    },
    {
      type: 'p',
      text:
        'You do not need Priya’s exact situation to get value from the same routine. Block about 90 minutes in late October or November — early enough that the December 31 deadlines are still reachable — and walk four questions:',
    },
    {
      type: 'ul',
      items: [
        '**Is my withholding on track?** Add up what you have paid in versus what you will owe, RSUs and bonuses included. A gap caught now is fixable; the same gap in April is a penalty.',
        '**Am I leaving Roth space unused?** Check whether your 401(k) allows after-tax contributions and conversions — that is the mega-backdoor room most people never claim.',
        '**Do I have AMT from ISOs to recover?** If you paid AMT in a past year, some of it comes back to you as a credit. Make sure you actually claim it.',
        '**Is too much of my net worth in one stock?** Decide your concentration limit before a vest, not after the price has already moved.',
      ],
    },
    {
      type: 'p',
      text:
        'None of this needs a CPA to begin — it just needs you sitting down before the year closes. The calculators on this site cover each of these four questions if you want to put real numbers behind them.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §6654 (estimated-tax underpayment penalty); IRC §423 (ESPP qualifying dispositions); IRC §170 (charitable contribution deductions); IRC §55 (alternative minimum tax); IRC §56 (AMT adjustments).',
    },
  ],
};
