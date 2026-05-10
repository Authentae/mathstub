# Equity Comp Vest Tracker (Chrome Extension)

Track every RSU, ESPP, and ISO vest in one place. Get a Chrome notification 30 days before each vest so you can plan tax withholding. Pairs with the [Mathstub](https://mathstub.vercel.app) tax calculators.

- **Manifest version:** 3
- **Minimum Chrome:** 114
- **Permissions:** `storage`, `alarms`, `notifications`
- **No host permissions:** the MVP does NOT scrape Carta / Schwab / Shareworks. Vest data is entered manually (or imported from JSON). A future version may add a content-script scraper behind a `host_permissions` opt-in.
- **Privacy:** all data lives in `chrome.storage.local` on the user's device. No remote servers, no analytics, no cookies, no accounts.

## Local development

1. `npm install` (from repo root) if you haven't already.
2. In Chrome: `chrome://extensions` → toggle **Developer mode** (top-right) → **Load unpacked** → select `chrome-extension/`.
3. The extension icon appears in the toolbar. Click it to open the popup, or right-click → **Options** to manage vests.

### Trigger a notification check on demand

```js
// In the extension's background-page DevTools (chrome://extensions → "service worker"):
chrome.runtime.sendMessage({ type: 'force-check' });
```

This runs `vestsToNotifyToday()` against the current vest list and fires any matching notifications immediately.

## Files

```
chrome-extension/
├── manifest.json
├── icons/                 # 16/32/48/128 PNG, generated from icon.svg
├── src/
│   ├── background.js      # MV3 service worker: alarms + notifications
│   ├── styles.css
│   ├── lib/
│   │   ├── vest-schedule.js   # pure helpers (unit-tested)
│   │   └── storage.js         # chrome.storage.local wrapper
│   ├── popup/
│   │   ├── popup.html
│   │   └── popup.js
│   └── options/
│       ├── options.html
│       └── options.js
```

## Data model

```ts
interface Vest {
  id: string;          // uuid v4
  ticker: string;      // "GOOGL"
  shares: number;
  vestDateIso: string; // "2026-09-01"
  type: 'RSU' | 'ESPP' | 'ISO';
  notes?: string;
  notifyDays: number;  // default 30
}
```

Stored as `vests: Vest[]` under `chrome.storage.local`.

## Regenerate icons

The icons are emitted from a single inline SVG in `scripts/generate-extension-icons.mjs`:

```bash
npm run ext:icons
```

Edit the SVG in that script and re-run to refresh `chrome-extension/icons/`.

## Build a Web Store upload

```bash
npm run ext:zip
```

Produces `dist/equity-vest-tracker-v<version>.zip` ready to upload to the [Chrome Web Store Developer Dashboard](https://chrome.google.com/webstore/devconsole).

## Web Store submission checklist

See [SUBMISSION.md](./SUBMISSION.md) for a step-by-step checklist (one-time $5 dev fee, listing copy, screenshot specs, privacy disclosures).

## Tests

The pure logic in `src/lib/vest-schedule.js` is unit-tested in `tests/extension/vest-schedule.test.js`. Run from the repo root:

```bash
npx vitest run tests/extension
```

The chrome-API-touching parts (background.js, storage.js, popup.js, options.js) are not unit-tested in the MVP — they require a running browser. Manual test plan lives in [SUBMISSION.md](./SUBMISSION.md).
