'use client';
import { useMemo } from 'react';
import { calculateDoubleTriggerRsu, type DoubleTriggerRsuResult } from '@tax/double-trigger-rsu';
import { TaxCalcError } from '@tax/types';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { W4Step4cLink } from '@/components/W4Step4cLink';
import { useUrlFormState } from '@/lib/useUrlFormState';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

type FormState = {
  sharesReleased: string;
  triggerFmvUsd: string;
  federalMarginalRate: string;
  stateMarginalRate: string;
  stateSupplementalRate: string;
  ytdSupplementalWagesUsd: string;
};

const DEFAULTS: FormState = {
  sharesReleased: '15000',
  triggerFmvUsd: '40',
  federalMarginalRate: '0.37',
  stateMarginalRate: '0.133',
  stateSupplementalRate: '0.1023',
  ytdSupplementalWagesUsd: '0',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  sharesReleased: 's',
  triggerFmvUsd: 'f',
  federalMarginalRate: 'fr',
  stateMarginalRate: 'sr',
  stateSupplementalRate: 'sw',
  ytdSupplementalWagesUsd: 'y',
};

function toNumOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function DoubleTriggerRsuCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({ defaults: DEFAULTS, urlKeys: URL_KEYS });

  const result = useMemo<{ ok: true; data: DoubleTriggerRsuResult } | { ok: false; error: string }>(() => {
    try {
      const data = calculateDoubleTriggerRsu({
        sharesReleased: toNumOrZero(form.sharesReleased),
        triggerFmvUsd: toNumOrZero(form.triggerFmvUsd),
        federalMarginalRate: toNumOrZero(form.federalMarginalRate),
        stateMarginalRate: toNumOrZero(form.stateMarginalRate),
        stateSupplementalRate: toNumOrZero(form.stateSupplementalRate),
        ytdSupplementalWagesUsd: toNumOrZero(form.ytdSupplementalWagesUsd),
      });
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e instanceof TaxCalcError ? e.message : 'Calculation error' };
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          1. The trigger event
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Time-vested shares released" hint="Shares that hit service-vesting milestones AND release on the trigger date.">
            <input type="number" inputMode="numeric" min={0} value={form.sharesReleased}
              onChange={(e) => setForm({ sharesReleased: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
          <Field label="Trigger-date FMV per share" hint="IPO open price (for IPO) or per-share deal price (for M&A).">
            <input type="number" inputMode="decimal" min={0} step={0.01} value={form.triggerFmvUsd}
              onChange={(e) => setForm({ triggerFmvUsd: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
          <Field label="YTD supplemental wages so far this year" hint="Prior RSU vests, bonuses. Used to check the $1M threshold.">
            <input type="number" inputMode="numeric" min={0} value={form.ytdSupplementalWagesUsd}
              onChange={(e) => setForm({ ytdSupplementalWagesUsd: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          2. Your marginal rates (decimals)
        </legend>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label="Federal marginal rate" hint="0.32 / 0.35 / 0.37 typical for $200k+ earners. Bump +0.009 if you'll cross the Add'l Medicare threshold.">
            <input type="number" inputMode="decimal" min={0} max={1} step={0.01} value={form.federalMarginalRate}
              onChange={(e) => setForm({ federalMarginalRate: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
          <Field label="State marginal rate" hint="CA 0.133, NY 0.109, MA 0.05, TX/NV/FL/WA 0.">
            <input type="number" inputMode="decimal" min={0} max={1} step={0.001} value={form.stateMarginalRate}
              onChange={(e) => setForm({ stateMarginalRate: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
          <Field label="State supplemental withholding rate" hint="CA 0.1023, NY 0.117, MA 0.05. Often differs from state marginal.">
            <input type="number" inputMode="decimal" min={0} max={1} step={0.001} value={form.stateSupplementalRate}
              onChange={(e) => setForm({ stateSupplementalRate: e.target.value })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
          </Field>
        </div>
      </fieldset>

      {!result.ok ? (
        <div className="rounded-lg border border-red-500/40 bg-red-900/20 p-5 text-red-200">
          <p className="font-bold">Couldn&rsquo;t calculate.</p>
          <p className="text-sm">{result.error}</p>
        </div>
      ) : (
        <>
          <ResultPanel r={result.data} />
          {result.data.totalShortfallUsd > 0 && <W4Step4cLink shortfallUsd={result.data.totalShortfallUsd} />}
          {result.data.totalShortfallUsd > 0 && <GumroadUpsell shortfallUsd={result.data.totalShortfallUsd} />}
        </>
      )}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-semibold text-slate-100">{label}</span>
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
      {children}
    </label>
  );
}

function ResultPanel({ r }: { r: DoubleTriggerRsuResult }) {
  return (
    <div className="space-y-5 rounded-lg border border-brand-500/40 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-950/30">
      <div>
        <p className="text-sm font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Total April shortfall (after all withholding)
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-orange-700 dark:text-orange-300">
          {usd.format(r.totalShortfallUsd)}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          On {usd.format(r.taxableW2IncomeUsd)} of W-2 income recognized at trigger.
        </p>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <Card title="Federal">
          <Row label="Withheld (supplemental)" value={r.federalSupplementalWithheldUsd} />
          <Row label="Effective rate" value={pct.format(r.federalSupplementalEffectiveRate)} />
          <Row label="Real owed (marginal)" value={r.federalRealOwedUsd} />
          <Row label="Shortfall" value={r.federalShortfallUsd} highlight />
        </Card>
        <Card title="State">
          <Row label="Withheld (supplemental)" value={r.stateSupplementalWithheldUsd} />
          <Row label="Real owed" value={r.stateRealOwedUsd} />
          <Row label="Shortfall" value={r.stateShortfallUsd} highlight />
        </Card>
      </div>

      <Card title="Sell-to-cover mechanics">
        <Row label="Shares released at trigger" value={r.sellToCoverShares + r.netSharesDelivered} />
        <Row label="Broker sells to cover taxes" value={r.sellToCoverShares} />
        <Row label="Net shares delivered to you" value={r.netSharesDelivered} bold />
        <Row label="Net share value at trigger FMV" value={r.netSharesValueUsd} bold />
        <Row label="FICA withheld (Medicare 1.45%, assumes SS maxed YTD)" value={r.ficaWithheldUsd} />
      </Card>
    </div>
  );
}

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-brand-500/30 bg-white p-4 text-sm dark:border-brand-500/20 dark:bg-slate-900/40">
      <p className="mb-2 text-xs font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
        {title}
      </p>
      {children}
    </div>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: number | string; bold?: boolean; highlight?: boolean }) {
  const cls = [
    'flex justify-between py-1 text-sm',
    bold ? 'font-bold text-slate-100' : 'text-slate-300',
    highlight ? 'rounded bg-orange-100 px-2 dark:bg-orange-900/30' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <span>{label}</span>
      <span className="font-mono">
        {typeof value === 'number' ? usd.format(value) : value}
      </span>
    </div>
  );
}
