import type { BlogPost } from '../registry';

export const esppQualifyingVsDisqualifying: BlogPost = {
  slug: 'espp-qualifying-vs-disqualifying-disposition',
  title: 'ESPP qualifying vs disqualifying disposition: which actually saves you more tax?',
  description:
    'A §423 ESPP gives you a tax break only if you hold the shares long enough for a "qualifying disposition" — at least 2 years from offering date AND 1 year from purchase. Selling earlier triggers a "disqualifying disposition" where the entire discount becomes ordinary W-2 income. The math is not always one-sided — here is the worked comparison.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
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
    { type: 'h2', text: 'Tax math — qualifying disposition' },
    {
      type: 'p',
      text:
        'In a qualifying disposition, the IRS splits the gain into two pieces:',
    },
    {
      type: 'ul',
      items: [
        '**Ordinary income** = LESSER OF (a) the offering-date discount × shares OR (b) the actual gain (sale price − purchase price) × shares. The 15% discount cap protects you when the stock has appreciated way past the cap.',
        '**Long-term capital gain** = sale proceeds − (purchase price + ordinary income recognized). Whatever is left of the gain beyond the ordinary-income piece.',
      ],
    },
    {
      type: 'p',
      text:
        'The favorable tax treatment is the long-term capital-gain portion. LTCG rates are 0/15/20% federal vs ordinary rates of up to 37% — a 17-percentage-point swing at the top bracket. The bigger the appreciation past the discount cap, the more of the gain qualifies for LTCG and the bigger the §423 advantage.',
    },
    { type: 'h2', text: 'Tax math — disqualifying disposition' },
    {
      type: 'p',
      text:
        'In a disqualifying disposition, the IRS treats:',
    },
    {
      type: 'ul',
      items: [
        '**Ordinary income** = (FMV at purchase − purchase price) × shares. The FULL discount at purchase, NOT capped, NOT limited to actual gain. Even if you sell at a loss, you still owe ordinary income on the embedded discount at purchase.',
        '**Capital gain or loss** = sale proceeds − (purchase price + ordinary income recognized). Can be a loss if the share price has dropped since purchase. Short-term if held <1 year past purchase; long-term if held >1 year past purchase but <2 years past offering.',
      ],
    },
    {
      type: 'p',
      text:
        'The trap: disqualifying-disposition ordinary income is "phantom" if the stock has crashed since purchase. You owe tax on the original discount even though the shares are now worth less. Bankruptcies have followed.',
    },
    { type: 'h2', text: 'Worked example 1 — stock appreciated 50%' },
    {
      type: 'p',
      text:
        'Your company\'s ESPP has a 15% discount with a 24-month lookback (the favorable design). Offering date: Jan 2024, share price $100. Purchase date: June 2024, share price $120. Purchase price = lesser of (offering × 85%, purchase × 85%) = lesser of $85, $102 = **$85**. You bought 100 shares for $8,500. By Jan 2027 (qualifying date), price is $180.',
    },
    { type: 'h3', text: 'Qualifying — sold Jan 2027 at $180' },
    {
      type: 'ul',
      items: [
        'Sale proceeds: $18,000. Purchase cost: $8,500.',
        'Ordinary income = min($100 × 15% × 100, $18,000 − $8,500) = min($1,500, $9,500) = **$1,500**.',
        'Long-term capital gain = $18,000 − $8,500 − $1,500 = **$8,000**.',
        'Total tax (35% federal + 9.3% CA on ordinary, 15% fed + 9.3% CA on LTCG, plus 3.8% NIIT on LTCG): ~$663 ordinary + $2,248 LTCG = **$2,911 total**.',
      ],
    },
    { type: 'h3', text: 'Disqualifying — sold Dec 2024 at $130 (6 months after purchase)' },
    {
      type: 'ul',
      items: [
        'Sale proceeds: $13,000. Purchase cost: $8,500.',
        'Ordinary income = (FMV at purchase − purchase price) × shares = ($120 − $85) × 100 = **$3,500**. This is the full discount, NOT capped at the offering-date amount.',
        'Short-term capital gain = $13,000 − $8,500 − $3,500 = **$1,000**.',
        'Total tax (35% federal + 9.3% CA + 1.45% Medicare on ordinary; ordinary rates on STCG): ~$1,560 ordinary + $443 STCG = **$2,003 total**.',
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
    { type: 'h3', text: 'Sell June 2025 at $40 (disqualifying)' },
    {
      type: 'ul',
      items: [
        'Sale proceeds: $4,000. Purchase cost: $8,500.',
        'Ordinary income = ($120 − $85) × 100 = **$3,500** (still owed, regardless of the price crash).',
        'Short-term capital loss = $4,000 − $8,500 − $3,500 = **−$8,000**.',
        'Net tax effect: ordinary tax on $3,500 = ~$1,560; STCG loss can offset other gains and up to $3,000 of ordinary income annually (IRC §1211(b)) = ~$1,340 saving; excess loss carries forward.',
        'Net cash position: you paid $8,500 for shares now worth $4,000, plus owe net ~$220 in current-year tax (after loss offset). Total loss: ~$4,720.',
      ],
    },
    { type: 'h3', text: 'Hold to qualifying date (Jan 2027) at $40 (qualifying)' },
    {
      type: 'ul',
      items: [
        'Sale proceeds: $4,000. Purchase cost: $8,500.',
        'Ordinary income = min($1,500, max(0, $4,000 − $8,500)) = min($1,500, 0) = **$0** (when there\'s no gain, no ordinary income on the discount).',
        'Long-term capital loss = $4,000 − $8,500 − $0 = **−$4,500**.',
        'Net tax effect: ~$754 saving from $3k of LTCL offset; ~$1,500 carries forward.',
        'Net cash position: $4,500 loss, partially offset by $754 tax saving.',
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
