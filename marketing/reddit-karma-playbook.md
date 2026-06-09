# Reddit karma sprint — 14-day playbook

**Goal:** build 100+ comment karma across r/personalfinance, r/cscareerquestions, r/Bogleheads, and r/tax in 14 days, so the existing launch-post drafts can ship without getting auto-flagged as a brand-new account spamming.

**Why this matters:** Reddit's anti-spam systems (and most subreddit auto-mods) hide or remove posts from accounts that are <30 days old, have <50 comment karma, or have never commented in the target sub before. Without karma, even a perfect post gets buried. With karma + sub history, the same post can hit the front page.

**Time budget:** 20–30 minutes/day for 14 days. Total: ~5 hours over 2 weeks. Single highest-ROI activity on the Mathstub roadmap right now.

---

## The 14-day plan

| Day | Action | Goal |
|---|---|---|
| 1 | Read 10 threads in each target sub. Don't comment. Just learn the voice. | Internalize tone |
| 2 | Comment on 2 threads in r/personalfinance (tax/RSU/equity questions only) | First foothold |
| 3 | Comment on 2 threads in r/cscareerquestions (comp/equity/offer questions) | Cross-sub presence |
| 4 | Comment on 2 threads in r/Bogleheads (any tax-efficiency post) | Bogleheads is higher-bar — go slow |
| 5 | Comment on 3 threads anywhere across the 3 subs | Compounding |
| 6 | Day off. Just lurk. | Avoid algorithmic suspicion |
| 7 | Comment on 3 threads. Optionally answer 1 question with deep math (not linking to Mathstub yet). | Establish expertise |
| 8–13 | Repeat: 2-3 comments/day, mix of subs, mix of short + long. | Sustained presence |
| 14 | Check karma. Should be 100+. Schedule first launch post for Day 15-21. | Ready to launch |

---

## Hard rules

1. **Never link to mathstub.com in a karma-building comment.** Not once. The moment you link, the comment looks like the seed for a future post. Reddit users and mods notice this pattern.
2. **Never comment "I built a tool for this."** Even without a link, this signals promotion intent.
3. **Don't downvote anyone in the target subs.** Mods can see downvote patterns. Stay neutral or positive.
4. **Don't post anything controversial in adjacent political subs from the same account.** Mods cross-check.
5. **Reply to replies on your own comments.** Karma compounds when you engage with people who engaged with you.
6. **Use the same account that will eventually post the launch threads.** Don't build karma on alt + post from main.

---

## Comment templates — pick the one that fits the thread

Each template is designed to: (a) actually be useful to the OP, (b) demonstrate tax expertise, (c) leave breadcrumbs that establish you as someone who knows this stuff — without ever mentioning Mathstub.

### TEMPLATE 1 — "Why is my refund so small / why do I owe?" thread

```
Without seeing your W-2 it's hard to be specific, but the most common cause for tech workers is the supplemental wage withholding rule.

If you got any bonus, RSU vest, or stock comp this year, IRS rule (Pub 15 / IRC §3402(g)) says your employer withholds at a flat 22% federally on those — regardless of your actual bracket. If your marginal rate is 32% or 35%, that 10-15 percentage point gap becomes the surprise bill in April.

Three things to check:
1. Box 1 of your W-2 vs your total comp. The gap is usually pre-tax 401(k) + HSA.
2. Box 2 (fed income tax withheld) divided by Box 1. If that ratio is way below your bracket, you got hit by the 22% supplemental rule.
3. Whether you owe more than $1,000 — that triggers the §6654 underpayment penalty.

Fix forward: update W-4 line 4(c) to add extra withholding per paycheck, or send a Q4 estimated payment by Jan 15.
```

### TEMPLATE 2 — "My RSU just vested, what do I do?" thread

```
Two things matter:

1. Your broker (or your company's broker) probably sold-to-cover at the 22% federal supplemental rate. That's the IRS default per IRC §3402(g), not your actual marginal rate. If you're at 32%+ federal, you're under-withheld on the vest by ~$X per $50k vested.

2. The fix is forward-looking: figure out the gap before December and either (a) add it to W-4 line 4(c), or (b) make a Q4 estimated tax payment by Jan 15.

A few numbers to check:
- Your federal marginal bracket at total taxable income (not gross)
- State supplemental withholding rate (California is 10.23% but CA marginal can be 12.3%+ at your income)
- Whether SS wage base is already maxed (it is for most $200k+ earners, no SS on the vest)

If you don't fix it now, expect a bill at filing plus a ~7% underpayment penalty (IRC §6621; early-2026 rate, 6% from Q2).
```

### TEMPLATE 3 — "Should I exercise my ISOs?" thread

