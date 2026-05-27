# Mathstub agent skills

Skill library imported 2026-05-26 from three curated open-source skill collections, triaged for relevance to Mathstub (Next.js tax calculator site + content site + Notion product line). Each skill is a self-contained Markdown bundle Claude Code (or any compatible agent) can invoke either explicitly (`/<skill>`) or via natural-language trigger phrases described in each `SKILL.md` front-matter `description` field.

## When to invoke (Mathstub-mapped)

| Skill | When | Maps to CLAUDE.md convention |
|---|---|---|
| **karpathy-guidelines** | Every coding session (universal). Reduces overcomplication, surgical changes, goal-driven loops. | "Math is sacred — cross-check before shipping" + "surgical changes" + "pre-revenue priority filter" |
| **tdd** | Before adding any new `lib/tax/<topic>.ts` calc module. Red-green-refactor, vertical slices, no horizontal test-then-impl. | "Pure tax math lives in `lib/tax/`" + Vitest test discipline (556 tests across 24 files) |
| **diagnose** | Bug or unexpected result in a calc (e.g., the AMT $50k boundary case from PR #58). Build a feedback loop FIRST. | "Coverage must include zero, negative, very large, year-boundary, rounding edge cases" |
| **debug-mantra** | Shorter companion to `diagnose` — 4-step mantra. Reach for this when a bug is small/medium; reach for `diagnose` when it's hard. | Same lesson 1 as above |
| **post-mortem** | After a real bug fix lands (e.g., the Vercel build break in PR #52, the AdSense rejection rehab). Engineer-audience writeup. | "Verify before retracting" + future-you needs the record |
| **scrutinize** | Pre-merge sanity check on any new PR — does the change do what it claims? Is there a simpler path? | "Push back when wrong; don't yes-agree" + "Pre-revenue priority filter" |
| **handoff** | End-of-session memory dump for the next agent. Use after multi-PR runs (e.g., this session shipped 21 PRs — handoff doc would summarise for next-session pickup). | Our existing CLAUDE.md + AGENTS.md + OVERNIGHT_PLAN.md sync pattern |
| **zoom-out** | When you don't know an area of code well. "Go up a layer of abstraction; give me a map." | When agents need orientation on a calc subsystem they haven't touched |
| **write-a-skill** | When you notice a Mathstub-specific workflow that repeats (e.g., "ship a new calc" has a defined 5-step recipe in CLAUDE.md — could be a `ship-calc` skill). | Meta — captures `/ship-calc`, `/release-blog-post`, etc. |
| **improve-codebase-architecture** | When considering a refactor. Surfaces deep-module opportunities. Less relevant for small changes; reach for it during quarterly reviews. | Aligns with the calc-module convention (deep, testable interfaces in `lib/tax/`) |
| **caveman** | Earth prefers brief responses. Invoke with `/caveman` for ultra-terse mode. | "End-of-turn: short status + what's next. No long summaries." |

## Mathstub-specific skills to consider authoring (use `write-a-skill`)

These would be Mathstub-native skills built on top of the imported ones:

- **`/ship-calc <slug>`** — packages the 5-step calc-ship recipe from CLAUDE.md (entry in `lib/tools.ts` + `app/<slug>/page.tsx` + `app/<slug>/<Name>Calculator.tsx` + `content/<slug>.ts` + `lib/<topic>/` + `tests/tax/<topic>.test.ts`) into a single skill invocation. Reads SEO research backlog and asks which item to build.
- **`/release-blog-post`** — packages the blog-post recipe (post file + registry import + category assignment + relations entry + affiliate offer ID validation) into one skill. Cross-checks against `lib/affiliates.ts` (the guard from PR #52).
- **`/seo-research`** — invokes the nimble-researcher pattern from PR #56's SEO research pass. Pulls People Also Ask + competitive gap analysis for a topic cluster. Returns ranked backlog.
- **`/memory-sync`** — codifies the CLAUDE.md / AGENTS.md / OVERNIGHT_PLAN.md sync pattern we use at end of each multi-PR session.
- **`/adsense-check`** — runs the noindex audit + "Pending CPA review" grep + thin-content scan from the AdSense rehab (PR #53). Returns any new low-value-content signals introduced since last check.
- **`/gumroad-asset-refresh`** — regenerates cover.png + trust media + reminds Earth to drag-drop to Gumroad. Skips the upload (we cannot push to Gumroad — safety rule).

## Attribution

Skills imported from these public repositories (all MIT-licensed unless noted in individual SKILL.md):

- `karpathy-guidelines/` — [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills) (derived from Andrej Karpathy's observations on LLM coding pitfalls)
- `tdd/`, `diagnose/`, `improve-codebase-architecture/`, `zoom-out/`, `handoff/`, `write-a-skill/`, `caveman/` — [mattpocock/skills](https://github.com/mattpocock/skills)
- `post-mortem/`, `scrutinize/`, `debug-mantra/` — [thananon/9arm-skills](https://github.com/thananon/9arm-skills)

Skills NOT imported (with reason):
- `mattpocock/skills/engineering/to-prd` — requires GitHub Issues triage-label vocabulary we don't maintain
- `mattpocock/skills/engineering/to-issues` — same; we use direct PRs instead of issue-first flow
- `mattpocock/skills/engineering/triage` — overlaps with `diagnose`
- `mattpocock/skills/engineering/prototype` — our flow ships behind PRs, not prototypes
- `mattpocock/skills/engineering/grill-with-docs` — useful but lower priority for v1
- `mattpocock/skills/productivity/grill-me` — interview-prep, not Mathstub-relevant
- `9arm/skills/productivity/management-talk` — Earth is solo founder, no management to report up to

## Skill discovery in Claude Code

These skills are auto-discovered by Claude Code from `.claude/skills/<name>/SKILL.md` because the project is opened in Claude Code. Each `SKILL.md` has YAML front-matter declaring its `name` and `description` — the description's trigger phrases tell the agent when to invoke automatically (e.g., "use when user says 'debug this' / 'diagnose this'").

To invoke explicitly: `/karpathy-guidelines`, `/diagnose`, `/post-mortem`, etc.

To check what's available: `ls .claude/skills/`
