import { env } from '@/lib/env';

interface Props {
  /** Optional search query — defaults to a tax-prep evergreen term. */
  query?: string;
  /** Headline override. */
  headline?: string;
}

/**
 * Always-on Amazon affiliate CTA. Points at an Amazon search URL with the
 * Mathstub associates tag attached. Renders on every calculator page and can
 * be dropped into blog posts.
 */
export function AmazonBookCTA({
  query = 'equity compensation tax book',
  headline = 'Want to go deeper? Recommended reading on Amazon',
}: Props) {
  const tag = env.affiliate.amazonTag();
  const href = `https://www.amazon.com/s?k=${encodeURIComponent(query)}&tag=${encodeURIComponent(tag)}`;

  return (
    <aside className="my-4 rounded-md border border-slate-200 bg-slate-50 p-4 text-sm dark:border-slate-800 dark:bg-slate-900/40">
      <p className="font-medium text-slate-800 dark:text-slate-200">{headline}</p>
      <p className="mt-1 text-slate-600 dark:text-slate-400">
        Books on RSU, ISO/NSO, ESPP and high-earner tax planning. As an Amazon
        Associate Mathstub may earn from qualifying purchases — at no extra cost
        to you.
      </p>
      <a
        href={href}
        target="_blank"
        rel="sponsored noopener noreferrer"
        className="mt-2 inline-block text-sm font-semibold text-brand-700 hover:underline dark:text-brand-300"
      >
        Browse on Amazon →
      </a>
    </aside>
  );
}
