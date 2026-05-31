import type { BlogPost } from '../registry';

export const sellToCoverVsNss: BlogPost = {
  slug: 'sell-to-cover-vs-net-share-settlement-rsu',
  title: 'RSU sell-to-cover vs net share settlement: what is the difference?',
  description:
    'Two ways your employer can withhold taxes on an RSU vest: sell-to-cover (broker sells some of your shares on the open market) or net share settlement / share withholding (employer effectively buys back shares before they hit your account). For you the employee, the net cash and tax outcome is identical. The difference matters for the company and for thinly-traded private-company stock.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Sell-to-cover: when your RSUs vest, the broker sells some of your shares on the open market and remits the cash to the IRS. Net share settlement (NSS / share withholding): the employer retains a portion of the vested shares directly and remits cash from corporate funds to the IRS. From your perspective both produce the same net shares delivered and the same tax withheld — the difference is in the share-flow mechanics and matters mostly to the company. Public companies typically use sell-to-cover; private and pre-IPO companies use NSS.',
  keyPoints: [
    'Both methods do the same job: turn some of your vested shares into cash to pay the tax.',
    'Sell-to-cover: the broker sells a few of your shares on the open market to cover it.',
    'Net share settlement (NSS): your company just keeps some shares and pays the tax with its own cash.',
    'For you, the result is identical — same shares left over, same tax paid.',
    'You usually cannot choose; your employer picks the method for you.',
    'Public companies tend to use sell-to-cover; private or pre-IPO companies use NSS.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'When your RSUs vest, the IRS taxes their full value right away — as regular income, like salary. So someone has to send cash to the government (federal, state, Social Security, Medicare). But RSUs pay you in shares, not cash. So how does the tax get paid? Your employer has to turn some of those shares into cash.',
    },
    {
      type: 'p',
      text:
        'There are two ways to do that: **sell-to-cover** and **net share settlement** (also called share withholding). For you, the result is basically the same either way. For the company, the choice affects share counts, cash, and SEC paperwork. Here is how each one works.',
    },
    { type: 'h2', text: 'Way 1 — sell-to-cover' },
    {
      type: 'p',
      text:
        'With sell-to-cover, your broker (Schwab, Fidelity, E*Trade) handles the tax by actually selling some shares on the open market:',
    },
    {
      type: 'ol',
      items: [
        'On vest day, all your shares briefly land in your brokerage account.',
        'The broker immediately sells just enough of them to cover the tax. They pick the number so that shares sold × the current price equals what you owe (22% federal + state + Medicare + Social Security + extra Medicare).',
        'That cash goes to your employer, who forwards it to the IRS and the state as your withholding.',
        'You keep whatever shares are left over.',
      ],
    },
    {
      type: 'p',
      text:
        'At tax time, that little share-sale shows up on your 1099-B form as a tiny short-term sale — with almost no gain, because what you sold for is basically what the shares were worth when they vested (which is already your cost). Some brokers list it separately, some bundle it. Either way, the tax hit from that sale is essentially zero — the price barely moves between when the shares vest and when the broker sells, usually just pennies a share.',
    },
    { type: 'h2', text: 'Way 2 — net share settlement (NSS), aka share withholding' },
    {
      type: 'p',
      text:
        'With NSS, nothing gets sold on the open market. Instead:',
    },
    {
      type: 'ol',
      items: [
        'On vest day, the company simply keeps some of your shares. They never even reach your brokerage account.',
        'Those kept shares are treated as bought back by the company at the vest-day value — but no money comes out of your pocket. The company uses its own cash to send the tax to the IRS.',
        'You get the leftover shares.',
        'There is no 1099-B for this — nothing was sold, so there is nothing to report.',
      ],
    },
    {
      type: 'p',
      text:
        'As far as the IRS is concerned, the two methods are the same: cash got withheld and put toward your tax bill. The only difference is how the company shuffled the shares behind the scenes.',
    },
    {
      type: 'callout',
      text:
        'For YOU: same shares left over, same tax paid, same final bill. Whether it is sell-to-cover or NSS is the employer’s call, not yours. You almost never get to pick.',
    },
    { type: 'h2', text: 'Which companies use which' },
    {
      type: 'ul',
      items: [
        '**Sell-to-cover:** the usual choice for big public companies whose stock trades easily (Alphabet, Microsoft, Meta, Amazon, Apple, Netflix, NVIDIA). It works because there is a real market to sell the shares into at a predictable price.',
        '**Net share settlement:** the usual choice for private companies, pre-IPO companies, and public companies during blackout periods. NSS does not need a market — the company just never hands the shares out.',
        '**A mix:** some public companies switch to NSS for executive grants under special trading plans, or during the quarterly windows when officers cannot trade.',
      ],
    },
    { type: 'h2', text: 'Why the company cares (and you do not)' },
    {
      type: 'p',
      text:
        'Reasons your employer might prefer one over the other:',
    },
    {
      type: 'ul',
      items: [
        '**Share count.** NSS shrinks the total share count (the kept shares get cancelled). Sell-to-cover does not — those shares just change hands in the market. Companies running buyback programs sometimes like NSS for that built-in buyback effect.',
        '**Insider trading rules.** For company officers and directors, every stock trade gets reported. NSS avoids filing paperwork that would look like an insider selling shares.',
        '**No market exists.** Private companies have no place to sell shares. NSS is the only option until they go public.',
        '**Cash.** Sell-to-cover turns shares into cash through the market, costing the company nothing. NSS makes the company use its own real cash to pay the tax. Cash-strapped companies sometimes pick sell-to-cover to avoid that drain.',
        '**Price wobble.** Between vest day and when the broker actually sells (usually a day or two later), the price can move. Sell-to-cover carries that small risk; NSS does not, because nothing trades.',
      ],
    },
    { type: 'h2', text: 'How to tell which one your employer used' },
    {
      type: 'ol',
      items: [
        '**Look at your 1099-B for a small sale on each vest date.** If you see sales with amounts roughly equal to the tax withheld, that is sell-to-cover. If there are no such sales even though shares vested, that is NSS.',
        '**Check your broker’s "RSU activity" report.** Sell-to-cover shows up as "Sold X shares for tax" or "Cover sale." NSS shows "Shares withheld for tax" with no sale attached.',
        '**Check your paystub.** The "RSU tax offset" line shows up either way (it is just bookkeeping for the share-paid income). It does not tell you which method was used.',
        '**Ask your equity plan admin.** Workday, Carta, Shareworks, and Solium all show the method in the grant details.',
      ],
    },
    { type: 'h2', text: 'What each means at tax time' },
    {
      type: 'p',
      text:
        'For your federal return:',
    },
    {
      type: 'ul',
      items: [
        '**Sell-to-cover** gives you a 1099-B line you have to report on Form 8949 (Part I, Box B). The proceeds roughly equal the tax withheld; your cost is the vest-day value of the shares sold. The gain or loss is tiny. Some tax software does this for you; some makes you type it in. Do not skip it — the IRS sees the 1099-B and expects you to match it.',
        '**Net share settlement** gives you NO 1099-B for the tax withholding. The only thing you report is shares you actually sold yourself later. NSS is simpler at filing time — nothing extra from the withholding step.',
        '**Your leftover shares** have the same cost either way: the vest-day value. If you sell those kept shares later, that is your starting point. The method does not change this — both follow the same tax rules.',
      ],
    },
    { type: 'h2', text: 'Myths worth clearing up' },
    {
      type: 'ul',
      items: [
        '**"NSS means I owe less tax."** Nope. The total tax is identical — income tax + state + Social Security + Medicare on the full vest value.',
        '**"Sell-to-cover means I sold shares, so I owe capital-gains tax."** Basically no. The sale happens at the vest price (your cost), so the gain or loss is tiny — usually nothing worth worrying about.',
        '**"I can pick NSS to keep the sale off my 1099-B."** Almost never. Your employer sets the method; you cannot override it.',
        '**"NSS waters down my ownership less."** That is the company’s concern, not yours. You end up with the same number of shares either way.',
        '**"Sell-to-cover counts as me trading company stock for insider-rule purposes."** Generally no — it is a mechanical tax step, not a real trade you chose to make. But company officers should double-check with their legal team.',
      ],
    },
    { type: 'h2', text: 'When it actually matters more' },
    {
      type: 'p',
      text:
        'A few situations where the method is worth paying attention to:',
    },
    {
      type: 'ol',
      items: [
        '**You are a company officer.** NSS avoids creating an insider-sale filing. Worth confirming with your legal team.',
        '**You are in a quiet period or blackout.** NSS gets around trading limits. Sell-to-cover might not even be allowed during the window.',
        '**You hold restricted (Rule 144) shares.** Sell-to-cover might not count as an exempt mechanical sale and could restart your holding clock. NSS sidesteps that.',
        '**You are tracking AMT from ISO exercises the same year.** Neither method for RSUs creates AMT issues — but worth confirming with a CPA when you are stacking several equity events.',
        '**Pre-IPO valuation swings.** NSS at an early, low valuation can look very different in hindsight if a later funding round reprices the company. The vest-day value still stands.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Sell-to-cover and net share settlement are two different routes to the same place: paying the tax on your RSU vest by turning some shares into cash for the IRS. For you, the leftover shares and the total tax are identical. The choice is the employer’s, and it mostly comes down to SEC paperwork, share counts, and cash on the company side. Public companies usually use sell-to-cover; private and pre-IPO ones use NSS. You almost certainly cannot pick.',
    },
    {
      type: 'p',
      text:
        'To figure out whether that 22% they held back is actually enough to cover your real tax bill (no matter which method was used), run the RSU Tax Shortfall calculator. The method question is separate from the bigger one: will you owe a penalty in April for under-paying?',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (taxation of property transferred for services); IRC §1012 (cost basis); SEC Section 16 reporting rules; SEC Rule 10b5-1 (pre-planned trading); SEC Rule 144 (restricted securities); Treas. Reg. §31.3402(g)-1 (supplemental wage withholding); IRS Publication 525 (Taxable and Nontaxable Income).',
    },
  ],
};
