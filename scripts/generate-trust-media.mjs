#!/usr/bin/env node
/**
 * Generate NEW listing-imagery for each Notion template that builds
 * BUYER TRUST without spoiling content.
 *
 * Per product we emit 2 images:
 *   trust-whats-inside.jpg  — section icon grid (what they get, no content)
 *   trust-why-trust.jpg     — trust badges (why they should buy)
 *
 * These uploaded to Gumroad alongside the branded cover.png.
 */

import { writeFile, mkdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', 'notion-templates');

// Mathstub brand palette
const BG_TOP = '#1d4ed8';
const BG_BOT = '#0c1d3e';
const FG = '#ffffff';
const FG_SUB = 'rgba(255,255,255,0.78)';
const ACCENT_AMBER = '#fbbf24';

function whatsInsideSvg({ title, accent, badge, items }) {
  // 6 cards in 3x2 grid, each with emoji icon + title
  const cards = items.slice(0, 6);
  const cardW = 360;
  const cardH = 158;
  const gapX = 24;
  const gapY = 18;
  const gridX = 80;
  const gridY = 250;

  const cardHtml = cards.map((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = gridX + col * (cardW + gapX);
    const y = gridY + row * (cardH + gapY);
    // Wrap title to 2 lines if longer than ~22 chars
    const titleLines = wrapTextLines(c.title, 22);
    const subLines = wrapTextLines(c.subtitle, 36);
    const titleFontSize = titleLines.length > 1 ? 17 : 19;
    const titleTspans = titleLines.map((line, li) =>
      `<tspan x="26" dy="${li === 0 ? 0 : titleFontSize + 4}">${escapeXml(line)}</tspan>`).join('');
    const subTspans = subLines.map((line, li) =>
      `<tspan x="26" dy="${li === 0 ? 0 : 17}">${escapeXml(line)}</tspan>`).join('');
    return `
      <g transform="translate(${x}, ${y})">
        <rect width="${cardW}" height="${cardH}" rx="14" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.10)" stroke-width="1.5"/>
        <rect x="0" y="0" width="4" height="${cardH}" rx="2" fill="${accent}"/>
        <text x="26" y="52" font-size="36" font-family="system-ui">${c.icon}</text>
        <text x="26" y="88" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              font-size="${titleFontSize}" font-weight="700" fill="${FG}">${titleTspans}</text>
        <text x="26" y="${titleLines.length > 1 ? 138 : 122}" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              font-size="13" font-weight="400" fill="${FG_SUB}">${subTspans}</text>
      </g>
    `;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_TOP}"/>
      <stop offset="100%" stop-color="${BG_BOT}"/>
    </linearGradient>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="1.2" fill="rgba(255,255,255,0.045)"/>
    </pattern>
    <radialGradient id="glow" cx="0.9" cy="0.1" r="0.6">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.28"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#dots)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>
  <rect x="32" y="32" width="1216" height="656" rx="20" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="1.5"/>

  <!-- header -->
  <rect x="80" y="92" width="72" height="6" fill="${ACCENT_AMBER}" rx="3"/>
  <text x="80" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="20" font-weight="800" fill="${FG}" letter-spacing="3">MATHSTUB · NOTION TOOLKIT</text>

  <!-- badge -->
  <g transform="translate(80, 168)">
    <rect width="${28 + badge.length * 11.5}" height="36" rx="18" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="20" cy="18" r="4" fill="${accent}"/>
    <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="13" font-weight="800" letter-spacing="1.6" fill="${FG}">${escapeXml(badge.toUpperCase())}</text>
  </g>

  <text x="80" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="34" font-weight="800" fill="${FG}">${escapeXml(title)}</text>

  ${cardHtml}

  <text x="80" y="688" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="13" font-weight="600" fill="rgba(255,255,255,0.55)" letter-spacing="0.6">mathstub.com  ·  Notion-importable in 30 seconds  ·  Lifetime updates through 2028</text>
</svg>
`.trim();
}

function whyTrustSvg({ title, accent, badge, badges }) {
  const items = badges.slice(0, 5);
  // Stack vertically, full width
  const startY = 270;
  const rowH = 76;
  const itemsHtml = items.map((b, i) => {
    const y = startY + i * rowH;
    return `
      <g transform="translate(80, ${y})">
        <rect width="48" height="48" rx="12" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="1.5"/>
        <text x="24" y="34" text-anchor="middle" font-size="26" font-family="system-ui">${b.icon}</text>
        <text x="72" y="22" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              font-size="22" font-weight="700" fill="${FG}">${escapeXml(b.title)}</text>
        <text x="72" y="44" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
              font-size="15" font-weight="400" fill="${FG_SUB}">${escapeXml(b.subtitle)}</text>
      </g>
    `;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="${BG_TOP}"/>
      <stop offset="100%" stop-color="${BG_BOT}"/>
    </linearGradient>
    <pattern id="dots" width="22" height="22" patternUnits="userSpaceOnUse">
      <circle cx="11" cy="11" r="1.2" fill="rgba(255,255,255,0.045)"/>
    </pattern>
    <radialGradient id="glow" cx="0.9" cy="0.85" r="0.6">
      <stop offset="0%" stop-color="${accent}" stop-opacity="0.30"/>
      <stop offset="60%" stop-color="${accent}" stop-opacity="0.06"/>
      <stop offset="100%" stop-color="${accent}" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="1280" height="720" fill="url(#bg)"/>
  <rect width="1280" height="720" fill="url(#dots)"/>
  <rect width="1280" height="720" fill="url(#glow)"/>
  <rect x="32" y="32" width="1216" height="656" rx="20" fill="none" stroke="rgba(255,255,255,0.09)" stroke-width="1.5"/>

  <rect x="80" y="92" width="72" height="6" fill="${ACCENT_AMBER}" rx="3"/>
  <text x="80" y="142" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="20" font-weight="800" fill="${FG}" letter-spacing="3">MATHSTUB · NOTION TOOLKIT</text>

  <g transform="translate(80, 168)">
    <rect width="${28 + badge.length * 11.5}" height="36" rx="18" fill="rgba(255,255,255,0.08)" stroke="${accent}" stroke-width="1.5"/>
    <circle cx="20" cy="18" r="4" fill="${accent}"/>
    <text x="32" y="24" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
          font-size="13" font-weight="800" letter-spacing="1.6" fill="${FG}">${escapeXml(badge.toUpperCase())}</text>
  </g>

  <text x="80" y="234" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="34" font-weight="800" fill="${FG}">${escapeXml(title)}</text>

  ${itemsHtml}

  <text x="80" y="688" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
        font-size="13" font-weight="600" fill="rgba(255,255,255,0.55)" letter-spacing="0.6">mathstub.com  ·  8 free tax calculators paired with this template</text>
</svg>
`.trim();
}

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]
  );
}

