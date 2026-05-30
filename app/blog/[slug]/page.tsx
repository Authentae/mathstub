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
        <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
          {post.title}
        </h1>
        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1">
          <LastUpdatedBadge taxYear={2026} isoDate={post.dateModified} />
          <ReadTime blocks={post.blocks} />
        </div>

        {post.quickAnswer && <QuickAnswer text={post.quickAnswer} />}

        {post.keyPoints && post.keyPoints.length > 0 && (
          <KeyPoints points={post.keyPoints} />
        )}

        <TableOfContents blocks={post.blocks} />

        <Disclaimer />

        <div className="mt-6 space-y-5 text-[17px] leading-[1.75] text-gray-800 dark:text-gray-200">
          {post.blocks.map((block, i) => (
            <Block key={i} block={block} />
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

function Block({ block }: { block: BlogBlock }) {
  switch (block.type) {
    case 'p':
      return <p>{renderInline(block.text)}</p>;
    case 'h2':
      return (
        <h2
          id={slugifyHeading(block.text)}
          className="mt-6 scroll-mt-20 text-2xl font-bold text-gray-900 dark:text-gray-100"
        >
          {block.text}
        </h2>
      );
    case 'h3':
      return (
        <h3
          id={slugifyHeading(block.text)}
          className="mt-4 scroll-mt-20 text-xl font-semibold text-gray-900 dark:text-gray-100"
        >
          {block.text}
        </h3>
      );
    case 'ul':
      return (
        <ul className="ml-5 list-disc space-y-2 marker:text-brand-500">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">{renderInline(it)}</li>
          ))}
        </ul>
      );
    case 'ol':
      return (
        <ol className="ml-5 list-decimal space-y-2 marker:font-semibold marker:text-brand-500">
          {block.items.map((it, i) => (
            <li key={i} className="pl-1">{renderInline(it)}</li>
          ))}
        </ol>
      );
    case 'quote':
      return (
        <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-700 dark:border-gray-700 dark:text-gray-300">
          {renderInline(block.text)}
          {block.cite && <cite className="block text-sm not-italic">— {block.cite}</cite>}
        </blockquote>
      );
    case 'callout':
      return (
        <div className="rounded-md border-l-4 border-brand-500 bg-brand-50 p-4 text-[15px] text-gray-800 dark:bg-gray-900 dark:text-gray-200">
          {renderInline(block.text)}
        </div>
      );
  }
}
