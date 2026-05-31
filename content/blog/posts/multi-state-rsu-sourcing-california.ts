import type { BlogPost } from '../registry';

export const multiStateRsuSourcingCalifornia: BlogPost = {
  slug: 'multi-state-rsu-sourcing-california',
  title: 'Moved out of California with unvested RSUs? You may still owe CA tax',
  description:
    'California taxes the portion of your RSU income you earned while working there — even if you vest the shares years after you leave. Here is how the workday-allocation math works.',
  datePublished: '2026-05-22',
  dateModified: '2026-05-22',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'California taxes RSU income based on the share of workdays you spent in CA between grant and vest. If you were granted RSUs while working in California, then moved away, CA still taxes the portion attributable to your California workdays — even after you become a non-resident. Use the workday-ratio method from FTB Publication 1004.',
  keyPoints: [
    'California sources RSU income using a workday ratio between grant and vest.',
    'Moving away does NOT erase CA tax on the CA-earned portion.',
    'The ratio: CA workdays ÷ total workdays from grant to vest.',
    'You may owe tax in BOTH your new state and California on the same income.',
    'Your new state usually gives a credit for tax paid to California (check rules).',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You did everything right. You landed a job at a California tech company, earned a pile of RSUs, then moved somewhere with no state income tax — Texas, Washington, Nevada. You figured your equity income packed up and left California with you. Sorry: California does not see it that way.',
    },
    {
      type: 'p',
      text:
        'California is famous for chasing equity pay across state lines. If you were given RSUs while working there, the state still wants a cut when those shares vest — even if you now live somewhere else. Here is how the math works, and why you can get a tax bill from a state you no longer call home.',
    },
    {
      type: 'h2',
      text: 'How California decides what slice it gets',
    },
    {
      type: 'p',
      text:
        'California uses something called "workday allocation" to figure out how much of your RSU income belongs to it. The logic is simple: RSUs are pay for sticking around and working over time (the vesting period). So California taxes the part of that period when you were actually working in California.',
    },
    {
      type: 'p',
      text:
        'The formula is just a ratio. Take your California workdays, divide by your total workdays, counted from the day you were granted the RSUs to the day they vest. Multiply your vest value by that ratio. That is the slice California taxes.',
    },
    {
      type: 'h2',
      text: 'A real example',
    },
    {
      type: 'p',
      text:
        'Say you were granted 4,000 RSUs on January 1, 2023, vesting 25% a year over four years. You worked in California for the first two years, then moved to Texas on January 1, 2025.',
    },
    {
      type: 'p',
      text:
        'Now the third chunk vests on January 1, 2026, and you need to work out how much of that $100,000 vest counts as California income. From the grant (Jan 1, 2023) to that vest (Jan 1, 2026) is three years. You worked in California for two of them.',
    },
    {
      type: 'ul',
      items: [
        'Total workdays from grant to vest: roughly 750 (3 years × 250 workdays).',
        'California workdays: roughly 500 (2 years × 250 workdays).',
        'California ratio: 500 ÷ 750 = 66.7%.',
        'California-source income: $100,000 × 66.7% = **$66,700**.',
      ],
    },
    {
      type: 'p',
      text:
        'So even though you are living in Texas when these shares vest, California taxes $66,700 of that $100,000. At a 9.3% California rate, that is roughly $6,200 you owe the state you left.',
    },
    {
      type: 'callout',
      text:
        'This blindsides people all the time. You moved to a no-tax state, but California still mails a bill — because in its eyes the money was "earned" back when you were working there. The vesting day is just when the bill comes due.',
    },
    {
      type: 'h2',
      text: 'Will you get taxed twice?',
    },
    {
      type: 'p',
      text:
        'If your new state has an income tax, you might worry about paying on the same money twice. Good news: most states give you a credit for tax you paid to another state. So if you move from California to, say, Arizona, Arizona usually credits you for the California tax on that RSU income. You do not pay full price twice.',
    },
    {
      type: 'p',
      text:
        'But if you move to a state with no income tax at all (Texas, Washington, Nevada, Florida), there is no credit to claim — because your new state is not taxing you in the first place. You just owe California its share, end of story.',
    },
    {
      type: 'h2',
      text: 'What to do about it',
    },
    {
      type: 'ol',
      items: [
        'Track your workdays. Keep a record of which days you worked in California versus your new state during the vesting period.',
        'Get residency paperwork when you move. It helps prove the date you became a non-resident.',
        'File a California non-resident return (Form 540NR) for any year you have California-source income.',
        'If your new state has an income tax, claim the credit there so you are not taxed twice.',
      ],
    },
    {
      type: 'p',
      text:
        'California reaches hard for equity pay, but the math is predictable once the workday ratio clicks. Run the numbers through our Multi-State Equity Comp calculator to estimate your California-source income and skip the tax-time surprise.',
    },
    {
      type: 'h2',
      text: 'The mistake that makes the bill bigger than it should be',
    },
    {
      type: 'p',
      text:
        'The most expensive error here is the opposite of ignoring California: it is overpaying because you assumed ALL the income was Californian. People who moved away sometimes panic, file as if 100% of the vest is California-source, and hand the state thousands more than they owe. The workday ratio is exactly what protects you from that — it caps California at only the slice you earned while physically working there.',
    },
    {
      type: 'p',
      text:
        'In the example above, that ratio meant California taxed $66,700 of the $100,000, not the whole thing. The other $33,300 was earned after you left, so California has no claim on it. Skip the math and you might overpay on that $33,300 for no reason.',
    },
    {
      type: 'h2',
      text: 'What counts as a "California workday"',
    },
    {
      type: 'p',
      text:
        'A California workday is simply a day you actually worked while physically in California. Weekends, holidays, and vacation days usually are not counted as workdays at all (they drop out of both the top and bottom of the ratio). A day you worked remotely from another state does not count as California, even if your employer is based there. This is why a clean record of where you were on working days is worth keeping — it is the difference between a defensible number and a guess.',
    },
    {
      type: 'p',
      text:
        'Sources: California FTB Publication 1004 (Equity-Based Compensation Guidelines); California Revenue & Taxation Code §17041; FTB workday-allocation method for non-residents; IRC §83(a) (federal RSU taxation at vest).',
    },
  ],
};