```
The decision has 3 dimensions and only one is "should I":

1. **Will the AMT bite?** Exercise creates AMT income = (FMV − strike) × shares, regardless of whether you sold. Form 6251 walks the calc. If your bargain element is $200k+ and you have no offsetting items, AMT can be $50k-$80k owed in April.

2. **Are you holding for §422 long-term cap gain?** ISOs need >1 year from exercise AND >2 years from grant to qualify. Sell early = disqualifying disposition = ordinary income on the bargain element (no AMT but high tax).

3. **What's your concentration risk?** Pre-IPO equity is single-stock + illiquid. Run the math assuming the stock could be worth $0.

Exercise-and-hold makes sense only if: (a) you can pay AMT in cash without selling, (b) you'd be comfortable holding the same $ value if you were buying on the open market, and (c) the company is past Series B / has actual revenue.

Don't exercise just because options are about to expire. The expiry forcing-function is exactly what the company is counting on.
```

### TEMPLATE 4 — "ESPP — sell immediately or hold?" thread

```
Default answer is sell immediately. Reasons:
- The 15% discount is taxed as W-2 ordinary income on the day you sell, regardless. You're not avoiding tax by holding.
- Concentration risk: you already have RSUs in this stock, ESPP makes it worse.
- The "qualifying disposition" tax break only kicks in if you hold 2 years from offering date AND 1 year from purchase. During that hold you're carrying single-stock risk.

The case for holding (qualifying disposition under IRC §423(c)):
- Your federal marginal rate is 32%+, AND
- ESPP < 10% of liquid net worth, AND
- You'd buy the stock on the open market regardless.

If all three are true, QD saves ~10% of the gain in tax via ordinary→LTCG conversion. If any are false, sell same-day.

What people get wrong: thinking holding "delays" the tax. The discount is taxed in the year of sale, not purchase. Holding doesn't defer anything — it only changes the rate on the gain above the discount.
```

### TEMPLATE 5 — "Do I need to make estimated tax payments?" thread

```
The rule is IRC §6654. You need to pay quarterly estimated tax if you'd owe more than $1,000 at filing AND you haven't met the safe harbor.

Safe harbor = withhold + pay during the year at least:
- 90% of current year's actual tax, OR
- 100% of prior year's total tax (110% if your prior-year AGI was >$150k)

W-2 withholding counts. So most W-2 employees meet safe harbor automatically. You only fall out when:
- Big bonus / RSU vest where 22% supplemental rate is way below your marginal
- Self-employed income
- Capital gains realization
- ISO exercise (AMT)

If you're W-2 only and your withholding is on autopilot: probably fine, check by looking at last year's total tax ÷ this year's expected withholding.

If you're under the threshold, two options: add extra withholding to W-4 line 4(c) (treats it as paid evenly all year), or send a quarterly payment via IRS Direct Pay (counts as paid in the quarter sent — so a Q4 estimate doesn't fix Q1-Q3 shortfall).
```

### TEMPLATE 6 — "What's the difference between ISO and NSO?" thread

```
Three differences that matter at filing time:

**Tax on exercise:**
- ISO: no regular tax. AMT income = bargain element (FMV − strike) × shares, on Form 6251.
- NSO: ordinary income on bargain element, taxed as supplemental wages (22% / 37% federal withholding), reported on W-2.

**Tax on sale:**
- ISO held >1yr from exercise + >2yr from grant = qualifying disposition = LTCG on whole gain above strike.
- ISO sold early = disqualifying disposition = ordinary income on bargain element, then cap gain on anything above FMV at exercise.
- NSO sold = cap gain or loss on (sale − FMV at exercise). Short-term if held <1yr from exercise.

**Limits:**
- ISO: only $100k of FMV-at-grant can vest per year (§422(d)). Excess auto-converts to NSO.
- NSO: no statutory limit. Anyone can be granted them (consultants, board members, etc.).

In practice: ISOs are tax-advantaged on paper but the AMT trap eats most of the advantage for high earners. NSOs are simpler but more expensive.
```

### TEMPLATE 7 — Generic "tax noob, what should I know?" thread

```
Three concepts that account for ~80% of the surprise bills tech workers post about:

1. **Marginal vs effective rate.** Your marginal rate is on the *next* dollar earned (probably 32-37% for FAANG-level comp). Your effective rate is your blended average. People budget at effective, get taxed at marginal on incremental bonuses/vests.

2. **Supplemental withholding rule (IRC §3402(g)).** Bonuses, RSU vests, ESPP, and NSO exercises get withheld at a flat 22% federally regardless of your bracket. Difference between 22% and your marginal = the "April surprise."

3. **Estimated tax safe harbor (IRC §6654).** If you owe more than $1,000 at filing, you owe a penalty unless you paid in either 90% of this year's tax or 100% of last year's (110% if prior AGI > $150k). Most W-2 employees auto-meet safe harbor; equity-heavy comp can break it.

Read IRS Pub 505. It's surprisingly readable. Everything else is footnotes on those three concepts.
```

