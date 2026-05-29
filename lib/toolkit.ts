/**
 * Mathstub Notion Toolkit — single source of truth for the 4 paid templates.
 *
 * Drives /toolkit, /toolkit/[slug], the footer ecosystem grid, and Product
 * JSON-LD. The cover.png, trust-whats-inside.jpg, and trust-why-trust.jpg
 * assets live under public/toolkit/ and are produced by:
 *   - scripts/generate-notion-covers.mjs   (cover.png)
 *   - scripts/generate-trust-media.mjs     (trust-*.jpg)
 *
 * NO React/Next/DOM imports here — this is data + types only.
 */

export interface ToolkitFeature {
  /** Short bold headline shown on the detail page. */
  title: string;
  /** One-line elaboration. */
  body: string;
}

export interface ToolkitProduct {
  /** URL-safe slug, used for /toolkit/<slug>. */
  slug: string;
  /** Marketing title (no emoji). */
  title: string;
  /** With-emoji label used in the footer card. */
  labelWithEmoji: string;
  /** Price (display string with $). */
  price: string;
  /** USD numeric price (for Product schema). */
  priceUsd: number;
  /** Accent colour used in the trust media — for visual consistency on the detail page. */
  accent: 'amber' | 'brand' | 'violet' | 'emerald';
  /** One-line subtitle shown on the index card. */
  shortSub: string;
  /** Two-to-three-line elevator pitch for the detail page hero. */
  elevatorPitch: string;
  /** Worked example callout — the "X dollars saved" line that anchors the page. */
  workedExampleHeadline: string;
  workedExampleBody: string;
  /** "What's inside" feature list — 6 entries to match the trust-whats-inside.jpg grid. */
  whatsInside: ToolkitFeature[];
  /** "Who this is for" / audience match. */
  goodFitBullets: string[];
  badFitBullets: string[];
  /** Direct Gumroad URL — the buy-now CTA. */
  gumroadUrl: string;
  /** Asset paths under public/. */
  cover: string;
  whatsInsideImage: string;
  whyTrustImage: string;
}

