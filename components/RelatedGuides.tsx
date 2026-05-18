import Link from 'next/link';
import { postsForCalc } from '@/content/blog/related';
import { blogPosts } from '@/content/blog/registry';

interface Props {
  calcSlug: string;
  /** Max posts to surface — defaults to 3. */
  max?: number;
}

/**
 * Reverse internal-link surface. On each calculator page, finds blog posts
 * tagged with this calc and links to them. Builds calc -> blog internal
 * links across the topical cluster.
 */
export function RelatedGuides({ calcSlug, max = 3 }: Props) {
  const postSlugs = postsForCalc(calcSlug).slice(0, max);
  const posts = postSlugs
    .map((s) => blogPosts.find((p) => p.slug === s))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  if (posts.length === 0) return null;

  return (
    <aside className="mt-8 rounded-md border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-950">
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-500">
        Guides for this topic
      </p>
      <ul className="space-y-2">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link
              href={`/blog/${p.slug}`}
              className="block rounded-md p-2 transition hover:bg-gray-50 dark:hover:bg-gray-900"
            >
              <p className="text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300">
                {p.title}
              </p>
              <p className="mt-1 text-xs text-gray-600 dark:text-gray-400 line-clamp-2">
                {p.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
