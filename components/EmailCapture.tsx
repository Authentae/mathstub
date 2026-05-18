'use client';
import { useState } from 'react';

interface Props {
  source: string;
  shortfallUsd?: number;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';

export function EmailCapture({ source, shortfallUsd }: Props) {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<Status>('idle');
  const [errMsg, setErrMsg] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setStatus('submitting');
    setErrMsg(null);
    try {
      const r = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: email.trim(),
          source,
          context: shortfallUsd ? { shortfall_usd: Math.round(shortfallUsd) } : {},
        }),
      });
      if (!r.ok) {
        const j: { error?: string } = await r.json().catch(() => ({}));
        throw new Error(j.error ?? 'request failed');
      }
      setStatus('success');
    } catch (err) {
      setStatus('error');
      setErrMsg(err instanceof Error ? err.message : 'unknown error');
    }
  }

  if (status === 'success') {
    return (
      <aside
        role="status"
        aria-live="polite"
        className="my-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950"
      >
        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
          ✓ Check your inbox for the Year-End Tax Checklist (free PDF).
        </p>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
          We’ll only email you when there’s a meaningful update to a calculator or a new tax-year change. No spam.
        </p>
      </aside>
    );
  }

  // Stable per-instance ids so the same component rendered twice on a page
  // doesn't collide on htmlFor/id wiring. Source is a per-calc string already.
  const labelId = `email-capture-label-${source}`;
  const inputId = `email-capture-input-${source}`;
  const helpId = `email-capture-help-${source}`;

  return (
    <aside
      aria-labelledby={labelId}
      className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900"
    >
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Free download
      </p>
      <h3 id={labelId} className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">
        Get the Year-End Tax Quick Checklist (free PDF)
      </h3>
      <p id={helpId} className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        The 1-page deadline list (401k top-up, FSA spend-down, HSA, IRA, ESPP, AMT planning) — sent to your inbox now.
      </p>
      <form onSubmit={submit} className="mt-3 flex flex-wrap items-center gap-2">
        {/* Visually-hidden label so the input has a proper accessible name
            without relying on the placeholder (which screen readers may not
            read consistently and disappears on focus). */}
        <label htmlFor={inputId} className="sr-only">
          Email address for the year-end tax checklist
        </label>
        <input
          id={inputId}
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          aria-describedby={helpId}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 dark:border-gray-700 dark:bg-gray-950"
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          aria-label="Send me the year-end tax checklist PDF"
          className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-600 focus-visible:ring-offset-2 disabled:opacity-60 dark:focus-visible:ring-offset-gray-900"
        >
          {status === 'submitting' ? 'Sending…' : 'Send me the PDF'}
        </button>
      </form>
      {/* aria-live region for submitting + error transitions. Always mounted
          (with empty text when idle) so assistive tech wires up the
          announcer before the first state change. */}
      <div role="status" aria-live="polite" className="sr-only">
        {status === 'submitting' ? 'Sending your email…' : ''}
        {status === 'error' && errMsg ? `Submission failed: ${errMsg}` : ''}
      </div>
      {status === 'error' && (
        <p className="mt-2 text-xs text-amber-700 dark:text-amber-300">
          Couldn’t submit ({errMsg}). Try again or email theearth1659@gmail.com directly.
        </p>
      )}
      <p className="mt-2 text-[11px] text-gray-500">
        We’ll only email you about Mathstub updates and tax-year changes. Unsubscribe anytime.
      </p>
    </aside>
  );
}
