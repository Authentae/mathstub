import type { BlogBlock } from '@/content/blog/registry';

interface Props {
  blocks: BlogBlock[];
  /** Minimum H2 count before the TOC is shown. Defaults to 4. */
  minHeadings?: number;
}

/**
 * Anchor list of every H2 heading in the post. Renders nothing if the post
 * has fewer than `minHeadings` H2s — short posts do not need a TOC.
 *
 * Heading IDs are deterministic slugs of the heading text, generated the
 * same way in <Block> so anchors line up.
 */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-');
}

export function TableOfContents({ blocks, minHeadings = 4 }: Props) {
  const headings = blocks
    .filter((b): b is { type: 'h2'; text: string } => b.type === 'h2')
    .map((b) => ({ text: b.text, id: slugifyHeading(b.text) }));

  if (headings.length < minHeadings) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="my-6 rounded-md border border-gray-200 bg-gray-50 p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-500">
        In this article
      </p>
      <ol className="list-decimal space-y-1 pl-5 text-gray-700 dark:text-gray-300">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="text-brand-700 hover:underline dark:text-brand-300"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
