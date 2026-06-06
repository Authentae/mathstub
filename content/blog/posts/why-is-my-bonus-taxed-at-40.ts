import type { BlogPost } from '../registry';

export const whyIsMyBonusTaxedAt40: BlogPost = {
  slug: 'why-is-my-bonus-taxed-at-40-percent',
  title: 'Why is my bonus taxed at 40%? The supplemental wage rule, explained',
  description:
    'Your year-end bonus shows up with ~40% taken out and you assume something is wrong. It usually is not. Federal supplemental withholding is 22% by default (or 37% above $1M YTD) regardless of your bracket — and that stacks with state, Medicare, Social Security, and any add-on Medicare for high earners. Here is the actual math.',
  datePublished: '2026-05-19',
  dateModified: '2026-05-19',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'A cash bonus is "supplemental wages" under Treas. Reg. §31.3402(g)-1. Federal income tax withholds at a flat 22% (or 37% above $1M YTD), regardless of your marginal rate. Add state supplemental (CA 10.23%, NY 11.7%, TX 0%), Medicare 1.45%, Additional Medicare 0.9% above $200k YTD, and Social Security 6.2% up to the wage base — and the deduction routinely lands in the 35-40% range. None of this is a mistake; it is the IRS-mandated formula. Reconcile at filing.',
  keyPoints: [
    'The big bite is not a mistake — the IRS has a special flat rule for bonuses.',
    'Bonuses are "supplemental wages": the federal piece is a flat 22% no matter your bracket.',
    'On top of that come state tax, Medicare, and Social Security, which stack to about 40%.',
    'When these all hit at once, roughly 40% withheld is normal, not an error.',
    'If your real tax rate is above 22%, you may still owe more at tax time.',
    'Fix any shortfall before year-end with extra W-4 withholding (line 4(c)).',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'Year-end bonus hits your paycheck and ~40% is gone before it reaches your account. The instinct is "this is wrong, payroll messed up, I should call HR." Almost always the instinct is wrong. The 40% deduction is the IRS-mandated supplemental-wage withholding formula stacking five separate layers, and it produces this number by design. Whether you owe more or get refunded at filing depends entirely on your real marginal rate vs the flat supplemental rate. This post walks the five layers and shows where the 40% comes from.',
    },
    { type: 'h2', text: 'Why "supplemental wages" have special rules' },
    {
      type: 'p',
      text:
        'A bonus is not a regular paycheck. It does not fit your normal payroll calendar, your normal W-4 settings, or the standard withholding tables. The IRS solved this with a special category — "supplemental wages" — and a special withholding rule under Treas. Reg. §31.3402(g)-1.',
    },
    {
      type: 'p',
      text:
        'Supplemental wages include: cash bonuses, RSU vests, NSO bargain elements at exercise, commissions, severance, retroactive pay raises, accumulated leave payouts, taxable fringe benefits, and tip payments above the regular wage rate. All of these are handled with the same flat-rate withholding regardless of your actual tax bracket.',
    },
    { type: 'h2', text: 'The five withholding layers' },
    {
      type: 'p',
      text:
        'For a bonus paid to a higher-earning tech worker, the deduction stacks:',
    },
    {
      type: 'table',
      caption: 'The five layers that stack on a bonus',
      headers: ['Layer', 'Rate'],
      rows: [
        ['Federal supplemental', '22% (37% above $1M YTD)'],
        ['State', '0% (TX/FL/WA) to ~12% (CA 10.23%, NY 11.7%)'],
        ['Medicare', '1.45%, every dollar'],
        ['Additional Medicare', '+0.9% above $200k YTD'],
        ['Social Security', '6.2% up to ~$176,100 (drops once maxed)'],
      ],
    },
    {
      type: 'callout',
      text:
        'Add 22% (fed) + 10.23% (CA state) + 1.45% (Medicare) + 0.9% (Add\'l Medicare) + 6.2% (SS, if not yet maxed) = 40.78% on a single bonus payment. That is the floor for high earners, not the ceiling.',
    },
    { type: 'h2', text: 'Worked example — $30,000 bonus, mid-year, $200k base' },
    {
      type: 'p',
      text:
        'You earn $200,000 base salary and receive a $30,000 cash bonus in June. By June, your YTD wages are roughly $100,000 (half a year of base). Bonus withholding:',
    },
    {
      type: 'table',
      caption: '$30k bonus in June · $200k base (SS not yet maxed)',
      headers: ['Tax', 'Amount'],
      rows: [
        ['Federal (22%)', '$6,600'],
        ['California (10.23%)', '$3,069'],
        ['Medicare (1.45%)', '$435'],
        ['Additional Medicare', '$0 (under $200k YTD)'],
        ['Social Security (6.2%)', '$1,860'],
        ['**Total**', '**$11,964 (39.9%)**'],
      ],
    },
    {
      type: 'p',
      text:
        'Almost exactly 40%, with no error or special circumstance. This is the IRS-mandated formula playing out.',
    },
    { type: 'h2', text: 'Worked example — $30,000 bonus, December, $180k base' },
    {
      type: 'p',
      text:
        'Same employee but the bonus comes in December. By December, YTD wages are $180,000 (full base). Bonus withholding:',
    },
    {
      type: 'table',
      caption: 'Same $30k bonus in December (SS already maxed)',
      headers: ['Tax', 'Amount'],
      rows: [
        ['Federal (22%)', '$6,600'],
        ['California (10.23%)', '$3,069'],
        ['Medicare (1.45%)', '$435'],
        ['Additional Medicare (0.9% on $10k)', '$90'],
        ['Social Security', '$0 (already maxed)'],
        ['**Total**', '**$10,194 (34.0%)**'],
      ],
    },
    {
      type: 'p',
      text:
        'Lower deduction because Social Security maxed out at the wage base earlier in the year. Same nominal bonus, ~6% less withholding because of WHEN it was paid.',
    },
    { type: 'h2', text: 'When 22% federal is actually under-withholding' },
    {
      type: 'p',
      text:
        'At higher incomes the 22% flat federal supplemental rate is BELOW your actual marginal tax bracket. The brackets that exceed 22% in 2026:',
    },
    {
      type: 'ul',
      items: [
        '24% bracket: kicks in around $103k taxable income for singles.',
        '32% bracket: kicks in around $197k for singles. Most senior tech workers.',
        '35% bracket: kicks in around $251k for singles. Director-level + bonus stack.',
        '37% bracket: kicks in above $626k for singles. Senior executives + IPO years.',
      ],
    },
    {
      type: 'p',
      text:
        'If your real marginal rate is 32% and supplemental withholding is 22%, the bonus is under-withheld by 10 percentage points federally. On a $30,000 bonus that\'s $3,000 of additional federal tax owed at filing. Add state and Medicare/SS reconciliation and the total can easily clear the IRS $1,000 safe-harbor threshold under IRC §6654 — triggering an underpayment penalty if you don\'t cover it via either W-4 line 4(c) adjustment or quarterly estimated payment.',
    },
    { type: 'h2', text: 'When the aggregate method withholds even more' },
    {
      type: 'p',
      text:
        'There is a second method the IRS lets employers use, called the "aggregate method" under Treas. Reg. §31.3402(g)-1(a)(2). Instead of flat 22%, the employer adds the bonus to your most-recent regular paycheck wages and withholds at your effective rate from the IRS withholding tables. For high earners that calculation produces withholding closer to 28-32% federal — closer to your actual marginal rate.',
    },
    {
      type: 'p',
      text:
        'Most companies use the flat 22% supplemental method because it\'s operationally simpler. A minority use aggregate. Both are legal. You usually cannot choose. Check your offer letter or plan documents.',
    },
    { type: 'h2', text: 'When 30-40% withholding is genuinely wrong (rare)' },
    {
      type: 'ol',
      items: [
        '**Wrong state withheld.** If you live in a 0% state (TX/FL/WA) and your employer withheld California state tax anyway, that\'s a clerical error. Check your state of residence on file with payroll.',
        '**Social Security double-withheld via two jobs.** If you have a second employer and combined YTD wages crossed the wage base earlier, the second employer may over-withhold SS. Reclaim on Form 1040 Schedule 3 line 11.',
        '**Bonus paid as Box 14 income on top of bonus paid as Box 1.** Rare reporting error where the same amount is double-counted on your W-2. Cross-check December pay stub YTD against W-2 Box 1.',
        '**Imputed income confused with a real bonus.** Some non-cash benefits (group-term life insurance over $50k, certain expense reimbursements) appear as income on your paystub but you never received the cash. The corresponding withholding can look like a deduction without an offsetting cash payment.',
      ],
    },
    { type: 'h2', text: 'What to do about it' },
    {
      type: 'p',
      text:
        'If your bonus withholding is in the 30-40% range and your real marginal rate is in that range too: you are roughly break-even at filing, possibly a small refund or small balance due depending on state and Social Security position. No action needed.',
    },
    {
      type: 'p',
      text:
        'If your real marginal rate is materially HIGHER than the 22% federal supplemental rate (i.e., you\'re in the 32%+ bracket) AND your total expected shortfall for the year is $1,000+: you have IRC §6654 underpayment-penalty exposure. Fix it before December 31 via:',
    },
    {
      type: 'ol',
      items: [
        '**W-4 line 4(c) extra withholding** on remaining paychecks. Treated as paid evenly across the year per §6654(g)(1) — retroactively cures earlier under-withholding. This is the preferred fix.',
        '**Q4 estimated tax payment via IRS Direct Pay.** Only counts from the payment date, so it doesn\'t cure under-withholding from earlier in the year — but it does cover the shortfall going forward.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'A 30-40% deduction on a bonus is usually the IRS-mandated supplemental withholding formula stacking correctly: 22% federal + state supplemental + Medicare + Additional Medicare + Social Security. The number can flex to 25-35% if Social Security is already maxed or to 40%+ if multiple layers all hit. None of this is a payroll error. The real question — different from whether the deduction is correct — is whether your full-year tax bill will be covered, which depends on how your real marginal rate compares to the flat 22% federal supplemental rate.',
    },
    {
      type: 'p',
      text:
        'For your specific bonus, plug your gross bonus, YTD wages, state, and filing status into the Bonus Tax Shortfall calculator. It computes both the withholding amount and your expected full-year tax position so you can see whether to top up via W-4 line 4(c) before year-end.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding); Treas. Reg. §31.3402(g)-1 (flat-rate and aggregate methods); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); IRC §3101 (FICA); IRC §3101(b)(2) (Additional Medicare); IRC §3121(a)(1) (Social Security wage base); IRC §6654 (estimated tax safe harbor); IRC §6654(g)(1) (withholding treated as paid evenly); IRS Publication 15 (Employer\'s Tax Guide); IRS Publication 15-T (Federal Income Tax Withholding Methods).',
    },
  ],
};
