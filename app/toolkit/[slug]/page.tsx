import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { buildMetadata, breadcrumbSchema, canonical, siteUrl } from '@/lib/seo';
import {
  TOOLKIT_PRODUCTS,
  accentClasses,
  getToolkitProduct,
  productSchema,
  toolkitSlugs,
} from '@/lib/toolkit';

interface RouteParams {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return toolkitSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: RouteParams): Promise<Metadata> {
  const { slug } = await params;
  const p = getToolkitProduct(slug);
  if (!p) return buildMetadata({ slug: `toolkit/${slug}`, title: 'Not found', description: '' });
  return buildMetadata({
    slug: `toolkit/${slug}`,
    title: `${p.title} — ${p.price} · Mathstub Notion Toolkit`,
    description: p.elevatorPitch,
    ogImagePath: p.cover,
  });
}

export default async function ToolkitDetail({ params }: RouteParams) {
  const { slug } = await params;
  const product = getToolkitProduct(slug);
  if (!product) notFound();

  const accent = accentClasses(product.accent);
  const url = canonical(`toolkit/${product.slug}`);

  const jsonLd = [
    productSchema(product, siteUrl()),
    breadcrumbSchema([
      { name: 'Home', path: '/' },
      { name: 'Toolkit', path: '/toolkit' },
      { name: product.title, path: `/toolkit/${product.slug}` },
    ]),
  ];

  const otherProducts = TOOLKIT_PRODUCTS.filter((p) => p.slug !== product.slug);

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      {jsonLd.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Breadcrumb */}
      <nav className="mb-6 text-xs text-slate-500 dark:text-slate-400" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-brand-700 dark:hover:text-brand-300">
          Home
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <Link href="/toolkit" className="hover:text-brand-700 dark:hover:text-brand-300">
          Toolkit
        </Link>
        <span className="mx-2" aria-hidden="true">/</span>
        <span className="text-slate-700 dark:text-slate-300">{product.title}</span>
      </nav>

      {/* Hero */}
      <header className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:items-start">
        <div>
          <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accent.text}`}>
            mathstub notion toolkit · {product.price}
          </p>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-slate-900 dark:text-brand-100 md:text-4xl">
            {product.title}
          </h1>
          <p className="mt-3 text-base text-slate-700 dark:text-slate-300">
            {product.elevatorPitch}
          </p>

          <a
            href={product.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Buy on Gumroad · {product.price}
            <span aria-hidden="true">→</span>
          </a>
          <p className="mt-2 text-xs text-slate-500 dark:text-slate-500">
            Secure checkout via Gumroad · 14–30 day money-back guarantee · Lifetime updates
          </p>
        </div>

        <div className={`relative aspect-[1280/720] overflow-hidden rounded-xl ring-1 ${accent.ring}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.cover}
            alt={`${product.title} cover artwork`}
            decoding="async"
            className="h-full w-full object-cover"
          />
        </div>
      </header>

      {/* Worked example callout */}
      <section
        className={`mt-10 rounded-xl border ${accent.border} ${accent.bg} p-6`}
        aria-labelledby="worked-example"
      >
        <p className={`font-mono text-[11px] uppercase tracking-[0.18em] ${accent.text}`}>
          Worked example
        </p>
        <h2
          id="worked-example"
          className="mt-1 text-xl font-bold text-slate-900 dark:text-brand-100"
        >
          {product.workedExampleHeadline}
        </h2>
        <p className="mt-2 text-sm text-slate-700 dark:text-slate-300">
          {product.workedExampleBody}
        </p>
      </section>

      {/* What's inside */}
      <section className="mt-12" aria-labelledby="whats-inside">
        <h2
          id="whats-inside"
          className="text-2xl font-bold text-slate-900 dark:text-brand-100"
        >
          What&rsquo;s inside
        </h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
          Six sections, each with worked math + a live Notion database + a deep-link
          to the matching free Mathstub calculator.
        </p>

        <div className="mt-6 grid gap-6 md:grid-cols-[1fr_1fr]">
          <ul className="grid gap-3 sm:grid-cols-2">
            {product.whatsInside.map((f) => (
              <li
                key={f.title}
                className="rounded-lg border border-slate-200 bg-white p-4 dark:border-slate-800 dark:bg-slate-900/40"
              >
                <p className="text-sm font-bold text-slate-900 dark:text-brand-100">{f.title}</p>
                <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{f.body}</p>
              </li>
            ))}
          </ul>

          <div className={`relative aspect-[1280/720] overflow-hidden rounded-xl ring-1 ${accent.ring}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={product.whatsInsideImage}
              alt={`${product.title} — what's inside, visual grid`}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Why trust */}
      <section className="mt-12" aria-labelledby="why-trust">
        <h2
          id="why-trust"
          className="text-2xl font-bold text-slate-900 dark:text-brand-100"
        >
          Why buyers trust this
        </h2>
        <div className={`mt-4 overflow-hidden rounded-xl ring-1 ${accent.ring}`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={product.whyTrustImage}
            alt={`${product.title} — five trust badges, including primary-source citations + money-back guarantee`}
            loading="lazy"
            decoding="async"
            className="block aspect-[1280/720] w-full object-cover"
          />
        </div>
      </section>

      {/* Audience match */}
      <section className="mt-12 grid gap-6 md:grid-cols-2" aria-labelledby="audience-match">
        <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-5">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
            Good fit if
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-800 dark:text-slate-200">
            {product.goodFitBullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-emerald-600 dark:text-emerald-400">✓</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-xl border border-slate-300 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-900/40">
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-slate-600 dark:text-slate-400">
            Not a good fit if
          </p>
          <ul className="mt-2 space-y-2 text-sm text-slate-700 dark:text-slate-300">
            {product.badFitBullets.map((b, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-0.5 text-slate-500">·</span>
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Secondary CTA */}
      <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900/40">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-900 dark:text-brand-100">
              Ready when you are.
            </h2>
            <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">
              30-second Notion import. Lifetime updates. Money-back guarantee.
            </p>
          </div>
          <a
            href={product.gumroadUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-md bg-brand-600 px-5 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-brand-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2"
          >
            Buy on Gumroad · {product.price}
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      {/* Other templates */}
      <section className="mt-12" aria-labelledby="other-templates">
        <h2
          id="other-templates"
          className="text-xl font-bold text-slate-900 dark:text-brand-100"
        >
          Other templates in the toolkit
        </h2>
        <ul className="mt-4 grid gap-4 sm:grid-cols-3">
          {otherProducts.map((o) => {
            const a = accentClasses(o.accent);
            return (
              <li key={o.slug}>
                <Link
                  href={`/toolkit/${o.slug}`}
                  className="group flex h-full flex-col gap-2 overflow-hidden rounded-lg border border-slate-200 bg-white p-3 transition hover:border-brand-500 hover:shadow-md dark:border-slate-800 dark:bg-slate-900/40 dark:hover:border-brand-500/60"
                >
                  <div className={`relative aspect-[1280/720] w-full overflow-hidden rounded-md ring-1 ${a.ring}`}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={o.cover}
                      alt=""
                      loading="lazy"
                      decoding="async"
                      className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
                    />
                  </div>
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="text-sm font-bold text-slate-900 dark:text-brand-100 group-hover:text-brand-700">
                      {o.labelWithEmoji}
                    </span>
                    <span className={`rounded-full ${a.bg} ${a.text} px-2 py-0.5 font-mono text-[10px] font-bold`}>
                      {o.price}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">{o.shortSub}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <p className="mt-10 text-xs italic text-slate-500 dark:text-slate-500">
        Affiliate disclosure — Mathstub earns from sales on this Mathstub-owned
        template. The free calculators stay free.
      </p>
      <p className="sr-only">
        <a href={url}>{url}</a>
      </p>
    </main>
  );
}
