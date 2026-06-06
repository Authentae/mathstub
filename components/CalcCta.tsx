import Link from 'next/link';
import { liveTools } from '@/lib/tools';

interface Props {
  slugs: string[];
  /** Heading override. */
  heading?: string;
}

/**
 * Internal-link CTA rendered inside blog posts pointing at the calculators
 * that solve the math described in the post. Builds blog -> calc internal
 * links across the cluster.
 */
export function CalcCta({ slugs, heading = 'Run your own numbers' }: Props) {
  const all = liveTools();
  const calcs = slugs
    .map((s) => all.find((t) => t.slug === s))
    .filter((t): t is NonNullable<typeof t> => Boolean(t));

  if (calcs.length === 0) return null;

  return (
    <section className="my-6 rounded-lg border-2 border-brand-200 bg-brand-50 p-5 dark:border-brand-900 dark:bg-brand-950/40">
      <p className="mb-3 text-sm font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-200">
        {heading}
      </p>
      <ul className="grid gap-3 md:grid-cols-2">
        {calcs.map((t) => (
          <li key={t.slug}>
            <Link
              href={`/${t.slug}`}
              className="block rounded-md border border-brand-200 bg-white p-3 shadow-sm transition hover:border-brand-500 hover:shadow dark:border-brand-900 dark:bg-slate-950"
            >
              <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-slate-100">
                {t.emoji && <span aria-hidden>{t.emoji}</span>}
                <span>{t.shortTitle}</span>
              </div>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                {t.summary}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}
