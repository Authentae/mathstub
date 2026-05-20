import { bestProductForShortfall } from '@/lib/gumroad';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

export function GumroadUpsell({ shortfallUsd }: { shortfallUsd: number }) {
  if (shortfallUsd <= 0) return null;
  const p = bestProductForShortfall(shortfallUsd);

  const utm = `?utm_source=mathstub&utm_medium=calc-upsell&utm_campaign=shortfall&utm_content=${p.id}`;

  return (
    <aside
      // Punchier visual treatment so the paid-product upsell doesn't
      // get lost between the calc result and the W-4 suggestion block.
      // Always-dark concrete classes (no dark: variants — see QuickAnswer
      // commit). Saturated brand-blue surface + accent ring + glow on
      // the price chip pulls the eye without being garish.
      className="my-6 overflow-hidden rounded-xl border border-brand-500/70 bg-gradient-to-br from-brand-900 via-slate-900 to-slate-900 p-6 shadow-lg shadow-brand-900/30 ring-1 ring-inset ring-white/5"
    >
      <header className="mb-3 flex items-center justify-between gap-3">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-brand-300">
          Don&rsquo;t want this surprise next April?
        </p>
        <span
          className="rounded-full bg-brand-500 px-2.5 py-1 text-xs font-bold text-white"
          style={{ boxShadow: '0 0 14px rgba(59, 130, 246, 0.55)' }}
        >
          {usd.format(p.priceUsd)}
        </span>
      </header>
      <h3 className="mb-2 text-xl font-bold leading-tight tracking-tight text-white sm:text-2xl">
        {p.pitchHeadline}
      </h3>
      <p className="mb-4 text-sm leading-relaxed text-slate-300">{p.pitchBody}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`${p.url}${utm}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-brand-500 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-brand-400 hover:shadow-lg"
        >
          Get the {p.name.split(' ').slice(0, 2).join(' ')}
          <span aria-hidden="true">→</span>
        </a>
        <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-slate-500">
          one-time {usd.format(p.priceUsd)} · notion template · lifetime updates
        </span>
      </div>
    </aside>
  );
}
