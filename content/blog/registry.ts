export interface BlogParagraph {
  type: 'p';
  text: string;
}
export interface BlogHeading {
  type: 'h2' | 'h3';
  text: string;
}
export interface BlogList {
  type: 'ul' | 'ol';
  items: string[];
}
export interface BlogQuote {
  type: 'quote';
  text: string;
  cite?: string;
}
export interface BlogCallout {
  type: 'callout';
  text: string;
}
export type BlogBlock = BlogParagraph | BlogHeading | BlogList | BlogQuote | BlogCallout;

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  datePublished: string; // ISO YYYY-MM-DD
  dateModified: string;
  authorName: string;
  reviewerName?: string;
  /**
   * 30-60 word direct answer rendered as a prominent callout immediately
   * below the title. LLMs (ChatGPT, Claude, Perplexity) preferentially lift
   * the first paragraph when summarising or citing — so a clean, self-
   * contained answer here substantially increases the odds the post gets
   * cited verbatim. Also surfaces a snippet to readers who bounce within
   * 3 seconds.
   */
  quickAnswer?: string;
  /**
   * Optional "skim layer" — 3-6 plain-English bullets rendered under the
   * QuickAnswer. Lets a non-reader get the whole post in ~15s while the full
   * body below stays for depth + SEO. Keep each bullet to one scannable line.
   */
  keyPoints?: string[];
  blocks: BlogBlock[];
  /** Suggested affiliate offer to render below content. */
  affiliateOfferIds?: string[];
}

import { whyRsuTooHigh } from './posts/why-rsu-tax-bill-too-high';
import { supplementalRule } from './posts/22-vs-37-supplemental-withholding';
import { estimatedTax } from './posts/estimated-tax-after-rsu-vest';
import { extraW4 } from './posts/extra-w4-withholding-rsu';
import { byState } from './posts/rsu-taxes-by-state';
import { yearEndChecklist } from './posts/year-end-equity-comp-checklist';
import { rsuOverWithholding } from './posts/rsu-over-withholding-explained';
import { rsusTaxedTwice } from './posts/do-rsus-get-taxed-twice';
import { whenToSellRsus } from './posts/when-to-sell-rsus-after-vesting';
import { howMuchTaxOnRsu } from './posts/how-much-tax-on-rsu';
import { howToAvoidRsuTax } from './posts/how-to-avoid-rsu-tax';
import { rsuTaxOffsetPaycheck } from './posts/rsu-tax-offset-paycheck';
import { stockOptionsVsRsusTax } from './posts/stock-options-vs-rsus-tax';
import { howToReportRsuTaxReturn } from './posts/how-to-report-rsu-tax-return';
import { rsuTaxCategoryBox14 } from './posts/rsu-tax-category-box-14';
import { sellToCoverVsNss } from './posts/sell-to-cover-vs-net-share-settlement';
import { earlyExerciseNso83b } from './posts/early-exercise-nso-83b-election';
import { multiStateRsuSourcingCalifornia } from './posts/multi-state-rsu-sourcing-california';
import { doubleTriggerRsuIpo } from './posts/double-trigger-rsu-ipo';
import { esppQualifyingVsDisqualifying } from './posts/espp-qualifying-vs-disqualifying';
import { amtCreditRecoveryForm8801 } from './posts/amt-credit-recovery-form-8801';
import { whyIsMyBonusTaxedAt40 } from './posts/why-is-my-bonus-taxed-at-40';
import { isoDisqualifyingDisposition } from './posts/iso-disqualifying-disposition';
import { megaBackdoorRothEligibility } from './posts/mega-backdoor-roth-eligibility';
import { rsuCostBasisFixForm8949 } from './posts/rsu-cost-basis-fix-form-8949';
import { caTxRsuWorkSourceAllocation } from './posts/ca-tx-rsu-work-source-allocation';
import { priyaAnnualReviewCaseStudy } from './posts/priya-annual-review-case-study';
import { mayaRsuCostBasisCaseStudy } from './posts/maya-rsu-cost-basis-case-study';
import { danielCaTxCaseStudy } from './posts/daniel-ca-tx-case-study';
import { qsbsSection1202 } from './posts/qsbs-section-1202-startup-equity';

export const blogPosts: BlogPost[] = [
  whyRsuTooHigh,
  supplementalRule,
  estimatedTax,
  extraW4,
  byState,
  yearEndChecklist,
  rsuOverWithholding,
  rsusTaxedTwice,
  whenToSellRsus,
  howMuchTaxOnRsu,
  howToAvoidRsuTax,
  rsuTaxOffsetPaycheck,
  stockOptionsVsRsusTax,
  howToReportRsuTaxReturn,
  rsuTaxCategoryBox14,
  sellToCoverVsNss,
  earlyExerciseNso83b,
  multiStateRsuSourcingCalifornia,
  doubleTriggerRsuIpo,
  esppQualifyingVsDisqualifying,
  amtCreditRecoveryForm8801,
  whyIsMyBonusTaxedAt40,
  isoDisqualifyingDisposition,
  megaBackdoorRothEligibility,
  rsuCostBasisFixForm8949,
  caTxRsuWorkSourceAllocation,
  priyaAnnualReviewCaseStudy,
  mayaRsuCostBasisCaseStudy,
  danielCaTxCaseStudy,
  qsbsSection1202,
];

export function findPost(slug: string): BlogPost | undefined {
  return blogPosts.find((p) => p.slug === slug);
}
