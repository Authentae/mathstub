export const rsuCostBasisContent = {
  slug: 'rsu-cost-basis',
  title: 'RSU Cost Basis Correction Calculator',
  metaTitle: 'RSU Cost Basis $0 on Your 1099-B? Fix the Double Tax (Form 8949)',
  metaDescription:
    'Brokers report $0 cost basis on RSU sales, taxing income already on your W-2 a second time. Free calculator shows your correct basis, the tax you would overpay, and the exact Form 8949 fix.',
  h1: 'RSU Cost Basis Correction Calculator',
  lede:
    'Your broker’s 1099-B often shows $0 cost basis on RSU shares — but you already paid ordinary-income tax on their value at vest. File off that $0 and you pay tax twice. See your correct basis and the Form 8949 fix below.',
  lastUpdated: '2026-05-29',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter shares sold and FMV at vest',
      text: 'How many shares you sold, and the fair-market value per share on the day they vested. That FMV is your real cost basis (IRC §83(a)).',
    },
    {
      name: 'Enter the sale price and the basis your broker reported',
      text: 'The price per share you sold at, plus the cost basis shown in box 1e of your 1099-B — for RSUs this is usually $0.',
    },
    {
      name: 'Pick holding period, filing status, and income',
      text: 'Held more than a year after vest is long-term; otherwise short-term. Your income sets the capital-gains rate and whether NIIT applies.',
    },
    {
      name: 'Read your overpayment and the Form 8949 fix',
      text: 'See the tax you would overpay without correcting basis, and the exact column (g) adjustment with code B to enter.',
    },
  ],
  faqs: [
    {
      q: 'Why does my 1099-B show $0 cost basis for RSUs?',
      a: 'Under IRC §6045(g) brokers report only the basis from what you paid to acquire the shares. RSUs are acquired for $0 cash, so box 1e is frequently $0 — even though your real basis is the fair-market value at vest, which was already included in your W-2 wages (IRS Pub 550, Pub 551).',
    },
    {
      q: 'How does this double-tax me?',
      a: 'The FMV of the shares at vest is ordinary income on your W-2 under IRC §83(a) — you already paid wage tax on it. If you then report the sale with a $0 basis, that same value is taxed a second time as a capital gain. The fix prevents the second tax.',
    },
    {
      q: 'How do I actually fix it?',
      a: 'On Form 8949, report the proceeds and the basis your broker reported (box 1e), then enter adjustment code B in column (f) and a negative adjustment in column (g) that raises your basis to the FMV at vest. See the IRS Form 8949 Instructions. This calculator shows the exact column (g) figure.',
    },
    {
      q: 'What is my correct cost basis?',
      a: 'The fair-market value per share on the vest date multiplied by the number of shares (IRC §83(a); IRS Pub 525). You can usually find the per-share vest price on your vest confirmation, a pay stub, or your broker’s supplemental (not the official 1099-B) statement.',
    },
    {
      q: 'Does the 3.8% NIIT apply?',
      a: 'It can. The Net Investment Income Tax (IRC §1411) adds 3.8% on investment income — including capital gains — once modified AGI exceeds $200,000 (single) or $250,000 (married filing jointly). This calculator estimates that portion using your income as a MAGI proxy.',
    },
    {
      q: 'Can I fix prior years where I already overpaid?',
      a: 'Generally yes — you can amend an open year with Form 1040-X, usually within three years of filing. This is an educational estimate, not tax advice; confirm your specific situation with a CPA before amending.',
    },
  ],
  faqsReviewer:
    'Reviewed against IRS primary sources (IRC §83(a), §6045(g), §1411; IRS Form 8949 Instructions; Pub 525, Pub 550, Pub 551).',
} as const;
