#!/usr/bin/env node
/**
 * Generate 1200×630 Open-Graph share cards for calculator pages.
 *
 * Style matches the existing hand-designed cards in public/og/:
 *   - White / light gray background
 *   - "mathstub" wordmark top-left with the Σ logo block
 *   - Brand-blue eyebrow tag
 *   - Big bold tagline
 *   - Sample numbers card on the right
 *   - Bottom: "OPEN-GRAPH SHARE CARD · 1200 × 630"  +  "mathstub.com · Free · No signup"
 */

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT = path.resolve(__dirname, '..', 'public', 'og');

const BRAND = '#2563eb';
const INK = '#0f172a';
const SLATE_500 = '#64748b';
const RED = '#dc2626';
const RED_BG = '#fef2f2';
const RED_BORDER = '#fca5a5';

function escapeXml(s) {
  return String(s).replace(/[<>&'"]/g, (c) =>
    ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', "'": '&apos;', '"': '&quot;' })[c]
  );
}

function ogSvg({ eyebrow, title, subtitle, sampleHeader, sampleRows }) {
  const titleLines = title.split('\n');
  const sampleY = 180;
  const rowH = 60;
  const sampleHeight = 90 + sampleRows.length * rowH;
  const rowsHtml = sampleRows.map((r, i) => {
    const y = sampleY + 110 + i * rowH;
    const isShortfall = r.highlight === true;
    if (isShortfall) {
      return `
        <rect x="745" y="${y - 30}" width="380" height="48" rx="8" fill="${RED_BG}" stroke="${RED_BORDER}" stroke-width="2"/>
        <text x="765" y="${y}" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="800" fill="${RED}">${escapeXml(r.label)}</text>
        <text x="1105" y="${y}" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="22" font-weight="800" fill="${RED}">${escapeXml(r.value)}</text>
      `;
    }
    return `
      <text x="765" y="${y}" font-family="-apple-system, system-ui, sans-serif" font-size="20" font-weight="600" fill="${INK}">${escapeXml(r.label)}</text>
      <text x="1105" y="${y}" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="20" font-weight="700" fill="${r.color === 'brand' ? BRAND : INK}">${escapeXml(r.value)}</text>
      ${i < sampleRows.length - 1 ? `<line x1="765" y1="${y + 22}" x2="1105" y2="${y + 22}" stroke="#e5e7eb" stroke-width="1"/>` : ''}
    `;
  }).join('');

  return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#f9fafb"/>
  <rect x="0" y="0" width="1200" height="630" fill="none" stroke="#e5e7eb" stroke-width="2"/>

  <!-- mathstub wordmark -->
  <g transform="translate(60, 50)">
    <rect width="44" height="44" rx="8" fill="${BRAND}"/>
    <text x="22" y="32" text-anchor="middle" font-family="-apple-system, system-ui, sans-serif" font-size="26" font-weight="800" fill="#ffffff">Σ</text>
    <text x="58" y="32" font-family="-apple-system, system-ui, sans-serif" font-size="24" font-weight="700" fill="${INK}">mathstub</text>
  </g>

  <!-- Left text block -->
  <g transform="translate(60, 200)">
    <line x1="0" y1="6" x2="48" y2="6" stroke="${BRAND}" stroke-width="3"/>
    <text x="64" y="14" font-family="-apple-system, system-ui, sans-serif" font-size="16" font-weight="700" fill="${BRAND}" letter-spacing="2.2">${escapeXml(eyebrow.toUpperCase())}</text>

    ${titleLines.map((line, i) => `
      <text x="0" y="${74 + i * 64}" font-family="-apple-system, system-ui, sans-serif" font-size="54" font-weight="800" fill="${INK}">${escapeXml(line)}</text>
    `).join('')}

    <text x="0" y="${74 + titleLines.length * 64 + 24}" font-family="-apple-system, system-ui, sans-serif" font-size="20" font-weight="400" fill="${SLATE_500}">${escapeXml(subtitle)}</text>
  </g>

  <!-- Right sample card -->
  <g>
    <rect x="730" y="${sampleY - 30}" width="410" height="${sampleHeight}" rx="14" fill="#ffffff" stroke="${INK}" stroke-width="2"/>
    <rect x="730" y="${sampleY - 30}" width="410" height="56" rx="14" fill="${INK}"/>
    <rect x="730" y="${sampleY - 4}" width="410" height="30" fill="${INK}"/>
    <text x="755" y="${sampleY + 8}" font-family="-apple-system, system-ui, sans-serif" font-size="18" font-weight="800" fill="#ffffff" letter-spacing="1.4">${escapeXml(sampleHeader.toUpperCase())}</text>
    ${rowsHtml}
  </g>

  <!-- Footer -->
  <text x="60" y="590" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="600" fill="${SLATE_500}" letter-spacing="1.5">OPEN-GRAPH SHARE CARD  ·  1200 × 630</text>
  <text x="1140" y="590" text-anchor="end" font-family="-apple-system, system-ui, sans-serif" font-size="14" font-weight="600" fill="${INK}">mathstub.com  ·  Free  ·  No signup</text>
</svg>
`.trim();
}

const cards = [
  {
    slug: 'mega-backdoor-roth',
    eyebrow: 'mega-backdoor · roth',
    title: 'The 401(k) trick that\nadds $35k/yr in Roth.',
    subtitle: 'Estimate your after-tax room under the §415 cap.',
    sampleHeader: 'AFTER-TAX ROOM',
    sampleRows: [
      { label: '§415 cap', value: '$70,000' },
      { label: '− Elective', value: '−$23,500' },
      { label: '− Match', value: '−$11,000' },
      { label: 'Mega-Backdoor', value: '$35,500', highlight: true },
    ],
  },
  {
    slug: 'backdoor-roth-ira',
    eyebrow: 'backdoor · roth ira',
    title: 'High earner? Skip the\nRoth IRA phaseout.',
    subtitle: 'The Backdoor Roth + pro-rata math, in 30 seconds.',
    sampleHeader: 'BACKDOOR · 2025',
    sampleRows: [
      { label: 'IRA cap', value: '$7,000' },
      { label: 'Direct Roth', value: '$0' },
      { label: 'Pro-rata tax', value: '$0', color: 'brand' },
      { label: 'Roth space', value: '$7,000', highlight: true },
    ],
  },
  {
    slug: 'rsu-cost-basis',
    eyebrow: 'rsu cost basis',
    title: 'Stop paying tax\ntwice on your RSUs.',
    subtitle: 'Your broker’s $0 cost basis double-taxes you. Fix it.',
    sampleHeader: 'FORM 8949 FIX',
    sampleRows: [
      { label: 'Sale proceeds', value: '$6,000' },
      { label: 'Broker basis', value: '$0' },
      { label: 'Correct basis', value: '$5,000', color: 'brand' },
      { label: 'Tax saved', value: '$940', highlight: true },
    ],
  },
  {
    slug: 'equity-comp-tax-map',
    eyebrow: 'the big picture',
    title: 'Your equity tax,\nstart to finish.',
    subtitle: 'Every tax moment from grant to retirement, mapped.',
    sampleHeader: 'THE JOURNEY',
    sampleRows: [
      { label: 'Vest', value: 'Income tax' },
      { label: 'Exercise', value: 'AMT' },
      { label: 'Sell', value: 'Cap gains' },
      { label: 'Move states', value: 'Sourcing', highlight: true },
    ],
  },
];

async function main() {
  await mkdir(OUT, { recursive: true });
  for (const c of cards) {
    const svg = ogSvg(c);
    const out = path.join(OUT, `${c.slug}.png`);
    await sharp(Buffer.from(svg)).resize(1200, 630).png({ compressionLevel: 9 }).toFile(out);
    console.log(`  wrote ${out}`);
  }
  console.log('done.');
}

main().catch((e) => { console.error(e); process.exit(1); });
