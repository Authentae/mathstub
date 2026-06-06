'use client';
import { useMemo, useState } from 'react';
import { calculateCa540Nr, type Ca540NrResult, type CaVestInput } from '@tax/ca-540nr';
import { TaxCalcError } from '@tax/types';
import { GumroadUpsell } from '@/components/GumroadUpsell';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});
const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 1,
});

type VestRow = {
  label: string;
  vestingPeriodMonths: string;
  monthsInCalifornia: string;
  fmvAtVestUsd: string;
};

const DEFAULT_VESTS: VestRow[] = [
  { label: 'Aug 2024', vestingPeriodMonths: '24', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Nov 2024', vestingPeriodMonths: '27', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Feb 2025', vestingPeriodMonths: '30', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'May 2025', vestingPeriodMonths: '33', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Aug 2025', vestingPeriodMonths: '36', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Nov 2025', vestingPeriodMonths: '39', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Feb 2026', vestingPeriodMonths: '42', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'May 2026', vestingPeriodMonths: '45', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
  { label: 'Aug 2026', vestingPeriodMonths: '48', monthsInCalifornia: '24', fmvAtVestUsd: '20000' },
];

function toNumOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function Ca540NrCalculator() {
  const [vests, setVests] = useState<VestRow[]>(DEFAULT_VESTS);
  const [priorYearCaTax, setPriorYearCaTax] = useState('');
  const [priorYearCaAgi, setPriorYearCaAgi] = useState('');

  const result = useMemo<{ ok: true; data: Ca540NrResult } | { ok: false; error: string }>(() => {
    try {
      const inputVests: CaVestInput[] = vests
        .filter((v) => v.label.trim() !== '')
        .map((v) => ({
          label: v.label,
          vestingPeriodMonths: toNumOrZero(v.vestingPeriodMonths),
          monthsInCalifornia: toNumOrZero(v.monthsInCalifornia),
          fmvAtVestUsd: toNumOrZero(v.fmvAtVestUsd),
        }));
      if (inputVests.length === 0) {
        return { ok: false, error: 'Add at least one vest row.' };
      }
      const data = calculateCa540Nr({
        vests: inputVests,
        ...(priorYearCaTax ? { priorYearCaTaxUsd: toNumOrZero(priorYearCaTax) } : {}),
        ...(priorYearCaAgi ? { priorYearCaAgiUsd: toNumOrZero(priorYearCaAgi) } : {}),
      });
      return { ok: true, data };
    } catch (e) {
      return { ok: false, error: e instanceof TaxCalcError ? e.message : 'Calculation error' };
    }
  }, [vests, priorYearCaTax, priorYearCaAgi]);

  const updateVest = (idx: number, key: keyof VestRow, value: string) => {
    setVests((current) => current.map((v, i) => (i === idx ? { ...v, [key]: value } : v)));
  };
  const addVest = () => {
    setVests((c) => [...c, { label: '', vestingPeriodMonths: '36', monthsInCalifornia: '24', fmvAtVestUsd: '20000' }]);
  };
  const removeVest = (idx: number) => {
    setVests((c) => c.filter((_, i) => i !== idx));
  };
  const resetToDaniel = () => setVests(DEFAULT_VESTS);

  return (
    <div className="space-y-6">
      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          1. Vest schedule
        </legend>
        <p className="text-xs text-slate-400">
          Each row: a vest event. Vesting-period months = elapsed months from grant to that vest. Months in CA = of those, how many you physically performed services in California.
        </p>
        <div className="space-y-2">
          {vests.map((v, i) => (
            <div key={i} className="grid grid-cols-12 items-center gap-2 rounded-md border border-slate-200 bg-slate-50 p-2 dark:border-slate-800 dark:bg-slate-950">
              <input
                value={v.label}
                placeholder="Aug 2025"
                onChange={(e) => updateVest(i, 'label', e.target.value)}
                className="col-span-3 rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
              />
              <input
                type="number"
                inputMode="numeric"
                min={1}
                value={v.vestingPeriodMonths}
                onChange={(e) => updateVest(i, 'vestingPeriodMonths', e.target.value)}
                className="col-span-2 rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                aria-label="vesting period months"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={v.monthsInCalifornia}
                onChange={(e) => updateVest(i, 'monthsInCalifornia', e.target.value)}
                className="col-span-2 rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                aria-label="months in California"
              />
              <input
                type="number"
                inputMode="numeric"
                min={0}
                value={v.fmvAtVestUsd}
                onChange={(e) => updateVest(i, 'fmvAtVestUsd', e.target.value)}
                className="col-span-3 rounded border border-slate-300 bg-white px-2 py-1 text-sm dark:border-slate-700 dark:bg-slate-900"
                aria-label="FMV at vest USD"
              />
              <button
                type="button"
                onClick={() => removeVest(i)}
                className="col-span-2 rounded border border-red-300 px-2 py-1 text-xs font-semibold text-red-700 hover:bg-red-50 dark:border-red-700 dark:text-red-300 dark:hover:bg-red-950/30"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="grid grid-cols-12 gap-2 text-[10px] font-mono uppercase tracking-wide text-slate-500">
            <span className="col-span-3">Label</span>
            <span className="col-span-2">Vest period mo.</span>
            <span className="col-span-2">Months in CA</span>
            <span className="col-span-3">FMV at vest ($)</span>
            <span className="col-span-2"></span>
          </div>
          <div className="flex gap-2 pt-2">
            <button
              type="button"
              onClick={addVest}
              className="rounded border border-brand-500/40 bg-brand-50 px-3 py-1.5 text-xs font-semibold text-brand-700 hover:bg-brand-100 dark:border-brand-500/30 dark:bg-brand-950/40 dark:text-brand-300"
            >
              + Add vest
            </button>
            <button
              type="button"
              onClick={resetToDaniel}
              className="rounded border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
            >
              Reset to Daniel example
            </button>
          </div>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          2. §19136 safe-harbor inputs (optional)
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="block space-y-1">
            <span className="block text-sm font-semibold text-slate-100">Prior-year CA tax</span>
            <span className="block text-xs text-slate-400">From your last CA 540 or 540NR tax line.</span>
            <input
              type="number" inputMode="numeric" min={0} placeholder="(blank if unknown)"
              value={priorYearCaTax}
              onChange={(e) => setPriorYearCaTax(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
          <label className="block space-y-1">
            <span className="block text-sm font-semibold text-slate-100">Prior-year CA AGI</span>
            <span className="block text-xs text-slate-400">{'>'} $150k triggers 110% factor instead of 100%.</span>
            <input
              type="number" inputMode="numeric" min={0} placeholder="(blank if unknown)"
              value={priorYearCaAgi}
              onChange={(e) => setPriorYearCaAgi(e.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            />
          </label>
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

      {result.ok && result.data.totalCaTaxUsd > 0 && (
        <GumroadUpsell
          shortfallUsd={result.data.totalCaTaxUsd}
          preferredProduct="multi-state-equity-planner"
        />
      )}
    </div>
  );
}

function ResultPanel({ r }: { r: Ca540NrResult }) {
  return (
    <div className="space-y-5 rounded-lg border border-brand-500/40 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-950/30">
      <div>
        <p className="text-sm font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Total CA tax owed across all vests
        </p>
        <p className="mt-1 text-4xl font-bold tracking-tight text-orange-700 dark:text-orange-300">
          {usd.format(r.totalCaTaxUsd)}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          On {usd.format(r.totalCaSourceIncomeUsd)} of CA-source income (Schedule CA(540NR) column E). Effective CA rate: {pct.format(r.effectiveCaRate)}.
        </p>
      </div>

      <div className="overflow-x-auto rounded-md border border-brand-500/30 bg-white p-4 text-sm dark:border-brand-500/20 dark:bg-slate-900/40">
        <table className="w-full text-left text-xs">
          <thead className="text-slate-500">
            <tr className="border-b border-slate-200 dark:border-slate-700">
              <th className="py-2 pr-3">Vest</th>
              <th className="py-2 pr-3">Vest period</th>
              <th className="py-2 pr-3">Mos in CA</th>
              <th className="py-2 pr-3">CA %</th>
              <th className="py-2 pr-3">FMV</th>
              <th className="py-2 pr-3">CA-source</th>
              <th className="py-2 text-right">CA tax</th>
            </tr>
          </thead>
          <tbody className="font-mono">
            {r.vestBreakdown.map((v, i) => (
              <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                <td className="py-1.5 pr-3 font-sans">{v.label}</td>
                <td className="py-1.5 pr-3">{v.vestingPeriodMonths} mo</td>
                <td className="py-1.5 pr-3">{v.monthsInCalifornia}</td>
                <td className="py-1.5 pr-3">{pct.format(v.caAllocationPct)}</td>
                <td className="py-1.5 pr-3">{usd.format(v.fmvAtVestUsd)}</td>
                <td className="py-1.5 pr-3">{usd.format(v.caSourceIncomeUsd)}</td>
                <td className="py-1.5 text-right font-bold text-orange-700 dark:text-orange-300">
                  {usd.format(v.caTaxOwedUsd)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-md border border-amber-500/30 bg-amber-500/5 p-4 text-sm">
          <p className="text-xs font-mono uppercase tracking-wide text-amber-800 dark:text-amber-300">
            §19136 safe-harbor target
          </p>
          <p className="mt-1 text-xl font-bold text-slate-100">
            {usd.format(r.safeHarborThresholdUsd)}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Lower of 90% current-year CA tax or 100%/110% of prior-year. Pay this amount in via withholding + Form 540-ES estimates by Jan 15 to defeat the penalty.
          </p>
        </div>
        <div className="rounded-md border border-orange-500/30 bg-orange-500/5 p-4 text-sm">
          <p className="text-xs font-mono uppercase tracking-wide text-orange-800 dark:text-orange-300">
            Estimated §19136 penalty if no estimates
          </p>
          <p className="mt-1 text-xl font-bold text-slate-100">
            {usd.format(r.estimatedPenaltyUsd)}
          </p>
          <p className="mt-1 text-xs text-slate-300">
            Planning estimate at ~6% annualised × default 120-day shortfall window. Filing Form 540-ES Q3 + Q4 brings this to $0.
          </p>
        </div>
      </div>

      <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
        <p className="font-bold text-emerald-700 dark:text-emerald-300">
          Recommended Q4 540-ES payment: {usd.format(r.recommendedQ4EstimateUsd)}
        </p>
        <p className="mt-1 text-xs text-slate-300">
          File Form 540-ES at <a href="https://www.ftb.ca.gov/forms/" target="_blank" rel="noopener noreferrer" className="font-semibold underline">FTB forms</a>. Submit by Jan 15 of the following year to satisfy §19136 safe harbor.
        </p>
      </div>
    </div>
  );
}
