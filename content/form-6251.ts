export const form6251Content = {
  slug: 'form-6251',
  title: 'Form 6251 AMT Calculator (Multi-Source)',
  metaTitle: 'Form 6251 AMT Calculator — RSU + ISO + Bonus + 1099 (2026)',
  metaDescription:
    'Free Form 6251 Alternative Minimum Tax calculator for tech workers with mixed income — W-2 RSU wages + ISO bargain element + 1099 self-employment + SALT add-back. Line-by-line walkthrough with the recoverable AMT credit estimate.',
  h1: 'Form 6251 AMT Calculator',
  lede:
    'TurboTax paywalls Form 6251. Brokers do not surface it. Most tech-worker tax tools assume a single income source. This calculator combines W-2 wages (including vested RSUs), 1099 self-employment, ISO bargain element, and SALT add-back into a single Form 6251 walkthrough — with the recoverable AMT credit estimate per IRC §53.',
  lastUpdated: '2026-05-26',
  taxYearDefault: 2026,
  howToSteps: [
    {
      name: 'Enter your W-2 wages',
      text: 'Use W-2 Box 1 — already includes vested RSU income recognized at vest.',
    },
    {
      name: 'Add 1099 self-employment net income (if any)',
      text: 'Net profit from your Schedule C — gross receipts minus business expenses.',
    },
    {
      name: 'Enter your ISO bargain element',
      text: 'For ISOs exercised and held past calendar year-end: (FMV at exercise − strike price) × shares. If you exercised AND sold in the same year (disqualifying), the bargain element flows into your W-2 instead — enter 0 here to avoid double-counting.',
    },
    {
      name: 'Pick standard or itemized deduction',
      text: 'If itemizing, also enter your SALT deduction (capped at $10k under TCJA). SALT is added back as an AMT preference (Form 6251 line 2a).',
    },
    {
      name: 'Read the line-by-line Form 6251 output',
      text: 'AMTI before adjustments, SALT add-back, ISO adjustment, AMT exemption (post-phaseout), tentative minimum tax, AMT owed = max(0, TMT − regular tax), plus the recoverable credit estimate via Form 8801.',
    },
  ],
  faqs: [
    {
      q: 'What is the Alternative Minimum Tax (AMT)?',
      a: "AMT (IRC §§55–59) is a parallel tax system that runs alongside regular income tax. After computing your regular tax on Form 1040, you also compute your Tentative Minimum Tax on Form 6251. If TMT exceeds regular tax, you owe the difference as AMT. For tech workers, the most common AMT trigger is the ISO bargain element — a preference item under IRC §56(b)(3) that adds to AMTI but not to regular taxable income.",
    },
    {
      q: 'When do I owe AMT?',
      a: "When your Tentative Minimum Tax (TMT) > your regular federal income tax. TMT = 26% on AMTI below the rate breakpoint ($245,795 single 2026, $122,898 MFS), plus 28% on the excess, minus the AMT exemption ($90,567 single 2026 before phaseout). Typical triggers: ISO exercise-and-hold during the calendar year, a large state-tax SALT deduction itemized on Schedule A, or both combined.",
    },
    {
      q: 'How does the ISO bargain element trigger AMT?',
      a: "When you exercise ISOs and hold past calendar year-end, the bargain element (FMV at exercise minus strike) is a 'preference item' for AMT under IRC §56(b)(3). It is not included in your regular taxable income (that is the §422 ISO advantage), but it IS added to AMTI on Form 6251 line 2i. A $100k bargain element pushes AMTI up by $100k, often triggering AMT for a tech worker who would have paid no AMT on regular income alone.",
    },
    {
      q: 'How is this different from the Mathstub ISO/AMT calculator?',
      a: "The ISO/AMT calculator is single-source: it isolates the AMT impact of just the ISO bargain element to support exercise-timing decisions. This Form 6251 calculator is multi-source: it combines W-2 wages, 1099 self-employment, ISO bargain element, and SALT add-back into a full Form 6251 calculation matching what your tax software will compute at filing. Use the ISO/AMT calc to decide whether to exercise; use this calc to model your full April tax picture.",
    },
    {
      q: 'What is the recoverable AMT credit?',
      a: "Under IRC §53, AMT paid in a year generates a credit (Form 8801) you can apply against your regular tax in future years — but only to the extent your future regular tax exceeds your future TMT. The credit is only recoverable for 'deferral' items (mainly the ISO bargain element). AMT from 'exclusion' items (SALT add-back, depreciation differences) is permanently lost. This calculator estimates the recoverable portion by computing the ratio of ISO-attributable AMT to total AMT.",
    },
    {
      q: 'Why does SALT get added back for AMT?',
      a: "Federal regular tax lets you deduct state and local taxes paid (capped at $10k post-TCJA, Schedule A line 5e). Federal AMT does NOT allow this deduction — IRC §56(b)(1)(A)(ii) adds it back as an AMT preference. So if you live in a high-tax state (CA, NY, NJ, MA), itemize, and take the full $10k SALT cap, you add $10k back when computing AMTI. This is the second-most-common AMT trigger after ISO exercises.",
    },
    {
      q: 'What about NIIT, FICA, and self-employment tax?',
      a: "Out of scope for v1. Form 6251 only computes federal AMT vs federal regular tax. Net Investment Income Tax (IRC §1411) is a separate 3.8% tax on investment income above thresholds. FICA is wage-based (separate calculator). Self-employment tax is computed on Schedule SE — also separate. This calculator focuses on the AMT vs regular-tax comparison; treat its output as one input to your full April projection.",
    },
    {
      q: 'How accurate is the recoverable AMT credit estimate?',
      a: "It's a planning estimate, not a final number. The Form 8801 calculation depends on the year-by-year regular-tax-vs-TMT spread, which varies with future income, vesting schedule, and what state you live in. For high-precision planning, use the Mathstub AMT Credit Recovery calculator which models a 5-year Form 8801 schedule with year-specific regular tax projections.",
    },
    {
      q: 'My ISO disqualifying disposition same year — do I enter the bargain element here?',
      a: "No — enter 0. When you exercise ISOs and sell in the same calendar year (a disqualifying disposition under IRC §422(a)(1)), the bargain element flows into your W-2 Box 1 as ordinary wages. It is no longer an AMT preference item because it is already in your regular taxable income. Entering it again here would double-count.",
    },
    {
      q: 'State AMT?',
      a: "Out of scope for v1. Only California, Iowa, Minnesota, and Connecticut have a personal AMT that mirrors federal Form 6251. The Mathstub State Stock-Comp Tax Lookup calculator flags which states have state AMT and at what rate. For California specifically, NY (no AMT), MA (no AMT), and TX (no income tax) — check the state lookup.",
    },
    {
      q: 'Is this tax advice?',
      a: "No. It's a planning estimate based on published IRS rules + your inputs. Real AMT calculations depend on facts the v1 calculator does not capture: passive activity adjustments, depreciation differences, tax-exempt interest from private activity bonds, foreign tax credit interactions, NOL carryovers, the AMT LTCG capital-gains worksheet (Form 6251 lines 36+), and state AMT. For high-stakes situations ($10,000+ projected AMT, multi-state, multiple ISO grants) engage a CPA.",
    },
  ],
} as const;
