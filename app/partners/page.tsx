import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  slug: 'partners',
  title: 'Partnership brief — mathstub for affiliate networks, CPA matchers, and tax-prep partners',
  description:
    'One-page brief on mathstub.com — audience, trust signals, what we want from partners (CJ, FlexOffers, Impact, TurboTax, H&R Block, Keeper, FlyFin, Harness Wealth, Tax Goddess, Anthropic skill marketplace). Direct partnership preferred over network.',
  ogImagePath: '/og/default.png',
  // /partners is a public landing page (sometimes linked from outreach
  // emails) but we don't want it appearing in organic search results —
  // affiliate program managers find it via direct link, not Google.
  noindex: true,
});

/**
 * /partners — public landing page for affiliate-network / tax-prep
 * partnership outreach. Earth links this URL in cold emails to CJ,
 * FlexOffers, Impact, TurboTax, H&R Block, Keeper, FlyFin, Harness
 * Wealth, Tax Goddess, and the Anthropic skill marketplace team.
 *
 * Source: Claude Design P7 (Mathstub Partner One-Pager). The brief
 * itself is a US Letter portrait HTML page at /public/partners/index.html
 * — we iframe it here with proper aspect so the same asset works as a
 * web page AND prints cleanly via /partners/print.html (browser print
 * dialog → save as PDF gives partners a one-page deliverable).
 *
 * noindex: this is for direct outreach, not organic discovery.
 */
export default function PartnersPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-8">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Partnership brief
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-700 dark:text-slate-300">
        One-page summary of mathstub for affiliate-network and tax-prep
        partnership conversations. Audience, trust signals, what we want
        from partners, and contact.
      </p>

      <div className="mt-6 overflow-hidden rounded-lg border border-slate-200 bg-white shadow dark:border-slate-800">
        <iframe
          src="/partners/"
          title="Mathstub partnership brief — audience, trust signals, partner asks"
          aria-label="Mathstub partnership brief embedded preview"
          loading="lazy"
          className="h-[1400px] w-full border-0 bg-white"
        />
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        Open in its own window:{' '}
        <a
          href="/partners/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          /partners/ ↗
        </a>{' '}
        · Print-ready PDF version:{' '}
        <a
          href="/partners/print.html"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          /partners/print.html ↗
        </a>{' '}
        (browser print dialog → save as PDF).
      </p>
    </main>
  );
}
