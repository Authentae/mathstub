/**
 * Equity-comp tax glossary. Every term gets a deterministic anchor slug so
 * blog posts and calculator pages can deep-link into specific entries.
 *
 * Each entry cites the controlling IRC section or IRS publication where
 * applicable — the citation is the trust signal that distinguishes a real
 * glossary from a content-farm definitions dump.
 */

export interface GlossaryEntry {
  term: string;
  /** Used as the anchor id. */
  slug: string;
  /** 2-4 sentence plain-language definition. */
  definition: string;
  /** Statutory or IRS publication source. */
  source?: string;
  /** Internal cross-references (slug of related entries). */
  see?: string[];
  /** Related calculator slugs that compute the math for this term. */
  calcs?: string[];
}

export const glossary: GlossaryEntry[] = [
  {
    term: 'RSU (Restricted Stock Unit)',
    slug: 'rsu',
    definition:
      'A promise from your employer to deliver shares of company stock on a future vesting date, conditional on continued employment. RSUs have no value at grant and cannot be sold or transferred until they vest. At vesting, the fair-market value of the delivered shares is taxed as ordinary wage income.',
    source: 'IRC §83(a); Treas. Reg. §1.83-7',
    see: ['vesting', 'fmv', 'ordinary-income'],
    calcs: ['rsu-tax-shortfall'],
  },
  {
    term: 'ISO (Incentive Stock Option)',
    slug: 'iso',
    definition:
      'A qualified stock option granted to employees only, with statutory tax preferences: no ordinary income at exercise, and long-term capital gains treatment on the entire spread if you hold the shares for at least 2 years from grant AND 1 year from exercise. The bargain element triggers AMT in the year of exercise.',
    source: 'IRC §422; IRS Form 6251',
    see: ['amt', 'bargain-element', 'qualifying-disposition'],
    calcs: ['iso-amt', 'amt-credit-recovery'],
  },
  {
    term: 'NSO / NQSO (Non-Qualified Stock Option)',
    slug: 'nso',
    definition:
      'A stock option that does not qualify for ISO treatment under §422. At exercise, the bargain element (FMV at exercise minus strike price) is taxed as ordinary wage income and subject to FICA. Available to employees, contractors, and board members.',
    source: 'IRC §83(a); Treas. Reg. §1.83-7',
    see: ['bargain-element', 'fica', 'supplemental-wages'],
    calcs: ['nso-exercise'],
  },
  {
    term: 'ESPP (Employee Stock Purchase Plan)',
    slug: 'espp',
    definition:
      'An employer-sponsored program letting employees buy company stock at a discount (typically 15%) using payroll deductions. A §423 qualifying disposition (hold ≥2 years from offering, ≥1 year from purchase) splits the gain into ordinary income (limited to the discount) and long-term capital gain.',
    source: 'IRC §423; IRS Pub 525',
    see: ['qualifying-disposition', 'lookback', 'disqualifying-disposition'],
    calcs: ['espp-qualifying-disposition'],
  },
  {
    term: 'Vesting',
    slug: 'vesting',
    definition:
      'The point at which restricted shares or options become yours to keep, sell, or exercise. For RSUs, vesting triggers ordinary income tax on the FMV of the delivered shares. Vesting schedules are commonly 4-year cliff-plus-monthly or 4-year quarterly.',
    see: ['rsu', 'fmv', 'ordinary-income'],
  },
  {
    term: 'Cliff',
    slug: 'cliff',
    definition:
      "A waiting period at the start of a vesting schedule during which no shares vest. The most common structure is a 1-year cliff followed by monthly or quarterly vesting — if you leave before the cliff, you forfeit the entire grant.",
    see: ['vesting'],
  },
  {
    term: 'FMV (Fair-Market Value)',
    slug: 'fmv',
    definition:
      'The price a willing buyer would pay a willing seller for the stock on a given date. For public companies it is the closing price on the relevant date; for private companies it is set by a 409A valuation. FMV at vest is the amount taxed as ordinary income on RSUs.',
    source: 'IRC §409A; Treas. Reg. §1.409A-1(b)(5)(iv)',
    see: ['409a', 'vesting'],
  },
  {
    term: '83(b) election',
    slug: '83b-election',
    definition:
      'A tax election to pay ordinary income tax on the FMV of restricted stock at GRANT instead of at vesting. Available only for restricted STOCK (not RSUs) and for early-exercised options. Must be filed with the IRS within 30 days of receipt. Useful when the grant FMV is low and the stock is expected to appreciate.',
    source: 'IRC §83(b); Rev. Proc. 2012-29',
    see: ['rsu', 'iso', 'nso'],
  },
  {
    term: 'AMT (Alternative Minimum Tax)',
    slug: 'amt',
    definition:
      'A parallel federal tax system designed to ensure high earners pay a minimum amount of tax. The ISO bargain element is an AMT preference item — it does not create ordinary income but is added to AMT income, often triggering a large AMT bill in the exercise year.',
    source: 'IRC §55-59; IRS Form 6251; IRS Pub 17',
    see: ['iso', 'bargain-element', 'amt-credit'],
    calcs: ['iso-amt', 'amt-credit-recovery'],
  },
  {
    term: 'AMT credit (Minimum Tax Credit)',
    slug: 'amt-credit',
    definition:
      'A non-refundable federal tax credit that lets you recover AMT paid on ISO exercises in future years when regular tax exceeds AMT. Tracked on IRS Form 8801 and carried forward indefinitely until used. Often the largest unclaimed credit in tech-worker tax returns.',
    source: 'IRC §53; IRS Form 8801',
    see: ['amt', 'iso'],
    calcs: ['amt-credit-recovery'],
  },
  {
    term: 'Bargain element',
    slug: 'bargain-element',
    definition:
      "The spread between the option's strike price and the stock's FMV at exercise. For NSOs it is ordinary W-2 income at exercise. For ISOs it is an AMT preference item, not ordinary income, in the exercise year.",
    source: 'IRC §83; IRC §422',
    see: ['iso', 'nso', 'amt'],
    calcs: ['iso-amt', 'nso-exercise'],
  },
  {
    term: 'Strike price (Exercise price)',
    slug: 'strike-price',
    definition:
      'The pre-set price at which an option holder can buy the underlying stock. For ISOs the strike must be at least FMV at grant per §422(b)(4). For NSOs the strike must be at least FMV at grant per §409A or the option is treated as deferred compensation.',
    source: 'IRC §422(b)(4); IRC §409A',
    see: ['iso', 'nso', 'fmv'],
  },
  {
    term: 'Qualifying disposition (ESPP / ISO)',
    slug: 'qualifying-disposition',
    definition:
      'A sale that meets both holding-period requirements: at least 2 years from grant AND 1 year from exercise (ISO) or purchase (ESPP). Qualifying dispositions get preferential long-term capital gains treatment on most of the gain.',
    source: 'IRC §422(a)(1); IRC §423(a)(1)',
    see: ['disqualifying-disposition', 'ltcg', 'iso', 'espp'],
    calcs: ['espp-qualifying-disposition', 'iso-amt'],
  },
  {
    term: 'Disqualifying disposition',
    slug: 'disqualifying-disposition',
    definition:
      'A sale of ISO or ESPP shares that fails to meet both holding-period requirements. The bargain element becomes ordinary W-2 income in the year of sale instead of long-term capital gain. Almost always more expensive than holding for qualifying treatment unless the stock has crashed.',
    source: 'IRC §421(b); IRC §423(c)',
    see: ['qualifying-disposition', 'iso', 'espp'],
  },
  {
    term: 'Lookback (ESPP)',
    slug: 'lookback',
    definition:
      'A favourable ESPP feature where the purchase price uses the LOWER of the FMV on the offering-period start date and the FMV on the purchase date, then applies the discount. Stacks a market-timing benefit on top of the standard discount — can produce >25% effective discounts during stock rallies.',
    source: 'IRC §423(b)(6)',
    see: ['espp', 'qualifying-disposition'],
  },
  {
    term: 'Supplemental wages',
    slug: 'supplemental-wages',
    definition:
      "Wage payments that aren't regular payroll: bonuses, RSU vests, NSO exercise spreads, severance, commissions. Federal income tax is withheld at a flat 22% on the first $1,000,000 of YTD supplemental wages and 37% above that, regardless of your actual marginal rate.",
    source: 'Treas. Reg. §31.3402(g)-1; IRS Pub 15-T',
    see: ['rsu', 'nso', 'withholding-shortfall'],
    calcs: ['rsu-tax-shortfall', 'bonus-tax-shortfall'],
  },
  {
    term: 'Withholding shortfall',
    slug: 'withholding-shortfall',
    definition:
      "The gap between what your employer withholds at the 22% federal supplemental rate and what you actually owe at your marginal rate (often 32-37%). For high earners, RSU vests routinely create a $1,000-$30,000 shortfall that surfaces at April filing.",
    see: ['supplemental-wages', 'safe-harbor', 'underpayment-penalty'],
    calcs: ['rsu-tax-shortfall', 'bonus-tax-shortfall'],
  },
  {
    term: 'Safe harbor (estimated tax)',
    slug: 'safe-harbor',
    definition:
      'Withholding plus estimated payments that meet one of three thresholds avoids the §6654 underpayment penalty: (1) total tax owed < $1,000, (2) ≥ 90% of current-year tax paid, or (3) ≥ 100% of prior-year tax paid (110% if AGI > $150k).',
    source: 'IRC §6654(d); IRS Pub 505',
    see: ['underpayment-penalty', 'quarterly-estimates'],
    calcs: ['quarterly-estimated-tax'],
  },
  {
    term: 'Underpayment penalty',
    slug: 'underpayment-penalty',
    definition:
      'Interest charged by the IRS when your withholding plus quarterly estimated payments fall below the §6654 safe-harbor for a tax year. The rate floats with the federal short-term rate + 3% (currently ~8% APR). Calculated per quarter on Form 2210.',
    source: 'IRC §6654; IRC §6621; IRS Form 2210',
    see: ['safe-harbor', 'quarterly-estimates'],
    calcs: ['quarterly-estimated-tax'],
  },
  {
    term: 'Quarterly estimated tax',
    slug: 'quarterly-estimates',
    definition:
      'Voluntary federal tax payments made four times per year (April, June, September, January) for income not subject to withholding. For tech workers with RSU shortfalls, a Q4 estimated payment only counts from the date paid — unlike W-4 line 4(c) withholding, which is treated as paid evenly throughout the year.',
    source: 'IRC §6654(g); IRS Direct Pay',
    see: ['safe-harbor', 'w4-line-4c'],
    calcs: ['quarterly-estimated-tax'],
  },
  {
    term: 'W-4 line 4(c)',
    slug: 'w4-line-4c',
    definition:
      'The line on Form W-4 where you specify additional dollars to withhold from each paycheck. Unlike quarterly estimated payments, W-4 withholding is treated as paid evenly across the year per §6654(g) — making a Q4 top-up retroactively cure earlier under-withholding.',
    source: 'IRC §6654(g)(1); IRS Form W-4',
    see: ['quarterly-estimates', 'safe-harbor', 'withholding-shortfall'],
  },
  {
    term: 'Cost basis',
    slug: 'cost-basis',
    definition:
      'Your investment in a security for tax purposes — for vested RSU shares, equal to the FMV at vest (which was already taxed as W-2 income). At sale, capital gain or loss = sale proceeds minus cost basis. Brokers often report $0 cost basis on Form 1099-B for RSU shares — you must adjust on Form 8949 column (g) to avoid double-taxing the vested value.',
    source: 'IRC §1012; IRS Form 8949 instructions',
    see: ['rsu', 'form-8949', 'capital-gain'],
  },
  {
    term: 'Form 8949',
    slug: 'form-8949',
    definition:
      'IRS form used to report capital gains and losses from securities sales, with adjustments for incorrect 1099-B cost basis. Column (e) is the reported basis, column (g) is the adjustment, column (h) is the corrected gain. Required when your broker reports an incorrect basis for vested RSU shares.',
    source: 'IRS Form 8949; Schedule D',
    see: ['cost-basis', 'rsu', 'capital-gain'],
  },
  {
    term: 'LTCG (Long-Term Capital Gain)',
    slug: 'ltcg',
    definition:
      'Gain on a security held for more than 1 year before sale. Federal rates are 0%, 15%, or 20% depending on income, much lower than ordinary income rates (up to 37%). High earners also pay 3.8% NIIT on top.',
    source: 'IRC §1(h); IRC §1411; IRS Topic 409',
    see: ['stcg', 'niit', 'qualifying-disposition'],
  },
  {
    term: 'STCG (Short-Term Capital Gain)',
    slug: 'stcg',
    definition:
      'Gain on a security held for 1 year or less before sale. Taxed at ordinary income rates (up to 37% federal), not the preferential LTCG rates. Created by disqualifying ESPP/ISO dispositions and same-day RSU sales.',
    source: 'IRC §1222(1); IRC §1(h)',
    see: ['ltcg', 'disqualifying-disposition'],
  },
  {
    term: 'NIIT (Net Investment Income Tax)',
    slug: 'niit',
    definition:
      'A 3.8% federal surtax on investment income (dividends, interest, capital gains) for high earners with MAGI above $200,000 single / $250,000 joint. Stacks on top of LTCG and STCG. Does not apply to wage income, including the ordinary-income portion of an RSU vest.',
    source: 'IRC §1411',
    see: ['ltcg', 'stcg'],
  },
  {
    term: 'FICA (Federal Insurance Contributions Act)',
    slug: 'fica',
    definition:
      'Payroll taxes funding Social Security (6.2% up to the wage base of $184,500 in 2026) and Medicare (1.45% on all wages, plus an additional 0.9% above $200,000 YTD). Applies to RSU vest FMV and NSO exercise spreads, but NOT to ISO exercises or LTCG.',
    source: 'IRC §3101; IRC §3121',
    see: ['social-security-wage-base', 'additional-medicare'],
  },
  {
    term: 'Social Security wage base',
    slug: 'social-security-wage-base',
    definition:
      'Annual cap on wages subject to the 6.2% Social Security portion of FICA. $184,500 for 2026 (SSA, announced Oct 2025). Once you cross the base via earlier paychecks, the SS portion drops off — making same-year RSU vests after the base smaller-bite.',
    source: 'IRC §3121(a)(1); SSA annual COLA',
    see: ['fica'],
  },
  {
    term: 'Additional Medicare Tax',
    slug: 'additional-medicare',
    definition:
      'An extra 0.9% Medicare tax on wages above $200,000 (single) or $250,000 (joint) YTD. Triggered automatically by payroll at the $200k single threshold regardless of filing status; reconciled at filing on Form 8959.',
    source: 'IRC §3101(b)(2); IRC §1401(b)(2); IRS Form 8959',
    see: ['fica'],
  },
  {
    term: 'Wash sale',
    slug: 'wash-sale',
    definition:
      'A sale of a security at a loss followed by repurchasing the same or substantially identical security within 30 days before or after. The loss is disallowed and added to the basis of the replacement shares. Common trap when tax-loss harvesting RSU shares while still receiving new RSU vests.',
    source: 'IRC §1091; Treas. Reg. §1.1091-1',
    see: ['tax-loss-harvesting', 'rsu'],
  },
  {
    term: 'Tax-loss harvesting',
    slug: 'tax-loss-harvesting',
    definition:
      'Realising losses on investment positions to offset capital gains (and up to $3,000/year of ordinary income). Excess losses carry forward indefinitely per §1212(b). Cannot offset the ordinary-income portion of an RSU vest. Watch the wash-sale rule under §1091.',
    source: 'IRC §1211; IRC §1212(b); IRC §1091',
    see: ['wash-sale', 'ltcg', 'stcg'],
  },
  {
    term: '409A valuation',
    slug: '409a',
    definition:
      'An independent appraisal of a private company\'s common stock FMV under IRC §409A, used to set strike prices for options granted to employees and contractors. Issuing options below 409A FMV creates immediate ordinary-income tax for the recipient plus a 20% penalty.',
    source: 'IRC §409A; Treas. Reg. §1.409A-1(b)(5)(iv)',
    see: ['fmv', 'iso', 'nso'],
  },
  {
    term: 'Ordinary income (compensation)',
    slug: 'ordinary-income',
    definition:
      'Wage and salary income taxed at the regular federal brackets (10%, 12%, 22%, 24%, 32%, 35%, 37% in 2026). Includes RSU vest FMV, NSO exercise spread, bonuses, and disqualifying ESPP / ISO bargain elements. Subject to FICA.',
    source: 'IRC §61; IRC §1(j); IRS Pub 525',
    see: ['ltcg', 'stcg', 'fica', 'supplemental-wages'],
  },
];

export function findGlossaryEntry(slug: string): GlossaryEntry | undefined {
  return glossary.find((g) => g.slug === slug);
}
