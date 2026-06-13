# Backlink playbook — every form, ranked, honest (2026-06-13)

> Earth asked: "what about off-page SEO — DR / DA / TF — and backlinks for every form possible?"
> This is the complete map. Read the metrics reality first; it changes how you should think about the rest.

---

## 0. DR / DA / TF — what they actually are (read this first)

- **DR** = Domain Rating (Ahrefs). **DA** = Domain Authority (Moz). **TF** = Trust Flow (Majestic).
- **None of them are Google metrics.** Google does not use DR, DA, or TF. They are *third-party
  estimates* of how strong your backlink profile looks, on a 0-100 log scale. They're useful as a
  rough **proxy** to compare sites, nothing more.
- **They are lagging indicators, not levers.** You don't "do" DR. You earn links; DR/DA/TF rise
  *afterward*, slowly. A 2-month-old site like ours is almost certainly **DR 0-3 / DA 1-5** right
  now, and that's completely normal — it cannot be rushed in weeks.
- **The trap:** because these scores feel like a video-game number, people try to pump them with
  cheap/bought links (Fiverr "DA50 backlinks," PBNs, link farms). That inflates the score briefly
  and risks a Google penalty that tanks real rankings. **Never buy links to move a score.**
- **The right mental model:** chase *real* links (referral traffic + topical relevance). DR/DA/TF
  follow on their own. The goal is rankings + clicks + AI citations, not a vanity number.

**How to check ours (free, ~5 min, your login):**
- **Ahrefs Webmaster Tools** (ahrefs.com/webmaster-tools) — free for a verified site; shows DR +
  full backlink list. Best free option.
- **Moz** free DA checker (moz.com/domain-analysis) — a few free lookups/day.
- Expect low numbers today. Re-check quarterly to see the trend, not the absolute.

---

## 1. The backlink forms — every type, safe vs avoid

Ranked by value-for-a-young-site. "Dofollow" passes ranking signal; "nofollow" still helps via
referral traffic, AI citations, and a *natural-looking* profile (a 100% dofollow profile looks fake).

### ✅ TIER A — earned editorial links (highest value, mostly dofollow)
The links Google trusts most: a real site chose to link you in its content.
1. **Journalist quotes** — Featured.com, Qwoted, Source of Sources. A used quote = a dofollow link
   from a real news/finance domain. *(Turnkey in `expert-source-pack.md`.)* Best authority-per-effort.
2. **Resource-page links** — get added to "tax resources / tools we like" pages on CPA, advisor,
   and startup-equity blogs. *(Search operators + email template in `expert-source-pack.md`.)*
3. **Guest posts** — write one genuinely useful article for an equity-comp / personal-finance blog
   with a contextual link back. Higher effort; one good placement beats fifty directory links.
4. **"Linkable asset" citations** — our `/blog/2026-equity-comp-tax-numbers` reference page is the
   kind of thing other writers cite when they need a number. The more authoritative reference pages
   we have, the more we get cited naturally.

### ✅ TIER B — contextual / widget links (dofollow, permanent)
5. **Embeddable calculator** — sites that embed `/embed/rsu-shortfall` give a permanent in-context
   link. *(Pitch in `expert-source-pack.md`.)* Build more embeds = more linkable surface.
6. **Tool/AI directories** — Future Tools + The Next AI are free **dofollow**; the rest are nofollow
   but scraped by AI engines. *(Turnkey in `directory-submission-pack.md`.)*

### ✅ TIER C — foundational profile / citation links (mostly nofollow, do-once)
Every legit site has these. They won't rocket your DR, but they build a **natural baseline profile**,
many send referral traffic, and several are read by AI engines + Google's Knowledge Graph. See the
turnkey checklist in §2. (Note: I can't *create accounts* for you — that's a hard line — but the list
is paste-ready.)

