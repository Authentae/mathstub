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
  faq,
  related,
  reportIssueContext,
  amazonQuery,
  calcSlug,
}: Props) {
  return (
    <div className="mx-auto grid max-w-5xl gap-8 px-4 py-8 lg:grid-cols-[1fr_300px]">
      <main className="min-w-0">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">{title}</h1>
        <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">{lede}</p>
        {meta && <div className="mt-2">{meta}</div>}

        <section className="mt-6">{toolUi}</section>
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
  );
}
