import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { TOOLKIT_PRODUCTS, accentClasses } from '@/lib/toolkit';

export const metadata: Metadata = buildMetadata({
  slug: 'toolkit',
  title: 'Mathstub Notion Toolkit — paid templates for equity-comp tax planning',
  description:
    'Four Notion templates built around the same IRC-cited math the free Mathstub calculators run. Year-End Tax Playbook ($19), Equity Comp Decision Tracker ($29), Tech Worker Annual Review ($39), Multi-State Equity Comp Tax Planner ($49). Lifetime updates through tax year 2028.',
});

export default function ToolkitIndex() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-brand-500 dark:text-brand-300">
          mathstub · notion toolkit
        </p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-brand-100 md:text-4xl">
          When a calculator isn&rsquo;t enough.
        </h1>
        <p className="mt-3 max-w-2xl text-base text-slate-700 dark:text-slate-300">
          Four Notion templates built around the same IRC-cited math the free
          calculators run — for tracking, planning, and CPA prep across an
          entire tax year. Lifetime updates included through tax year 2028.
          Each one started life as Earth&rsquo;s personal year-end workflow as a $200k+
          tech-worker tax case.
        </p>
      </header>

      <ul className="grid gap-5 md:grid-cols-2">
        {TOOLKIT_PRODUCTS.map((p) => {
          const accent = accentClasses(p.accent);
          return (
            <li key={p.slug}>
              <Link
                href={`/toolkit/${p.slug}`}
                className="group flex h-full flex-col gap-3 overflow-hidden rounded-xl border border-slate-200 bg-white p-4 transition hover:border-brand-500 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-brand-500/60"
              >
                <div className={`relative aspect-[1280/720] w-full overflow-hidden rounded-lg ring-1 ${accent.ring}`}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={p.cover}
                    alt={`${p.title} cover`}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                  />
                  <span
                    className={`absolute right-3 top-3 rounded-full ${accent.bg} ${accent.text} px-3 py-1 font-mono text-xs font-bold backdrop-blur-sm`}
                  >
                    {p.price}
                  </span>
                </div>
                <div className="px-1">
                  <h2 className="text-lg font-bold text-slate-900 dark:text-brand-100 group-hover:text-brand-700 dark:group-hover:text-brand-100">
                    {p.labelWithEmoji}
                  </h2>
                  <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{p.shortSub}</p>
                  <p className="mt-2 line-clamp-2 text-sm text-slate-700 dark:text-slate-300">
                    {p.elevatorPitch}
                  </p>
                  <p className="mt-3 inline-flex items-center gap-1 text-sm font-semibold text-brand-700 dark:text-brand-300">
                    See what&rsquo;s inside <span aria-hidden="true">→</span>
                  </p>
                </div>
              </Link>
            </li>
          );
        })}
      </ul>

      <section className="mt-12 rounded-xl border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <h2 className="text-xl font-bold text-slate-900 dark:text-brand-100">Bundle &amp; updates</h2>
        <ul className="mt-3 space-y-2 text-sm text-slate-700 dark:text-slate-300">
          <li>
            <strong>Lifetime updates through tax year 2028.</strong> IRS limits +
            §415, §401(k), §6654 thresholds change yearly. Each template is
            re-versioned and re-published. Re-download from your Gumroad library
            anytime.
          </li>
          <li>
            <strong>14–30 day money-back guarantee.</strong> If a template
            doesn&rsquo;t pay for itself in the first session, refund — same business
            day.
          </li>
          <li>
            <strong>Cites IRC § / IRS Pub# / state DOR primary sources.</strong>{' '}
            Every claim is anchored. Templates link to the exact section.
          </li>
          <li>
            <strong>Pairs with the 10 free Mathstub calculators.</strong> Every
            row deep-links into the matching calc when you want to verify the
            math live.
          </li>
        </ul>
        <p className="mt-4 text-xs italic text-slate-500 dark:text-slate-500">
          Affiliate disclosure: Mathstub earns from sales on the Mathstub-owned
          templates listed above. The free calculators stay free.
        </p>
      </section>
    </main>
  );
}
