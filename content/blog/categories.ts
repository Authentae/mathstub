/**
 * Topic-cluster mapping for the blog index page. Each post is assigned to
 * exactly one category. Categories are rendered as separate sections on
 * /blog, plus a category chip on each post card.
 *
 * Adding a new post requires adding its slug to one of the category lists
 * below. The blog-categories.test.ts file enforces that every registered
 * blog post belongs to exactly one category — a missing-or-duplicate
 * assignment fails the test suite.
 */

export interface BlogCategory {
  /** URL-safe id (kebab-case). */
  id: string;
  /** Display name. */
  name: string;
  /** One-sentence description rendered under the category heading. */
  blurb: string;
  /** Post slugs in this category. */
  slugs: string[];
}

export const blogCategories: BlogCategory[] = [
  {
    id: 'rsu-basics',
    name: 'RSU basics',
    blurb:
      'The 22% supplemental withholding gap, double-taxation myth, vest mechanics, and the questions everyone googles after their first vest.',
    slugs: [
      'why-rsu-tax-bill-too-high',
      'how-much-tax-will-i-pay-on-rsu',
      'do-rsus-get-taxed-twice',
      'rsu-over-withholding-explained',
      'when-to-sell-rsus-after-vesting',
      'how-to-avoid-rsu-tax',
    ],
  },
  {
    id: 'paystub-w2',
    name: 'Paystub & W-2 mechanics',
    blurb:
      'Decoding the strange line items on your paystub and W-2 — the RSU tax offset, Box 14 codes, and the sell-to-cover vs net-share-settlement withholding mechanic.',
    slugs: [
      'rsu-tax-offset-paycheck',
      'rsu-tax-category-box-14-w2',
      'sell-to-cover-vs-net-share-settlement-rsu',
    ],
  },
  {
    id: 'stock-options',
    name: 'Stock options (ISO / NSO)',
    blurb:
      'ISOs, NSOs, AMT, the §83(b) early-exercise election, and AMT credit recovery — the full equity-options tax cluster.',
    slugs: [
      'stock-options-vs-rsus-tax',
      'early-exercise-nso-83b-election',
      'iso-disqualifying-disposition-tax',
      'amt-credit-recovery-form-8801',
    ],
  },
  {
    id: 'espp',
    name: 'ESPP',
    blurb:
      'Employee Stock Purchase Plan tax math — qualifying vs disqualifying disposition timing under IRC §423.',
    slugs: [
      'espp-qualifying-vs-disqualifying-disposition',
    ],
  },
  {
    id: 'bonus-supplemental',
    name: 'Bonus & supplemental wages',
    blurb:
      'The 22%/37% supplemental withholding rule that applies to bonuses, RSU vests, and NSO exercises alike.',
    slugs: [
      'why-is-my-bonus-taxed-at-40-percent',
      '22-vs-37-supplemental-withholding',
    ],
  },
  {
    id: 'filing-strategy',
    name: 'Filing & withholding strategy',
    blurb:
      'How to fix the shortfall before April: W-4 line 4(c), IRC §6654 safe harbor, quarterly estimates, Form 8949 cost-basis adjustments, and the year-end checklist.',
    slugs: [
      'extra-w4-withholding-rsu',
      'estimated-tax-after-rsu-vest',
      'how-to-report-rsu-tax-return',
      'year-end-equity-comp-checklist',
      'rsu-cost-basis-fix-form-8949',
      'mega-backdoor-roth-eligibility',
      'priya-annual-review-case-study',
    ],
  },
  {
    id: 'multi-state-ipo',
    name: 'Multi-state moves & IPO events',
    blurb:
      'State-residency sourcing rules, California workday allocation, and the double-trigger lockup tax bomb at IPO.',
    slugs: [
      'rsu-taxes-by-state',
      'multi-state-rsu-sourcing-california',
      'double-trigger-rsu-ipo-tax',
      'ca-tx-rsu-work-source-allocation',
    ],
  },
];

/** Returns the category an individual post belongs to, or undefined. */
export function findCategoryForSlug(slug: string): BlogCategory | undefined {
  return blogCategories.find((c) => c.slugs.includes(slug));
}
