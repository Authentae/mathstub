#!/usr/bin/env node
/**
 * IndexNow submitter — pings Bing (and the shared IndexNow network) to crawl
 * Mathstub's pages within ~24h instead of waiting for the slow sitemap cycle.
 *
 * Why this matters for a brand-new site:
 *   - Bing indexes IndexNow-submitted URLs fast (often <24h).
 *   - ChatGPT Search retrieves results through Bing's index — so getting into
 *     Bing = becoming discoverable inside ChatGPT, not just bing.com.
 *
 * No duplication: the URL list is pulled from the LIVE sitemap.xml, which is
 * the single source of truth (app/sitemap.ts). Whatever is indexable there
 * (static pages + live calcs + blog posts + toolkit; the noindexed per-state
 * pages are already excluded) is what gets submitted.
 *
 * The key (KEY below) is published at https://mathstub.com/<KEY>.txt — IndexNow
 * keys are public by design (they prove you control the host), not secrets.
 *
 * Run AFTER a deploy (so the key file + any new pages are live):
 *   npm run indexnow
 */

const HOST = 'mathstub.com';
const KEY = 'b1e7a4c9f2d8460a93c5e1f7a2d6b8e4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_URL = `https://${HOST}/sitemap.xml`;
const INDEXNOW_ENDPOINT = 'https://api.indexnow.org/indexnow';

async function getSitemapUrls() {
  const res = await fetch(SITEMAP_URL, { headers: { 'user-agent': 'mathstub-indexnow/1.0' } });
  if (!res.ok) throw new Error(`sitemap fetch failed: ${res.status} ${res.statusText}`);
  const xml = await res.text();
  const urls = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());
  // Dedupe + keep only our own host (defensive).
  return [...new Set(urls)].filter((u) => u.includes(HOST));
}

async function main() {
  const urlList = await getSitemapUrls();
  if (urlList.length === 0) {
    console.error('No URLs found in sitemap — aborting (nothing to submit).');
    process.exit(1);
  }
  console.log(`Submitting ${urlList.length} URLs to IndexNow for ${HOST} …`);

  const res = await fetch(INDEXNOW_ENDPOINT, {
    method: 'POST',
    headers: { 'content-type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host: HOST, key: KEY, keyLocation: KEY_LOCATION, urlList }),
  });

  // IndexNow returns 200 (accepted) or 202 (accepted, key validation pending).
  // 403 = key file not reachable yet (deploy the key file first).
  // 422 = URLs don't match host/key. 429 = too many requests.
  const body = await res.text().catch(() => '');
  console.log(`IndexNow responded: ${res.status} ${res.statusText}${body ? ` — ${body}` : ''}`);
  if (res.status === 200 || res.status === 202) {
    console.log('✓ Submitted. Bing typically crawls within ~24h.');
  } else {
    console.error('✗ Not accepted. If 403, confirm the key file is live at:', KEY_LOCATION);
    process.exit(1);
  }
}

main().catch((err) => {
  console.error('IndexNow submit error:', err.message);
  process.exit(1);
});
