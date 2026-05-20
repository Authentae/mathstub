'use client';
import { useMemo } from 'react';
import { calculateIsoAmt } from '@tax/iso-amt';
import {
  type FilingStatus,
  type IsoAmtInput,
  type IsoAmtResult,
  type IsoScenario,
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
  scenario: IsoScenario;
  strikePricePerShareUsd: string;
  fmvAtExercisePerShareUsd: string;
  sharesExercised: string;
  salePricePerShareUsd: string;
  ytdRegularWagesUsd: string;
  otherTaxableIncomeUsd: string;
  preTaxDeductionsUsd: string;
  stateCode: string;
  stateOverrideRatePct: string;
};

const DEFAULTS: FormState = {
  taxYear: 2026,
  filingStatus: 'single',
  scenario: 'exercise-and-hold',
  strikePricePerShareUsd: '2',
  fmvAtExercisePerShareUsd: '20',
  sharesExercised: '10000',
  salePricePerShareUsd: '',
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
  scenario: 'sc',
  strikePricePerShareUsd: 'k',
  fmvAtExercisePerShareUsd: 'fv',
  sharesExercised: 'sh',
  salePricePerShareUsd: 'sp',
  ytdRegularWagesUsd: 'rw',
  otherTaxableIncomeUsd: 'oi',
  preTaxDeductionsUsd: 'pd',
  stateCode: 'st',
  stateOverrideRatePct: 'sr',
};

const ISO_SCENARIOS: ReadonlyArray<IsoScenario> = [
  'exercise-and-hold',
  'exercise-and-sell-same-year',
];

