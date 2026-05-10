# Chrome Web Store submission checklist

End-to-end steps to publish "Equity Comp Vest Tracker." Estimate: 1–2 hours, $5 one-time fee.

## 0. Pay the developer fee (one-time)

1. Sign in to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole) with the Google account you want associated with the extension.
2. Pay the **$5 one-time developer registration fee**. This unlocks publishing for that account, forever.

## 1. Pre-flight manual test

Before zipping, load the unpacked extension and verify each of these works:

- [ ] Click the extension icon in the toolbar. Popup opens, shows "No upcoming vests" empty state when storage is empty.
- [ ] Click **Manage**. Options page opens in a new tab.
- [ ] Add a vest with all fields filled (ticker, shares, type, vest date, notify-days, notes). The vest appears in the table immediately.
- [ ] Re-open the popup. The new vest appears in the upcoming list with a correct day countdown.
- [ ] Click **Export JSON**. A `equity-vests-YYYY-MM-DD.json` file downloads.
- [ ] Click **Clear all**, confirm. Table empties.
- [ ] Click **Import JSON**, pick the file you just exported. Vest reappears.
- [ ] Toggle **Enable Chrome notifications** off, click **Save settings**. Reload extension.
- [ ] In the service-worker DevTools console (chrome://extensions → "service worker"), run:
      `chrome.runtime.sendMessage({ type: 'force-check' })` — confirm NO notification fires.
- [ ] Toggle notifications back on, save. Add a vest with `notifyDays = 0` and today's date. Run `force-check` — confirm a notification appears with the right title.
- [ ] Click the notification. It should open the matching Mathstub calculator (RSU/ESPP/ISO) in a new tab.
- [ ] Reload the extension and the popup — data persists.
- [ ] On a smaller screen / narrow window, the options page table doesn't break (responsive grid kicks in <540px).

## 2. Build the zip

```bash
npm run ext:zip
```

You'll get `dist/equity-vest-tracker-v<version>.zip`. Verify by extracting it and confirming `manifest.json` is at the top level (NOT inside a `chrome-extension/` folder — Chrome rejects nested manifests).

## 3. Create the listing

In the dashboard → **+ New item** → upload your zip. Then fill out:

### Store listing tab

- **Item name:** `Equity Comp Vest Tracker`
- **Short description (≤132 chars):**
  > Track RSU, ESPP, and ISO vests in one place. Get a Chrome notification 30 days before each vest so you can plan tax withholding.
- **Detailed description:** see [LISTING.md](./LISTING.md) for ready-to-paste copy.
- **Category:** Productivity (primary). Optionally tag Workflow & Planning.
- **Language:** English (United States).

### Graphic assets

- **Store icon (128×128):** use `chrome-extension/icons/icon-128.png`.
- **Small promo tile (440×280):** create a screenshot of the popup over a Mathstub-blue background. Required.
- **Marquee promo tile (1400×560):** optional but boosts placement.
- **Screenshots (1280×800 or 640×400, 1–5 images):**
  1. Popup with 3–4 vests in the list and "next 90 days" stat.
  2. Options page with a half-filled add-vest form.
  3. A Chrome notification balloon ("GOOGL RSU vest in 30 days").
  4. (Optional) A Mathstub calculator open in another tab — shows the linked workflow.

### Privacy practices tab

- **Single purpose:** *Track equity-compensation vest dates and notify the user before each vest.*
- **Permissions justifications:**
  - `storage`: persist the user's vest list and notification preferences locally.
  - `alarms`: schedule a once-daily check for vests reaching their notify threshold.
  - `notifications`: surface the vest reminder via Chrome's native notification channel.
- **Remote code:** *No remote code is loaded or executed. The extension ships exactly the JS contained in the package.*
- **Data usage:** *No user data is transmitted off-device. All data lives in `chrome.storage.local`. The extension does not collect, sell, or share user data.*
- **Privacy policy URL:** required. See [PRIVACY.md](./PRIVACY.md) for content. Host it as `https://mathstub.com/extension-privacy` or similar (commit a Next.js page).

### Distribution tab

- **Visibility:** Public.
- **Regions:** All regions.
- **Pricing:** Free.

## 4. Submit for review

- **Estimated review time:** 1–7 days (Google reviews each new extension manually).
- **Common rejection reasons (and how we avoid them):**
  - "Excessive permissions" — we only request three; each justified.
  - "Remote code execution" — we ship no eval/Function/dynamic-import-from-URL.
  - "Misleading description" — short + detailed descriptions match the actual functionality.
  - "Missing privacy policy" — we ship one before submission.

## 5. Post-launch

- [ ] Add a link from `mathstub.com` homepage to the Chrome Web Store listing.
- [ ] Mention the extension in each calculator's "Related" section.
- [ ] Create a `/extension-privacy` Next.js page hosting the privacy policy.
- [ ] Watch the dashboard for 7 days for review status / crash reports.
- [ ] Plan v0.2: optional content-script scraper for Carta / Shareworks / Schwab behind a `host_permissions` opt-in.
