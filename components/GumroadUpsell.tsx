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
    <aside className="my-4 rounded-lg border-2 border-brand-300 bg-gradient-to-br from-brand-50 to-white p-5 shadow-sm dark:border-brand-700 dark:from-brand-950 dark:to-gray-900">
      <header className="mb-2 flex items-center justify-between">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Don’t want this surprise next April?
        </p>
        <span className="rounded-full bg-brand-100 px-2 py-0.5 text-xs font-semibold text-brand-800 dark:bg-brand-900 dark:text-brand-200">
          {usd.format(p.priceUsd)}
        </span>
      </header>
      <h3 className="mb-1 text-lg font-bold text-gray-900 dark:text-gray-100">
        {p.pitchHeadline}
      </h3>
      <p className="mb-3 text-sm text-gray-700 dark:text-gray-300">{p.pitchBody}</p>
      <div className="flex flex-wrap items-center gap-3">
        <a
          href={`${p.url}${utm}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700"
        >
          Get the {p.name.split(' ').slice(0, 2).join(' ')} →
        </a>
        <span className="text-xs text-gray-500 dark:text-gray-500">
          One-time {usd.format(p.priceUsd)} · Notion template · Lifetime updates
        </span>
      </div>
    </aside>
  );
}
