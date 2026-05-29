import Link from 'next/link';
import { liveTools } from '@/lib/tools';

const RELATED: Record<string, string[]> = {
  'rsu-tax-shortfall': ['rsu-cost-basis', 'bonus-tax-shortfall', 'espp-qualifying-disposition', 'quarterly-estimated-tax'],
  'rsu-cost-basis': ['rsu-tax-shortfall', 'espp-qualifying-disposition', 'state-stock-comp'],
  'bonus-tax-shortfall': ['rsu-tax-shortfall', 'quarterly-estimated-tax', 'nso-exercise'],
  'nso-exercise': ['iso-amt', 'rsu-tax-shortfall', 'quarterly-estimated-tax'],
  'iso-amt': ['amt-credit-recovery', 'nso-exercise', 'espp-qualifying-disposition'],
  'amt-credit-recovery': ['iso-amt', 'nso-exercise', 'quarterly-estimated-tax'],
  'espp-qualifying-disposition': ['iso-amt', 'nso-exercise', 'rsu-tax-shortfall'],
  'quarterly-estimated-tax': ['rsu-tax-shortfall', 'bonus-tax-shortfall', 'nso-exercise'],
  'state-stock-comp': ['rsu-tax-shortfall', 'iso-amt', 'espp-qualifying-disposition'],
  'mega-backdoor-roth': ['roth-sequencer', 'backdoor-roth-ira', 'quarterly-estimated-tax', 'rsu-tax-shortfall'],
  'backdoor-roth-ira': ['roth-sequencer', 'mega-backdoor-roth', 'quarterly-estimated-tax', 'rsu-tax-shortfall'],
  'roth-sequencer': ['mega-backdoor-roth', 'backdoor-roth-ira', 'quarterly-estimated-tax'],
  'w4-step-4c': ['rsu-tax-shortfall', 'bonus-tax-shortfall', 'quarterly-estimated-tax'],
  'form-6251': ['iso-amt', 'amt-credit-recovery', 'nso-exercise'],
  'ca-540nr': ['state-stock-comp', 'rsu-tax-shortfall', 'quarterly-estimated-tax'],
  'double-trigger-rsu': ['rsu-tax-shortfall', 'rsu-cost-basis', 'quarterly-estimated-tax'],
};

export function RelatedCalcs({ currentSlug }: { currentSlug: string }) {
  const relatedSlugs = RELATED[currentSlug] ?? [];
  const all = liveTools();
  const related = relatedSlugs
    .map((s) => all.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (related.length === 0) return null;

  return (
    <aside className="mt-8 rounded-md border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Related calculators
      </p>
      <ul className="grid gap-3 md:grid-cols-3">
        {related.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
              className="block rounded-md border border-gray-200 bg-white p-3 text-sm shadow-sm transition hover:border-brand-500 hover:shadow dark:border-gray-700 dark:bg-gray-950"
            >
              <div className="flex items-center gap-2 font-semibold text-gray-900 dark:text-gray-100">
                {t.emoji && <span aria-hidden>{t.emoji}</span>}
                <span>{t.shortTitle}</span>
              </div>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-3">
                {t.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
