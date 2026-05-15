# r/Bogleheads draft — ESPP qualifying disposition math

**Subreddit:** r/Bogleheads
**Best post day/time:** Tuesday or Wednesday, 9–11am ET (Bogleheads skews east-coast retiree + working-hours engineer mix)
**Length:** ~900 words
**Flair:** Personal Finance
**Goal:** front page of r/Bogleheads for 24–36h, ~3–8k visitors to mathstub.com
**Voice:** non-CPA founder of a free calculator. Rigorous, math-forward, IRC citations. Bogleheads punish hand-wavy posts.

---

## Title

**ESPP qualifying vs disqualifying disposition — the actual after-tax math, with a worked example showing when it's worth the 1-year hold**

(No clickbait. Bogleheads moderators will remove sensational titles.)

---

## Body

> Posting because the standard "always sell ESPP shares immediately" advice is right ~80% of the time but wrong in a specific case that's worth knowing. I'm not a CPA — I built a free calculator (linked at the bottom) for the math because doing it by hand for both dispositions and comparing is tedious. Math first.

**The setup**

A §423-qualified Employee Stock Purchase Plan lets you buy company stock at the lower of: (a) FMV at offering date, or (b) FMV at purchase date, **discounted by up to 15%** (the "lookback + discount" feature). IRS authority: IRC §423(b)(6) and §423(c).

Two ways to sell:

- **Disqualifying disposition (DD):** sell within 2 years of offering date OR 1 year of purchase date. The discount taxed as **ordinary income** (W-2), the rest as short- or long-term cap gain depending on holding.
- **Qualifying disposition (QD):** sell after BOTH 2 years from offering AND 1 year from purchase. A different, often-favorable tax split kicks in per §423(c).

Most posts you see say "DD always — the lookback discount risk isn't worth the tax savings." That's mostly right but not universal. Here's why.

**What changes under QD**

Under a qualifying disposition, the W-2 ordinary-income piece is NOT the full discount captured at purchase. It's the **lesser of**:

1. The discount measured at the offering date: `offering FMV × discount_pct`, OR
2. The actual gain: `sale price − purchase price`

The rest of the gain is **long-term capital gain** (15% / 20% federal + NIIT 3.8% if applicable), not ordinary.

That "lesser of" rule is the key. If the stock fell between offering and sale, the W-2 piece can be much smaller under QD than under DD.

**Worked example — the typical case where DD wins**

- Offering date FMV: $100
- Purchase date FMV: $130
- Purchase price: $85 (15% discount off the lower of the two = 0.85 × $100)
- Shares: 100
- Sale price 1 month later (DD): $130
- Filing: single, $200k base salary, California
- Federal marginal: 32%, LTCG 15%, NIIT 3.8%, CA marginal 9.3%

DD math:

```
W-2 ordinary income: (purchase FMV − purchase price) × shares
                   = ($130 − $85) × 100 = $4,500
Federal ordinary 32% × $4,500          = $1,440
California 9.3% × $4,500               = $419
FICA Medicare 2.35% (over $200k thresh) =  $106
Cap gain on sale: $0 (sold at purchase FMV)
                                       --------
Total tax on the $4,500 economic gain  = $1,965
After-tax keep                         = $2,535
```

**Same setup but QD (held 18 more months, sold at $130)**

```
W-2 ordinary income: lesser of
  (a) offering_FMV × 0.15 = $100 × 0.15 = $15/share × 100 = $1,500
  (b) sale_price − purchase_price = ($130−$85) × 100 = $4,500
                                              → $1,500 (lesser)

Long-term cap gain: total gain − W-2 piece = $4,500 − $1,500 = $3,000

Federal ordinary 32% × $1,500          = $480
California 9.3% × $1,500               = $140
LTCG federal 15% × $3,000              = $450
NIIT 3.8% × $3,000 (if MAGI > $200k)   = $114
California 9.3% × $3,000               = $279
                                       --------
Total tax                              = $1,463
After-tax keep                         = $3,037
```

**QD saves $502 (~11% of the gain) in this scenario.**

