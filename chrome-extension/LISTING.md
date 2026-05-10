# Web Store listing copy

Ready-to-paste copy for the Chrome Web Store listing.

## Short description (max 132 characters)

```
Track RSU, ESPP, and ISO vests in one place. Get a Chrome notification 30 days before each vest so you can plan tax withholding.
```

## Detailed description

```
Equity Comp Vest Tracker is a small, focused extension for tech workers with RSU, ESPP, or ISO grants. It does one thing: keep a running list of your upcoming vests and ping you 30 days before each one — enough time to update W-4 withholding or plan a quarterly estimated tax payment before the surprise April bill.

WHY THIS EXISTS
- Equity comp creates lumpy income. The IRS withholds 22% on RSU vests, but your real marginal rate is often 32–37%. Without planning, the gap shows up as a five-figure surprise at filing time.
- Brokerage portals (Carta, Shareworks, Schwab) show vest schedules buried five clicks deep. There's no native way to get a heads-up before a vest hits.

WHAT IT DOES
- One-thumb popup showing the next 10 upcoming vests with countdowns.
- "Next 90 days" share-count summary by ticker on the popup.
- Daily background check at 9am. When a vest is exactly N days away (default 30), Chrome fires a native notification.
- Click the notification to jump straight to the matching Mathstub tax calculator (RSU shortfall, ISO/AMT, ESPP qualifying disposition).
- Manual vest entry. Import / export JSON for portability.
- Per-vest custom notify-days (e.g. 60-day heads-up for big cliff vests).

PRIVACY
- All data is stored in chrome.storage.local on your device.
- No remote servers. No analytics. No cookies. No accounts.
- The extension does not request access to any websites in v0.1 (manual entry only).

WHAT IT DOES NOT DO (YET)
- It does not auto-import from Carta, Shareworks, or Schwab in v0.1. A future opt-in scraper is planned. Until then, enter your vest schedule once via the options page (5 minutes).
- It is not tax advice. The Mathstub calculators it links to are estimates, not advice — for real money decisions, talk to a CPA.

PAIRS WITH MATHSTUB.COM
- RSU Tax Withholding Shortfall Calculator
- ESPP Qualifying Disposition Calculator
- ISO Exercise AMT Calculator
- Quarterly Estimated Tax Safe-Harbor Calculator
- State Stock-Comp Tax Lookup (50 states)

OPEN SOURCE
The full source is published as part of the Mathstub repository. No remote code is loaded at runtime — what's audited is what's shipped.
```

## Single-purpose statement

```
Track equity-compensation vest dates and notify the user a configurable number of days before each vest.
```

## Permission justifications

| Permission | Justification |
|---|---|
| `storage` | Persist the user's vest list and notification preferences in `chrome.storage.local`. No data leaves the device. |
| `alarms` | Schedule a once-daily background check at 9am local time. Without `alarms`, the extension cannot reliably wake to fire vest reminders. |
| `notifications` | Surface the vest reminder via Chrome's native notification channel. Without this, the user would have to keep the popup open to see reminders — defeating the purpose. |

## Tags / keywords

- RSU tracker
- equity compensation
- vest tracker
- ESPP
- ISO
- stock vesting
- tech worker tax
- tax planning
