export const esppQualifyingContent = {
  slug: 'espp-qualifying-disposition',
  title: 'ESPP Qualifying Disposition Tax Calculator',
  metaTitle: 'ESPP Qualifying Disposition Tax Calculator (2025–2026)',
  metaDescription:
    'Free calculator that splits your §423 ESPP sale into ordinary income vs. long-term capital gain, applies federal LTCG + NIIT + state tax, and shows how much qualifying treatment saved you.',
  h1: 'ESPP Qualifying Disposition Tax Calculator',
  lede:
    'A qualifying §423 ESPP sale gets a tax break: part of your gain stays at long-term capital-gain rates instead of ordinary income. Enter your offer date, purchase date, and sale price to see exactly how the IRS splits the proceeds — and how much you saved by holding long enough.',
  lastUpdated: '2026-05-10',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your offering and purchase details',
      text: 'Type the offer-date FMV, purchase-date FMV, plan discount (typically 15%), and the number of shares you bought.',
    },
    {
      name: 'Add your sale price and dates',
      text: 'Enter the per-share price you sold at, plus the offer / purchase / sale dates. The calculator checks both holding-period rules (>2 years from offer, >1 year from purchase).',
    },
    {
      name: 'Add your wages and state',
      text: 'YTD wages and pre-tax deductions size your marginal rate; state tax uses your residence state (or override with a custom rate).',
    },
    {
      name: 'Read the breakdown and savings',
      text: 'See ordinary-income vs. LTCG split, federal + state tax owed, and the difference vs. selling as a disqualifying disposition.',
    },
  ],
  faqs: [
    {
      q: 'What makes an ESPP sale a “qualifying disposition”?',
      a: 'Two holding rules must both be met: at least 2 years from the offering/grant date AND at least 1 year from the purchase date (IRC §423(a)(1) and §423(a)(2)). Miss either one and the sale is a disqualifying disposition with worse tax treatment. See IRS Publication 525 (Taxable and Nontaxable Income), section "Employee Stock Purchase Plan."',
    },
    {
      q: 'How is the ordinary income calculated on a qualifying sale?',
      a: 'Per IRC §423(c), ordinary income is the LESSER of (a) the discount available at grant — for a typical 15% discount plan, that\'s grant-date FMV × 15% — or (b) your actual gain (sale price minus your purchase price). Anything above that ordinary-income piece is long-term capital gain. Brokers report the grant-date FMV in Form 3922 Box 2 and the deemed option price in Box 4.',
    },
    {
      q: 'How is the purchase price computed?',
      a: 'For a §423 plan with lookback: purchase price = the lower of (offer-date FMV, purchase-date FMV) × (1 − discount), per the standard plan terms allowed under Treas. Reg. §1.423-2. Plans without lookback set both FMVs equal — enter the same value in both fields.',
    },
    {
      q: 'What is the disqualifying disposition comparison?',
      a: 'On a disqualifying sale, ordinary income is the full bargain element on purchase date (purchase-date FMV − purchase price), uncapped (per IRC §421(b)). Any further gain is short-term or long-term capital gain depending on holding from purchase. The calculator computes both so you can see the dollar value of the qualifying tax break.',
    },
    {
      q: 'Does this include state tax?',
      a: 'Yes — at your state’s top marginal rate by default, with a manual override. Most states (including California per FTB Pub 1004) tax both the ordinary-income piece and the long-term capital gain at ordinary rates with no preferential LTCG treatment.',
    },
    {
      q: 'Does it include NIIT?',
      a: 'Yes. The 3.8% Net Investment Income Tax (IRC §1411) is applied to the long-term capital-gain portion when MAGI exceeds the statutory threshold ($200k single / $250k MFJ / $125k MFS). Thresholds are not inflation-indexed.',
    },
    {
      q: 'What about a sale below my purchase price?',
      a: 'Ordinary income is zero in that case (you can’t recognize ordinary income greater than your actual gain, per the §423(c) lesser-of rule), and you have a long-term capital loss equal to sale price − purchase price reportable on Schedule D.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it’s an estimate based on IRS Pub 525, IRC §423, and your inputs. It does not consider AMT, multi-state residency, wash-sale interactions, or other facts a CPA would catch. For real money decisions, talk to a licensed tax professional.',
    },
  ],
} as const;
