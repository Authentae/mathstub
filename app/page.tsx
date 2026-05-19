import Link from 'next/link';
import { liveTools } from '@/lib/tools';
import { SITE_NAME } from '@/lib/seo';
import { blogPosts } from '@/content/blog/registry';
import { findCategoryForSlug } from '@/content/blog/categories';

export default function HomePage() {
  const tools = liveTools();
  const flagship = tools[0];
  const otherTools = tools.slice(1);
  if (!flagship) {
    // Defensive guard for TypeScript — tools is non-empty in practice, but
    // accessing the array by destructuring widens the type to possibly
    // undefined and we read flagship.* below.
    return null;
  }
  const latestPosts = [...blogPosts]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 3);

  return (
    <main className="mx-auto max-w-5xl px-4 py-12">
      {/* Hero — specific not poetic. */}
      <h1 className="text-4xl font-bold text-gray-900 dark:text-gray-100">
        Free tax calculators for US tech workers with equity comp.
      </h1>
      <p className="mt-3 max-w-2xl text-lg text-gray-700 dark:text-gray-300">
        RSUs, ISO/AMT, ESPP, NSO, bonuses, quarterly estimates. Run your
        numbers in 30 seconds. No signup. Math runs in your browser — your
        inputs never leave your device.
      </p>

      {/* Trust band */}
      <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs font-medium uppercase tracking-wide text-gray-500 dark:text-gray-400">
        <li>✓ 8 calculators</li>
        <li>✓ 23 guides</li>
        <li>✓ 446 unit tests</li>
        <li>✓ Every claim cites IRS code &amp; pub</li>
        <li>✓ Inputs stay in your browser</li>
        <li>✓ Free, no signup</li>
      </ul>

      {/* Flagship — RSU shortfall featured large */}
      <section className="mt-10">
        <Link
          href={`/${flagship.slug}`}
          className="block rounded-xl border-2 border-brand-500 bg-brand-50 p-6 shadow-sm transition hover:shadow-md dark:border-brand-400 dark:bg-brand-950/40"
        >
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
            Most popular
          </p>
          <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {flagship.emoji ? `${flagship.emoji} ` : ''}
            {flagship.title}
          </h2>
          <p className="mt-2 text-gray-700 dark:text-gray-300">{flagship.summary}</p>
          <p className="mt-3 inline-block text-sm font-semibold text-brand-700 hover:underline dark:text-brand-200">
            Run the calculator →
          </p>
        </Link>
      </section>

      {/* All other tools */}
      <section className="mt-10">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
          More calculators
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-2">
          {otherTools.map((t) => (
            <li
              key={t.slug}
              className="rounded-lg border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
            >
              <Link href={`/${t.slug}`} className="block">
                <h3 className="text-lg font-semibold text-brand-700 dark:text-brand-100">
                  {t.emoji ? `${t.emoji} ` : ''}
                  {t.title}
                </h3>
                <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{t.summary}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Latest from blog — surface our content engine */}
      <section className="mt-12 border-t border-gray-200 pt-8 dark:border-gray-800">
        <div className="flex items-baseline justify-between">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
            Latest from the blog
          </h2>
          <Link
            href="/blog"
            className="text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            All posts →
          </Link>
        </div>
        <ul className="mt-4 grid gap-4 md:grid-cols-3">
          {latestPosts.map((p) => {
            const category = findCategoryForSlug(p.slug);
            return (
              <li
                key={p.slug}
                className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md dark:border-gray-800 dark:bg-gray-900"
              >
                <Link href={`/blog/${p.slug}`} className="block">
                  <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                    <span>
                      {new Date(p.datePublished).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </span>
                    {category && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
                          {category.name}
                        </span>
                      </>
                    )}
                  </div>
                  <h3 className="mt-1 text-sm font-semibold text-gray-900 dark:text-gray-100 line-clamp-3">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                    {p.description}
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      {/* "Not sure which calc?" prompt — placeholder until /start-here exists */}
      <section className="mt-12 rounded-md bg-gray-50 p-6 text-center dark:bg-gray-900">
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Not sure which calculator fits your situation?
          {' '}
          <Link href="/blog" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
            Read the guides
          </Link>
          {' '}or
          {' '}
          <a
            href={`mailto:hello@mathstub.com?subject=${encodeURIComponent('Which calculator do I need?')}`}
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            tell us your situation
          </a>
          .
        </p>
      </section>
    </main>
  );
}
