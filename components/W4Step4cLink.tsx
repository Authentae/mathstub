import Link from 'next/link';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

/**
 * Cross-link CTA shown on RSU / Bonus / NSO shortfall calc result panels.
 * Closes the loop: shortfall → "now what do I put on my W-4 to fix it?".
 *
 * Renders inline below the shortfall headline, NOT in the upsell card —
 * the W-4 calc is a free tool, the upsell card is the $19–$39 product.
 * Keeping them visually distinct prevents the free-tool flow from
 * competing with the paid-product flow for attention.
 */
export function W4Step4cLink({ shortfallUsd }: { shortfallUsd: number }) {
  if (shortfallUsd <= 0) return null;
  return (
    <Link
      href="/w4-step-4c"
      className="group mt-3 inline-flex items-center gap-2 rounded-md border border-brand-500/40 bg-brand-50 px-4 py-2.5 text-sm font-semibold text-brand-700 transition hover:border-brand-500 hover:bg-brand-100 hover:text-brand-800 dark:border-brand-500/30 dark:bg-brand-950/40 dark:text-brand-300 dark:hover:border-brand-400 dark:hover:bg-brand-900/30 dark:hover:text-brand-100"
    >
      <span aria-hidden="true" className="text-base">🧾</span>
      Now compute the W-4 Line 4(c) entry that closes this {usd.format(shortfallUsd)} shortfall
      <span aria-hidden="true" className="transition group-hover:translate-x-0.5">→</span>
    </Link>
  );
}
