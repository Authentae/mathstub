import Link from 'next/link';
import {
  liveTools,
  toolCategoryOrder,
  toolCategoryMeta,
  type Tool,
} from '@/lib/tools';
import { blogPosts } from '@/content/blog/registry';
import { findCategoryForSlug } from '@/content/blog/categories';
import { HeroAnimation } from '@/components/HeroAnimation';
import { JsonLd } from '@/components/JsonLd';
import { organizationSchema, websiteSchema } from '@/lib/seo';

/**
 * Homepage — Variant B (Outcome-Led) port from Claude Design P3.
 *
 * Full visual transformation, not a tweak:
 * - Always-dark canvas (slate-950 base + brand-blue radial accent) — the
 *   page is its own dark surface regardless of the visitor's OS dark/light
 *   preference. Matches the existing dark HeroAnimation iframe so the
 *   hero section feels seamless instead of an iframe pasted onto a light
 *   page.
 * - Display-serif italic accent on "actually" pulls the eye to the
 *   outcome promise ("See what you actually owe").
 * - Mono-font micro-copy (eyebrows, source-proof line, brand cite chips)
 *   carries a "this is a tool, not a brochure" voice — calibrated against
 *   the IRS-citation tone the rest of the site uses.
 * - Brand-blue replaces Variant B's lime accent everywhere.
 *
 * Header/Footer in app/layout.tsx render on top of this. They already
 * tolerate dark backgrounds because the site supports dark mode; here we
 * just lock the homepage to dark independent of preference.
 */
/**
 * Total automated tests in the suite. Not derivable at runtime, so it's a
 * single named constant here. To refresh: run `npx vitest run` and copy the
 * "Tests N passed" total. (Calculator + guide counts below ARE derived from
 * code, so they never go stale.)
 */
const TEST_COUNT = 590;

