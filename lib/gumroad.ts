export type GumroadProductId = 'equity-tracker' | 'year-end-checklist' | 'annual-review';

export interface GumroadProduct {
  id: GumroadProductId;
  name: string;
  priceUsd: number;
  url: string;
  /** Matching slug on /toolkit/<slug> — used for the "Learn more" warm-up link in upsells. */
  toolkitSlug: string;
  pitchHeadline: string;
  pitchBody: string;
  /**
   * 3-bullet feature list rendered with check-marks inside the upsell
   * card. Each bullet is one concrete capability — what the buyer
   * actually gets, not marketing adjectives. Three is the sweet spot:
   * enough to feel like a real product, few enough to scan in 2 sec.
   */
  features: readonly [string, string, string];
  /** Lower bound of shortfall this product is best matched to. */
  minShortfallUsd: number;
  /** Upper bound (exclusive) of shortfall this product is best matched to. */
  maxShortfallUsd: number;
}

const GUMROAD_BASE = 'https://gumroad.com/l/';

export const products: Record<GumroadProductId, GumroadProduct> = {
  'year-end-checklist': {
    id: 'year-end-checklist',
    name: 'Year-End Tax Checklist + Calculator Workbook',
    priceUsd: 19,
    url: `${GUMROAD_BASE}bdlfo`,
    toolkitSlug: 'year-end-tax-playbook',
    pitchHeadline: 'Catch the Dec 31 deadlines that cost you money',
    pitchBody:
      'A Notion checklist of every tax-saving action with a hard deadline — 401k top-up, FSA spend-down, HSA, IRA, ESPP cycles, AMT planning. One $19 workbook saves people more than that on a single missed deadline.',
    features: [
      '12-month deadline calendar with 27 hard dates',
      'IRS-cited rule + dollar limit for each action',
      'Bonus: same-day W-4 calculator workbook',
    ],
    minShortfallUsd: 0,
    maxShortfallUsd: 1_500,
  },
  'equity-tracker': {
    id: 'equity-tracker',
    name: 'Equity Comp Tracker',
    priceUsd: 29,
    url: `${GUMROAD_BASE}jqyyp`,
    toolkitSlug: 'equity-comp-decision-tracker',
    pitchHeadline: 'Never get blindsided by another April again',
    pitchBody:
      'Model every RSU vest, ESPP cycle, and ISO exercise for the whole year — with projected tax owed quarter-by-quarter. Built around the same IRC-cited math this calculator runs. Updated every tax year.',
    features: [
      'Per-vest tax projection out 12 months',
      'AMT trigger alert on ISO exercises',
      'Quarterly estimated-tax schedule built in',
    ],
    minShortfallUsd: 1_500,
    maxShortfallUsd: 8_000,
  },
  'annual-review': {
    id: 'annual-review',
    name: 'Tech Worker Annual Financial Review',
    priceUsd: 39,
    url: `${GUMROAD_BASE}jlsppt`,
    toolkitSlug: 'tech-worker-annual-review',
    pitchHeadline: 'A full annual playbook for high earners with equity',
    pitchBody:
      'For people who keep landing in five-figure surprise tax bills: a year-long workbook covering withholding strategy, AMT planning, estimated payments, and year-end moves. If your shortfall is $8k+, you need this view — not just one calculator.',
    features: [
      'Withholding strategy by income tier',
      'AMT credit recovery multi-year planner',
      'Decision tree for ISO vs early-exercise',
    ],
    minShortfallUsd: 8_000,
    maxShortfallUsd: Number.POSITIVE_INFINITY,
  },
};

export function bestProductForShortfall(shortfallUsd: number): GumroadProduct {
  const s = Math.max(0, shortfallUsd);
  return (
    Object.values(products).find(
      (p) => s >= p.minShortfallUsd && s < p.maxShortfallUsd,
    ) ?? products['equity-tracker']
  );
}
