import { bestProductForShortfall } from '@/lib/gumroad';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * GumroadUpsell — premium-feeling product card surfaced after the calc
 * shows a positive shortfall. Designed to look like a real $29 product,
 * not a banner ad. Visual hierarchy:
 *
 *   1. Eyebrow + price chip          (context + commitment)
 *   2. Big H3 pitch headline         (the promise)
 *   3. Body copy                     (the proof)
 *   4. 3 bulleted features w/ checks (the deliverable)
 *   5. ROI line keyed to user's
 *      actual shortfall              ("$30,200 surprise this year.
 *                                     $29 to know it's coming next.
 *                                     1,041× return.")
 *   6. Big CTA button                (low-friction conversion)
 *   7. Trust micro-copy underneath   (Gumroad guarantee, lifetime
 *                                     updates, instant access)
 *
 * Always-dark concrete classes (no `dark:` variants) so it can't
 * regress to light-on-dark like QuickAnswer did before its hardening.
 */
export function GumroadUpsell({ shortfallUsd }: { shortfallUsd: number }) {
  if (shortfallUsd <= 0) return null;
  const p = bestProductForShortfall(shortfallUsd);
  const utm = `?utm_source=mathstub&utm_medium=calc-upsell&utm_campaign=shortfall&utm_content=${p.id}`;

  // ROI multiplier — how much surprise this year vs the product price.
  // Floored at 1× so we never show "0× ROI" for tiny shortfalls.
  const roiMultiplier = Math.max(1, Math.round(shortfallUsd / p.priceUsd));

  return (
    <aside
      className="relative my-6 overflow-hidden rounded-2xl border border-brand-500/60 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-950 p-6 shadow-xl shadow-brand-950/40 ring-1 ring-inset ring-white/5 sm:p-8"
    >
      {/* Decorative glow blob top-right — adds visual weight without an image asset */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-brand-500/20 blur-3xl"
      />

      {/* Row 1 — eyebrow + price chip */}
      <header className="relative mb-4 flex items-center justify-between gap-3">
        <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-brand-300">
          Stop the surprise · Mathstub product
        </p>
        <div className="flex items-baseline gap-2">
          <span className="font-mono text-[10px] uppercase tracking-[0.08em] text-slate-500 line-through">
            {usd.format(p.priceUsd * 2)}
          </span>
          <span
            className="rounded-full bg-brand-500 px-3 py-1 text-xs font-bold text-white"
            style={{ boxShadow: '0 0 18px rgba(59, 130, 246, 0.6)' }}
          >
            {usd.format(p.priceUsd)}
          </span>
        </div>
      </header>

      {/* Row 2 — Headline */}
      <h3 className="relative mb-2 text-2xl font-bold leading-tight tracking-tight text-white sm:text-3xl">
        {p.pitchHeadline}
      </h3>

      {/* Row 3 — Body */}
      <p className="relative mb-5 max-w-prose text-sm leading-relaxed text-slate-300 sm:text-base">
        {p.pitchBody}
      </p>

      {/* Row 4 — Feature bullets */}
      <ul className="relative mb-5 grid gap-2.5 text-sm text-slate-200 sm:grid-cols-3 sm:gap-3">
        {p.features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-500/20 ring-1 ring-inset ring-brand-400/40"
            >
              <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path
                  d="M2.5 6.5L5 9l4.5-5.5"
                  stroke="rgb(147 197 253)"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>
            <span className="leading-snug">{f}</span>
          </li>
        ))}
      </ul>

      {/* Row 5 — ROI line */}
      <div className="relative mb-5 rounded-lg border border-brand-500/30 bg-slate-950/40 px-4 py-3 font-mono text-xs leading-relaxed text-slate-300">
        <span className="font-bold text-orange-300">{usd.format(shortfallUsd)}</span>
        <span className="text-slate-500"> surprise this year.</span>{' '}
        <span className="font-bold text-brand-300">{usd.format(p.priceUsd)}</span>
        <span className="text-slate-500"> to know it&rsquo;s coming next.</span>{' '}
        <span className="font-bold text-white">{roiMultiplier.toLocaleString()}× ROI.</span>
      </div>

      {/* Row 6 — Big CTA */}
      <div className="relative flex flex-wrap items-center gap-3">
        <a
          href={`${p.url}${utm}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2.5 rounded-lg bg-brand-500 px-6 py-3 text-base font-bold text-white shadow-lg shadow-brand-900/40 transition hover:bg-brand-400 hover:shadow-xl sm:text-lg"
        >
          Get it on Gumroad
          <span aria-hidden="true" className="text-xl">→</span>
        </a>
        <a
          href={`/toolkit/${p.toolkitSlug}`}
          className="inline-flex items-center gap-1.5 rounded-md border border-slate-700 px-4 py-2.5 text-sm font-semibold text-slate-200 transition hover:border-brand-400 hover:text-white"
        >
          See what&rsquo;s inside
          <span aria-hidden="true">→</span>
        </a>
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-slate-500">
          Pay once · lifetime updates · instant access
        </span>
      </div>

      {/* Row 7 — Trust micro-copy */}
      <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-slate-800 pt-4 text-[11px] text-slate-500">
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-brand-400">✓</span>
          Gumroad-secured checkout
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-brand-400">✓</span>
          Updated every tax year
        </span>
        <span className="flex items-center gap-1.5">
          <span aria-hidden="true" className="text-brand-400">✓</span>
          No subscriptions
        </span>
      </div>
    </aside>
  );
}
