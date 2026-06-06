'use client';
import { useMemo, useState } from 'react';
import { calculateRsuShortfall } from '@tax/rsu-shortfall';
import {
  type FilingStatus,
  type RsuShortfallInput,
  type RsuShortfallResult,
  type TaxYear,
  TaxCalcError,
} from '@tax/types';
import { listStateCodes } from '@tax/state-rates';
import { offersForShortfall } from '@/lib/affiliates';
import { AffiliateCard } from '@/components/AffiliateCard';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { W4Step4cLink } from '@/components/W4Step4cLink';
import { EmailCapture } from '@/components/EmailCapture';
import { ShareCalculation } from '@/components/ShareCalculation';
import { useUrlFormState } from '@/lib/useUrlFormState';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const usdCents = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
});
const pct = (n: number) => `${(n * 100).toFixed(2)}%`;

type FormState = {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  vestGrossUsd: string;
  ytdSupplementalWagesUsd: string;
  ytdRegularWagesUsd: string;
  otherTaxableIncomeUsd: string;
  preTaxDeductionsUsd: string;
  stateCode: string;
  stateOverrideRatePct: string;
  ficaAlreadyMaxed: boolean;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'single',
  vestGrossUsd: '50000',
  ytdSupplementalWagesUsd: '0',
  ytdRegularWagesUsd: '200000',
  otherTaxableIncomeUsd: '0',
  preTaxDeductionsUsd: '23500',
  stateCode: 'CA',
  stateOverrideRatePct: '',
  ficaAlreadyMaxed: false,
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  filingStatus: 'fs',
  vestGrossUsd: 'v',
  ytdSupplementalWagesUsd: 'sw',
  ytdRegularWagesUsd: 'rw',
  otherTaxableIncomeUsd: 'oi',
  preTaxDeductionsUsd: 'pd',
  stateCode: 'st',
  stateOverrideRatePct: 'sr',
  ficaAlreadyMaxed: 'fm',
};

