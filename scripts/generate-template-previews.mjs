#!/usr/bin/env node
/**
 * Generate Gumroad-ready preview imagery for each Notion template.
 *
 * For each template directory in notion-templates/, this script:
 *   1. Reads template.md.
 *   2. Renders to dark-themed Notion-like HTML (matches mathstub.com brand).
 *   3. Launches headless Chrome via Puppeteer.
 *   4. Captures:
 *        - preview-hero.png   — 1280×720 above-the-fold "hero" shot
 *        - preview-full.png   — full-page tall screenshot showing the
 *                                entire template (what buyers see scrolling)
 *        - preview-tour.webp  — animated WebP scrolling top-to-bottom
 *                                (Loom substitute; auto-plays in modern browsers)
 *
 * Buyers see these on the Gumroad listing page. The hero is the primary
 * thumbnail; the full + tour are gallery entries showing real content.
 */

import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import puppeteer from 'puppeteer';
import { marked } from 'marked';
import sharp from 'sharp';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT = path.resolve(__dirname, '..', 'notion-templates');

// Brand palette — must match Mathstub site
const CSS = `
:root {
  color-scheme: dark;
  --bg: #0c1d3e;
  --bg-2: #1d4ed8;
  --fg: #f1f5f9;
  --fg-sub: rgba(241,245,249,0.78);
  --accent: #60a5fa;
  --accent-amber: #fbbf24;
  --accent-emerald: #34d399;
  --accent-violet: #a78bfa;
  --bd: rgba(255,255,255,0.08);
  --bd-strong: rgba(255,255,255,0.18);
  --code-bg: rgba(255,255,255,0.05);
  --callout-bg: rgba(96,165,250,0.08);
  --callout-bd: rgba(96,165,250,0.35);
  --warn-bg: rgba(251,191,36,0.08);
  --warn-bd: rgba(251,191,36,0.35);
  --good-bg: rgba(52,211,153,0.08);
  --good-bd: rgba(52,211,153,0.35);
}
* { box-sizing: border-box; margin: 0; padding: 0; }
html, body {
  background: linear-gradient(160deg, var(--bg-2) 0%, var(--bg) 65%);
  color: var(--fg);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  line-height: 1.6;
  -webkit-font-smoothing: antialiased;
}
.page {
  max-width: 920px;
  margin: 0 auto;
  padding: 60px 56px 80px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 3px;
  color: var(--fg-sub);
  margin-bottom: 36px;
  padding-bottom: 18px;
  border-bottom: 1px solid var(--bd);
}
.brand-dot {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--accent);
  box-shadow: 0 0 14px 2px var(--accent);
}
h1 { font-size: 44px; font-weight: 800; letter-spacing: -0.5px; margin-bottom: 18px; line-height: 1.15; }
h2 { font-size: 30px; font-weight: 800; margin: 48px 0 16px; letter-spacing: -0.3px; }
h3 { font-size: 22px; font-weight: 700; margin: 32px 0 10px; }
h4 { font-size: 17px; font-weight: 700; margin: 22px 0 8px; }
p { margin: 12px 0; color: var(--fg-sub); }
strong { color: var(--fg); font-weight: 700; }
em { font-style: italic; color: var(--fg); }
a { color: var(--accent); text-decoration: none; border-bottom: 1px dotted rgba(96,165,250,0.4); }
ul, ol { margin: 12px 0 12px 28px; color: var(--fg-sub); }
li { margin: 5px 0; }
li::marker { color: var(--accent); }
hr { border: none; border-top: 1px solid var(--bd); margin: 36px 0; }
code {
  font-family: ui-monospace, SFMono-Regular, Menlo, Consolas, monospace;
  background: var(--code-bg);
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 0.9em;
  color: var(--accent);
}
pre {
  background: var(--code-bg);
  border: 1px solid var(--bd);
  border-radius: 8px;
  padding: 16px 18px;
  overflow-x: auto;
  margin: 14px 0;
  font-size: 13px;
  line-height: 1.55;
}
pre code {
  background: transparent;
  padding: 0;
  color: var(--fg);
}
blockquote {
  border-left: 3px solid var(--accent);
  background: var(--callout-bg);
  padding: 14px 20px;
  margin: 14px 0;
  border-radius: 0 8px 8px 0;
  color: var(--fg);
}
blockquote p { color: var(--fg); margin: 6px 0; }
blockquote strong { color: var(--accent); }
table {
  border-collapse: collapse;
  width: 100%;
  margin: 16px 0;
  font-size: 14px;
  border-radius: 8px;
  overflow: hidden;
  border: 1px solid var(--bd);
}
th {
  background: rgba(255,255,255,0.04);
  text-align: left;
  padding: 10px 14px;
  font-weight: 700;
  color: var(--fg);
  border-bottom: 1px solid var(--bd);
  font-size: 12px;
  letter-spacing: 0.6px;
  text-transform: uppercase;
}
td {
  padding: 10px 14px;
  border-top: 1px solid var(--bd);
  color: var(--fg-sub);
  vertical-align: top;
}
tr:hover td { background: rgba(255,255,255,0.02); }
/* TL;DR callout — auto-detect by content */
blockquote:has(strong:first-child) { background: var(--warn-bg); border-left-color: var(--accent-amber); }
/* Section-anchor flair */
h2::before {
  content: '';
  display: inline-block;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: var(--accent);
  margin-right: 14px;
  vertical-align: middle;
  box-shadow: 0 0 10px 1px var(--accent);
}
`;

