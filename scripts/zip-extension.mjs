#!/usr/bin/env node
// Pack chrome-extension/ into dist/equity-vest-tracker-v<version>.zip ready
// for upload to the Chrome Web Store. The manifest.json must be at the ZIP
// root (Chrome rejects nested manifests).

import { readFile, mkdir, readdir, stat } from 'node:fs/promises';
import { createWriteStream, createReadStream } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { spawn } from 'node:child_process';
import path from 'node:path';
import { pipeline } from 'node:stream/promises';
import zlib from 'node:zlib';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, '..');
const EXT_DIR = path.join(REPO_ROOT, 'chrome-extension');
const DIST_DIR = path.join(REPO_ROOT, 'dist');

async function walk(root) {
  const entries = await readdir(root, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(root, entry.name);
    if (entry.isDirectory()) {
      files.push(...(await walk(full)));
    } else {
      files.push(full);
    }
  }
  return files;
}

// Minimal ZIP writer (store + deflate). Avoids adding a 3rd-party dep.
async function writeZip(outPath, files, srcRoot) {
  const out = createWriteStream(outPath);

  /** @type {{name: string, crc32: number, compressed: Buffer, uncompressedSize: number, offset: number, method: number}[]} */
  const central = [];
  let offset = 0;

  function crc32(buf) {
    let c = 0xffffffff;
    for (let i = 0; i < buf.length; i++) {
      c ^= buf[i];
      for (let k = 0; k < 8; k++) {
        c = (c >>> 1) ^ (0xedb88320 & -(c & 1));
      }
    }
    return (c ^ 0xffffffff) >>> 0;
  }

  function dosTime(d = new Date()) {
    const time =
      ((d.getHours() & 0x1f) << 11) |
      ((d.getMinutes() & 0x3f) << 5) |
      ((Math.floor(d.getSeconds() / 2)) & 0x1f);
    const date =
      (((d.getFullYear() - 1980) & 0x7f) << 9) |
      (((d.getMonth() + 1) & 0xf) << 5) |
      (d.getDate() & 0x1f);
    return { time, date };
  }

  for (const fullPath of files) {
    const rel = path.relative(srcRoot, fullPath).split(path.sep).join('/');
    const data = await readFile(fullPath);
    const compressed = zlib.deflateRawSync(data, { level: 9 });
    const useDeflate = compressed.length < data.length;
    const payload = useDeflate ? compressed : data;
    const method = useDeflate ? 8 : 0;
    const crc = crc32(data);
    const { time, date } = dosTime();
    const nameBuf = Buffer.from(rel, 'utf8');

    const local = Buffer.alloc(30);
    local.writeUInt32LE(0x04034b50, 0);
    local.writeUInt16LE(20, 4);
    local.writeUInt16LE(0, 6);
    local.writeUInt16LE(method, 8);
    local.writeUInt16LE(time, 10);
    local.writeUInt16LE(date, 12);
    local.writeUInt32LE(crc, 14);
    local.writeUInt32LE(payload.length, 18);
    local.writeUInt32LE(data.length, 22);
    local.writeUInt16LE(nameBuf.length, 26);
    local.writeUInt16LE(0, 28);

    out.write(local);
    out.write(nameBuf);
    out.write(payload);

    central.push({
      name: rel,
      crc32: crc,
      compressedSize: payload.length,
      uncompressedSize: data.length,
      offset,
      method,
      time,
      date,
    });

    offset += local.length + nameBuf.length + payload.length;
  }

  const centralStart = offset;
  let centralSize = 0;
  for (const e of central) {
    const nameBuf = Buffer.from(e.name, 'utf8');
    const cd = Buffer.alloc(46);
    cd.writeUInt32LE(0x02014b50, 0);
    cd.writeUInt16LE(20, 4);
    cd.writeUInt16LE(20, 6);
    cd.writeUInt16LE(0, 8);
    cd.writeUInt16LE(e.method, 10);
    cd.writeUInt16LE(e.time, 12);
    cd.writeUInt16LE(e.date, 14);
    cd.writeUInt32LE(e.crc32, 16);
    cd.writeUInt32LE(e.compressedSize, 20);
    cd.writeUInt32LE(e.uncompressedSize, 24);
    cd.writeUInt16LE(nameBuf.length, 28);
    cd.writeUInt16LE(0, 30);
    cd.writeUInt16LE(0, 32);
    cd.writeUInt16LE(0, 34);
    cd.writeUInt16LE(0, 36);
    cd.writeUInt32LE(0, 38);
    cd.writeUInt32LE(e.offset, 42);

    out.write(cd);
    out.write(nameBuf);
    centralSize += cd.length + nameBuf.length;
  }

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(central.length, 8);
  eocd.writeUInt16LE(central.length, 10);
  eocd.writeUInt32LE(centralSize, 12);
  eocd.writeUInt32LE(centralStart, 16);
  eocd.writeUInt16LE(0, 20);
  out.write(eocd);

  await new Promise((resolve, reject) => {
    out.end((err) => (err ? reject(err) : resolve()));
  });
}

async function main() {
  const manifest = JSON.parse(await readFile(path.join(EXT_DIR, 'manifest.json'), 'utf8'));
  const version = manifest.version;
  const allFiles = await walk(EXT_DIR);
  const filtered = allFiles.filter((f) => {
    const rel = path.relative(EXT_DIR, f);
    if (rel.startsWith('.git') || rel.includes('node_modules')) return false;
    if (/\.(md|svg)$/i.test(rel)) return false; // exclude doc + raw svg
    return true;
  });

  await mkdir(DIST_DIR, { recursive: true });
  const out = path.join(DIST_DIR, `equity-vest-tracker-v${version}.zip`);
  await writeZip(out, filtered, EXT_DIR);

  const s = await stat(out);
  console.log(`✓ wrote ${out} (${(s.size / 1024).toFixed(1)} KB, ${filtered.length} files)`);
  console.log('  Upload at https://chrome.google.com/webstore/devconsole');
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
