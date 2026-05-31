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
        'Your bonus hits, and about 40% is gone before it ever reaches your account. Your first thought: "Something is broken. Payroll messed up. I should call HR." Almost always, that thought is wrong. The 40% is the IRS’s bonus-withholding formula, stacking five separate pieces, and it is supposed to come out to roughly this. Whether you owe more later or get some back depends on how your real tax rate compares to that flat bonus rate. Let us walk through the five pieces and show exactly where the 40% comes from.',
    },
    { type: 'h2', text: 'Why bonuses get special rules' },
    {
      type: 'p',
      text:
        'A bonus is not a normal paycheck. It does not fit your usual pay schedule, your usual W-4 settings, or the standard withholding tables. So the IRS made a special bucket for it — called "supplemental wages" — with its own withholding rule.',
    },
    {
      type: 'p',
      text:
        'Supplemental wages cover: cash bonuses, RSU vests, the discount on NSO stock-option buys, commissions, severance, back pay from a raise, payouts of unused leave, taxable perks, and tips above your regular wage. All of these get the same flat-rate withholding, no matter what tax bracket you are actually in.',
    },
    { type: 'h2', text: 'The five pieces of the bite' },
    {
      type: 'p',
      text:
        'For a bonus paid to a higher-earning tech worker, here is what stacks up:',
    },
    {
      type: 'ul',
      items: [
        '**Federal income tax — 22% (or 37% above $1M for the year).** This is the flat federal bonus rate. The 37% rate only kicks in once your bonus-style pay for the year tops $1,000,000 — rare outside executive pay.',
        '**State income tax — 0% to 12%.** Depends on the state. California uses 10.23%, New York 11.7%, Illinois 4.95%, Massachusetts 5%. Texas, Florida, Washington, Tennessee, Nevada — all 0%. Other states default to their top rate.',
        '**Medicare — 1.45% on every dollar.** No cap, no exceptions. Hits all wages, bonuses included.',
        '**Extra Medicare — 0.9% above $200k for the year.** Adds on top of regular Medicare once your year-to-date wages pass $200,000 (single threshold). Wages only.',
        '**Social Security — 6.2% up to the wage cap ($176,100 projected for 2026).** If you already passed the cap before the bonus, this piece drops off. For mid-year bonuses on lower earners, it can apply fully or partly.',
      ],
    },
    {
      type: 'callout',
      text:
        'Add it up: 22% (fed) + 10.23% (CA) + 1.45% (Medicare) + 0.9% (extra Medicare) + 6.2% (Social Security, if not maxed yet) = 40.78% on a single bonus. For high earners, that is the floor — not the ceiling.',
    },
    { type: 'h2', text: 'Worked example — $30,000 bonus in June, $200k salary' },
    {
      type: 'p',
      text:
        'You make $200,000 a year and get a $30,000 cash bonus in June. By June, your wages so far are roughly $100,000 (half a year). Here is the bonus withholding:',
    },
    {
      type: 'ul',
      items: [
        'Federal: $30,000 × 22% = **$6,600**.',
        'State (CA): $30,000 × 10.23% = **$3,069**.',
        'Medicare: $30,000 × 1.45% = **$435**.',
        'Extra Medicare: your year-to-date wages will be $130k after the bonus, still under $200k = **$0**.',
        'Social Security: at $100k so far, you are well under the $176.1k cap, so it applies fully. $30,000 × 6.2% = **$1,860**.',
        'Total taken out: **$11,964 on $30,000 = 39.9%**.',
      ],
    },
    {
      type: 'p',
      text:
        'Almost exactly 40%, with nothing wrong and nothing unusual. Just the formula doing its thing.',
    },
    { type: 'h2', text: 'Worked example — $30,000 bonus in December, $180k salary' },
    {
      type: 'p',
      text:
        'Same person, but the bonus comes in December. By then, wages so far are $180,000 (the full salary). Bonus withholding:',
    },
    {
      type: 'ul',
      items: [
        'Federal: $30,000 × 22% = **$6,600**.',
        'State (CA): $30,000 × 10.23% = **$3,069**.',
        'Medicare: $30,000 × 1.45% = **$435**.',
        'Extra Medicare: wages were $180k, so the bonus pushes you past $200k mid-payment. The part above $200k ($10k) gets 0.9% = **$90**.',
        'Social Security: the $176.1k cap was already passed earlier in the year = **$0**.',
        'Total taken out: **$10,194 on $30,000 = 34.0%**.',
      ],
    },
    {
      type: 'p',
      text:
        'Less is withheld here because Social Security already maxed out earlier in the year. Same bonus, about 6% less withheld — just because of WHEN it was paid.',
    },
    { type: 'h2', text: 'When that 22% is actually too little' },
    {
      type: 'p',
      text:
        'At higher incomes, the flat 22% federal bonus rate is BELOW your real tax bracket. The brackets above 22% in 2026:',
    },
    {
      type: 'ul',
      items: [
        '24% bracket: starts around $103k of taxable income for singles.',
        '32% bracket: starts around $197k for singles. Most senior tech workers.',
        '35% bracket: starts around $251k for singles. Director level plus a bonus.',
        '37% bracket: starts above $626k for singles. Senior execs and IPO years.',
      ],
    },
    {
      type: 'p',
      text:
        'If your real rate is 32% but only 22% got withheld, your bonus came up 10 points short on the federal side. On a $30,000 bonus that is $3,000 of extra federal tax due at filing. Add in the state and Medicare/Social Security reconciliation and the total can easily clear the IRS’s $1,000 safe-harbor line — which can trigger an underpayment penalty if you do not cover it, either through your W-4 line 4(c) or a quarterly estimated payment.',
    },
    { type: 'h2', text: 'When a different method takes out even more' },
    {
      type: 'p',
      text:
        'There is a second method the IRS lets employers use, called the "aggregate method." Instead of a flat 22%, the employer lumps the bonus in with your most recent regular paycheck and withholds at your effective rate from the IRS tables. For high earners, that usually lands closer to 28-32% federal — much nearer your real rate.',
    },
    {
      type: 'p',
      text:
        'Most companies use the flat 22% method because it is simpler to run. A minority use the aggregate method. Both are legal. You usually do not get to choose. Check your offer letter or plan documents.',
    },
    { type: 'h2', text: 'When 30-40% really is wrong (rare)' },
    {
      type: 'ol',
      items: [
        '**Wrong state withheld.** If you live in a 0% state (TX/FL/WA) but your employer withheld California tax anyway, that is a clerical mistake. Check what state of residence payroll has on file.',
        '**Social Security double-withheld across two jobs.** If you have a second employer and your combined wages passed the cap earlier, the second employer may over-withhold Social Security. You claim it back on Form 1040 Schedule 3, line 11.',
        '**Same bonus counted twice on your W-2.** A rare reporting slip where the same amount shows up in both Box 14 and Box 1. Cross-check your December paystub against W-2 Box 1.',
        '**"Imputed income" mistaken for a real bonus.** Some non-cash perks (like group-term life insurance over $50k, or certain reimbursements) show up as income on your paystub even though you never got cash. The withholding on those can look like a deduction with no matching cash.',
      ],
    },
    { type: 'h2', text: 'What to actually do' },
    {
      type: 'p',
      text:
        'If your bonus withholding is in the 30-40% range and your real tax rate is in that range too, you are roughly even at filing — maybe a small refund or a small amount due, depending on your state and Social Security. No action needed.',
    },
    {
      type: 'p',
      text:
        'If your real rate is clearly HIGHER than the flat 22% federal bonus rate (you are in the 32%+ bracket) AND your total expected shortfall for the year is $1,000 or more, you have penalty exposure. Fix it before December 31 with one of these:',
    },
    {
      type: 'ol',
      items: [
        '**Extra withholding on W-4 line 4(c)** for your remaining paychecks. Withholding counts as if it were paid evenly all year, so a top-up now retroactively patches the earlier shortfall. This is the better fix.',
        '**A Q4 estimated payment through IRS Direct Pay.** This only counts from the day you pay it, so it does not fix earlier under-withholding — but it does cover the gap going forward.',
      ],
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        'A 30-40% bite on a bonus is usually just the IRS bonus formula stacking up correctly: 22% federal + state + Medicare + extra Medicare + Social Security. It can dip to 25-35% if Social Security is already maxed, or climb past 40% when every piece hits at once. None of it is a payroll error. The real question — separate from whether the withholding is "correct" — is whether your full-year bill will be covered. And that comes down to how your real tax rate stacks up against the flat 22% federal bonus rate.',
    },
    {
      type: 'p',
      text:
        'For your exact bonus, drop your gross bonus, year-to-date wages, state, and filing status into the Bonus Tax Shortfall calculator. It works out both the withholding and your expected full-year position, so you can see whether to top up your W-4 line 4(c) before year-end.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g) (supplemental wage withholding); Treas. Reg. §31.3402(g)-1 (flat-rate and aggregate methods); Treas. Reg. §31.3402(g)-1(a)(2) (aggregate method); IRC §3101 (FICA); IRC §3101(b)(2) (Additional Medicare); IRC §3121(a)(1) (Social Security wage base); IRC §6654 (estimated tax safe harbor); IRC §6654(g)(1) (withholding treated as paid evenly); IRS Publication 15 (Employer\'s Tax Guide); IRS Publication 15-T (Federal Income Tax Withholding Methods).',
    },
  ],
};