export function IsoAmtCalculator() {
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
      if (key === 'scenario') {
        return (ISO_SCENARIOS.includes(raw as IsoScenario)
          ? (raw as IsoScenario)
          : defaultValue) as FormState[typeof key];
      }
      return raw as FormState[typeof key];
    },
  });
  const states = useMemo(() => listStateCodes(), []);

  const result: IsoAmtResult | { error: string } = useMemo(() => {
    try {
      const input: IsoAmtInput = {
        taxYear: form.taxYear,
        filingStatus: form.filingStatus,
        scenario: form.scenario,
        strikePricePerShareUsd: toNumberOrZero(form.strikePricePerShareUsd),
        fmvAtExercisePerShareUsd: toNumberOrZero(form.fmvAtExercisePerShareUsd),
        sharesExercised: toNumberOrZero(form.sharesExercised),
        salePricePerShareUsd: form.salePricePerShareUsd
          ? Number(form.salePricePerShareUsd)
          : undefined,
        ytdRegularWagesUsd: toNumberOrZero(form.ytdRegularWagesUsd),
        otherTaxableIncomeUsd: toNumberOrZero(form.otherTaxableIncomeUsd),
        preTaxDeductionsUsd: toNumberOrZero(form.preTaxDeductionsUsd),
        stateCode: form.stateCode,
        stateOverrideRatePct: form.stateOverrideRatePct
          ? Number(form.stateOverrideRatePct)
          : undefined,
      };
      return calculateIsoAmt(input);
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
        <Field label="Scenario" full>
          <div className="mt-1 flex flex-wrap gap-2 text-sm">
            <ScenarioPill
              active={form.scenario === 'exercise-and-hold'}
              onClick={() => update('scenario', 'exercise-and-hold')}
            >
              Exercise &amp; hold (triggers AMT)
            </ScenarioPill>
            <ScenarioPill
              active={form.scenario === 'exercise-and-sell-same-year'}
              onClick={() => update('scenario', 'exercise-and-sell-same-year')}
            >
              Exercise &amp; sell same year (no AMT)
            </ScenarioPill>
          </div>
        </Field>

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

        <Field label="Strike price ($/share)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.strikePricePerShareUsd}
            onChange={(e) => update('strikePricePerShareUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="FMV at exercise ($/share, e.g. 409A)">
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.fmvAtExercisePerShareUsd}
            onChange={(e) => update('fmvAtExercisePerShareUsd', e.target.value)}
            className={inputCls}
          />
        </Field>
        <Field label="Shares exercised">
          <input
            type="number"
            min="0"
            value={form.sharesExercised}
            onChange={(e) => update('sharesExercised', e.target.value)}
            className={inputCls}
          />
        </Field>

        {form.scenario === 'exercise-and-sell-same-year' && (
          <Field label="Sale price ($/share) — optional, defaults to FMV">
            <input
              type="number"
              min="0"
              step="0.01"
              placeholder="leave blank to use FMV at exercise"
              value={form.salePricePerShareUsd}
              onChange={(e) => update('salePricePerShareUsd', e.target.value)}
              className={inputCls}
            />
          </Field>
        )}

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

function Field({
  label,
  children,
  full,
}: {
  label: string;
  children: React.ReactNode;
  full?: boolean;
}) {
  return (
    <label className={`block text-sm ${full ? 'md:col-span-2' : ''}`}>
      <span className="font-medium text-gray-800 dark:text-gray-200">{label}</span>
      {children}
    </label>
  );
}

function ScenarioPill({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      // Selected: solid brand-blue + bright white text. Unselected:
      // muted slate text + slate border so the two states are clearly
      // distinct at a glance (earlier styling gave both states white
      // text, just differing in fill, which read as "both selected").
      className={`rounded-full border px-3 py-1.5 text-sm font-medium transition ${
        active
          ? 'border-brand-600 bg-brand-600 text-white shadow-sm'
          : 'border-gray-300 bg-white text-gray-500 hover:border-brand-400 hover:text-gray-700 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-500 dark:hover:text-gray-200'
      }`}
    >
      {children}
    </button>
  );
}

function Result({ result }: { result: IsoAmtResult }) {
  const r = result;
  const isHold = r.scenario === 'exercise-and-hold';
  const offers = offersForShortfall(Math.max(0, r.totalTaxIncreaseUsd));

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg border p-5 ${
          r.totalTaxIncreaseUsd > 0
            ? 'border-amber-200 bg-amber-50 dark:border-amber-900 dark:bg-amber-950'
            : 'border-emerald-200 bg-emerald-50 dark:border-emerald-900 dark:bg-emerald-950'
        }`}
      >
        <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
          Total tax increase from this {isHold ? 'exercise' : 'exercise + sale'}
        </p>
        <p
          className={`mt-1 text-4xl font-bold ${
            r.totalTaxIncreaseUsd > 0
              ? 'text-amber-700 dark:text-amber-300'
              : 'text-emerald-700 dark:text-emerald-300'
          }`}
        >
          {usd.format(r.totalTaxIncreaseUsd)}
        </p>
        <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
          Cash required to exercise: <strong>{usd.format(r.cashRequiredToExerciseUsd)}</strong>{' '}
          (strike × shares).
        </p>
      </div>

      <div className="grid gap-3 rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900 md:grid-cols-3">
        <Stat label="Bargain element" value={usd.format(r.totalBargainElementUsd)} />
        {isHold ? (
          <>
            <Stat label="AMT owed this year" value={usd.format(r.amtOwedUsd)} />
            <Stat
              label="AMT credit carryforward"
              value={usd.format(r.amtCreditCarryforwardUsd)}
            />
          </>
        ) : (
          <>
            <Stat
              label="Added ordinary income"
              value={usd.format(r.additionalOrdinaryIncomeUsd)}
            />
            <Stat
              label="Added fed + state tax"
              value={usd.format(r.additionalFederalOrdinaryTaxUsd + r.additionalStateTaxUsd)}
            />
          </>
        )}
      </div>

      <ShareCalculation what="this ISO/AMT calculation" />

      {r.totalTaxIncreaseUsd > 0 && <GumroadUpsell shortfallUsd={r.totalTaxIncreaseUsd} />}

      {r.notes.length > 0 && (
        <ul className="space-y-2 rounded-md border border-blue-200 bg-blue-50 p-4 text-sm text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
          {r.notes.map((n, i) => (
            <li key={i}>• {n}</li>
          ))}
        </ul>
      )}

      <details className="rounded-md border border-gray-200 bg-white p-4 text-sm dark:border-gray-800 dark:bg-gray-900">
        <summary className="cursor-pointer font-semibold text-gray-800 dark:text-gray-200">
          Show the math
        </summary>
        <div className="mt-3 grid gap-2 md:grid-cols-2">
          <Row k="Bargain element / share" v={usdCents.format(r.bargainElementPerShareUsd)} />
          <Row k="Bargain element total" v={usd.format(r.totalBargainElementUsd)} />
          <Row k="Regular taxable income (before ISO)" v={usd.format(r.regularTaxableIncomeBaseUsd)} />
          <Row k="Regular taxable income (after ISO)" v={usd.format(r.regularTaxableIncomeAfterUsd)} />
          <Row k="AMTI" v={usd.format(r.amtiUsd)} />
          <Row k="AMT exemption (after phaseout)" v={usd.format(r.amtExemptionUsd)} />
          <Row k="Tentative Minimum Tax (TMT)" v={usd.format(r.tentativeMinimumTaxUsd)} />
          <Row k="Regular federal tax" v={usd.format(r.regularFederalTaxUsd)} />
          <Row k="AMT owed" v={usd.format(r.amtOwedUsd)} />
          <Row k="Marginal federal rate" v={`${r.marginalFederalRatePct.toFixed(1)}%`} />
          <Row k="Marginal state rate" v={`${r.marginalStateRatePct.toFixed(2)}%`} />
          <Row k="Cash required at exercise" v={usd.format(r.cashRequiredToExerciseUsd)} />
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
