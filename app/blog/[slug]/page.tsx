import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
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
import { QuickAnswer } from '@/components/QuickAnswer';
import { KeyPoints } from '@/components/KeyPoints';
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
  return buildMetadata({
    slug: `blog/${post.slug}`,
    title: post.title,
    description: post.description,
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

      <article className="mx-auto max-w-3xl px-4 py-12">
        {/*
          Breadcrumb: All posts → Category. Uses the categories.ts mapping
          so it stays in sync with the /blog index. Renders even if the
          category is missing (defensive — keeps the "All posts" trail).
        */}
        {(() => {
          const category = findCategoryForSlug(post.slug);
          return (
            <p
              className="text-sm text-gray-500 dark:text-gray-400"
              aria-label="Breadcrumb"
            >
              <Link href="/blog" className="hover:underline">
                ← All posts
              </Link>
              {category && (
                <>
                  {' · '}
                  <Link
                    href={`/blog#${category.id}`}
                    className="text-brand-700 hover:underline dark:text-brand-300"
                  >
                    {category.name}
                  </Link>
                </>
              )}
            </p>
          );
        })()}
        <h1 className="mt-3 text-[34px] font-bold leading-[1.15] tracking-tight text-gray-900 dark:text-gray-50 sm:text-[42px]">
          {post.title}
        </h1>
        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 border-b border-gray-200 pb-5 text-sm text-gray-500 dark:border-gray-800">
          <span className="font-medium text-gray-700 dark:text-gray-300">{post.authorName}</span>
          <span aria-hidden="true">·</span>
          <ReadTime blocks={post.blocks} />
          <span aria-hidden="true">·</span>
          <LastUpdatedBadge taxYear={2026} isoDate={post.dateModified} />
        </div>

        {post.quickAnswer && <QuickAnswer text={post.quickAnswer} />}

        {post.keyPoints && post.keyPoints.length > 0 && (
          <KeyPoints points={post.keyPoints} />
        )}

        <TableOfContents blocks={post.blocks} />

        <Disclaimer />

        <div className="mt-8 space-y-5 text-[17px] leading-[1.8] text-gray-800 dark:text-gray-200">
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
          <section className="mt-10 border-t border-gray-200 pt-8 dark:border-gray-800">
            <h2 className="mb-3 text-xl font-bold text-gray-900 dark:text-gray-100">
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

        <p className="mt-10 text-sm text-gray-500">
          By {post.authorName}
          {post.reviewerName ? ` · Reviewed by ${post.reviewerName}` : ''}
        </p>

        <WasThisHelpful context={post.slug} />
        <ReportIssue context={`blog/${post.slug}`} />
      </article>
    </>
  );
}

function Block({ block, isLede = false }: { block: BlogBlock; isLede?: boolean }) {
  switch (block.type) {
    case 'p':
      // First paragraph reads as a magazine "lede" — larger, lighter weight,
      // sets the scene before the body settles into normal size.
      if (isLede) {
        return (
          <p className="text-xl leading-relaxed text-gray-700 first-letter:float-left first-letter:mr-3 first-letter:mt-1 first-letter:font-serif first-letter:text-6xl first-letter:font-bold first-letter:leading-[0.8] first-letter:text-brand-600 dark:text-gray-300 dark:first-letter:text-brand-400">
            {renderInline(block.text)}
          </p>
        );
      }
      return <p>{renderInline(block.text)}</p>;
    case 'h2':
      // Section heading as a clear visual break: hairline rule above + a brand
      // accent bar before the title. Reads like a magazine section, not a
      // numbered academic subsection.
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mt-12 scroll-mt-24 flex items-center gap-3 border-t border-gray-200 pt-8 text-[26px] font-bold leading-tight tracking-tight text-gray-900 dark:border-gray-800 dark:text-gray-50"
        >
          <span
            aria-hidden="true"
            className="h-7 w-1.5 shrink-0 rounded-full bg-brand-500"
          />
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={slugifyHeading(block.text)}
          className="mt-8 scroll-mt-24 text-xl font-semibold text-gray-900 dark:text-gray-100"
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
        <blockquote className="my-2 border-l-4 border-brand-400 pl-5 text-xl font-medium italic leading-relaxed text-gray-700 dark:border-brand-500 dark:text-gray-200">
          {renderInline(block.text)}
          {block.cite && (
            <cite className="mt-2 block text-sm font-normal not-italic text-gray-500">
              — {block.cite}
            </cite>
          )}
        </blockquote>
      );
    case 'callout':
      // Highlight box — a "stop and read this" card with an icon, distinct
      // from body text so the key takeaway pops on a skim.
      return (
        <aside className="my-2 flex gap-3 rounded-xl border border-brand-500/30 bg-brand-50 p-5 dark:bg-brand-950/40">
          <span aria-hidden="true" className="mt-0.5 text-xl">💡</span>
          <div className="text-[15px] leading-relaxed text-gray-800 dark:text-gray-100">
            {renderInline(block.text)}
          </div>
        </aside>
      );
  }
}
