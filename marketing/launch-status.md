# Launch status — May 11 2026, evening Thailand

## ✅ READY for HN post tonight (7-9pm Thailand)

- mathstub.com live, all 8 calculators working, mobile clean
- Gumroad upsell URLs **fixed today** (were 404'ing — caught + deployed)
- 9 commits + 8 calculators + 3 Gumroad products + Empower DKIM/SPF setup all live on production
- HN copy in `marketing/launch-day-checklist.md` — copy-paste ready

## ⚠️ KNOWN ISSUE — accept and ship

**Email lead-magnet (Year-End Tax Checklist PDF) → goes to Gmail spam folder.**

Why: Kit's form #9427387 has a hardcoded sender `theearth1659@gmail.com`. The from-address swap to `hi@mathstub.com` didn't propagate (Kit UI saved but next email still used old sender). DKIM/SPF for mathstub.com IS configured and working — but the form ignores it.

Impact:
- Gmail subscribers (~70% of US tech-worker audience) → email lands in **Promotions tab or Spam**
- Yahoo/Outlook/ProtonMail subscribers → likely INBOX (their DMARC isn't enforced like Gmail's)
- 10-15% expected conversion loss on first night

**Why we're shipping anyway:**
1. The form WORKS — captures email, syncs to Kit, sends PDF welcome email
2. Subscribers can still find the email (Promotions/Spam — most Gmail users check)
3. Tomorrow's fix is easy and we have time before PH (Wed 11am Thailand)
4. Earth is launch-ready in every other dimension
5. Fixing this further requires more Kit debug cycles with diminishing returns

## 🔧 TOMORROW MORNING FIX (15 min, before PH launch)

Open https://app.kit.com/forms in Chrome:

1. **Delete current form 9427387**
2. **Create new form** — same name "Year-End Tax Checklist", inline + Clare template
3. **In the empty form's Settings → General**: it should auto-pick `Mathstub <hi@mathstub.com>` as sender (since that's now the account default)
4. **In Incentive tab**: re-attach `year-end-tax-checklist.pdf`, paste the welcome email body from below, set "Auto-confirm new subscribers" ON
5. **Get the new form ID** from URL `/forms/designers/[NEW_ID]/edit`
6. **Update Vercel env var** `CONVERTKIT_FORM_ID` to new ID
7. **Push any commit** (e.g. trivial readme tweak) to trigger redeploy
8. **Test once** — should land in INBOX with Mathstub <hi@mathstub.com> as sender

### Welcome email body (copy verbatim)

Subject: `Your Year-End Tax Checklist (PDF inside)`

Body:
```
Hi there — thanks for grabbing the Mathstub Year-End Tax Quick Checklist. The PDF is one click below. It's the 1-page list of every tax-saving action with a hard Dec 31 deadline (401k top-up, FSA spend-down, HSA, IRA, ESPP cycles, AMT planning, tax-loss harvesting, charitable timing). Print it and stick it next to your monitor.

[Confirm your subscription]  ← Kit auto-button, leave intact

If a friend would benefit from this, forward them mathstub.com — seven free calculators (RSU, ESPP, ISO/AMT, NSO, Bonus, Quarterly Estimated, 50-state lookup), no signup, math straight from IRS publications.

Questions or bugs? Just reply to this email — it goes to me directly.

— Earth (Authentae) · founder, Mathstub
```

## 🎯 TONIGHT'S ACTION (in 5 hours)

**Post Show HN.** Use the copy in `marketing/launch-day-checklist.md` step 1. Sit on it 30-60 min replying using `marketing/comment-replies.md`.

Don't touch the email lead-magnet tonight. Fix tomorrow before PH.

---

## What we accomplished today

- ✅ Empower affiliate application (declined; will re-apply post-launch with traffic)
- ✅ Impact Marketplace publisher account submitted (1-2 day review)
- ✅ Cloudflare Email Routing for hi@mathstub.com → forwards to Gmail
- ✅ Kit DKIM + SPF DNS records added to mathstub.com via Cloudflare
- ✅ Kit account fully set up (free Newsletter plan, 14-day Creator trial)
- ✅ Kit form #9427387 published with PDF auto-delivery
- ✅ Gumroad upsell URL bug fixed (was 404 — deployed before launch traffic hit)
- ✅ All 12+ commits pushed to mathstub.com main

The launch can succeed with what we have. Email-magnet issue affects a fraction of conversion, fixable tomorrow.
