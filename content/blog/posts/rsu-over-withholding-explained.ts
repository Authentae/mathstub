import type { BlogPost } from '../registry';

export const rsuOverWithholding: BlogPost = {
  slug: 'rsu-over-withholding-explained',
  title: 'Why did my RSUs over-withhold? When 22% is too much',
  description:
    'Not everyone under-withholds on RSUs. If you are in a lower bracket, the flat 22% supplemental rate can take MORE than you owe — locking up your cash until refund season. Here is when that happens.',
  datePublished: '2026-05-28',
  dateModified: '2026-05-28',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier'],
  quickAnswer:
    'Yes, RSUs can over-withhold. Employers withhold federal tax on RSU vesting at the flat 22% supplemental rate (under $1M). If your actual marginal rate is below 22% — common for those earning under about $100,000 — too much tax is withheld, and you get it back as a refund. The fix is adjusting your W-4 or other withholding, not the RSU withholding itself.',
  keyPoints: [
    'RSUs are withheld at a flat 22% federal supplemental rate (under $1M in supplemental wages).',
    'If your marginal rate is below 22%, you over-withhold and get a refund.',
    'This is the opposite of the usual high-earner under-withholding problem.',
    'You cannot change the 22% RSU rate, but you can adjust your regular W-4 withholding.',
    'Over-withholding is an interest-free loan to the IRS until you file.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Most RSU tax advice assumes you are a high earner who has too little tax taken out. But there is a flip side that hits plenty of people: having too much taken out. If your income lands you in a bracket below 22%, the flat rate your employer uses when your RSUs vest can grab more than you actually owe.',
    },
    {
      type: 'p',
      text:
        'It is not a disaster — you get the money back as a refund — but it means the IRS is sitting on your cash, interest-free, for months. Here is when over-withholding happens and what you can (and cannot) do about it.',
    },
    {
      type: 'h2',
      text: 'How RSU withholding actually works',
    },
    {
      type: 'p',
      text:
        'When your RSUs vest, that value counts as "supplemental wages" — basically a bonus on top of your salary. Employers almost always use one flat number: 22% federal on supplemental wages under $1 million in a year. (Anything over $1 million gets withheld at 37%.)',
    },
    {
      type: 'p',
      text:
        'For a high earner whose top rate is 32% or 35%, that 22% is too little — they end up owing at tax time. But if your top rate is 12% or 22%, the math tips the other way, and they take out too much.',
    },
    {
      type: 'h2',
      text: 'When 22% is too much',
    },
    {
      type: 'p',
      text:
        'Say your income puts you in the 12% federal bracket. Your RSUs vest, and your employer withholds 22% — nearly double your real rate. You get the difference back, but only after you file your return.',
    },
    {
      type: 'ul',
      items: [
        'You earn $70,000 in salary, which puts you in the 12% bracket.',
        'You get $10,000 in RSUs that vest during the year.',
        'Your employer withholds 22% — $2,200 — on that RSU income.',
        'Your real rate is 12%, so you actually owe about $1,200.',
        'You over-withheld by roughly **$1,000**, refunded after you file.',
      ],
    },
    {
      type: 'callout',
      text:
        'Over-withholding is not a penalty and not a mistake — the money is yours and you get it all back. But handing the IRS an interest-free loan for up to 16 months is not great if you could be using that cash right now.',
    },
    {
      type: 'h2',
      text: 'What you can and cannot change',
    },
    {
      type: 'p',
      text:
        'Here is the annoying part: you usually cannot tell your employer to withhold less on the RSUs themselves. That flat 22% is the IRS default, and most payroll systems apply it on autopilot.',
    },
    {
      type: 'p',
      text:
        'What you CAN do is dial back your other withholding to balance it out. If RSUs make you over-withhold year after year, you can take less out of your regular paycheck through your W-4 (for example, by claiming dependents or using the deductions worksheet). That pulls your total withholding back down toward what you actually owe.',
    },
    {
      type: 'ol',
      items: [
        'Estimate your total tax for the year, RSU income included.',
        'Add up everything withheld so far — regular paycheck plus RSU withholding.',
        'If you are clearly headed for big over-withholding, adjust your W-4 to take less out of your paycheck.',
        'Check again mid-year so you do not overcorrect and end up under-withholding instead.',
      ],
    },
    {
      type: 'h2',
      text: 'Is it even worth bothering?',
    },
    {
      type: 'p',
      text:
        'For some people, a refund is forced savings they genuinely enjoy. If that is you, there is nothing wrong with letting the over-withholding ride and pocketing the refund. The "interest-free loan to the IRS" complaint only matters if you would actually invest or use that money in the meantime.',
    },
    {
      type: 'p',
      text:
        'But if you are carrying credit card debt or trying to build an emergency fund, that monthly cash could be working for you instead of parked with the IRS. In that case, a W-4 tweak is well worth the ten minutes it takes.',
    },
    {
      type: 'h2',
      text: 'Why your employer cannot just fix it for you',
    },
    {
      type: 'p',
      text:
        'People often ask payroll to "just withhold less" on the RSUs, and get told no. That is not your company being difficult. The flat 22% is a federal rule for supplemental wages, and most big payroll systems are built to apply it automatically, with no per-person dial to turn. Your company is following the IRS default, not picking a number.',
    },
    {
      type: 'p',
      text:
        'The one lever that IS in your control is your regular paycheck. Your W-4 controls how much comes out of your salary, and that is where you make up the difference. Think of it as two buckets feeding the same pot: you cannot shrink the RSU bucket, but you can shrink the salary bucket so the total lands closer to what you actually owe.',
    },
    {
      type: 'h2',
      text: 'A quick gut check before you change anything',
    },
    {
      type: 'p',
      text:
        'Before you touch your W-4, run one rough number: last year, did you get a big refund? If you got back $2,000 or more and you have RSUs, over-withholding is probably the reason. That is your signal that a W-4 tweak could put real money back in each paycheck. If you roughly broke even or owed a little, leave it alone — you are already close to right, and over-correcting could leave you owing next April.',
    },
    {
      type: 'p',
      text:
        'Use the RSU Tax Shortfall calculator to see, in 30 seconds, whether your withholding is running ahead of or behind your real tax. It is the fastest way to know which way to nudge things.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(a) (wage withholding); Treas. Reg. §31.3402(g)-1 (supplemental wage withholding); IRS Publication 15 (Circular E, flat supplemental rates); IRS Form W-4 instructions.',
    },
  ],
};
