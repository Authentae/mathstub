'use client';
import { useMemo } from 'react';
import { calculateRothSequencer, type RothSequencerResult, type SequencerStep } from '@tax/roth-sequencer';
import { TaxCalcError, type FilingStatus, type TaxYear } from '@tax/types';
import { useUrlFormState } from '@/lib/useUrlFormState';
import { GumroadUpsell } from '@/components/GumroadUpsell';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type FormState = {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  age: string;
  magi: string;
  marginalRate: string;
  preTaxIraBalance: string;
  employeeElectiveDeferral: string;
  employerMatch: string;
  planAllowsAfterTax: boolean;
  planAllowsConversion: boolean;
  planAcceptsRolloversIn: boolean;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'mfj',
  age: '35',
  magi: '400000',
  marginalRate: '0.32',
  preTaxIraBalance: '0',
  employeeElectiveDeferral: '23500',
  employerMatch: '11000',
  planAllowsAfterTax: true,
  planAllowsConversion: true,
  planAcceptsRolloversIn: true,
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  filingStatus: 'fs',
  age: 'a',
  magi: 'm',
  marginalRate: 'mr',
  preTaxIraBalance: 'ira',
  employeeElectiveDeferral: 'ed',
  employerMatch: 'em',
  planAllowsAfterTax: 'at',
  planAllowsConversion: 'pc',
  planAcceptsRolloversIn: 'pr',
};

function toNumOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function RothSequencerCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'taxYear') {
        const n = Number(raw);
        return ([2024, 2025, 2026].includes(n) ? n : defaultValue) as FormState[typeof key];
      }
      if (key === 'planAllowsAfterTax' || key === 'planAllowsConversion' || key === 'planAcceptsRolloversIn') {
        return (raw === '1') as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });

  const result = useMemo<{ ok: true; data: RothSequencerResult } | { ok: false; error: string }>(() => {
    try {
      const data = calculateRothSequencer({
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        age: toNumOrZero(form.age),
        magi: toNumOrZero(form.magi),
        marginalRate: toNumOrZero(form.marginalRate),
        preTaxIraBalance: toNumOrZero(form.preTaxIraBalance),
        employeeElectiveDeferral: toNumOrZero(form.employeeElectiveDeferral),
        employerMatch: toNumOrZero(form.employerMatch),
        planAllowsAfterTax: form.planAllowsAfterTax,
        planAllowsConversion: form.planAllowsConversion,
        planAcceptsRolloversIn: form.planAcceptsRolloversIn,
      });
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e instanceof TaxCalcError ? e.message : 'Calculation error' };
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <fieldset className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          1. Filer
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tax year">
            <select value={form.taxYear} onChange={(e) => setForm({ taxYear: Number(e.target.value) as TaxYear })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100">
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </Field>
          <Field label="Filing status">
            <select value={form.filingStatus} onChange={(e) => setForm({ filingStatus: e.target.value as FilingStatus })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base text-gray-900 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100">
              <option value="single">Single</option>
              <option value="mfj">Married filing jointly</option>
              <option value="mfs">Married filing separately</option>
              <option value="hoh">Head of household</option>
            </select>
          </Field>
          <Field label="Age">
            <input type="number" inputMode="numeric" min={0} max={120} value={form.age}
              onChange={(e) => setForm({ age: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
          <Field label="Modified AGI" hint="From your last 1040 (close to AGI for most filers).">
            <input type="number" inputMode="numeric" min={0} value={form.magi}
              onChange={(e) => setForm({ magi: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
          <Field label="Federal marginal rate (decimal)" hint="0.24, 0.32, or 0.35 typical for $200k+ earners.">
            <input type="number" inputMode="decimal" min={0} max={1} step={0.01} value={form.marginalRate}
              onChange={(e) => setForm({ marginalRate: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
          <Field label="Pre-tax Traditional IRA balance" hint="Sum across all Traditional/SEP/SIMPLE IRAs. Triggers pro-rata rule.">
            <input type="number" inputMode="numeric" min={0} value={form.preTaxIraBalance}
              onChange={(e) => setForm({ preTaxIraBalance: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          2. 401(k) plan setup
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Annual elective deferral" hint="2026 limit: $23,500 ($31,000 if 50+).">
            <input type="number" inputMode="numeric" min={0} value={form.employeeElectiveDeferral}
              onChange={(e) => setForm({ employeeElectiveDeferral: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
          <Field label="Expected employer match $/yr">
            <input type="number" inputMode="numeric" min={0} value={form.employerMatch}
              onChange={(e) => setForm({ employerMatch: e.target.value })}
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-base dark:border-gray-700 dark:bg-gray-950 dark:text-gray-100" />
          </Field>
        </div>
        <div className="space-y-2 text-sm">
          <Checkbox checked={form.planAllowsAfterTax} onChange={(v) => setForm({ planAllowsAfterTax: v })}
            label="Plan allows after-tax 401(k) contributions" />
          <Checkbox checked={form.planAllowsConversion} onChange={(v) => setForm({ planAllowsConversion: v })}
            label="Plan allows in-service distribution OR in-plan Roth conversion (IRR)" />
          <Checkbox checked={form.planAcceptsRolloversIn} onChange={(v) => setForm({ planAcceptsRolloversIn: v })}
            label="Plan accepts rollovers IN (needed for basis isolation of pre-tax IRA balance)" />
        </div>
      </fieldset>

      {!result.ok ? (
        <div className="rounded-lg border border-red-500/40 bg-red-900/20 p-5 text-red-200">
          <p className="font-bold">Couldn&rsquo;t calculate.</p>
          <p className="text-sm">{result.error}</p>
        </div>
      ) : (
        <ResultPanel r={result.data} />
      )}

      {result.ok && result.data.totalAnnualRothCapacityUsd > 0 && (
        <GumroadUpsell preferredProduct="annual-review" />
      )}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">{label}</span>
      {hint && <span className="block text-xs text-gray-500 dark:text-gray-400">{hint}</span>}
      {children}
    </label>
  );
}

function Checkbox({ checked, onChange, label }: { checked: boolean; onChange: (v: boolean) => void; label: string }) {
  return (
    <label className="flex items-start gap-2 text-gray-700 dark:text-gray-300">
      <input type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
        className="mt-1 h-4 w-4 rounded border-gray-300" />
      <span>{label}</span>
    </label>
  );
}

function ResultPanel({ r }: { r: RothSequencerResult }) {
  return (
    <div className="space-y-5 rounded-lg border border-brand-500/40 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-950/30">
      <div>
        <p className="text-sm font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Total annual Roth capacity
        </p>
        <p className={`mt-1 text-4xl font-bold tracking-tight ${
          r.totalAnnualRothCapacityUsd > 0
            ? 'text-emerald-700 dark:text-emerald-300'
            : 'text-gray-700 dark:text-gray-300'
        }`}>
          {usd.format(r.totalAnnualRothCapacityUsd)}
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">{r.recommendationHeadline}</p>
      </div>

      <ol className="space-y-3">
        {r.steps.map((step) => <StepCard key={`${step.kind}-${step.order}`} step={step} />)}
      </ol>
    </div>
  );
}

function StepCard({ step }: { step: SequencerStep }) {
  const blocked = step.blockedReason !== null;
  const accentClass = blocked
    ? 'border-slate-300 bg-slate-50 dark:border-slate-700 dark:bg-slate-900/40'
    : step.kind === 'basis-isolation'
      ? 'border-amber-500/40 bg-amber-50 dark:border-amber-500/30 dark:bg-amber-950/20'
      : 'border-brand-500/30 bg-white dark:border-brand-500/20 dark:bg-slate-900/40';
  return (
    <li className={`rounded-md border p-4 ${accentClass}`}>
      <div className="flex items-baseline justify-between gap-3">
        <h3 className={`text-base font-bold ${blocked ? 'text-slate-500 dark:text-slate-400 line-through' : 'text-gray-900 dark:text-gray-100'}`}>
          {step.headline}
        </h3>
        {step.rothCapacityUsd > 0 && (
          <span className="rounded-full bg-emerald-500/15 px-2 py-0.5 font-mono text-xs font-bold text-emerald-700 dark:text-emerald-300">
            +{usd.format(step.rothCapacityUsd)}/yr
          </span>
        )}
      </div>
      <p className={`mt-2 text-sm ${blocked ? 'text-slate-500 dark:text-slate-400' : 'text-gray-700 dark:text-gray-300'}`}>
        {step.body}
      </p>
    </li>
  );
}
