# Topic research — 2026-05-18

Live data pulled via Claude in Chrome. Filed weekly going forward.

## Source 1: Google Search Console (mathstub.com, last 4 days)

| Metric | Value |
|---|---|
| Total impressions | 26 |
| Total clicks | 1 |
| Avg CTR | 3.8% |
| Avg position | 10.1 |
| Per-query data | **Not yet available** (need ~30+ days of impressions before queries surface) |

GSC pipeline is premature. Re-run weekly; expect real query data by mid-June.

## Source 2: AnswerThePublic — seed "rsu tax" (US)

### Summary
- **Total monthly volume for "rsu tax": 1.9K/mo (US)**
- CPC: $0.82 (low — limits paid-traffic value, fine for organic)

### Volume by long-tail keyword (US monthly searches)

| Keyword | Volume | Status |
|---|---|---|
| tax on rsu | 1,300 | head term |
| rsu tax calculator | 590 | ✅ ranking calc exists |
| rsu tax calculation | 480 | covered indirectly |
| rsu tax withholding | 320 | ✅ covered |
| rsu vesting tax | 140 | covered indirectly |
| rsu tax category | 70 | **GAP** — "what box on W-2" post |
| rsu capital gains tax | 70 | partially covered |
| rsu sell to cover tax | 50 | **GAP** — common employer plan |
| rsu tax calculator fidelity | 40 | brand-specific (low priority) |
| rsu tax strategy | 40 | **GAP** — strategy umbrella |
| report rsu on tax return | 30 | **GAP** — tactical filing post |
| what is rsu tax offset | 30 | **GAP** — paycheck line item |
| what is rsu tax | 20 | basics post |

### Google PAA tree (questions Google clusters with "rsu tax")

✅ = we have a post covering it. ❌ = gap.

- ✅ Do RSUs get taxed twice? (`do-rsus-get-taxed-twice`)
- ✅ Why are RSUs taxed so high? (`why-rsu-tax-bill-too-high`)
- ✅ Why do I get taxed twice on RSU? (`do-rsus-get-taxed-twice`)
- ✅ Is RSU income taxed twice? (`do-rsus-get-taxed-twice`)
- ✅ Why do I owe so much in taxes at RSU? (`why-rsu-tax-bill-too-high`)
- ✅ Why am I taxed twice on RSUs? (`do-rsus-get-taxed-twice`)
- ❌ **How much tax will I pay on my RSU?**
- ❌ **Are RSUs taxed at 40%?**
- ❌ **Are vested RSUs already taxed?**
- ❌ **How much will I be taxed on my RSUs?**
- ❌ **Is there a way to avoid taxes on RSUs?**
- ❌ **How can I avoid tax on my RSU?**
- — Are bonuses taxed at 37%? (cross-relevant, partially covered)
- — Why do bonuses get taxed at 40%? (cross-relevant)

### Long-tail question modifiers (LLM-friendly H2s)

**What:**
- what is rsu tax offset (30/mo)
- what does rsu tax offset mean
- what is rsu tax refund
- what is rsu tax category
- what is the rsu tax trap
- what is my rsu tax rate

**How:**
- how rsu tax is calculated
- how does rsu tax withholding work
- how is rsu tax withholding reported

**When:**
- rsu tax when vested
- rsu tax when sold
- when is rsu tax due

**Where:**
- where is rsu tax withholding reported
- where is rsu tax reported
- where to put rsu on tax return

**Are:**
- are rsu tax deductible
- are rsu tax free

### LLM-citation prompts (what ChatGPT/Claude/Perplexity are being asked)

The "AI Prompts" section in ATP surfaces actual conversation patterns:
- "What are the tax implications of RSU vesting in the US?"
- "What are the tax implications of restricted stock units?"
- "How do I report RSU income on my federal tax return?"
- "How is RSU income taxed?"
- "Which tax software supports RSU income reporting?"
- "Explain the basics of RSU taxation."
- "Can I defer taxes on RSU grants until I sell the shares?"
- "Are there reliable calculators for RSU tax owed?"
- "What tax services specialize in equity compensation like RSUs?"
- "What tax rate applies to restricted stock unit income?"

