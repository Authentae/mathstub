import { type ReactNode } from 'react';
import { AdSlot } from './AdSlot';
import { AmazonBookCTA } from './AmazonBookCTA';
import { ReportIssue } from './ReportIssue';
import { RelatedGuides } from './RelatedGuides';

interface Props {
  title: string;
  lede: string;
  meta?: ReactNode;
  toolUi: ReactNode;
  resultsSlot?: ReactNode;
  affiliateSlot?: ReactNode;
  howItWorks?: ReactNode;
  /**
   * Optional wide-width section rendered BEFORE the constrained main
   * column. Used for the formula-chain MathDiagram which needs to read
   * at full page width (~1100px), not the ~692px the main column
   * provides once the sidebar takes its 300px share. Earth: "can't you
   * make this part as big as landing hero animation?"
   */
  fullWidthDiagram?: ReactNode;
  faq?: ReactNode;
  related?: ReactNode;
  /** Slug or label used by ReportIssue for the prefilled email subject. */
  reportIssueContext?: string;
  /** Override the Amazon CTA search query — defaults to evergreen tax-book query. */
  amazonQuery?: string;
  /** Calculator slug — when supplied, surfaces related blog posts automatically. */
  calcSlug?: string;
}

export function ToolShell({
  title,
  lede,
  meta,
  toolUi,
  resultsSlot,
  affiliateSlot,
  howItWorks,
  fullWidthDiagram,
  faq,
  related,
  reportIssueContext,
  amazonQuery,
  calcSlug,
}: Props) {
  return (
    <>
      <div className="mx-auto grid max-w-5xl gap-8 px-4 py-6 lg:grid-cols-[1fr_300px]">
      <main className="min-w-0">
        {/*
          Tightened above-the-fold: H1 + 1-line lede + inline meta, no
          stacked spacing. Goal is to keep the calculator form in viewport 1
          on a typical 13" laptop. The longer marketing lede is intentionally
          dropped — searchers landed here because their query matched. They
          want the form, not a pitch.
        */}
        <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100 sm:text-3xl">{title}</h1>
        <p className="mt-1 text-base text-gray-700 dark:text-gray-300">{lede}</p>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-gray-500 dark:text-gray-400">
          <span>⚡ 30 seconds</span>
          <span>🔒 Runs in your browser</span>
          <span>✓ Free, no signup</span>
          {meta && <span className="ml-auto">{meta}</span>}
        </div>

        <section className="mt-4">{toolUi}</section>
        {resultsSlot && <section className="mt-6">{resultsSlot}</section>}
        {affiliateSlot && <section className="mt-6">{affiliateSlot}</section>}

        <AdSlot slot="inContent" className="my-6" />

        {howItWorks && (
          <section id="how-it-works" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">How it works</h2>
            <div className="mt-3 text-gray-700 dark:text-gray-300">{howItWorks}</div>
          </section>
        )}
        {faq && (
          <section id="faq" className="mt-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Frequently asked questions
            </h2>
            <div className="mt-3">{faq}</div>
          </section>
        )}
        {related && <section className="mt-8">{related}</section>}

        {calcSlug && <RelatedGuides calcSlug={calcSlug} />}

        <AmazonBookCTA query={amazonQuery} />
        <ReportIssue context={reportIssueContext} />
      </main>

      <aside className="hidden lg:block">
        <AdSlot slot="sidebar" />
      </aside>
    </div>

    {/*
      Full-width diagram band — renders AFTER the constrained main
      column so the calculator + result + "How it works" prose come
      first, then the wide formula-chain diagram acts as a closing
      visual companion to the prose. Sits at max-w-6xl (~1152px, same
      as the homepage hero animation) so the SVG isn't squeezed into
      the post-sidebar ~692px slot.
    */}
    {fullWidthDiagram && (
      <section className="mx-auto max-w-6xl px-4 pb-12 sm:px-6">
        <h2 className="mb-4 flex items-baseline gap-3 text-2xl font-bold leading-none tracking-tight text-slate-100 sm:text-3xl">
          <span
            aria-hidden="true"
            className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_12px_rgb(59,130,246)]"
          />
          How the math flows
        </h2>
        {fullWidthDiagram}
      </section>
    )}
    </>
  );
}
