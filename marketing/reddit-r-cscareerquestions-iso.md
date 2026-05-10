# r/cscareerquestions draft — ISO/AMT post

**Subreddit:** r/cscareerquestions
**Post timing:** 24h AFTER the r/personalfinance post lands
**Best day/time:** Wednesday or Thursday, 9–11am ET
**Length:** ~800 words
**Flair:** Compensation
**Voice:** non-CPA founder of a free calculator. No fake personal anecdote.

---

## Title

**If you have ISOs at a startup and are thinking about exercising before IPO — please run the AMT math first. A worked example.**

---

## Body

> The story I keep seeing on this sub: engineer at a Series B/C startup gets vested ISOs, exercises them all because someone said "AMT is fine, you get the credit back," cannot pay the AMT bill at filing, has to liquidate other assets or get a bridge loan. Don't be this engineer. I built a free calculator for this (linked at the end) — math first.

**What ISOs actually are**

Incentive Stock Options (IRC §422) let you buy shares at a strike price set when the option was granted. If you hold long enough after exercise, the gain becomes long-term capital gain instead of ordinary income — that's the tax advantage.

**What "AMT preference item" means**

Per IRC §56(b)(3), when you exercise an ISO and don't sell that year, the **bargain element** — `(FMV at exercise − strike) × shares exercised` — becomes income for AMT purposes only. Not for regular tax. AMT only.

You report it on Form 6251 line 2i.

**Worked example — the trap**

You're at a Series C startup. Strike $2. The latest 409A says FMV is $20. You have 10,000 vested ISOs.

You exercise all of them, and decide to hold (start the LTCG clock).

```
Bargain element: (20 − 2) × 10,000          = $180,000
Cash to actually exercise: 2 × 10,000       = $20,000
```

So you pay your company $20k, you now own shares with $200k of paper value. So far, so good.

Then April 15 happens.

Your regular tax: roughly the same as last year. The ISO exercise didn't create regular taxable income.

Your AMT calculation: AMTI = your normal taxable income + the $180k bargain element. After the AMT exemption phaseout (which kicks in hard at high income), you're paying 26-28% AMT on most of that bargain element.

Rough number for a single filer with ~$200k W-2 income exercising this lot:
**Federal AMT owed: ~$35-40k.**

You don't have shares you can sell to pay it (because you held). You have $20k of cash already gone into the strike. You owe $35k more to the IRS by April 15.

**The "AMT credit comes back" caveat**

Yes — under IRC §53, the AMT you paid generates a Minimum Tax Credit you can use in future years when your regular tax exceeds your tentative minimum tax. Most people recover the credit over 1-5 years.

But:
- You still need the $35k cash THIS April. Future credit doesn't pay this April's bill.
- If the company never IPOs, shares stay illiquid, or the company goes under, you've paid AMT on phantom paper gains and are stuck with shares worth the strike. You might never recover the credit if your future income doesn't trigger the right offset.

**Same-year-sell alternative**

If you exercise AND sell in the same calendar year (a "disqualifying disposition" under IRC §421(b)), the bargain element becomes **ordinary income** instead of an AMT preference. You pay regular tax on it (32-37% federal at your bracket). No AMT.

For a $180k bargain element in a 32% bracket, that's roughly $58k federal — higher than the AMT bill in raw dollars. BUT:
- You sold the shares, so you actually have the cash.
- No AMT credit accumulating, but no AMT bill either.
- No exposure to the company tanking.

**Which to pick**

This is genuinely situation-dependent. Honest decision tree:

1. Can you afford the AMT bill in cash by April 15 without selling other assets at a loss? If no → same-year-sell.
2. Do you believe the company is likely to IPO at higher than current FMV in 2-3 years? If no → same-year-sell.
3. Are you in a high-income year where AMT credit recovery will be slow? Lean toward same-year-sell.
4. Do you have high conviction + strong cash position? Exercise-and-hold can save 10-22 percentage points of federal tax on the appreciation.

**Things people get wrong**

- *"AMT is fine, I'll be rich when we IPO."* If the IPO timing slips by 2 years and FMV drops, you've paid AMT on a number that no longer reflects reality. The credit is real but slow.
- *"My CPA said exercise everything."* Some CPAs default to "minimize regular tax" without modeling AMT. Run the Form 6251 math yourself OR get a CPA who specializes in equity comp.
- *"I'll just disqualify-sell next year."* Once you exercise and hold past Dec 31, you're committed to the AMT path for that lot. Can't undo.
- *"California AMT doesn't apply to me."* It does. CA Schedule P (540) adds ~7% on top of federal AMT for the same bargain element if you're a CA resident.

**Run your own numbers**

You need:
- Strike + FMV-at-exercise + shares
- YTD W-2 wages
- Filing status
- 401(k) / HSA pre-tax deductions
- State (CA matters most for AMT; NY/MA/MN have nuance too)

I built a free calculator that does this side-by-side (exercise-and-hold vs exercise-and-sell-same-year): **mathstub.com/iso-amt**. It walks the AMT exemption phaseout, the 26%/28% bracket transition, and the AMT credit number. Carta has a similar one behind their funnel; TurboTax has a stripped-down version. Whichever — please use one before you exercise.

I'm not a CPA. The calculator is for planning estimates only. For real-money decisions, talk to a tax pro who specializes in equity comp.

---

## Comment-pattern responses

**"Are you a CPA?"**
> No. The calculator is a planning tool that follows IRC §§55–56, §422, and Form 6251 instructions. It's for figuring out the rough number before you exercise — not for filing. For a real decision, talk to a CPA experienced with equity comp.

**"Are you affiliated with [Carta/Pulley/whatever]?"**
> No. The site is independent. Carta has a calculator behind their login; this one's free and doesn't require an account.

**"What about [83(b) elections / RSAs / liquid pre-IPO companies / secondary sales]?"**
> Not modeled in v1. The calculator handles ISO exercise + sale path only. 83(b) for RSAs is a different code path and a different sub of this one. For secondaries the FMV gets messy fast.

**"I exercised early and now I owe $40k AMT, what do I do?"**
> Couple of options depending on your situation: (a) check if you qualify to disqualify-sell some of the lot to reduce AMT exposure, (b) IRS payment plan (Form 9465 — they'll grant short-term up to 180 days basically automatically, longer-term takes paperwork), (c) talk to a CPA about whether installment payment + AMT credit recovery in future years works for you. Do NOT take a high-interest loan to pay AMT on shares you can't sell.

---

## Posting checklist

- [ ] r/PF post is at least 24 hours old (avoid simultaneous-cross-post spam flag)
- [ ] Same Reddit account that posted r/PF (consistency = legitimacy)
- [ ] Calculator URL still works
- [ ] You can sit with the post for 30 min after submission

## Don't

- Don't claim you exercised ISOs personally if you didn't
- Don't claim CPA credentials
- Don't say "I work in tech" if mods/users ask follow-ups you can't answer
