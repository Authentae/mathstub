/**
 * Manual relevance graph: which other blog posts and which calculators
 * relate to each post. Drives RelatedPosts + CalcCta cross-linking on every
 * blog post, and the reverse blog->calc surfacing on calculator pages.
 *
 * Keep this graph dense — every post should point at 2-3 sibling posts and
 * 1-2 relevant calculators. Google reads internal links as topical-cluster
 * signals; the denser the graph, the stronger the cluster authority.
 */

export interface BlogRelations {
  /** Other blog post slugs to surface at the bottom of this post. */
  posts: string[];
  /** Calculator slugs that solve the math discussed in this post. */
  calcs: string[];
}

export const blogRelations: Record<string, BlogRelations> = {
  'why-rsu-tax-bill-too-high': {
    posts: [
      'rsu-over-withholding-explained',
      '22-vs-37-supplemental-withholding',
      'estimated-tax-after-rsu-vest',
    ],
    calcs: ['rsu-tax-shortfall', 'quarterly-estimated-tax'],
  },
  '22-vs-37-supplemental-withholding': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'rsu-over-withholding-explained',
      'extra-w4-withholding-rsu',
    ],
    calcs: ['rsu-tax-shortfall', 'bonus-tax-shortfall'],
  },
  'estimated-tax-after-rsu-vest': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'extra-w4-withholding-rsu',
      'year-end-equity-comp-checklist',
    ],
    calcs: ['quarterly-estimated-tax', 'rsu-tax-shortfall'],
  },
  'extra-w4-withholding-rsu': {
    posts: [
      'estimated-tax-after-rsu-vest',
      'rsu-over-withholding-explained',
      'why-rsu-tax-bill-too-high',
    ],
    calcs: ['rsu-tax-shortfall', 'quarterly-estimated-tax'],
  },
  'rsu-taxes-by-state': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'when-to-sell-rsus-after-vesting',
      'do-rsus-get-taxed-twice',
    ],
    calcs: ['state-stock-comp', 'rsu-tax-shortfall'],
  },
  'year-end-equity-comp-checklist': {
    posts: [
      'estimated-tax-after-rsu-vest',
      'extra-w4-withholding-rsu',
      'when-to-sell-rsus-after-vesting',
    ],
    calcs: ['rsu-tax-shortfall', 'iso-amt', 'quarterly-estimated-tax'],
  },
  'rsu-over-withholding-explained': {
    posts: [
      'why-rsu-tax-bill-too-high',
      '22-vs-37-supplemental-withholding',
      'do-rsus-get-taxed-twice',
    ],
    calcs: ['rsu-tax-shortfall', 'bonus-tax-shortfall'],
  },
  'do-rsus-get-taxed-twice': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'when-to-sell-rsus-after-vesting',
      'rsu-over-withholding-explained',
    ],
    calcs: ['rsu-tax-shortfall', 'state-stock-comp'],
  },
  'when-to-sell-rsus-after-vesting': {
    posts: [
      'do-rsus-get-taxed-twice',
      'rsu-taxes-by-state',
      'year-end-equity-comp-checklist',
    ],
    calcs: ['rsu-tax-shortfall', 'iso-amt', 'espp-qualifying-disposition'],
  },
  'how-much-tax-will-i-pay-on-rsu': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'rsu-over-withholding-explained',
      'rsu-taxes-by-state',
    ],
    calcs: ['rsu-tax-shortfall', 'state-stock-comp', 'quarterly-estimated-tax'],
  },
  'how-to-avoid-rsu-tax': {
    posts: [
      'when-to-sell-rsus-after-vesting',
      'year-end-equity-comp-checklist',
      'rsu-taxes-by-state',
    ],
    calcs: ['rsu-tax-shortfall', 'state-stock-comp'],
  },
  'rsu-tax-offset-paycheck': {
    posts: [
      'why-rsu-tax-bill-too-high',
      'rsu-over-withholding-explained',
      'do-rsus-get-taxed-twice',
    ],
    calcs: ['rsu-tax-shortfall'],
  },
  'stock-options-vs-rsus-tax': {
    posts: [
      'do-rsus-get-taxed-twice',
      'when-to-sell-rsus-after-vesting',
      'how-to-avoid-rsu-tax',
    ],
    calcs: ['rsu-tax-shortfall', 'iso-amt', 'nso-exercise', 'amt-credit-recovery'],
  },
  'how-to-report-rsu-tax-return': {
    posts: [
      'do-rsus-get-taxed-twice',
      'rsu-tax-offset-paycheck',
      'year-end-equity-comp-checklist',
    ],
    calcs: ['rsu-tax-shortfall', 'quarterly-estimated-tax'],
  },
};

/** Reverse index: for a given calculator slug, which blog posts discuss it. */
export function postsForCalc(calcSlug: string): string[] {
  const matches: string[] = [];
  for (const [postSlug, rel] of Object.entries(blogRelations)) {
    if (rel.calcs.includes(calcSlug)) matches.push(postSlug);
  }
  return matches;
}
