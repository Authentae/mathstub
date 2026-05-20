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
      return { error: e instanceof TaxCalcError ? e.message : 'Invalid input' };
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
      <header className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          mathstub / rsu shortfall
        </p>
        <h2 className="text-2xl font-bold leading-tight text-gray-900 dark:text-gray-100 sm:text-3xl">
          How much more do you owe on your RSU vest?
        </h2>
        <p className="max-w-prose text-sm text-gray-600 dark:text-gray-400">
          Your employer withheld 22% federal{' '}
          <cite className="not-italic text-gray-500 dark:text-gray-500">(IRC § 3402(g))</cite>.
          If you&apos;re in a higher bracket, the IRS expects the rest by April 15 — or sooner via quarterly estimates.
        </p>
      </header>

      {/* Trust band — three IRC-citation-backed claims, inline above the form */}
      <ul className="grid gap-3 rounded-lg border border-gray-200 bg-gray-50 p-4 text-xs dark:border-gray-800 dark:bg-gray-900/40 sm:grid-cols-3">
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">No signup, ever</strong>
            <span className="text-gray-500 dark:text-gray-500">No tracking, no email required.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">Math runs in your browser</strong>
            <span className="text-gray-500 dark:text-gray-500">No data leaves this page.</span>
          </span>
        </li>
        <li className="flex items-start gap-2">
          <span aria-hidden="true" className="text-brand-700 dark:text-brand-300">✓</span>
          <span>
            <strong className="block font-semibold text-gray-900 dark:text-gray-100">Every claim cites IRC § or IRS Pub</strong>
            <span className="text-gray-500 dark:text-gray-500">Reviewed against IRS primary sources — see footer.</span>
          </span>
        </li>
      </ul>

      <form className="grid gap-4 rounded-lg border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
        <Field label="RSU vest amount (USD)">
          <input
            type="number"
            min="0"
            value={form.vestGrossUsd}
            onChange={(e) => update('vestGrossUsd', e.target.value)}
            className={inputCls}
            autoFocus
          />
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
        </Field>
        <Field label="State">
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
        </Field>
        <Field label="YTD regular W-2 wages (before this vest)">
          <input
            type="number"
            min="0"
            value={form.ytdRegularWagesUsd}
            onChange={(e) => update('ytdRegularWagesUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="YTD pre-tax deductions (401k + HSA)">
          <input
            type="number"
            min="0"
            value={form.preTaxDeductionsUsd}
            onChange={(e) => update('preTaxDeductionsUsd', e.target.value)}
            className={inputCls}
          />
        </Field>

        {/*
          Progressive disclosure: the remaining 3 inputs and the FICA
          override see use by < 20% of visitors (per CLAUDE.md note about
          panic-moment users wanting <30s to a number). Hide behind a
          single click so the default form is 6 fields, not 9. Engine
          contract unchanged — useUrlFormState still keeps all values in
          the URL, so a deep-linked URL still restores advanced settings
          even if this toggle is collapsed.
        */}
        <button
          type="button"
          onClick={() => setShowAdvanced((v) => !v)}
          className="md:col-span-2 -mt-2 flex items-center gap-2 self-start text-xs font-semibold text-brand-700 hover:underline dark:text-brand-300"
          aria-expanded={showAdvanced}
        >
          <span aria-hidden="true">{showAdvanced ? '▾' : '▸'}</span>
          {showAdvanced ? 'Hide advanced inputs' : 'More options (prior vests, spouse income, state rate override)'}
        </button>

        {showAdvanced && (
          <>
            <Field label="YTD supplemental wages (prior RSU vests, bonuses)">
              <input
                type="number"
                min="0"
                value={form.ytdSupplementalWagesUsd}
                onChange={(e) => update('ytdSupplementalWagesUsd', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="Other taxable income (spouse W-2, dividends, etc.)">
              <input
                type="number"
                min="0"
                value={form.otherTaxableIncomeUsd}
                onChange={(e) => update('otherTaxableIncomeUsd', e.target.value)}
                className={inputCls}
              />
            </Field>
            <Field label="State rate override (%) — optional">
              <input
                type="number"
                min="0"
                max="100"
                step="0.1"
                placeholder="leave blank to use default"
                value={form.stateOverrideRatePct}
                onChange={(e) => update('stateOverrideRatePct', e.target.value)}
                className={inputCls}
              />
            </Field>
            <label className="flex items-center gap-2 text-sm md:col-span-2">
              <input
                type="checkbox"
                checked={form.ficaAlreadyMaxed}
                onChange={(e) => update('ficaAlreadyMaxed', e.target.checked)}
                className="h-4 w-4 rounded border-gray-300"
              />
              I&rsquo;ve already hit the Social Security wage base via another employer this year
            </label>
          </>
        )}
      </form>

      {'error' in result ? (
        <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          {result.error}
        </div>
      ) : (
        <Result result={result} />
      )}
    </div>
  );
}

const inputCls =
  'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 dark:border-gray-700 dark:bg-gray-900';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block text-sm">
      <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
      {children}
    </label>
  );
}

