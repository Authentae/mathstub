/**
 * KeyPoints — the "skim layer" for blog posts.
 *
 * Renders 3-6 plain-English bullets right under the QuickAnswer so a reader
 * who won't read 1,500 words still gets the whole story in ~15 seconds. The
 * full article stays below for depth (and SEO / AI-citation weight).
 *
 * Contrast is locked to the same hardened recipe as QuickAnswer:
 *   - bg-brand-950/40  → dark navy panel (brand-950 = #172554, defined in
 *     tailwind.config.ts; was the cause of the earlier light-on-light bug).
 *   - text-slate-100   → near-white body, ~16:1 on that panel (well past AA).
 *   - text-brand-300   → eyebrow, high-contrast blue on navy.
 * No light `bg-*-50` base anywhere, so it cannot regress to light-on-light.
 */
export function KeyPoints({ points }: { points: readonly string[] }) {
  if (!points || points.length === 0) return null;
  return (
    <aside
      aria-label="The short version"
      className="mt-4 rounded-lg border border-brand-500/30 bg-brand-950/40 p-5"
    >
      <p className="mb-3 flex items-center gap-2 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-brand-300">
        <span aria-hidden="true">⚡</span> The short version
      </p>
      <ul className="space-y-2.5">
        {points.map((pt, i) => (
          <li key={i} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-slate-100">
            <span
              aria-hidden="true"
              className="mt-0.5 flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-brand-500/25 text-[10px] font-bold text-brand-200 ring-1 ring-inset ring-brand-400/40"
            >
              ✓
            </span>
            <span>{pt}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}
