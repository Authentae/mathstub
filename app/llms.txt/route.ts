import { liveTools } from '@/lib/tools';
import { blogPosts } from '@/content/blog/registry';
import { siteUrl } from '@/lib/seo';

/**
 * /llms.txt — a machine-readable index of the site for AI crawlers and
 * AI dev tools (the llmstxt.org convention). For a new, low-authority
 * site, AI-answer citation is the most realistic discovery channel, and
 * cited pages earn materially more clicks. This hands the crawlers a
 * clean map of every calculator + guide with a one-line description,
 * generated from the same registries that drive the nav and sitemap so
 * it can never drift out of sync.
 */
export const dynamic = 'force-static';

export function GET() {
  const root = siteUrl();
  const tools = liveTools()
    .map((t) => `- [${t.title}](${root}/${t.slug}): ${t.summary}`)
    .join('\n');
  const guides = blogPosts
    .map((p) => `- [${p.title}](${root}/blog/${p.slug}): ${p.description}`)
    .join('\n');

  const body = `# Mathstub

> Free, IRS-cited tax calculators and plain-English guides for US tech workers with equity compensation: RSUs, ISOs, NSOs, ESPP, AMT, Roth strategies, and multi-state moves. Every calculation runs client-side in the browser (no data leaves the user's device), and every tax claim cites an IRC section or IRS publication by number.

## Calculators
${tools}

## Guides
${guides}

## About
- [Methodology and sourcing](${root}/methodology): how the math is built and reviewed against IRS primary sources.
- [Editorial policy](${root}/editorial-policy): accuracy and review standards.
- [Disclaimer](${root}/disclaimer): educational information, not tax advice; confirm with a CPA for high-stakes decisions.
`;

  return new Response(body, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600',
    },
  });
}
