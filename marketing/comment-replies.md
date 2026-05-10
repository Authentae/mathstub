# Comment reply playbook — HN, PH, Reddit

When a comment lands during launch, search this file by the first 3 words of the question pattern, copy the matching reply, edit if needed, post.

**Tone rules:**
- Calm, factual, no marketing language
- Admit what you don't know
- Cite IRS Pub# or IRC § when it's a tax-math question
- Never claim CPA credentials
- "I built this" is fine; "we" is not (you're solo)
- Length: short on HN (1–3 sentences usually), medium on PH (3–5 sentences)

---

## 1. "Are you a CPA?" / "Is this CPA-reviewed?"

> No, I'm not a CPA — the calculator is a planning estimate, not tax advice, and every page says so. The math itself comes from IRS publications (Pub 505 for withholding, Pub 936/925 for AMT, IRC §3402(g) for supplemental withholding) which are public domain. For real-money decisions you should still talk to a CPA who specializes in equity comp.

**Variant — short HN version:**

> Not a CPA. It's a planning tool, not tax advice. The math is straight from IRS publications (Pub 505, IRC §3402(g), Form 6251). For real decisions, talk to someone licensed.

---

## 2. "How is this different from TurboTax / TaxAct / Carta?"

> Different point in the workflow:
>
> - **TurboTax / TaxAct** are filing software — they answer "what do I owe in April" after the year is over.
> - **Carta** is for cap-table management — their tax tools are gated behind their login and are tied to your employer's account.
> - **Mathstub** is for *during* the year — figuring out the withholding gap or AMT exposure *before* you file, so you can fix it. Free, no signup, runs in your browser.
>
> Once you've used Mathstub to plan, you still file with TurboTax/TaxAct. They're complementary, not competitive.

---

## 3. "Why not open-source it?"

> The plan is to put the tax modules on GitHub once I've stress-tested through one more tax season. Right now the math is in `lib/tax/` with 99.76% test coverage, but I want to refactor it for readability before public eyes. There's no business reason to keep it closed — calculators that work consistently across tools are good for everyone.

---

## 4. "Is this an ad / promo?"

> Yes — I built it. It's free, ad-supported (AdSense queue) on the rest of the site. I'm not gating anything behind email or signup. The math is public domain, the post is meant to be useful whether you click or not. Mods, if you'd rather I drop the link and keep the educational post, happy to.

---

## 5. "What about [specific edge case]?" — RSU $1M crossover

> The calc handles the $1M YTD supplemental wage threshold — it blends 22% on the portion below $1M and 37% above per IRC §3402(g)(1)(A). Try entering YTD supplemental wages above $1M and you'll see the marginal rate switch.

## 5b. "What about [edge case]?" — Multi-state / RSU vest mid-year move

> Multi-state apportionment isn't modeled in v1 — too many edge cases (workdays-based vs grant-to-vest, source-state laws, residency definitions all vary). State coverage is single-state-resident only. For a multi-state move, you'll want a CPA who's done equity-comp before. Common ones to ask about: CA→TX moves where CA still claims grant-to-vest source income, or NY's 14-day rule.

## 5c. "What about [edge case]?" — Disqualifying ISO disposition

> The ISO calculator handles two paths: exercise-and-hold (AMT preference) and exercise-and-sell-same-year (disqualifying disposition → ordinary income). For mid-cycle disqualification (held >1 year from exercise but <2 years from grant), the holding-period split is more nuanced — that's a "talk to your CPA" case. v1 covers the two extremes most people actually face.

## 5d. "What about [edge case]?" — 83(b) elections / RSAs / NQDCs

> Not modeled in v1. The site covers RSU, ESPP §423, ISO §422, NSO §83, bonus, and quarterly estimated tax. RSAs with 83(b) elections and NQDC plans each have their own code path that doesn't share a lot of code with these. They're on the roadmap but not soon.

---

## 6. "I tried it and the math is wrong" / "Got an unexpected result"

> Can you share the exact inputs (RSU vest amount, YTD wages, filing status, state, pre-tax deductions) and what you expected vs what the calc returned? I'll reproduce it. If the math's wrong I want to fix it before launch — happy to put a note on the page if a specific case is mismodeled. The math comes from IRS Pub 505 + state publications, but I might be missing an edge case.

---

## 7. "Will you support [country other than US]?"

> Probably not — the math is heavily US-specific (IRS publications, state-by-state nuance, FICA/SS thresholds, AMT). Localizing to UK/Canada/EU would be a different product, not a feature. Sorry. There are local tools — UK has [HMRC PAYE calculators](https://www.gov.uk/check-income-tax) for similar use cases.

---

## 8. "Privacy — does my data leave the browser?"

> No. All calculators run client-side in your browser. There's no backend that receives the inputs, no logging of values, no analytics on form fields. The page itself loads from Vercel + has Vercel Analytics for page views (which Vercel doesn't tie to a user). The site has ads (AdSense once approved) but those run in iframes that don't see your inputs.

---

## 9. "How do you make money if it's free?"

> Three ways, listed in order of expected revenue:
>
> 1. **AdSense** on blog and category pages (in review queue right now)
> 2. **Affiliate links** to TurboTax, TaxAct, Carta, Empower at the "now go file" step
> 3. **Notion templates** on Gumroad — "track-your-equity-comp-all-year" deeper-dive workbooks at $19/$29/$39
>
> The calculators themselves stay free forever. No paywall, no signup wall, no email gate.

---

## 10. "What's your tech stack?"

> Next.js 15 + React 19 + TypeScript + Tailwind + Vitest. Tax math lives in `lib/tax/` as pure functions (no React/DOM imports) so it's portable to a future Chrome extension and Anthropic Skill. 213 tests, 99.76% coverage on the calc layer because the math has to be right. Hosted on Vercel. Domain on Cloudflare Registrar.

---

## 11. "I'm a CPA — these numbers look reasonable" / Positive

> Thanks — feedback loop on calc accuracy is exactly what I'm looking for at this stage. If you spot anything that looks off when you run real client numbers through it, please let me know. The hard cases I haven't fully handled: NQDC plan deferrals, multi-state apportionment with grant-to-vest sourcing, and 83(b) elections on RSAs. Those are the ones I'd most want a real CPA's eye on.

---

## 12. "Can you add a feature for [X]?"

> Logged. The roadmap right now is: 83(b) for RSAs, multi-state for tech-worker moves (CA→TX especially), AMT credit recovery scheduling, and an annual review wizard that walks the whole year. If your request matches one of those, expect it within ~2 months. If it's a new path, depends on how many other people ask for the same thing.

---

## 13. "What about NSOs?"

> Live at mathstub.com/nso-exercise. Same flat 22% supplemental withholding as RSUs but on the bargain element (FMV − strike) × shares. The calc handles federal marginal-rate shortfall, FICA (which applies to NSOs unlike ISOs), and state.

---

## 14. "California specifically — does this handle [X]?"

> California has the most attention because it's where most tech workers are. The calc handles: CA's 10.23% supplemental withholding rate, CA AMT (Schedule P 540), the 1% mental health surtax above $1M, and CA's 13.3% top marginal. Not handled: CA→other-state apportionment for partial-year residency, or RSU sourced to CA work-days during a move. Those are full-CPA cases.

---

## 15. "I have AMT credit from a past year — when can I use it?"

> The AMT credit (IRC §53) is a "Minimum Tax Credit" — you can use it in any future year where your regular tax exceeds your tentative minimum tax (i.e., you're NOT in AMT that year). For most people, that's the first non-AMT year after the big exercise. The recovery is gradual; on average people recover over 1–5 years depending on income trajectory. Form 8801 is the tracker. The current Mathstub ISO calc shows the AMT credit generated; an AMT-credit-recovery scheduling calc is on the v2 roadmap.

---

## 16. "Why launch as a tax tool? Tax is boring"

> Tax is boring AND high-stakes — that's why the tool gets used. People don't get excited about it; they panic about it in March. The "boring" framing is a feature, not a bug — boring + correct + free wins this niche. The exciting calculators (crypto-tax, NFT-tax, web3) are crowded and the audiences churn. Equity-comp tax for tech workers is a stable, recurring, high-value problem.

---

## 17. "I don't trust an AI for tax math"

> The math itself isn't AI — it's pure functions in TypeScript that follow IRS publications line-by-line, with 213 unit tests covering edge cases (zero, negative, year-boundaries, $1M threshold, AMT exemption phaseout). No LLM in the calculation path. AI was used for things like writing this comment and the blog posts, but the calculator output is fully deterministic and traceable to specific IRC sections. Disclaimers everywhere note this is a planning estimate, not advice.

---

## 18. "Show me the source code"

> Tax modules will go up on GitHub once I've stress-tested through tax season 2026 — I want to refactor for readability before public eyes. Until then: the math is from IRS Pub 505, Pub 936, IRC §§422/423/56/3402(g), Form 6251 instructions, and state revenue dept publications. All citations are linked from the relevant calculator pages so you can verify any specific calculation against its source.

---

## Don't reply to / mute patterns

- Pure trolls / "this is shit" with no specifics → ignore
- People posting their own competitor link → don't engage publicly, downvote/flag if obvious spam
- "Add me on LinkedIn" → ignore
- Anyone offering to "boost" the launch with paid services → ignore + report (PH bans for paid promotion)
