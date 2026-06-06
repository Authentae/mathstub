import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  slug: 'launch',
  title: 'Launch deck — what mathstub is and why it exists',
  description:
    'A 10-slide visual walkthrough of mathstub.com — the audience, the problem (22% supplemental vs ~37% marginal), the calculator suite, the trust signals (571 unit tests, every claim cites IRC), and the roadmap.',
  ogImagePath: '/og/default.png',
  // Iframe-only launch deck — not substantive content from Google's POV.
  // Direct-link surface for press / partners, not for organic search.
  noindex: true,
});

/**
 * /launch — visual companion to the Show HN / Reddit launch posts and a
 * shareable one-link summary of what mathstub is for partners and press.
 *
 * Source: Claude Design P5 (Mathstub Launch Deck). The deck itself lives
 * at /public/launch/ as a standalone HTML page driven by deck-stage.js
 * and the slide screenshots in /public/launch/screenshots/. We embed it
 * here via <iframe> with a 16:9 aspect ratio so the same asset is
 * directly linkable in a tweet ("here's the launch deck →
 * mathstub.com/launch/") and works without the Next.js chrome.
 */
export default function LaunchPage() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-8">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Launch deck
      </h1>
      <p className="mt-2 max-w-2xl text-base text-slate-700 dark:text-slate-300">
        A 10-slide visual walkthrough of mathstub: the audience, the math
        problem, the calculator suite, the trust signals, and the roadmap.
        Use this if you want a quick overview before clicking into the
        calculators themselves.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border border-slate-200 bg-slate-900 shadow-lg dark:border-slate-800">
        <iframe
          src="/launch/"
          title="Mathstub launch deck — 10 slides covering audience, problem, solution, proof, roadmap"
          aria-label="Mathstub launch deck embedded slide viewer"
          loading="lazy"
          className="aspect-video w-full border-0"
        />
      </div>

      <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">
        Open the deck in its own window for full screen:{' '}
        <a
          href="/launch/"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
        >
          /launch/ ↗
        </a>
        . Sharing this URL — <code className="rounded bg-slate-100 px-1 py-0.5 text-xs dark:bg-slate-800">mathstub.com/launch</code> —
        is the fastest way to give someone the full pitch in one link.
      </p>
    </main>
  );
}
