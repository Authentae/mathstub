import Link from 'next/link';
import type { BlogPost } from '@/content/blog/registry';
import type { BlogCategory } from '@/content/blog/categories';

/**
 * Landing-page-style hero for opt-in blog posts (`post.landing === true`).
 * Mirrors the homepage look: dark slate-950 canvas + blue radial glow, mono
 * uppercase eyebrow with a glowing dot, a huge tracking-tight headline, and
 * the QuickAnswer rendered as the hero subtitle. Makes a post read like a
 * designed landing page instead of a text column — without changing any of the
 * post's body content (that still renders below in the article).
 */
export function BlogHero({
  post,
  category,
}: {
  post: BlogPost;
  category?: BlogCategory;
}) {
  return (
    <div
      className="relative overflow-hidden border-b border-slate-800 bg-slate-950 text-slate-100"
      style={{
        backgroundImage:
          'radial-gradient(900px 600px at 88% -10%, rgba(37,99,235,0.20), transparent 60%), radial-gradient(700px 500px at 4% 18%, rgba(29,78,216,0.12), transparent 60%)',
      }}
    >
      <div className="mx-auto max-w-4xl px-6 py-14 sm:px-10 sm:py-20">
        <div className="mb-6 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
          <span
            className="h-1.5 w-1.5 rounded-full bg-brand-500"
            style={{ boxShadow: '0 0 12px rgb(59, 130, 246)' }}
            aria-hidden="true"
          />
          {category ? category.name : 'Mathstub guide'}
          <span aria-hidden="true" className="text-slate-600">·</span>
          <span className="text-slate-500">{post.authorName}</span>
        </div>

        <h1 className="max-w-3xl font-bold leading-[1.02] tracking-[-0.03em] text-white text-[40px] sm:text-[56px]">
          {post.title}
        </h1>

        {post.quickAnswer && (
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-slate-300 sm:text-xl">
            {post.quickAnswer}
          </p>
        )}

        <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-500">
          <Link href="/blog" className="hover:text-brand-300">
            ← all guides
          </Link>
          <span aria-hidden="true">·</span>
          <span className="text-brand-400">✓ Reviewed against IRS sources</span>
          <span aria-hidden="true">·</span>
          <span>Free · no signup</span>
        </div>
      </div>
    </div>
  );
}