export const TOOLKIT_PRODUCTS: ToolkitProduct[] = [
  {
    slug: 'year-end-tax-playbook',
    title: 'Year-End Tax Playbook',
    labelWithEmoji: '📅 Year-End Tax Playbook',
    price: '$19',
    priceUsd: 19,
    accent: 'amber',
    shortSub: '27 IRS deadlines · ICS calendar export · CPA brief',
    elevatorPitch:
      'The dated decision calendar tech workers run from Oct 1 to Apr 15. Every IRS deadline that matters, the cost of missing each one, an ICS file you can import into your calendar in 30 seconds, and a 1-page brief that saves billable CPA time.',
    workedExampleHeadline: 'Catches the $1,400 4Q underpayment penalty before it lands',
    workedExampleBody:
      'Most tech workers blow past the §6654 safe harbor by accident — bonus or vest checks in November, no W-4 4(c) adjustment. This Playbook flags it at Q3 (Sep 15) when there is still time to fix it via withholding, not penalty.',
    whatsInside: [
      { title: '27-deadline calendar', body: 'IRS §, $ cost-of-missing per row' },
      { title: 'ICS export', body: 'Import all 27 to Google / Apple / Outlook' },
      { title: 'W-4 4(c) workbook', body: 'Shortfall ÷ pay-periods math, 3 scenarios' },
      { title: '17-row tax-doc inventory', body: 'Every W-2 / 1099 / K-1 / 3921 / 3922' },
      { title: 'Scenario cookbook', body: '8 recipes for the most-common situations' },
      { title: 'CPA brief', body: '1-page printable, saves billable time' },
    ],
    goodFitBullets: [
      'W-2 tech worker with at least one bonus or vest event per year',
      'Anyone who has been surprised at tax-filing time by a withholding shortfall',
      'High earners who want the dated checklist instead of "I will figure it out in March"',
    ],
    badFitBullets: [
      'Pure 1099 / self-employed (use a quarterly-only flow instead — partial overlap)',
      'You want tax-filing software (this is the calendar + brief, not Form 1040 prep)',
    ],
    gumroadUrl: 'https://earthbound58.gumroad.com/l/bdlfo',
    cover: '/toolkit/year-end-tax-playbook.png',
    whatsInsideImage: '/toolkit/whats-inside/year-end-tax-playbook.jpg',
    whyTrustImage: '/toolkit/why-trust/year-end-tax-playbook.jpg',
  },
  {
    slug: 'equity-comp-decision-tracker',
    title: 'Equity Comp Decision Tracker',
    labelWithEmoji: '📈 Equity Comp Decision Tracker',
    price: '$29',
    priceUsd: 29,
    accent: 'brand',
    shortSub: 'RSU + ESPP + ISO + NSO + 4-year projection grid',
    elevatorPitch:
      'Your broker tracks your shares. Your W-2 tracks your wages. Nothing tracks the decision math — until now. A single Notion workspace that holds every grant, vest, sale, and exercise, projects the 4-year tax picture across every line type, and walks the cost-basis fix on every 1099-B that hits in February.',
    workedExampleHeadline: 'Maya catches $2,574 of RSU cost-basis double-tax on a single sale',
    workedExampleBody:
      'The broker reports cost basis = $0 on 1099-B. Without the Form 8949 column (g) fix, the IRS taxes the same dollars twice (once as W-2 wages at vest, again as capital gain at sale). This Tracker writes the adjustment for you — typical 100-share sale: $2,500 saved.',
    whatsInside: [
      { title: '4-year tax projection grid', body: '48-month W-2 + RSU + AMT + cumulative' },
      { title: 'RSU cost-basis fix kit', body: 'Stops TurboTax double-taxing your sales' },
      { title: 'AMT credit recovery calendar', body: 'Multi-year Form 8801 scheduler' },
      { title: 'CPA brief (2-page)', body: 'Saves the first 30 min of the meeting' },
      { title: '10-recipe scenario cookbook', body: 'From first vest to leaving the company' },
      { title: '7 live databases + 4 examples', body: 'Grants, vests, sales, exercises pre-filled' },
    ],
    goodFitBullets: [
      'Tech worker with active RSU + ESPP + ISO/NSO exposure',
      'Anyone who has been confused by a 1099-B from Schwab / E*Trade / Fidelity',
      'Pre-IPO or post-IPO employees managing a multi-year vesting cliff',
    ],
    badFitBullets: [
      'Pure salary, no equity (use the Year-End Playbook instead)',
      'Multi-state mid-vest moves (you also want the Multi-State Planner)',
    ],
    gumroadUrl: 'https://earthbound58.gumroad.com/l/jqyyp',
    cover: '/toolkit/equity-comp-decision-tracker.png',
    whatsInsideImage: '/toolkit/whats-inside/equity-comp-decision-tracker.jpg',
    whyTrustImage: '/toolkit/why-trust/equity-comp-decision-tracker.jpg',
  },
  {
    slug: 'tech-worker-annual-review',
    title: 'Tech Worker Annual Review',
    labelWithEmoji: '🎯 Tech Worker Annual Review',
    price: '$39',
    priceUsd: 39,
    accent: 'violet',
    shortSub: '90-min year-end review for $200k–$700k earners',
    elevatorPitch:
      'The 90-minute year-end review a $200k+ earner with equity should run before December 31. Withholding strategy by income tier, AMT credit recovery, ISO vs. early-exercise decision tree, concentration policy, and a 24-question CPA-and-planner script you can print and bring.',
    workedExampleHeadline: 'Priya finds $11.3k of cash + $77k of tax-shelter in one sitting',
    workedExampleBody:
      'Senior engineer, $310k MFJ NY. Ran the review October 15. Outcome: corrected withholding shortfall before Q4 (saved $1,400 penalty), pulled forward $77k of mega-backdoor Roth capacity she did not know existed, and stopped accidentally compounding state AMT exposure on her ISO exercise.',
    whatsInside: [
      { title: 'Withholding strategy', body: 'Exact W-4 4(c) per gross + filing status' },
      { title: 'AMT credit recovery', body: 'Multi-year planner — turn AMT into refund' },
      { title: 'ISO vs. early-exercise', body: 'Decision tree with §83(b) threshold math' },
      { title: 'Concentration policy', body: 'Risk-band table + exchange-fund tactic' },
      { title: '6-recipe scenario cookbook', body: '$300k+ tier, pre-IPO, FIRE, MFJ couples' },
      { title: '24-question CPA + planner script', body: "Both pros' angles, 30-sec answers" },
    ],
    goodFitBullets: [
      '$200k–$700k W-2 earner with material equity comp',
      'Pre-IPO or post-IPO employee who wants the full year-end checklist in one place',
      'FIRE-track or MFJ couples thinking about capacity, not just compliance',
    ],
    badFitBullets: [
      'Under $200k gross — too much horsepower for the situation',
      'Pure 1099 / business owner — different tax surface (S-corp, QBI, etc.)',
    ],
    gumroadUrl: 'https://earthbound58.gumroad.com/l/jlsppt',
    cover: '/toolkit/tech-worker-annual-review.png',
    whatsInsideImage: '/toolkit/whats-inside/tech-worker-annual-review.jpg',
    whyTrustImage: '/toolkit/why-trust/tech-worker-annual-review.jpg',
  },
  {
    slug: 'multi-state-equity-planner',
    title: 'Multi-State Equity Comp Tax Planner',
    labelWithEmoji: '🗺️ Multi-State Equity Comp Tax Planner',
    price: '$49',
    priceUsd: 49,
    accent: 'emerald',
    shortSub: 'CA→TX work-source allocation + NY convenience rule + move ROI',
    elevatorPitch:
      'For tech workers who moved states mid-vest. California does not stop taxing your RSUs when you move. New York can claim 100% of your remote income via the convenience-of-employer rule. This planner walks the work-source math vest-by-vest, decodes the NY trap, and projects move ROI net of state-tax savings.',
    workedExampleHeadline: "Daniel finds $34,000 of CA tax he didn't know he still owed",
    workedExampleBody:
      'CA→TX move in August 2024, 1,600 unvested RSUs from a 2022 grant. Daniel assumed Texas residency meant no state tax. The work-source allocation rule (FTB Pub 1004) says CA still taxes the vesting period he physically worked there — $34k across 2024–2026. Caught in October, fixable via quarterly estimates → avoided $1,400 in §19136 penalties.',
    whatsInside: [
      { title: 'Work-source allocation calculator', body: 'Pro-rate every vest across vesting states' },
      { title: 'NY convenience decoder', body: '7 states + 4 paths to defeat the claim' },
      { title: '4-year residency + vest matrix', body: 'Which state taxes which future dollar' },
      { title: 'Move ROI calculator', body: 'After-tax savings with breakeven heuristic' },
      { title: 'State AMT decoder', body: 'CA / IA / MN / CT triggers + recovery' },
      { title: '8-recipe scenario cookbook', body: 'CA→TX, NY→FL, dual-state, statutory traps' },
    ],
    goodFitBullets: [
      'Tech worker who moved (or is considering moving) across state lines mid-vest',
      'Remote worker with employer in NY / CA / NJ / MA / OR + residence elsewhere',
      'Anyone projecting a CA→TX, CA→NV, NY→FL, or similar zero-tax-state move',
    ],
    badFitBullets: [
      'Single-state W-2 worker — overkill (use the Equity Comp Decision Tracker)',
      'You want filing software — this is the brief you bring to your multi-state CPA',
    ],
    gumroadUrl: 'https://earthbound58.gumroad.com/l/athsk',
    cover: '/toolkit/multi-state-equity-planner.png',
    whatsInsideImage: '/toolkit/whats-inside/multi-state-equity-planner.jpg',
    whyTrustImage: '/toolkit/why-trust/multi-state-equity-planner.jpg',
  },
];

