'use client';
import { useState } from 'react';

interface Props {
  /**
   * Optional label describing what is being saved (e.g. "this RSU shortfall
   * calculation"). Used in the share-link tooltip.
   */
  what?: string;
}

/**
 * "Save / share this calculation" button. Reads window.location.href at click
 * time so any URL-state encoded in the query string is captured. Clipboard
 * copy first (best UX), falls back to Web Share on mobile, falls back to a
 * prompt() if neither is available.
 *
 * Pair with `useUrlFormState()` to actually populate the URL with form
 * state — without that, this button only saves the bare page URL.
 */
export function ShareCalculation({ what = 'this calculation' }: Props) {
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleShare = async () => {
    if (typeof window === 'undefined') return;
    setError(null);
    const url = window.location.href;
    const title = document.title;
    const text = `${title} — saved calculation`;

    // Prefer Web Share API on mobile (native iOS/Android share sheet).
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ title, text, url });
        return;
      } catch {
        // User cancelled or share failed — fall through to clipboard.
      }
    }

    // Clipboard copy — works on desktop + secure-context mobile.
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
        return;
      } catch {
        // Clipboard blocked — fall through to prompt().
      }
    }

    // Last resort.
    try {
      window.prompt('Copy this link to save or share your calculation:', url);
    } catch {
      setError('Could not copy automatically — copy the URL from your browser address bar.');
    }
  };

  return (
    <div className="my-4 rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
      <p className="font-semibold text-gray-800 dark:text-gray-200">
        Save or share {what}
      </p>
      <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
        Get a link that reloads the same inputs. Bookmark it, paste it to your
        spouse, or send it to your CPA — your inputs are encoded in the URL
        and nothing is stored on our servers.
      </p>
      <button
        type="button"
        onClick={handleShare}
        // aria-label stays stable across the "Copy" -> "Copied" transition so
        // screen readers don't reread the button name on every state change.
        // The visual text still flips for sighted users.
        aria-label="Copy share link for this calculation"
        className="mt-3 inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-gray-900"
      >
        {copied ? '✓ Link copied' : 'Copy share link'}
      </button>
      {/*
        aria-live="polite" lets assistive tech announce "Link copied" or any
        error without stealing focus. Always-mounted (even when empty) so the
        announcer is wired up before the first state change — late-mounted
        live regions are not always read.
      */}
      <div role="status" aria-live="polite" className="sr-only">
        {copied ? 'Share link copied to clipboard.' : ''}
        {error ? error : ''}
      </div>
      {error && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">{error}</p>
      )}
    </div>
  );
}