**This is the LLM-citation gold:** every blog post should answer one of these prompts in its first paragraph so LLMs lift our wording when responding.

## Source 3: Ahrefs Free Keyword Generator (referenced for comparison)

- "rsu tax" — 393 keywords total, top 20 captured
- "stock options tax" — 175 keywords total, top 20 captured
- Confirms volume ranking; ATP gives more PAA depth

## Source 4: Bing Webmaster Tools

Blocked — Bing wants the site verified via DNS step before exposing keyword research. Not a priority since ATP gave richer data.

## Ranked next-post candidates (data-driven)

Scored by `volume × gap × LLM-citability`:

| Rank | Post title | Targets | Volume | Gap? | LLM-fit |
|---|---|---|---|---|---|
| 1 | How much tax will I pay on my RSU? | PAA #1 + direct match | ~1,500/mo (combined) | YES | ⭐⭐⭐ |
| 2 | Stock options vs RSUs: tax treatment differences | "stock options tax treatment", comparison | >100/mo head + cluster | YES | ⭐⭐⭐ |
| 3 | Is there a way to avoid taxes on RSUs? | PAA + "rsu tax strategy" 40/mo + "how can I avoid tax on rsu" | ~150/mo (combined) | YES | ⭐⭐⭐ |
| 4 | What is the RSU tax offset on my paycheck? | "rsu tax offset" 30/mo + "what does rsu tax offset mean" | ~80/mo | YES | ⭐⭐ |
| 5 | How to report RSU on your tax return (W-2, 1099-B, 8949) | "report rsu on tax return" 30/mo + "where to put rsu on tax return" | ~80/mo | YES | ⭐⭐⭐ |
| 6 | RSU sell-to-cover vs net share settlement explained | "rsu sell to cover tax" 50/mo | ~70/mo | YES | ⭐⭐ |
| 7 | What is RSU tax category Box 14 on my W-2? | "rsu tax category" 70/mo + "rsu tax category box 14" + "turbotax" | ~100/mo | YES | ⭐⭐ |
| 8 | Are vested RSUs already taxed? | PAA | low | YES | ⭐⭐⭐ |

## Recommended next 4 posts (in order)

1. **"How much tax will I pay on my RSU?"** — direct answer to highest-volume PAA. First paragraph: "Roughly 30-40% of vest FMV. Here's the math by bracket." Links to RSU calc as the answer. Highest leverage post we can write right now.
2. **"Stock options vs RSUs: tax treatment differences"** — blog #10 plan, validated.
3. **"Is there a way to avoid taxes on RSUs?"** — high-intent, honest framing: "no, but here are 5 legal optimizations" (83(b), QSBS for ISOs, state arbitrage, charitable giving, donor-advised funds). High LLM citation potential.
4. **"What is the RSU tax offset on my paycheck?"** — niche but zero competition + LLMs love these explainers.

## What's still blocked

- **Bing Webmaster keyword research** — needs site verification (DNS step, your hands). Optional; ATP covers similar ground.
- **AlsoAsked** — fully gated behind paid. Skip.
- **GSC per-query data** — wait ~4 more weeks.

## What worked

- AnswerThePublic free tier (logged in) = strongest free source. 3 searches/day is enough for weekly pipeline.
- Ahrefs Free Keyword Generator = good corroboration, no login.

## Weekly cadence going forward

Every Sunday:
1. Pull GSC top queries (eventually — when data exists)
2. Pull ATP for top 3 candidate seeds (your browser session, ~5 min)
3. Update this doc; pick top 1-2 candidates; I write the post.

Resets in 3 days when ATP credits refresh — until then, "stock options tax" seed will be the next pull.