function Result({ result }: { result: RsuShortfallResult }) {
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
            <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">Recommended next steps</p>
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
        Waterfall result. Source: Claude Design P1 — ResultWaterfall.
        The 4-step Gross → Withheld → Owed → Shortfall flow with
        proportional progress bars and per-step IRC cites tested as the
        most legible result format for first-time visitors. Hero figure
        ("You still owe $X") stays prominent at the top so screenshots
        carry the headline number; the bars below explain the gap. The
        original prototype's ChromeWindow/iOSDevice frames don't ship —
        this renders inside the existing ToolShell layout instead.
      */}
      <header className="rounded-lg border border-orange-200 bg-orange-50 p-5 dark:border-orange-900 dark:bg-orange-950">
        <div className="flex flex-wrap items-baseline justify-between gap-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-gray-600 dark:text-gray-400">
              You still owe
            </p>
            <p className="mt-1 text-4xl font-bold leading-none text-orange-700 dark:text-orange-300 sm:text-5xl">
              {usd.format(r.shortfallUsd)}
            </p>
          </div>
          {r.isUnderpaymentRisk ? (
            <span className="rounded-full bg-orange-200 px-3 py-1 text-xs font-semibold text-orange-900 dark:bg-orange-900/40 dark:text-orange-200">
              Check safe harbor
            </span>
          ) : (
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-200">
              Likely no underpayment penalty
            </span>
          )}
        </div>
        <p className="mt-3 text-sm text-gray-700 dark:text-gray-300">
          Extra owed beyond what your employer withheld at vest. Smooth it over your remaining paychecks
          (Form W-4, line 4(c)) or pay a quarterly estimate (Form 1040-ES).
        </p>
      </header>

      <Waterfall result={r} />

      <ShareCalculation what="this RSU shortfall calculation" />

      <GumroadUpsell shortfallUsd={r.shortfallUsd} />

      <div className="grid gap-3 rounded-md border border-emerald-200 bg-emerald-50 p-4 text-sm dark:border-emerald-900 dark:bg-emerald-950 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Suggested quarterly estimate
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {usd.format(r.suggestedQuarterlyEstimateUsd)}
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            <cite className="not-italic">Form 1040-ES · IRC § 6654</cite>
          </p>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            Or extra W-4 withholding (~{r.paychecksRemainingThisYear} bi-weekly checks left)
          </p>
          <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-gray-100">
            {usdCents.format(r.suggestedExtraW4PerPaycheckUsd)}
            <span className="text-base font-medium text-gray-500"> / paycheck</span>
          </p>
          <p className="mt-1 text-xs text-gray-600 dark:text-gray-400">
            <cite className="not-italic">Form W-4, line 4(c)</cite>
          </p>
        </div>
      </div>

      <ShowTheMath result={r} />

      {offers.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">Recommended next steps</p>
          {/*
            Cap visible offers at 2 — pre-result the user already sees 4-5
            competing CTAs (Gumroad upsell, W-4 suggestion, quarterly,
            email capture). Cutting affiliate cards from 4 to 2 reduces
            decision paralysis and keeps a clear primary action.
          */}
          <div className="grid gap-3 md:grid-cols-2">
            {offers.slice(0, 2).map((o) => (
              <AffiliateCard key={o.id} offerId={o.id} />
            ))}
          </div>
        </div>
      )}

      <EmailCapture source="rsu-tax-shortfall" shortfallUsd={r.shortfallUsd} />
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
        : 'text-gray-900 dark:text-gray-100';

  return (
    <div className="space-y-3 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
      {steps.map((s, i) => {
        const width = Math.max(6, (s.val / max) * 100);
        return (
          <div key={i} className="space-y-1">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
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
            <p className="text-xs text-gray-500 dark:text-gray-400">
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
      className="rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
    >
      <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
        Show the math
        <span className="ml-2 rounded-full bg-brand-50 px-2 py-0.5 text-xs font-medium text-brand-700 dark:bg-brand-950/40 dark:text-brand-300">
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
    <div className="flex justify-between border-b border-dashed border-gray-200 py-1 dark:border-gray-800">
      <span className="text-gray-600 dark:text-gray-400">{k}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100">{v}</span>
    </div>
  );
}
