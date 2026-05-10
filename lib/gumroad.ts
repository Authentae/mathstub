export type GumroadProductId = 'equity-tracker' | 'year-end-checklist' | 'annual-review';

export interface GumroadProduct {
  id: GumroadProductId;
  name: string;
  priceUsd: number;
  url: string;
  pitchHeadline: string;
  pitchBody: string;
  /** Lower bound of shortfall this product is best matched to. */
  minShortfallUsd: number;
  /** Upper bound (exclusive) of shortfall this product is best matched to. */
  maxShortfallUsd: number;
}

const GUMROAD_BASE = 'https://authentae.gumroad.com/l/';

export const products: Record<GumroadProductId, GumroadProduct> = {
  'year-end-checklist': {
    id: 'year-end-checklist',
    name: 'Year-End Tax Checklist + Calculator Workbook',
    priceUsd: 19,
    url: `${GUMROAD_BASE}bdlfo`,
    pitchHeadline: 'Catch the Dec 31 deadlines that cost you money',
    pitchBody:
      'A Notion checklist of every tax-saving action with a hard deadline (401k top-up, FSA spend-down, HSA, IRA, ESPP cycles, AMT planning). One $19 workbook saves people more than that on a single missed deadline.',
    minShortfallUsd: 0,
    maxShortfallUsd: 1_500,
  },
  'equity-tracker': {
    id: 'equity-tracker',
    name: 'Equity Comp Tracker',
    priceUsd: 29,
    url: `${GUMROAD_BASE}jqyyp`,
    pitchHeadline: 'Track every vest, exercise, and tax event all year',
    pitchBody:
      'Notion template that models RSU vests, ESPP cycles, ISO exercises, and projected tax owed quarter-by-quarter — so the next April surprise doesn\'t happen. Built around the same math this calculator runs.',
    minShortfallUsd: 1_500,
    maxShortfallUsd: 8_000,
  },
  'annual-review': {
    id: 'annual-review',
    name: 'Tech Worker Annual Financial Review',
    priceUsd: 39,
    url: `${GUMROAD_BASE}jlsppt`,
    pitchHeadline: 'A full annual playbook for high earners with equity',
    pitchBody:
      'For people who keep landing in surprise tax bills: the workbook that walks the full year — withholding strategy, AMT planning, estimated payments, end-of-year moves. If your shortfall is $8k+, you need this view, not just one calculator.',
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
