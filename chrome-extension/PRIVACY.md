# Privacy Policy — Equity Comp Vest Tracker

**Last updated:** 2026-05-10

## Summary

The Equity Comp Vest Tracker Chrome extension does not collect, transmit, sell, or share any user data. All vest information you enter is stored locally on your device using `chrome.storage.local` and never leaves the browser.

## What we store, where, and why

| Data | Storage | Purpose |
|---|---|---|
| Vest records (ticker, shares, vest date, type, notes, notify-days) | `chrome.storage.local` on your device | To display your upcoming vests in the popup and fire timely Chrome notifications. |
| Settings (default notify-days, notifications-enabled toggle) | `chrome.storage.local` on your device | To remember your preferences between sessions. |

## What we do NOT collect

- Personally identifiable information (name, email, IP, location).
- Financial account credentials.
- Browsing history, cookies, or activity outside the extension's own UI.
- Analytics, telemetry, crash reports, or error logs sent to any third party.

## Permissions, plain English

- **storage**: lets the extension remember your vest list across browser restarts.
- **alarms**: lets the extension wake itself once a day to check whether any of your vests are reaching their notification threshold.
- **notifications**: lets the extension show a Chrome notification when a vest is approaching.

The extension does NOT request `host_permissions` for any websites. It cannot read content from Carta, Shareworks, Schwab, or any other site.

## Third-party services

The extension does not contact any third-party service. The Mathstub calculator links in the popup and notifications open the Mathstub website (https://mathstub.com) in a new tab — those visits are governed by the Mathstub privacy policy, not this one.

## Data export, import, and deletion

- **Export:** the options page **Export JSON** button writes your vest list to a JSON file you can save anywhere.
- **Import:** the **Import JSON** button merges a previously-exported file back in.
- **Delete:** the **Clear all** button wipes your vest list from `chrome.storage.local`. Uninstalling the extension also clears all stored data.

## Changes to this policy

If this policy changes, we will update the **Last updated** date above and republish the extension with the new version. Material changes will be summarized in the Chrome Web Store listing release notes.

## Contact

This extension is part of the open-source Mathstub project. Bug reports and privacy questions can be filed on the project repository.
