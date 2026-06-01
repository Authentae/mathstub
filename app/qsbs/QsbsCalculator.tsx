'use client';
import { useMemo } from 'react';
import { calculateQsbs, type QsbsResult } from '@tax/qsbs';
import { type FilingStatus, type TaxYear, TaxCalcError } from '@tax/types';
import { useUrlFormState } from '@/lib/useUrlFormState';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { ShareCalculation } from '@/components/ShareCalculation';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});

const FILING_LABELS: Record<FilingStatus, string> = {
  single: 'Single',
  mfj: 'Married filing jointly',
  mfs: 'Married filing separately',
  hoh: 'Head of household',
};

type FormState = {
  proceedsUsd: string;
  costBasisUsd: string;
  holdingYears: string;
  issuedUnderObbba: boolean;
  filingStatus: FilingStatus;
  taxYear: TaxYear;
  otherTaxableIncomeUsd: string;
  stateRatePct: string;
};

const DEFAULTS: FormState = {
  proceedsUsd: '5050000',
  costBasisUsd: '50000',
  holdingYears: '5',
  issuedUnderObbba: true,
  filingStatus: 'single',
  taxYear: 2026,
  otherTaxableIncomeUsd: '600000',
  stateRatePct: '0',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  proceedsUsd: 'p',
  costBasisUsd: 'b',
  holdingYears: 'h',
  issuedUnderObbba: 'ob',
  filingStatus: 'fs',
  taxYear: 'y',
  otherTaxableIncomeUsd: 'inc',
  stateRatePct: 'sr',
};

export function QsbsCalculator() {
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

  const result = useMemo<
    { ok: true; data: QsbsResult } | { ok: false; error: string }
  >(() => {
    try {
      return {
        ok: true,
        data: calculateQsbs({
          proceedsUsd: Number(form.proceedsUsd),
          costBasisUsd: Number(form.costBasisUsd),
          holdingYears: Number(form.holdingYears),
          issuedUnderObbba: form.issuedUnderObbba,
          filingStatus: form.filingStatus,
          taxYear: form.taxYear,
          otherTaxableIncomeUsd: Number(form.otherTaxableIncomeUsd),
          stateRate: Number(form.stateRatePct) / 100,
        }),
      };
    } catch (e) {
      if (e instanceof TaxCalcError) return { ok: false, error: e.message };
      return { ok: false, error: 'Could not calculate. Check your inputs.' };
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Sale proceeds">
          <input type="number" inputMode="decimal" value={form.proceedsUsd}
            onChange={(e) => setForm({ proceedsUsd: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Cost basis (strike × shares for options)">
          <input type="number" inputMode="decimal" value={form.costBasisUsd}
            onChange={(e) => setForm({ costBasisUsd: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Years held (since acquiring shares)">
          <input type="number" inputMode="decimal" value={form.holdingYears}
            onChange={(e) => setForm({ holdingYears: e.target.value })} className={inputCls} />
        </Field>
        <Field label="Filing status">
          <select value={form.filingStatus}
            onChange={(e) => setForm({ filingStatus: e.target.value as FilingStatus })} className={inputCls}>
            {Object.entries(FILING_LABELS).map(([v, l]) => (
              <option key={v} value={v}>{l}</option>
            ))}
          </select>
        </Field>
        <Field label="Your other taxable income">
          <input type="number" inputMode="decimal" value={form.otherTaxableIncomeUsd}
            onChange={(e) => setForm({ otherTaxableIncomeUsd: e.target.value })} className={inputCls} />
        </Field>
        <Field label="State tax rate on gain % (0 if your state conforms / no tax)">
          <input type="number" inputMode="decimal" value={form.stateRatePct}
            onChange={(e) => setForm({ stateRatePct: e.target.value })} className={inputCls} />
        </Field>
        <label className="flex items-start gap-2 text-sm sm:col-span-2">
          <input type="checkbox" checked={form.issuedUnderObbba}
            onChange={(e) => setForm({ issuedUnderObbba: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-gray-300" />
          <span className="text-gray-700 dark:text-gray-300">
            Shares were issued on or after July 4, 2025 (uses the new tiered 50/75/100% exclusion + $15M cap).
            Uncheck for older stock (legacy 5-year all-or-nothing + $10M cap).
          </span>
        </label>
      </div>

      {!result.ok ? (
        <div className="rounded-md border border-red-300 bg-red-50 p-4 text-sm text-red-800 dark:border-red-800 dark:bg-red-950 dark:text-red-200">
          {result.error}
        </div>
      ) : (
        <ResultPanel r={result.data} />
      )}
    </div>
  );
}

const inputCls =
  'mt-1 block w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-brand-600 focus:outline-none focus:ring-1 focus:ring-brand-600 dark:border-gray-700 dark:bg-gray-900';

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-medium text-gray-700 dark:text-gray-300">{label}</span>
      {children}
    </label>
  );
}

function ResultPanel({ r }: { r: QsbsResult }) {
  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Gain excluded from federal tax" value={usd.format(r.excludedGainUsd)} highlight />
        <Stat label="Federal tax saved by QSBS" value={usd.format(r.federalSavingsUsd)} highlight />
        <Stat label="Effective federal rate on the gain" value={pct.format(r.effectiveFederalRatePct / 100)} />
      </div>

      <div className="rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800">
        <p className="font-semibold text-gray-900 dark:text-gray-100">The breakdown</p>
        <ul className="mt-2 space-y-1 text-gray-700 dark:text-gray-300">
          <li>Total gain: <strong>{usd.format(r.gainUsd)}</strong></li>
          <li>Exclusion applied: <strong>{pct.format(r.exclusionPct)}</strong> {r.exclusionPct > 0 ? '(based on your holding period)' : '(does not qualify yet)'}</li>
          <li>Per-issuer cap (greater of $15M or 10× basis): <strong>{usd.format(r.perIssuerCapUsd)}</strong></li>
          {r.aboveCapGainUsd > 0 && (
            <li>Gain above the cap (ordinary LTCG): <strong>{usd.format(r.aboveCapGainUsd)}</strong></li>
          )}
          <li>Federal tax with QSBS: <strong>{usd.format(r.federalTaxWithQsbsUsd)}</strong></li>
          <li>Federal tax without QSBS: <strong>{usd.format(r.federalTaxWithoutQsbsUsd)}</strong></li>
          {r.stateTaxUsd > 0 && (
            <li>Estimated state tax on the full gain: <strong>{usd.format(r.stateTaxUsd)}</strong></li>
          )}
        </ul>
      </div>

      {r.notes.length > 0 && (
        <div className="rounded-lg border border-amber-300 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-800 dark:bg-amber-950/40 dark:text-amber-100">
          <ul className="space-y-1">
            {r.notes.map((n, i) => <li key={i}>{n}</li>)}
          </ul>
        </div>
      )}

      {r.federalSavingsUsd > 0 && (
        <GumroadUpsell shortfallUsd={r.federalSavingsUsd} preferredProduct="annual-review" />
      )}
      <ShareCalculation />
    </div>
  );
}

function Stat({ label, value, highlight }: { label: string; value: string; highlight?: boolean }) {
  return (
    <div className={`rounded-lg border p-4 ${highlight ? 'border-brand-500 bg-brand-50 dark:bg-brand-950' : 'border-gray-200 dark:border-gray-800'}`}>
      <span className="block text-xs uppercase tracking-wide text-gray-500">{label}</span>
      <span className="mt-1 block text-2xl font-bold">{value}</span>
    </div>
  );
}
