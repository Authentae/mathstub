import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { ToolShell } from '@/components/ToolShell';
import { Disclaimer } from '@/components/Disclaimer';
import { stateStockCompProfiles } from '@tax/state-stock-comp';

const pct = new Intl.NumberFormat('en-US', {
  style: 'percent',
  maximumFractionDigits: 2,
});

export const metadata: Metadata = buildMetadata({
  slug: 'state-stock-comp',
  title: 'State Stock-Comp Tax Lookup — RSU, ESPP, ISO by State',
  description:
    'Top marginal rate, supplemental withholding rate, AMT status, and LTCG treatment for RSU, ESPP, and ISO income in all 50 states + DC.',
  ogImagePath: '/og/state-lookup.png',
});

export default function Page() {
  const sorted = [...stateStockCompProfiles].sort((a, b) => a.name.localeCompare(b.name));

  return (
    <ToolShell
      title="State Stock-Comp Tax Lookup"
      calcSlug="state-stock-comp"
      reportIssueContext="state-stock-comp"
      lede="Pick your state to see the top marginal rate, supplemental withholding rate, whether the state has its own AMT for ISO exercises, and how it treats long-term capital gains. Quick reference — link out to your state revenue dept for current rules."
      toolUi={
        <>
          <Disclaimer />
          <div className="overflow-x-auto rounded-md border border-gray-200 bg-white text-sm dark:border-gray-800 dark:bg-gray-900">
            <table className="w-full min-w-[440px]">
              <thead className="bg-gray-50 text-left text-xs uppercase tracking-wide text-gray-500 dark:bg-gray-950">
                <tr>
                  <th className="px-3 py-2">State</th>
                  <th className="px-3 py-2 text-right">Top rate</th>
                  <th className="px-3 py-2 text-right">Supplemental</th>
                  <th className="px-3 py-2">State AMT?</th>
                  <th className="px-3 py-2">LTCG</th>
                </tr>
              </thead>
              <tbody>
                {sorted.map((s) => (
                  <tr
                    key={s.code}
                    className="border-t border-gray-200 hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-950"
                  >
                    <td className="px-3 py-2 font-medium">
                      <Link
                        href={`/state-stock-comp/${s.code.toLowerCase()}`}
                        className="text-brand-700 hover:underline dark:text-brand-100"
                      >
                        {s.name} ({s.code})
                      </Link>
                    </td>
                    <td className="px-3 py-2 text-right">
                      {s.topMarginalRate === 0 ? '—' : pct.format(s.topMarginalRate)}
                    </td>
                    <td className="px-3 py-2 text-right">
                      {s.supplementalRate === null
                        ? 'top marginal'
                        : s.supplementalRate === 0
                          ? '—'
                          : pct.format(s.supplementalRate)}
                    </td>
                    <td className="px-3 py-2">{s.hasPersonalAmt ? 'Yes' : 'No'}</td>
                    <td className="px-3 py-2">
                      {s.taxesLtcgAsOrdinary ? 'Ordinary' : 'Special'}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      }
    />
  );
}