### ✅ TIER D — community / Q&A links (nofollow, referral + AI-citation gold)
7. **Reddit / Bogleheads / Blind / Quora / Stack Exchange / Hacker News** — nofollow, but Reddit
   alone is ~24% of Perplexity's citations. Real traffic + becomes the source AI quotes.
   *(Approach + drafts in `traffic-growth-plan-2026-06.md` §1C and the `reddit-*.md` files.)*

### ✅ TIER E — smart link-prospecting (find links that already exist for competitors)
8. **Competitor backlink replication** — in Ahrefs Webmaster Tools (free) or a free backlink checker,
   look up who links to TurboTax's RSU articles, Carta's guides, Secfi, etc. Many are resource pages
   and "best calculators" roundups you can pitch too. This is the single most efficient way to find
   *real, gettable* links — you're copying a proven profile, not guessing.
9. **Unlinked brand mentions → links** — once we have any traction, set a free Google Alert for
   "Mathstub." When someone mentions us without linking, email and ask for the link. Easiest link there is.

### ❌ AVOID — penalty risk, do NOT do (these LOWER real rankings)
- Bought links / "DA50 backlinks" gigs / PBNs / link farms / link exchanges at scale.
- Blog-comment spam, forum-signature spam, mass "web 2.0" profile spam.
- The 400+/500+ bulk directory blasts (low-quality, Google ignores or distrusts them).
- Anything promising "1000 backlinks for $5." All of it is the fast way to a manual penalty.

---

## 2. Foundational profile-link checklist (do-once, ~1 sitting — your logins)

Create/claim each with a link to **https://www.mathstub.com**. These are the legitimate high-trust
profiles every real brand has. *(You create the accounts; I can pre-write any bios on request.)*

| Profile | Where | Link type | Note |
|---|---|---|---|
| **Crunchbase** | crunchbase.com (add a company) | nofollow, high-trust | Feeds Wikidata/Knowledge Graph credibility |
| **LinkedIn Company Page** | linkedin.com/company/setup | nofollow | Trust signal; also a distribution channel |
| **X / Twitter** | x.com | nofollow | Put the URL in bio |
| **GitHub (org or profile)** | github.com | nofollow, high DA | Link in bio; optionally publish the embed snippet as a public repo |
| **Product Hunt** | ✅ already live | nofollow | producthunt.com/products/mathstub |
| **Indie Hackers** | indiehackers.com | nofollow | Product page + a milestone post |
| **Gumroad store** | already exists | — | Make sure the store links back to mathstub.com |
| **Notion gallery** | notion.so/templates | nofollow | List the free lead-magnet (`marketing/notion-free-magnet/`) |
| **Crozdesk / SaaSHub / AlternativeTo** | see directory pack | nofollow | Software-discovery DBs |
| **About.me** | about.me | dofollow | Simple personal/brand page |
| **Wikidata** | wikidata.org | structured | Do after Crunchbase/PH exist (they do) — see directory pack |
| **Reddit profile** | reddit.com (your account) | nofollow | Add website to profile |
| **Medium / dev.to** | medium.com, dev.to | nofollow | For syndicating guides (canonical to us) |

> Most are nofollow. That's fine and expected — a healthy backlink profile is *mostly* nofollow with
> a minority of earned dofollow editorial links (Tier A/B). Chasing 100% dofollow is itself a red flag.

---

## 3. Realistic timeline + what "good" looks like

- **Now (month 2):** DR ~0-3. Goal = get the *foundational* profile links (§2) in place + start the
  Tier A earned links (HARO-successor profiles live, 1-2 resource-page wins).
- **Months 3-6:** DR creeping to ~5-15 *if* a few editorial/resource links land. A handful of quality
  links matters far more than volume.
- **The honest constraint:** off-page authority is the *slowest* lever — it's earned over months, not
  bought in a week. It compounds with the indexing + content work, it doesn't replace it.
- **Priority order if time-boxed:** (1) Tier A journalist + resource links, (2) the §2 foundational
  profiles (one sitting), (3) competitor-backlink replication, (4) everything else.

> One-line summary: **don't chase the DR/DA/TF number — earn a small number of real, relevant links
> and the number follows. Never pay to inflate it.**
