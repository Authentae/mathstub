import { describe, it, expect } from 'vitest';
import { blogPosts } from '@/content/blog/registry';
import { blogRelations, postsForCalc } from '@/content/blog/related';
import { tools } from '@/lib/tools';

const registeredPostSlugs = new Set(blogPosts.map((p) => p.slug));
const registeredCalcSlugs = new Set(tools.map((t) => t.slug));

describe('blogRelations — internal-link cluster integrity', () => {
  it('every relation key is a registered blog post slug', () => {
    for (const key of Object.keys(blogRelations)) {
      expect(registeredPostSlugs.has(key)).toBe(true);
    }
  });

  it('every cross-referenced post slug exists in the registry', () => {
    const invalid: Array<{ from: string; ref: string }> = [];
    for (const [key, rel] of Object.entries(blogRelations)) {
      for (const ref of rel.posts) {
        if (!registeredPostSlugs.has(ref)) {
          invalid.push({ from: key, ref });
        }
      }
    }
    expect(invalid, `Broken post cross-references: ${JSON.stringify(invalid)}`).toEqual([]);
  });

  it('every cross-referenced calc slug exists in lib/tools', () => {
    const invalid: Array<{ from: string; ref: string }> = [];
    for (const [key, rel] of Object.entries(blogRelations)) {
      for (const ref of rel.calcs) {
        if (!registeredCalcSlugs.has(ref)) {
          invalid.push({ from: key, ref });
        }
      }
    }
    expect(invalid, `Broken calc cross-references: ${JSON.stringify(invalid)}`).toEqual([]);
  });

  it('no post cross-references itself', () => {
    const selfRefs: string[] = [];
    for (const [key, rel] of Object.entries(blogRelations)) {
      if (rel.posts.includes(key)) selfRefs.push(key);
    }
    expect(selfRefs, `Self-referencing posts: ${JSON.stringify(selfRefs)}`).toEqual([]);
  });

  it('each relation entry has at least one post reference', () => {
    for (const [key, rel] of Object.entries(blogRelations)) {
      expect(rel.posts.length, `${key} has zero post references`).toBeGreaterThan(0);
    }
  });

  it('each relation entry has at least one calc reference', () => {
    for (const [key, rel] of Object.entries(blogRelations)) {
      expect(rel.calcs.length, `${key} has zero calc references`).toBeGreaterThan(0);
    }
  });
});

describe('blogRelations — coverage', () => {
  // Every blog post should have a relation entry. Posts without relations
  // render a less-useful page (no CalcCta, no RelatedPosts). New posts
  // must be wired into related.ts when added to registry.ts.
  it('every registered blog post has a relation entry', () => {
    const missing: string[] = [];
    for (const post of blogPosts) {
      if (!(post.slug in blogRelations)) missing.push(post.slug);
    }
    expect(missing, `Posts missing from blogRelations: ${JSON.stringify(missing)}`).toEqual([]);
  });
});

describe('postsForCalc', () => {
  it('returns post slugs that reference the given calc', () => {
    const posts = postsForCalc('rsu-tax-shortfall');
    expect(posts.length).toBeGreaterThan(0);
    // Spot-check: every returned slug must be a registered post
    for (const slug of posts) {
      expect(registeredPostSlugs.has(slug)).toBe(true);
    }
  });

  it('returns an empty array for an unknown calc slug', () => {
    expect(postsForCalc('nonexistent-calc')).toEqual([]);
  });

  it.each(Array.from(registeredCalcSlugs))(
    'returns posts for live calc %s OR an empty array (no broken reverse-index)',
    (calcSlug) => {
      const posts = postsForCalc(calcSlug);
      // We don't require every calc to have a referencing post, but we DO
      // require that whatever is returned is a valid post slug.
      for (const slug of posts) {
        expect(registeredPostSlugs.has(slug)).toBe(true);
      }
    },
  );
});
