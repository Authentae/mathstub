import type { BlogPost } from '../registry';

export const whenToSellRsus: BlogPost = {
  slug: 'when-to-sell-rsus-after-vesting',
  title: 'When can you sell RSUs after vesting? How soon you can sell, and whether you should',
  description:
    'How many days after your RSUs vest can you sell them? Usually the same day — there is no IRS waiting period, only blackout windows and lockups. Then the real question: should you sell at vest or hold for long-term capital gains? The full timing + tax math.',
  datePublished: '2026-05-17',
  dateModified: '2026-06-13',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'For most tech workers, sell at vest. The FMV is already taxed as W-2 income whether you sell or hold, so holding is equivalent to taking a cash bonus and buying $X of your employer\'s stock with it. Holding past 1 year saves ~5-7% in LTCG tax versus ordinary rates, but exposes you to 30-50% single-stock volatility. Default: same-day sale + reinvest in a diversified portfolio.',
  keyPoints: [
    'You can usually sell RSUs the same day they vest — there is no IRS waiting period.',
    'The only real delays: a company blackout window, insider status, or a pre-IPO lockup.',
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
        'Your RSUs vested. The shares are in your brokerage account. Now you have a decision: sell today (same-day sale, sometimes called "sell-to-cover plus immediate sale"), or hold and hope the stock keeps going up. The "obvious" answer most people land on — "hold for long-term capital gains, that\'s cheaper tax!" — is usually wrong once you walk the actual math. Here is the framework.',
    },
    { type: 'h2', text: 'How many days after vesting can you sell? (Usually: the same day)' },
    {
      type: 'p',
      text:
        'First, the question people actually type — "after my RSUs vest, how many days before I can sell them?" For most public-company employees (Amazon, Microsoft, Google, Meta, and the like), the answer is: you can sell as soon as the shares land in your brokerage account, which is the vest date itself or within 1-2 business days while the shares settle. There is no IRS-imposed holding period before you are allowed to sell — tax law lets you sell the very same day. (A same-day sale also means roughly $0 capital gain, because your sale price equals the cost basis set at vest.)',
    },
    {
      type: 'p',
      text:
        'So the only things that can actually delay your sale are company or securities-law restrictions, not the IRS:',
    },
    {
      type: 'ul',
      items: [
        '**Blackout windows.** Most public companies (Amazon included) prohibit employees from trading during the quarterly earnings blackout period. If your vest lands inside a blackout, you sell once the trading window reopens.',
        '**Insider status / material non-public information.** If you are a Section 16 officer or hold MNPI, your sales are restricted; a pre-scheduled 10b5-1 plan is the usual workaround.',
        '**Pre-IPO or IPO lockup.** Private-company RSUs, or shares within a post-IPO lockup, cannot be sold until the lockup expires — a different situation covered in our double-trigger RSU guide.',
        '**Settlement time.** Shares may take 1-2 business days to appear and settle in your brokerage (e.g., Amazon delivers RSUs through Morgan Stanley) before you can place a sell order.',
      ],
    },
    {
      type: 'callout',
      text:
        'Bottom line on timing: at a normal public company, outside a blackout window and without insider information, you can typically sell vested RSUs immediately — same day. There is no tax reason to wait. The real decision is not "when am I allowed to sell" but "should I sell now or hold," which is the rest of this guide.',
    },
    { type: 'h2', text: 'The "free money" mental trap' },
    {
      type: 'p',
      text:
        'When RSUs vest, the FMV is taxed as ordinary income whether you sell or hold. Your cost basis is set to that FMV. Economically, the moment shares hit your account, you have already received a cash bonus equal to the post-tax FMV — the broker just delivered it in the form of stock instead of dollars. Holding the shares is mathematically the same decision as receiving a cash bonus and choosing to buy your employer\'s stock with it.',
    },
    {
      type: 'callout',
      text:
        'Ask yourself: if my employer handed me $50,000 in cash today, would I take that money and buy $50,000 of company stock? If the answer is no, then holding vested RSUs is the same trade you just refused.',
    },
    { type: 'h2', text: 'Case 1 — same-day sale (the default for most people)' },
    {
      type: 'p',
      text:
        'You sell all vested shares the day they vest at the same price they were valued at. The tax outcome:',
    },
    {
      type: 'ul',
      items: [
        'Ordinary income tax on the FMV at vest (already taxed via W-2).',
        'Capital gain on sale = $0 (sale price = cost basis).',
        'No further tax exposure. The cash hits your brokerage account, you can deploy it anywhere.',
      ],
    },
    {
      type: 'p',
      text:
        'This is the cleanest, simplest, lowest-risk path. You convert equity comp into diversified cash. The only "loss" is the upside if the stock rips after vest — which is balanced against the loss you would take if the stock dropped instead.',
    },
    { type: 'h2', text: 'Case 2 — hold for >1 year (the long-term capital gains play)' },
    {
      type: 'p',
      text:
        'You hold the vested shares for at least 366 days, then sell. Any appreciation above the FMV-at-vest gets taxed at long-term capital gains rates (0/15/20% federal, plus state, plus 3.8% NIIT for high earners) instead of ordinary income rates. The tax savings are real but smaller than people imagine.',
    },
    {
      type: 'p',
      text:
        'Example: 100 RSUs vest at $50/share = $5,000 FMV. You hold 18 months and sell at $80/share = $8,000 proceeds. The $3,000 of appreciation is taxed at 15% LTCG + 3.8% NIIT + 9.3% CA = ~$840. If you had instead sold at $80 inside 1 year, the same $3,000 would be taxed at ordinary rates (~35% federal + 9.3% CA = ~$1,330). LTCG saves you $490 on $3,000 of gain — about 6% of the gain itself.',
    },
    {
      type: 'table',
      caption: '100 RSUs vest at $50, later sold at $80 ($3,000 gain)',
      headers: ['', 'Sell within 1 yr', 'Hold >1 yr'],
      rows: [
        ['Rate on the gain', '~44% ordinary', '~28% LTCG'],
        ['Tax on the $3,000 gain', '~$1,330', '~$840'],
        ['You save by holding', '—', '~$490'],
      ],
    },
    {
      type: 'p',
      text:
        'For that $490 of tax savings, you took on 18 months of single-stock concentration risk on $8,000 of exposure. If the stock had dropped 30% in those 18 months — common for tech stocks in a down year — you would have lost $2,400, more than 4× the tax savings you were chasing.',
    },
    {
      type: 'flow',
      caption: 'The trade you’re actually making',
      steps: [
        { label: 'LTCG tax saved', value: '$490', tone: 'good' },
        { label: 'If the stock drops 30%', value: '−$2,400', tone: 'bad' },
      ],
    },
    { type: 'h2', text: 'The concentration-risk math' },
    {
      type: 'p',
      text:
        'Individual stocks have annualized volatility around 30-50%. The S&P 500 has annualized volatility around 15-18%. Holding a single stock instead of selling and reinvesting in an index fund means you accept roughly 2-3× the volatility for the same expected return. That is a worse risk-adjusted trade.',
    },
    {
      type: 'p',
      text:
        'If your employer-stock holdings are already >10% of your total net worth (very common for tech workers with vesting RSUs), the rule of thumb from fee-only financial planners is: sell down to 10% or less. Cash from same-day sale, redeployed into a diversified portfolio, beats single-stock LTCG savings in almost every realistic scenario.',
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
        '**You have strong, non-public conviction that the stock is mispriced.** "I work here, the product roadmap is amazing" does not count — that is exactly the bias every employee has. This means real informational edge that you also need to be careful about disclosing under insider-trading rules.',
        '**Your total employer-stock concentration is already low (<5% of net worth).** A small additional position does not move your overall risk much.',
        '**The vest just barely puts you over the 1-year LTCG threshold and the tax savings are large in absolute dollars.** E.g., if you have $500k of appreciation and holding 30 more days flips the entire gain from short-term to long-term, the math may justify the risk.',
      ],
    },
    { type: 'h2', text: 'The "sell at vest, buy index" framework' },
    {
      type: 'p',
      text:
        'The default mental model that wins for most tech workers:',
    },
    {
      type: 'ol',
      items: [
        'At each vest, sell 100% of the shares same-day.',
        'Set aside the projected tax shortfall (use our RSU Tax Shortfall calculator — supplemental withholding usually leaves you short).',
        'Deploy the remaining cash into a diversified portfolio per your written investment plan — broad index funds, bonds, real estate, whatever your allocation calls for.',
        'Repeat at every vest. Do not anchor on the share price.',
      ],
    },
    {
      type: 'p',
      text:
        'This automates away the "should I sell?" question forever. You are no longer making a stock-picking decision every quarter — you are executing a pre-committed plan that captures the equity compensation without the single-stock risk.',
    },
    { type: 'h2', text: 'Edge cases worth knowing' },
    {
      type: 'ul',
      items: [
        'Blackout windows. Many public companies prohibit trading during earnings blackout periods. Plan vest-sales around your company\'s trading calendar, or set up a 10b5-1 plan that pre-schedules sales automatically.',
        'Insider status. If you are a Section 16 officer or have material non-public information, your sale options are restricted. Talk to your General Counsel before transacting.',
        'Highly concentrated single position you cannot easily sell. Some pre-IPO RSUs or executive-level grants have legitimate hold restrictions. Different math applies — discuss with a CPA who knows §83 and §409A.',
        'Carried short-term loss positions you can harvest. If other lots in your account would generate a short-term capital loss on sale, selling vested RSUs at a gain can be offset against those losses, reducing the effective cost of liquidating.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'For most tech workers, the answer is sell at vest, every time, and reinvest the proceeds into a diversified portfolio. The LTCG savings from holding are real but small in absolute terms, and they are almost always swamped by the concentration risk of holding a single volatile stock. The "I\'ll just hold for long-term gains" instinct is a tax-tail-wagging-the-investment-dog problem — you are taking on 30-50% annualized volatility to save 5-7% in tax.',
    },
    {
      type: 'p',
      text:
        'If you are a high-earner with a complex equity-comp picture (mix of RSUs, ISOs, NSOs, ESPP), the same-day-sale-then-reinvest framework is almost always the right default. The exceptions are narrow and you will know if they apply to you. When in doubt, talk to a fee-only fiduciary or a CPA who specializes in equity compensation — not a stockbroker whose incentives push you toward holding.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83 (taxation of property transferred for services); IRC §1(h) (long-term capital gains rates); IRC §1411 (net investment income tax); IRC §1012 (cost basis); SEC Rule 10b5-1 (pre-planned trading); IRS Topic 409 (capital gains and losses); IRS Publication 550 (investment income).',
    },
  ],
};
