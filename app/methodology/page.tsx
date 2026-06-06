import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';
import { ReportIssue } from '@/components/ReportIssue';

export const metadata: Metadata = buildMetadata({
  slug: 'methodology',
  title: 'Methodology — how Mathstub sources, tests, and updates its tax math',
  description:
    'Mathstub cites every tax rate, bracket, and threshold to the controlling IRC section or IRS publication. Brackets are version-controlled per tax year. Pure math is unit-tested against worked IRS examples. Here is how — exactly.',
});

export default function MethodologyPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        Methodology
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
        How the math on Mathstub gets sourced, tested, and updated. The
        short version: every number cites the IRC section or IRS publication
        that controls it, every calculation is unit-tested against worked
        examples, and bracket data is rebuilt each tax year from primary
        sources.
      </p>

      <section className="mt-10 prose prose-gray max-w-none dark:prose-invert">
        <h2 id="sources">Sources we use</h2>
        <p>
          Every tax rate, bracket, threshold, and rule on Mathstub traces
          back to one of these primary sources:
        </p>
        <ul>
          <li>
            <strong>Internal Revenue Code (IRC)</strong> — the statute. We
            cite by section (e.g. IRC §83(a) for vest-time taxation of
            property transferred for services).
          </li>
          <li>
            <strong>Treasury Regulations (Treas. Reg.)</strong> — Treasury
            interpretations binding on the IRS. Cited by reg number
            (e.g. Treas. Reg. §31.3402(g)-1 for supplemental withholding).
          </li>
          <li>
            <strong>IRS Publications</strong> — plain-language guides. Pub
            15 (Employer&apos;s Tax Guide), Pub 15-T (Federal Income Tax
            Withholding Methods), Pub 17 (Your Federal Income Tax), Pub 505
            (Tax Withholding and Estimated Tax), Pub 525 (Taxable and
            Nontaxable Income), Pub 550 (Investment Income).
          </li>
          <li>
            <strong>IRS Revenue Procedures and Notices</strong> — annual
            inflation-adjusted thresholds (Rev. Proc. 2024-40 sets the 2025
            tax-year brackets; the corresponding 2026 procedure sets 2026
            brackets).
          </li>
          <li>
            <strong>State revenue department publications</strong> — for
            state-specific supplemental withholding, AMT, and LTCG
            treatment. Linked directly on each state page.
          </li>
        </ul>
        <p>
          Random tax blogs, financial-product marketing pages, and Reddit
          threads are <em>not</em> sources. We use them at most as
          tone validators or pointers to a primary source.
        </p>

        <h2 id="versioning">Tax-year versioning</h2>
        <p>
          Federal brackets, FICA wage bases, AMT exemptions, and standard
          deductions change every tax year. Mathstub maintains a separate
          constants module for each year (2024, 2025, 2026) so calculators
          can swap year without recomputing logic. When a new tax year is
          published, we update the constants in a single PR and rerun the
          full unit-test suite to catch regressions.
        </p>
        <p>
          The &ldquo;Last updated&rdquo; badge on each calculator and blog post
          reflects the date the underlying math was last touched —{' '}
          <em>not</em> a cosmetic refresh. We do not bump dates to game
          freshness signals.
        </p>

        <h2 id="testing">Testing</h2>
        <p>
          Pure math lives in <code>lib/tax/</code> with no React or browser
          dependencies — the same engine could later power the Chrome
          extension and the Anthropic skill we plan to ship. Each module
          has a Vitest test file (<code>tests/tax/</code>) covering:
        </p>
        <ul>
          <li>Zero and negative inputs (defensive guards via TaxCalcError).</li>
          <li>Year-boundary edge cases (bracket transitions, FICA wage-base crossings).</li>
          <li>Very large vests ($1M+ supplemental threshold for 37% federal).</li>
          <li>Currency-rounding parity across federal, state, and FICA.</li>
          <li>Cross-checks against worked examples from IRS Pubs and CPA blogs.</li>
        </ul>
        <p>
          The current suite is 571 tests across 26 files — calculator
          modules, blog content invariants (every post has a Sources
          citation, every cross-reference resolves, every post is
          assigned to exactly one category, every referenced affiliate
          offer ID resolves to a real entry), and accessibility helpers.
          Coverage on the calculation layer is high; we deliberately do
          not over-test the React UI because the math layer is where the
          trust lives.
        </p>

        <h2 id="review">Editorial review</h2>
        <p>
          Every blog post and calculator on Mathstub currently shows{' '}
          <em>&ldquo;Reviewed against IRS primary sources&rdquo;</em> in the byline. This is the honest
          framing: until Mathstub revenue justifies a real CPA on retainer,
          the math is reviewed by the founder against IRS source material
          rather than by a credentialed professional.
        </p>
        <p>
          When traffic and revenue support it, we will engage a CPA who
          specializes in equity compensation to formally review the
          calculation logic and content. At that point the byline will
          name the reviewer and link to their bio.
        </p>
        <p>
          Until then: if you spot a math error or a misread IRC citation,{' '}
          <a
            href="mailto:hello@mathstub.com?subject=Math%20correction"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            email me directly
          </a>
          . Every correction gets read and shipped.
        </p>

        <h2 id="not-tax-advice">What this is not</h2>
        <p>
          Mathstub is a planning reference. It is{' '}
          <strong>not tax advice</strong> for your specific situation. Real
          tax decisions depend on facts the calculator does not capture —
          state residency sourcing, multi-state allocation, AMT
          interactions across grants, pre-IPO equity restrictions, prior-
          year carryovers, and dozens of other variables.
        </p>
        <p>
          For high-stakes decisions ($10,000+ in tax owed, multi-state
          moves, ISO exercises, pre-IPO planning), talk to a CPA licensed
          in your state who knows equity compensation. The{' '}
          <Link
            href="/about"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            About page
          </Link>{' '}
          links the affiliate CPA-matching service we recommend.
        </p>

        <h2 id="updates">When math changes</h2>
        <p>
          The IRS adjusts brackets, FICA wage bases, AMT exemptions, and
          contribution limits every year — typically October or November
          for the following tax year. When new numbers drop, we update the
          constants module and bump the &ldquo;Last updated&rdquo; date on affected
          pages within ~2 weeks. If a tax law change materially affects
          an existing calculator (e.g. a SECURE 2.0 style reform), we
          publish a blog post explaining what changed and what the new
          math says.
        </p>

        <h2 id="how-to-verify">How to verify the math yourself</h2>
        <p>
          Three quick checks for any calculation on this site:
        </p>
        <ol>
          <li>
            <strong>Read the cited IRC section.</strong> Every blog post
            ends with a Sources block. Cross-check the section number on{' '}
            <a
              href="https://www.law.cornell.edu/uscode/text/26"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              law.cornell.edu/uscode/text/26
            </a>{' '}
            (Cornell hosts the IRC for free).
          </li>
          <li>
            <strong>Run the worked example.</strong> Most calculator pages
            have a &ldquo;Show the math&rdquo; panel that displays every intermediate
            number. Verify the final answer by hand against an IRS Pub
            worked example.
          </li>
          <li>
            <strong>Cross-check against another tool.</strong> For RSU
            shortfall, try the same inputs in TurboTax&apos;s tax estimator or a
            CPA blog calculator. We aim to be within $50–$200 of those for
            typical scenarios. Larger differences usually indicate one tool
            handles an edge case differently — email me and I will dig in.
          </li>
        </ol>
      </section>

      <ReportIssue context="methodology" />
    </main>
  );
}
