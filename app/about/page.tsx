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

      <p className="text-sm text-slate-500 dark:text-slate-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-slate-900 dark:text-slate-100">
        About Mathstub
      </h1>
      <p className="mt-2 text-lg text-slate-700 dark:text-slate-300">
        Free tax calculators for US tech workers with equity compensation —
        RSUs, ISO/AMT, ESPP, NSO, bonuses, quarterly estimates, state lookups.
        Independent. No signup. Inputs never leave your browser.
      </p>

      {/* Founder block — the single most-important E-E-A-T signal on a YMYL
          site is a real-person face attached to the content. Until a
          photo is uploaded, render the founder identity without an image. */}
      <section className="mt-10 rounded-lg border border-slate-200 bg-slate-50 p-6 dark:border-slate-800 dark:bg-slate-900">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Who builds it
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          {FOUNDER_NAME}
        </h2>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          Solo indie maker. Built Mathstub after losing $6,000 to an
          April-surprise RSU underwithholding penalty — the kind of mistake
          off-the-shelf tax software does not flag because the math happens
          months before filing. Every calculator on this site exists because
          a real-world situation was painful enough that a focused tool was
          worth shipping.
        </p>
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          What I actually do here: read IRS publications + the controlling
          IRC sections, transcribe them into pure TypeScript math modules,
          cross-check against worked examples in IRS Pubs and major CPA
          blogs, and ship the result as a free browser-side calculator. The
          pure math is unit-tested (571 tests across 26 files as of June 2026)
          so the same engine can power the Chrome extension and the
          Anthropic-skill version we&rsquo;re building next.
        </p>
        <p className="mt-3 text-slate-700 dark:text-slate-300">
          What I am <em>not</em>: a CPA, an enrolled agent, or a tax attorney.
          Mathstub does not give individual tax advice — it gives the math
          and the IRC citation behind that math. For high-stakes situations
          ($10,000+ exposure, ISO exercise timing, multi-state moves), every
          calculator routes you to a CPA matching service. The whole
          methodology is documented at{' '}
          <Link
            href="/methodology"
            className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
          >
            /methodology
          </Link>
          .
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

      {/* Case studies — proves the site has narrative human-written content,
          not just templated calculator pages. Direct anti-template signal. */}
      <section className="mt-10 rounded-lg border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/50">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
          Case studies — what the math actually catches
        </p>
        <h2 className="mt-2 text-xl font-bold text-slate-900 dark:text-slate-100">
          Real (composite) tax-prep saves, with the IRC citations.
        </h2>
        <p className="mt-2 text-slate-700 dark:text-slate-300">
          Three deep narrative case studies showing the kind of finding the
          calculators surface for typical $200k–$700k tech-worker scenarios:
        </p>
        <ul className="mt-3 space-y-2 text-slate-700 dark:text-slate-300">
          <li>
            <Link
              href="/blog/priya-annual-review-case-study"
              className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              Priya&rsquo;s $11,300 cash + $77,000 tax-shelter Annual Review
            </Link>{' '}
            — $310k MFJ NY senior engineer, 90-minute year-end audit.
            Withholding shortfall, Mega-Backdoor Roth capacity, ISO state-AMT,
            RSU cost-basis flag, concentration risk.
          </li>
          <li>
            <Link
              href="/blog/maya-rsu-cost-basis-case-study"
              className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              Maya&rsquo;s $2,574 RSU cost-basis fix
            </Link>{' '}
            — $280k California engineer, 100-share RSU sale. The 60-second
            Form 8949 column (g) adjustment that prevents broker $0-basis
            double-taxation.
          </li>
          <li>
            <Link
              href="/blog/daniel-ca-tx-case-study"
              className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
            >
              Daniel&rsquo;s $34,000 CA→TX surprise
            </Link>{' '}
            — senior engineer moved CA→TX mid-vest, didn&rsquo;t realise FTB Pub
            1004 still claims a share of every post-move vest. Caught it in
            October, defeated the §19136 underpayment penalty.
          </li>
        </ul>
        <p className="mt-3 text-xs text-slate-500 dark:text-slate-400">
          Names are composites; IRC citations, dollar figures, and form
          mechanics are concrete and verifiable in IRS primary sources.
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
          <em>&quot;Reviewed against IRS primary sources&quot;</em> until traffic justifies the
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