function wrapTextLines(s, maxChars) {
  const words = String(s).split(/\s+/);
  const lines = [];
  let cur = '';
  for (const w of words) {
    if ((cur + ' ' + w).trim().length > maxChars) {
      if (cur) lines.push(cur);
      cur = w;
    } else {
      cur = (cur + ' ' + w).trim();
    }
  }
  if (cur) lines.push(cur);
  return lines;
}

const products = [
  {
    dir: 'year-end-tax-checklist',
    accent: '#fbbf24',
    badge: 'Tax Playbook · $19',
    insideTitle: 'What\'s inside the Year-End Tax Playbook',
    insideItems: [
      { icon: '📅', title: '27-deadline calendar', subtitle: 'IRS §, $ cost-of-missing per row' },
      { icon: '📆', title: 'ICS export', subtitle: 'Import all 27 to Google / Apple / Outlook' },
      { icon: '✍️', title: 'W-4 4(c) workbook', subtitle: 'Shortfall ÷ pay-periods math, 3 scenarios' },
      { icon: '📋', title: '17-row tax-doc inventory', subtitle: 'Every W-2 / 1099 / K-1 / 3921 / 3922' },
      { icon: '📖', title: 'Scenario cookbook', subtitle: '8 recipes for the most-common situations' },
      { icon: '🧾', title: 'CPA brief', subtitle: '1-page printable, saves billable time' },
    ],
    trustTitle: 'Why buyers trust this',
    badges: [
      { icon: '🔄', title: 'Free updates through tax year 2028', subtitle: 'Re-download from Gumroad — purchase persists' },
      { icon: '💰', title: '14-day no-questions money-back guarantee', subtitle: 'Refund same business day' },
      { icon: '📚', title: 'Cites IRS by Pub# / IRC §', subtitle: 'Pub 505, 525, 550 + Form 4868, 8949, 6251' },
      { icon: '🧮', title: 'Pairs with 8 free Mathstub calculators', subtitle: 'RSU, ESPP, ISO/AMT, NSO, quarterly + more' },
      { icon: '🛠️', title: 'Built by Earth · indie tax-tool founder', subtitle: 'mathstub.com · runs on his own taxes' },
    ],
  },
  {
    dir: 'equity-comp-tracker',
    accent: '#60a5fa',
    badge: 'Decision Tracker · $29',
    insideTitle: 'What\'s inside the Equity Comp Decision Tracker',
    insideItems: [
      { icon: '🔮', title: '4-year tax projection grid', subtitle: '48-month W-2 + RSU + AMT + cumulative' },
      { icon: '🛠️', title: 'RSU cost-basis fix kit', subtitle: 'Stops TurboTax double-taxing your sales' },
      { icon: '📅', title: 'AMT credit recovery calendar', subtitle: 'Multi-year Form 8801 scheduler' },
      { icon: '🧾', title: 'CPA brief (2-page)', subtitle: 'Saves the first 30 min of the meeting' },
      { icon: '📖', title: '10-recipe scenario cookbook', subtitle: 'From first vest to leaving the company' },
      { icon: '📊', title: '7 live databases + 4 examples', subtitle: 'Grants, vests, sales, exercises pre-filled' },
    ],
    trustTitle: 'Why buyers trust this',
    badges: [
      { icon: '🔄', title: 'Free updates through tax year 2028', subtitle: 'Re-download from Gumroad anytime' },
      { icon: '💰', title: '14-day no-questions money-back guarantee', subtitle: 'Refund same business day' },
      { icon: '📚', title: 'Cites IRC § + IRS Pub#', subtitle: '§422, §83(b), §3402(g), §6654, Pub 525' },
      { icon: '🧮', title: 'Pairs with 8 free Mathstub calculators', subtitle: 'Deep-linked from every row' },
      { icon: '📂', title: 'CSV companion file included', subtitle: 'Maya\'s 4-year worked example pre-filled' },
    ],
  },
  {
    dir: 'tech-worker-annual-review',
    accent: '#a78bfa',
    badge: 'Annual Review · $39',
    insideTitle: 'What\'s inside the Tech Worker Annual Review',
    insideItems: [
      { icon: '📊', title: 'Withholding strategy', subtitle: 'Exact W-4 4(c) per gross + filing status' },
      { icon: '🔋', title: 'AMT credit recovery', subtitle: 'Multi-year planner — turn AMT into refund' },
      { icon: '🌳', title: 'ISO vs. early-exercise', subtitle: 'Decision tree with §83(b) threshold math' },
      { icon: '🎯', title: 'Concentration policy', subtitle: 'Risk-band table + exchange-fund tactic' },
      { icon: '📖', title: '6-recipe scenario cookbook', subtitle: '$300k+ tier, pre-IPO, FIRE, MFJ couples' },
      { icon: '💼', title: '24-question CPA + planner script', subtitle: 'Both pros\' angles, 30-sec answers' },
    ],
    trustTitle: 'Why buyers trust this',
    badges: [
      { icon: '🔄', title: 'Free updates through tax year 2028', subtitle: 'IRS limits + thresholds re-published yearly' },
      { icon: '💰', title: '30-day money-back guarantee', subtitle: 'Refund if it doesn\'t pay for itself' },
      { icon: '📚', title: 'Cites IRC § + IRS Pub#', subtitle: '§55-59 AMT, §401(k), §6654, §83(b), Pub 969' },
      { icon: '🧮', title: 'Pairs with 8 free Mathstub calculators', subtitle: 'AMT, RSU, ESPP, ISO + 4 more' },
      { icon: '👨‍💻', title: 'Worked example: Priya, $310k MFJ NY', subtitle: '$11.3k cash + $77k tax-shelter caught' },
    ],
  },
  {
    dir: 'multi-state-equity-planner',
    accent: '#34d399',
    badge: 'Multi-State · $49',
    insideTitle: 'What\'s inside the Multi-State Planner',
    insideItems: [
      { icon: '🔄', title: 'Work-source allocation calculator', subtitle: 'Pro-rate every vest across vesting states' },
      { icon: '🗽', title: 'NY convenience decoder', subtitle: '7 states + 4 paths to defeat the claim' },
      { icon: '📅', title: '4-year residency + vest matrix', subtitle: 'Which state taxes which future dollar' },
      { icon: '💰', title: 'Move ROI calculator', subtitle: 'After-tax savings with breakeven heuristic' },
      { icon: '🏛️', title: 'State AMT decoder', subtitle: 'CA / IA / MN / CT triggers + recovery' },
      { icon: '📖', title: '8-recipe scenario cookbook', subtitle: 'CA→TX, NY→FL, dual-state, statutory traps' },
    ],
    trustTitle: 'Why buyers trust this',
    badges: [
      { icon: '🔄', title: 'Free updates through tax year 2028', subtitle: 'State DOR positions update yearly' },
      { icon: '💰', title: '30-day money-back guarantee', subtitle: 'Refund if it doesn\'t pay for itself' },
      { icon: '📚', title: 'State DOR primary sources cited', subtitle: 'CA FTB Pub 1004/1005, NY TSB-M-06(5)I, MA TIR 02-21' },
      { icon: '📂', title: 'CSV companion file included', subtitle: 'Daniel\'s CA→TX 8-vest allocation pre-filled' },
      { icon: '👨‍💻', title: 'Worked example: Daniel, CA→TX 2024', subtitle: '$34k of CA tax revealed before April' },
    ],
  },
];

async function main() {
  for (const p of products) {
    const dir = path.join(ROOT, p.dir);
    await mkdir(dir, { recursive: true });

    const insideSvg = whatsInsideSvg({
      title: p.insideTitle,
      accent: p.accent,
      badge: p.badge,
      items: p.insideItems,
    });
    await sharp(Buffer.from(insideSvg)).resize(1280, 720).jpeg({ quality: 86 })
      .toFile(path.join(dir, 'trust-whats-inside.jpg'));

    const trustSvg = whyTrustSvg({
      title: p.trustTitle,
      accent: p.accent,
      badge: p.badge,
      badges: p.badges,
    });
    await sharp(Buffer.from(trustSvg)).resize(1280, 720).jpeg({ quality: 86 })
      .toFile(path.join(dir, 'trust-why-trust.jpg'));

    console.log(`  ${p.dir}: trust-whats-inside.jpg + trust-why-trust.jpg`);
  }
  console.log('done.');
}

main().catch((e) => { console.error(e); process.exit(1); });
