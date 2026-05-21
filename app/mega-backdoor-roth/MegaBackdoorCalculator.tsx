'use client';
import { useMemo } from 'react';
import {
  calculateMegaBackdoor,
  type MegaBackdoorInput,
  type MegaBackdoorResult,
} from '@tax/mega-backdoor-roth';
import { type TaxYear } from '@tax/types';
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

type FormState = {
  taxYear: TaxYear;
  age: string;
  electiveDeferralUsd: string;
  employerMatchUsd: string;
  employerProfitSharingUsd: string;
  planAllowsAfterTax: boolean;
  planAllowsConversion: boolean;
  yearsToRetirement: string;
  expectedReturnPct: string;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  age: '32',
  electiveDeferralUsd: '23500',
  employerMatchUsd: '11000',
  employerProfitSharingUsd: '0',
  planAllowsAfterTax: true,
  planAllowsConversion: true,
  yearsToRetirement: '25',
  expectedReturnPct: '7',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  age: 'a',
  electiveDeferralUsd: 'ed',
  employerMatchUsd: 'em',
  employerProfitSharingUsd: 'eps',
  planAllowsAfterTax: 'at',
  planAllowsConversion: 'cv',
  yearsToRetirement: 'yr',
  expectedReturnPct: 'er',
};

function toNum(v: string, fallback = 0): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : fallback;
}

