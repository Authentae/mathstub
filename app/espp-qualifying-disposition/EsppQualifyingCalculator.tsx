'use client';
import { useMemo } from 'react';
import { calculateEsppQualifying } from '@tax/espp';
import {
  type EsppQualifyingInput,
  type EsppQualifyingResult,
  type FilingStatus,
  type TaxYear,
  TaxCalcError,
} from '@tax/types';
import { listStateCodes } from '@tax/state-rates';
import { offersForShortfall } from '@/lib/affiliates';
import { AffiliateCard } from '@/components/AffiliateCard';
import { GumroadUpsell } from '@/components/GumroadUpsell';
import { ShareCalculation } from '@/components/ShareCalculation';
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
  taxYear: TaxYear;
  filingStatus: FilingStatus;
  offerDateFmvUsd: string;
  purchaseDateFmvUsd: string;
  discountPct: string;
  sharesPurchased: string;
  salePricePerShareUsd: string;
  offerDate: string;
  purchaseDate: string;
  saleDate: string;
  ytdRegularWagesUsd: string;
  otherTaxableIncomeUsd: string;
  preTaxDeductionsUsd: string;
  stateCode: string;
  stateOverrideRatePct: string;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'single',
  offerDateFmvUsd: '100',
  purchaseDateFmvUsd: '120',
  discountPct: '15',
  sharesPurchased: '500',
  salePricePerShareUsd: '180',
  offerDate: '2023-01-01',
  purchaseDate: '2023-06-30',
  saleDate: '2026-07-01',
  ytdRegularWagesUsd: '200000',
  otherTaxableIncomeUsd: '0',
  preTaxDeductionsUsd: '23500',
  stateCode: 'CA',
  stateOverrideRatePct: '',
};

function toNumberOrZero(v: string): number {
  const n = Number(v);
  return Number.isFinite(n) && n >= 0 ? n : 0;
}

const URL_KEYS: { [K in keyof FormState]: string } = {
  taxYear: 'y',
  filingStatus: 'fs',
  offerDateFmvUsd: 'of',
  purchaseDateFmvUsd: 'pf',
  discountPct: 'd',
  sharesPurchased: 'sh',
  salePricePerShareUsd: 'sp',
  offerDate: 'od',
  purchaseDate: 'pd',
  saleDate: 'sd',
  ytdRegularWagesUsd: 'rw',
  otherTaxableIncomeUsd: 'oi',
  preTaxDeductionsUsd: 'pt',
  stateCode: 'st',
  stateOverrideRatePct: 'sr',
};

