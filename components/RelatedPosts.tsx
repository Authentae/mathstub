import Link from 'next/link';
import { blogPosts } from '@/content/blog/registry';

export function RelatedPosts({ slugs }: { slugs: string[] }) {
  const related = slugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (related.length === 0) return null;

  return (
    <aside className="mt-10 rounded-md border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-slate-500">
        Related reading
      </p>
      <ul className="grid gap-3 md:grid-cols-3">
        {related.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-md border border-slate-200 bg-white p-3 shadow-sm transition hover:border-brand-500 hover:shadow dark:border-slate-700 dark:bg-slate-950"
            >
              <p className="text-sm font-semibold text-slate-900 dark:text-slate-100">
                {p.title}
              </p>
              <p className="mt-1 text-xs text-slate-600 dark:text-slate-400 line-clamp-3">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
