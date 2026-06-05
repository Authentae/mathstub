'use client';
import { useMemo } from 'react';
import {
  calculateAmtCreditRecovery,
  type AmtCreditRecoveryInput,
  type AmtCreditRecoveryResult,
} from '@tax/amt-credit-recovery';
import { type FilingStatus, type TaxYear, TaxCalcError } from '@tax/types';
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

type FormState = {
  startingTaxYear: TaxYear;
  filingStatus: FilingStatus;
  creditBalanceUsd: string;
  projectedIncomeUsd: string;
  preTaxDeductionsUsd: string;
  annualIncomeGrowthPct: string;
  yearsToProject: string;
};

const DEFAULTS: FormState = {
  startingTaxYear: 2026,
  filingStatus: 'single',
  creditBalanceUsd: '35000',
  projectedIncomeUsd: '220000',
  preTaxDeductionsUsd: '23500',
  annualIncomeGrowthPct: '4',
  yearsToProject: '10',
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const URL_KEYS: { [K in keyof FormState]: string } = {
  startingTaxYear: 'y',
  filingStatus: 'fs',
  creditBalanceUsd: 'cb',
  projectedIncomeUsd: 'pi',
  preTaxDeductionsUsd: 'pd',
  annualIncomeGrowthPct: 'g',
  yearsToProject: 'n',
};

export function AmtCreditRecoveryCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'startingTaxYear') {
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

  const result: AmtCreditRecoveryResult | { error: string } = useMemo(() => {
    try {
      const input: AmtCreditRecoveryInput = {
        startingTaxYear: form.startingTaxYear,
        filingStatus: form.filingStatus,
        creditBalanceUsd: toNumberOrZero(form.creditBalanceUsd),
        projectedIncomeUsd: toNumberOrZero(form.projectedIncomeUsd),
        preTaxDeductionsUsd: toNumberOrZero(form.preTaxDeductionsUsd),
        annualIncomeGrowthPct: toNumberOrZero(form.annualIncomeGrowthPct) / 100,
        yearsToProject: Math.max(1, Math.min(30, toNumberOrZero(form.yearsToProject) || 10)),
      };
      return calculateAmtCreditRecovery(input);
    } catch (e) {
      return { error: e instanceof TaxCalcError ? e.message : 'Invalid input' };
    }
  }, [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm({ [key]: value } as Partial<FormState>);
  };

  return (
    <div className="space-y-6">
      <form className="grid gap-4 rounded-lg border border-slate-800 bg-slate-900 p-5 md:grid-cols-2">
        <Field label="AMT credit balance from Form 8801 (USD)">
          <input
            type="number"
            min="0"
            value={form.creditBalanceUsd}
            onChange={(e) => update('creditBalanceUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Starting tax year">
          <select
            value={form.startingTaxYear}
            onChange={(e) => update('startingTaxYear', Number(e.target.value) as TaxYear)}
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
        <Field label="Projected gross income (year 1)">
          <input
            type="number"
            min="0"
            value={form.projectedIncomeUsd}
            onChange={(e) => update('projectedIncomeUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Pre-tax deductions (401k + HSA)">
          <input
            type="number"
            min="0"
            value={form.preTaxDeductionsUsd}
            onChange={(e) => update('preTaxDeductionsUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Annual income growth (%)">
          <input
            type="number"
            min="-50"
            max="100"
            step="0.1"
            value={form.annualIncomeGrowthPct}
            onChange={(e) => update('annualIncomeGrowthPct', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Years to project (1–30)">
          <input
            type="number"
            min="1"
            max="30"
            value={form.yearsToProject}
            onChange={(e) => update('yearsToProject', e.target.value)}
            className={inputCls}
          />
        </Field>
      </form>

      {'error' in result ? (
        <div className="rounded-lg bg-amber-500/10 p-4 text-sm text-amber-200 ring-1 ring-amber-500/30">
          {result.error}
        </div>
      ) : (
        <Result result={result} />
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

function Result({ result }: { result: AmtCreditRecoveryResult }) {
  const r = result;
  const fullyRecovered = r.yearsToFullRecovery !== null;
  const offers = offersForShortfall(Math.max(0, r.startingCreditBalanceUsd));

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${
          fullyRecovered
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
            : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Projected recovery
        </p>
        <p
          className={`mt-1 text-4xl font-bold ${
            fullyRecovered
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-amber-700 dark:text-amber-300'
          }`}
        >
          {fullyRecovered
            ? `${r.yearsToFullRecovery} year${r.yearsToFullRecovery === 1 ? '' : 's'} to full recovery`
            : `${usd.format(r.remainingBalanceAfterHorizonUsd)} unused after ${r.schedule.length} years`}
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Starting balance: <strong>{usd.format(r.startingCreditBalanceUsd)}</strong>. Total
          credit applied: <strong>{usd.format(r.totalCreditAppliedUsd)}</strong>.
        </p>
      </div>

      <ShareCalculation what="this AMT credit recovery projection" />

      <GumroadUpsell shortfallUsd={r.startingCreditBalanceUsd} />

      <div className="overflow-x-auto rounded-md border border-gray-200 bg-white text-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full min-w-[640px]">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-950">
            <tr>
              <th className="px-3 py-2">Year</th>
              <th className="px-3 py-2 text-right">Income</th>
              <th className="px-3 py-2 text-right">Regular tax</th>
              <th className="px-3 py-2 text-right">TMT</th>
              <th className="px-3 py-2 text-right">Credit applied</th>
              <th className="px-3 py-2 text-right">Balance after</th>
            </tr>
          </thead>
          <tbody>
            {r.schedule.map((row) => (
              <tr key={row.taxYear} className="border-t border-gray-200 dark:border-gray-800">
                <td className="px-3 py-2 font-medium">{row.taxYear}</td>
                <td className="px-3 py-2 text-right">{usd.format(row.projectedIncomeUsd)}</td>
                <td className="px-3 py-2 text-right">{usd.format(row.regularFederalTaxUsd)}</td>
                <td className="px-3 py-2 text-right">{usd.format(row.tentativeMinimumTaxUsd)}</td>
                <td
                  className={`px-3 py-2 text-right font-medium ${
                    row.creditAppliedUsd > 0
                      ? 'text-emerald-700 dark:text-emerald-300'
                      : 'text-gray-500 dark:text-gray-500'
                  }`}
                >
                  {row.creditAppliedUsd > 0 ? usd.format(row.creditAppliedUsd) : '—'}
                </td>
                <td className="px-3 py-2 text-right">
                  {usd.format(row.remainingCreditBalanceUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {r.notes.length > 0 && (
        <ul className="space-y-2 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
          {r.notes.map((n, i) => (
            <li key={i}>• {n}</li>
          ))}
        </ul>
      )}

      {offers.length > 0 && (
        <div>
          <p className="mb-2 text-xs uppercase tracking-wide text-gray-500">
            Recommended next steps
          </p>
          <div className="grid gap-3 md:grid-cols-2">
            {offers.slice(0, 4).map((o) => (
              <AffiliateCard key={o.id} offerId={o.id} />
            ))}
          </div>
        </div>
      )}

      <EmailCapture source="amt-credit-recovery" shortfallUsd={r.startingCreditBalanceUsd} />
    </div>
  );
}