export function EsppQualifyingCalculator() {
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
  const states = useMemo(() => listStateCodes(), []);

  const result: EsppQualifyingResult | { error: string } = useMemo(() => {
    try {
      const input: EsppQualifyingInput = {
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        offerDateFmvUsd: toNumberOrZero(form.offerDateFmvUsd),
        purchaseDateFmvUsd: toNumberOrZero(form.purchaseDateFmvUsd),
        discountPct: toNumberOrZero(form.discountPct),
        sharesPurchased: toNumberOrZero(form.sharesPurchased),
        salePricePerShareUsd: toNumberOrZero(form.salePricePerShareUsd),
        offerDate: form.offerDate,
        purchaseDate: form.purchaseDate,
        saleDate: form.saleDate,
        ytdRegularWagesUsd: toNumberOrZero(form.ytdRegularWagesUsd),
        otherTaxableIncomeUsd: toNumberOrZero(form.otherTaxableIncomeUsd),
        preTaxDeductionsUsd: toNumberOrZero(form.preTaxDeductionsUsd),
        stateCode: form.stateCode,
        stateOverrideRatePct: form.stateOverrideRatePct
          ? Number(form.stateOverrideRatePct)
          : undefined,
      };
      return calculateEsppQualifying(input);
    } catch (e) {
      return { error: e instanceof TaxCalcError ? e.message : 'Invalid input' };
    }
  }, [form]);

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setForm({ [key]: value } as Partial<FormState>);
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

        <Field label="Offer-date FMV ($/share)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.offerDateFmvUsd}
            onChange={(e) => update('offerDateFmvUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Purchase-date FMV ($/share)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.purchaseDateFmvUsd}
            onChange={(e) => update('purchaseDateFmvUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Plan discount (%)">
          <input
            type="number"
            min="0"
            max="50"
            step="0.1"
            value={form.discountPct}
            onChange={(e) => update('discountPct', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Shares purchased">
          <input
            type="number"
            min="0"
            value={form.sharesPurchased}
            onChange={(e) => update('sharesPurchased', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Sale price ($/share)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.salePricePerShareUsd}
            onChange={(e) => update('salePricePerShareUsd', e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="Offer date (YYYY-MM-DD)">
          <input
            type="date"
            value={form.offerDate}
            onChange={(e) => update('offerDate', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Purchase date">
          <input
            type="date"
            value={form.purchaseDate}
            onChange={(e) => update('purchaseDate', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Sale date">
          <input
            type="date"
            value={form.saleDate}
            onChange={(e) => update('saleDate', e.target.value)}
            className={inputCls}
          />
        </Field>

        <Field label="State">
          <select
            value={form.stateCode}
            onChange={(e) => update('stateCode', e.target.value)}
            className={inputCls}
          >
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </Field>
        <Field label="YTD regular W-2 wages">
          <input
            type="number"
            min="0"
            value={form.ytdRegularWagesUsd}
            onChange={(e) => update('ytdRegularWagesUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Other taxable income (spouse W-2, dividends)">
          <input
            type="number"
            min="0"
            value={form.otherTaxableIncomeUsd}
            onChange={(e) => update('otherTaxableIncomeUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="YTD pre-tax deductions (401k + HSA)">
          <input
            type="number"
            min="0"
            value={form.preTaxDeductionsUsd}
            onChange={(e) => update('preTaxDeductionsUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="State rate override (%) — optional">
          <input
            type="number"
            min="0"
            max="100"
            step="0.1"
            placeholder="leave blank to use default"
            value={form.stateOverrideRatePct}
            onChange={(e) => update('stateOverrideRatePct', e.target.value)}
            className={inputCls}
          />
        </Field>
      </form>

      {'error' in result ? (
        <div className="rounded-md border-l-4 border-amber-500 bg-amber-50 p-4 text-sm text-amber-900">
          {result.error}
        </div>
      ) : (
        <Result result={result} />
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

function Result({ result }: { result: EsppQualifyingResult }) {
  const r = result;
  const offers = offersForShortfall(Math.max(0, r.totalTaxUsd));

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${
          r.isQualifying
            ? 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
            : 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          {r.isQualifying ? 'Qualifying disposition' : 'NOT qualifying yet'} —{' '}
          {r.monthsFromOffer} mo from offer, {r.monthsFromPurchase} mo from purchase
        </p>
        <p
          className={`mt-1 text-4xl font-bold ${
            r.isQualifying
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-amber-700 dark:text-amber-300'
          }`}
        >
          {usd.format(r.totalTaxUsd)} total tax
        </p>
        {!r.isQualifying && (
          <p className="mt-2 text-sm text-amber-900 dark:text-amber-200">
            ⚠ This sale fails the holding-period test (≥2 years from offer AND ≥1 year from
            purchase). The numbers below still show the qualifying-treatment math for reference —
            see the disqualifying comparison below to estimate your real tax bill.
          </p>
        )}
        {r.isQualifying && r.qualifyingSavingsVsDisqualifyingUsd > 0 && (
          <p className="mt-2 text-sm text-emerald-900 dark:text-emerald-200">
            ✓ Qualifying treatment saves you{' '}
            <strong>{usd.format(r.qualifyingSavingsVsDisqualifyingUsd)}</strong> vs. selling as a
            disqualifying disposition.
          </p>
        )}
      </div>

      <div className="grid gap-3 rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
        <Stat label="Ordinary income" value={usd.format(r.totalOrdinaryIncomeUsd)} />
        <Stat
          label={r.totalCapitalGainUsd >= 0 ? 'Long-term capital gain' : 'Long-term capital loss'}
          value={usd.format(r.totalCapitalGainUsd)}
        />
        <Stat label="Net proceeds after tax" value={usd.format(r.netProceedsAfterTaxUsd)} />
      </div>

      <ShareCalculation what="this ESPP disposition calculation" />

      {r.totalTaxUsd > 0 && <GumroadUpsell shortfallUsd={r.totalTaxUsd} />}

      <details className="rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
        <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
          Show the math
        </summary>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <Row k="Purchase price / share" v={usdCents.format(r.purchasePricePerShareUsd)} />
          <Row k="Ordinary income / share" v={usdCents.format(r.ordinaryIncomePerShareUsd)} />
          <Row k="Capital gain / share" v={usdCents.format(r.capitalGainPerShareUsd)} />
          <Row k="Gross sale proceeds" v={usd.format(r.totalSharesProceedsUsd)} />
          <Row k="Marginal federal rate (ordinary)" v={`${r.marginalFederalRatePct.toFixed(1)}%`} />
          <Row k="Federal LTCG rate" v={`${r.marginalLtcgRatePct.toFixed(1)}%`} />
          <Row k="Marginal state rate" v={`${r.marginalStateRatePct.toFixed(2)}%`} />
          <Row k="Federal tax on ordinary" v={usd.format(r.federalOrdinaryTaxUsd)} />
          <Row k="Federal LTCG tax" v={usd.format(r.federalLtcgTaxUsd)} />
          <Row k="NIIT (3.8%)" v={usd.format(r.niitUsd)} />
          <Row k="State tax" v={usd.format(r.stateTaxUsd)} />
          <Row k="Total tax" v={usd.format(r.totalTaxUsd)} />
          <Row
            k="Disqualifying-disposition tax (comparison)"
            v={usd.format(r.disqualifyingComparisonTaxUsd)}
          />
        </div>
      </details>

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
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-gray-500">{label}</p>
      <p className="text-xl font-bold text-brand-700 dark:text-brand-100">{value}</p>
    </div>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between border-b border-dashed border-gray-200 py-1 dark:border-gray-800">
      <span className="text-gray-600 dark:text-gray-400">{k}</span>
      <span className="font-medium text-gray-900 dark:text-gray-100">{v}</span>
    </div>
  );
}
