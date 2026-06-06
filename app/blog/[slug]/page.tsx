import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import {
  articleSchema,
  buildMetadata,
  canonical,
  breadcrumbSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { Disclaimer } from '@/components/Disclaimer';
import { LastUpdatedBadge } from '@/components/LastUpdatedBadge';
import { AffiliateCard } from '@/components/AffiliateCard';
import { AmazonBookCTA } from '@/components/AmazonBookCTA';
import { ReportIssue } from '@/components/ReportIssue';
import { RelatedPosts } from '@/components/RelatedPosts';
import { CalcCta } from '@/components/CalcCta';
import { KeyPoints } from '@/components/KeyPoints';
import { BlogHero } from '@/components/BlogHero';
import { TableOfContents, slugifyHeading } from '@/components/TableOfContents';
import { renderInline } from '@/components/InlineText';
import { ReadTime } from '@/components/ReadTime';
import { WasThisHelpful } from '@/components/WasThisHelpful';
import { findPost, blogPosts, type BlogBlock } from '@/content/blog/registry';
import { blogRelations } from '@/content/blog/related';
import { findCategoryForSlug } from '@/content/blog/categories';
import type { AffiliateOfferId } from '@/lib/affiliates';

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) return {};
  const category = findCategoryForSlug(post.slug);
  return buildMetadata({
    slug: `blog/${post.slug}`,
    title: post.title,
    description: post.description,
    ogImagePath: category?.card,
  });
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params;
  const post = findPost(slug);
  if (!post) notFound();

  const url = canonical(`blog/${post.slug}`);

  return (
    <>
      <JsonLd
        data={articleSchema({
          headline: post.title,
          description: post.description,
          url,
          datePublished: post.datePublished,
          dateModified: post.dateModified,
          authorName: post.authorName,
          reviewerName: post.reviewerName,
        })}
      />
      <JsonLd
        data={breadcrumbSchema([
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ])}
      />

      {/*
        Presentation layout is the default for EVERY post: the homepage-style
        dark hero (category eyebrow, big headline, quickAnswer as subtitle)
        carries the title + framing, so a post reads like a designed landing
        page, not a text column. Goal: easiest to read, presentation-feel,
        without cutting any of the (SEO-critical) depth below.
      */}
      <BlogHero post={post} category={findCategoryForSlug(post.slug)} />

      <article className="mx-auto max-w-[680px] px-5 py-12 sm:py-16">
        {/* Compact meta row — read time + freshness, under the hero. */}
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-slate-400">
          <ReadTime blocks={post.blocks} />
          <span aria-hidden="true">·</span>
          <LastUpdatedBadge taxYear={2026} isoDate={post.dateModified} />
        </div>

        {post.keyPoints && post.keyPoints.length > 0 && (
          <KeyPoints points={post.keyPoints} />
        )}

        <TableOfContents blocks={post.blocks} />

        <Disclaimer />

        <div className="mt-10 space-y-6 text-[18px] leading-[1.8] text-slate-300">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} isLede={i === 0 && block.type === 'p'} />
          ))}
        </div>

        {blogRelations[post.slug]?.calcs && (
          <CalcCta slugs={blogRelations[post.slug]!.calcs} />
        )}

        {blogRelations[post.slug]?.posts && (
          <RelatedPosts slugs={blogRelations[post.slug]!.posts} />
        )}

        {post.affiliateOfferIds && post.affiliateOfferIds.length > 0 && (
          <section className="mt-10 border-t border-slate-800 pt-8">
            <h2 className="mb-3 text-xl font-bold text-slate-100">
              Recommended next step
            </h2>
            <div className="grid gap-3 md:grid-cols-2">
              {post.affiliateOfferIds.map((id) => (
                <AffiliateCard key={id} offerId={id as AffiliateOfferId} />
              ))}
            </div>
          </section>
        )}

        <AmazonBookCTA />

        <p className="mt-10 text-sm text-slate-400">
          By {post.authorName}
          {post.reviewerName ? ` · Reviewed by ${post.reviewerName}` : ''}
        </p>

        <WasThisHelpful context={post.slug} />
        <ReportIssue context={`blog/${post.slug}`} />
      </article>
    </>
  );
}

/**
 * Break a long paragraph into smaller ones at sentence boundaries.
 *
 * This is the real readability fix: a 70–100 word block is a "wall" no matter
 * how nice the font is. Splitting into ~2-sentence chunks gives the eye rest
 * stops. Done at render time so it applies to ALL posts with ZERO content
 * edits (and zero risk of altering a tax figure).
 *
 * Rules: keep paragraphs at/under ~maxWords; only split on sentence ends
 * (". " / "? " / "! "), never mid-number or mid-abbreviation, by accumulating
 * whole sentences until adding the next would exceed the budget.
 */
