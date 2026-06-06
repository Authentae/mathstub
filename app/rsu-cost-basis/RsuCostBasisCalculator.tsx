'use client';
import { useMemo } from 'react';
import {
  calculateRsuCostBasis,
  type RsuCostBasisResult,
  type HoldingPeriod,
} from '@tax/rsu-cost-basis';
import { type FilingStatus, type TaxYear, TaxCalcError } from '@tax/types';
import { useUrlFormState } from '@/lib/useUrlFormState';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { ShareCalculation } from '@/components/ShareCalculation';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

const usd2 = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 2,
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
  sharesSold: string;
  fmvAtVestPerShare: string;
  salePricePerShare: string;
  brokerReportedBasisPerShare: string;
  holdingPeriod: HoldingPeriod;
  filingStatus: FilingStatus;
  taxYear: TaxYear;
  taxableIncomeUsd: string;
  stateRatePct: string;
};

const DEFAULTS: FormState = {
  sharesSold: '100',
  fmvAtVestPerShare: '50',
  salePricePerShare: '60',
  brokerReportedBasisPerShare: '0',
  holdingPeriod: 'long',
  filingStatus: 'single',
  taxYear: 2026,
  taxableIncomeUsd: '300000',
  stateRatePct: '0',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  sharesSold: 'sh',
  fmvAtVestPerShare: 'fmv',
  salePricePerShare: 'sp',
  brokerReportedBasisPerShare: 'bb',
  holdingPeriod: 'hp',
  filingStatus: 'fs',
  taxYear: 'y',
  taxableIncomeUsd: 'inc',
  stateRatePct: 'sr',
};

