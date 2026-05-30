import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, canonical, siteUrl, breadcrumbSchema } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { resolveTaxMap } from '@/lib/tax-map';

const SLUG = 'equity-comp-tax-map';

export const metadata: Metadata = buildMetadata({
  slug: SLUG,
  title: 'Equity Comp Tax Map — Every Tax Moment From Grant to Retirement',
  description:
    'A visual map of every tax decision a tech worker with equity faces — RSU vests, option exercises, AMT, selling shares, multi-state moves, and Roth — each linked to a free calculator.',
  ogImagePath: '/og/default.png',
});

export default function TaxMapPage() {
  const stages = resolveTaxMap();
  const url = canonical(SLUG);

  // ItemList of every linked calculator — honest, machine-readable hub signal
  // for Google / AI engines (helps them understand this is the orientation page).
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Equity Comp Tax Map',
    description:
      'The equity-comp tax journey for US tech workers, stage by stage, with the calculator for each step.',
    itemListElement: stages
      .flatMap((s) => s.calcs)
      .map((c, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        name: c.title,
        url: `${siteUrl()}/${c.slug}`,
      })),
  };

  return (
    <>
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Tax map', path: `/${SLUG}` },
        ])}
      />
      <JsonLd data={itemListSchema} />

      <main className="mx-auto max-w-3xl px-4 py-10 sm:py-14">
        {/* Intro */}
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-600 dark:text-brand-400">
          The big picture
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl">
          The Equity Comp Tax Map
        </h1>
        <p className="mt-3 max-w-2xl text-base text-gray-700 dark:text-gray-300">
          Every tech worker with equity walks the same road — from the day you’re
          granted shares to the day you retire. At each stop, a different tax
          shows up. Here’s the whole journey on one page, with the free
          calculator for every step.
        </p>

        {/* Timeline */}
        <div className="relative mt-10">
          {/* gradient spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute bottom-3 left-5 top-3 w-0.5 bg-gradient-to-b from-brand-400 via-brand-500 to-brand-300 dark:from-brand-700 dark:via-brand-600 dark:to-brand-800"
          />

          <ol className="space-y-7">
            {stages.map((s) => (
              <li key={s.id} className="relative pl-16">
                {/* node */}
                <div className="absolute left-0 top-0 grid h-10 w-10 place-items-center rounded-full border-2 border-brand-500 bg-white text-lg shadow-sm dark:bg-gray-950">
                  <span aria-hidden="true">{s.emoji}</span>
                </div>

                {/* card */}
                <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
                  <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-600 dark:text-brand-400">
                    Step {s.step}
                  </p>
                  <h2 className="mt-1 text-lg font-bold text-gray-900 dark:text-gray-100">
                    {s.title}
                  </h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                    {s.blurb}
                  </p>

                  {s.calcs.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {s.calcs.map((c) => (
                        <Link
                          key={c.slug}
                          href={`/${c.slug}`}
                          className="inline-flex items-center gap-1.5 rounded-full border border-gray-200 bg-gray-50 px-3 py-1.5 text-sm font-medium text-gray-800 transition hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-200 dark:hover:border-brand-500 dark:hover:bg-brand-950/40 dark:hover:text-brand-200"
                        >
                          {c.emoji && <span aria-hidden="true">{c.emoji}</span>}
                          {c.shortTitle}
                        </Link>
                      ))}
                    </div>
                  )}

                  {s.link && (
                    <Link
                      href={s.link.href}
                      className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
                    >
                      {s.link.label}
                      <span aria-hidden="true">→</span>
                    </Link>
                  )}
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Closing CTA */}
        <section className="mt-12 rounded-xl border border-brand-200 bg-brand-50 p-6 text-center dark:border-brand-900 dark:bg-brand-950/40">
          <h2 className="text-lg font-bold text-gray-900 dark:text-gray-100">
            Not sure where you are on the map?
          </h2>
          <p className="mx-auto mt-1 max-w-md text-sm text-gray-700 dark:text-gray-300">
            Most people start at their next vest or a sale they’re about to make.
            Pick the calculator that matches what’s happening this month.
          </p>
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700"
          >
            Browse all calculators
            <span aria-hidden="true">→</span>
          </Link>
        </section>

        <p className="sr-only">
          <a href={url}>{url}</a>
        </p>
      </main>
    </>
  );
}
