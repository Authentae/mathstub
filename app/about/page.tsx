import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata, SITE_NAME, siteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';

export const metadata: Metadata = buildMetadata({
  slug: 'about',
  title: 'About Mathstub — free tax calculators for tech workers',
  description:
    'Who builds Mathstub, how the math is sourced, how we make money, and how to reach us. Independent. Free. No signup. Math runs in your browser.',
});

const FOUNDER_NAME = 'Singharash Rashasing';
const FOUNDER_HANDLE = 'authentae';

export default function AboutPage() {
  // Person + Organization schema so Google and LLMs can confidently
  // attribute the site to a real human — a meaningful E-E-A-T signal
  // for a YMYL finance site.
  const orgSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: siteUrl(),
    founder: {
      '@type': 'Person',
      name: FOUNDER_NAME,
      url: `${siteUrl()}/about`,
      sameAs: [`https://indiehackers.com/${FOUNDER_HANDLE}`],
    },
    description:
      'Free tax calculators for US tech workers with equity compensation. Independent indie publication.',
  };

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: FOUNDER_NAME,
    url: `${siteUrl()}/about`,
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: siteUrl(),
    },
    sameAs: [`https://indiehackers.com/${FOUNDER_HANDLE}`],
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-12">
      <JsonLd data={orgSchema} />
      <JsonLd data={personSchema} />

      <p className="text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        About Mathstub
      </h1>
      <p className="mt-2 text-lg text-gray-700 dark:text-gray-300">
        Free tax calculators for US tech workers with equity compensation —
        RSUs, ISO/AMT, ESPP, NSO, bonuses, quarterly estimates, state lookups.
        Independent. No signup. Inputs never leave your browser.
      </p>

      {/* Founder block — the single most-important E-E-A-T signal on a YMYL
          site is a real-person face attached to the content. Until a
          photo is uploaded, render the founder identity without an image. */}
      <section className="mt-10 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-800 dark:bg-gray-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Who builds it
        </p>
        <h2 className="mt-2 text-xl font-bold text-gray-900 dark:text-gray-100">
          {FOUNDER_NAME}
        </h2>
        <p className="mt-2 text-gray-700 dark:text-gray-300">
          Solo indie maker. Built Mathstub after losing $6,000 to an
          April-surprise RSU underwithholding penalty — the kind of mistake
          off-the-shelf tax software does not flag because the math happens
          months before filing. Every calculator on this site exists because
          a real-world situation was painful enough that a focused tool was
          worth shipping.
        </p>
        <p className="mt-3 text-sm">
          Find me on{' '}
          <a
            href={`https://indiehackers.com/${FOUNDER_HANDLE}`}
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            Indie Hackers
          </a>
          {' · '}
          email me at{' '}
          <a
            href="mailto:hello@mathstub.com"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            hello@mathstub.com
          </a>
          .
        </p>
      </section>

      <section className="mt-10 prose prose-gray max-w-none dark:prose-invert">
        <h2>What Mathstub covers</h2>
        <ul>
          <li>
            <strong>RSU withholding</strong> — the 22% federal supplemental
            gap that creates an April surprise.
          </li>
          <li>
            <strong>ISO &amp; AMT</strong> — exercise-year exposure and
            multi-year credit recovery on Form 8801.
          </li>
          <li>
            <strong>NSO exercise</strong> — bargain element, FICA, and
            supplemental withholding shortfall.
          </li>
          <li>
            <strong>ESPP</strong> — qualifying vs disqualifying disposition
            math under §423.
          </li>
          <li>
            <strong>Bonus tax</strong> — same supplemental-wage engine,
            applied to cash bonuses.
          </li>
          <li>
            <strong>Quarterly estimates</strong> — IRC §6654 safe-harbor
            calculator to avoid the underpayment penalty.
          </li>
          <li>
            <strong>State stock-comp</strong> — top marginal, supplemental,
            AMT, LTCG by state.
          </li>
        </ul>

        <h2>How the math is sourced</h2>
        <p>
          Every calculation cites the IRC section or IRS publication that
          controls it. Brackets, supplemental rates, FICA wage bases, and AMT
          exemptions are version-controlled in code with one constant per tax
          year. Pure math lives in a single tested module so the same engine
          can later power the Chrome extension and the Anthropic skill we
          plan to ship next.
        </p>
        <p>
          We currently mark every blog post and calculator as{' '}
          <em>&quot;Pending CPA review&quot;</em> until traffic justifies the
          spend on a real CPA reviewer. Until then, the math is unit-tested
          against worked examples from IRS publications and major CPA-blog
          articles — see the{' '}
          <Link href="/editorial-policy" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
            editorial policy
          </Link>{' '}
          for details.
        </p>

        <h2>How Mathstub makes money</h2>
        <p>
          Every calculator is free to use. We earn from two sources:
        </p>
        <ul>
          <li>
            <strong>Display ads</strong> — Google AdSense, served only inside
            content blocks (never above-the-fold or in the calculator).
          </li>
          <li>
            <strong>Affiliate commissions</strong> — disclosed inline at each
            card. We only recommend products that solve the problem the
            calculator just identified: TurboTax / TaxAct for filing,
            Harness Wealth for high-complexity CPA matching, Carta /
            Empower for tracking. Affiliate relationships never influence
            the math we display.
          </li>
        </ul>

        <h2>Privacy</h2>
        <p>
          Every calculator runs entirely in your browser. Inputs are never
          sent to a server. We use Vercel Web Analytics for traffic
          aggregate stats (no personally-identifying information). Full
          details in our{' '}
          <Link href="/privacy" className="font-semibold text-brand-700 hover:underline dark:text-brand-300">
            privacy policy
          </Link>
          .
        </p>

        <h2>Get in touch</h2>
        <p>
          Email{' '}
          <a
            href="mailto:hello@mathstub.com"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            hello@mathstub.com
          </a>
          {' '}for: math corrections, calculator requests, partnership
          questions, or just to say what is broken. Every report gets read.
        </p>
      </section>
    </main>
  );
}