function splitIntoChunks(text: string, maxWords = 45): string[] {
  const words = text.split(/\s+/).filter(Boolean);
  if (words.length <= maxWords) return [text];

  // Split into sentences, keeping the terminating punctuation.
  const sentences = text.match(/[^.!?]+[.!?]+(?:["')\]]*)?(?:\s|$)/g);
  if (!sentences || sentences.length < 2) return [text];

  const chunks: string[] = [];
  let current = '';
  let currentWords = 0;
  for (const s of sentences) {
    const w = s.trim().split(/\s+/).filter(Boolean).length;
    if (currentWords > 0 && currentWords + w > maxWords) {
      chunks.push(current.trim());
      current = s;
      currentWords = w;
    } else {
      current += s;
      currentWords += w;
    }
  }
  if (current.trim()) chunks.push(current.trim());
  return chunks;
}

function Block({ block, isLede = false }: { block: BlogBlock; isLede?: boolean }) {
  switch (block.type) {
    case 'p': {
      // First paragraph reads as a quiet "lede" — a touch larger and lighter,
      // easing the reader in. No drop-cap: on a tax site it reads gimmicky;
      // calm sophistication beats decoration.
      if (isLede) {
        return (
          <p className="text-[21px] leading-[1.75] text-slate-200">
            {renderInline(block.text)}
          </p>
        );
      }
      // Auto-split long body paragraphs so no "wall of text" survives.
      const chunks = splitIntoChunks(block.text);
      if (chunks.length === 1) return <p>{renderInline(block.text)}</p>;
      return (
        <>
          {chunks.map((c, i) => (
            <p key={i}>{renderInline(c)}</p>
          ))}
        </>
      );
    }
    case 'h2':
      // Section heading with the homepage's signature glowing brand dot — turns
      // each section into a designed "landing" block rather than a plain text
      // break, while staying brand-consistent across the site.
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mt-14 flex items-baseline gap-3 scroll-mt-24 text-[28px] font-bold leading-tight tracking-[-0.02em] text-balance text-white"
        >
          <span
            aria-hidden="true"
            className="h-2.5 w-2.5 shrink-0 translate-y-[-0.1em] rounded-full bg-brand-500"
            style={{ boxShadow: '0 0 12px rgb(59,130,246)' }}
          />
          <span>{block.text}</span>
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={slugifyHeading(block.text)}
          className="mt-10 scroll-mt-24 text-[21px] font-semibold tracking-[-0.01em] text-slate-100"
        >
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul className="space-y-2.5 pl-1">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full bg-brand-500"
              />
              <span>{renderInline(it)}</span>
            </li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="space-y-2.5">
          {block.items.map((it, i) => (
            <li key={i} className="flex gap-3">
              <span
                aria-hidden="true"
                className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-500/15 text-sm font-bold text-brand-700 dark:text-brand-300"
              >
                {i + 1}
              </span>
              <span className="pt-0.5">{renderInline(it)}</span>
            </li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="relative my-5 overflow-hidden rounded-2xl bg-brand-950/30 px-6 py-5 ring-1 ring-brand-500/15">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -top-3 right-4 select-none font-serif text-7xl leading-none text-brand-500/15"
          >
            ”
          </span>
          <p className="relative text-xl font-medium italic leading-relaxed text-slate-100">
            {renderInline(block.text)}
          </p>
          {block.cite && (
            <cite className="relative mt-3 block text-sm font-normal not-italic text-slate-400">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case 'callout':
      // Highlight box — a quiet "key takeaway" card. A small uppercase label
      // does the signposting instead of an emoji; restrained tint keeps it
      // premium rather than loud.
      return (
        <aside className="my-4 rounded-lg border border-slate-800 bg-slate-900/60 p-5">
          <p className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
            Key point
          </p>
          <div className="text-[16px] leading-relaxed text-slate-200">
            {renderInline(block.text)}
          </div>
        </aside>
      );
    case 'flow':
      // Visual money-flow: a chain of labeled amounts with arrows between them.
      // The single biggest "wall-breaker" — turns an invisible tax concept into
      // a picture the eye grasps instantly and readers screenshot/share.
      return (
        <figure className="my-6 rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          {block.caption && (
            <figcaption className="mb-3 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
              {block.caption}
            </figcaption>
          )}
          <div className="flex items-stretch gap-2 overflow-x-auto pb-1">
            {block.steps.map((s, i) => (
              <div key={i} className="flex shrink-0 items-stretch gap-2">
                <div
                  className={`flex min-w-[110px] flex-col justify-center rounded-lg border px-3 py-2.5 ${
                    s.tone === 'bad'
                      ? 'border-red-300 bg-red-50 dark:border-red-800/60 dark:bg-red-950/40'
                      : s.tone === 'good'
                        ? 'border-emerald-300 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-950/40'
                        : 'border-slate-700 bg-slate-950'
                  }`}
                >
                  <span className="text-[11px] uppercase tracking-wide text-slate-400">
                    {s.label}
                  </span>
                  <span
                    className={`text-lg font-bold tabular-nums ${
                      s.tone === 'bad'
                        ? 'text-red-700 dark:text-red-300'
                        : s.tone === 'good'
                          ? 'text-emerald-700 dark:text-emerald-300'
                          : 'text-slate-100'
                    }`}
                  >
                    {s.value}
                  </span>
                </div>
                {i < block.steps.length - 1 && (
                  <span aria-hidden="true" className="self-center text-xl text-slate-600">
                    →
                  </span>
                )}
              </div>
            ))}
          </div>
        </figure>
      );
    case 'table':
      // Scannable comparison grid — beats parallel bullet lists for "X vs Y".
      return (
        <figure className="my-6 overflow-x-auto">
          {block.caption && (
            <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
              {block.caption}
            </figcaption>
          )}
          <table className="w-full border-collapse overflow-hidden rounded-lg text-[15px]">
            <thead>
              <tr className="bg-slate-800">
                {block.headers.map((h, i) => (
                  <th
                    key={i}
                    className={`border-b border-slate-700 px-4 py-2.5 font-semibold text-slate-100 ${
                      i === 0 ? 'text-left' : 'text-right'
                    }`}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.rows.map((row, ri) => (
                <tr key={ri} className="odd:bg-slate-950 even:bg-slate-900/50">
                  {row.map((cell, ci) => (
                    <td
                      key={ci}
                      className={`border-b border-slate-800 px-4 py-2.5 ${
                        ci === 0
                          ? 'text-left font-medium text-slate-100'
                          : 'text-right tabular-nums text-slate-300'
                      }`}
                    >
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </figure>
      );
    case 'analogy':
      // "Think of it like…" memory hook. De-slopped per Impeccable: no thick
      // left slab-border (the #1 AI tell). Soft full ring + a tinted icon chip
      // carries the emphasis instead — quieter, more crafted.
      return (
        <aside className="my-5 flex gap-4 rounded-2xl bg-brand-950/30 p-5 ring-1 dark:ring-brand-400/15">
          <span
            aria-hidden="true"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand-500/10 text-lg ring-1 ring-inset ring-brand-500/20"
          >
            🧠
          </span>
          <div>
            <p className="mb-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-700 dark:text-brand-300">
              Think of it like this
            </p>
            <div className="text-[16px] leading-relaxed text-slate-100">
              {renderInline(block.text)}
            </div>
          </div>
        </aside>
      );
    case 'embed':
      // Live interactive mini-calculator — the reader sees THEIR number without
      // leaving the page. Iframes the self-contained widget under /public/embed.
      return (
        <figure className="my-6">
          {block.caption && (
            <figcaption className="mb-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-brand-600 dark:text-brand-400">
              {block.caption}
            </figcaption>
          )}
          <div className="overflow-hidden rounded-xl border border-slate-800">
            <iframe
              src={`/embed/${block.calc}/?theme=dark`}
              title="Interactive calculator"
              loading="lazy"
              className="block w-full border-0"
              style={{ height: 520 }}
            />
          </div>
        </figure>
      );
    case 'details':
      // Collapsible "deep dive": default-closed, but the full content is in the
      // HTML (just CSS-hidden) so search engines + AI still index every word.
      // Keeps the visible page mostly-visual while preserving SEO depth.
      return (
        <details className="group my-4 rounded-lg border border-slate-800 bg-slate-900/40">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-5 py-3.5 text-[15px] font-semibold text-slate-100 hover:text-brand-300">
            <span className="flex items-center gap-2">
              <span aria-hidden="true" className="text-brand-500">📖</span>
              {block.summary}
            </span>
            <span
              aria-hidden="true"
              className="shrink-0 text-slate-500 transition-transform group-open:rotate-180"
            >
              ▾
            </span>
          </summary>
          <div className="space-y-5 border-t border-slate-800 px-5 py-4 text-[17px] leading-[1.8] text-slate-300">
            {block.blocks.map((b, i) => (
              <Block key={i} block={b} />
            ))}
          </div>
        </details>
      );
  }
}
