# Product

## Register

brand

> Mathstub is two surfaces sharing one identity: a set of tax calculators (a tool)
> and a content cluster of guides/case studies meant to read like polished landing
> pages. The owner's standing intent is that the **content design IS the product** —
> it's the traffic engine and the trust-builder — so the site default is `brand`.
> Individual calculator UI can be treated as `product` per task when the work is
> purely about the calculator form/result mechanics.

## Users

US tech workers and high earners with equity compensation (RSUs, ISOs, NSOs, ESPP),
plus people facing a specific, stressful tax moment: a vest just hit, a bonus got
withheld at 40%, an AMT bill appeared, a 1099-B shows a $0 cost basis. They arrive
mid-panic, usually from Google or an AI Overview, often on a phone, one-thumb, in a
hurry. They are **not** tax professionals. Many are smart but tax-illiterate and
easily intimidated by IRS language. The job to be done: "tell me, in plain English,
whether I have a problem and what the number actually is — without making me feel
stupid or making me read a research paper."

## Product Purpose

Mathstub turns confusing equity-comp tax questions into clear answers and free
calculators. It exists to (1) rank in search / get cited by AI Overviews on
high-intent equity-comp tax queries, (2) earn trust through accuracy + plain
language, and (3) funnel that trust into calculators, affiliate offers, and paid
Notion templates. Success = traffic that converts because readers actually
understand the page and believe it. A page that is accurate but unreadable has
failed; a page that is readable but wrong has failed worse.

## Brand Personality

A calm expert who explains simply — "a smart friend who happens to be great at
taxes." Three words: **clear, trustworthy, unintimidating.** Voice is plain English,
short sentences, concrete dollar examples over jargon. Warm but never cutesy about
money. The emotional arc on every page: arrive anxious → "oh, I get it now" → "I
trust these people." Authority comes from clarity and cited IRS sources, not from
sounding complicated.

## Anti-references

- **The research-paper / wall-of-text blog.** Long unbroken gray paragraphs that
  read like a law review. The owner's explicit bar: "even a child could read it
  without saying yuck." If a section is a text wall, it has failed.
- **IRS-form dryness.** Form numbers and code sections with no human translation.
  Cite them, but always say what they mean first.
- **Generic AI-slop SaaS.** Cream/sand body backgrounds, tiny uppercase tracked
  eyebrows over every section, identical icon-heading-text card grids, gradient
  text, side-stripe (`border-left`) callouts, hero-metric templates. Impeccable's
  detector already flagged these on the blog; they are banned here.
- **Intimidating "premium fintech."** Cold navy-and-gold, dense dashboards, jargon
  that signals "this is for finance people, not you."

## Design Principles

1. **No yuck, no wall.** Every long passage must be broken by a visual the eye can
   grasp instantly: a money-flow, a comparison table, an analogy box, a collapsible
   deep-dive. The reader should be able to skim the whole point in ~15 seconds and
   still have full depth one tap away.
2. **Depth stays, it just hides.** SEO and trust require the full, IRC-cited detail
   (800-word floor is enforced by tests). Never solve "too long" by deleting
   information — solve it by collapsing it (`<details>` keeps text in the HTML for
   Google/AI) or visualizing it. Readable surface, complete substance.
3. **Show the number with a real example.** Abstract rules don't land; "$5,000
   vests, ~$2,140 tax" does. Prefer concrete dollar figures and worked examples.
   Every figure must be verifiable (cite IRS Pub/IRC) — never fabricated.
4. **Mobile-first, one-thumb.** Users are panicking on a phone. If it doesn't work
   one-thumb on an iPhone, it doesn't ship.
5. **Trust is the conversion.** Visible "Reviewed against IRS sources," cited
   sources block, honest disclaimers. The design should feel credible enough that a
   stranger hands us their tax anxiety. Looking good and being accurate are the same
   goal here, not a tradeoff.

## Accessibility & Inclusion

Target WCAG 2.1 AA. Body text ≥4.5:1 contrast (the site runs forced dark mode via
`<html class="dark">`, so verify against the dark slate canvas, not white).
Mobile-first, large tap targets, one-thumb reach. Respect
`prefers-reduced-motion` on every animation (crossfade/instant fallback). Plain-
language reading level is itself an inclusion requirement here: the audience spans
non-native English speakers and the tax-illiterate, so jargon without translation
is an accessibility failure, not just a style one.
