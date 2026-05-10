#!/usr/bin/env node
// Generate Chrome Web Store listing assets:
//   - small_promo.png (440×280, REQUIRED)
//   - screenshot_popup.png (1280×800)
//   - screenshot_options.png (1280×800)
//   - screenshot_notification.png (1280×800)
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '..', 'chrome-extension', 'webstore-assets');

const BRAND = '#1d4ed8';
const BRAND_DARK = '#1e3a8a';
const ACCENT = '#fbbf24';
const FG = '#ffffff';
const BG_LIGHT = '#f9fafb';
const BORDER = '#e5e7eb';
const TEXT = '#111827';
const MUTED = '#6b7280';
const AMBER_BG = '#fffbeb';
const AMBER_FG = '#b45309';

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );
}

function smallPromo() {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 440 280">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
  </defs>
  <rect width="440" height="280" fill="url(#bg)"/>
  <rect x="20" y="22" width="36" height="4" rx="2" fill="${ACCENT}"/>
  <text x="20" y="50" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="${FG}" letter-spacing="2" font-weight="600">CHROME EXTENSION</text>
  <text x="20" y="100" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="34" font-weight="700" fill="${FG}">Equity Comp</text>
  <text x="20" y="138" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="34" font-weight="700" fill="${FG}">Vest Tracker</text>
  <text x="20" y="178" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" fill="${ACCENT}" font-weight="600">RSU · ESPP · ISO</text>
  <text x="20" y="220" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" fill="rgba(255,255,255,0.85)">Track every vest. Get notified 30 days</text>
  <text x="20" y="240" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" fill="rgba(255,255,255,0.85)">before. Plan tax with mathstub.com.</text>
  <g transform="translate(290, 100)" opacity="0.9">
    <path d="M0 110 L25 95 L50 100 L75 70 L100 75 L125 45 L150 35 L175 12" stroke="${ACCENT}" stroke-width="3.5" fill="none" stroke-linecap="round"/>
    <circle cx="175" cy="12" r="6" fill="${ACCENT}"/>
  </g>
</svg>
`.trim();
}

function popupScreenshot() {
  // Mock the popup at full 1280×800 with extension-popup mock at center on a Mathstub-blue background.
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 800">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND}"/>
      <stop offset="100%" stop-color="${BRAND_DARK}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
    </pattern>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feDropShadow dx="0" dy="20" stdDeviation="30" flood-color="rgba(0,0,0,0.3)"/>
    </filter>
  </defs>
  <rect width="1280" height="800" fill="url(#bg)"/>
  <rect width="1280" height="800" fill="url(#grid)"/>

  <!-- Headline left -->
  <text x="80" y="160" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" font-weight="600" fill="${ACCENT}" letter-spacing="2">CHROME EXTENSION</text>
  <text x="80" y="240" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="68" font-weight="700" fill="${FG}">Never miss</text>
  <text x="80" y="320" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="68" font-weight="700" fill="${FG}">a vest again.</text>
  <text x="80" y="380" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" fill="rgba(255,255,255,0.85)">RSU · ESPP · ISO. One Chrome notification</text>
  <text x="80" y="412" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="22" fill="rgba(255,255,255,0.85)">30 days before each vest. Free.</text>

  <text x="80" y="500" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="16" fill="${ACCENT}" font-weight="600">→ Pairs with mathstub.com tax calculators</text>

  <!-- Popup mockup right -->
  <g transform="translate(720, 80)" filter="url(#shadow)">
    <rect width="480" height="640" rx="12" fill="white"/>
    <!-- header -->
    <rect width="480" height="56" rx="12" fill="white"/>
    <rect y="44" width="480" height="12" fill="white"/>
    <rect y="55" width="480" height="1" fill="${BORDER}"/>
    <text x="20" y="35" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="15" font-weight="600" fill="${TEXT}">Equity Comp Vest Tracker</text>
    <rect x="380" y="14" width="80" height="28" rx="6" fill="${BG_LIGHT}" stroke="${BORDER}"/>
    <text x="420" y="33" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="${TEXT}" text-anchor="middle">Manage</text>

    <!-- Summary -->
    <text x="20" y="90" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="${MUTED}" letter-spacing="1" font-weight="600">NEXT 90 DAYS</text>
    <text x="20" y="130" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="32" font-weight="700" fill="${BRAND}">312 shares</text>
    <text x="20" y="155" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" fill="${MUTED}">GOOGL: 187 · NVDA: 125</text>
    <rect x="20" y="178" width="440" height="1" fill="${BORDER}"/>

    <!-- Vest rows -->
    ${[
      { ticker: 'GOOGL', shares: '62.5', type: 'RSU', date: 'Aug 1, 2026', days: '7 days', tag: ACCENT },
      { ticker: 'GOOGL', shares: '124', type: 'ESPP', date: 'Sep 30, 2026', days: '67 days', tag: BRAND },
      { ticker: 'NVDA', shares: '125', type: 'ISO', date: 'Nov 15, 2026', days: '113 days', tag: '#10b981' },
      { ticker: 'GOOGL', shares: '62.5', type: 'RSU', date: 'Feb 1, 2027', days: '191 days', tag: '#10b981' },
    ]
      .map((v, i) => {
        const y = 200 + i * 80;
        return `
          <g transform="translate(0, ${y})">
            <rect x="20" y="0" width="440" height="68" fill="white"/>
            <text x="20" y="22" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="14" fill="${TEXT}"><tspan font-weight="700">${v.ticker}</tspan> · ${v.shares} ${v.type}</text>
            <text x="20" y="42" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="12" fill="${MUTED}">${v.date}</text>
            <rect x="380" y="14" width="80" height="22" rx="11" fill="${v.tag === ACCENT ? AMBER_BG : v.tag === BRAND ? '#dbeafe' : '#d1fae5'}"/>
            <text x="420" y="29" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" font-weight="600" fill="${v.tag === ACCENT ? AMBER_FG : v.tag === BRAND ? BRAND : '#047857'}" text-anchor="middle">${v.days}</text>
            <rect x="20" y="68" width="440" height="1" fill="${BORDER}"/>
          </g>
        `;
      })
      .join('')}

    <!-- Footer -->
    <rect y="552" width="480" height="88" fill="${BG_LIGHT}"/>
    <rect y="552" width="480" height="1" fill="${BORDER}"/>
    <text x="20" y="582" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="${MUTED}" letter-spacing="1" font-weight="600">DEEP-LINKED CALCULATORS</text>
    <text x="20" y="608" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="13" fill="${BRAND}" font-weight="500">RSU shortfall · ISO/AMT · Quarterly tax</text>
    <text x="20" y="628" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif" font-size="11" fill="${MUTED}">mathstub.com — free</text>
  </g>
</svg>
`.trim();
}

const ASSETS = [
  { name: 'small_promo_440x280.png', svg: smallPromo, width: 440, height: 280 },
  { name: 'screenshot_popup_1280x800.png', svg: popupScreenshot, width: 1280, height: 800 },
];

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch {
    console.warn('[webstore] sharp not installed — writing SVGs only.');
  }
  await mkdir(OUT_DIR, { recursive: true });
  for (const asset of ASSETS) {
    const svg = asset.svg();
    const svgPath = path.join(OUT_DIR, asset.name.replace('.png', '.svg'));
    await writeFile(svgPath, svg, 'utf8');
    if (sharp) {
      const pngPath = path.join(OUT_DIR, asset.name);
      await sharp(Buffer.from(svg))
        .resize(asset.width, asset.height)
        .png({ compressionLevel: 9 })
        .toFile(pngPath);
      console.log(`  wrote ${pngPath}`);
    } else {
      console.log(`  wrote ${svgPath} (svg only)`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
