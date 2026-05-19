import { describe, it, expect } from 'vitest';
import { blogPosts } from '@/content/blog/registry';
import { blogCategories, findCategoryForSlug } from '@/content/blog/categories';

const registeredPostSlugs = new Set(blogPosts.map((p) => p.slug));

describe('blogCategories — coverage', () => {
  it('every registered blog post belongs to exactly one category', () => {
    const violations: Array<{ slug: string; count: number; categories: string[] }> = [];
    for (const post of blogPosts) {
      const inCategories = blogCategories.filter((c) => c.slugs.includes(post.slug));
      if (inCategories.length !== 1) {
        violations.push({
          slug: post.slug,
          count: inCategories.length,
          categories: inCategories.map((c) => c.id),
        });
      }
    }
    expect(violations, `Posts in zero or multiple categories: ${JSON.stringify(violations)}`).toEqual([]);
  });

  it('every slug referenced in a category is a registered blog post', () => {
    const orphans: Array<{ category: string; slug: string }> = [];
    for (const category of blogCategories) {
      for (const slug of category.slugs) {
        if (!registeredPostSlugs.has(slug)) {
          orphans.push({ category: category.id, slug });
        }
      }
    }
    expect(orphans, `Category references to unknown post slugs: ${JSON.stringify(orphans)}`).toEqual([]);
  });

  it('total slug references across categories equals total post count', () => {
    const total = blogCategories.reduce((sum, c) => sum + c.slugs.length, 0);
    expect(total).toBe(blogPosts.length);
  });
});

describe('blogCategories — data integrity', () => {
  it('every category has a unique id', () => {
    const ids = blogCategories.map((c) => c.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('every category id is kebab-case', () => {
    for (const c of blogCategories) {
      expect(c.id, `Bad category id: ${c.id}`).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/);
    }
  });

  it('every category has a non-empty name and blurb', () => {
    for (const c of blogCategories) {
      expect(c.name.length).toBeGreaterThan(2);
      expect(c.blurb.length).toBeGreaterThan(20);
    }
  });

  it('every category has at least one post', () => {
    for (const c of blogCategories) {
      expect(c.slugs.length, `Empty category: ${c.id}`).toBeGreaterThan(0);
    }
  });
});

describe('findCategoryForSlug', () => {
  it.each(blogPosts.map((p) => p.slug))(
    'returns a category for registered post %s',
    (slug) => {
      const category = findCategoryForSlug(slug);
      expect(category).toBeDefined();
      expect(category!.slugs).toContain(slug);
    },
  );

  it('returns undefined for an unknown slug', () => {
    expect(findCategoryForSlug('not-a-real-slug')).toBeUndefined();
  });
});
