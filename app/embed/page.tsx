import type { Metadata } from 'next';
import Link from 'next/link';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  slug: 'embed',
  title: 'Embed Mathstub on your site — free RSU Shortfall widget',
  description:
    'Drop the RSU Tax Withholding Shortfall calculator on your CPA blog, finance newsletter, or financial-advisor site. One iframe tag. Light + dark themes. No JavaScript required on the host page.',
  ogImagePath: '/og/default.png',
});

/**
 * /embed — marketing landing page for the embeddable widget(s).
 *
 * Source: Claude Design P8 (Mathstub Embed Widget). The widget itself
 * is a self-contained HTML calculator at /public/embed/rsu-shortfall/
 * — third-party sites iframe that URL directly with ?theme=light or
 * ?theme=dark. This page is the public-facing copy/paste destination
 * (CPA blog owners, financial advisors, finance newsletters land here
 * looking for "how do I embed a tax calculator on my site").
 *
 * The CTA below shows a live preview + the iframe snippet to copy.
 * Backlink strategy: every embed includes "Powered by mathstub.com"
 * pointing back to the canonical /rsu-tax-shortfall route.
 */
export default function EmbedPage() {
  const lightSnippet = `<iframe src="https://mathstub.com/embed/rsu-shortfall?theme=light"
        width="400" height="500" frameborder="0"
        title="RSU Tax Withholding Shortfall Calculator"
        loading="lazy"></iframe>`;
  const darkSnippet = `<iframe src="https://mathstub.com/embed/rsu-shortfall?theme=dark"
        width="400" height="500" frameborder="0"
        title="RSU Tax Withholding Shortfall Calculator"
        loading="lazy"></iframe>`;

  return (
    <main className="mx-auto max-w-4xl px-4 py-8">
      <p className="text-sm text-gray-500 dark:text-gray-400">
        <Link href="/" className="hover:underline">
          ← Home
        </Link>
      </p>
      <h1 className="mt-2 text-3xl font-bold text-gray-900 dark:text-gray-100">
        Embed the RSU Shortfall calculator on your site
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-700 dark:text-gray-300">
        Drop the calculator on your CPA blog, finance newsletter, or
        financial-advisor site. One iframe tag, no JavaScript required
        on the host page. Visitors fill in their numbers, see the
        shortfall, and click through to mathstub for the full breakdown.
      </p>

      <section className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Light theme
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            For sites with white or light backgrounds.
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <iframe
              src="/embed/rsu-shortfall/?theme=light"
              width={400}
              height={500}
              loading="lazy"
              title="RSU Shortfall — light theme preview"
              className="block w-full border-0"
              style={{ height: 500 }}
            />
          </div>
          <pre className="mt-3 overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
            <code>{lightSnippet}</code>
          </pre>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
            Dark theme
          </h2>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            For sites with dark or slate backgrounds.
          </p>
          <div className="mt-3 overflow-hidden rounded-lg border border-gray-200 dark:border-gray-800">
            <iframe
              src="/embed/rsu-shortfall/?theme=dark"
              width={400}
              height={500}
              loading="lazy"
              title="RSU Shortfall — dark theme preview"
              className="block w-full border-0"
              style={{ height: 500 }}
            />
          </div>
          <pre className="mt-3 overflow-x-auto rounded-md bg-gray-900 p-3 text-xs text-gray-100">
            <code>{darkSnippet}</code>
          </pre>
        </div>
      </section>

      <section className="mt-10 rounded-md border border-gray-200 bg-gray-50 p-5 text-sm dark:border-gray-800 dark:bg-gray-900">
        <p className="font-semibold text-gray-900 dark:text-gray-100">FAQ</p>
        <dl className="mt-3 space-y-3">
          <div>
            <dt className="font-semibold text-gray-800 dark:text-gray-200">
              Is the embed free?
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Yes. Attribution required (the &ldquo;Powered by mathstub.com&rdquo; link
              in the widget). No commercial restrictions otherwise.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-800 dark:text-gray-200">
              Does the host page need any JavaScript?
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              No. The widget is a single iframe — the calculator runs
              inside it. Your page is unaffected.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-800 dark:text-gray-200">
              Do you track visitors on the embed?
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              The math runs entirely in the visitor&rsquo;s browser. No
              third-party analytics on the widget itself. The
              &ldquo;Run full breakdown&rdquo; link goes to mathstub.com where our
              standard analytics apply.
            </dd>
          </div>
          <div>
            <dt className="font-semibold text-gray-800 dark:text-gray-200">
              Can I customize the styling?
            </dt>
            <dd className="mt-1 text-gray-700 dark:text-gray-300">
              Light / dark theme via{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">?theme=light</code>{' '}
              or{' '}
              <code className="rounded bg-gray-100 px-1 py-0.5 dark:bg-gray-800">?theme=dark</code>.
              For deeper customization (brand color, fonts), email{' '}
              <a
                href="mailto:hello@mathstub.com?subject=Embed%20widget%20customization"
                className="font-semibold text-brand-700 hover:underline dark:text-brand-300"
              >
                hello@mathstub.com
              </a>
              .
            </dd>
          </div>
        </dl>
      </section>
    </main>
  );
}
