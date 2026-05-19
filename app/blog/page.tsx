import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { blogPosts, type BlogPost } from '@/content/blog/registry';
import { blogCategories, findCategoryForSlug } from '@/content/blog/categories';

export const metadata: Metadata = buildMetadata({
  slug: 'blog',
  title: 'Blog — equity comp tax explained',
  description:
    'Articles on RSU tax, ISO/NSO mechanics, ESPP qualifying-disposition timing, multi-state sourcing, and the rules behind every Mathstub calculator. Every claim cites IRC §, Treas. Reg., or IRS Pub.',
});

function dateLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

function PostCard({ post }: { post: BlogPost }) {
  const category = findCategoryForSlug(post.slug);
  return (
    <li
      className="rounded-md border border-gray-200 bg-white p-5 transition hover:border-brand-500 hover:shadow-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <Link href={`/blog/${post.slug}`} className="block">
        <div className="mb-1 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span>{dateLabel(post.datePublished)}</span>
          {category && (
            <>
              <span aria-hidden="true">·</span>
              <span className="rounded-full bg-brand-50 px-2 py-0.5 font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
                {category.name}
              </span>
            </>
          )}
        </div>
        <h2 className="text-xl font-semibold text-brand-700 dark:text-brand-100">
          {post.title}
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">{post.description}</p>
      </Link>
    </li>
  );
}

export default function BlogIndex() {
  const sorted = [...blogPosts].sort((a, b) =>
    a.datePublished < b.datePublished ? 1 : -1,
  );
  const latest = sorted.slice(0, 5);
  const slugIndex = new Map(blogPosts.map((p) => [p.slug, p]));

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">Blog</h1>
      <p className="mt-2 text-gray-700 dark:text-gray-300">
        Articles on equity-comp tax mechanics, RSU planning, and the rules
        behind every calculator on this site. {blogPosts.length} posts so
        far, each citing the IRC section or IRS publication that controls
        the underlying rule.
      </p>

      {/* Jump-to-section list — useful when the page gets long */}
      <nav aria-label="Blog categories" className="mt-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
          Jump to a topic
        </p>
        <ul className="flex flex-wrap gap-x-3 gap-y-1">
          <li>
            <a href="#latest" className="text-brand-700 hover:underline dark:text-brand-300">
              Latest ({latest.length})
            </a>
          </li>
          {blogCategories.map((c) => (
            <li key={c.id}>
              <a href={`#${c.id}`} className="text-brand-700 hover:underline dark:text-brand-300">
                {c.name} ({c.slugs.length})
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <section id="latest" className="mt-10 scroll-mt-20">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Latest</h2>
        <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
          The {latest.length} most recently published or substantively updated posts.
        </p>
        <ul className="mt-4 space-y-4">
          {latest.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </ul>
      </section>

      {blogCategories.map((category) => {
        const categoryPosts = category.slugs
          .map((slug) => slugIndex.get(slug))
          .filter((p): p is BlogPost => Boolean(p))
          .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1));
        if (categoryPosts.length === 0) return null;
        return (
          <section
            key={category.id}
            id={category.id}
            className="mt-12 scroll-mt-20 border-t border-gray-200 pt-8 dark:border-gray-800"
          >
            <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {category.name}
            </h2>
            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">{category.blurb}</p>
            <ul className="mt-4 space-y-4">
              {categoryPosts.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </ul>
          </section>
        );
      })}
    </main>
  );
}
