import type { BlogPost } from '../registry';

export const rsusTaxedTwice: BlogPost = {
  slug: 'do-rsus-get-taxed-twice',
  title: 'Do RSUs get taxed twice? The simple answer, with real examples',
  description:
    'Short answer: no. RSUs are taxed once, in two pieces — income tax when they vest, and a smaller gain tax later if the price goes up. The “double tax” scare is almost always one fixable mistake on your broker’s form. Here it is in plain English.',
  datePublished: '2026-05-16',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  presentation: true,
  quickAnswer:
    'No. Each RSU dollar is taxed exactly once. At vest, the fair-market value is taxed as ordinary W-2 income under IRC §83(a). Your cost basis equals that FMV per IRC §1012. At sale, only the appreciation FROM vest TO sale is taxed as capital gain. The "double taxation" panic almost always traces to a Form 1099-B showing $0 cost basis — fix it on Form 8949 column (g).',
  keyPoints: [
    'No, RSUs are not taxed twice — each dollar is taxed once.',
    'Tax #1: when shares vest, their value counts as normal salary income.',
    'Tax #2: when you sell, only the gain since vesting is taxed.',
    'The “double tax” scare is usually a broker mistake: your 1099-B shows a $0 cost basis.',
    'The fix: set your cost basis to the share price on your vest day (Form 8949).',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You got RSUs. They vested, and a big chunk vanished to tax. Then you sold the shares — and it looks like you are getting taxed all over again. So you are sitting there thinking: wait, am I paying tax twice on the same money?',
    },
    {
      type: 'p',
      text:
        'It is the most common RSU question online. The answer is no — you are not being taxed twice. But it sure can look that way, and there is one common mistake that can turn the myth into a real, expensive problem. Here is the whole thing in plain English.',
    },
    { type: 'h2', text: 'The simple way to picture it' },
    {
      type: 'p',
      text:
        'Think of your shares walking through two doors. Each door has its own toll. The two tolls are for different things — you are not paying the same toll twice.',
    },
    {
      type: 'ol',
      items: [
        '**Door 1 — the shares land in your account (this is called "vesting").** The day they vest, they are worth something. The IRS treats that value just like salary, so you pay regular income tax on it. Your employer usually grabs that tax automatically — often around 30–40% once you add up federal, state, Social Security, and Medicare.',
        '**Door 2 — you sell the shares later.** Now you only pay tax on the *growth* — how much the price went up *after* they vested. If the price never moved, there is no extra tax at all.',
      ],
    },
    {
      type: 'flow',
      caption: 'Two doors, two different tolls',
      steps: [
        { label: 'Door 1: vest', value: 'Tax the value' },
        { label: 'Door 2: sell', value: 'Tax only the growth', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'That is the whole rule. Door 1 taxes what the shares were worth when you got them. Door 2 taxes only what they gained after that. No single dollar gets taxed twice.',
    },
    { type: 'h2', text: 'Example 1: you sell right away' },
    {
      type: 'p',
      text:
        'Say 100 shares vest at $50 each. That is $5,000 worth. You sell them the same day, still at $50.',
    },
    {
      type: 'ul',
      items: [
        '**At vesting:** that $5,000 counts as income. At a typical high earner’s rate (32% federal + 9.3% California + 1.45% Medicare), the tax is about **$2,140**.',
        '**At the sale:** the price did not move, so there is no growth. Tax on the sale: **$0**.',
        '**Total: about $2,140** — paid once, because the price never changed. Not double.',
      ],
    },
    { type: 'h2', text: 'Example 2: you hold, and the stock goes up' },
    {
      type: 'p',
      text:
        'Same 100 shares vest at $50 ($5,000). But this time you wait 18 months and sell at $80.',
    },
    {
      type: 'table',
      caption: 'Sell right away vs hold and grow',
      headers: ['', 'Sell same day', 'Hold, sell at $80'],
      rows: [
        ['Tax at vesting', '$2,140', '$2,140'],
        ['Growth after vest', '$0', '$3,000'],
        ['Tax on the sale', '$0', '$840'],
        ['Total tax', '$2,140', '$2,980'],
      ],
    },
    {
      type: 'p',
      text:
        'The first $5,000 was taxed as income. The $3,000 of growth was taxed as a gain. Two different things — never the same dollar twice.',
    },
    { type: 'h2', text: 'So why does it FEEL like double tax?' },
    {
      type: 'analogy',
      text: 'Imagine you buy a $50 toy, then sell it to a friend for $80. You should only owe on the $30 you made. But the receipt machine misprints your buy price as $0 — now it looks like you made the whole $80. You did not get robbed twice; the receipt is just wrong. That misprint is your broker writing "$0" — and you fix it with one number.',
    },
    {
      type: 'p',
      text:
        'Almost always, it comes down to one of these three things:',
    },
    {
      type: 'ol',
      items: [
        '**Your broker reports the wrong number — this is the big one.** When you sell, your broker sends a form called a 1099-B. For RSUs, it often lists your "cost" as **$0**, as if the shares were free. They were not — you already paid income tax on them at vesting. If you leave that $0 in place, your tax software thinks your *entire* sale was profit and taxes all of it. THAT is real double tax. The good news: it is a mistake you can fix.',
        '**Both events land in the same year.** If you vest and sell in the same year, your W-2 looks huge and it feels like the shares got counted twice. They did not — the W-2 has the vesting, the broker form has the sale. They are separate lines.',
        '**The withholding looks scary.** Seeing 30–40% disappear at vesting makes people shout "double tax!" It is not — it is one tax, just held back at a high combined rate.',
      ],
    },
    {
      type: 'callout',
      text:
        'The #1 RSU mistake: leaving that $0 cost on your tax return. If you do, you really will pay tax twice — once at vesting, once when you sell. The fix is one line on a form called Form 8949: change the cost to what the shares were worth on your vest day. Miss it, and you could hand the IRS thousands for no reason.',
    },
    { type: 'h2', text: 'How to check your own taxes in 3 steps' },
    {
      type: 'ol',
      items: [
        '**Find your vest value.** Your December pay stub (or Workday / ADP) lists each "RSU vest." That dollar amount should already be baked into your W-2 wages.',
        '**Check the broker’s cost number.** On your 1099-B, the cost for each RSU sale should equal what the shares were worth on the day they vested. If it says $0, that is the error — fix it on Form 8949.',
        '**Sanity-check the total.** Income tax on the vest, plus a little gain tax on any growth, should roughly equal your total RSU tax for the year. If your bill looks way bigger, the $0-cost mistake is probably hiding in there.',
      ],
    },
    { type: 'h2', text: 'Things that are NOT taxed (good news)' },
    {
      type: 'ul',
      items: [
        '**Getting the grant.** When the company first promises you RSUs, nothing is taxed. The clock has not started.',
        '**Holding shares after they vest.** Just sitting on them? No tax. You only deal with tax again when you sell.',
        '**Moving shares to your own brokerage account.** Same owner, no sale, no tax.',
        '**Donating shares to charity.** Often a tax *win* — you can skip the gain tax entirely. (That is its own post.)',
      ],
    },
    { type: 'h2', text: 'Bottom line' },
    {
      type: 'p',
      text:
        'RSUs are taxed once — just in two pieces. Income tax when they vest, and a smaller gain tax later if the price went up. The "I am being double-taxed!" panic is almost always that $0 cost on the broker form. Fix that one number and everything lines up.',
    },
    {
      type: 'p',
      text:
        'Want to make sure enough tax is being held back so April does not bite? Run your numbers through the RSU Tax Shortfall calculator. It is a lot easier to catch a problem in March than to discover it on April 15.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (RSUs taxed as income at vest); IRC §1012 (your cost basis); Treas. Reg. §1.83-2; IRS Publication 525 (Taxable and Nontaxable Income); IRS Form 8949 instructions (fixing cost basis); IRC §6654 (estimated-tax safe harbor).',
    },
  ],
};
