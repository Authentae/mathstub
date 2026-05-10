'use client';
import { useMemo, useState } from 'react';
import { calculateSafeHarbor } from '@tax/safe-harbor';
import {
  type FilingStatus,
  type Quarter,
  type SafeHarborInput,
  type SafeHarborResult,
  type TaxYear,
  TaxCalcError,
} from '@tax/types';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type FormState = {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  expectedCurrentYearTaxUsd: string;
  priorYearTaxUsd: string;
  priorYearAgiUsd: string;
  expectedAnnualWithholdingUsd: string;
  estimatedPaymentsMadeUsd: string;
  nextQuarter: Quarter;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'single',
  expectedCurrentYearTaxUsd: '80000',
  priorYearTaxUsd: '60000',
  priorYearAgiUsd: '200000',
  expectedAnnualWithholdingUsd: '50000',
  estimatedPaymentsMadeUsd: '0',
  nextQuarter: 1,
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function QuarterlyEstimatedTaxCalculator() {
  const [form, setForm] = useState<FormState>(DEFAULTS);

  const result: SafeHarborResult | { error: string } = useMemo(() => {
    try {
      const input: SafeHarborInput = {
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        expectedCurrentYearTaxUsd: toNumberOrZero(form.expectedCurrentYearTaxUsd),
        priorYearTaxUsd: toNumberOrZero(form.priorYearTaxUsd),
        priorYearAgiUsd: toNumberOrZero(form.priorYearAgiUsd),
        expectedAnnualWithholdingUsd: toNumberOrZero(form.expectedAnnualWithholdingUsd),
        estimatedPaymentsMadeUsd: toNumberOrZero(form.estimatedPaymentsMadeUsd),
        nextQuarter: form.nextQuarter,
      };
      return calculateSafeHarbor(input);
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

        <Field label="Expected total federal tax this year ($)">
          <input
            type="number"
            min="0"
            value={form.expectedCurrentYearTaxUsd}
            onChange={(e) => update('expectedCurrentYearTaxUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Prior-year total federal tax (Form 1040 line 24)">
          <input
            type="number"
            min="0"
            value={form.priorYearTaxUsd}
            onChange={(e) => update('priorYearTaxUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Prior-year AGI (Form 1040 line 11)">
          <input
            type="number"
            min="0"
            value={form.priorYearAgiUsd}
            onChange={(e) => update('priorYearAgiUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Expected annual federal withholding (W-2 + 1099)">
          <input
            type="number"
            min="0"
            value={form.expectedAnnualWithholdingUsd}
            onChange={(e) => update('expectedAnnualWithholdingUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Estimated payments already made this year">
          <input
            type="number"
            min="0"
            value={form.estimatedPaymentsMadeUsd}
            onChange={(e) => update('estimatedPaymentsMadeUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Next due quarter">
          <select
            value={form.nextQuarter}
            onChange={(e) => update('nextQuarter', Number(e.target.value) as Quarter)}
            className={inputCls}
          >
            <option value={1}>Q1 — April 15</option>
            <option value={2}>Q2 — June 15</option>
            <option value={3}>Q3 — September 15</option>
            <option value={4}>Q4 — January 15 (next year)</option>
          </select>
        </Field>
      </form>

      {'error' in result ? (
        <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          {result.error}
        </div>
      ) : (
        <Result result={result} nextQuarter={form.nextQuarter} />
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

function Result({
  result,
  nextQuarter,
}: {
  result: SafeHarborResult;
  nextQuarter: Quarter;
}) {
  const r = result;
  const dueLabel = r.quarters[nextQuarter - 1]!.dueDateLabel;

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${
          r.recommendedNextPaymentUsd > 0
            ? 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
            : 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Recommended payment by {dueLabel}
        </p>
        <p
          className={`mt-1 text-4xl font-bold ${
            r.recommendedNextPaymentUsd > 0
              ? 'text-amber-700 dark:text-amber-300'
              : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {usd.format(r.recommendedNextPaymentUsd)}
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Safe-harbor target for the year: <strong>{usd.format(r.safeHarborTargetUsd)}</strong>{' '}
          (the lesser of {usd.format(r.safeHarbor90PctCurrentUsd)} = 90% of this year, and{' '}
          {usd.format(r.safeHarborPriorYearUsd)} ={' '}
          {r.highIncomeRuleApplies ? '110%' : '100%'} of last year).
        </p>
        {r.isUnderpaymentRisk && (
          <p className="mt-2 text-sm text-amber-900 dark:text-amber-200">
            ⚠ Year-end gap: {usd.format(r.yearEndGapUsd)}. Estimated penalty if you keep current
            pace: <strong>{usd.format(r.estimatedPenaltyUsd)}</strong>.
          </p>
        )}
      </div>

      <div className="overflow-hidden rounded-md border border-gray-200 bg-white text-sm dark:border-gray-800 dark:bg-gray-900">
        <table className="w-full">
          <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-950">
            <tr>
              <th className="px-4 py-2">Quarter</th>
              <th className="px-4 py-2">Due</th>
              <th className="px-4 py-2 text-right">Cumulative target</th>
              <th className="px-4 py-2 text-right">Cumulative paid</th>
              <th className="px-4 py-2 text-right">Cumulative gap</th>
            </tr>
          </thead>
          <tbody>
            {r.quarters.map((q) => (
              <tr
                key={q.quarter}
                className={`border-t border-gray-200 dark:border-gray-800 ${
                  q.quarter === nextQuarter ? 'bg-brand-50 dark:bg-brand-950/30' : ''
                }`}
              >
                <td className="px-4 py-2 font-medium">Q{q.quarter}</td>
                <td className="px-4 py-2">{q.dueDateLabel}</td>
                <td className="px-4 py-2 text-right">{usd.format(q.cumulativeTargetUsd)}</td>
                <td className="px-4 py-2 text-right">{usd.format(q.cumulativePaidUsd)}</td>
                <td
                  className={`px-4 py-2 text-right font-medium ${
                    q.cumulativeShortfallUsd > 0
                      ? 'text-amber-700 dark:text-amber-300'
                      : 'text-emerald-700 dark:text-emerald-300'
                  }`}
                >
                  {usd.format(q.cumulativeShortfallUsd)}
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
    </div>
  );
}
