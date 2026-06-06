'use client';
import { useMemo } from 'react';
import {
  calculateW4Step4c,
  type FilingStatus,
  type W4Step4cResult,
} from '@tax/w4-step-4c';
import { TaxCalcError } from '@tax/types';
import { GumroadUpsell } from '@/components/GumroadUpsell';
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

type FormState = {
  projectedAnnualTaxUsd: string;
  withholdingYtdUsd: string;
  projectedRemainingWithholdingUsd: string;
  remainingPayPeriods: string;
  /** Optional prior-year inputs for the §6654 safe-harbor branch. */
  usePriorYear: boolean;
  priorYearTaxUsd: string;
  priorYearAgiUsd: string;
  priorYearFilingStatus: FilingStatus;
};

const DEFAULTS: FormState = {
  projectedAnnualTaxUsd: '84000',
  withholdingYtdUsd: '53250',
  projectedRemainingWithholdingUsd: '17750',
  remainingPayPeriods: '18',
  usePriorYear: true,
  priorYearTaxUsd: '68000',
  priorYearAgiUsd: '310000',
  priorYearFilingStatus: 'mfj',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  projectedAnnualTaxUsd: 't',
  withholdingYtdUsd: 'wy',
  projectedRemainingWithholdingUsd: 'wr',
  remainingPayPeriods: 'pp',
  usePriorYear: 'up',
  priorYearTaxUsd: 'pt',
  priorYearAgiUsd: 'pa',
  priorYearFilingStatus: 'pf',
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

function safeHarborLabel(branch: W4Step4cResult['safeHarbor'] extends infer S
  ? S extends { current: { branch: infer B } }
    ? B
    : never
  : never): string {
  switch (branch) {
    case 'current-year-90pct':
      return '§6654 current-year 90% safe harbor';
    case 'prior-year-100pct':
      return "§6654 prior-year 100% safe harbor (AGI ≤ $150k)";
    case 'prior-year-110pct':
      return '§6654 prior-year 110% safe harbor (AGI > $150k)';
    case 'none-needed':
      return 'No safe harbor needed (owed − paid < $1,000)';
    default:
      return 'Safe-harbor status unknown';
  }
}

export function W4Step4cCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'usePriorYear') return (raw === '1') as FormState[typeof key];
      return raw as FormState[typeof key];
    },
  });

  const result = useMemo<{ ok: true; data: W4Step4cResult } | { ok: false; error: string }>(() => {
    try {
      const data = calculateW4Step4c({
        projectedAnnualTaxUsd: toNumberOrZero(form.projectedAnnualTaxUsd),
        withholdingYtdUsd: toNumberOrZero(form.withholdingYtdUsd),
        projectedRemainingWithholdingUsd: toNumberOrZero(form.projectedRemainingWithholdingUsd),
        remainingPayPeriods: toNumberOrZero(form.remainingPayPeriods),
        ...(form.usePriorYear
          ? {
              priorYearTaxUsd: toNumberOrZero(form.priorYearTaxUsd),
              priorYearAgiUsd: toNumberOrZero(form.priorYearAgiUsd),
              priorYearFilingStatus: form.priorYearFilingStatus,
            }
          : {}),
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
          1. Your tax projection (current year)
        </legend>

        <Field
          label="Projected total federal tax owed for the year"
          hint="From the Mathstub RSU/bonus/NSO shortfall calcs, or your last 1040 Line 24 + this year's vests."
        >
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.projectedAnnualTaxUsd}
            onChange={(e) => setForm({ projectedAnnualTaxUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </Field>

        <Field
          label="Federal withholding year-to-date"
          hint="Sum of federal income tax withheld across all paychecks so far this year (find on your latest paystub)."
        >
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.withholdingYtdUsd}
            onChange={(e) => setForm({ withholdingYtdUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </Field>

        <Field
          label="Projected remaining baseline withholding (no W-4 change)"
          hint="What payroll will withhold for the rest of the year if you do nothing. Quick estimate: (last paystub federal WH) × remaining pay periods."
        >
          <input
            type="number"
            inputMode="numeric"
            min={0}
            value={form.projectedRemainingWithholdingUsd}
            onChange={(e) => setForm({ projectedRemainingWithholdingUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </Field>

        <Field
          label="Remaining pay periods this year"
          hint="Biweekly = 26/yr, semi-monthly = 24/yr, monthly = 12/yr. Subtract paychecks already received."
        >
          <input
            type="number"
            inputMode="numeric"
            min={1}
            max={52}
            value={form.remainingPayPeriods}
            onChange={(e) => setForm({ remainingPayPeriods: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
          />
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          2. §6654 prior-year safe harbor (optional)
        </legend>

        <label className="flex items-start gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.usePriorYear}
            onChange={(e) => setForm({ usePriorYear: e.target.checked })}
            className="mt-1 h-4 w-4 rounded border-slate-300"
          />
          <span className="text-slate-300">
            Use prior-year safe-harbor branch (recommended — almost always
            gives a lower required-paid-in threshold than the current-year 90%
            branch for tech workers with a high prior-year tax bill).
          </span>
        </label>

        {form.usePriorYear && (
          <div className="grid gap-4 sm:grid-cols-3">
            <Field
              label="Prior-year federal tax (1040 Line 24)"
              hint="The total federal income tax line from your last filed 1040."
            >
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={form.priorYearTaxUsd}
                onChange={(e) => setForm({ priorYearTaxUsd: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </Field>
            <Field
              label="Prior-year AGI (1040 Line 11)"
              hint="> $150k triggers the 110% factor instead of 100% ($75k for MFS)."
            >
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={form.priorYearAgiUsd}
                onChange={(e) => setForm({ priorYearAgiUsd: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 placeholder-slate-400 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              />
            </Field>
            <Field label="Prior-year filing status">
              <select
                value={form.priorYearFilingStatus}
                onChange={(e) =>
                  setForm({ priorYearFilingStatus: e.target.value as FilingStatus })
                }
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
              >
                <option value="single">Single</option>
                <option value="mfj">Married filing jointly</option>
                <option value="mfs">Married filing separately</option>
                <option value="hoh">Head of household</option>
              </select>
            </Field>
          </div>
        )}
      </fieldset>

      {!result.ok ? (
        <div className="rounded-lg border border-red-500/40 bg-red-900/20 p-5 text-red-200">
          <p className="font-bold">Couldn&rsquo;t calculate.</p>
          <p className="text-sm">{result.error}</p>
        </div>
      ) : (
        <ResultPanel result={result.data} />
      )}

      {result.ok && result.data.shortfallUsd > 0 && (
        <GumroadUpsell shortfallUsd={result.data.shortfallUsd} />
      )}
    </div>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-semibold text-slate-100">{label}</span>
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
      {children}
    </label>
  );
}

function ResultPanel({ result }: { result: W4Step4cResult }) {
  const noShortfall = result.shortfallUsd === 0;

  return (
    <div className="space-y-5 rounded-lg border border-brand-500/40 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-950/30">
      {noShortfall ? (
        <div>
          <p className="text-sm font-mono uppercase tracking-wide text-emerald-700 dark:text-emerald-300">
            No shortfall
          </p>
          <p className="mt-1 text-2xl font-bold text-slate-100">
            You&rsquo;re on track. No W-4 4(c) change needed.
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Projected withholding ({usd.format(result.baselineAnnualWithholdingUsd)}) meets or exceeds projected tax owed.
          </p>
        </div>
      ) : (
        <div>
          <p className="text-sm font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
            Recommended W-4 Line 4(c) entry
          </p>
          <p className="mt-1 text-4xl font-bold tracking-tight text-slate-100">
            {usd.format(result.perPeriodExtraRoundedUsd)}
            <span className="ml-2 text-base font-normal text-slate-500">/ pay period</span>
          </p>
          <p className="mt-2 text-sm text-slate-300">
            Exact unrounded: {usdCents.format(result.perPeriodExtraUsd)}. Rounded UP to the nearest $5 because payroll systems handle whole-dollar amounts cleanly and over-withholding refunds at filing.
          </p>
          <p className="mt-3 rounded-md border border-amber-500/30 bg-amber-500/10 p-3 text-xs text-amber-900 dark:text-amber-200">
            <strong>Total projected shortfall:</strong> {usd.format(result.shortfallUsd)} —
            {' '}({usd.format(result.baselineAnnualWithholdingUsd)} baseline withholding vs. projected tax owed). Submit
            an updated W-4 with this amount on Line 4(c) to close the gap before December 31.
          </p>
        </div>
      )}

      {result.safeHarbor && (
        <div className="border-t border-brand-500/20 pt-4">
          <p className="text-xs font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
            §6654 safe-harbor verdict
          </p>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <SafeHarborTile
              heading="Without the W-4 fix"
              snapshot={result.safeHarbor.current}
            />
            <SafeHarborTile
              heading="With the W-4 fix"
              snapshot={result.safeHarbor.afterFix}
              positive
            />
          </div>
          <p className="mt-3 text-xs italic text-slate-400">
            §6654(g)(1) — withholding is deemed ratable across the year, so a Q4 W-4 boost retroactively cures Q1–Q3 underpayment.
          </p>
        </div>
      )}
    </div>
  );
}

function SafeHarborTile({
  heading,
  snapshot,
  positive,
}: {
  heading: string;
  snapshot: NonNullable<W4Step4cResult['safeHarbor']>['current'];
  positive?: boolean;
}) {
  const clearColor = snapshot.willClear
    ? 'text-emerald-700 dark:text-emerald-300'
    : 'text-red-700 dark:text-red-300';
  return (
    <div
      className={`rounded-md border p-3 text-sm ${
        positive
          ? 'border-emerald-500/30 bg-emerald-500/5'
          : 'border-slate-300 bg-white dark:border-slate-700 dark:bg-slate-900/40'
      }`}
    >
      <p className="text-xs uppercase tracking-wide text-slate-500">{heading}</p>
      <p className={`mt-1 font-mono text-base font-bold ${clearColor}`}>
        {snapshot.willClear ? '✓ Clears' : '✗ Short by ' + usd.format(snapshot.shortfallVsThresholdUsd)}
      </p>
      <p className="mt-1 text-xs text-slate-400">
        {safeHarborLabel(snapshot.branch)}
      </p>
      {snapshot.thresholdUsd > 0 && (
        <p className="text-xs text-slate-500 dark:text-slate-500">
          Threshold: {usd.format(snapshot.thresholdUsd)} paid in by year-end
        </p>
      )}
    </div>
  );
}