const templates = [
  { dir: 'year-end-tax-checklist', accent: '#fbbf24', label: 'Tax Playbook · $19' },
  { dir: 'equity-comp-tracker', accent: '#60a5fa', label: 'Decision Tracker · $29' },
  { dir: 'tech-worker-annual-review', accent: '#a78bfa', label: 'Annual Review · $39' },
  { dir: 'multi-state-equity-planner', accent: '#34d399', label: 'Multi-State · $49' },
];

function htmlShell({ title, body, accent, label }) {
  const accentCss = `--accent: ${accent}; --callout-bd: ${hexToRgba(accent, 0.35)}; --callout-bg: ${hexToRgba(accent, 0.08)};`;
  return `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><title>${escapeHtml(title)}</title>
<style>${CSS}
:root { ${accentCss} }
</style></head><body>
<div class="page">
  <div class="brand">
    <span class="brand-dot"></span>
    <span>MATHSTUB · NOTION TOOLKIT · ${escapeHtml(label)}</span>
  </div>
  ${body}
</div>
</body></html>`;
}

function hexToRgba(hex, a) {
  const m = hex.replace('#', '');
  const r = parseInt(m.substr(0, 2), 16);
  const g = parseInt(m.substr(2, 2), 16);
  const b = parseInt(m.substr(4, 2), 16);
  return `rgba(${r},${g},${b},${a})`;
}

function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, (c) =>
    ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]
  );
}

async function captureTemplate(browser, t) {
  const dir = path.join(ROOT, t.dir);
  const md = await readFile(path.join(dir, 'template.md'), 'utf8');
  // Strip the Loom placeholder block so previews look clean
  const cleaned = md.replace(/> ▶️ \*\*Watch the.*?\*\*[\s\S]*?\n---\n/m, '');
  const body = marked.parse(cleaned);
  const html = htmlShell({
    title: t.dir,
    body,
    accent: t.accent,
    label: t.label,
  });

  // Write the HTML to disk so we can iterate visually
  const htmlPath = path.join(dir, 'preview.html');
  await writeFile(htmlPath, html, 'utf8');

  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 720, deviceScaleFactor: 1.5 });
  await page.goto('file://' + htmlPath.replace(/\\/g, '/'), { waitUntil: 'networkidle0' });

  // Hero: 1280x720 above-the-fold
  const heroBuf = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 720 } });
  await sharp(heroBuf).resize(1280, 720).png({ compressionLevel: 9 }).toFile(path.join(dir, 'preview-hero.png'));

  // Full: tall full-page screenshot
  const fullBuf = await page.screenshot({ fullPage: true });
  await sharp(fullBuf).png({ compressionLevel: 9 }).toFile(path.join(dir, 'preview-full.png'));

  // Animated WebP tour: scroll top-to-bottom in 16 frames
  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  const viewportHeight = 720;
  const totalScroll = Math.max(0, pageHeight - viewportHeight);
  const frameCount = 18;
  const frames = [];
  for (let i = 0; i < frameCount; i++) {
    const y = Math.round((totalScroll * i) / (frameCount - 1));
    await page.evaluate((scrollY) => window.scrollTo(0, scrollY), y);
    await new Promise((r) => setTimeout(r, 50));
    const fb = await page.screenshot({ clip: { x: 0, y: 0, width: 1280, height: 720 } });
    frames.push(await sharp(fb).resize(960, 540).toBuffer());
  }
  // Compose animated WebP — sharp supports this via joinChannel-like ops but the simplest path is via 'animated' input
  // We'll build a frame strip and let sharp emit animated webp via the `animated` option on input
  // Sharp animated output: use sharp.create + joinChannel for static, or use sharp's modern animated API
  // For broad compatibility we'll just write the first/last/mid frames as 3 stills + use sharp to make a single composite filmstrip
  // Plus an animated GIF via the loop trick
  try {
    // Build vertical filmstrip composite (visual gallery alternative)
    const stripFrames = [0, 4, 9, 13, 17].map((i) => frames[i]);
    const strip = await sharp({
      create: { width: 960, height: 540 * stripFrames.length + 12 * (stripFrames.length - 1), channels: 4, background: { r: 12, g: 29, b: 62, alpha: 1 } },
    })
      .composite(stripFrames.map((buf, idx) => ({ input: buf, top: idx * (540 + 12), left: 0 })))
      .webp({ quality: 88 })
      .toBuffer();
    await writeFile(path.join(dir, 'preview-strip.webp'), strip);

    // Animated WebP: encode all frames
    // Sharp v0.32+ supports animated input only; for animated OUTPUT we use the `pages` trick:
    // build a single tall image where each "page" is 540px high then output webp with `pageHeight` set.
    const combined = Buffer.concat(frames);
    // simpler: build a tall stitched image with each frame stacked vertically, then webp({ pageHeight }) treats each slice as a frame
    const tall = await sharp({
      create: { width: 960, height: 540 * frames.length, channels: 4, background: { r: 12, g: 29, b: 62, alpha: 1 } },
    })
      .composite(frames.map((buf, idx) => ({ input: buf, top: idx * 540, left: 0 })))
      .png()
      .toBuffer();
    await sharp(tall, { animated: false })
      .webp({ pageHeight: 540, loop: 0, delay: 700, quality: 75, effort: 5 })
      .toFile(path.join(dir, 'preview-tour.webp'));
  } catch (e) {
    console.warn(`[${t.dir}] animated webp failed:`, e.message);
  }

  await page.close();
  console.log(`  ${t.dir}: hero + full + tour generated`);
}

async function main() {
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  try {
    for (const t of templates) {
      await mkdir(path.join(ROOT, t.dir), { recursive: true });
      await captureTemplate(browser, t);
    }
  } finally {
    await browser.close();
  }
  console.log('done.');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
