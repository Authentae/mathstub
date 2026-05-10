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
      <aside className="my-4 rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-800 dark:bg-emerald-950">
        <p className="text-sm font-semibold text-emerald-800 dark:text-emerald-200">
          ✓ Check your inbox for the Year-End Tax Checklist (free PDF).
        </p>
        <p className="mt-1 text-xs text-emerald-700 dark:text-emerald-300">
          We’ll only email you when there’s a meaningful update to a calculator or a new tax-year change. No spam.
        </p>
      </aside>
    );
  }

  return (
    <aside className="my-4 rounded-lg border border-gray-200 bg-gray-50 p-5 dark:border-gray-800 dark:bg-gray-900">
      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        Free download
      </p>
      <h3 className="mt-1 text-base font-bold text-gray-900 dark:text-gray-100">
        Get the Year-End Tax Quick Checklist (free PDF)
      </h3>
      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
        The 1-page deadline list (401k top-up, FSA spend-down, HSA, IRA, ESPP, AMT planning) — sent to your inbox now.
      </p>
      <form onSubmit={submit} className="mt-3 flex flex-wrap items-center gap-2">
        <input
          type="email"
          required
          autoComplete="email"
          inputMode="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="flex-1 min-w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 dark:border-gray-700 dark:bg-gray-950"
          disabled={status === 'submitting'}
        />
        <button
          type="submit"
          disabled={status === 'submitting'}
          className="inline-flex items-center rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-700 disabled:opacity-60"
        >
          {status === 'submitting' ? 'Sending…' : 'Send me the PDF'}
        </button>
      </form>
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
