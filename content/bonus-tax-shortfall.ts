export const bonusTaxShortfallContent = {
  slug: 'bonus-tax-shortfall',
  title: 'Bonus Tax Withholding Shortfall Calculator',
  metaTitle: 'Bonus Tax Withholding Calculator (2025–2026)',
  metaDescription:
    'Free calculator to estimate the tax shortfall on a cash bonus. Your employer withholds at a flat 22% (37% above $1M YTD) — your real marginal rate may be much higher. See the gap before you file.',
  h1: 'Bonus Tax Shortfall Calculator',
  lede:
    'Cash bonuses are taxed as supplemental wages — flat 22% federal withholding (37% above $1M YTD), regardless of your real bracket. If your marginal rate is 32% or higher, the gap shows up as a surprise bill at filing. Estimate yours below.',
  lastUpdated: '2026-05-11',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your bonus amount',
      text: 'Type in the gross dollar value of the bonus (sign-on, performance, retention, year-end — anything paid as supplemental wages).',
    },
    {
      name: 'Add your year-to-date wages',
      text: 'Include your regular W-2 wages and any prior supplemental wages (RSU vests, prior bonuses) paid earlier this year.',
    },
    {
      name: 'Pick your filing status and state',
      text: 'These determine your federal marginal rate and whether state supplemental withholding applies.',
    },
    {
      name: 'Read the shortfall and suggested action',
      text: 'If the shortfall exceeds $1,000, consider a quarterly estimated payment or extra W-4 withholding to avoid the IRS underpayment penalty.',
    },
  ],
  faqs: [
    {
      q: 'Why is my bonus only withheld at 22%?',
      a: 'IRC §3402(g) and IRS Pub 15 (Employer\'s Tax Guide) treat bonuses, RSU vests, and other supplemental wages as a single category. Reg. §31.3402(g)-1 sets a flat 22% federal withholding rate on the first $1,000,000 in YTD supplemental wages, then 37% on the excess. The 22% is a default the IRS chose — it is not your real marginal rate.',
    },
    {
      q: 'I got a $20,000 bonus and my employer withheld $4,400 (22%). Will I owe more in April?',
      a: 'Probably yes if your marginal federal rate is above 22%. For a single filer with W-2 wages of $200,000 + a $20,000 bonus in 2026, the marginal federal rate is 32% and California adds another ~10–12% — so the real federal+state liability on the bonus is closer to $8,400, not $4,400. The $4,000 gap is the shortfall.',
    },
    {
      q: 'What is the $1,000,000 threshold?',
      a: 'Per Reg. §31.3402(g)-1(a)(2), once your year-to-date supplemental wages with this employer cross $1M, every dollar above the threshold is withheld at 37% (the highest individual rate). A single big bonus that crosses the threshold gets a blended rate. The calculator handles this blending automatically.',
    },
    {
      q: 'Does this apply to sign-on bonuses, retention bonuses, performance bonuses?',
      a: 'Yes. All cash bonuses paid through W-2 payroll are "supplemental wages" under IRC §3402(g) and use the same 22%/37% withholding regime. The math is identical regardless of the bonus name.',
    },
    {
      q: 'What about clawbacks if I leave before the vesting date?',
      a: 'Clawback tax treatment depends on the year. If you repay in the same calendar year as the bonus, your W-2 is reduced and you net to zero. If you repay in a later year, you may be eligible for an IRC §1341 "claim of right" deduction or credit. This calculator estimates the year-of-payment tax only — clawback recovery is a separate filing-time question for your CPA.',
    },
    {
      q: 'Do I need to make estimated tax payments?',
      a: 'Maybe — especially if the shortfall is over $1,000 (the IRC §6654 safe-harbor threshold). The IRS rules in §6654(d) let you avoid an underpayment penalty by paying either 90% of this year\'s tax or 100% of last year\'s (110% if your prior-year AGI was above $150k). See IRS Publication 505 (Tax Withholding and Estimated Tax) for your situation, and the Mathstub Quarterly Estimated Tax calculator.',
    },
    {
      q: 'What if I am over-withheld (negative shortfall)?',
      a: 'A negative shortfall means you will get a refund on the bonus portion at filing time. This is common for lower-bracket filers (the 22% supplemental rate over-withholds for anyone whose marginal rate is 22% or below). The calculator labels this case clearly.',
    },
    {
      q: 'How does the "aggregate method" of withholding compare?',
      a: 'Some employers use the "aggregate method" (Reg. §31.3402(g)-1(a)(1)(ii)) — they treat the bonus as part of the next regular paycheck and withhold at your normal payroll-tax rate. This usually withholds MORE than the flat 22% method, so your shortfall is smaller. The calculator assumes the flat-rate method (the default for most large employers); if your employer uses the aggregate method, your real withholding will be higher than the calculator shows.',
    },
    {
      q: 'How accurate is the state tax estimate?',
      a: 'v1 uses each state\'s top marginal rate as an approximation. For users above the highest bracket the estimate is exact; for lower-income users it overstates state tax by a few percentage points. Use the override field to enter your exact rate.',
    },
    {
      q: 'Is this tax advice?',
      a: 'No — it is an estimate based on published IRS rules and your inputs. It does not consider AMT, multi-state residency, IRC §1341 claim-of-right scenarios, or other facts a CPA would catch. For decisions involving real money, talk to a licensed tax professional.',
    },
  ],
} as const;
