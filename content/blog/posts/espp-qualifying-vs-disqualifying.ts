import type { BlogPost } from '../registry';

export const esppQualifyingVsDisqualifying: BlogPost = {
  slug: 'espp-qualifying-vs-disqualifying-disposition',
  title: 'ESPP qualifying vs disqualifying disposition: which actually saves you more tax?',
  description:
    'A §423 ESPP gives you a tax break only if you hold the shares long enough for a "qualifying disposition" — at least 2 years from offering date AND 1 year from purchase. Selling earlier triggers a "disqualifying disposition" where the entire discount becomes ordinary W-2 income. The math is not always one-sided — here is the worked comparison.',
  datePublished: '2026-05-19',
  dateModified: '2026-06-10',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'harness-wealth'],
  quickAnswer:
    'Qualifying disposition (hold ≥2 years from offering date AND ≥1 year from purchase): the §423 discount is ordinary income (capped at lesser of offering-date discount OR sale gain), the rest of the gain is long-term capital gain. Disqualifying disposition (sell earlier): the FULL discount at purchase becomes ordinary W-2 income that year, regardless of sale price. Qualifying is usually better for appreciated stock, but the 1-2 year hold introduces real concentration risk that often outweighs the tax saving.',
  keyPoints: [
    'Hold ESPP shares long enough (2 years from offer, 1 from purchase) for the lower-tax "qualifying" sale.',
    'Sell earlier and the whole discount is taxed as regular income — even if the stock dropped.',
    'Holding usually wins on taxes when the stock has gone up a lot past the discount.',
    'Holding also wins if the stock crashed: you skip being taxed on a discount you no longer have.',
    "But holding one stock 1-2 years is risky — that risk often outweighs the tax savings.",
    'On an early (disqualifying) sale the discount lands in your W-2 Box 1 — watch the 1099-B cost-basis trap so you are not taxed on it twice.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Every quarter your ESPP buys shares at a 15% discount — sometimes more thanks to the §423 lookback. The next question is when to sell. The IRS rewards holding with preferential capital-gains treatment (the "qualifying disposition") but the holding period is long: 2 years from offering date AND 1 year from purchase date, whichever ends later. Selling early forfeits the tax break but eliminates the concentration risk of holding a single stock for 12-24 months. This post walks the worked math.',
    },
    { type: 'h2', text: 'The two holding-period requirements' },
    {
      type: 'p',
      text:
        'For a §423 ESPP, a qualifying disposition requires BOTH:',
    },
    {
      type: 'ol',
      items: [
        'At least **2 years from the offering date** (the start of the offering period, usually the first day of a 6-month or 24-month enrollment window).',
        'At least **1 year from the purchase date** (the day shares were actually bought, usually the last day of each 6-month subperiod).',
      ],
    },
    {
      type: 'p',
      text:
        'For a typical 6-month offering with semi-annual purchases, the qualifying date is 2 years from offering — the 2-year rule binds. For a 24-month look-back ESPP, the 1-year-from-purchase rule may bind for later purchases in the offering. Always calculate both and use the LATER date.',
    },
    {
      type: 'callout',
      text:
        '§423 holding period: max(offering_date + 2 years, purchase_date + 1 year). Sell before that and it\'s a disqualifying disposition. Sell on or after that and it\'s qualifying.',
    },
    { type: 'h2', text: 'How each disposition is taxed' },
    {
      type: 'table',
      caption: 'Qualifying vs disqualifying — the tax rules',
      headers: ['', 'Qualifying (held long enough)', 'Disqualifying (sold early)'],
      rows: [
        ['Ordinary income', 'Lesser of the offering-date discount OR the actual gain (so $0 if there’s no gain)', 'The FULL discount at purchase — even if you sold at a loss'],
        ['The rest of the gain', 'Long-term capital gain (0/15/20%)', 'Capital gain or loss (short- or long-term)'],
      ],
    },
    {
      type: 'p',
      text:
        'The favorable piece is the long-term capital-gain portion: LTCG rates (0/15/20%) vs ordinary rates up to 37% — a ~17-point swing at the top. The disqualifying trap is "phantom" income: if the stock crashed you still owe ordinary tax on the original discount even though the shares are now worth less. Bankruptcies have followed.',
    },
    { type: 'h2', text: 'Worked example 1 — stock appreciated 50%' },
    {
      type: 'p',
      text:
        'Your company\'s ESPP has a 15% discount with a 24-month lookback (the favorable design). Offering date: Jan 2024, share price $100. Purchase date: June 2024, share price $120. Purchase price = lesser of (offering × 85%, purchase × 85%) = lesser of $85, $102 = **$85**. You bought 100 shares for $8,500. By Jan 2027 (qualifying date), price is $180.',
    },
    {
      type: 'table',
      caption: '100 shares bought at $85 — two exit timings',
      headers: ['', 'Qualifying (2027 @ $180)', 'Disqualifying (2024 @ $130)'],
      rows: [
        ['Proceeds', '$18,000', '$13,000'],
        ['Ordinary income', '$1,500 (capped discount)', '$3,500 (full discount)'],
        ['Capital gain', '$8,000 long-term', '$1,000 short-term'],
        ['**Total tax**', '**$2,911**', '**$2,003**'],
        ['Pre-tax gain', '$9,500', '$4,500'],
      ],
    },
    {
      type: 'p',
      text:
        'In this scenario the disqualifying disposition costs LESS in total tax ($2,003) than the qualifying disposition ($2,911) — but the disqualifying disposition produced only $4,500 of pre-tax economic gain, vs $9,500 for the qualifying disposition. The qualifying disposition produced $2.2 of after-tax gain for every $1 of disqualifying after-tax gain. Tax savings ranking flips when you account for the share-price appreciation across the holding period.',
    },
    { type: 'h2', text: 'Worked example 2 — stock crashed' },
    {
      type: 'p',
      text:
        'Same ESPP setup. Purchase 100 shares at $85. By June 2025 (still in the 2-year offering window), share price has crashed to $40.',
    },
    {
      type: 'table',
      caption: 'Same shares, stock crashed to $40',
      headers: ['', 'Disqualifying (sell now)', 'Qualifying (hold to 2027)'],
      rows: [
        ['Proceeds', '$4,000', '$4,000'],
        ['Ordinary income', '$3,500 (still owed!)', '$0'],
        ['Capital loss', '−$8,000 short-term', '−$4,500 long-term'],
        ['Current-year tax', 'owe ~$220 net', '~$754 saving'],
      ],
    },
    {
      type: 'p',
      text:
        'When the stock has crashed, qualifying actually wins — the §423 lookback discount converts what would have been ordinary income (in disqualifying) into a capital loss that can be carried forward. Disqualifying disposition on a crashed stock is the worst outcome: you still owe ordinary tax on the original discount, but your shares are now worth less.',
    },
    { type: 'h2', text: 'When qualifying clearly wins' },
    {
      type: 'ul',
      items: [
        'Stock has appreciated significantly past the offering-date discount cap. The gap converts to LTCG instead of ordinary.',
        'Stock has crashed past the purchase price. Qualifying disposition treats the $0 of gain as $0 ordinary income (vs disqualifying which forces you to pay tax on the original embedded discount).',
        'You are in the top federal bracket (37%) AND a high state (CA 13.3%). The rate-spread advantage of LTCG is largest here.',
        'You have other realized losses that year that can absorb the §1211 carryforward.',
      ],
    },
    { type: 'h2', text: 'When disqualifying might win' },
    {
      type: 'ul',
      items: [
        'Stock is treading water near the purchase price. The §423 discount cap doesn\'t free up much LTCG; the timing risk of holding 12-24 months isn\'t worth the modest tax saving.',
        'You expect the share price to fall significantly. Selling early locks in cash; the disqualifying-disposition ordinary-income piece is the inevitable tax bill either way.',
        'You\'re leaving the company and want clean cash exits before any potential RSU/option conflicts.',
        'You need the cash for an immediate non-discretionary expense (down payment, medical, tuition).',
      ],
    },
    { type: 'h2', text: 'The concentration-risk side of the equation' },
    {
      type: 'p',
      text:
        'Tax math aside: holding a single stock for 12-24 months exposes you to 30-50% annualized volatility on a portfolio component that started highly correlated with your salary. If your salary already depends on the company\'s success, doubling down on the same company\'s stock via ESPP holding amplifies correlated risk.',
    },
    {
      type: 'p',
      text:
        'Rule of thumb from fee-only fiduciaries: hold up to 10% of your net worth in company stock total (across RSUs + ESPP + ISOs). Beyond that, the concentration risk outweighs almost any tax saving. ESPP-qualifying-disposition tax savings rarely justify holding $50,000+ in a single stock for 2 years unless your total company-stock exposure is already small.',
    },
    { type: 'h2', text: 'Where the disqualifying income shows up: your W-2 and 1099-B' },
    {
      type: 'p',
      text:
        'A disqualifying disposition creates ordinary income equal to the discount realized at purchase — (FMV on the purchase date − the price you actually paid) × shares. Your employer reports this in two places: it is added to your wages in Box 1 of your W-2 (so it is already taxed as ordinary income through payroll), and it is usually flagged separately in Box 14 with a code like "ESPP" or "DD." You do NOT report that discount again as income — it is already inside Box 1.',
    },
    {
      type: 'callout',
      text:
        'The trap: your brokerage 1099-B almost always reports your cost basis as only the discounted price you PAID — it leaves out the discount that is already taxed in your W-2. File with that basis as-is and you pay tax on the discount twice.',
    },
    {
      type: 'p',
      text:
        'The fix is on Form 8949: adjust your cost basis UP to the fair market value on the purchase date (the price you paid PLUS the ordinary income already in your W-2). Report the sale with code B in column (f) and the basis correction in column (g), or enter the corrected basis directly. Your employer\'s Form 3922 gives the exact figures — offering-date FMV, purchase-date FMV, and price paid — so you can compute both the ordinary-income amount and the corrected basis. This is the ESPP version of the same $0-cost-basis double-tax that catches RSU sellers.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'ESPP qualifying disposition is the better tax outcome when the stock has appreciated past the §423 discount cap — the gap converts ordinary income to long-term capital gain at 15-20 percentage-point lower federal rates. Disqualifying disposition is sometimes cheaper in absolute tax terms but only because the shorter holding period captures less appreciation. The decision is rarely about tax alone — concentration risk usually dominates the math for anyone with > 10% of net worth in company stock.',
    },
    {
      type: 'p',
      text:
        'For your specific situation, plug your offering price, purchase price, expected sale price, and holding period into the ESPP Qualifying Disposition calculator. It splits the tax outcomes side-by-side so you can see the dollar difference under both paths.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §423 (employee stock purchase plan rules); IRC §423(a)(1) (qualifying disposition holding periods); IRC §423(c) (disqualifying disposition treatment); IRC §421(b) (general rules for disqualifying dispositions of statutory options); IRC §1(h) (long-term capital gains rates); IRC §1211(b) ($3,000 capital loss offset of ordinary income); IRC §1411 (NIIT); IRS Publication 525.',
    },
  ],
};