export function RsuCostBasisCalculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'taxYear') {
        const n = Number(raw);
        return (n === 2024 || n === 2025 || n === 2026
          ? n
          : defaultValue) as FormState[typeof key];
      }
      if (key === 'filingStatus') {
        return (raw === 'single' || raw === 'mfj' || raw === 'mfs' || raw === 'hoh'
          ? raw
          : defaultValue) as FormState[typeof key];
      }
      if (key === 'holdingPeriod') {
        return (raw === 'long' || raw === 'short'
          ? raw
          : defaultValue) as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });

  const result = useMemo<
    { ok: true; data: RsuCostBasisResult } | { ok: false; error: string }
  >(() => {
    try {
      const parsed = {
        sharesSold: Number(form.sharesSold),
        fmvAtVestPerShare: Number(form.fmvAtVestPerShare),
        salePricePerShare: Number(form.salePricePerShare),
        brokerReportedBasisPerShare: Number(form.brokerReportedBasisPerShare),
        holdingPeriod: form.holdingPeriod,
        filingStatus: form.filingStatus,
        taxYear: form.taxYear,
        taxableIncomeUsd: Number(form.taxableIncomeUsd),
        stateCapGainsRate: Number(form.stateRatePct) / 100,
      };
      return { ok: true, data: calculateRsuCostBasis(parsed) };
    } catch (e) {
      if (e instanceof TaxCalcError) return { ok: false, error: e.message };
      return { ok: false, error: 'Could not calculate. Check your inputs.' };
    }
  }, [form]);

  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Shares sold">
          <input
            type="number"
            inputMode="decimal"
            value={form.sharesSold}
            onChange={(e) => setForm({ sharesSold: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
        <Field label="FMV per share at vest (your real basis)">
          <input
            type="number"
            inputMode="decimal"
            value={form.fmvAtVestPerShare}
            onChange={(e) => setForm({ fmvAtVestPerShare: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
        <Field label="Sale price per share">
          <input
            type="number"
            inputMode="decimal"
            value={form.salePricePerShare}
            onChange={(e) => setForm({ salePricePerShare: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
        <Field label="Cost basis your broker reported (Box 1e — often $0)">
          <input
            type="number"
            inputMode="decimal"
            value={form.brokerReportedBasisPerShare}
            onChange={(e) =>
              setForm({ brokerReportedBasisPerShare: e.target.value })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
        <Field label="Holding period">
          <select
            value={form.holdingPeriod}
            onChange={(e) =>
              setForm({ holdingPeriod: e.target.value as HoldingPeriod })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value="long">Long-term (held &gt; 1 year after vest)</option>
            <option value="short">Short-term (held 1 year or less)</option>
          </select>
        </Field>
        <Field label="Filing status">
          <select
            value={form.filingStatus}
            onChange={(e) =>
              setForm({ filingStatus: e.target.value as FilingStatus })
            }
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            {Object.entries(FILING_LABELS).map(([v, l]) => (
              <option key={v} value={v}>
                {l}
              </option>
            ))}
          </select>
        </Field>
        <Field label="Your taxable income">
          <input
            type="number"
            inputMode="decimal"
            value={form.taxableIncomeUsd}
            onChange={(e) => setForm({ taxableIncomeUsd: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
        <Field label="Tax year">
          <select
            value={form.taxYear}
            onChange={(e) => setForm({ taxYear: Number(e.target.value) as TaxYear })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          >
            <option value={2024}>2024</option>
            <option value={2025}>2025</option>
            <option value={2026}>2026</option>
          </select>
        </Field>
        <Field label="State capital-gains rate %">
          <input
            type="number"
            inputMode="decimal"
            value={form.stateRatePct}
            onChange={(e) => setForm({ stateRatePct: e.target.value })}
            className="w-full rounded-md border border-gray-300 px-3 py-2 dark:border-gray-700 dark:bg-gray-900"
          />
        </Field>
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

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-medium text-slate-300">
        {label}
      </span>
      {children}
    </label>
  );
}

function ResultPanel({ r }: { r: RsuCostBasisResult }) {
  if (!r.isLikelyDoubleTaxed) {
    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-900 dark:border-emerald-800 dark:bg-emerald-950 dark:text-emerald-100">
          <p className="font-semibold">Good news — no double-tax to fix here.</p>
          <p className="mt-1">
            The basis your broker reported ({usd.format(r.brokerReportedBasisUsd)})
            already matches or exceeds your correct basis (
            {usd.format(r.correctCostBasisUsd)}). Report your true gain of{' '}
            {usd.format(r.correctGainUsd)} as normal.
          </p>
        </div>
        <ShareCalculation />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid gap-3 sm:grid-cols-3">
        <Stat label="Your correct cost basis" value={usd.format(r.correctCostBasisUsd)} />
        <Stat label="Your true capital gain" value={usd.format(r.correctGainUsd)} />
        <Stat
          label="Tax you would overpay without the fix"
          value={usd.format(r.totalOverpaidUsd)}
          highlight
        />
      </div>

      <div className="rounded-lg border border-gray-200 p-4 text-sm dark:border-gray-800">
        <p className="font-semibold">What is going wrong</p>
        <p className="mt-1 text-slate-300">
          Your broker reported a {usd.format(r.brokerReportedBasisUsd)} basis, so
          you would report a {usd.format(r.reportedGainUsd)} gain. Your real gain
          is only {usd.format(r.correctGainUsd)} — the extra{' '}
          {usd.format(r.basisAdjustmentUsd)} was already taxed as wages on your
          W-2 at vest. Taxed again at {pct.format(r.capGainsRate)} (plus NIIT and
          state), that is the overpayment above.
        </p>
      </div>

      <div className="rounded-lg border border-brand-500/40 bg-brand-50 p-4 text-sm dark:bg-brand-950/40">
        <p className="font-semibold">The Form 8949 fix</p>
        <ul className="mt-2 space-y-1 font-mono text-xs text-slate-300">
          <li>Column (d) Proceeds: {usd2.format(r.proceedsUsd)}</li>
          <li>Column (e) Cost basis (as on 1099-B): {usd2.format(r.brokerReportedBasisUsd)}</li>
          <li>Column (f) Code: B</li>
          <li>Column (g) Adjustment: -{usd2.format(r.basisAdjustmentUsd)}</li>
          <li>Column (h) Gain (result): {usd2.format(r.correctGainUsd)}</li>
        </ul>
      </div>

      <GumroadUpsell shortfallUsd={r.totalOverpaidUsd} preferredProduct="equity-tracker" />
      <ShareCalculation />
    </div>
  );
}

function Stat({
  label,
  value,
  highlight,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div
      className={`rounded-lg border p-4 ${
        highlight
          ? 'border-brand-500 bg-brand-50 dark:bg-brand-950'
          : 'border-gray-200 dark:border-gray-800'
      }`}
    >
      <span className="block text-xs uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <span className="mt-1 block text-2xl font-bold">{value}</span>
    </div>
  );
}
