// Tiny local server that serves the Notion template assets with permissive
// CORS so the Gumroad product editor can fetch and inject them via JS.
// Use: node scripts/upload-server.mjs (port 3201)
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..', 'notion-templates');

const FILES = {
  '/equity-cover': { p: 'equity-comp-tracker/cover.png', mime: 'image/png' },
  '/equity-tpl': { p: 'equity-comp-tracker/template.md', mime: 'text/markdown' },
  '/year-cover': { p: 'year-end-tax-checklist/cover.png', mime: 'image/png' },
  '/year-tpl': { p: 'year-end-tax-checklist/template.md', mime: 'text/markdown' },
  '/annual-cover': { p: 'tech-worker-annual-review/cover.png', mime: 'image/png' },
  '/annual-tpl': { p: 'tech-worker-annual-review/template.md', mime: 'text/markdown' },
};

const server = http.createServer((req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET');
  const route = FILES[req.url];
  if (!route) {
    res.statusCode = 404;
    return res.end('not found');
  }
  const full = path.join(ROOT, route.p);
  res.setHeader('Content-Type', route.mime);
  fs.createReadStream(full).pipe(res);
});

server.listen(3201, () => console.log('serving on http://localhost:3201'));