export function getToolkitProduct(slug: string): ToolkitProduct | undefined {
  return TOOLKIT_PRODUCTS.find((p) => p.slug === slug);
}

export function toolkitSlugs(): string[] {
  return TOOLKIT_PRODUCTS.map((p) => p.slug);
}

/** Tailwind classes per accent — keeps the design consistent on the detail page. */
export function accentClasses(accent: ToolkitProduct['accent']) {
  switch (accent) {
    case 'amber':
      return {
        ring: 'ring-amber-400/40',
        text: 'text-amber-700 dark:text-amber-300',
        bg: 'bg-amber-500/10',
        border: 'border-amber-500/30',
        dot: 'bg-amber-500',
      };
    case 'brand':
      return {
        ring: 'ring-brand-500/40',
        text: 'text-brand-700 dark:text-brand-300',
        bg: 'bg-brand-500/10',
        border: 'border-brand-500/30',
        dot: 'bg-brand-500',
      };
    case 'violet':
      return {
        ring: 'ring-violet-400/40',
        text: 'text-violet-700 dark:text-violet-300',
        bg: 'bg-violet-500/10',
        border: 'border-violet-500/30',
        dot: 'bg-violet-500',
      };
    case 'emerald':
      return {
        ring: 'ring-emerald-400/40',
        text: 'text-emerald-700 dark:text-emerald-300',
        bg: 'bg-emerald-500/10',
        border: 'border-emerald-500/30',
        dot: 'bg-emerald-500',
      };
  }
}

export function productSchema(p: ToolkitProduct, siteUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: p.title,
    description: p.elevatorPitch,
    image: `${siteUrl}${p.cover}`,
    brand: { '@type': 'Brand', name: 'Mathstub' },
    offers: {
      '@type': 'Offer',
      url: p.gumroadUrl,
      priceCurrency: 'USD',
      price: String(p.priceUsd),
      availability: 'https://schema.org/InStock',
      seller: { '@type': 'Organization', name: 'Mathstub' },
      // Digital download — no physical shipping, so the rate is $0 with no
      // handling/transit time. Declaring this resolves Google's "missing
      // shippingDetails" Merchant-listing suggestion honestly.
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: {
          '@type': 'MonetaryAmount',
          value: '0',
          currency: 'USD',
        },
        shippingDestination: {
          '@type': 'DefinedRegion',
          addressCountry: 'US',
        },
        deliveryTime: {
          '@type': 'ShippingDeliveryTime',
          handlingTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
          transitTime: { '@type': 'QuantitativeValue', minValue: 0, maxValue: 0, unitCode: 'DAY' },
        },
      },
      // Matches the money-back guarantee already stated on the product page
      // (a 14-day floor). 14-day, free, finite window.
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'US',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 14,
        returnMethod: 'https://schema.org/ReturnByMail',
        returnFees: 'https://schema.org/FreeReturn',
      },
    },
  };
}
