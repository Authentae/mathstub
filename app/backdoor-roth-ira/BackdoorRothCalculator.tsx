'use client';
import { useMemo } from 'react';
import {
  calculateBackdoorRoth,
  type BackdoorRothInput,
  type BackdoorRothResult,
} from '@tax/backdoor-roth-ira';
import { type FilingStatus, type TaxYear } from '@tax/types';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { EmailCapture } from '@/components/EmailCapture';
import { ShareCalculation } from '@/components/ShareCalculation';
import { useUrlFormState } from '@/lib/useUrlFormState';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const usdBig = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
  notation: 'compact',
});
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});

type FormState = {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  age: string;
  magiUsd: string;
  preTaxIraBalanceUsd: string;
  marginalRatePct: string;
  yearsToRetirement: string;
  expectedReturnPct: string;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'single',
  age: '32',
  magiUsd: '250000',
  preTaxIraBalanceUsd: '0',
  marginalRatePct: '32',
  yearsToRetirement: '30',
  expectedReturnPct: '7',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  filingStatus: 'fs',
  age: 'a',
  magiUsd: 'm',
  preTaxIraBalanceUsd: 'pt',
  marginalRatePct: 'mr',
  yearsToRetirement: 'yr',
  expectedReturnPct: 'er',
};

function toNum(v: string, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function BackdoorRothCalculator() {
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

  const result: BackdoorRothResult | { error: string } = useMemo(() => {
    try {
      const input: BackdoorRothInput = {
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        age: toNum(form.age, 30),
        magi: toNum(form.magiUsd),
        preTaxIraBalance: toNum(form.preTaxIraBalanceUsd),
        marginalRate: toNum(form.marginalRatePct, 22) / 100,
        yearsToRetirement: toNum(form.yearsToRetirement, 30),
        expectedReturnRate: toNum(form.expectedReturnPct, 7) / 100,
      };
      return calculateBackdoorRoth(input);
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Calc error' };
    }
  }, [form]);

  if ('error' in result) {
    return (
      <div className="rounded-lg border border-red-500/40 bg-red-900/20 p-5 text-red-200">
        <p className="font-bold">Couldn&rsquo;t calculate.</p>
        <p className="text-sm">{result.error}</p>
      </div>
    );
  }

  const eligibilityCopy: Record<string, { color: string; label: string; sub: string }> = {
    'direct-roth-available': {
      color: 'emerald',
      label: 'Direct Roth available',
      sub: 'Your MAGI is below the phaseout — no Backdoor needed. Contribute directly to a Roth IRA.',
    },
    'partial-direct': {
      color: 'amber',
      label: 'Partial direct + topped-up Backdoor',
      sub: 'Your MAGI is inside the phaseout. Direct Roth allowed for part; use Backdoor for the rest.',
    },
    'backdoor-required': {
      color: 'brand',
      label: 'Backdoor required',
      sub: 'Your MAGI is above the phaseout. Direct Roth is closed; the Backdoor is your only path.',
    },
    'mfs-trapped': {
      color: 'red',
      label: 'MFS — basically no Roth',
      sub: 'Married filing separately while living with spouse has a $0–$10k phaseout. Backdoor is the only option, with extra care needed.',
    },
  };

  const e = eligibilityCopy[result.eligibility] ?? eligibilityCopy['backdoor-required']!;

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Tax year">
            <select
              value={form.taxYear}
              onChange={(e) => setForm({ taxYear: Number(e.target.value) as TaxYear })}
              className={inputClass}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </Field>
          <Field label="Filing status">
            <select
              value={form.filingStatus}
              onChange={(e) => setForm({ filingStatus: e.target.value as FilingStatus })}
              className={inputClass}
            >
              <option value="single">Single</option>
              <option value="mfj">Married Filing Jointly</option>
              <option value="mfs">Married Filing Separately</option>
              <option value="hoh">Head of Household</option>
            </select>
          </Field>
          <Field label="Your age" hint="Catch-up adds $1,000 to limit at 50+">
            <input
              type="number"
              inputMode="decimal"
              value={form.age}
              onChange={(e) => setForm({ age: e.target.value })}
              className={inputClass}
              min={18}
              max={90}
            />
          </Field>
          <Field
            label="Modified AGI ($)"
            hint={`Phaseout: ${usd.format(result.phaseout.full)} → ${usd.format(result.phaseout.none)}`}
          >
            <input
              type="number"
              inputMode="decimal"
              value={form.magiUsd}
              onChange={(e) => setForm({ magiUsd: e.target.value })}
              className={inputClass}
              min={0}
            />
          </Field>
          <Field
            label="Pre-tax Traditional IRA balance ($)"
            hint="Sum across ALL Traditional / SEP / SIMPLE IRAs"
          >
            <input
              type="number"
              inputMode="decimal"
              value={form.preTaxIraBalanceUsd}
              onChange={(e) => setForm({ preTaxIraBalanceUsd: e.target.value })}
              className={inputClass}
              min={0}
            />
          </Field>
          <Field label="Federal marginal rate (%)" hint="Default 32% — most high earners">
            <input
              type="number"
              inputMode="decimal"
              value={form.marginalRatePct}
              onChange={(e) => setForm({ marginalRatePct: e.target.value })}
              className={inputClass}
              min={0}
              max={50}
              step="0.5"
            />
          </Field>
          <Field label="Years to retirement (projection)">
            <input
              type="number"
              inputMode="decimal"
              value={form.yearsToRetirement}
              onChange={(e) => setForm({ yearsToRetirement: e.target.value })}
              className={inputClass}
              min={0}
              max={50}
            />
          </Field>
          <Field label="Expected annual return %">
            <input
              type="number"
              inputMode="decimal"
              value={form.expectedReturnPct}
              onChange={(e) => setForm({ expectedReturnPct: e.target.value })}
              className={inputClass}
              step="0.1"
              min={-10}
              max={20}
            />
          </Field>
        </div>
      </div>

      {/* Eligibility status */}
      <div
        className={`rounded-xl border p-5 ${
          e.color === 'emerald'
            ? 'border-emerald-500/40 bg-emerald-950/30'
            : e.color === 'amber'
              ? 'border-amber-500/40 bg-amber-950/30'
              : e.color === 'red'
                ? 'border-red-500/40 bg-red-950/30'
                : 'border-brand-500/40 bg-brand-950/30'
        }`}
      >
        <p className={`text-xs font-bold uppercase tracking-wide text-${e.color}-300`}>
          {e.label}
        </p>
        <p className="mt-2 text-sm text-slate-200">{e.sub}</p>
      </div>

      {/* Big number result */}
      <div className="overflow-hidden rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-950 p-6">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-300">
          Total Roth space you can use this year
        </p>
        <p className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">
          {usd.format(result.totalRothContribution)}
        </p>
        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <Stat
            label="Direct Roth"
            value={usd.format(result.directRothAllowed)}
            hint="No backdoor needed"
          />
          <Stat
            label="Backdoor portion"
            value={usd.format(result.backdoorAmount)}
            hint="Trad IRA → convert"
          />
          <Stat
            label="IRA cap"
            value={usd.format(result.contributionLimit)}
            hint="IRC §219(b)"
          />
        </div>
      </div>

      {/* Pro-rata warning */}
      {result.needsBasisIsolation ? (
        <div className="rounded-xl border border-amber-500/50 bg-amber-950/30 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-amber-300">
            ⚠️ Pro-rata tax — basis isolation needed
          </p>
          <div className="mt-3 grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300/80">
                Taxable conversion %
              </p>
              <p className="font-mono text-xl font-bold text-amber-100">
                {pct.format(result.proRataTaxablePct)}
              </p>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-wide text-amber-300/80">
                Conversion tax owed
              </p>
              <p className="font-mono text-xl font-bold text-amber-100">
                {usd.format(result.proRataTaxOwed)}
              </p>
            </div>
          </div>
          <p className="mt-3 text-sm text-amber-100">
            To escape pro-rata, roll your{' '}
            <span className="font-bold">{usd.format(toNum(form.preTaxIraBalanceUsd))}</span> pre-tax
            Traditional IRA into a 401(k) BEFORE Dec 31 of the conversion year. 401(k) is not subject
            to pro-rata; only Traditional/SEP/SIMPLE IRAs count.
          </p>
        </div>
      ) : null}

      {/* Projection cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-400">
            If you do this once
          </p>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {usdBig.format(result.oneTimeProjection)}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            tax-free in {form.yearsToRetirement} years @ {form.expectedReturnPct}%
          </p>
          <p className="mt-2 text-xs text-emerald-300">
            {usd.format(result.taxFreeGrowthOneTime)} of growth — never taxed
          </p>
        </div>
        <div className="rounded-xl border border-emerald-500/40 bg-emerald-950/20 p-5">
          <p className="text-xs font-bold uppercase tracking-wide text-emerald-300">
            If you do this every year
          </p>
          <p className="mt-2 font-mono text-3xl font-bold text-white">
            {usdBig.format(result.recurringProjection)}
          </p>
          <p className="mt-1 text-sm text-slate-400">
            tax-free Roth nest egg after {form.yearsToRetirement} years
          </p>
        </div>
      </div>

      <ShareCalculation />
      <GumroadUpsell shortfallUsd={result.totalRothContribution * 10} />
      <EmailCapture source="backdoor-roth-ira" shortfallUsd={result.totalRothContribution} />
    </div>
  );
}

const labelClass = 'text-sm font-bold text-slate-200';
const hintClass = 'text-xs text-slate-500';
const inputClass =
  'mt-1 block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className={labelClass}>{label}</label>
      {children}
      {hint && <p className={`mt-1 ${hintClass}`}>{hint}</p>}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: string; hint: string }) {
  return (
    <div className="rounded-lg border border-slate-800 bg-slate-950/60 p-3">
      <p className="text-[10px] font-bold uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-0.5 font-mono text-lg font-bold text-white">{value}</p>
      <p className="text-[11px] italic text-slate-500">{hint}</p>
    </div>
  );
}
