'use client';
import { useEffect, useMemo, useRef, useState } from 'react';
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
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

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

/**
 * Encode the entire form state into a stable URL query string so the page
 * can be bookmarked, sent to a CPA, or pasted into a calendar event. Field
 * names are short to keep links readable. Decoding is permissive — any
 * missing field falls back to the default.
 */
const URL_KEYS: Record<keyof FormState, string> = {
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

function formToQuery(form: FormState): string {
  const params = new URLSearchParams();
  params.set(URL_KEYS.taxYear, String(form.taxYear));
  params.set(URL_KEYS.filingStatus, form.filingStatus);
  params.set(URL_KEYS.vestGrossUsd, form.vestGrossUsd);
  params.set(URL_KEYS.ytdSupplementalWagesUsd, form.ytdSupplementalWagesUsd);
  params.set(URL_KEYS.ytdRegularWagesUsd, form.ytdRegularWagesUsd);
  params.set(URL_KEYS.otherTaxableIncomeUsd, form.otherTaxableIncomeUsd);
  params.set(URL_KEYS.preTaxDeductionsUsd, form.preTaxDeductionsUsd);
  params.set(URL_KEYS.stateCode, form.stateCode);
  if (form.stateOverrideRatePct) params.set(URL_KEYS.stateOverrideRatePct, form.stateOverrideRatePct);
  if (form.ficaAlreadyMaxed) params.set(URL_KEYS.ficaAlreadyMaxed, '1');
  return params.toString();
}

function queryToForm(search: string): FormState {
  const params = new URLSearchParams(search);
  const next: FormState = { ...DEFAULTS };
  const year = Number(params.get(URL_KEYS.taxYear));
  if (year === 2024 || year === 2025 || year === 2026) next.taxYear = year as TaxYear;
  const fs = params.get(URL_KEYS.filingStatus);
  if (fs === 'single' || fs === 'mfj' || fs === 'mfs' || fs === 'hoh') next.filingStatus = fs;
  const setIfPresent = (key: keyof FormState, urlKey: string) => {
    const v = params.get(urlKey);
    if (v !== null) (next as Record<string, unknown>)[key] = v;
  };
  setIfPresent('vestGrossUsd', URL_KEYS.vestGrossUsd);
  setIfPresent('ytdSupplementalWagesUsd', URL_KEYS.ytdSupplementalWagesUsd);
  setIfPresent('ytdRegularWagesUsd', URL_KEYS.ytdRegularWagesUsd);
  setIfPresent('otherTaxableIncomeUsd', URL_KEYS.otherTaxableIncomeUsd);
  setIfPresent('preTaxDeductionsUsd', URL_KEYS.preTaxDeductionsUsd);
  const st = params.get(URL_KEYS.stateCode);
  if (st) next.stateCode = st;
  const sr = params.get(URL_KEYS.stateOverrideRatePct);
  if (sr !== null) next.stateOverrideRatePct = sr;
  next.ficaAlreadyMaxed = params.get(URL_KEYS.ficaAlreadyMaxed) === '1';
  return next;
}

export function RsuShortfallCalculator() {
  const [form, setForm] = useState<FormState>(DEFAULTS);
  const states = useMemo(() => listStateCodes(), []);
  const hydratedRef = useRef(false);

  // On mount, hydrate form state from the URL query string. This is what
  // makes saved links reload identical inputs.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.location.search.length > 1) {
      setForm(queryToForm(window.location.search));
    }
    hydratedRef.current = true;
  }, []);

  // Mirror form state back into the URL via history.replaceState so the
  // address bar always reflects the current inputs. Skipped on the very
  // first render so we don't blow away a pristine URL with default values.
  useEffect(() => {
    if (!hydratedRef.current || typeof window === 'undefined') return;
    const query = formToQuery(form);
    const newUrl = `${window.location.pathname}?${query}`;
    if (window.location.search.slice(1) !== query) {
      window.history.replaceState(null, '', newUrl);
    }
  }, [form]);

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
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6">
      <form className="grid gap-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
        <Field label="RSU vest amount (USD)">
          <input
            type="number"
            min="0"
            value={form.vestGrossUsd}
            onChange={(e) => update('vestGrossUsd', e.target.value)}
            className={inputCls}
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
        <Field label="YTD pre-tax deductions (401k + HSA)">
          <input
            type="number"
            min="0"
            value={form.preTaxDeductionsUsd}
            onChange={(e) => update('preTaxDeductionsUsd', e.target.value)}
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
          I’ve already hit the Social Security wage base via another employer this year
        </label>
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

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${
          overWithheld
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
            : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Estimated shortfall on this vest
        </p>
        <p
          className={`mt-1 text-4xl font-bold ${
            overWithheld
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-amber-700 dark:text-amber-300'
          }`}
        >
          {overWithheld
            ? `+${usd.format(Math.abs(r.shortfallUsd))} expected refund`
            : `${usd.format(r.shortfallUsd)} owed`}
        </p>
        {r.isUnderpaymentRisk && (
          <p className="mt-2 text-sm text-amber-900 dark:text-amber-200">
            ⚠ Above the IRS $1,000 safe-harbor threshold — you may owe an underpayment penalty without estimated payments.
          </p>
        )}
      </div>

      <ShareCalculation what="this RSU shortfall calculation" />

      {!overWithheld && <GumroadUpsell shortfallUsd={r.shortfallUsd} />}

      {!overWithheld && (
        <div className="grid gap-3 rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-2">
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">Suggested quarterly estimated payment</p>
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-100">
              {usd.format(r.suggestedQuarterlyEstimateUsd)}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-800 dark:text-gray-200">
              Or extra W-4 withholding (~{r.paychecksRemainingThisYear} bi-weekly checks left)
            </p>
            <p className="text-2xl font-bold text-brand-700 dark:text-brand-100">
              {usdCents.format(r.suggestedExtraW4PerPaycheckUsd)} / paycheck
            </p>
          </div>
        </div>
      )}

      <details
        open
        className="rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900"
      >
        <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
          Show the math
        </summary>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <Row k="Vest gross" v={usd.format(r.vestGrossUsd)} />
          <Row k="Federal supplemental rate applied" v={pct.format(r.appliedFederalSupplementalRate)} />
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

      {!overWithheld && <EmailCapture source="rsu-tax-shortfall" shortfallUsd={r.shortfallUsd} />}
    </div>
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
