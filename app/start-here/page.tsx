import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { ReportIssue } from '@/components/ReportIssue';
import { findTool, type Tool } from '@/lib/tools';

export const metadata: Metadata = buildMetadata({
  slug: 'start-here',
  title: 'Start here — which Mathstub calculator do I need?',
  description:
    'A quick decision guide that routes you to the right Mathstub calculator based on what just happened in your equity comp — RSU vest, stock option exercise, ESPP sale, year-end planning, or quarterly payments.',
});

// Decision-tree rows. We render this as a static page (no JS, no state) — the
// user scans the table-like layout, finds the row that matches their
// situation, and clicks through. This is faster and more accessible than an
// interactive wizard for a 5-question decision.
interface Row {
  question: string;
  answer: string;
  toolSlug: string;
  helperPostSlug?: string;
}

const rows: Row[] = [
  {
    question: 'Your RSUs just vested and you want to know what you owe',
    answer: 'Estimate the gap between the 22% federal supplemental withholding and your real marginal rate',
    toolSlug: 'rsu-tax-shortfall',
    helperPostSlug: 'how-much-tax-will-i-pay-on-rsu',
  },
  {
    question: 'You got a cash bonus and the withholding looks too low',
    answer: 'Same engine as RSU shortfall, applied to cash bonuses paid as supplemental wages',
    toolSlug: 'bonus-tax-shortfall',
  },
  {
    question: 'You exercised ISOs (or are about to) and worry about AMT',
    answer: 'Compute Alternative Minimum Tax exposure on the bargain element',
    toolSlug: 'iso-amt',
  },
  {
    question: 'You exercised ISOs in a prior year and want to recover the AMT credit',
    answer: 'Project Form 8801 minimum tax credit recovery year-by-year',
    toolSlug: 'amt-credit-recovery',
  },
  {
    question: 'You exercised non-qualified stock options (NSOs)',
    answer: 'Compute the bargain element + ordinary income + FICA + withholding gap',
    toolSlug: 'nso-exercise',
  },
  {
    question: 'You sold ESPP shares and want to know if it was a qualifying disposition',
    answer: 'Split the gain into ordinary income vs long-term capital gain under §423',
    toolSlug: 'espp-qualifying-disposition',
  },
  {
    question: 'You owe estimated tax and want to hit the IRS safe harbor',
    answer: 'Compute IRC §6654 quarterly payments to avoid the underpayment penalty',
    toolSlug: 'quarterly-estimated-tax',
    helperPostSlug: 'estimated-tax-after-rsu-vest',
  },
  {
    question: 'You want to compare state tax rules for equity comp before moving',
    answer: 'Top marginal, supplemental withholding, AMT, LTCG rules by state',
    toolSlug: 'state-stock-comp',
    helperPostSlug: 'rsu-taxes-by-state',
  },
];

function Card({ row }: { row: Row }) {
  const tool: Tool | undefined = findTool(row.toolSlug);
  if (!tool) return null;
  return (
    <article className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
      <p className="text-sm font-semibold text-brand-700 dark:text-brand-300">
        If…
      </p>
      <p className="mt-1 text-base font-medium text-slate-900 dark:text-slate-100">
        {row.question}
      </p>
      <p className="mt-3 text-xs uppercase tracking-wide text-slate-500">Then use</p>
      <Link
        href={`/${tool.slug}`}
        className="mt-1 block text-lg font-semibold text-brand-700 hover:underline dark:text-brand-100"
      >
        {tool.emoji ? `${tool.emoji} ` : ''}
        {tool.title} →
      </Link>
      <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{row.answer}</p>
      {row.helperPostSlug && (
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Background reading:{' '}
          <Link
            href={`/blog/${row.helperPostSlug}`}
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            /blog/{row.helperPostSlug}
          </Link>
        </p>
      )}
    </article>
  );
}

export default function StartHerePage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Start here — which calculator do I need?
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
        Find the row that matches what just happened in your equity comp,
        then click through to the right calculator. Each calculation runs in
        your browser — no signup, nothing leaves your device.
      </p>

      <section className="mt-8 grid gap-4 md:grid-cols-2">
        {rows.map((r) => (
          <Card key={r.toolSlug} row={r} />
        ))}
      </section>

      <section className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-5 text-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="font-semibold text-slate-900 dark:text-slate-100">
          Still not sure?
        </p>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          The two most common starting points are{' '}
          <Link
            href="/rsu-tax-shortfall"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            RSU Tax Shortfall
          </Link>{' '}
          (for anyone with RSU vests) and{' '}
          <Link
            href="/quarterly-estimated-tax"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            Quarterly Estimated Tax
          </Link>{' '}
          (for anyone who owes more than $1,000 at filing). If your situation
          is more complex —{' '}
          <Link
            href="/glossary"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            check the glossary
          </Link>{' '}
          for the terms, or{' '}
          <a
            href="mailto:hello@mathstub.com?subject=Which%20calculator%20do%20I%20need%3F"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            tell us your situation
          </a>{' '}
          and we&apos;ll point you at the right tool.
        </p>
      </section>

      <ReportIssue context="start-here" />
    </main>
  );
}