### TEMPLATE 8 — "California / state tax" thread

```
For California specifically:
- Supplemental wage withholding is 10.23% (one of the highest)
- Top marginal is 12.3% + 1% mental-health surtax above $1M = 13.3%
- AMT exists at the state level too (Form 540 Sched P), parallel to federal
- No preferential rate for long-term capital gain — all income taxed at same brackets
- Mello-Roos / property tax is separate, not relevant to W-2 / equity

The combined federal 32% + CA 9.3% + Medicare 2.35% + (potentially) NIIT 3.8% means tech workers in CA are often at 47%+ combined marginal rate on equity income. The 22% supplemental withholding leaves a huge gap.

For other high-tax states: NY similar, MA flat 5%, WA/TX/FL 0% state but federal still applies.
```

### TEMPLATE 9 — "How much should I withhold extra on W-4?" thread

```
Quick math:

1. Project your total tax for the year (use last year's return as a baseline if not much changed).
2. Subtract: YTD federal withholding + projected withholding through year-end at current rate.
3. The gap is what you need to make up. Divide by remaining paychecks to get the per-paycheck addition for W-4 line 4(c).

Example: $200k base, $50k expected RSU. Total tax projected ~$60k. YTD withholding $40k, expected through year-end $48k. Gap = $12k. With 13 bi-weekly paychecks left, add $923/paycheck on line 4(c).

The benefit of line 4(c) (vs sending a quarterly estimate) is the IRS treats withholding as paid evenly across the year for §6654 purposes — so it cures Q1-Q3 shortfall too. A Q4 estimate doesn't.

Submit the new W-4 to payroll. Takes 1-2 pay cycles to kick in.
```

### TEMPLATE 10 — Short/quick replies (≤3 sentences, build comment count fast)

Use these on threads where a deep answer isn't warranted:

```
The 22% supplemental withholding rate applies to ALL supplemental wages — RSU vest, bonus, ESPP, NSO. Not negotiable. IRS Pub 15.
```

```
Form 6251 line 2i. The bargain element on ISO exercise becomes AMT income even if you didn't sell.
```

```
Safe harbor is 100% of last year's tax, 110% if your prior-year AGI was over $150k. W-2 withholding counts toward it.
```

```
Carta and Computershare both default to 22% federal on RSU. You can ask payroll to do "additional withholding" via W-4 line 4(c) but they won't volunteer.
```

```
A qualifying disposition needs BOTH 2 years from offering date AND 1 year from purchase. Miss either and it's disqualifying.
```

---

## Anti-patterns — comments that will hurt you

❌ **"I built a free calculator for this — DM me if you want."** Instant flag. Don't.

❌ **"I'm a tax expert."** You said you're not a CPA. Don't claim authority you don't have.

❌ **"Just exercise your ISOs."** Generic advice on a complex decision = downvotes.

❌ **"This is what TurboTax says."** Don't cite a competitor's app as your source. Cite IRS.

❌ **Long comments with no white space.** Reddit users skim. Use line breaks.

❌ **Replying to your own comment to add more.** Edit the original instead.

---

## Day 14 checklist before posting the first launch thread

- [ ] Comment karma ≥ 100 (preferably 150+)
- [ ] At least 5 comments in the target sub of the post (e.g., r/personalfinance)
- [ ] Account age ≥ 14 days (Reddit caches account age for spam filters)
- [ ] No removed comments in the last 14 days
- [ ] At least 1 comment that got 20+ upvotes (proves you're a contributor)
- [ ] Sub's posting rules read fully (each has different anti-promo rules)

If all checked: post Tuesday or Wednesday morning ET. Sit with the post for 60 minutes after. Reply to every comment in the first 2 hours.

---

## After posts ship — sustaining the channel

Reddit traffic from a successful post lasts 24–72 hours, then drops. To sustain:

- 1 new post per sub every 2-4 weeks (vary the angle)
- Keep commenting in target subs 2-3x/week even when not posting
- AMA-style replies on related threads from other people, mentioning your prior post if relevant ("I wrote a longer thread on this — [link to your old post]")
- Cross-link your own old posts only when genuinely on-topic; never spam

The compounding effect: by month 3, your name shows up enough in r/PF that mods recognize you and your posts don't get filtered.

---

## Backstop: if karma doesn't reach 100 by day 14

Don't panic. Two options:
1. **Extend the karma sprint by another 7 days.** Sustained comment activity beats burst activity for trust signals.
2. **Post in r/tax first.** It's smaller, easier to get accepted, and the karma you earn there counts toward your account-wide karma for r/personalfinance auto-mod.

The launch posts will keep until June. Don't ship before the account is ready.
