#!/usr/bin/env node
// Generate Gumroad cover images (1280×720) for the four Notion templates.
// Premium visual treatment: brand-blue gradient, brand-yellow accent bar,
// a glow blob, a stylized chart, and per-product accent dot colors so the
// four covers feel like a cohesive product line, not stamped variants.

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', 'notion-templates');

// Mathstub brand palette
const BG_TOP = '#1d4ed8';   // brand-700
const BG_BOT = '#0c1d3e';   // deeper than brand-900 for richer fall
const FG = '#ffffff';
const FG_SUB = 'rgba(255,255,255,0.78)';
const ACCENT = '#fbbf24';   // amber-400

function cover({ kicker, title, subtitle, price, accentDot, badgeLabel }) {
  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_TOP}"/>
      <stop offset="100%" stop-color="${BG_BOT}"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.85" cy="0.15" r="0.55">
      <stop offset="0%" stop-color="${accentDot}" stop-opacity="0.32"/>
      <stop offset="60%" stop-color="${accentDot}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${accentDot}" stop-opacity="0"/>
    </radialGradient>
    <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse">
      <path d="M48 0 L0 0 0 48" stroke="rgba(255,255,255,0.05)" stroke-width="1" fill="none"/>
    </pattern>
    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="6" flood-color="#000000" flood-opacity="0.35"/>
    </filter>
  </defs>

  <!-- background stack -->
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#grid)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>

  <!-- subtle inner border to feel like a card -->
  <rect x="32" y="32" width="1216" height="656" rx="20" fill="none" stroke="rgba(255,255,255,0.08)" stroke-width="1.5"/>

  <!-- accent bar + brand kicker -->
  <rect x="80" y="92" width="72" height="6" fill="${ACCENT}" rx="3"/>
  <text x="80" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22" font-weight="700" fill="${FG}" letter-spacing="3.4">MATHSTUB · NOTION</text>

  <!-- price badge (top-right) -->
  <g transform="translate(1042, 90)">
    <rect width="158" height="56" rx="28" fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.22)" stroke-width="1.5"/>
    <text x="79" y="36" text-anchor="middle"
          font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="24" font-weight="700" fill="${FG}">${escapeXml(price)}</text>
  </g>

  <!-- category badge -->
  <g transform="translate(80, 188)">
    <rect width="${24 + badgeLabel.length * 11.5}" height="34" rx="17" fill="rgba(251,191,36,0.16)" stroke="rgba(251,191,36,0.4)" stroke-width="1"/>
    <text x="${12 + badgeLabel.length * 5.75}" y="22" text-anchor="middle"
          font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="14" font-weight="700" letter-spacing="1.2" fill="${ACCENT}">${escapeXml(badgeLabel.toUpperCase())}</text>
  </g>

  <!-- kicker -->
  <text x="80" y="278" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="22" font-weight="500" fill="${FG_SUB}">${escapeXml(kicker)}</text>

  <!-- title (big) -->
  <text x="80" y="350" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="78" font-weight="800" fill="${FG}" filter="url(#softShadow)">
    ${wrapText(title, 18, 80, 350, 92)}
  </text>

  <!-- subtitle -->
  <text x="80" y="608" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="24" font-weight="400" fill="${FG_SUB}">
    ${wrapText(subtitle, 64, 80, 608, 34)}
  </text>

  <!-- decorative chart -->
  <g transform="translate(880, 390)" opacity="0.92">
    <path d="M0 200 L40 168 L80 180 L120 122 L160 138 L200 78 L240 64 L280 22"
          stroke="${accentDot}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" filter="url(#softShadow)"/>
    <circle cx="280" cy="22" r="11" fill="${accentDot}"/>
    <circle cx="280" cy="22" r="22" fill="${accentDot}" fill-opacity="0.25"/>
  </g>

  <!-- footer mark -->
  <text x="80" y="690" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="14" font-weight="500" fill="rgba(255,255,255,0.5)" letter-spacing="0.6">mathstub.com · indie tax tools for tech workers</text>
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
    dir: 'year-end-tax-checklist',
    kicker: '27 IRS deadlines · ICS calendar export · CPA brief',
    title: 'Year-End Tax Playbook',
    subtitle: 'The dated decision calendar tech workers run from Oct 1 to Apr 15.',
    price: '$29',
    accentDot: '#fbbf24',   // amber
    badgeLabel: 'Tax Playbook',
  },
  {
    dir: 'equity-comp-tracker',
    kicker: '4-year tax projection · RSU basis fix · CPA brief',
    title: 'Equity Comp Decision Tracker',
    subtitle: 'RSU + ESPP + ISO + NSO + 4-year projection grid in one Notion workspace.',
    price: '$49',
    accentDot: '#60a5fa',   // brand-400
    badgeLabel: 'Decision Tracker',
  },
  {
    dir: 'tech-worker-annual-review',
    kicker: 'AMT credit recovery · ISO decision tree · concentration policy',
    title: 'Tech Worker Annual Review',
    subtitle: 'The 90-min year-end review for $200k–$700k earners with equity.',
    price: '$79',
    accentDot: '#a78bfa',   // violet-400
    badgeLabel: 'Annual Review',
  },
  {
    dir: 'multi-state-equity-planner',
    kicker: 'Work-source allocation · NY convenience rule · move ROI',
    title: 'Multi-State Equity Comp Tax Planner',
    subtitle: 'For tech workers who moved CA→TX (or NY→FL) mid-vest. State by state.',
    price: '$79',
    accentDot: '#34d399',   // emerald-400
    badgeLabel: 'Multi-State',
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
