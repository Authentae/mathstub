# Affiliate program applications — copy-paste ready

The 5 affiliate cards on every calc page are currently DEAD (cursor-not-allowed) because partner IDs aren't set. Apply to these networks, get your IDs, set them in Vercel env vars. Each ID = the `aff=` or `ref=` query param.

Estimated approval times below. **Empower + Amazon Associates approve fastest (24h)**, do those first.

---

## 1. Empower (highest payout per lead)

- **Network:** Impact (impact.com) — Empower runs through Impact Radius
- **Apply at:** https://empower.com/affiliates → click "Become a partner" → routes to Impact application
- **Direct Impact link:** https://app.impact.com/campaign-promo-signup/Empower.brand?execution=e1s1
- **Payout:** $50-150/qualified lead (varies by program tier)
- **Approval:** 1-3 business days
- **What you'll need:**
  - Site URL: `https://mathstub.com`
  - Site description: `Free tax calculators for tech workers with equity comp. Mid-funnel content for high-income individuals (RSU/ISO/NSO/ESPP recipients).`
  - Promotional methods: `Educational blog posts + tax calculators with embedded affiliate cards in "Recommended next steps" section after each calculator result.`
  - Estimated monthly traffic: `0 (pre-launch); projected 1,000-5,000/mo post-launch`
  - Why this audience matches Empower: `High-net-worth tech workers with equity comp matches Empower's wealth-tracking ICP. Calculator users are actively planning their finances.`

After approval: get your tracking URL, extract the partner ID (often after `?ref=` or in a click-tracking query string), set:
```
NEXT_PUBLIC_AFFILIATE_EMPOWER_ID=<your-id>
```

---

## 2. Carta (niche-aligned, high relevance)

- **Apply at:** https://carta.com/partners/
- **Type:** Direct partner program (no Impact intermediary)
- **Payout:** Varies — historically $50-200 per qualified individual signup
- **Approval:** 5-14 days (manual review)
- **What you'll need:**
  - Application via the form at carta.com/partners
  - Site URL: `https://mathstub.com`
  - Audience size + description: `Pre-launch indie utility site. Post-launch ICP is tech workers with RSU/ESPP/ISO from venture-backed startups — exactly Carta's individual-user ICP.`
  - Why partner: `Mathstub's calculators end with "Recommended next steps" cards. Carta's individual product (free for individuals to track grants/vests) is a direct fit. Each calc result is a qualified hand-off.`

After approval: set:
```
NEXT_PUBLIC_AFFILIATE_CARTA_ID=<your-id>
```

---

## 3. Harness Wealth (highest commission per conversion)

- **Apply at:** https://www.harnesswealth.com/partners (if not visible, email partners@harnesswealth.com)
- **Type:** Direct partner program OR via Impact (check both)
- **Payout:** $100-300+ per qualified CPA-match (high-ticket)
- **Approval:** 5-7 days
- **Pitch email if direct outreach is needed:**

> Subject: Affiliate inquiry — Mathstub.com (tax calculators for tech workers w/ equity comp)
>
> Hi Harness team,
>
> I run Mathstub.com — a free utility-tools site with calculators for RSU tax shortfall, ISO/AMT exposure, NSO exercise, ESPP qualifying disposition, and quarterly estimated tax safe-harbor. The audience is exactly Harness's ICP: tech workers with mixed equity comp who need a CPA who actually understands AMT, §83(b), and §409A.
>
> I'd like to add Harness Wealth as the recommended next step for users with shortfalls above $5,000 — the cohort most likely to need a real CPA, not just better filing software.
>
> Mathstub launches publicly Wed May 13 (Product Hunt) — happy to share traffic projections and convert volume once we're past the first month.
>
> Is there a partner program I can apply to, or should we set up a direct affiliate arrangement?
>
> Thanks,
> Earth (Authentae)

After approval: set:
```
NEXT_PUBLIC_AFFILIATE_HARNESS_ID=<your-id>
```

---

## 4. TurboTax (Intuit) — via Impact

- **Apply at:** https://app.impact.com/campaign-promo-signup/Intuit.brand
- **Network:** Impact Radius (intuit operates multiple programs through Impact)
- **Payout:** $15-25 per paid filing conversion (commission, not lead)
- **Approval:** 3-7 days; Intuit has stricter content review than Empower
- **Notes:**
  - Apply specifically for the **TurboTax Premier** program (the SKU that handles equity comp)
  - Mention in your application that your content is educational — not "tax advice replacement" framing
  - Site must have a clear disclaimer (✓ Mathstub already has one on every page)

After approval: set:
```
NEXT_PUBLIC_AFFILIATE_TURBOTAX_ID=<your-id>
```

---

## 5. TaxAct — direct partner program

- **Apply at:** https://www.taxact.com/affiliates
- **Type:** Direct (own platform, NOT Impact)
- **Payout:** $5-15 per paid filing conversion (lower than TurboTax but easier to qualify)
- **Approval:** 1-5 business days

After approval: set:
```
NEXT_PUBLIC_AFFILIATE_TAXACT_ID=<your-id>
```

---

## 6. (BONUS) Amazon Associates — fastest approval, lowest payout

Optional but Amazon approves in 24-48h and works as a fallback. Tax-related books for the audience: J.K. Lasser's Your Income Tax, "Consider Your Options" by Kaye Thomas (the equity-comp tax bible).

- **Apply at:** https://affiliate-program.amazon.com/
- **Approval:** 24-48h initial, conversion-based long-term review (must drive 3 sales in first 6 months or account closes)
- **Payout:** ~3-5% of book price (~$1-2 per book)

If approved, can add a small "Recommended reading" link in the "Show the math" section. Low priority.

---

## Setting env vars in Vercel

Once you have any partner IDs, set them in Vercel:

1. https://vercel.com/authentaes-projects/mathstub/settings/environment-variables
2. Add each `NEXT_PUBLIC_AFFILIATE_*_ID` for Production environment
3. Trigger a redeploy (push any commit, or hit "Redeploy" from the deployments tab)
4. Verify by visiting `https://mathstub.com/rsu-tax-shortfall` — affiliate cards should now have real `aff=...` or `ref=...` URLs and the buttons should be active (not greyed out)

---

## Priority order

1. **Empower** (apply today — fastest approval, highest expected EPC)
2. **Amazon Associates** (apply today — instant fallback)
3. **TaxAct** (apply today — easy, decent payout)
4. **Carta** (apply tomorrow — strong fit, slow review)
5. **TurboTax** (apply this week — slowest review but best filing-affiliate)
6. **Harness Wealth** (this week — high payout but conditional on approval)

Estimated time on your end: **45 minutes total** for all 6 applications.

Estimated revenue once IDs are live + post-launch traffic flows: **$50-400/mo** depending on conversion rate. Until then: $0.
