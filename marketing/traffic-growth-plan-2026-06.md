# Mathstub traffic-growth plan — master roadmap (2026-06-13)

> Goal: every realistic way to grow traffic, ranked by leverage, for a 2-month-old
> low-authority site, **hands-off owner**, budget **~$10 (treat as $0)**.
> Honest bottom line up front: **$10 buys nothing useful in paid marketing.** Keep it.
> Every lever below is free. The real currency here is a few one-time sittings, not cash.

---

## The one honest sentence

The site is well-built and the math is correct. The **only** thing missing is *discovery* —
Google sandboxes new domains for months, so the job for the next stretch is to get
**other trusted places** (AI engines, Reddit, directories, news quotes) to point at us
**while** Google slowly warms up. That's it. Traffic = being where people (and AI) already look.

---

## Tier 0 — the 3 login-gated clicks (ONLY you can do, ~15 min total)

These are unchanged and still the highest-value actions. Full steps in
**`marketing/earth-unblock-checklist.md`**. Summary:

1. **Google Search Console** — add `https://www.mathstub.com`, submit `sitemap.xml`, request indexing on the homepage + top 5 calcs. *The single biggest lever.*
2. **Vercel** — set `NEXT_PUBLIC_SITE_URL=https://www.mathstub.com` + confirm apex→www is a permanent (308) redirect.
3. **AdSense** — click "Request review" (the 2-week rehab soak has passed).

Nothing below matters as much as #1. Do it first.

---

## Tier 1 — highest leverage, free, one-time (the new wins from research)

### 1A. Become an "expert source" → real news/finance backlinks · ~30 min setup, then 10 min/week
The **only** way a 2-month-old site earns links from *high-authority* sites without paying.
HARO shut down; these are the live 2026 successors. Sign up as a **source** (free):
- **Featured.com** — featured.com
- **Qwoted** — qwoted.com
- **Source of Sources** — sourceofsources.com

