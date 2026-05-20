import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, canonical } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ReportIssue } from '@/components/ReportIssue';
import { glossary } from '@/content/glossary';
import { findTool } from '@/lib/tools';

export const metadata: Metadata = buildMetadata({
  slug: 'glossary',
  title: 'Equity comp tax glossary — RSU, ISO, NSO, ESPP, AMT, FICA, and more',
  description:
    'Plain-language definitions of every equity-compensation tax term used on Mathstub, with the IRC section or IRS publication that controls each one. RSU, ISO, NSO, ESPP, AMT, NIIT, FICA, 83(b), and 30+ more.',
  ogImagePath: '/og/glossary.png',
});

export default function GlossaryPage() {
  const url = canonical('glossary');

  // Build a DefinedTermSet schema so Google can surface individual term
  // definitions in rich results / AI Overview answers.
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'DefinedTermSet',
    name: 'Equity Compensation Tax Glossary',
    description:
      'Definitions of equity-comp tax terms used on Mathstub, with statutory citations.',
    url,
    hasDefinedTerm: glossary.map((g) => ({
      '@type': 'DefinedTerm',
      name: g.term,
      termCode: g.slug,
      description: g.definition,
      url: `${url}#${g.slug}`,
    })),
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={schema} />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Equity comp tax glossary
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        Plain-language definitions of the {glossary.length} tax terms we use
        across the calculators and blog. Each entry cites the controlling IRC
        section or IRS publication.
      </p>

      {/* Quick A-Z index */}
      <nav
        aria-label="Glossary index"
        className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Jump to a term
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          {glossary.map((g) => (
            <li key={g.slug}>
              <a
                href={`#${g.slug}`}
                className="text-brand-700 hover:underline dark:text-brand-300"
              >
                {g.term}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section className="mt-10 space-y-8">
        {glossary.map((g) => (
          <article
            key={g.slug}
            id={g.slug}
            className="scroll-mt-20 border-b border-gray-200 pb-6 dark:border-gray-800"
          >
            <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">
              {g.term}
            </h2>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{g.definition}</p>
            {g.source && (
              <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                <span className="font-semibold">Source:</span> {g.source}
              </p>
            )}
            {g.calcs && g.calcs.length > 0 && (
              <p className="mt-3 text-sm">
                <span className="text-gray-500 dark:text-gray-400">Calculator: </span>
                {g.calcs.map((slug, i) => {
                  const tool = findTool(slug);
                  if (!tool) return null;
                  return (
                    <span key={slug}>
                      {i > 0 && ', '}
                      <Link
                        href={`/${slug}`}
                        className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
                      >
                        {tool.shortTitle}
                      </Link>
                    </span>
                  );
                })}
              </p>
            )}
            {g.see && g.see.length > 0 && (
              <p className="mt-2 text-sm">
                <span className="text-gray-500 dark:text-gray-400">See also: </span>
                {g.see.map((slug, i) => (
                  <span key={slug}>
                    {i > 0 && ', '}
                    <a
                      href={`#${slug}`}
                      className="text-brand-700 hover:underline dark:text-brand-300"
                    >
                      {slug}
                    </a>
                  </span>
                ))}
              </p>
            )}
          </article>
        ))}
      </section>

      <ReportIssue context="glossary" />
    </main>
  );
}