Per share that's $5.02. Looks small but at scale — say $25k of ESPP per year, 4 years held — it's meaningful: ~$2k/year tax savings vs. immediate-sell.

**The catch (and why most advice says DD)**

Under QD, you're holding concentrated single-stock risk for an extra ~18 months. If the stock drops 20% during that hold, you've burned more than the $502 tax savings.

**Rule of thumb that actually works:**

QD is worth considering only if:

1. Your company is a stable, diversified large-cap (S&P 500, 5+ year track record).
2. The ESPP is <10% of your total liquid net worth.
3. You'd be comfortable holding the same dollar amount of company stock in your taxable account regardless of ESPP.
4. Your federal marginal rate is 32%+ (so the ordinary→LTCG conversion actually saves real money).

If any of those is "no" → DD same-day-sell is the right move. The certainty beats the optionality.

**What about disqualifying after the stock fell?**

This is the case people forget. If the stock crashed between purchase and sale, DD math gets weird — you have W-2 ordinary income on a discount you no longer have, plus a capital LOSS. Tax-wise, the W-2 piece still hits at full ordinary rate, but the cap loss only offsets cap gains (or $3k/year of ordinary). Net effect: you can owe tax on a loss.

This is why "always sell same day" is the safer default — you avoid the QD optionality but also avoid the post-purchase price-drop trap.

**How to figure out your number**

Three inputs determine which disposition wins:

1. Offering FMV, purchase FMV, purchase price (from your ESPP statement)
2. Your federal marginal rate + state
3. Your guess for the stock price at the QD eligibility date (~18 months out)

Most calculators only model one disposition at a time. The IRS doesn't publish a calculator. I built a free one that runs both scenarios side-by-side and shows the breakeven stock price (how far the stock can fall before QD stops being worth it): **mathstub.com/espp-qualifying-disposition**. Math from IRS Pub 525 + §423(c). Site has ads (that's how it stays free) but the calculators don't. No signup.

Other tools: TurboTax Premier handles ESPP at filing time. Carta has ESPP tooling for users on Carta. The point of running the math now (not at filing) is to inform whether to hold or sell — that's a planning decision, not a filing one.

Happy to answer questions on the math.

---

## How to handle common comment patterns

**"Single-stock concentration always loses to diversification."**
> Generally yes. The $502 example is illustrative — for most people DD is correct. The post is for the specific case where a Boglehead has high marginal rate AND already-diversified portfolio AND comfortable with the concentration. Edge case, not default.

**"Where does the §423(c) ordering rule come from?"**
> IRC §423(c) and Treas. Reg. §1.423-2(k)(1)(iii). The "lesser of" rule is the statutory text — not my interpretation.

**"What about ISO disqualifying disposition? Different rules?"**
> Yes — ISOs are §422, ESPPs are §423. Different ordinary-income calculations and different AMT consequences. I have a separate calculator for ISO/AMT but didn't want to confuse the post.

**"Are you a CPA?"**
> No. The calculator is for planning estimates. For decisions involving real money, talk to a CPA. The math itself is from IRS publications.

**"State coverage?"**
> Calculator handles all 50 states at top marginal rate. State complexity (CA mental-health surtax, NY supplemental, multi-state residency) is partially modeled. For complex state situations, talk to a CPA.

**"Open source?"**
> The tax modules will go up on GitHub after one more tax season of stress-testing. Not opening now because I want to refactor.

---

## Posting checklist

- [ ] Reddit account has 100+ karma, not brand new
- [ ] Posted Tue/Wed 9–11am ET (Bogleheads peak engagement)
- [ ] Sit with the post 60+ min for replies (Bogleheads ask sharp follow-ups)
- [ ] Test mathstub.com/espp-qualifying-disposition in incognito first
- [ ] Have IRS §423(c) and Treas. Reg. §1.423-2(k)(1)(iii) bookmarked for citation requests
- [ ] Be ready to say "no, I'm not a CPA"

## Don't

- Don't sensationalize the title
- Don't put the URL in the title
- Don't claim universal "QD always wins" — Bogleheads will dunk on hand-wavy claims
- Don't edit the post 30 min after submitting
- Don't cross-post to r/personalfinance same day (the existing RSU post can run there)
