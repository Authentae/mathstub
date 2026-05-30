import Link from 'next/link';
import { liveTools } from '@/lib/tools';
import { SITE_NAME } from '@/lib/seo';
import { TOOLKIT_PRODUCTS } from '@/lib/toolkit';

export function Footer() {
  const tools = liveTools();
  return (
    <>
      {/* Ecosystem band — Notion templates + cross-promotion */}
      <section className="mt-16 border-t border-gray-200 bg-gray-50 px-4 py-10 dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl">
          <div className="mb-6 flex flex-wrap items-baseline justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
                mathstub ecosystem · paid notion templates
              </p>
              <h2 className="mt-1 flex items-baseline gap-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-brand-100">
                <span aria-hidden="true" className="h-2 w-2 rounded-full bg-brand-500 shadow-[0_0_12px_rgb(59,130,246)]" />
                When a calculator isn&rsquo;t enough.
              </h2>
            </div>
            <Link
              href="/toolkit"
              className="text-sm font-semibold text-brand-700 hover:text-brand-800 dark:text-brand-300 dark:hover:text-brand-200"
            >
              See all 4 templates →
            </Link>
          </div>
          <p className="mb-6 max-w-2xl text-sm text-gray-600 dark:text-gray-400">
            Four Notion templates built around the same IRC-cited math the free
            calculators run — for tracking, planning, and CPA prep across an
            entire tax year. Lifetime updates included.
          </p>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {TOOLKIT_PRODUCTS.map((p) => (
              <li key={p.slug}>
                <Link
                  href={`/toolkit/${p.slug}`}
                  className="group flex h-full flex-col gap-2.5 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 transition hover:border-brand-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/50 dark:hover:border-brand-500/60"
                >
                  <div className="relative aspect-[1280/720] w-full overflow-hidden rounded-md ring-1 ring-slate-200/70 dark:ring-slate-800/70">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={p.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex flex-col gap-1 px-1 pb-1">
                    <div className="flex items-baseline justify-between gap-2">
                      <span className="text-sm font-bold text-gray-900 group-hover:text-brand-700 dark:text-brand-100 dark:group-hover:text-brand-100">
                        {p.labelWithEmoji}
                      </span>
                      <span className="rounded-full bg-brand-500/10 px-2 py-0.5 font-mono text-[10px] font-bold text-brand-600 dark:text-brand-300">
                        {p.price}
                      </span>
                    </div>
                    <span className="text-xs text-gray-500 dark:text-gray-400">{p.shortSub}</span>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
          <p className="mt-4 text-xs italic text-gray-500 dark:text-gray-400">
            Affiliate disclosure — we earn from sales on Mathstub-owned products listed above.
            Free calculators always stay free.
          </p>
        </div>
      </section>

    <footer className="border-t border-gray-200 bg-gray-50 py-8 dark:border-gray-800 dark:bg-gray-900">
      <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-sm md:grid-cols-4">
        <div>
          <h2 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">{SITE_NAME}</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Free tools for your money and your time. No signup, no email walls.
          </p>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Tools</h3>
          <ul className="space-y-1">
            {tools.map((t) => (
              <li key={t.slug}>
                <Link
                  href={`/${t.slug}`}
                  className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
                >
                  {t.shortTitle}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">Learn</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/start-here"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Start here
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Blog
              </Link>
            </li>
            <li>
              <Link
                href="/glossary"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Glossary
              </Link>
            </li>
            <li>
              <Link
                href="/toolkit"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Notion toolkit
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="mb-2 font-semibold text-gray-900 dark:text-gray-100">About</h3>
          <ul className="space-y-1">
            <li>
              <Link
                href="/about"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                About
              </Link>
            </li>
            <li>
              <Link
                href="/editorial-policy"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Editorial policy
              </Link>
            </li>
            <li>
              <Link
                href="/methodology"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Methodology
              </Link>
            </li>
            <li>
              <Link
                href="/disclaimer"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Disclaimer
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Privacy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="text-gray-600 hover:text-brand-700 dark:text-gray-400 dark:hover:text-brand-100"
              >
                Terms
              </Link>
            </li>
          </ul>
        </div>
      </div>
      <p className="mx-auto mt-8 max-w-5xl px-4 text-xs text-gray-500 dark:text-gray-400">
        © {new Date().getFullYear()} {SITE_NAME}. Some links on this site are
        affiliate links — we may earn a commission at no extra cost to you.
      </p>
    </footer>
    </>
  );
}
