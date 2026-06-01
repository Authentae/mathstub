export const qsbsContent = {
  slug: 'qsbs',
  title: 'QSBS / Section 1202 Exclusion Calculator',
  metaTitle: 'QSBS Calculator (Section 1202) — How Much of Your Gain Is Tax-Free?',
  metaDescription:
    'Free QSBS calculator. Estimate your Section 1202 exclusion, the federal tax you owe vs save, and your effective rate — with the new 2025 (OBBBA) 3/4/5-year tiered exclusion built in.',
  h1: 'QSBS / Section 1202 Exclusion Calculator',
  lede:
    'Qualified Small Business Stock can wipe out federal tax on up to the greater of $15M or 10× your basis in startup-stock gains. Enter your numbers to see how much is excluded, what you’d owe, and what QSBS saves you — under the new 2025 tiered rules.',
  lastUpdated: '2026-06-02',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter proceeds and cost basis',
      text: 'Your total sale proceeds for the shares, and your cost basis (for exercised options, that’s strike price × shares).',
    },
    {
      name: 'Enter how long you held the shares',
      text: 'Whole years since you acquired the shares. For options, the clock starts on the exercise date — not the grant date (IRC §1202; shares, not options, are QSBS).',
    },
    {
      name: 'Pick the issuance era',
      text: 'Stock issued on/after July 4, 2025 uses the OBBBA tiered exclusion (50% at 3 years, 75% at 4, 100% at 5). Earlier stock uses the legacy all-or-nothing 5-year rule.',
    },
    {
      name: 'Read your exclusion, tax, and savings',
      text: 'See the excluded gain, federal tax with vs without QSBS, your effective rate, and any state tax if your state doesn’t conform.',
    },
  ],
  faqs: [
    {
      q: 'What is QSBS / Section 1202?',
      a: 'IRC §1202 lets eligible holders of Qualified Small Business Stock exclude federal tax on the gain when they sell — up to the greater of $15,000,000 or 10× their cost basis, per company. It’s designed to reward funding and building small companies.',
    },
    {
      q: 'What changed in 2025?',
      a: 'The One Big Beautiful Bill Act (OBBBA, signed July 2025) added a tiered holding period for stock issued on or after July 4, 2025: 50% of the gain is excluded at 3 years, 75% at 4 years, and 100% at 5 years. It also raised the per-issuer cap from $10M to $15M and the company gross-assets cap from $50M to $75M. Stock issued before that date keeps the legacy 5-year all-or-nothing rule.',
    },
    {
      q: 'Why is the taxable portion taxed at 28%?',
      a: 'When only part of a QSBS gain is excluded (the 50% and 75% tiers), the included portion is "28%-rate gain" under IRC §1(h)(4) — taxed at a maximum 28%, not the usual 15%/20% long-term rate — plus the 3.8% NIIT. That produces the published effective rates of about 15.9% (3-year), 7.95% (4-year), and 0% (5-year).',
    },
    {
      q: 'Do my stock options qualify?',
      a: 'No — options themselves are never QSBS. Only the actual shares qualify, and your holding period starts on the date you exercise and receive the shares (IRC §1202(c)). Exercising earlier starts the clock earlier, which is the main lever employees control.',
    },
    {
      q: 'Does my company have to be a certain type?',
      a: 'Yes. It must be a US C-corporation in a qualified trade (most product/software businesses qualify; law, accounting, consulting, health, and financial-services firms generally don’t), with aggregate gross assets of $75M or less (was $50M before July 4, 2025) when your shares were issued, and you must have acquired the shares at original issuance.',
    },
    {
      q: 'Will my state tax it anyway?',
      a: 'Maybe. QSBS is a federal exclusion; states decide whether to conform. California and a few others do not — they tax the full gain at state rates even when your federal tax is $0. Enter your state rate to model that; this calculator applies it to the entire gain.',
    },
  ],
  faqsReviewer:
    'Reviewed against IRS primary sources and the OBBBA statute (IRC §1202; §1(h)(4) 28%-rate gain; §1411 NIIT; One Big Beautiful Bill Act of 2025, Pub. L. 119-21). State conformity varies. Educational estimate, not tax advice.',
} as const;
