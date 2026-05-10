#!/usr/bin/env node
// Generate Chrome extension icons (16/32/48/128 PNG) from an inline SVG.
// One-shot: run `npm run ext:icons` after editing the SVG below to refresh.
//
// Uses `sharp` for SVG → PNG rasterization. sharp is a normal Next.js
// transitive dependency on most stacks, but if it's not available we
// fall back to writing the SVG itself with a note for the user.

import { writeFile, mkdir } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUT_DIR = path.resolve(__dirname, '..', 'chrome-extension', 'icons');

// Brand: Mathstub blue (#1d4ed8) + ticker-tape "EQ" mark.
const SVG = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">
  <rect width="128" height="128" rx="22" fill="#1d4ed8"/>
  <path d="M28 86 L48 66 L60 78 L100 38" stroke="#ffffff" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="100" cy="38" r="6" fill="#ffffff"/>
  <text x="64" y="112" font-family="-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, sans-serif"
        font-size="20" font-weight="700" fill="#ffffff" text-anchor="middle">EQ</text>
</svg>
`.trim();

const SIZES = [16, 32, 48, 128];

async function main() {
  await mkdir(OUT_DIR, { recursive: true });

  let sharp;
  try {
    ({ default: sharp } = await import('sharp'));
  } catch {
    console.warn(
      '[icons] sharp not installed. Writing source SVG only — install sharp to rasterize: npm install -D sharp',
    );
    await writeFile(path.join(OUT_DIR, 'icon.svg'), SVG, 'utf8');
    return;
  }

  await writeFile(path.join(OUT_DIR, 'icon.svg'), SVG, 'utf8');
  for (const size of SIZES) {
    const outPath = path.join(OUT_DIR, `icon-${size}.png`);
    await sharp(Buffer.from(SVG))
      .resize(size, size)
      .png({ compressionLevel: 9 })
      .toFile(outPath);
    console.log(`  wrote ${outPath}`);
  }
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
