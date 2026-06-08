import type { BlogPost } from '../registry';

export const earlyExerciseNso83b: BlogPost = {
  slug: 'early-exercise-nso-83b-election',
  title: 'Early exercise of NSOs + 83(b) election: when it pays off, when it does not',
  description:
    'Early-exercising unvested NSO grants and filing a §83(b) election within 30 days converts all future appreciation from ordinary income (37%+ federal) to long-term capital gain (15-20%). For a pre-IPO startup employee with a $0.10 strike and a $10 expected exit, that can be a six-figure tax saving. But the trade-offs — cash out of pocket now, forfeiture risk, fiduciary 30-day clock — are unforgiving.',
  datePublished: '2026-05-19',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['harness-wealth', 'turbotax-premier'],
  quickAnswer:
    'Early exercise means buying unvested NSOs at the current strike + FMV (often near zero for pre-IPO startups), then filing a §83(b) election with the IRS within 30 days. This locks in today\'s FMV as your ordinary-income tax basis. All future appreciation becomes long-term capital gain (15-20% federal) instead of ordinary income (up to 37% + FICA). Worth it when: strike ≈ FMV today (so ordinary income now is near $0), you can afford to lose the exercise cash if you leave before vesting, and you have high conviction the company succeeds. Not worth it for public-company NSOs where FMV ≫ strike.',
  keyPoints: [
    'Buy your unvested options early and file an 83(b) form within 30 days to lock in a tiny tax now.',
    'All later growth is then taxed as capital gains (15-20%) instead of income (up to 37%).',
    'Worth it when the price today barely beats your buy price, common in year one at a startup.',
    'The risks: cash is tied up, you lose it if the company flops, and the 30-day deadline is firm.',
    "Not worth it for public-company options where today's price is already far above your strike.",
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Early exercising NSOs with a §83(b) election is one of the highest-leverage tax moves available to early-stage startup employees — and one of the easiest to mess up irreparably. The election must be filed with the IRS within 30 days of the exercise. Miss the deadline and the IRS treats it as a regular post-vest exercise: all the bargain element becomes ordinary income at exercise, no LTCG conversion possible. This post walks the mechanics, the worked numbers, and the four narrow scenarios where it actually pays off.',
    },
    { type: 'h2', text: 'What "early exercise" means' },
    {
      type: 'p',
      text:
        'A normal NSO grant lets you exercise only the vested portion. Early-exercise NSO plans (sometimes called "early-exercisable options" or "EERS") let you exercise the unvested portion too — buying shares the company has not yet earned. The shares come with a contractual right of repurchase: if you leave before they vest, the company can buy them back at the original strike price.',
    },
    {
      type: 'p',
      text:
        'Under IRC §83, restricted stock (i.e., stock subject to a substantial risk of forfeiture, like unvested early-exercised shares) is taxed only when the restriction lapses — that is, at vest, not at exercise. Unless you file a §83(b) election.',
    },
    { type: 'h2', text: 'The §83(b) election in plain English' },
    {
      type: 'p',
      text:
        '§83(b) lets you choose to be taxed NOW, on today\'s FMV, instead of at vest on future FMV. If today\'s FMV equals or barely exceeds the strike price (typical for pre-IPO startups in the first year), the ordinary income at exercise is near $0. From that point forward, all appreciation is capital gain — long-term if you hold > 1 year past exercise.',
    },
    {
      type: 'callout',
      text:
        'Critical deadline: the §83(b) election must be filed with the IRS within 30 days of exercising. No extensions, no late-acceptance procedure. Miss the deadline and the election is invalid forever.',
    },
    { type: 'h2', text: 'Worked example — pre-IPO startup employee' },
    {
      type: 'p',
      text:
        'You join a Series A startup. Grant: 100,000 NSOs at $0.10 strike. Current 409A FMV: $0.10/share. 4-year vest, 1-year cliff. Plan allows early exercise. Five years later, the company IPOs at $10/share. You sell all 100,000 shares.',
    },
    {
      type: 'table',
      caption: '100,000 NSOs · $0.10 strike · exit at $10 — two paths',
      headers: ['', 'Early exercise + §83(b)', 'Normal vested exercise'],
      rows: [
        ['Ordinary income at exercise', '$0', '$190,000 (≈$95k tax)'],
        ['Cost basis', '$10,000', '$200,000'],
        ['Long-term gain at sale', '$990,000', '$800,000'],
        ['Tax on the gain', '~$328,680', '~$265,600'],
        ['**Total lifecycle tax**', '**$328,680**', '**$360,600**'],
      ],
    },
    {
      type: 'flow',
      caption: 'What filing the §83(b) saves here',
      steps: [
        { label: 'With §83(b)', value: '$328,680', tone: 'good' },
        { label: 'Without', value: '$360,600', tone: 'bad' },
        { label: 'Saved', value: '~$32,000', tone: 'good' },
      ],
    },
    {
      type: 'p',
      text:
        'Path A saves ~$32,000 in tax versus Path B in this scenario. The bigger the strike-to-exit spread, the bigger the §83(b) advantage — because more of the total gain qualifies for LTCG treatment instead of ordinary rates.',
    },
    { type: 'h2', text: 'When early exercise + §83(b) is worth it' },
    {
      type: 'ol',
      items: [
        '**Strike ≈ FMV today.** If the bargain element at early exercise is near zero, the §83(b) "tax now" event is also near zero — you pay nothing now and lock in the LTCG path. Typical first-year Series A grants meet this.',
        '**You can afford to lose the exercise cash.** If you leave before vesting, the company repurchases shares at the original strike. You get back the cash you spent — but it was tied up for the vesting period and may be a substantial fraction of your liquid savings.',
        '**You have high conviction the company succeeds.** §83(b) is a one-way bet on appreciation. If the company fails to liquidity, you spent cash for shares worth $0. The §83(b) election does not give you a deductible loss for the worthless shares (unless you originally elected with an FMV that was clearly above $0 and can claim the original $0 paid as basis).',
        '**Your strike-to-exit spread is large.** Bigger spread = bigger LTCG conversion advantage. For a 100× return (strike $0.10 → exit $10), the §83(b) advantage is dramatic. For a 2× return, the math is marginal.',
      ],
    },
    { type: 'h2', text: 'When early exercise is NOT worth it' },
    {
      type: 'ul',
      items: [
        '**Public-company NSOs where FMV ≫ strike.** The bargain element at exercise is already large; the §83(b) election would require you to pay tax NOW on that bargain. No advantage — you would just be paying tax earlier than necessary.',
        '**You cannot afford the cash outlay.** Strike × shares is real money. For 100,000 shares at $1 strike, that\'s $100,000 cash up front. Plus you may owe ordinary income tax on the bargain element if FMV > strike.',
        '**The company\'s outcome is genuinely uncertain.** §83(b) commits cash that becomes worthless if the company fails. The expected-value math gets complicated when the probability of failure is high.',
        '**You may leave before vesting.** Forfeiture means the company repurchases at strike — you get your cash back but no upside. If you think you might leave, the §83(b) exercise is essentially a forced savings account at 0% interest.',
        '**Your strike is high relative to current FMV** (i.e., the option is "out of the money"). You\'d be paying $X to exercise something worth less than $X today.',
      ],
    },
    { type: 'h2', text: 'How to file the §83(b) election (mechanics)' },
    {
      type: 'p',
      text:
        'The election letter has no IRS-provided form. It must be a signed letter mailed (certified mail recommended, return receipt) to the IRS service center where you file your 1040, within 30 days of the exercise. Required content per Treas. Reg. §1.83-2(e):',
    },
    {
      type: 'ol',
      items: [
        'Your name, address, and Social Security number.',
        'A description of the property (number of shares, company, type of stock).',
        'The date the property was transferred (your exercise date) and the tax year of the election.',
        'The nature of the restrictions (e.g., "subject to vesting; company has repurchase right at original cost if employment terminates before vesting").',
        'The FMV at the time of transfer (not at vest — at the exercise date).',
        'The amount paid for the property (your exercise cost).',
        'The amount to be included in gross income (FMV − amount paid).',
        'A statement that you have provided copies to the company and the IRS.',
      ],
    },
    {
      type: 'p',
      text:
        'You also send a copy to your employer (for their tax records) and keep a copy for yourself. Many startups have an attorney-drafted template that\'s been pre-vetted — ask your company\'s legal team or use a service like Carta or Pulley that handles the paperwork end-to-end.',
    },
    { type: 'h2', text: 'Common mistakes that void the election' },
    {
      type: 'ul',
      items: [
        '**Missing the 30-day deadline.** No second chances. The IRS does not accept late §83(b) filings.',
        '**Not mailing certified.** Without proof of timely mailing, an IRS dispute can claim the election was never filed.',
        '**Failing to include all required content.** Missing any of the elements above can invalidate the election.',
        '**Filing for the wrong property.** §83(b) applies only to "property" transferred in exchange for services — applies to early-exercise NSOs and restricted stock, but NOT to standard RSUs (RSUs are not "property" at grant) and NOT to standard vested options exercised normally.',
        '**Reporting the wrong FMV.** Use the 409A valuation in effect on the exercise date. A stale FMV can be challenged.',
      ],
    },
    { type: 'h2', text: 'Tax-reporting implications' },
    {
      type: 'p',
      text:
        'The year of the §83(b) election:',
    },
    {
      type: 'ul',
      items: [
        'You include the bargain element (FMV − strike) as ordinary W-2 income on the exercise date. If FMV ≈ strike, this is $0 and there\'s no tax impact this year.',
        'Withholding may apply if the bargain element is non-trivial — your employer should withhold federal + state + FICA at the supplemental rate. If FMV = strike, no withholding required.',
      ],
    },
    {
      type: 'p',
      text:
        'In future years, until sale:',
    },
    {
      type: 'ul',
      items: [
        'No further tax events. The §83(b) election locked in the basis at exercise.',
        'Vesting (when restrictions lapse) is NOT a tax event because §83(b) already taxed it.',
      ],
    },
    {
      type: 'p',
      text:
        'At sale (later):',
    },
    {
      type: 'ul',
      items: [
        'Capital gain or loss = sale proceeds − cost basis (where basis = FMV at exercise, not strike).',
        'Holding period for LTCG starts on the EXERCISE date (when §83(b) was filed), not on the vest date.',
        'Long-term (>1 year past exercise) qualifies for LTCG rates; short-term is ordinary income.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'Early exercising NSOs and filing a §83(b) election is a powerful tool — but narrowly applicable. It works when strike ≈ FMV today, the company has high upside, you can absorb the cash outlay, and you can wait through the vesting period without leaving. For pre-IPO Series A or B startup employees, this is often the single highest-EV tax move available. For public-company employees with NSO grants at significant in-the-money strikes, the advantage usually disappears.',
    },
    {
      type: 'p',
      text:
        'Mechanics matter: 30-day deadline, certified mail, required content per Treas. Reg. §1.83-2(e). Get a CPA or specialist firm (Harness Wealth, your company\'s legal team, or Carta) to review the election before you mail it. This is one of the few tax decisions where a $500 expert fee can save five figures.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §83(a) (general taxation of property transferred for services); IRC §83(b) (election to include in gross income at transfer); Treas. Reg. §1.83-2 (procedure for the §83(b) election); IRS Rev. Proc. 2012-29 (sample §83(b) election language); IRC §1222 (capital gain holding periods); IRC §1(h) (long-term capital gains rates); IRC §1411 (Net Investment Income Tax).',
    },
  ],
};
