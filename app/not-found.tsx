import Link from 'next/link';
import { liveTools } from '@/lib/tools';
import { blogPosts } from '@/content/blog/registry';
import { blogCategories } from '@/content/blog/categories';

// Mid-traffic recovery surface — when a visitor hits a dead URL we route
// them to the four most useful starting points (the flagship calc,
// /start-here diagnostic, /blog index, /glossary) plus a handful of
// recently-published posts so they have a tangible next click.
export default function NotFound() {
  const tools = liveTools();
  const flagship = tools[0];
  const latestPosts = [...blogPosts]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 4);

  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <p className="text-sm font-semibold uppercase tracking-wide text-gray-500">
        404 — page not found
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Looks like this page doesn&apos;t exist.
      </h1>
      <p className="mt-3 text-gray-700 dark:text-gray-300">
        It may have been moved, the URL may have a typo, or the link that
        brought you here is out of date. Here are the most useful pages on
        Mathstub to get you back on track.
      </p>

      {/* Primary CTA — the flagship calculator */}
      {flagship && (
        <section className="mt-8">
          <Link
            href={`/${flagship.slug}`}
            className="block rounded-xl border-2 border-brand-500 bg-brand-50 p-5 transition hover:shadow-md dark:border-brand-400 dark:bg-brand-950/40"
          >
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
              Most popular calculator
            </p>
            <h2 className="mt-1 text-xl font-bold text-gray-900 dark:text-gray-100">
              {flagship.emoji ? `${flagship.emoji} ` : ''}
              {flagship.title}
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {flagship.summary}
            </p>
            <p className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline dark:text-brand-200">
              Run the calculator →
            </p>
          </Link>
        </section>
      )}

      {/* Quick-access pills for the three main navigation hubs */}
      <section className="mt-6">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Or pick a starting point
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          <Link
            href="/start-here"
            className="block rounded-md border border-gray-200 bg-white p-4 text-sm shadow-sm transition hover:border-brand-500 hover:shadow dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="font-semibold text-brand-700 dark:text-brand-300">
              🧭 Start here
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Diagnostic guide — which calculator fits your situation?
            </p>
          </Link>
          <Link
            href="/blog"
            className="block rounded-md border border-gray-200 bg-white p-4 text-sm shadow-sm transition hover:border-brand-500 hover:shadow dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="font-semibold text-brand-700 dark:text-brand-300">
              📚 Blog ({blogPosts.length} posts)
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Equity-comp tax mechanics with worked examples and IRC citations.
            </p>
          </Link>
          <Link
            href="/glossary"
            className="block rounded-md border border-gray-200 bg-white p-4 text-sm shadow-sm transition hover:border-brand-500 hover:shadow dark:border-gray-800 dark:bg-gray-900"
          >
            <p className="font-semibold text-brand-700 dark:text-brand-300">
              🔤 Glossary
            </p>
            <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
              Plain-language definitions of every equity-comp term — RSU,
              ISO, AMT, §83(b), NIIT, and 28 more.
            </p>
          </Link>
        </div>
      </section>

      {/* All calculators */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          All calculators
        </h2>
        <ul className="mt-2 grid gap-2 sm:grid-cols-2">
          {tools.map((t) => (
            <li key={t.slug}>
              <Link
                href={`/${t.slug}`}
                className="block text-sm text-brand-700 hover:underline dark:text-brand-300"
              >
                {t.emoji ? `${t.emoji} ` : ''}
                {t.shortTitle}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Recent posts so the lost visitor sees Mathstub is actively maintained */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Recent posts
        </h2>
        <ul className="mt-2 space-y-2">
          {latestPosts.map((p) => (
            <li key={p.slug}>
              <Link
                href={`/blog/${p.slug}`}
                className="text-sm text-brand-700 hover:underline dark:text-brand-300"
              >
                {p.title}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* Blog category list — picks up users searching for a topic */}
      <section className="mt-8">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          Browse by topic
        </h2>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-sm">
          {blogCategories.map((c) => (
            <li key={c.id}>
              <Link
                href={`/blog#${c.id}`}
                className="text-brand-700 hover:underline dark:text-brand-300"
              >
                {c.name} ({c.slugs.length})
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <p className="mt-10 text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:underline">
          ← Back to home
        </Link>
      </p>
    </main>
  );
}
