'use client';
import { useMemo } from 'react';
import { calculateForm6251, type Form6251Result } from '@tax/form-6251';
import { TaxCalcError, type FilingStatus, type TaxYear } from '@tax/types';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { useUrlFormState } from '@/lib/useUrlFormState';

const usd = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  maximumFractionDigits: 0,
});

type FormState = {
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  w2WagesUsd: string;
  selfEmploymentNetUsd: string;
  isoBargainElementUsd: string;
  deductionType: 'standard' | 'itemized';
  itemizedDeductionsUsd: string;
  saltDeductionUsd: string;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'mfj',
  w2WagesUsd: '400000',
  selfEmploymentNetUsd: '0',
  isoBargainElementUsd: '100000',
  deductionType: 'itemized',
  itemizedDeductionsUsd: '30000',
  saltDeductionUsd: '10000',
};

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  filingStatus: 'fs',
  w2WagesUsd: 'w',
  selfEmploymentNetUsd: 'se',
  isoBargainElementUsd: 'iso',
  deductionType: 'd',
  itemizedDeductionsUsd: 'id',
  saltDeductionUsd: 'salt',
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

export function Form6251Calculator() {
  const [form, setForm] = useUrlFormState<FormState>({
    defaults: DEFAULTS,
    urlKeys: URL_KEYS,
    parseValue: (key, raw, defaultValue) => {
      if (key === 'taxYear') {
        const n = Number(raw);
        return ([2024, 2025, 2026].includes(n) ? n : defaultValue) as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });

  const result = useMemo<{ ok: true; data: Form6251Result } | { ok: false; error: string }>(() => {
    try {
      const data = calculateForm6251({
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        w2WagesUsd: toNumberOrZero(form.w2WagesUsd),
        selfEmploymentNetUsd: toNumberOrZero(form.selfEmploymentNetUsd),
        isoBargainElementUsd: toNumberOrZero(form.isoBargainElementUsd),
        deductionType: form.deductionType,
        itemizedDeductionsUsd: toNumberOrZero(form.itemizedDeductionsUsd),
        saltDeductionUsd: toNumberOrZero(form.saltDeductionUsd),
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
          1. Filing setup
        </legend>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Tax year">
            <select
              value={form.taxYear}
              onChange={(e) => setForm({ taxYear: Number(e.target.value) as TaxYear })}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
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
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
            >
              <option value="single">Single</option>
              <option value="mfj">Married filing jointly</option>
              <option value="mfs">Married filing separately</option>
              <option value="hoh">Head of household</option>
            </select>
          </Field>
        </div>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          2. Income sources
        </legend>
        <Field label="W-2 wages (Box 1 — includes vested RSU + bonus)" hint="The number on your most recent W-2 Box 1 if December — or sum YTD + projected remaining if you're modeling pre-year-end.">
          <input type="number" inputMode="numeric" min={0} value={form.w2WagesUsd}
            onChange={(e) => setForm({ w2WagesUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
        </Field>
        <Field label="1099 self-employment net income" hint="Schedule C net profit. 0 if no side business.">
          <input type="number" inputMode="numeric" min={0} value={form.selfEmploymentNetUsd}
            onChange={(e) => setForm({ selfEmploymentNetUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
        </Field>
        <Field label="ISO bargain element (held past year-end)" hint="(FMV at exercise − strike) × shares for ISOs exercised AND held past December 31. Set to 0 for same-year disqualifying dispositions (those flow into W-2 instead).">
          <input type="number" inputMode="numeric" min={0} value={form.isoBargainElementUsd}
            onChange={(e) => setForm({ isoBargainElementUsd: e.target.value })}
            className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
        </Field>
      </fieldset>

      <fieldset className="space-y-4 rounded-lg border border-slate-800 bg-slate-900 p-5">
        <legend className="px-2 text-sm font-bold uppercase tracking-wide text-brand-700 dark:text-brand-300">
          3. Deductions
        </legend>
        <Field label="Deduction type">
          <div className="flex gap-4 text-sm">
            <label className="flex items-center gap-2">
              <input type="radio" name="deductionType" value="standard"
                checked={form.deductionType === 'standard'}
                onChange={() => setForm({ deductionType: 'standard' })} />
              Standard deduction
            </label>
            <label className="flex items-center gap-2">
              <input type="radio" name="deductionType" value="itemized"
                checked={form.deductionType === 'itemized'}
                onChange={() => setForm({ deductionType: 'itemized' })} />
              Itemized (Schedule A)
            </label>
          </div>
        </Field>
        {form.deductionType === 'itemized' && (
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Total itemized deductions" hint="Schedule A total (mortgage interest + SALT + charitable + medical, etc.).">
              <input type="number" inputMode="numeric" min={0} value={form.itemizedDeductionsUsd}
                onChange={(e) => setForm({ itemizedDeductionsUsd: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
            </Field>
            <Field label="SALT portion (capped at $10k / $5k MFS)" hint="State + local + property tax deduction taken. Added back as AMT preference on Form 6251 line 2a.">
              <input type="number" inputMode="numeric" min={0} max={10000} value={form.saltDeductionUsd}
                onChange={(e) => setForm({ saltDeductionUsd: e.target.value })}
                className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-base text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100" />
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
        <ResultPanel r={result.data} />
      )}

      {result.ok && result.data.amtOwedUsd > 0 && (
        <GumroadUpsell shortfallUsd={result.data.amtOwedUsd} />
      )}
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="block text-sm font-semibold text-slate-100">{label}</span>
      {hint && <span className="block text-xs text-slate-400">{hint}</span>}
      {children}
    </label>
  );
}

function ResultPanel({ r }: { r: Form6251Result }) {
  return (
    <div className="space-y-5 rounded-lg border border-brand-500/40 bg-brand-50 p-6 dark:border-brand-500/30 dark:bg-brand-950/30">
      <div>
        <p className="text-sm font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
          {r.amtApplies ? 'AMT APPLIES' : 'AMT does not apply'}
        </p>
        <p className={`mt-1 text-4xl font-bold tracking-tight ${r.amtApplies ? 'text-orange-700 dark:text-orange-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
          {usd.format(r.amtOwedUsd)}
        </p>
        <p className="mt-2 text-sm text-slate-300">
          {r.amtApplies
            ? `Owed in addition to regular tax. TMT ${usd.format(r.tentativeMinimumTaxUsd)} exceeded regular tax ${usd.format(r.regularTaxUsd)} by this amount.`
            : `Regular tax ${usd.format(r.regularTaxUsd)} >= TMT ${usd.format(r.tentativeMinimumTaxUsd)} so no AMT.`}
        </p>
      </div>

      <div className="rounded-md border border-brand-500/30 bg-white p-4 text-sm dark:border-brand-500/20 dark:bg-slate-900/40">
        <p className="mb-3 text-xs font-mono uppercase tracking-wide text-brand-700 dark:text-brand-300">
          Form 6251 line-by-line
        </p>
        <Row label="Line 1 — Taxable income (regular)" value={r.amtiBeforeAdjustmentsUsd} />
        <Row label="Line 2a — SALT add-back" value={r.saltAddBackUsd} />
        <Row label="Line 2i — ISO bargain element" value={r.isoAdjustmentUsd} />
        <Row label="Line 2 other adjustments" value={r.otherAdjustmentsUsd} />
        <Row label="Line 4 — AMTI" value={r.amtiUsd} bold />
        <Row label="Line 5 — AMT exemption (post-phaseout)" value={-r.amtExemptionUsd} />
        <Row label="Line 6 — AMT taxable income" value={r.amtTaxableIncomeUsd} />
        <Row label="Line 7 — Tentative Minimum Tax (TMT)" value={r.tentativeMinimumTaxUsd} bold />
        <Row label="Less: regular tax" value={-r.regularTaxUsd} />
        <Row label="Line 9 — AMT owed" value={r.amtOwedUsd} bold highlight={r.amtApplies} />
      </div>

      {r.amtApplies && r.recoverableCreditEstimateUsd > 0 && (
        <div className="rounded-md border border-emerald-500/30 bg-emerald-500/5 p-4 text-sm">
          <p className="font-bold text-emerald-700 dark:text-emerald-300">
            Estimated recoverable AMT credit: {usd.format(r.recoverableCreditEstimateUsd)}
          </p>
          <p className="mt-1 text-xs text-slate-400">
            Per IRC §53, AMT attributable to deferral items (mainly ISO bargain element) is recoverable as Form 8801 credit in future years when regular tax exceeds TMT. Run the{' '}
            <a href="/amt-credit-recovery" className="font-semibold underline">AMT Credit Recovery scheduler</a> for a year-by-year projection.
          </p>
        </div>
      )}
    </div>
  );
}

function Row({ label, value, bold, highlight }: { label: string; value: number; bold?: boolean; highlight?: boolean }) {
  const cls = [
    'flex justify-between py-1.5 text-sm',
    bold ? 'font-bold text-slate-100' : 'text-slate-300',
    highlight ? 'rounded bg-orange-100 px-2 dark:bg-orange-900/30' : '',
  ].filter(Boolean).join(' ');
  return (
    <div className={cls}>
      <span>{label}</span>
      <span className="font-mono">{usd.format(value)}</span>
    </div>
  );
}