export function MegaBackdoorCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'taxYear') {
        const n = Number(raw);
        return (n === 2024 || n === 2025 || n === 2026 ? n : defaultValue) as FormState[typeof key];
      }
      if (key === 'planAllowsAfterTax' || key === 'planAllowsConversion') {
        return (raw === '1' || raw === 'true') as unknown as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });

  const result: MegaBackdoorResult | { error: string } = useMemo(() => {
    try {
      const input: MegaBackdoorInput = {
        taxYear: form.taxYear,
        age: toNum(form.age, 30),
        employeeElectiveDeferral: toNum(form.electiveDeferralUsd),
        employerMatch: toNum(form.employerMatchUsd),
        employerProfitSharing: toNum(form.employerProfitSharingUsd),
        planAllowsAfterTax: form.planAllowsAfterTax,
        planAllowsConversion: form.planAllowsConversion,
        yearsToRetirement: toNum(form.yearsToRetirement, 20),
        expectedReturnRate: toNum(form.expectedReturnPct, 7) / 100,
      };
      return calculateMegaBackdoor(input);
    } catch (e) {
      return { error: e instanceof Error ? e.message : 'Calculation error' };
    }
  }, [form]);

  if ('error' in result) {
    return (
      <div className="rounded-lg border border-red-500/40 bg-red-900/20 p-5 text-red-200">
        <p className="font-bold">Couldn't calculate.</p>
        <p className="text-sm">{result.error}</p>
      </div>
    );
  }

  const blocked = result.blockedReason !== null;
  const blockedCopy: Record<string, string> = {
    'plan-no-after-tax':
      'Your plan does not allow after-tax contributions — Mega-Backdoor is not available. Talk to HR; some plans offer it but require an opt-in.',
    'plan-no-conversion':
      'Your plan allows after-tax contributions but not in-service distribution or in-plan Roth conversion. The Mega-Backdoor requires one of those mechanisms.',
    'no-room':
      'Your elective deferral + employer match + profit-sharing already fills the §415 ceiling. No after-tax room remains.',
  };

  return (
    <div className="space-y-6">
      {/* Form */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 sm:p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Field label="Tax year">
            <select
              value={form.taxYear}
              onChange={(e) => setForm({ taxYear: Number(e.target.value) as TaxYear })}
              className={selectClass}
            >
              <option value={2024}>2024</option>
              <option value={2025}>2025</option>
              <option value={2026}>2026</option>
            </select>
          </Field>
          <Field label="Your age">
            <input
              type="number"
              value={form.age}
              onChange={(e) => setForm({ age: e.target.value })}
              className={inputClass}
              min={18}
              max={80}
            />
          </Field>
          <Field
            label="YTD elective deferral (pre-tax + Roth 401(k))"
            hint={`§402(g) cap: ${usd.format(result.electiveLimit)} for your age in ${form.taxYear}`}
          >
            <input
              type="number"
              value={form.electiveDeferralUsd}
              onChange={(e) => setForm({ electiveDeferralUsd: e.target.value })}
              className={inputClass}
              min={0}
            />
          </Field>
          <Field label="Annual employer match ($)">
            <input
              type="number"
              value={form.employerMatchUsd}
              onChange={(e) => setForm({ employerMatchUsd: e.target.value })}
              className={inputClass}
              min={0}
            />
          </Field>
          <Field
            label="Employer profit-sharing ($)"
            hint="Only if your plan has it. Otherwise 0."
          >
            <input
              type="number"
              value={form.employerProfitSharingUsd}
              onChange={(e) => setForm({ employerProfitSharingUsd: e.target.value })}
              className={inputClass}
              min={0}
            />
          </Field>
          <Field label="Years until retirement (for projection)">
            <input
              type="number"
              value={form.yearsToRetirement}
              onChange={(e) => setForm({ yearsToRetirement: e.target.value })}
              className={inputClass}
              min={0}
              max={50}
            />
          </Field>
          <Field label="Expected annual return %" hint="Default 7% — historical S&P 500 real return.">
            <input
              type="number"
              value={form.expectedReturnPct}
              onChange={(e) => setForm({ expectedReturnPct: e.target.value })}
              className={inputClass}
              step="0.1"
              min={-10}
              max={20}
            />
          </Field>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/40 p-3">
            <input
              type="checkbox"
              checked={form.planAllowsAfterTax}
              onChange={(e) => setForm({ planAllowsAfterTax: e.target.checked })}
              className="mt-1 h-4 w-4 accent-brand-500"
            />
            <span className="text-sm">
              <span className="font-bold text-slate-100">My plan allows after-tax contributions</span>
              <span className="block text-xs text-slate-400">
                Distinct from pre-tax and Roth 401(k). Check your SPD or 401(k) portal.
              </span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-lg border border-slate-700 bg-slate-950/40 p-3">
            <input
              type="checkbox"
              checked={form.planAllowsConversion}
              onChange={(e) => setForm({ planAllowsConversion: e.target.checked })}
              className="mt-1 h-4 w-4 accent-brand-500"
            />
            <span className="text-sm">
              <span className="font-bold text-slate-100">
                My plan allows in-service distribution OR in-plan Roth conversion
              </span>
              <span className="block text-xs text-slate-400">
                IRR / "Roth in-plan rollover" — without this, the after-tax money stays tax-deferred.
              </span>
            </span>
          </label>
        </div>
      </div>

      {/* Result */}
      {blocked ? (
        <div className="rounded-xl border border-amber-500/40 bg-amber-900/20 p-6">
          <p className="text-sm font-bold uppercase tracking-wide text-amber-300">
            Mega-Backdoor blocked
          </p>
          <p className="mt-2 text-base text-amber-100">
            {blockedCopy[result.blockedReason!] ?? 'Plan does not support the Mega-Backdoor flow.'}
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3 text-sm text-amber-200/80">
            <div>
              <p className="text-xs uppercase tracking-wide text-amber-300/80">§415 cap</p>
              <p className="font-mono text-lg text-amber-100">
                {usd.format(result.section415Limit)}
              </p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-wide text-amber-300/80">Already used</p>
              <p className="font-mono text-lg text-amber-100">{usd.format(result.spaceUsed)}</p>
            </div>
          </div>
        </div>
      ) : (
        <>
          {/* Big number result */}
          <div className="overflow-hidden rounded-xl border border-brand-500/30 bg-gradient-to-br from-brand-950 via-slate-900 to-slate-950 p-6">
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-brand-300">
              Mega-Backdoor Roth room — {form.taxYear}
            </p>
            <p className="mt-2 text-5xl font-bold tracking-tight text-white sm:text-6xl">
              {usd.format(result.megaBackdoorAmount)}
            </p>
            <p className="mt-2 text-sm text-slate-400">
              of additional Roth space available in your plan this year
            </p>

            <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
              <Stat
                label="§415 overall cap"
                value={usd.format(result.section415Limit)}
                hint="IRC §415(c)"
              />
              <Stat
                label="Already used"
                value={usd.format(result.spaceUsed)}
                hint="Elective + match + profit-sharing"
              />
              <Stat
                label="Elective deferral cap"
                value={usd.format(result.electiveLimit)}
                hint="IRC §402(g)"
              />
            </div>
          </div>

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
              <p className="mt-2 text-xs text-emerald-300">
                Compounds on {usd.format(result.megaBackdoorAmount * (toNum(form.yearsToRetirement, 25)))}{' '}
                of contributions
              </p>
            </div>
          </div>
        </>
      )}

      <ShareCalculation />
      <GumroadUpsell shortfallUsd={result.megaBackdoorAmount} />
      <EmailCapture source="mega-backdoor-roth" shortfallUsd={result.megaBackdoorAmount} />
    </div>
  );
}

const labelClass = 'text-sm font-bold text-slate-200';
const hintClass = 'text-xs text-slate-500';
const inputClass =
  'mt-1 block w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-slate-100 placeholder:text-slate-600 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500';
const selectClass = inputClass;

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