Then ~10 min/week: scan the emailed journalist queries for "RSU / equity comp / stock options / tax,"
reply with a sharp 3-sentence answer. A used quote = a dofollow link from a real news/finance site.
**Turnkey profile bio + 3 ready-to-send sample answers are in `marketing/expert-source-pack.md`.**
*(This is the one ongoing-ish task, but it's 10 min/week and fits "no daily posting.")*

### 1B. Directory listings → AI-citation footprint + 2 dofollow links · ~2 hr, submit-once
AI engines (ChatGPT, Perplexity) scrape these directories when recommending tools, so a listing
keeps paying off long after you submit. **Turnkey paste-in copy for every one is in
`marketing/directory-submission-pack.md`.** Priority order:
1. **Future Tools** (futuretools.io) — free, **dofollow**, high authority. Best single pick.
2. **The Next AI** (thenextai.com) — free, **dofollow**.
3. ~~Product Hunt~~ — ✅ **already live** at producthunt.com/products/mathstub (launched May 2026).
4. **AlternativeTo** (alternativeto.net) — list as a free alternative to TurboTax/SmartAsset.
5. **SaaSHub** (saashub.com), **There's An AI For That** (theresanaiforthat.com), **Futurepedia** (futurepedia.io).

> Skip the "submit to 400+ directories" lists and Fiverr gigs — they're spam, Google ignores them,
> and they can hurt us. Cherry-pick only the named sites above.

### 1C. One community-answer sitting → traffic NOW + becomes the source AI quotes · ~2-3 hr, one-time
Biggest 2026 finding: **Reddit is ~24% of all Perplexity citations and ~44% of Google AI-Overview
social citations.** So a genuinely helpful Reddit answer does double duty: real referral clicks today,
and it becomes the thing ChatGPT/Perplexity quote tomorrow. Drafts already written in this folder
(`reddit-r-personalfinance-*.md`, `reddit-r-bogleheads-espp.md`, `reddit-r-cscareerquestions-iso.md`,
`hackernews-show-hn.md`). The rule everywhere: **be the most helpful answer; link only where it
literally solves that person's exact problem.** Best venues for our audience:
- Subreddits: **r/RSU, r/stockoptions, r/tax** (friendliest), then r/fatFIRE, r/cscareerquestions, r/personalfinance.
- **Bogleheads.org** forum — rules *explicitly allow* linking your own relevant page inside a reply to someone else's thread (never start a promo thread).
- **Blind (teamblind.com)** + **Fishbowl** — anonymous verified tech employees; equity-comp talk is the core content. Highest audience-match anywhere.

---

## Tier 2 — worth doing, free (medium effort)

- **Wikidata item for Mathstub** (wikidata.org → Create new Item) — feeds Google's Knowledge Graph + read by AI engines. *Do this AFTER the Product Hunt listing exists*, so it has a credibility source and isn't deleted. (Do NOT add our link to Wikipedia — policy forbids self-links; it gets reverted and flags us.)
- **Resource-page outreach** — Google `inurl:resources "equity compensation"` / `intitle:resources "RSU tax"`, email CPA / fee-only-advisor / startup-equity blogs offering our free calculator for their resources page. One evening; a few links land. *(Pitch template in `expert-source-pack.md`.)*
- **Embeddable calculator outreach** — we already ship an embeddable RSU calculator (`/embed/rsu-shortfall`). Offer the iframe to advisor/CPA blogs; each embed is a permanent in-context backlink. Claude can build more embeds on request.
- **Syndicate, don't re-create** — repost 2-3 of the strongest guides on Medium / LinkedIn / dev.to with a `rel=canonical` back to mathstub.com. One-time, reaches their audiences without splitting SEO credit.

---

## Tier 3 — on-site GEO tuning (Claude's job, no login needed)

Cheap on-page changes that lift AI-citation odds for a young niche site (research: +30-40%):
- **Surface "2026" in calc titles/H1s** — AI Overviews cite current-year content ~30% more.
- **Lead every page with one extractable, self-contained sentence** (we have QuickAnswer blocks — keep them one quotable sentence with the number/rule in it).
- **One hard stat + one citation per section** — both measurably raise AI visibility. We already cite IRS Pubs; keep the density.
- **"X vs Y" comparison pages** get cited disproportionately by AI. We have a few; more (anchored to real search demand) are good future builds.

> Status: most of this is already done this session (QuickAnswer, year-aware copy, schema, llms.txt,
> IndexNow). Remaining tuning is incremental — Claude will fold "2026" prominence into titles on the
> next content pass rather than churn all pages now.

---

## Explicitly NOT doing (honest no-list)
- **Paid ads** — $10 can't sustain them; managing them conflicts with hands-off.
- **Buying backlinks / PBNs / 400-directory blasts** — Google-penalty risk.
- **Wikipedia self-linking** — reverted + flags us.
- **awesome-fintech GitHub PRs** — open-source-only; our calcs are closed, we don't qualify.
- **Faceless YouTube/TikTok, paid newsletter placements** — ruled out previously, still out.

---

## Tier 4 — timing + flywheel (compounding, not one-off)

- **Seasonal calendar** — search demand for this niche is wildly seasonal. Front-load effort here:
  - **Late Dec → mid-Jan:** year-end + "how much tax on my RSU vest" spikes. Push the year-end checklist + estimated-tax content.
  - **Feb → April 15:** peak filing season — the single biggest traffic window. The cost-basis / 1099-B / "taxed twice" posts earn the most then.
  - **IPO/lockup events:** when a big tech IPO unlocks, the double-trigger RSU content is timely — worth a Reddit answer in the relevant company's threads.
  - Practical takeaway: it's June, so the next big wave is ~6 months out. Use the quiet months to get **indexed and listed** (Tiers 0-1) so we're already ranking when the wave hits.
- **Cross-asset flywheel** — we have 5 assets that can feed each other for free:
  - Chrome extension (in-store search is its own discovery channel) → links back to the calcs.
  - **Free Notion lead-magnet** (drafted in `marketing/notion-free-magnet/`) → list it on the Notion gallery + Gumroad ($0) as a traffic/email magnet that points to the site.
  - Gumroad product pages → link to the free calcs; the calcs upsell the paid templates.
  - Each listing is a discovery surface AI engines and users can find independently.
- **Email capture = the only owned channel** — every other channel rents attention. The site already has an email-capture box; once a provider is connected (Resend is half-set-up), even a tiny list lets us bring visitors *back* (e.g. a once-a-year "tax season is here" nudge — that's hands-off, not a newsletter grind). Lower priority than getting traffic in the first place, but it's the thing that makes traffic compound instead of leak.

---

## If you only do 3 things this week
1. **Tier 0 #1 — Google Search Console** (7 min, the master key).
2. **Tier 1B — submit to Future Tools + The Next AI** (the 2 free dofollow dirs; Product Hunt is already live). ~30 min.
3. **Tier 1C — one Reddit/Blind helpful-answer sitting** (the only thing that brings traffic *today*).

Everything else compounds on top of those.
