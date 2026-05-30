import { bestProductForShortfall, type GumroadProductId } from '@/lib/gumroad';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * GumroadUpsell — premium-feeling product card surfaced when either
 *   (a) the calc returns a positive shortfall (shortfall-keyed match), or
 *   (b) the page explicitly routes to a product via `preferredProduct`
 *       (lookup pages and non-shortfall calcs).
 *
 * Money-line row 5 is only rendered when `shortfallUsd > 0`, so pure
 * lookup pages get the product card without a misleading "surprise this
 * year" anchor.
 *
 * Always-dark concrete classes (no `dark:` variants) so it can't
 * regress to light-on-dark like QuickAnswer did before its hardening.
 */
export function GumroadUpsell({
  shortfallUsd,
  preferredProduct,
}: {
  shortfallUsd?: number;
  preferredProduct?: GumroadProductId;
}) {
  const hasShortfall = typeof shortfallUsd === 'number' && shortfallUsd > 0;
  if (!preferredProduct && !hasShortfall) return null;
  const p = bestProductForShortfall(shortfallUsd ?? 0, preferredProduct);
  const utm = `?utm_source=mathstub&utm_medium=calc-upsell&utm_campaign=shortfall&utm_content=${p.id}`;

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

      {/* Row 5 — money line (only when we have a concrete shortfall to anchor on) */}
      {hasShortfall && (
        <div className="relative mb-5 rounded-lg border border-brand-500/30 bg-slate-950/40 px-4 py-3 font-mono text-xs leading-relaxed text-slate-300">
          <span className="font-bold text-orange-300">{usd.format(shortfallUsd!)}</span>
          <span className="text-slate-500"> surprise this year.</span>{' '}
          <span className="font-bold text-brand-300">{usd.format(p.priceUsd)}</span>
          <span className="text-slate-500"> to see the next one coming.</span>
        </div>
      )}

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
        <span className="font-mono text-[11px] uppercase tracking-[0.06em] text-slate-400">
          Pay once · lifetime updates · instant access
        </span>
      </div>

      {/* Row 7 — Trust micro-copy */}
      <div className="relative mt-5 flex flex-wrap items-center gap-x-5 gap-y-1 border-t border-slate-800 pt-4 text-[11px] text-slate-400">
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
