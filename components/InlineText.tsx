import { Fragment, type ReactNode } from 'react';

/**
 * Minimal, SAFE inline-markdown renderer for blog body text.
 *
 * The blog post data files use `**bold**` markdown to emphasize key phrases
 * (818 occurrences across 26 posts). The previous renderer printed the raw
 * text, so readers saw literal `**asterisks**` and lost all the emphasis the
 * authors intended — a major readability hit.
 *
 * This parses ONLY `**bold**` into real <strong> elements and returns React
 * nodes (no dangerouslySetInnerHTML, so there is no XSS surface — any other
 * characters, including stray `*` or `<`, render as plain text).
 *
 * Scope is deliberately tiny: bold only. We don't support italics/links here
 * because the post data doesn't use them inline, and a smaller parser is a
 * smaller thing to get wrong.
 */
export function renderInline(text: string): ReactNode {
  if (!text.includes('**')) return text;

  const parts: ReactNode[] = [];
  // Split on **...** while keeping the delimited groups. The capturing group
  // means odd indexes are the bold contents.
  const segments = text.split(/\*\*([^*]+)\*\*/g);
  segments.forEach((seg, i) => {
    if (seg === '') return;
    if (i % 2 === 1) {
      parts.push(<strong key={i} className="font-semibold text-gray-900 dark:text-gray-50">{seg}</strong>);
    } else {
      parts.push(<Fragment key={i}>{seg}</Fragment>);
    }
  });
  return parts;
}
