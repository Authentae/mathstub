# Notion templates — packaging + Gumroad submission

Four Gumroad-ready Notion templates that pair with the [Mathstub](https://mathstub.com) calculator suite.

| Template | Price | Source | Cover |
|---|---|---|---|
| **Year-End Tax Playbook** | **$19** | [year-end-tax-checklist/template.md](./year-end-tax-checklist/template.md) | [cover.png](./year-end-tax-checklist/cover.png) |
| **Equity Comp Decision Tracker** | **$29** | [equity-comp-tracker/template.md](./equity-comp-tracker/template.md) | [cover.png](./equity-comp-tracker/cover.png) |
| **Tech Worker Annual Financial Review** | **$39** | [tech-worker-annual-review/template.md](./tech-worker-annual-review/template.md) | [cover.png](./tech-worker-annual-review/cover.png) |
| **Multi-State Equity Comp Tax Planner** | **$49** | [multi-state-equity-planner/template.md](./multi-state-equity-planner/template.md) | [cover.png](./multi-state-equity-planner/cover.png) |

> 📈 **Path A pricing 2026-05-21** — impulse-buy ladder $19 / $29 / $39 / $49 lets buyers' enthusiasm validate the new content (cookbook recipes, FAQ, glossary, TL;DR cards, CSV companion files). Raise to $29/$49/$79/$79 once 10+ purchases of social proof exist. Bundle pricing $99 (save $37) — turn on Gumroad's bundle feature after first single-product sale.

## Listing imagery (per template, auto-generated)

Each template directory ships with these preview assets. **Only upload the first one to Gumroad** — the others spoil the content and create OCR-copy risk.

| File | Size | Use it as | Upload to Gumroad? |
|---|---|---|---|
| `cover.png` | 1280×720 | **Primary cover image** + **Thumbnail** (use same file twice). Branded marketing card, zero content revealed. | ✅ Yes |
| `preview-hero.png` | 1280×720 | Above-the-fold rendered template showing brand bar + title + TL;DR card. Earth's call: too revealing. | ⚠️ Optional |
| `preview-full.png` | 1280×tall (~5MB) | **Internal use only** — full-length scroll-through. Reveals every recipe / FAQ / glossary entry. OCR-able. | ❌ No |
| `preview-strip.webp` | 960×~2700 | **Internal use only** — 5 stacked frames. Same spoiler risk as full. | ❌ No |
| `preview-tour.webp` | animated 960×540 | **Internal use only** — 18-frame animated scroll. Frame-by-frame pause exposes everything. | ❌ No |

Regenerate any time: `npm run notion:images` (covers) + `npm run notion:previews` (preview assets).

> 💡 **Why "less" is the right answer.** Standard Notion-template-on-Gumroad pattern: cover only. Show enough to prove quality; never ship the goods in the preview. Buyers pay for convenience + structure + lifetime updates, not raw text. The `preview-full` / `preview-strip` / `preview-tour` files remain useful for: your own visual QA, sharing on Twitter/HN/Reddit when launching, recording your eventual Loom walkthrough, and internal team review.

## How buyers import

Each template is delivered as a Markdown file. To import:

1. Create a new page in Notion (any workspace).
2. Click the **`···`** menu (top-right) → **Import** → **Markdown & CSV**.
3. Select `template.md`. Notion creates a new page with all sections, tables, headings, and links preserved.
4. **Upgrade the tables to databases:** right-click any markdown table → **Turn into database** → choose **Table view**. Then click `+ Add a view` to add a **Gallery** or **Calendar** view filtered to "this year" or "upcoming vests." This single step lifts the template from "imported markdown" to "real Notion workspace."
5. (Optional but recommended) Record a 3–5 min Loom walkthrough of your own copy, paste the URL into the `[paste your Loom share URL here]` callout at the top of the template. Your buyers see this Loom inside the Gumroad listing — the single biggest perceived-value lift available.

## How to ship a buyer-ready package

For each template directory:

```bash
# From repo root, after editing the template:
npm run notion:images   # regenerates cover.svg + cover.png

# Build a zip the buyer downloads from Gumroad:
cd notion-templates/<template-name>
zip ../<template-name>-package.zip template.md cover.png README.txt
```

The buyer-facing zip should contain:
- `template.md` — Notion-importable markdown
- `cover.png` — 1280×720 cover (also used in the Gumroad listing)
- `README.txt` — 5-step import + Loom walkthrough instructions
- `companion-*.csv` (where present) — Excel/Sheets-importable data files (Decision Tracker ships a 4-year projection CSV; Multi-State Planner ships an allocation CSV)

A standard `README.txt` template is at the bottom of this file — copy into each template directory.

## Gumroad submission checklist (per template)

1. **Create product** → Digital product → name + URL slug.
2. **Cover image:** upload `cover.png` (1280×720). Set as primary.
3. **Price:** $29 / $49 / $79 / $79 per the listing.
4. **Description:** paste the long-description block from `<template>/listing.md`.
5. **Files:** upload the buyer-facing zip described above.
6. **Tags:** copy from the listing's "Tags / keywords" section.
7. **Refund policy:** 14-day (Playbook + Decision Tracker) or 30-day (Annual Review + Multi-State Planner). No questions, per the listing copy.
8. **Custom thank-you message:**
   ```
   Thanks for supporting Mathstub! To import:
   1. Open template.md from your download.
   2. In Notion, create a new page → ··· → Import → Markdown & CSV.
   3. Select template.md.
   4. Right-click each table → "Turn into database" for filtering + views.
   5. Watch the 4-min Loom walkthrough linked in the page header.

   Reply to this email with any bug reports or questions — I read every one.
   ```
9. **Publish** → toggle public.
10. **Bundle** — once any one product has its first sale, turn on a 4-product bundle at $159 (save $57). Gumroad supports this natively.

## Updating the templates

When IRS limits / tax rules change (typically once a year in November):

- Update the relevant calculator pages in `app/`.
- The Mathstub deep links in the templates don't change — they always point at the latest live calculator.
- Re-publish the template only if you've added new sections or fixed material errors.
- Gumroad buyer libraries auto-update; your existing buyers re-download the new version.

## Cross-promotion

Each template links to the others by Gumroad URL. After the first one publishes:

1. Note the Gumroad URL.
2. Update the other three templates' "Companion" lines (find the `gumroad.com/` placeholders in the listings and templates) with the real URLs.
3. Re-zip + re-upload.

## Standard buyer README.txt (copy into each template directory)

```text
Welcome — let's get this imported.

1. Create a new page in Notion (any workspace, any plan including free).

2. Click the ··· menu (top-right) → Import → Markdown & CSV.

3. Select template.md from this download. Notion will create the page
   with every section, table, and link preserved.

4. Upgrade your tables to databases:
   - Right-click any markdown table → "Turn into database" → "Table view".
   - Click "+ Add a view" → Calendar or Gallery for richer filtering.
   This single step transforms the template into a real Notion workspace.

5. Watch the walkthrough Loom linked at the top of the template (3-5 min).
   It shows the template in motion with a real example user.

QUESTIONS? Reply to the Gumroad receipt email — I read every one.

REFUND? 14 days no questions (Playbook + Decision Tracker) or 30 days
(Annual Review + Multi-State Planner). Email and you'll get refunded
same business day.

FREE UPDATES through tax year 2028. When IRS publishes new limits each
November, I'll re-publish this template — you can re-download from your
Gumroad library any time.

Thanks for supporting an indie tax-tool builder. The free Mathstub
calculators this template is built around live at https://mathstub.com.
```

## Pricing rationale (2026-05-21 reprice)

**Path A: launch impulse-buy, raise on social proof.**

| Old | New | Why |
|---|---|---|
| n/a | $19 | Year-End Playbook: 27-deadline calendar + ICS export + cookbook + FAQ + CPA brief. Impulse-buy ceiling. |
| n/a | $29 | Decision Tracker: 4-year projection + RSU basis fix + cookbook + glossary. "I'll definitely use this." |
| n/a | $39 | Annual Review: 90-min framework for $200k+ earners. "I'm finally going to do this." |
| n/a | $49 | Multi-State Planner: most niche but highest pain. Bundles up sharpest with the Decision Tracker. |

Bundle: turn on Gumroad's 4-product bundle at **$99** ($136 → $99, save $37) after the first single-product sale.

**Raise the ladder to $29 / $49 / $79 / $79 once 10+ purchases of social proof exist.** The new content (cookbook recipes, FAQ, glossary, CSV companions, TL;DR cards) supports the higher tier — buyers just need to trust the brand first.

## Distribution beyond Gumroad

| Channel | Action |
|---|---|
| **Notion Marketplace** | Submit free "Lite" version (RSU-only Decision Tracker, no §A/§B/§C/§D) as funnel → upsell to Gumroad paid. |
| **Etsy** | List Year-End Playbook ($29) — gift-able. |
| **Prototion** | One bundle listing test. |
| **Mathstub footer + calculator pages** | Already in production. Highest-leverage channel. |
| **Reddit** (r/fatFIRE, r/cscareerquestions, r/personalfinance) | Posts from Earth-owned account when a redditor asks a relevant question. Not spam — be the answer + link as resource. |
| **HN Show HN** | When the 4th template ships, single Show HN post linking the whole suite. |
