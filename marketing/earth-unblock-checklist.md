# Earth's unblock checklist — the 3 clicks that turn on traffic

> Written 2026-06-09. Everything Claude ships on the site is **invisible until Google can see it.** A `site:mathstub.com` check still comes back basically empty — the site is live and healthy but **not indexed**. New domains sit in Google's sandbox for months *unless* you tell Google directly. These three tasks are the only real lever left, and only you can do them (they need your logins). Total time: ~15 minutes. Do #1 even if you do nothing else.

---

## #1 — Google Search Console (the big one) · ~7 min

This is the single highest-value action for the whole project. It (a) tells Google the site exists, (b) lets you *request indexing* on specific pages, and (c) unlocks real search-query data so the **next** thing Claude builds is evidence-based instead of guesswork.

1. Go to **https://search.google.com/search-console** and sign in with your Google account.
2. Click **Add property** → choose the **URL prefix** box (the right-hand one) → enter exactly:
   ```
   https://www.mathstub.com
   ```
   (Use the `www` version — that's where the site actually serves. The apex `mathstub.com` redirects to it.)
3. **Verify ownership.** Easiest method: pick **HTML tag**, copy the `<meta name="google-site-verification" ...>` tag it shows you, and **paste that tag's content value into a reply here** — Claude will add it to the site, you redeploy, then click Verify. (Alternative: the **Google Analytics** or **Domain/DNS** methods if you already have those set up.)
4. Once verified, in the left sidebar open **Sitemaps**. Under "Add a new sitemap" type:
   ```
   sitemap.xml
   ```
   and click **Submit**. (Full URL it builds: `https://www.mathstub.com/sitemap.xml`.)
5. Still in GSC, use the **URL inspection** bar at the very top. Paste each of these, press Enter, then click **Request indexing**. Do the homepage + the 5 strongest calculators:
   ```
   https://www.mathstub.com/
   https://www.mathstub.com/rsu-tax-shortfall
   https://www.mathstub.com/iso-amt
   https://www.mathstub.com/espp-qualifying-disposition
   https://www.mathstub.com/nso-exercise
   https://www.mathstub.com/bonus-tax-shortfall
   ```
   (Google caps manual requests at ~10/day, so 6 is fine. The sitemap covers the rest over the following weeks.)

**Done = the clock starts.** Indexing still takes days-to-weeks, but without this it may never happen. Come back in ~2 weeks and check the **Pages** report to see how many URLs got indexed.

---

## #2 — Vercel: set the canonical URL + fix the redirect · ~5 min

Two small settings that make sure Google credits the right URL and doesn't split your ranking signal between `mathstub.com` and `www.mathstub.com`.

1. Go to **https://vercel.com** → your **mathstub** project → **Settings** → **Environment Variables**.
2. Add (or confirm) this variable for **Production**:
   - **Key:** `NEXT_PUBLIC_SITE_URL`
   - **Value:** `https://www.mathstub.com`
   - Then **Redeploy** (Deployments tab → latest → ⋯ → Redeploy) so it takes effect.
   - *Why:* without it, some generated URLs fall back to a placeholder. This makes every canonical tag, sitemap entry, and share-card URL point at the real domain.
3. **Domains** (Settings → Domains): make sure `www.mathstub.com` is the **Primary** domain and the apex `mathstub.com` **redirects** to it. If the redirect type shows **307 (Temporary)**, that's fine functionally but a **308/301 (Permanent)** passes more ranking signal. Vercel usually sets this automatically when you mark www as primary — just confirm apex → www is permanent.

---

## #3 — AdSense: reapply · ~3 min

The "low value content" rehab (noindexed the thin templated pages, removed the "pending review" labels, added narrative case studies + the W-4 calc) landed weeks ago. The 2-week soak window I asked you to wait for has passed (today is on/after 2026-06-09).

1. Go to **https://www.google.com/adsense** → your account → the site review / "Sites" section.
2. Find mathstub.com and click **Request review** (or "I confirm I have fixed the issues").
3. Then wait — review is 1–14 days. No further action from you.

> Note: AdSense pays pennies until there's real traffic, so this is lower-priority than #1. But it's a 3-minute click and starts its own review clock, so do it in the same sitting.

---

## What Claude is doing in parallel (no action needed from you)

- **Bing/ChatGPT indexing is already on.** Claude re-runs `npm run indexnow` after every deploy — Bing crawls within ~24h and that feed reaches ChatGPT Search. Bing does **not** sandbox new domains like Google does, so this is the fastest discovery channel available right now and it needs no login from you.
- `/llms.txt` (an AI-crawler index) and homepage brand schema are live.
- Distribution copy for Reddit / Hacker News / Product Hunt / LinkedIn / Twitter is pre-written in this `marketing/` folder for whenever you want to post (one-time, your call).

**Bottom line:** Bing/AI discovery is handled. Google is the big locked door, and #1 above is the key. Reply with the GSC verification tag whenever you're ready and Claude will wire it in.
