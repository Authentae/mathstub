<!-- Captured from code (scan mode), 2026-06-05. Re-run /impeccable document after major visual changes. -->

# Design

## Theme

Always-dark. The site forces dark mode via `<html class="dark">` and
`color-scheme: dark` (light mode was dropped when the "Variant B" homepage
shipped). Every surface — homepage, calculators, blog, static pages — shares one
canvas so nothing looks out of place. Mood: a calm, focused dark control panel
lit by a single blue glow. Not neon, not glassy; quiet and credible.

## Color Palette

Defined in `tailwind.config.ts` (`brand` scale) + Tailwind's stock `slate`.

| Role | Token | Hex | Use |
|---|---|---|---|
| Canvas | `slate-950` | `#020617` | Body background, hero base |
| Surface | `slate-900` / `slate-800` | `#0f172a` / `#1e293b` | Cards, panels, borders |
| Hairline | `slate-800` | `#1e293b` | Dividers, card rings |
| Body ink | `slate-100` | `#f1f5f9` | Primary text |
| Muted ink | `slate-300` | `#cbd5e1` | Secondary / subtitle text (passes AA on slate-950) |
| Faint ink | `slate-500` | `#64748b` | Meta, eyebrow secondary (labels only, not body) |
| Brand primary | `brand-500` | `#3b82f6` | Glow dots, accents, primary action |
| Brand strong | `brand-600` | `#2563eb` | Buttons, links hover |
| Brand deep | `brand-700` | `#1d4ed8` | Pressed / dense fills |
| Brand tint bg | `brand-950` | `#172554` | Dark-mode tinted callout backgrounds |
| Brand light text | `brand-300` | `#93c5fd` | Eyebrow text, inline accent on dark |
| Positive | `emerald-*` | — | "good" flow steps, savings |
| Caution | `amber` / `red-*` | — | "bad" flow steps, tax-owed emphasis |

Contrast rule: this is a dark theme, so verify body text against `slate-950`,
never white. `slate-300` is the floor for body; `slate-500` is labels only.

### Signature material: the blue glow

The brand's one decorative move. A blue radial-gradient wash plus glowing dots.
Reuse, don't reinvent:

```
/* hero canvas */
background-image:
  radial-gradient(900px 600px at 88% -10%, rgba(37,99,235,0.20), transparent 60%),
  radial-gradient(700px 500px at 4% 18%, rgba(29,78,216,0.12), transparent 60%);

/* glowing dot (eyebrow / section heading marker) */
<span class="h-1.5 w-1.5 rounded-full bg-brand-500"
      style="box-shadow: 0 0 12px rgb(59,130,246)" aria-hidden />
```

## Typography

- **Families (cap 3):** one sans (`var(--font-sans)` → `system-ui, -apple-system,
  sans-serif`; the system stack, NOT Inter) for everything; a **mono** for eyebrows
  / meta / labels only. No serif. No second sans. (Detector flagged stray literal
  "Inter" references in OG-card scripts — those are image generators, not the live
  site; do not introduce Inter into the app.)
- **Display / hero headline:** `text-[40px] sm:text-[56px]`, `font-bold`,
  `leading-[1.02]`, `tracking-[-0.03em]`, `text-white`. Ceiling 56px; do not exceed
  ~6rem. Add `text-wrap: balance` on h1–h3.
- **Section heading (h2):** bold, paired with a brand-500 glowing dot to the left as
  the recurring rhythm device (this is the brand's deliberate kicker system — keep
  it; do NOT add tiny uppercase tracked eyebrows on top of it).
- **Body:** `slate-100`/`slate-300`, relaxed leading, capped 65–75ch. Plain-English
  prose; short paragraphs (the blog enforces a ~45-word visible-paragraph ceiling
  via `splitIntoChunks`).
- **Eyebrow / meta:** `font-mono text-[11px] uppercase tracking-[0.08em–0.14em]`
  `text-brand-300` / `text-slate-500`. Reserved for short labels only.

## Components

- **`ToolShell`** — standard layout wrapper for calculator pages.
- **`BlogHero`** — landing-style dark hero for `post.landing` blog posts (radial
  glow, mono eyebrow + dot, 40/56px headline, quickAnswer as subtitle).
- **`KeyPoints`** — "⚡ The short version" skim box (3–6 bullets) under the hero.
- **Blog content blocks** (`app/blog/[slug]/page.tsx` `Block` switch): `p`, `h2`/`h3`
  (dot-marked), `ul`/`ol`, `quote`, `callout`, `flow` (money-flow chain), `table`
  (comparison), `analogy` (rounded ring + circular icon chip), `embed` (live calc
  iframe), `details` (collapsible deep-dive — text stays in HTML for SEO).
- **Card / callout style:** `rounded-2xl` + `ring-1 ring-<color>/15` + subtle tinted
  bg (e.g. `bg-brand-950/30`). Soft ring, not a heavy border. **Never** a
  `border-left`/`border-l-4` side-stripe (banned; detector flags these).

## Layout

- Content column max ~`max-w-4xl` (hero) / `max-w-3xl`–`max-w-2xl` (prose), centered,
  `px-6 sm:px-10` gutters.
- Mobile-first, one-thumb. Test every change at iPhone width first.
- Vary vertical rhythm (`my-5`/`py-14`/`py-20`); don't use one uniform gap.
- Responsive grids: `repeat(auto-fit, minmax(280px, 1fr))` over manual breakpoints.

## Motion

Currently minimal (CSS `transition-colors` on links). When adding motion: ease-out
(quart/quint/expo), no bounce; animate transform/opacity, plus the brand's blur/glow
materials where they help; always ship a `prefers-reduced-motion: reduce` fallback;
never gate content visibility on a reveal class (headless renders would ship blank).
