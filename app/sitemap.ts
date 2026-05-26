import type { MetadataRoute } from 'next';
import { siteUrl } from '@/lib/seo';
import { liveTools } from '@/lib/tools';
import { blogPosts } from '@/content/blog/registry';
import { stateStockCompProfiles } from '@tax/state-stock-comp';
import { TOOLKIT_PRODUCTS } from '@/lib/toolkit';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const root = siteUrl();
  const staticPages = [
    '',
    '/start-here',
    '/blog',
    '/glossary',
    '/toolkit',
    '/about',
    '/methodology',
    '/editorial-policy',
    '/disclaimer',
    '/privacy',
    '/terms',
  ];

  return [
    ...staticPages.map((p) => ({
      url: `${root}${p}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: p === '' ? 1 : 0.5,
    })),
    ...liveTools().map((t) => ({
      url: `${root}/${t.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
    ...blogPosts.map((p) => ({
      url: `${root}/blog/${p.slug}`,
      lastModified: new Date(p.dateModified),
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    })),
    // Per-state pages currently noindexed (template-thin, see app/state-stock-comp/[state]/page.tsx).
    // Re-add when each state has substantive unique content (worked examples, DOR citations, etc.).
    ...TOOLKIT_PRODUCTS.map((p) => ({
      url: `${root}/toolkit/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
