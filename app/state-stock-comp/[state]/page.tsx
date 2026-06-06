import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  buildMetadata,
  canonical,
  faqSchema,
  webApplicationSchema,
} from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { ToolShell } from '@/components/ToolShell';
import { FaqAccordion } from '@/components/FaqAccordion';
import { Disclaimer } from '@/components/Disclaimer';
import { LastUpdatedBadge } from '@/components/LastUpdatedBadge';
import {
  findStateProfile,
  stateStockCompProfiles,
  type StateStockCompProfile,
} from '@tax/state-stock-comp';

const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

export function generateStaticParams() {
  return stateStockCompProfiles.map((s) => ({ state: s.code.toLowerCase() }));
}

interface PageProps {
  params: Promise<{ state: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { state } = await params;
  const profile = findStateProfile(state);
  if (!profile) return buildMetadata({ slug: '', title: 'State not found', description: '' });
  return buildMetadata({
    slug: `state-stock-comp/${profile.code.toLowerCase()}`,
    title: `${profile.name} Stock Compensation Tax — RSU, ESPP, ISO`,
    description: `${profile.name} top marginal rate, supplemental withholding for RSU/bonus, AMT status, and LTCG treatment. Quick reference for tech workers with equity comp.`,
    // AdSense policy: state-stock-comp/[state] pages share a 50-state template
    // (same 4-stat ProfileSummary + same EquityNotes + same FAQ shape) with
    // only state-specific numbers differing. Noindex until each has
    // substantive unique content (worked examples, state-specific cases,
    // direct DOR citations) so they don't count as thin/templated pages.
    noindex: true,
  });
}

export default async function Page({ params }: PageProps) {
  const { state } = await params;
  const profile = findStateProfile(state);
  if (!profile) notFound();

  const url = canonical(`state-stock-comp/${profile.code.toLowerCase()}`);
  const faqs = buildFaqs(profile);

  return (
    <>
      <JsonLd
        data={webApplicationSchema({
          name: `${profile.name} Stock-Comp Tax Reference`,
          description: `Tax reference for stock compensation income in ${profile.name}.`,
          url,
        })}
      />
      <JsonLd data={faqSchema(faqs)} />

      <ToolShell
        title={`${profile.name} stock-comp tax reference`}
        lede={`Top marginal rate, supplemental withholding, AMT status, and capital-gains treatment for RSU, ESPP, and ISO income earned by ${profile.name} residents.`}
        meta={<LastUpdatedBadge taxYear={2026} isoDate="2026-05-10" />}
        toolUi={
          <>
            <Disclaimer />
            <ProfileSummary profile={profile} />
          </>
        }
        howItWorks={<EquityNotes profile={profile} />}
        faq={<FaqAccordion items={faqs} />}
        related={
          <div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              <Link href="/state-stock-comp" className="text-brand-700 hover:underline dark:text-brand-100">
                ← Back to all 50 states
              </Link>
            </p>
          </div>
        }
      />
    </>
  );
}

function ProfileSummary({ profile }: { profile: StateStockCompProfile }) {
  return (
    <div className="grid gap-3 rounded-md border border-slate-200 bg-white p-4 text-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-2">
      <Stat
        label="Top marginal income tax rate"
        value={profile.topMarginalRate === 0 ? 'No state income tax' : pct.format(profile.topMarginalRate)}
      />
      <Stat
        label="Supplemental withholding rate"
        value={
          profile.supplementalRate === null
            ? 'Uses top marginal rate'
            : profile.supplementalRate === 0
              ? '— (no state tax)'
              : pct.format(profile.supplementalRate)
        }
      />
      <Stat
        label="State personal AMT (impacts ISO)"
        value={profile.hasPersonalAmt ? 'Yes' : 'No'}
      />
      <Stat
        label="LTCG treatment"
        value={
          profile.taxesLtcgAsOrdinary
            ? 'Taxed as ordinary income'
            : 'Special treatment (see notes)'
        }
      />
      <div className="sm:col-span-2">
        <p className="text-xs uppercase tracking-wide text-slate-500">Source</p>
        <a
          href={profile.revenueDeptUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-brand-700 hover:underline dark:text-brand-100"
        >
          {profile.revenueDeptLabel} →
        </a>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs uppercase tracking-wide text-slate-500">{label}</p>
      <p className="text-lg font-semibold text-slate-900 dark:text-slate-100">{value}</p>
    </div>
  );
}

function EquityNotes({ profile }: { profile: StateStockCompProfile }) {
  const noTax = profile.topMarginalRate === 0;
  return (
    <div className="space-y-4 text-sm leading-relaxed">
      {profile.notes && (
        <p className="rounded-md border border-blue-200 bg-blue-50 p-3 text-blue-900 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-100">
          <strong>Note:</strong> {profile.notes}
        </p>
      )}
      <div>
        <h3 className="font-semibold">RSU vests</h3>
        <p>
          {noTax
            ? `${profile.name} does not impose a state income tax on wages, so RSU vests are not taxed at the state level for residents. Multi-state allocation rules may still apply if the vesting period spanned another state.`
            : `RSU vests are W-2 supplemental wages in ${profile.name}, withheld at ${
                profile.supplementalRate !== null && profile.supplementalRate > 0
                  ? `the state supplemental rate (${pct.format(profile.supplementalRate)})`
                  : `the top marginal rate (${pct.format(profile.topMarginalRate)}) by default`
              }. Reconciled at filing against your actual marginal rate — same shortfall mechanics as federal.`}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">ESPP qualifying dispositions</h3>
        <p>
          {noTax
            ? `No state-level ordinary income or capital-gain tax in ${profile.name}.`
            : `${profile.name} ${
                profile.taxesLtcgAsOrdinary
                  ? 'taxes both the ordinary-income piece (the §423(c) discount) and the long-term capital gain at ordinary rates'
                  : 'gives some preferential treatment to long-term capital gains'
              }. Federal qualifying-disposition rules still split the gain into ordinary income and LTCG; state treatment is layered on top.`}
        </p>
      </div>
      <div>
        <h3 className="font-semibold">ISO exercises</h3>
        <p>
          {noTax
            ? `No state AMT or income-tax impact on ISO exercises in ${profile.name}.`
            : profile.hasPersonalAmt
              ? `${profile.name} imposes a state-level AMT that can apply to ISO bargain element on top of federal AMT. Plan for additional state AMT in addition to the federal calculation.`
              : `${profile.name} does NOT have a personal AMT for ISO exercises. Bargain element is not taxed at the state level on exercise (assuming you don't disqualify-sell). On a qualifying sale, the long-term gain is taxed at ${
                  profile.taxesLtcgAsOrdinary ? 'ordinary rates' : 'preferential rates per state rules'
                }.`}
        </p>
      </div>
    </div>
  );
}

function buildFaqs(profile: StateStockCompProfile) {
  return [
    {
      q: `Does ${profile.name} have a state income tax on RSU vests?`,
      a:
        profile.topMarginalRate === 0
          ? `No. ${profile.name} has no broad state income tax for residents. Multi-state allocation may still apply if you worked in another state during the vesting period.`
          : `Yes. ${profile.name}'s top marginal rate is ${pct.format(profile.topMarginalRate)}. RSU vests are W-2 wages and follow normal state withholding + reconciliation.`,
    },
    {
      q: `What supplemental withholding rate does ${profile.name} use for RSUs and bonuses?`,
      a:
        profile.supplementalRate !== null && profile.supplementalRate > 0
          ? `${profile.name} uses a published supplemental rate of ${pct.format(profile.supplementalRate)}.`
          : profile.topMarginalRate === 0
            ? `${profile.name} has no state income tax, so no state supplemental withholding applies.`
            : `${profile.name} does not publish a separate supplemental rate; employers typically default to the state's top marginal rate (${pct.format(profile.topMarginalRate)}).`,
    },
    {
      q: `Does ${profile.name} have a state AMT for ISO exercises?`,
      a: profile.hasPersonalAmt
        ? `Yes — ${profile.name} retains a personal AMT that can layer on top of federal AMT for ISO exercises. Confirm current-year mechanics with the ${profile.revenueDeptLabel}.`
        : `${profile.name} does not impose a personal AMT, so an ISO exercise typically does not trigger a state-level AMT bill (only federal AMT applies).`,
    },
    {
      q: `How does ${profile.name} tax long-term capital gains?`,
      a: profile.topMarginalRate === 0
        ? `No state-level capital-gains tax for residents.`
        : profile.taxesLtcgAsOrdinary
          ? `${profile.name} taxes long-term capital gains at the same rates as ordinary income — no preferential LTCG rate.`
          : `${profile.name} provides some preferential treatment for long-term capital gains. See the state-specific note on this page for details.`,
    },
    {
      q: 'Where is this information sourced?',
      a: `Top marginal rates are from the Tax Foundation 2025 state individual income tax brackets summary. State supplemental rates are from the published guidance of each state's revenue department (linked above). Personal AMT status reflects 2025 legislation. Always confirm current-year rules with the ${profile.revenueDeptLabel} before making decisions.`,
    },
    {
      q: 'Is this tax advice?',
      a: `No. This is a planning reference — state tax law changes frequently and varies by individual situation. Talk to a CPA licensed in ${profile.name} for advice on a real transaction.`,
    },
  ];
}
