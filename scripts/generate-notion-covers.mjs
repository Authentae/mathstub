#!/usr/bin/env node
// Generate Gumroad cover images (1280×720) for the three Notion templates.
// Same SVG→PNG pattern as the Chrome extension icon script.

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', 'notion-templates');

const BRAND_BG = '#1d4ed8';
const BRAND_BG_DARK = '#1e3a8a';
const BRAND_FG = '#ffffff';
const BRAND_ACCENT = '#fbbf24';

function cover({ kicker, title, subtitle, accentColor = BRAND_ACCENT }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BRAND_BG}"/>
      <stop offset="100%" stop-color="${BRAND_BG_DARK}"/>
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M40 0 L0 0 0 40" stroke="rgba(255,255,255,0.06)" stroke-width="1" fill="none"/>
    </pattern>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#grid)"/>

  <!-- Brand bar -->
  <rect x="80" y="80" width="60" height="6" fill="${accentColor}" rx="3"/>
  <text x="80" y="135" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="22" font-weight="600" fill="${BRAND_FG}" letter-spacing="2">MATHSTUB · NOTION</text>

  <text x="80" y="200" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="28" font-weight="500" fill="${accentColor}">${escapeXml(kicker)}</text>

  <text x="80" y="290" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="76" font-weight="700" fill="${BRAND_FG}">
    ${wrapText(title, 18, 80, 290, 90)}
  </text>

  <text x="80" y="600" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="26" font-weight="400" fill="rgba(255,255,255,0.85)">
    ${wrapText(subtitle, 56, 80, 600, 36)}
  </text>

  <!-- decorative chart -->
  <g transform="translate(880, 380)" opacity="0.85">
    <path d="M0 200 L40 170 L80 180 L120 130 L160 140 L200 90 L240 70 L280 30"
          stroke="${accentColor}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="280" cy="30" r="10" fill="${accentColor}"/>
  </g>
</svg>
`.trim();
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c],
  );
}

function wrapText(s, maxChars, x, y, lineHeight) {
  const words = String(s).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      lines.push(cur);
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines
    .map(
      (line, i) => `<tspan x="${x}" dy="${i === 0 ? 0 : lineHeight}">${escapeXml(line)}</tspan>`,
    )
    .join('');
}

const templates = [
  {
    dir: 'equity-comp-tracker',
    kicker: 'NOTION TEMPLATE — $29',
    title: 'Equity Comp Tracker',
    subtitle: 'RSU + ESPP + ISO + grants in one Notion page.',
  },
  {
    dir: 'year-end-tax-checklist',
    kicker: 'NOTION TEMPLATE — $19',
    title: 'Year-End Tax Checklist',
    subtitle: 'October → April 15 deadlines, in one checklist.',
  },
  {
    dir: 'tech-worker-annual-review',
    kicker: 'NOTION TEMPLATE — $39',
    title: 'Annual Financial Review',
    subtitle: 'For tech workers with lumpy income and concentrated equity.',
  },
];

async function main() {
  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch {
    console.warn('[covers] sharp not installed. Writing source SVGs only.');
  }

  for (const t of templates) {
    const dir = path.join(ROOT, t.dir);
    await mkdir(dir, { recursive: true });
    const svg = cover(t);
    await writeFile(path.join(dir, 'cover.svg'), svg, 'utf8');
    if (sharp) {
      const out = path.join(dir, 'cover.png');
      await sharp(Buffer.from(svg))
        .resize(1280, 720)
        .png({ compressionLevel: 9 })
        .toFile(out);
      console.log(`  wrote ${out}`);
    } else {
      console.log(`  wrote ${path.join(dir, 'cover.svg')} (svg only)`);
    }
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
