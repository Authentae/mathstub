import type { Metadata } from 'next';
import { buildMetadata } from '@/lib/seo';

export const metadata: Metadata = buildMetadata({
  slug: 'extension-privacy',
  title: 'Equity Comp Vest Tracker — Privacy Policy',
  description:
    'Privacy policy for the Equity Comp Vest Tracker Chrome extension. No remote servers, no analytics, no data collection.',
});

export default function Page() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10 prose prose-slate dark:prose-invert">
      <h1>Privacy Policy — Equity Comp Vest Tracker</h1>
      <p>
        <em>Last updated: 2026-05-10</em>
      </p>

      <h2>Summary</h2>
      <p>
        The Equity Comp Vest Tracker Chrome extension does not collect, transmit, sell, or share
        any user data. All vest information you enter is stored locally on your device using
        <code>chrome.storage.local</code> and never leaves the browser.
      </p>

      <h2>What we store, where, and why</h2>
      <table>
        <thead>
          <tr>
            <th>Data</th>
            <th>Storage</th>
            <th>Purpose</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Vest records (ticker, shares, vest date, type, notes, notify-days)</td>
            <td>
              <code>chrome.storage.local</code> on your device
            </td>
            <td>Display upcoming vests and fire timely Chrome notifications.</td>
          </tr>
          <tr>
            <td>Settings (default notify-days, notifications-enabled)</td>
            <td>
              <code>chrome.storage.local</code> on your device
            </td>
            <td>Remember preferences between sessions.</td>
          </tr>
        </tbody>
      </table>

      <h2>What we do NOT collect</h2>
      <ul>
        <li>Personally identifiable information (name, email, IP, location).</li>
        <li>Financial account credentials.</li>
        <li>Browsing history, cookies, or activity outside the extension UI.</li>
        <li>Analytics, telemetry, crash reports, or error logs sent to any third party.</li>
      </ul>

      <h2>Permissions, plain English</h2>
      <ul>
        <li>
          <strong>storage</strong>: remember your vest list across browser restarts.
        </li>
        <li>
          <strong>alarms</strong>: wake the extension once a day to check whether any vests are
          reaching their notify threshold.
        </li>
        <li>
          <strong>notifications</strong>: show a Chrome notification when a vest is approaching.
        </li>
      </ul>
      <p>
        The extension does <strong>not</strong> request <code>host_permissions</code> for any
        websites. It cannot read content from Carta, Shareworks, Schwab, or any other site.
      </p>

      <h2>Third-party services</h2>
      <p>
        The extension does not contact any third-party service. The Mathstub calculator links in
        the popup and notifications open the Mathstub website in a new tab — those visits are
        governed by the Mathstub site privacy policy, not this one.
      </p>

      <h2>Data export, import, and deletion</h2>
      <ul>
        <li>
          <strong>Export:</strong> the options page <em>Export JSON</em> button writes your vest
          list to a file you can save anywhere.
        </li>
        <li>
          <strong>Import:</strong> the <em>Import JSON</em> button merges a previously-exported
          file back in.
        </li>
        <li>
          <strong>Delete:</strong> the <em>Clear all</em> button wipes your vest list from
          <code>chrome.storage.local</code>. Uninstalling the extension also clears all stored
          data.
        </li>
      </ul>

      <h2>Changes to this policy</h2>
      <p>
        If this policy changes, we will update the <em>Last updated</em> date above and republish
        the extension with the new version. Material changes will be summarized in the Chrome Web
        Store listing release notes.
      </p>
    </main>
  );
}
