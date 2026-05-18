'use client';
import { useState } from 'react';
import { env } from '@/lib/env';

interface Props {
  /** Slug or label of the page, used in the prefilled email subject. */
  context: string;
}

/**
 * "Was this helpful?" reader feedback at the bottom of every blog post.
 * Thumbs-down opens a prefilled mailto for the founder so we can act on
 * the specific complaint. Thumbs-up shows a quick thank-you and is a soft
 * signal we can use later to rank "most helpful" posts on the blog index.
 *
 * Intentionally no analytics ping — privacy-first stance for the calc
 * site. We're trading aggregate analytics for direct reader email.
 */
export function WasThisHelpful({ context }: Props) {
  const [response, setResponse] = useState<'yes' | 'no' | null>(null);
  const email = env.contact.issueEmail();

  if (response === 'yes') {
    return (
      <div className="mt-10 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900 dark:bg-emerald-950/40">
        <p className="text-emerald-900 dark:text-emerald-100">
          Thanks — glad it helped. If you have a calculator request or a
          related question we should write up next,{' '}
          <a
            href={`mailto:${email}?subject=${encodeURIComponent(`Helpful post: ${context}`)}`}
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            drop us a line
          </a>
          .
        </p>
      </div>
    );
  }

  if (response === 'no') {
    const subject = encodeURIComponent(`Feedback: ${context}`);
    const body = encodeURIComponent(
      `What was unclear, missing, or wrong in the post at /blog/${context}?\n\n`,
    );
    return (
      <div className="mt-10 rounded-md border border-amber-200 bg-amber-50 p-4 text-sm dark:border-amber-900 dark:bg-amber-950/40">
        <p className="text-amber-900 dark:text-amber-100">
          Sorry the post missed. Tell us what was unclear or wrong —{' '}
          <a
            href={`mailto:${email}?subject=${subject}&body=${body}`}
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            email the founder
          </a>
          . Every piece of feedback gets read and acted on.
        </p>
      </div>
    );
  }

  return (
    <div className="mt-10 flex items-center gap-3 border-t border-dashed border-gray-200 pt-4 text-sm text-gray-600 dark:border-gray-800 dark:text-gray-400">
      <span>Was this helpful?</span>
      <button
        type="button"
        onClick={() => setResponse('yes')}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:border-emerald-500 hover:bg-emerald-50 hover:text-emerald-700 dark:border-gray-700 dark:hover:border-emerald-600 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-200"
        aria-label="Yes, this was helpful"
      >
        👍 Yes
      </button>
      <button
        type="button"
        onClick={() => setResponse('no')}
        className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:border-amber-500 hover:bg-amber-50 hover:text-amber-700 dark:border-gray-700 dark:hover:border-amber-600 dark:hover:bg-amber-950/40 dark:hover:text-amber-200"
        aria-label="No, this was not helpful"
      >
        👎 No
      </button>
    </div>
  );
}
