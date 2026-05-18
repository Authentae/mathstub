#!/usr/bin/env node
import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '..', 'chrome-extension', 'webstore-assets');

const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 240 240">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1d4ed8"/>
      <stop offset="100%" stop-color="#1e3a8a"/>
    </linearGradient>
  </defs>
  <rect width="240" height="240" rx="40" fill="url(#bg)"/>
  <rect x="40" y="48" width="36" height="6" rx="3" fill="#fbbf24"/>
  <text x="40" y="120" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="64" font-weight="800" fill="#ffffff">M</text>
  <text x="40" y="180" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="22" font-weight="600" fill="#ffffff" letter-spacing="2">MATHSTUB</text>
  <path d="M50 215 L75 200 L100 205 L125 180 L150 175 L175 155 L195 150"
        stroke="#fbbf24" stroke-width="3" fill="none" stroke-linecap="round"/>
  <circle cx="195" cy="150" r="5" fill="#fbbf24"/>
</svg>
`.trim();

async function main() {
  const { default: sharp } = await import('sharp');
  await mkdir(OUT_DIR, { recursive: true });
  await writeFile(path.join(OUT_DIR, 'ph-thumbnail-240.svg'), SVG, 'utf8');
  await sharp(Buffer.from(SVG))
    .resize(240, 240)
    .png({ compressionLevel: 9 })
    .toFile(path.join(OUT_DIR, 'ph-thumbnail-240.png'));
  console.log('  wrote ph-thumbnail-240.png');
}
main().catch(e => { console.error(e); process.exit(1); });
