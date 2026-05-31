import type { BlogPost } from '../registry';

export const whenToSellRsus: BlogPost = {
  slug: 'when-to-sell-rsus-after-vesting',
  title: 'When should I sell RSUs after vesting? The tax math behind same-day sale vs hold',
  description:
    'Sell at vest or hold for long-term capital gains? Walk the actual numbers — concentration risk, the 1-year LTCG clock, the cash-flow math, and the cases where holding genuinely beats selling.',
  datePublished: '2026-05-17',
  dateModified: '2026-05-17',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'For most tech workers, sell at vest. The FMV is already taxed as W-2 income whether you sell or hold, so holding is equivalent to taking a cash bonus and buying $X of your employer\'s stock with it. Holding past 1 year saves ~5-7% in LTCG tax versus ordinary rates, but exposes you to 30-50% single-stock volatility. Default: same-day sale + reinvest in a diversified portfolio.',
  keyPoints: [
    'For most people, the smart move is to sell RSUs the day they vest.',
    'You pay the same income tax whether you sell now or keep the shares.',
    'Holding the shares is like taking cash and buying your own company stock with it.',
    'Waiting over a year saves only about 5-7% in tax on any growth.',
    'But one stock can swing 30-50% in a year — far more than that tax saving.',
    'Default plan: sell at vest, set aside the tax, and reinvest in a mix of funds.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Your RSUs vested. The shares are sitting in your brokerage account. Now you have to decide: sell today, or hold and hope the stock keeps climbing? Most people land on "hold for long-term capital gains — that is cheaper tax!" And most people are wrong, once you actually run the numbers. Here is how to think about it.',
    },
    { type: 'h2', text: 'The "free money" trap' },
    {
      type: 'p',
      text:
        'When RSUs vest, their value is taxed as regular income whether you sell or hold — that part is already done. Your cost (what you already paid tax on) is set to that value. So the moment the shares hit your account, you have basically already received a cash bonus equal to the after-tax value — the broker just handed it to you as stock instead of dollars. Holding those shares is exactly the same choice as getting a cash bonus and using it to buy your own company’s stock.',
    },
    {
      type: 'callout',
      text:
        'Ask yourself this: if my employer handed me $50,000 in cash today, would I turn around and buy $50,000 of company stock with it? If the answer is no, then holding your vested RSUs is the same trade you just turned down.',
    },
    { type: 'h2', text: 'Option 1 — sell the same day (the default for most people)' },
    {
      type: 'p',
      text:
        'You sell all the vested shares the day they vest, at the same price they were valued at. The tax result:',
    },
    {
      type: 'ul',
      items: [
        'Regular income tax on the vest value (already handled through your W-2).',
        'Capital gain on the sale = $0 (sale price equals your cost).',
        'No more tax to deal with. The cash lands in your account, and you can put it anywhere.',
      ],
    },
    {
      type: 'p',
      text:
        'This is the cleanest, simplest, lowest-risk path. You swap company stock for diversified cash. The only thing you "lose" is the upside if the stock takes off after vest — but that is balanced against the loss you would eat if it dropped instead.',
    },
    { type: 'h2', text: 'Option 2 — hold for over a year (the long-term gains play)' },
    {
      type: 'p',
      text:
        'You hold the shares at least 366 days, then sell. Any growth above the vest value gets the lower long-term capital-gains rate (0/15/20% federal, plus state, plus 3.8% NIIT for high earners) instead of regular income rates. The tax savings are real — but smaller than people think.',
    },
    {
      type: 'p',
      text:
        'Example: 100 RSUs vest at $50/share = $5,000. You hold 18 months and sell at $80/share = $8,000. The $3,000 of growth is taxed at 15% long-term + 3.8% NIIT + 9.3% CA = ~$840. If instead you had sold at $80 within a year, that same $3,000 would be taxed at regular rates (~35% federal + 9.3% CA = ~$1,330). So holding saved you $490 on $3,000 of gain — about 6% of the gain.',
    },
    {
      type: 'p',
      text:
        'For that $490 of tax savings, you carried 18 months of single-stock risk on $8,000. If the stock had dropped 30% in those 18 months — totally normal for a tech stock in a bad year — you would have lost $2,400. That is more than 4× the tax savings you were chasing.',
    },
    { type: 'h2', text: 'The risk math, plainly' },
    {
      type: 'p',
      text:
        'A single stock typically bounces around 30-50% a year. A broad index like the S&P 500 bounces around 15-18%. So holding one company’s stock instead of selling and buying an index fund means you take on roughly 2-3× the risk for the same expected return. That is a worse deal, plain and simple.',
    },
    {
      type: 'p',
      text:
        'If your company stock is already more than 10% of your total net worth (super common for tech workers with vesting RSUs), the rule of thumb from fee-only planners is: sell down to 10% or less. Cash from a same-day sale, reinvested into a diversified mix, beats single-stock long-term-gains savings in almost every realistic case.',
    },
    { type: 'h2', text: 'When holding actually makes sense' },
    {
      type: 'p',
      text:
        'There are three narrow cases where holding past vest is defensible:',
    },
    {
      type: 'ol',
      items: [
        '**You genuinely know something the market does not.** "I work here and the roadmap looks amazing" does NOT count — that is the exact bias every employee has. This means a real informational edge, which also means being careful about insider-trading rules.',
        '**Your company stock is already a tiny slice of your net worth (under 5%).** A little more does not move your overall risk much.',
        '**The vest barely crosses the 1-year line and the dollar savings are big.** For example, if you have $500k of growth and waiting 30 more days flips the whole thing from short-term to long-term, the math might be worth the risk.',
      ],
    },
    { type: 'h2', text: 'The "sell at vest, buy index" playbook' },
    {
      type: 'p',
      text:
        'The default approach that works for most tech workers:',
    },
    {
      type: 'ol',
      items: [
        'At every vest, sell 100% of the shares the same day.',
        'Set aside the expected tax shortfall (use our RSU Tax Shortfall calculator — the 22% they held back usually leaves you short).',
        'Put the rest into a diversified mix per your written plan — broad index funds, bonds, real estate, whatever your plan calls for.',
        'Repeat at every vest. Do not get attached to the share price.',
      ],
    },
    {
      type: 'p',
      text:
        'This kills the "should I sell?" question forever. You are no longer making a stock-picking bet every quarter — you are just running a plan you decided on ahead of time, capturing the equity pay without the single-stock risk.',
    },
    { type: 'h2', text: 'Edge cases worth knowing' },
    {
      type: 'ul',
      items: [
        'Blackout windows. Lots of public companies block trading during earnings blackout periods. Plan your vest-sales around your company’s trading calendar, or set up a 10b5-1 plan that schedules sales for you automatically.',
        'Insider status. If you are a company officer or you have material non-public information, your selling options are limited. Talk to your legal team before trading.',
        'A concentrated position you cannot easily sell. Some pre-IPO RSUs or executive grants have real hold restrictions. Different math applies — talk to a CPA who knows §83 and §409A.',
        'Loss positions you can use. If other lots in your account would sell at a short-term loss, selling vested RSUs at a gain can be offset against those losses, lowering the real cost of cashing out.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'For most tech workers, the answer is: sell at vest, every time, and reinvest into a diversified mix. The savings from holding for long-term rates are real but small in dollars, and they are almost always swamped by the risk of holding one jumpy stock. The "I will just hold for long-term gains" instinct is a case of the tax tail wagging the investment dog — you are taking on 30-50% yearly swings to save 5-7% in tax.',
    },
    {
      type: 'p',
      text:
        'If you are a high earner with a complex equity picture (a mix of RSUs, ISOs, NSOs, ESPP), the sell-at-vest-then-reinvest playbook is almost always the right default. The exceptions are narrow, and you will know if they apply to you. When in doubt, talk to a fee-only fiduciary or a CPA who specializes in equity comp — not a stockbroker whose paycheck depends on you holding.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83 (taxation of property transferred for services); IRC §1(h) (long-term capital gains rates); IRC §1411 (net investment income tax); IRC §1012 (cost basis); SEC Rule 10b5-1 (pre-planned trading); IRS Topic 409 (capital gains and losses); IRS Publication 550 (investment income).',
    },
  ],
};