export default function HomePage() {
  const tools = liveTools();
  const flagship = tools[0];
  const calcCount = tools.length;
  const guideCount = blogPosts.length;
  if (!flagship) {
    // Defensive guard — TS widens destructured access to possibly undefined.
    return null;
  }

  // Group the full calculator directory by topic so it reads as labeled
  // clusters instead of one flat 16-card wall. Any tool whose category isn't
  // in the display order falls into a defensive "More" bucket — a new calc can
  // never silently drop off the homepage.
  const knownGroups = toolCategoryOrder
    .map((key) => ({
      key,
      label: toolCategoryMeta[key].label,
      emoji: toolCategoryMeta[key].emoji,
      items: tools.filter((t) => t.category === key),
    }))
    .filter((g) => g.items.length > 0);
  const orphans = tools.filter((t) => !toolCategoryOrder.includes(t.category));
  const toolGroups =
    orphans.length > 0
      ? [...knownGroups, { key: 'more', label: 'More', emoji: '🧰', items: orphans }]
      : knownGroups;
  const latestPosts = [...blogPosts]
    .sort((a, b) => (a.datePublished < b.datePublished ? 1 : -1))
    .slice(0, 3);

  return (
    <div
      className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-100"
      style={{
        backgroundImage:
          'radial-gradient(1000px 680px at 90% -12%, rgba(37,99,235,0.26), transparent 60%), radial-gradient(780px 560px at 3% 18%, rgba(29,78,216,0.16), transparent 60%)',
      }}
    >
      <JsonLd data={organizationSchema()} />
      <JsonLd data={websiteSchema()} />
      <main className="mx-auto max-w-6xl px-6 py-12 sm:px-10 sm:py-16">
        {/*
          HERO — stacked layout. Earlier side-by-side grid forced the
          animation into a ~500px column that read as "small / lost on
          the right." Stacking the headline above and the animation
          below gives the animation the full max-w-6xl width (~1100px)
          so it actually feels like a hero element. Eye flow is also
          cleaner: promise (text) → proof (animation) → CTA already
          inline with the promise.
        */}
        <section className="flex flex-col gap-10 lg:gap-14">
          <div className="max-w-3xl">
            {/*
              Brand-blue accent layered throughout — eyebrow dot + text,
              "actually" italic in the H1, 37% chip, primary CTA button,
              and the smaller accents on calc card short codes, persona
              tags, trust band ✓ marks, and small section-heading dots
              all use a brand-300/400/500 shade. The Variant B mockup
              used chartreuse-lime in these places; Earth chose to keep
              everything on the existing brand-blue palette so the
              homepage doesn't introduce a second accent color the rest
              of the site doesn't share.
            */}
            <div className="mb-7 flex items-center gap-2.5 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
              <span
                className="h-1.5 w-1.5 rounded-full bg-brand-500"
                style={{ boxShadow: '0 0 12px rgb(59, 130, 246)' }}
                aria-hidden="true"
              />
              rsu vest tax reality · ty 2026
            </div>
            <h1 className="font-bold leading-[0.92] tracking-[-0.045em] text-white text-[64px] sm:text-[80px] lg:text-[96px]">
              See what
              <br />
              you{' '}
              <span
                className="font-normal italic tracking-[-0.02em] text-brand-300"
                style={{
                  fontFamily:
                    '"Source Serif 4", "Source Serif Pro", "Iowan Old Style", Georgia, serif',
                }}
              >
                actually
              </span>{' '}
              owe.
              <br />
              {/*
                "In 30 seconds." stays plain muted slate — mirrors the
                Claude Design Variant B mockup, where ONLY "actually"
                carried the italic-Serif accent. Earlier we tried
                italicizing "30 seconds." in the same brand-300 treatment
                but it read as two equal accents, diluting the eye's
                anchor on "actually." Plain mute restores the contrast.
              */}
              <span className="text-slate-400">In 30 seconds.</span>
            </h1>
            <p className="mt-7 max-w-[520px] text-lg leading-snug text-slate-200/85 sm:text-xl">
              Your employer withheld{' '}
              <span className="rounded bg-slate-800 px-1.5 py-0.5 font-mono text-base text-slate-100">
                22%
              </span>
              . Your real rate is probably closer to{' '}
              <span className="rounded bg-brand-500 px-1.5 py-0.5 font-mono text-base text-slate-950">
                37%
              </span>
              . Find the gap before April finds you.
            </p>

            <div className="mt-10">
              <Link
                href={`/${flagship.slug}`}
                className="inline-flex items-center gap-3.5 rounded-md bg-brand-500 px-7 py-5 text-lg font-semibold tracking-tight text-slate-950 transition hover:bg-brand-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-300 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 sm:text-xl"
              >
                Start with your RSU vest
                <span aria-hidden="true" className="text-2xl">→</span>
              </Link>
              <div className="mt-4 font-mono text-[11px] uppercase tracking-[0.04em] text-slate-400">
                free · no signup · 30 seconds · runs in your browser
              </div>
            </div>
          </div>

          {/*
            Animated hero loop, full container width. The inner .frame
            inside /hero/ already ships its own rounded corners +
            box-shadow, so we don't add outer chrome here — that would
            double-ring + create dead space along the iframe edge.
          */}
          <div className="w-full">
            <HeroAnimation />
          </div>
        </section>

        {/* SOCIAL PROOF / TRUST BAND — combined */}
        <section className="mt-16 border-y border-slate-800 py-7">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-mono text-xs uppercase tracking-[0.1em] text-slate-400">
              Built for engineers at
            </span>
            <span className="flex flex-wrap gap-x-7 gap-y-2 text-base font-bold tracking-tight text-slate-200 sm:text-lg">
              <span>stripe.</span>
              <span>shopify</span>
              <span>databricks</span>
              <span>vercel</span>
              <span>anthropic</span>
              <span>linear</span>
            </span>
          </div>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 font-mono text-[11px] uppercase tracking-[0.08em] text-slate-400">
            <li><span className="text-brand-400">✓</span> {calcCount} calculators</li>
            <li><span className="text-brand-400">✓</span> {guideCount} guides</li>
            <li><span className="text-brand-400">✓</span> {TEST_COUNT} unit tests</li>
            <li><span className="text-brand-400">✓</span> Every claim cites IRC § or IRS Pub</li>
            <li><span className="text-brand-400">✓</span> Inputs stay in your browser</li>
            <li><span className="text-brand-400">✓</span> Free, no signup</li>
          </ul>
        </section>

        {/* WHY TRUST — visual icon-card grid */}
        <section className="mt-24 sm:mt-32">
          <div className="mb-8">
            <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
              why tech workers trust mathstub
            </div>
            <h2 className="flex items-baseline gap-3 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-white sm:text-[56px]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_16px_rgb(59,130,246)]" />
              Built so you can verify it yourself.
            </h2>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <TrustCard
              icon="📚"
              title="IRS-cited, always"
              sub="Every claim references an IRC § or IRS Pub#. Read the math, not the marketing."
            />
            <TrustCard
              icon="🔒"
              title="Runs in your browser"
              sub="All math executes client-side. Your inputs never leave your machine."
            />
            <TrustCard
              icon="⚡"
              title="30-second results"
              sub="No signup, no email walls, no &quot;sign in to see your answer.&quot;"
            />
            <TrustCard
              icon="🧮"
              title={`${TEST_COUNT} unit tests`}
              sub="Every calc is cross-checked against worked examples from IRS publications."
            />
            <TrustCard
              icon="🔄"
              title="Year-aware"
              sub="2024, 2025, 2026 brackets / limits / phaseouts all baked in. Updated every November."
            />
            <TrustCard
              icon="🛠️"
              title="Built by an indie founder"
              sub="No VC, no enterprise sales motion. Just Earth, mathstub.com, on his own taxes."
            />
          </ul>
        </section>

        {/* PERSONA ROUTER */}
        <section className="mt-24 sm:mt-32">
          <div className="mb-8 flex items-baseline justify-between gap-4">
            <div>
              <div className="mb-2 font-mono text-[11px] uppercase tracking-[0.14em] text-brand-300">
                not an rsu? · pick your situation
              </div>
              <h2 className="flex items-baseline gap-3 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-white sm:text-[56px]">
                <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_16px_rgb(59,130,246)]" />
                What just happened?
              </h2>
            </div>
            <Link
              href="/start-here"
              className="hidden font-mono text-xs text-slate-400 hover:text-slate-300 sm:inline"
            >
              full diagnostic →
            </Link>
          </div>
          <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <PersonaCard
              href="/rsu-tax-shortfall"
              emoji="📈"
              title="My RSUs vested"
              tag="RSU shortfall · 30 sec"
            />
            <PersonaCard
              href="/iso-amt"
              emoji="🔓"
              title="I exercised options"
              tag="ISO/AMT or NSO · 60 sec"
            />
            <PersonaCard
              href="/espp-qualifying-disposition"
              emoji="💰"
              title="I sold ESPP shares"
              tag="ESPP qualifying · 60 sec"
            />
            <PersonaCard
              href="/quarterly-estimated-tax"
              emoji="📅"
              title="I owe quarterly tax"
              tag="Safe harbor · 30 sec"
            />
          </ul>
        </section>

        {/* CALCULATOR DIRECTORY — grouped by topic */}
        <section className="mt-24 sm:mt-32">
          <div className="mb-10 flex items-baseline justify-between gap-4">
            <h2 className="flex items-baseline gap-3 text-4xl font-bold leading-[1.05] tracking-[-0.04em] text-balance text-white sm:text-[56px]">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_16px_rgb(59,130,246)]" />
              Every calculator, by topic.
            </h2>
            <span className="shrink-0 font-mono text-xs text-slate-400">
              {calcCount} calculators · all free
            </span>
          </div>
          <div className="flex flex-col gap-12">
            {toolGroups.map((group) => (
              <div key={group.key}>
                <div className="mb-4 flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.12em] text-brand-300">
                  <span aria-hidden="true" className="text-sm">{group.emoji}</span>
                  {group.label}
                  <span aria-hidden="true" className="text-slate-600">·</span>
                  <span className="text-slate-500">{group.items.length}</span>
                </div>
                <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                  {group.items.map((t) => (
                    <CalcCard key={t.slug} tool={t} />
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* GAP STORY CALLOUT */}
        <section className="mt-24 rounded-lg border border-slate-800 bg-slate-900/40 p-8 sm:mt-32 sm:p-11">
          <div className="grid items-center gap-8 sm:grid-cols-[1fr_auto]">
            <div>
              <div className="mb-4 font-mono text-[11px] uppercase tracking-[0.1em] text-slate-400">
                why this matters
              </div>
              <div className="mb-6 flex items-center gap-3 font-mono font-bold tabular-nums">
                <span className="rounded-lg bg-slate-800 px-3.5 py-2 text-3xl text-slate-200 sm:text-4xl">
                  22%
                </span>
                <span aria-hidden="true" className="text-3xl text-brand-400 sm:text-4xl">
                  →
                </span>
                <span className="rounded-lg bg-brand-500 px-3.5 py-2 text-3xl text-slate-950 sm:text-4xl">
                  37%
                </span>
              </div>
              <p
                className="text-[28px] leading-[1.12] tracking-[-0.015em] text-slate-50 sm:text-[44px]"
                style={{
                  fontFamily:
                    '"Source Serif 4", "Source Serif Pro", "Iowan Old Style", Georgia, serif',
                }}
              >
                The 22% supplemental flat rate is a{' '}
                <em className="italic text-brand-300">floor</em>, not your bracket.
                Most engineers find a five-figure surprise in their first vest.
              </p>
              <div className="mt-4 font-mono text-xs text-slate-400">
                — methodology notes ·{' '}
                <Link href="/methodology" className="text-slate-400 hover:text-brand-300">
                  read the full sourcing
                </Link>
              </div>
            </div>
            <Link
              href={`/${flagship.slug}`}
              className="whitespace-nowrap rounded-md border border-brand-500/70 px-6 py-3.5 text-sm font-medium text-slate-100 transition hover:bg-brand-500/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
            >
              Run the numbers →
            </Link>
          </div>
        </section>

        {/* LATEST FROM BLOG */}
        <section className="mt-20 sm:mt-24">
          <div className="mb-6 flex items-baseline justify-between">
            <h2 className="flex items-baseline gap-3 text-3xl font-bold leading-[1.05] tracking-[-0.04em] text-white sm:text-4xl">
              <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-brand-500 shadow-[0_0_16px_rgb(59,130,246)]" />
              Latest from the blog
            </h2>
            <Link
              href="/blog"
              className="font-mono text-xs text-brand-400 hover:text-brand-300"
            >
              all posts →
            </Link>
          </div>
          <ul className="grid gap-3 md:grid-cols-3">
            {latestPosts.map((p) => {
              const category = findCategoryForSlug(p.slug);
              return (
                <li key={p.slug}>
                  <Link
                    href={`/blog/${p.slug}`}
                    className="flex h-full flex-col gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-4 transition duration-200 hover:-translate-y-1 hover:border-brand-500 hover:bg-slate-900 hover:shadow-[0_12px_44px_-14px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
                  >
                    <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.06em] text-slate-400">
                      <span>
                        {new Date(p.datePublished).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </span>
                      {category && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-brand-400">{category.name}</span>
                        </>
                      )}
                    </div>
                    <h3 className="line-clamp-3 text-sm font-semibold leading-snug text-brand-200">
                      {p.title}
                    </h3>
                    <p className="line-clamp-3 text-xs leading-snug text-slate-400">
                      {p.description}
                    </p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </section>

        {/* FOOTNOTE LINE */}
        <section className="mt-20 sm:mt-24 border-t border-slate-800 pt-6 font-mono text-xs text-slate-400">
          Not sure which calculator?{' '}
          <Link
            href="/start-here"
            className="text-brand-400 hover:text-brand-300"
          >
            see the diagnostic guide →
          </Link>{' '}
          · see the whole journey →{' '}
          <Link
            href="/equity-comp-tax-map"
            className="text-brand-400 hover:text-brand-300"
          >
            /equity-comp-tax-map
          </Link>{' '}
          · embed mathstub on your site →{' '}
          <Link href="/embed" className="text-brand-400 hover:text-brand-300">
            /embed
          </Link>{' '}
          · partner with us →{' '}
          <Link href="/partners" className="text-brand-400 hover:text-brand-300">
            /partners
          </Link>
        </section>
      </main>
    </div>
  );
}

function CalcCard({ tool }: { tool: Tool }) {
  return (
    <li>
      <Link
        href={`/${tool.slug}`}
        className="flex h-full min-h-[150px] flex-col gap-2 rounded-md border border-slate-800 bg-slate-900/50 p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:bg-slate-900 hover:shadow-[0_12px_44px_-14px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <div className="flex items-baseline justify-between gap-2">
          <span className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.06em] text-brand-300">
            {tool.emoji && <span aria-hidden="true">{tool.emoji}</span>}
            {tool.shortTitle}
          </span>
          <span className="shrink-0 font-mono text-[10px] uppercase tracking-[0.04em] text-brand-400/70">
            free · instant
          </span>
        </div>
        <div className="text-xl font-semibold leading-tight tracking-[-0.01em] text-brand-200">
          {tool.title}
        </div>
        <div className="mt-1 flex-1 text-sm leading-snug text-slate-400">
          {tool.summary}
        </div>
        <div className="mt-2 font-mono text-[11px] text-brand-300">open →</div>
      </Link>
    </li>
  );
}

function TrustCard({ icon, title, sub }: { icon: string; title: string; sub: string }) {
  return (
    <li className="rounded-xl border border-slate-800 bg-slate-900/50 p-5 transition hover:border-brand-500/60">
      <div className="flex items-start gap-3">
        <span
          aria-hidden="true"
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-brand-500/10 text-2xl ring-1 ring-inset ring-brand-500/20"
        >
          {icon}
        </span>
        <div className="min-w-0">
          <h3 className="text-base font-bold text-brand-100">{title}</h3>
          <p className="mt-1 text-sm text-slate-400">{sub}</p>
        </div>
      </div>
    </li>
  );
}

function PersonaCard({
  href,
  emoji,
  title,
  tag,
}: {
  href: string;
  emoji: string;
  title: string;
  tag: string;
}) {
  return (
    <li>
      <Link
        href={href}
        className="group flex h-full flex-col gap-1.5 rounded-md border border-slate-800 bg-slate-900/50 p-5 transition duration-200 hover:-translate-y-1 hover:border-brand-500/60 hover:bg-slate-900 hover:shadow-[0_12px_44px_-14px_rgba(37,99,235,0.5)] motion-reduce:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-400 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950"
      >
        <span className="text-4xl transition-transform duration-200 group-hover:scale-110 motion-reduce:group-hover:scale-100" aria-hidden="true">
          {emoji}
        </span>
        <span className="mt-2 text-lg font-semibold tracking-tight text-white sm:text-xl">{title}</span>
        <span className="font-mono text-[10px] uppercase tracking-[0.06em] text-brand-400/80">
          {tag}
        </span>
      </Link>
    </li>
  );
}
