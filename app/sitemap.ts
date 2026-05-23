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
    ...stateStockCompProfiles.map((s) => ({
      url: `${root}/state-stock-comp/${s.code.toLowerCase()}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    })),
    ...TOOLKIT_PRODUCTS.map((p) => ({
      url: `${root}/toolkit/${p.slug}`,
      lastModified: now,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ];
}
