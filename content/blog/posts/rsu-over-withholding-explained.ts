import type { BlogPost } from '../registry';

export const rsuOverWithholding: BlogPost = {
  slug: 'rsu-over-withholding-explained',
  title: 'RSU over-withholding: when 30–35% taken from your vest is normal (and when it isn\'t)',
  description:
    'Your employer withheld 30–35% on your RSU vest and you think they made a mistake. Walk the math: federal supplemental, state, Medicare, and Additional Medicare stack quickly. Most of the time it is correct.',
  datePublished: '2026-05-15',
  dateModified: '2026-06-07',
  authorName: 'Mathstub Editorial',
  reviewerName: 'Reviewed against IRS primary sources',
  affiliateOfferIds: ['turbotax-premier', 'taxact-premier'],
  quickAnswer:
    'A 30-35% deduction on an RSU vest is usually correct, not a mistake. The deduction stacks federal supplemental (22%) + state supplemental (e.g. CA 10.23%, NY 11.7%) + Medicare (1.45%) + Additional Medicare (0.9% above $200k YTD) + Social Security (6.2% up to wage base). Sometimes employers use the IRS aggregate method per Treas. Reg. §31.3402(g)-1(a)(2), which can withhold even more. Reconcile at filing — not with HR.',
  keyPoints: [
    'Seeing 30–35% taken from an RSU vest is usually correct, not a payroll mistake.',
    'The "22% rule" is only the federal piece — it is just one of several layers.',
    'State tax, Medicare, extra Medicare, and Social Security all stack on top.',
    "Some employers use the IRS \"aggregate method,\" which can withhold even more.",
    'Withholding is a deposit, not your final bill — extra comes back as a refund.',
    'Fix any gap at filing or via your W-4, not by emailing HR.',
  ],
  blocks: [
    {
      type: 'p',
      text:
        'You got an RSU vest, looked at the deduction line, and saw 30–35% taken out. Your instinct is "that\'s wrong — they should have taken 22%, right?" — and then you start thinking about emailing HR. Pause first. Walk the math. Most of the time the 30–35% number is correct, not a mistake, and the path forward is reconciliation at filing time, not a fight with payroll.',
    },
    { type: 'h2', text: 'Where the 22% number comes from' },
    {
      type: 'p',
      text:
        'There is a real IRS rule that says "22% flat" on supplemental wages. It is in IRS Publication 15 and codified under Treasury Regulation §31.3402(g)-1. That rule applies to the federal income tax piece, on supplemental wage payments up to $1,000,000 of YTD supplemental wages.',
    },
    {
      type: 'p',
      text:
        'But "22% federal" is only one of four or five layers of withholding that hit an RSU vest. By the time all of them stack up, the total deduction can easily reach 30–35% even when nobody is doing anything wrong.',
    },
    { type: 'h2', text: 'The full stack of withholding on an RSU vest' },
    {
      type: 'p',
      text:
        'For a high-earner equity employee, the deduction from a vest is built from these layers:',
    },
    {
      type: 'table',
      caption: 'The withholding stack on a vest',
      headers: ['Layer', 'Rate'],
      rows: [
        ['Federal supplemental', '22% (37% above $1M YTD)'],
        ['State supplemental', 'CA 10.23% · NY 11.7% · TX/FL/WA 0%'],
        ['Medicare', '1.45%, every dollar'],
        ['Additional Medicare', '+0.9% above $200k YTD'],
        ['Social Security', '6.2% up to ~$176,100 (drops once maxed)'],
      ],
    },
    {
      type: 'p',
      text:
        'Add 22% (fed) + 10.23% (CA state) + 1.45% (Medicare) + 0.9% (Add\'l Medicare, if applicable) + 6.2% (SS, if not maxed) = 40.78% on a single vest. That is before the employer has done anything you would call "wrong" — those are all statutorily required rates.',
    },
    { type: 'h2', text: 'When the number is even higher — the aggregate method' },
    {
      type: 'p',
      text:
        'There is a second method an employer can legally use, called the aggregate method, under Treasury Regulation §31.3402(g)-1(a)(2). Instead of 22% flat, the employer adds the vest to your regular paycheck wages and withholds at your marginal rate as calculated from IRS payroll tables.',
    },
    {
      type: 'p',
      text:
        'For a higher-bracket employee, the aggregate method can withhold at 28%, 32%, or higher on the federal piece. Combined with state and FICA, the total deduction can hit 38–42% on a vest, all perfectly legal and arguably more accurate to your actual tax liability than the 22% flat rule.',
    },
    {
      type: 'callout',
      text:
        'Most companies default to the 22% flat (supplemental) method because it is operationally simpler. A minority use aggregate. Both are legal. Your offer letter and equity plan document will usually specify which.',
    },
    { type: 'h2', text: 'When 35% is actually wrong (the rare cases)' },
    {
      type: 'p',
      text:
        'There are three situations where a 30–35% deduction is genuinely worth a closer look:',
    },
    {
      type: 'ol',
      items: [
        'Wrong state withheld. If you live in a 0% state (TX/FL/WA) and the broker withheld California supplemental anyway, that is a clerical error. Check your employer\'s record of your state of residence on file.',
        'Social Security double-withheld. If you have two jobs and combined wages exceed the SS wage base, the second employer may over-withhold SS. You get the excess back at filing via Form 1040 Schedule 3.',
        'Vest reported as additional payroll wages on top of W-2 boxes that already include it. This is a rare reporting error but possible — verify by tracing the vest gross to YTD payroll, then to Box 1 of your year-end W-2.',
      ],
    },
    {
      type: 'p',
      text:
        'If none of those three apply, the 30–35% is the system working as designed. Annoying, but correct.',
    },
    { type: 'h2', text: 'What to do (instead of fighting HR)' },
    {
      type: 'p',
      text:
        'Withholding is not your final tax. It is a deposit. The IRS reconciles your actual liability when you file the following April:',
    },
    {
      type: 'ul',
      items: [
        'If withholding > actual liability → you get the difference back as a refund.',
        'If withholding < actual liability → you owe the difference plus possibly an underpayment penalty under IRC §6654.',
      ],
    },
    {
      type: 'p',
      text:
        'For most high-bracket employees, 22% flat federal is actually under-withholding (their real marginal rate is 32–37%), which is the more common complaint we see. If your employer used the aggregate method and withheld 28–32% federal instead, you may be closer to break-even at filing — or even slightly over-withheld, in which case you get a refund.',
    },
    { type: 'h2', text: 'How to forecast your actual position before April' },
    {
      type: 'p',
      text:
        'The point of getting this math right during the year is to avoid surprises. Three numbers tell you where you stand:',
    },
    {
      type: 'ol',
      items: [
        'Projected total federal tax for the year. Use last year\'s 1040 line 24 if your income is similar, otherwise estimate from current brackets.',
        'YTD federal withholding + expected withholding through year-end at current pace.',
        'Difference between (1) and (2). If positive, you owe that at filing. If negative, you get refunded.',
      ],
    },
    {
      type: 'p',
      text:
        'Our RSU Tax Shortfall calculator runs this math for any combination of base salary, vest size, state, and filing status. Inputs stay in your browser. If the projected shortfall is over $1,000, add the difference to W-4 line 4(c) over the remaining paychecks — that fixes the underpayment-penalty exposure under §6654 retroactively for the whole year, which a Q4 estimated tax payment does not.',
    },
    { type: 'h2', text: 'The takeaway' },
    {
      type: 'p',
      text:
        '30–35% withheld on an RSU vest is almost always the correct stacking of federal supplemental + state + Medicare + (sometimes) Social Security. The fight is not with HR. The action is to reconcile your projected vs. actual liability for the year, and either let the over-withholding become a refund or top up the under-withholding via W-4 line 4(c) before year-end.',
    },
    {
      type: 'p',
      text:
        'Sources: IRC §3402(g); Treas. Reg. §31.3402(g)-1; IRS Publication 15 and 15-T; IRC §6654 (estimated tax safe harbor); IRC §6621 (underpayment penalty rate).',
    },
  ],
};
