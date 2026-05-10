# Notion templates — packaging + Gumroad submission

Three Gumroad-ready Notion templates that pair with the [Mathstub](https://mathstub.com) calculator suite.

| Template | Price | Source | Cover |
|---|---|---|---|
| Equity Comp Tracker | $29 | [equity-comp-tracker/template.md](./equity-comp-tracker/template.md) | [cover.png](./equity-comp-tracker/cover.png) |
| Year-End Tax Checklist + Calculator Workbook | $19 | [year-end-tax-checklist/template.md](./year-end-tax-checklist/template.md) | [cover.png](./year-end-tax-checklist/cover.png) |
| Tech Worker Annual Financial Review | $39 | [tech-worker-annual-review/template.md](./tech-worker-annual-review/template.md) | [cover.png](./tech-worker-annual-review/cover.png) |

## How buyers import

Each template is delivered as a single Markdown file. To import:

1. Create a new page in Notion (any workspace).
2. Click the **`···`** menu (top-right) → **Import** → **Markdown & CSV**.
3. Select the `template.md` file. Notion creates a new page with all sections, tables, headings, and links preserved.
4. (Optional) Convert any of the static markdown tables to Notion **Database** views for filtering. Right-click a table → **Turn into database**. This unlocks views like "RSU vests this year only" or "ESPP lots that became qualifying after Mar 1."

## How to ship a buyer-ready package

For each template directory:

```bash
# From repo root, after editing the template:
npm run notion:images   # regenerates cover.svg + cover.png

# Build a zip the buyer downloads from Gumroad:
cd notion-templates/<template-name>
zip ../<template-name>-package.zip template.md cover.png
```

The buyer-facing zip should contain:
- `template.md` — the Notion-importable markdown
- `cover.png` — the Gumroad cover (also used in the listing)
- A short `README.txt` with the 4 import steps above

## Gumroad submission checklist

For each template, in the Gumroad creator dashboard:

1. **Create product** → Digital product → name + URL slug.
2. **Cover image:** upload `cover.png` (1280×720). Set as primary.
3. **Price:** set per the listing (`$29 / $19 / $39`).
4. **Description:** copy from `<template>/listing.md` → "Long description" section. Markdown supported.
5. **Files:** upload the buyer-facing zip described above.
6. **Custom fields:** set "Notion" / "Tax" / "Tech worker" tags as listed in `listing.md`.
7. **Refund policy:** 14-day no-questions per the listing copy.
8. **Custom thank-you message:**
   ```
   Thanks for supporting Mathstub! To import:
   1. Open the template.md file from your download.
   2. In Notion, create a new page → ··· → Import → Markdown & CSV.
   3. Select template.md.
   That's it. Bug reports / questions: reply to this email.
   ```
9. **Publish** → toggle public.
10. After publish, copy the Gumroad URL into [content/blog/posts](../content/blog/posts) for cross-link from Mathstub blog posts.

## Updating the templates

When IRS limits / tax rules change (typically once a year in November):
- Update the relevant calculator pages in `app/`.
- The Mathstub deep links in the templates don't change — they always point at the latest live version.
- Re-publish the template only if you've added new sections or fixed material errors.

## Cross-promotion

Each template links to the others by Gumroad URL. After the first one publishes:
1. Note the Gumroad URL.
2. Update the other two templates' "Companion" lines (find the `gumroad.com/` placeholders in the listings and templates) with the real URLs.
3. Re-zip + re-upload.

## Pricing notes

These prices follow the `$19 / $29 / $39` Gumroad sweet spot:
- $19 — single-purpose checklist; impulse buy.
- $29 — multi-tool tracker; "I'll definitely use this."
- $39 — comprehensive review; "I'm finally going to get my finances together."

Bundle pricing (offer all 3 for $69) is supported in Gumroad; consider after launch when one template clearly out-sells the others.
