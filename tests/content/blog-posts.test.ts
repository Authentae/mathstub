import { describe, it, expect } from 'vitest';
import { blogPosts, type BlogBlock } from '@/content/blog/registry';

const SLUG_PATTERN = /^[a-z0-9]+(-[a-z0-9]+)*$/;

function countWords(text: string): number {
  return text.split(/\s+/).filter(Boolean).length;
}

function lastParagraph(blocks: BlogBlock[]): string | null {
  for (let i = blocks.length - 1; i >= 0; i--) {
    const b = blocks[i]!;
    if (b.type === 'p') return b.text;
  }
  return null;
}

describe('blogPosts — required fields', () => {
  it.each(blogPosts.map((p) => [p.slug, p]))(
    '%s has all required fields populated',
    (_slug, post) => {
      expect(post.slug.length).toBeGreaterThan(0);
      expect(post.title.length).toBeGreaterThan(10);
      expect(post.description.length).toBeGreaterThan(30);
      expect(post.datePublished.length).toBe(10); // YYYY-MM-DD
      expect(post.dateModified.length).toBe(10);
      expect(post.authorName.length).toBeGreaterThan(0);
      expect(post.blocks.length).toBeGreaterThan(0);
    },
  );

  it('all slugs are unique', () => {
    const slugs = blogPosts.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it('all slugs are kebab-case (lowercase letters, digits, single hyphens)', () => {
    for (const post of blogPosts) {
      expect(post.slug, `Invalid slug: ${post.slug}`).toMatch(SLUG_PATTERN);
    }
  });
});

describe('blogPosts — date integrity', () => {
  it('every date string parses as a valid ISO date', () => {
    for (const post of blogPosts) {
      expect(Number.isNaN(new Date(post.datePublished).getTime())).toBe(false);
      expect(Number.isNaN(new Date(post.dateModified).getTime())).toBe(false);
    }
  });

  it('dateModified >= datePublished for every post', () => {
    for (const post of blogPosts) {
      const pub = new Date(post.datePublished).getTime();
      const mod = new Date(post.dateModified).getTime();
      expect(mod, `${post.slug}: modified < published`).toBeGreaterThanOrEqual(pub);
    }
  });
});

describe('blogPosts — content structure', () => {
  it('every post has at least one H2 heading', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      const h2Count = post.blocks.filter((b) => b.type === 'h2').length;
      if (h2Count === 0) missing.push(post.slug);
    }
    expect(missing, `Posts with zero H2 headings: ${JSON.stringify(missing)}`).toEqual([]);
  });

  // Word-count floor enforces "not thin content." Universal 800-word floor
  // applies to every post — the legacy carve-out for pre-2026-05-15 posts
  // was retired once all six legacy posts were backfilled to meet the
  // standard. New posts can never silently slip below the bar.
  it('every post has at least 800 words total', () => {
    const thin: Array<{ slug: string; words: number }> = [];
    for (const post of blogPosts) {
      const words = post.blocks.reduce((sum, b) => {
        if (b.type === 'p' || b.type === 'h2' || b.type === 'h3' || b.type === 'callout' || b.type === 'quote') {
          return sum + countWords(b.text);
        }
        if (b.type === 'ul' || b.type === 'ol') {
          return sum + b.items.reduce((s, it) => s + countWords(it), 0);
        }
        return sum;
      }, 0);
      if (words < 800) thin.push({ slug: post.slug, words });
    }
    expect(thin, `Thin posts (<800 words): ${JSON.stringify(thin)}`).toEqual([]);
  });

  // Sources-block requirement is a YMYL trust signal. Universal — every
  // post must end with a "Sources:" paragraph citing the controlling IRC §,
  // Treas. Reg., IRS Pub, or state regulatory authority.
  it('every post ends with a Sources citation paragraph', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      const last = lastParagraph(post.blocks);
      if (!last || !/^Sources?:/i.test(last.trim())) {
        missing.push(post.slug);
      }
    }
    expect(missing, `Posts missing Sources block: ${JSON.stringify(missing)}`).toEqual([]);
  });

  it('Sources block (when present) cites IRC, Treas. Reg., or IRS publication material', () => {
    const weak: string[] = [];
    for (const post of blogPosts) {
      const last = lastParagraph(post.blocks);
      if (!last || !/^Sources?:/i.test(last.trim())) continue;
      // Accept any of: §nnn, IRC §nnn, Treas. Reg., IRS Pub/Form/Publication/Topic, Cal. Code Regs., FTB Pub, Rev. Proc., SEC Rule
      if (!/§\d+|IRS\s+(Pub|Form|Publication|Topic)|Treas\.\s+Reg\.|Cal\.\s+Code\s+Regs\.|FTB\s+Pub|Rev\.\s+Proc\.|SEC\s+Rule/i.test(last)) {
        weak.push(post.slug);
      }
    }
    expect(weak, `Posts with weak source citations: ${JSON.stringify(weak)}`).toEqual([]);
  });
});

describe('blogPosts — QuickAnswer (LLM-citation feature)', () => {
  // QuickAnswer is the engineered LLM-citation surface — short enough that
  // models lift it verbatim, long enough to carry the answer + a key
  // citation. 30-100 words is the band we want to enforce.
  it.each(
    blogPosts
      .filter((p) => p.quickAnswer !== undefined)
      .map((p) => [p.slug, p.quickAnswer!]),
  )('%s QuickAnswer is in the 30-100 word band', (slug, text) => {
    const words = countWords(text);
    expect(words, `${slug}: ${words} words`).toBeGreaterThanOrEqual(30);
    expect(words, `${slug}: ${words} words`).toBeLessThanOrEqual(120);
  });

  it('every post shipped in 2026 has a QuickAnswer (LLM-citation engineered)', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      const year = Number(post.datePublished.slice(0, 4));
      if (year >= 2026 && !post.quickAnswer) missing.push(post.slug);
    }
    expect(missing, `2026 posts missing QuickAnswer: ${JSON.stringify(missing)}`).toEqual([]);
  });
});

describe('blogPosts — affiliate offers', () => {
  it('every post has at least one affiliateOfferId', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      if (!post.affiliateOfferIds || post.affiliateOfferIds.length === 0) {
        missing.push(post.slug);
      }
    }
    expect(missing, `Posts missing affiliateOfferIds: ${JSON.stringify(missing)}`).toEqual([]);
  });
});
