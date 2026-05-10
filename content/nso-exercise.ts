export const nsoExerciseContent = {
  slug: 'nso-exercise',
  title: 'NSO Exercise Tax Calculator',
  metaTitle: 'NSO Exercise Tax Calculator (2025–2026)',
  metaDescription:
    'Free calculator for the ordinary-income tax + FICA + state owed when you exercise non-qualified stock options. See the bargain element, the 22% supplemental shortfall, and what to top up before April.',
  h1: 'NSO Exercise Tax Calculator',
  lede:
    'Exercising NSOs creates immediate ordinary income equal to (FMV − strike) × shares — taxed at your marginal rate, not the flat 22% your employer withholds. Estimate the gap before you exercise.',
  lastUpdated: '2026-05-11',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter strike price, FMV, and shares',
      text: 'Strike is from your option grant. FMV is current 409A or fair market value at exercise. The product is your "bargain element."',
    },
    {
      name: 'Add your year-to-date wages',
      text: 'Include regular W-2 wages and any prior supplemental wages (RSU vests, bonuses, prior NSO exercises) paid earlier this year.',
    },
    {
      name: 'Pick your filing status and state',
      text: 'These set your federal marginal rate and whether state supplemental withholding applies.',
    },
    {
      name: 'Read the shortfall and suggested action',
      text: 'If the shortfall exceeds $1,000, send a quarterly estimated payment or update Form W-4 line 4(c) to avoid the IRS underpayment penalty.',
    },
  ],
  faqs: [
    {
      q: 'How are NSOs taxed at exercise?',
      a: 'Per IRC §83 and Treas. Reg. §1.83-7, when you exercise a non-qualified stock option you recognize ordinary compensation income equal to the bargain element: (FMV at exercise − strike price) × shares exercised. This income is W-2 wages — your employer reports it in Box 1 and withholds federal/state/FICA on it.',
    },
    {
      q: 'Why is my NSO exercise withheld at only 22%?',
      a: 'NSO bargain element is "supplemental wages" under IRC §3402(g). Reg. §31.3402(g)-1 sets a flat 22% federal withholding rate up to $1M YTD supplemental wages, then 37% above. The 22% is a default the IRS chose, not your real marginal rate. Higher earners almost always have a shortfall.',
    },
    {
      q: 'Do FICA taxes apply to NSO exercises?',
      a: 'Yes. Unlike ISOs (which are exempt from FICA at exercise per IRC §3121(a)(22)), NSOs are subject to Social Security (up to the wage base, $176,100 for 2025) and Medicare (1.45% + 0.9% Additional Medicare above $200k). The calculator includes FICA in the withheld and expected totals.',
    },
    {
      q: 'How does this compare to ISOs?',
      a: 'Different code path. ISOs (IRC §422) get no ordinary income at exercise IF held long enough — but generate AMT preference (Form 6251) and need separate planning. NSOs are simpler at exercise (always ordinary income, always W-2-style withholding) but you lose the LTCG-on-the-spread tax break that ISOs offer when held qualifying. See the Mathstub ISO/AMT calculator for the ISO side.',
    },
    {
      q: 'What about future appreciation after I exercise?',
      a: 'Once you have the shares, the basis equals (strike + bargain element). Any future gain is capital gain — short-term if you sell within a year of exercise, long-term if you hold longer. This calculator covers tax at exercise only; the post-exercise sale is a normal capital-gains question.',
    },
    {
      q: 'What if I exercise and immediately sell ("cashless exercise")?',
      a: 'Cashless exercise still triggers the same ordinary-income event on the bargain element — your broker just sells enough shares to cover strike + withholding in the same transaction. The tax result is identical to "exercise and sell same day" because the spread between exercise and sale is zero, so there\'s no separate cap-gain. The calculator number is unchanged.',
    },
    {
      q: 'Do I need to make estimated tax payments?',
      a: 'Likely yes if the shortfall exceeds $1,000 (the IRC §6654 safe-harbor threshold). The IRS rules in §6654(d) let you avoid an underpayment penalty by paying either 90% of this year\'s tax or 100% of last year\'s (110% if your prior-year AGI was above $150k). See the Mathstub Quarterly Estimated Tax calculator for the per-quarter dollar amount.',
    },
    {
      q: 'How accurate is the state tax estimate?',
      a: 'v1 uses each state\'s top marginal rate as an approximation. For users above the highest bracket the estimate is exact; for lower-income users it overstates state tax by a few percentage points. Use the override field to enter your exact rate.',
    },
    {
      q: 'Does this handle 83(b) elections on early-exercised NSOs?',
      a: 'Not in v1. An 83(b) election within 30 days of an early exercise can shift the income to the much smaller bargain element at the (early) exercise date instead of at vesting — which is how some founders pay tax on a near-zero spread. That election is a separate calculator (planned). For now, this tool assumes a standard "exercise after vesting" path.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it is an estimate based on published IRS rules and your inputs. It does not consider AMT (which generally does not apply to NSOs but can in edge cases), multi-state residency, or other facts a CPA would catch. For decisions involving real money, talk to a licensed tax professional.',
    },
  ],
} as const;
