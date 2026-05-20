import type { BlogPost } from '../registry';

export const isoDisqualifyingDisposition: BlogPost = {
  slug: 'iso-disqualifying-disposition-tax',
  title: 'ISO disqualifying disposition: when selling early actually wins',
  description:
    'Selling ISO shares before the §422 qualifying period (2 years from grant, 1 year from exercise) usually feels like a tax mistake — it converts what would have been LTCG into ordinary income. But in two specific scenarios, a disqualifying disposition is actually the right move: the stock has crashed, or you exercised at a high FMV and the price has been flat. Here is the math.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'A disqualifying disposition of ISO shares (sale before 2 years from grant AND 1 year from exercise) reclassifies the bargain element from an AMT preference item back into ordinary W-2 income — and the previously-paid AMT becomes recoverable as a Minimum Tax Credit under IRC §53. Disqualifying is usually worse than qualifying, but two narrow cases reverse it: (1) the stock has crashed since exercise — the disqualifying disposition reduces ordinary income to the actual gain, freeing capital loss; or (2) you exercised at a high FMV and the price has been flat — disqualifying lets you recover AMT immediately instead of waiting years.',
  blocks: [
    {
      type: 'p',
      text:
        'You exercised ISOs a few months ago. You paid the cash, you paid the AMT, you\'re holding the shares. Now the company\'s share price has dropped, or you need the cash, or you\'re considering whether to wait the full qualifying period. The reflex is "always hold for qualifying disposition." That reflex is usually right — but in two specific scenarios, it\'s wrong. This post walks the two cases where a disqualifying disposition is actually the smarter financial move, with worked math.',
    },
    { type: 'h2', text: 'Quick refresher on ISO holding periods' },
    {
      type: 'p',
      text:
        'Under IRC §422, an Incentive Stock Option qualifies for preferential tax treatment if you hold the exercised shares for:',
    },
    {
      type: 'ol',
      items: [
        'At least 2 years from the grant date (when the option was granted), AND',
        'At least 1 year from the exercise date (when you bought the shares with the option).',
      ],
    },
    {
      type: 'p',
      text:
        'Meet both requirements → qualifying disposition. The entire gain (sale proceeds − strike price) is long-term capital gain. The bargain element at exercise remains only an AMT preference item, never ordinary income.',
    },
    {
      type: 'p',
      text:
        'Miss either requirement → disqualifying disposition. The bargain element (FMV at exercise − strike) becomes ordinary W-2 income in the year of sale. Any further gain or loss vs sale proceeds is capital gain/loss (short-term if held <1 year past exercise, long-term if ≥1 year).',
    },
    { type: 'h2', text: 'The standard wisdom — and when it applies' },
    {
      type: 'p',
      text:
        'For a stock that has appreciated significantly past the exercise price and you have AMT capacity for the year, qualifying disposition wins:',
    },
    {
      type: 'ul',
      items: [
        'You already paid AMT in the exercise year; the §53 credit recovers it over future years.',
        'Holding to qualifying = entire gain at 15-20% federal LTCG + 3.8% NIIT.',
        'Disqualifying would reclassify the bargain element as ordinary income at up to 37% federal — a 17-22 percentage-point swing.',
        'For a $200,000 bargain element, that\'s typically $30,000-$45,000 of additional tax to avoid the disqualifying disposition.',
      ],
    },
    {
      type: 'p',
      text:
        'That math holds up to ~95% of the time. The two scenarios that break it:',
    },
    { type: 'h2', text: 'Scenario 1 — the stock crashed since exercise' },
    {
      type: 'p',
      text:
        'You exercised 10,000 ISO shares in March 2025 with strike $5 and FMV $50 at exercise. Bargain element = ($50 − $5) × 10,000 = $450,000. AMT triggered: ~$120,000 paid that year.',
    },
    {
      type: 'p',
      text:
        'By October 2025, the share price has crashed to $15. You want out of the position. Two paths:',
    },
    { type: 'h3', text: 'Path A — hold to qualifying disposition (sell March 2027 at $15)' },
    {
      type: 'ul',
      items: [
        'Sale proceeds: $150,000. Cost basis (strike): $50,000.',
        'Long-term capital gain: $100,000. LTCG tax: $100,000 × 15% federal + 3.8% NIIT + 9.3% CA = ~$28,100.',
        'AMT credit from 2025: $120,000 carryforward, slowly recovering over future years as regular tax exceeds TMT (typically $10-20k/year recovery).',
        'But meanwhile, you carried the position through a possible further decline, and the $120,000 AMT is locked away until recovery.',
      ],
    },
    { type: 'h3', text: 'Path B — disqualifying disposition (sell October 2025 at $15)' },
    {
      type: 'ul',
      items: [
        'Reclassify the bargain element from AMT preference to ordinary income — but only up to the gain at sale: min($450,000 bargain element, ($15 − $5) × 10,000 = $100,000) = $100,000 ordinary income.',
        'The original $120,000 AMT bill from 2025 gets reduced because the bargain element is now $100,000 (not $450,000) for AMT purposes. AMT recalculation often eliminates most of the original AMT — recoverable as an amended return or a §53 credit applied immediately.',
        'Ordinary income tax: $100,000 × 35% federal + 9.3% CA + 1.45% Medicare = ~$45,750.',
        'No further capital gain (proceeds = $150,000, basis after ordinary income recognition = strike + ordinary = $50,000 + $100,000 = $150,000).',
        'Net 2025 tax impact: ordinary tax $45,750 instead of the original $120,000 AMT — saving ~$74,250.',
      ],
    },
    {
      type: 'p',
      text:
        'Path B is materially better because the disqualifying disposition recalibrates the bargain element to the actual gain. The original AMT was levied on $450,000 of "paper" bargain element that never materialized into real economic gain. Disqualifying corrects the math.',
    },
    {
      type: 'callout',
      text:
        'When the stock has crashed below the exercise FMV, the disqualifying disposition shrinks the bargain-element ordinary income to the actual remaining gain — and most or all of the originally-paid AMT becomes recoverable immediately. The §422 advantage assumed the gain would survive.',
    },
    { type: 'h2', text: 'Scenario 2 — exercised at a high FMV, price has been flat' },
    {
      type: 'p',
      text:
        'Same 10,000 share ISO grant with strike $5. You exercised in March 2025 when FMV was $50 (so $450,000 bargain element, $120k AMT). By March 2026, the share price is still $50. You\'re holding $500k of company stock in a flat market with $120k of unrecovered AMT credit.',
    },
    {
      type: 'p',
      text:
        'A qualifying disposition in March 2027 (at the 2-year-from-grant mark) at $50 would yield:',
    },
    {
      type: 'ul',
      items: [
        'Proceeds $500,000. Cost basis $50,000. LTCG $450,000. Tax: 20% federal + 3.8% NIIT + 9.3% CA = ~149,850.',
        'AMT credit recovery: $120,000 over several future years, no immediate offset.',
        'Total federal tax over the period: $149,850 LTCG + $120,000 AMT already paid − $120,000 eventually recovered = ~$149,850.',
      ],
    },
    {
      type: 'p',
      text:
        'Disqualifying in October 2026 (before the 1-year-from-exercise mark) at $50:',
    },
    {
      type: 'ul',
      items: [
        'Ordinary income = bargain element = $450,000. Tax: 35% federal + 9.3% CA + 1.45% Medicare = ~205,650.',
        'Original AMT (~$120,000) is recoverable on amended return or as a credit against the disqualifying-year regular tax.',
        'Capital gain after the disqualifying date: 0 (proceeds $500k = basis after ordinary income).',
        'Net cash position: ~$205,650 ordinary minus $120,000 AMT recovery = $85,650 incremental tax.',
      ],
    },
    {
      type: 'p',
      text:
        'In this flat-price scenario, qualifying still wins on absolute dollars ($149,850 vs $205,650 base + credit recovery). But disqualifying wins on TIMING — you get cash now, you exit single-stock concentration risk, and you fully recover AMT immediately. If you genuinely need the liquidity or your risk tolerance for holding $500k of company stock for another 12 months is low, disqualifying may be the right call despite higher absolute tax.',
    },
    { type: 'h2', text: 'When qualifying still wins (the 95% case)' },
    {
      type: 'ul',
      items: [
        'Stock has appreciated significantly past the exercise FMV. Larger gain = larger LTCG benefit, larger swing vs ordinary income at sale.',
        'You have AMT credit capacity in future years (rising income or no future ISO exercises).',
        'You can afford to hold through the qualifying period without forced liquidity.',
        'Concentration risk is manageable (<10% of net worth in single stock).',
      ],
    },
    { type: 'h2', text: 'When disqualifying might win' },
    {
      type: 'ol',
      items: [
        'Stock crashed since exercise — disqualifying recalibrates AMT to actual gain.',
        'High exercise-FMV bargain element, price now flat — disqualifying recovers AMT immediately instead of waiting years.',
        'You need the cash for a non-discretionary expense (mortgage, medical, business).',
        'You\'re leaving the company and want a clean cash exit before forfeiture of unvested ISOs.',
        'Company is on a downward trajectory and you believe further decline is likely.',
      ],
    },
    { type: 'h2', text: 'The split disposition strategy' },
    {
      type: 'p',
      text:
        'You don\'t have to sell all the shares the same way. A partial disqualifying disposition lets you:',
    },
    {
      type: 'ul',
      items: [
        'Sell enough shares to cover the AMT bill (typically 25-40% of the position).',
        'Hold the remaining shares through the qualifying period for LTCG treatment on the rest.',
        'Balances immediate liquidity / risk reduction against long-term tax efficiency.',
      ],
    },
    {
      type: 'p',
      text:
        'Each share has its own holding period — the IRS does not require all-or-nothing treatment.',
    },
    { type: 'h2', text: 'How to file a disqualifying disposition' },
    {
      type: 'ol',
      items: [
        'The ordinary income from the disqualifying disposition is reported on your W-2 Box 1 (and Box 12 code V if the broker properly communicates with your employer). Withholding may apply.',
        'The sale itself is reported on Form 8949 with the corrected cost basis = strike price + ordinary income recognized.',
        'The previously-paid AMT becomes a Minimum Tax Credit on Form 8801 (see our separate post on amt-credit-recovery-form-8801).',
        'For amended-return scenarios (e.g., the original year\'s AMT was clearly overstated), file Form 1040X with the recalculated AMT — but only within the 3-year statute of limitations from original filing.',
      ],
    },
    { type: 'h2', text: 'When to talk to a CPA' },
    {
      type: 'p',
      text:
        'ISO disposition timing is one of the highest-stakes tax decisions in equity comp:',
    },
    {
      type: 'ul',
      items: [
        '$100k+ of bargain element on the table.',
        'Crash scenario — large potential AMT recovery via disqualifying disposition.',
        'Cross-state moves between exercise year and disposition year.',
        'Multiple ISO grants stacked across years with different qualifying-period clocks.',
        'Pre-IPO or post-IPO timing decisions where liquidity windows are constrained.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'A disqualifying disposition of ISO shares is usually worse than waiting for the §422 qualifying period — but not always. When the stock has crashed since exercise, disqualifying recalibrates the bargain element down to the actual remaining gain and recovers most of the originally-paid AMT immediately. When the stock has been flat at a high exercise FMV, disqualifying still costs more in absolute tax but trades that for immediate liquidity and AMT recovery. The right answer depends on the specific facts: bargain element, current price vs exercise FMV, AMT credit balance, and your liquidity needs.',
    },
    {
      type: 'p',
      text:
        'For projecting both paths side-by-side with your specific numbers, use the ISO/AMT calculator (which handles exercise scenarios) and the AMT Credit Recovery calculator (which projects credit recovery year-by-year). For a CPA-grade analysis on a complex ISO disposition decision, Harness Wealth matches you with equity-comp specialists — disclosed affiliate link.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §422 (ISO requirements); IRC §422(a)(1) (qualifying disposition holding periods); IRC §421(b) (disqualifying disposition treatment); IRC §56(b)(3) (ISO bargain element as AMT preference); IRC §53 (Minimum Tax Credit); IRC §1(h) (long-term capital gains rates); IRC §1411 (NIIT); IRC §6511 (statute of limitations on refund claims); IRS Form 8801 instructions; IRS Form 8949 instructions; IRS Publication 525.',
    },
  ],
};