export function RsuShortfallCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'taxYear') {
        const n = Number(raw);
        return (n === 2024 || n === 2025 || n === 2026 ? n : defaultValue) as FormState[typeof key];
      }
      if (key === 'filingStatus') {
        return (raw === 'single' || raw === 'mfj' || raw === 'mfs' || raw === 'hoh'
          ? raw
          : defaultValue) as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });
  const [showAdvanced, setShowAdvanced] = useState(false);
  const states = useMemo(() => listStateCodes(), []);

  const result: RsuShortfallResult | { error: string } = useMemo(() => {
    try {
      const input: RsuShortfallInput = {
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        vestGrossUsd: toNumberOrZero(form.vestGrossUsd),
        ytdSupplementalWagesUsd: toNumberOrZero(form.ytdSupplementalWagesUsd),
        ytdRegularWagesUsd: toNumberOrZero(form.ytdRegularWagesUsd),
        otherTaxableIncomeUsd: toNumberOrZero(form.otherTaxableIncomeUsd),
        preTaxDeductionsUsd: toNumberOrZero(form.preTaxDeductionsUsd),
        stateCode: form.stateCode,
        stateOverrideRatePct: form.stateOverrideRatePct ? Number(form.stateOverrideRatePct) : undefined,
        ficaAlreadyMaxed: form.ficaAlreadyMaxed,
      };
      return calculateRsuShortfall(input);
    } catch (e) {
      return {
        error:
          e instanceof TaxCalcError
            ? e.message
            : 'Something looks off in one of the numbers — double-check your inputs and try again.',
      };
    }
  }, [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm({ [key]: value } as Partial<FormState>);
  };

  return (
    <div className="space-y-6">
      {/*
        Calculator hero. Source: Claude Design P1 (Mathstub RSU Calc
        Redesign) — the "How much more do you owe on your RSU vest?"
        framing tested better than a generic "Calculate" headline because
        it matches the panic-moment query the user just typed into
        Google. IRC § 3402(g) cite is in the subhead per YMYL discipline.
      */}
      {/*
        Hero. Source: Claude Design P1 (Mathstub RSU Calc Redesign) full
        mockup. Single-question headline + IRC § 3402(g) cite in the
        subhead. Trust band moved to AFTER the result panel (see below)
        per the P1 desktop mockup — it reads better as a closing
        reassurance than as an opening preamble.
      */}
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-300">
          mathstub / rsu shortfall
        </p>
        <h2 className="text-2xl font-bold leading-tight text-slate-100 sm:text-3xl">
          How much more do you owe on your RSU vest?
        </h2>
        <p className="max-w-prose text-sm text-slate-400">
          Your employer withheld 22% federal{' '}
          <cite className="not-italic text-slate-400">(IRC § 3402(g))</cite>.
          If you&apos;re in a higher bracket, the IRS expects the rest by April 15 — or sooner via quarterly estimates.
        </p>
      </header>

      {/*
        Flat form — all fields visible at once. Per the P1 desktop
        mockup Earth pointed at: a vertically-scrolling form reads as a
        single focused panel; the earlier stepped wizard felt
        "way too small" because the active step's content was a single
        field in a half-width grid. All 5 primary inputs in a 2-col grid
        on desktop, stacked on mobile.
      */}
      <div className="rounded-lg border border-slate-800 bg-slate-900 p-5 shadow-sm">
        <form className="grid gap-4 md:grid-cols-2">
          <Field label="Vest value (gross, USD)">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100000000"
              value={form.vestGrossUsd}
              onChange={(e) => update('vestGrossUsd', e.target.value)}
              className={inputCls}
              placeholder="250,000"
            />
            <p className="mt-1 text-xs text-slate-400">
              Total $ value of RSUs that vested in this event.
            </p>
          </Field>
          <Field label="Other YTD wages (before this vest)">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100000000"
              value={form.ytdRegularWagesUsd}
              onChange={(e) => update('ytdRegularWagesUsd', e.target.value)}
              className={inputCls}
              placeholder="215,000"
            />
            <p className="mt-1 text-xs text-slate-400">
              W-2 Box 1 year-to-date, excluding this RSU.
            </p>
          </Field>
          <Field label="Filing status">
            <select
              value={form.filingStatus}
              onChange={(e) => update('filingStatus', e.target.value as FilingStatus)}
              className={inputCls}
            >
              <option value="single">Single</option>
              <option value="mfj">Married filing jointly</option>
              <option value="mfs">Married filing separately</option>
              <option value="hoh">Head of household</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">How you file your federal return.</p>
          </Field>
          <Field label="State of residence">
            <select
              value={form.stateCode}
              onChange={(e) => update('stateCode', e.target.value)}
              className={inputCls}
            >
              {states.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
            <p className="mt-1 text-xs text-slate-400">Where you live — sets your state tax rate.</p>
          </Field>
          <Field label="Tax year">
            <select
              value={form.taxYear}
              onChange={(e) => update('taxYear', Number(e.target.value) as TaxYear)}
              className={inputCls}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
            <p className="mt-1 text-xs text-slate-400">The year this vest happened.</p>
          </Field>
          <Field label="YTD pre-tax deductions (401k + HSA)">
            <input
              type="number"
              inputMode="decimal"
              min="0"
              max="100000000"
              value={form.preTaxDeductionsUsd}
              onChange={(e) => update('preTaxDeductionsUsd', e.target.value)}
              className={inputCls}
              placeholder="23,500"
            />
            <p className="mt-1 text-xs text-slate-400">
              Your 401(k) + HSA contributions so far this year — they lower taxable income.
            </p>
          </Field>

          {/*
            Advanced inputs — collapsed by default. < 20% of visitors
            touch these per CLAUDE.md guidance.
          */}
          <button
            type="button"
            onClick={() => setShowAdvanced((v) => !v)}
            className="md:col-span-2 -mt-2 flex items-center gap-2 self-start text-xs font-semibold text-brand-300 hover:underline"
            aria-expanded={showAdvanced}
          >
            <span aria-hidden="true">{showAdvanced ? '▾' : '▸'}</span>
            {showAdvanced
              ? 'Hide advanced inputs'
              : 'More options (prior vests, spouse income, state rate override)'}
          </button>

          {showAdvanced && (
            <>
              <Field label="YTD supplemental wages (prior RSU vests, bonuses)">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100000000"
                  value={form.ytdSupplementalWagesUsd}
                  onChange={(e) => update('ytdSupplementalWagesUsd', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="Other taxable income (spouse W-2, dividends, etc.)">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100000000"
                  value={form.otherTaxableIncomeUsd}
                  onChange={(e) => update('otherTaxableIncomeUsd', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <Field label="State rate override (%) — optional">
                <input
                  type="number"
                  inputMode="decimal"
                  min="0"
                  max="100"
                  step="0.1"
                  placeholder="leave blank to use default"
                  value={form.stateOverrideRatePct}
                  onChange={(e) => update('stateOverrideRatePct', e.target.value)}
                  className={inputCls}
                />
              </Field>
              <label className="flex items-center gap-2 text-sm text-slate-300 md:col-span-2">
                <input
                  type="checkbox"
                  checked={form.ficaAlreadyMaxed}
                  onChange={(e) => update('ficaAlreadyMaxed', e.target.checked)}
                  className="h-4 w-4 rounded border-slate-600"
                />
                I&rsquo;ve already hit the Social Security wage base via another employer this year
              </label>
            </>
          )}

          <div className="-mt-1 flex justify-end md:col-span-2">
            <button
              type="button"
              onClick={() => setForm(DEFAULTS)}
              className="rounded text-xs font-medium text-slate-400 underline-offset-2 hover:text-slate-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
            >
              Reset to example values
            </button>
          </div>
        </form>
      </div>

      {'error' in result ? (
        <div
          role="alert"
          aria-live="polite"
          className="rounded-lg bg-amber-500/10 p-4 text-sm text-amber-200 ring-1 ring-amber-500/30"
        >
          {result.error}
        </div>
      ) : (
        <Result result={result} stateCode={form.stateCode} taxYear={form.taxYear} />
      )}

      {/*
        Sticky bottom CTA on mobile — sourced from Claude Design P1
        mockup. The shortfall number is always visible at the bottom of
        the viewport on phones so the user sees the live total update
        as they fill in fields. "Fix my W-4 →" jumps to the suggestion
        block. Desktop hides this (sm:hidden) because the result panel
        is already large and visible. Adds bottom padding to the main
        content so the sticky bar doesn't cover the last section.
      */}
      {!('error' in result) && result.shortfallUsd > 0 && (
        <>
          <div className="h-20 sm:hidden" aria-hidden="true" />
          <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-slate-800 bg-slate-900 px-4 py-3 shadow-lg sm:hidden">
            <div className="mx-auto flex max-w-sm items-center justify-between gap-3">
              <div className="min-w-0">
                <p className="text-[10px] font-semibold uppercase tracking-wide text-slate-400">
                  You still owe
                </p>
                <p className="truncate text-xl font-bold text-orange-300">
                  {usd.format(result.shortfallUsd)}
                </p>
              </div>
              <a
                href="#suggested-fix"
                className="shrink-0 rounded-md bg-brand-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
              >
                Fix my W-4 →
              </a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

const inputCls =
  'mt-1 block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-slate-100 shadow-sm placeholder:text-slate-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-slate-200">{label}</span>
      {children}
    </label>
  );
}

function Result({
  result,
  stateCode,
  taxYear,
}: {
  result: RsuShortfallResult;
  stateCode: string;
  taxYear: TaxYear;
}) {
  const r = result;
  const overWithheld = r.shortfallUsd < 0;
  const offers = offersForShortfall(Math.max(0, r.shortfallUsd));

  if (overWithheld) {
    // Refund path keeps the simple green callout — no shortfall to break
    // down, so the waterfall doesn't apply.
    return (
      <div className="space-y-6">
        <div className="rounded-lg border border-emerald-200 bg-emerald-50 p-5 dark:border-emerald-900 dark:bg-emerald-950">
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Estimated outcome on this vest
          </p>
          <p className="mt-2 text-4xl font-bold text-emerald-700 dark:text-emerald-300">
            +{usd.format(Math.abs(r.shortfallUsd))} expected refund
          </p>
          <p className="mt-2 text-sm text-emerald-900 dark:text-emerald-200">
            Withholding came in higher than your projected marginal rate would owe. No safe-harbor action needed.
          </p>
        </div>
        <ShareCalculation what="this RSU shortfall calculation" />
        <ShowTheMath result={r} />
        {offers.length > 0 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">Recommended next steps</p>
            <div className="grid gap-3 md:grid-cols-2">
              {offers.slice(0, 2).map((o) => (
                <AffiliateCard key={o.id} offerId={o.id} />
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/*
        Big-number result + mini-stats layout. Source: Claude Design P1
        ResultBigNumber variant Earth pointed at — the previous waterfall
        was visually noisy with 4 horizontal bars. Single huge "$X" hero
        figure carries the headline; 3 mini-stat cards underneath
        decompose federal / state / per-paycheck so the user has the
        exact numbers without scanning a bar chart.
      */}
      <section
        id="suggested-fix"
        className="scroll-mt-24 space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5"
      >
        {/* Eyebrow + safe-harbor pill */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.1em] text-slate-400">
              Estimated shortfall
            </p>
            <p className="mt-1 text-xs text-slate-400">
              On {usd.format(r.vestGrossUsd)} vest · {stateCode} · tax year {taxYear}
            </p>
          </div>
          {r.isUnderpaymentRisk ? (
            <span className="rounded-full bg-orange-500/15 px-3 py-1 text-xs font-semibold text-orange-300 ring-1 ring-orange-500/30">
              Check safe harbor
            </span>
          ) : (
            <span className="rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold text-emerald-300 ring-1 ring-emerald-500/30">
              Likely no underpayment penalty
            </span>
          )}
        </div>

        {/* Big hero number */}
        <div className="rounded-lg border border-orange-900/60 bg-orange-950/40 p-6 text-center">
          <p className="text-5xl font-bold leading-none tracking-tight text-orange-300 sm:text-6xl">
            {usd.format(r.shortfallUsd)}
          </p>
          <p className="mt-3 text-sm text-slate-400">
            extra owed beyond what your employer withheld at vest
          </p>
        </div>

        {/* Three mini stats — Federal / State / Per paycheck */}
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Federal shortfall
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-100">
              {usd.format(r.expectedFederalUsd - r.withheldFederalUsd)}
            </p>
            <p className="mt-1 text-[11px] italic text-slate-400">IRC § 3402(g)</p>
          </div>
          <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              State shortfall
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-100">
              {usd.format(r.expectedStateUsd - r.withheldStateUsd)}
            </p>
            <p className="mt-1 text-[11px] italic text-slate-400">{stateCode} DOR</p>
          </div>
          <div className="rounded-md border border-slate-700 bg-slate-800/60 p-4">
            <p className="text-[11px] font-semibold uppercase tracking-wide text-slate-400">
              Per paycheck (W-4 4c)
            </p>
            <p className="mt-1 text-2xl font-bold tabular-nums text-slate-100">
              {usdCents.format(r.suggestedExtraW4PerPaycheckUsd)}
            </p>
            <p className="mt-1 text-[11px] italic text-slate-400">Form W-4, line 4(c)</p>
          </div>
        </div>

        {/* Two primary action buttons */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <a
            href="https://www.irs.gov/pub/irs-pdf/fw4.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-brand-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Update my W-4 (printable)
          </a>
          <a
            href="https://www.irs.gov/pub/irs-pdf/f1040es.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-brand-500/70 px-5 py-2.5 text-sm font-semibold text-brand-200 hover:bg-brand-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-900"
          >
            Schedule quarterly estimate
          </a>
          <span className="font-mono text-[11px] uppercase tracking-[0.04em] text-slate-400">
            both download as pdf — no signup.
          </span>
        </div>
      </section>

      <ShowTheMath result={r} />

      <W4Step4cLink shortfallUsd={r.shortfallUsd} />

      {/*
        Next steps & resources — grouped and demoted below the primary
        result + the W-4 fix, so the page leads with ONE clear action
        instead of a pile of competing CTAs. Nothing removed; reordered
        by relevance and labeled as a single secondary cluster.
      */}
      <div className="space-y-4 border-t border-slate-800 pt-6">
        <p className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-400">
          Next steps &amp; resources
        </p>
        <GumroadUpsell shortfallUsd={r.shortfallUsd} />
        {offers.length > 0 && (
          <div>
            <p className="mb-2 text-xs uppercase tracking-wide text-slate-400">
              Recommended tools
            </p>
            {/* Cap visible offers at 2 to keep this secondary cluster calm. */}
            <div className="grid gap-3 md:grid-cols-2">
              {offers.slice(0, 2).map((o) => (
                <AffiliateCard key={o.id} offerId={o.id} />
              ))}
            </div>
          </div>
        )}
        <ShareCalculation what="this RSU shortfall calculation" />
        <EmailCapture source="rsu-tax-shortfall" shortfallUsd={r.shortfallUsd} />
      </div>

      {/*
        Trust band moves to the bottom of the result panel per the P1
        mockup — reads as a closing reassurance once the user has the
        number, rather than a preamble before they enter inputs.
      */}
      <ul className="grid gap-3 rounded-lg border border-slate-800 bg-slate-900/40 p-4 text-xs sm:grid-cols-3">
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-slate-100">No signup, ever</strong>
            <span className="text-slate-400">No tracking, no email required.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-slate-100">Math runs in your browser</strong>
            <span className="text-slate-400">No data leaves this page.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-slate-100">Every claim cites IRC § or IRS Pub</strong>
            <span className="text-slate-400">Reviewed against IRS primary sources.</span>
          </span>
        </li>
      </ul>
    </div>
  );
}

/**
 * Waterfall — visual breakdown of the four steps from gross vest to the
 * shortfall the user actually owes. Each bar is proportional to the
 * dollar magnitude so the user can SEE that withheld < owed without
 * doing the subtraction in their head.
 */
function Waterfall({ result: r }: { result: RsuShortfallResult }) {
  const withheldTotal = r.withheldFederalUsd + r.withheldStateUsd;
  const owedTotal = r.expectedFederalUsd + r.expectedStateUsd;
  const max = Math.max(r.vestGrossUsd, owedTotal, withheldTotal) || 1;

  type Step = {
    label: string;
    val: number;
    tone: 'neutral' | 'brand' | 'danger';
    sub: string;
    cite: string;
  };

  const steps: Step[] = [
    {
      label: 'Gross vest',
      val: r.vestGrossUsd,
      tone: 'neutral',
      sub: 'Total $ value of RSUs that vested in this event',
      cite: 'W-2 Box 1',
    },
    {
      label: 'Already withheld at vest',
      val: withheldTotal,
      tone: 'brand',
      sub: `${pct(r.appliedFederalSupplementalRate)} federal supplemental + state`,
      cite: 'IRC § 3402(g)',
    },
    {
      label: 'Actually owed at your marginal rate',
      val: owedTotal,
      tone: 'neutral',
      sub: `fed ${r.marginalFederalRatePct.toFixed(2)}% + state ${r.marginalStateRatePct.toFixed(2)}%`,
      cite: 'IRC § 1; Pub 15-T',
    },
    {
      label: 'Shortfall',
      val: r.shortfallUsd,
      tone: 'danger',
      sub: 'What you still owe the IRS + state',
      cite: 'IRC § 6654 safe harbor',
    },
  ];

  const barColor = (tone: Step['tone']) =>
    tone === 'brand'
      ? 'bg-brand-600 dark:bg-brand-500'
      : tone === 'danger'
        ? 'bg-orange-600 dark:bg-orange-500'
        : 'bg-gray-400/40 dark:bg-gray-500/40';
  const numColor = (tone: Step['tone']) =>
    tone === 'brand'
      ? 'text-brand-700 dark:text-brand-300'
      : tone === 'danger'
        ? 'text-orange-700 dark:text-orange-300'
        : 'text-slate-100';

  return (
    <div className="space-y-3 rounded-lg border border-slate-800 bg-slate-900 p-5">
      {steps.map((s, i) => {
        const width = Math.max(6, (s.val / max) * 100);
        return (
          <div key={i} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-slate-100">
                {i + 1}. {s.label}
              </span>
              <span className={`text-lg font-bold tabular-nums ${numColor(s.tone)}`}>
                {usd.format(Math.round(s.val))}
              </span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
              <div
                className={`h-full transition-all duration-300 ${barColor(s.tone)}`}
                style={{ width: `${width}%` }}
              />
            </div>
            <p className="text-xs text-slate-400">
              {s.sub} · <cite className="not-italic italic text-gray-400">{s.cite}</cite>
            </p>
          </div>
        );
      })}
    </div>
  );
}

function ShowTheMath({ result: r }: { result: RsuShortfallResult }) {
  return (
    <details
      className="rounded-md border border-slate-800 bg-slate-900 p-4 text-sm"
    >
      <summary className="cursor-pointer font-semibold text-slate-200">
        Show the math
        <span className="ml-2 rounded-full bg-brand-950/40 px-2 py-0.5 text-xs font-medium text-brand-300">
          Citations included
        </span>
      </summary>
      <div className="mt-3 grid gap-2 md:grid-cols-2">
        <Row k="Vest gross" v={usd.format(r.vestGrossUsd)} />
        <Row k="Federal supplemental rate applied" v={pct(r.appliedFederalSupplementalRate)} />
        <Row k="Withheld federal" v={usd.format(r.withheldFederalUsd)} />
        <Row k="Withheld state" v={usd.format(r.withheldStateUsd)} />
        <Row k="Withheld FICA" v={usd.format(r.withheldFicaUsd)} />
        <Row k="Marginal federal rate" v={`${r.marginalFederalRatePct.toFixed(1)}%`} />
        <Row k="Effective federal rate (full year)" v={`${r.effectiveFederalRatePct.toFixed(1)}%`} />
        <Row k="Marginal state rate" v={`${r.marginalStateRatePct.toFixed(1)}%`} />
        <Row k="Expected federal" v={usd.format(r.expectedFederalUsd)} />
        <Row k="Expected state" v={usd.format(r.expectedStateUsd)} />
        <Row k="Expected FICA" v={usd.format(r.expectedFicaUsd)} />
      </div>
    </details>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-slate-800 py-1">
      <span className="text-slate-400">{k}</span>
      <span className="font-medium text-slate-100">{v}</span>
    </div>
  );
}
