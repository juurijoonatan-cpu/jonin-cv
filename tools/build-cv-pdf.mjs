/* Regenerates assets/Joni_Juuri_CV.pdf from the live CV page.
 *
 * The download button serves a static file, so the PDF does NOT update when the
 * CV changes. It silently went a long way out of date once already. Run this
 * after any edit to js/PrivateCV.jsx or to the print styles in index.html.
 *
 *   npm i -D puppeteer            # or point EXECUTABLE_PATH at a local Chrome
 *   node tools/build-cv-pdf.mjs   # serves the repo, prints, writes the asset
 *
 * What it relies on:
 *   - the @media print block in index.html, which strips the site chrome and
 *     inverts the dark panels so the document is not pages of solid black
 *   - localStorage seeded so the app opens on the CV rather than the gate
 */
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const OUT = path.join(ROOT, 'assets', 'Joni_Juuri_CV.pdf');
const PORT = Number(process.env.PORT || 8977);

const TYPES = {
  '.html': 'text/html', '.jsx': 'text/babel', '.css': 'text/css',
  '.js': 'text/javascript', '.json': 'application/json',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.pdf': 'application/pdf',
  '.woff2': 'font/woff2', '.svg': 'image/svg+xml',
};

const server = http.createServer((req, res) => {
  const rel = decodeURIComponent(req.url.split('?')[0]).replace(/^\/+/, '') || 'index.html';
  const file = path.join(ROOT, rel);
  if (!file.startsWith(ROOT) || !fs.existsSync(file) || fs.statSync(file).isDirectory()) {
    res.writeHead(404); res.end('not found'); return;
  }
  res.writeHead(200, { 'Content-Type': TYPES[path.extname(file)] || 'application/octet-stream' });
  fs.createReadStream(file).pipe(res);
});

await new Promise(r => server.listen(PORT, r));

const { default: puppeteer } = await import(
  process.env.EXECUTABLE_PATH ? 'puppeteer-core' : 'puppeteer'
);
const browser = await puppeteer.launch({
  headless: 'shell',
  ...(process.env.EXECUTABLE_PATH ? { executablePath: process.env.EXECUTABLE_PATH } : {}),
  args: ['--no-sandbox', '--font-render-hinting=none'],
});

const page = await browser.newPage();
await page.setViewport({ width: 1180, height: 1200 });
/* Seed auth + view before any app script runs, so it opens straight on the CV. */
await page.evaluateOnNewDocument(() => {
  try {
    localStorage.setItem('jj-authed', '1');
    localStorage.setItem('jj-view', 'cv');
  } catch (_) {}
});
await page.goto(`http://localhost:${PORT}/index.html`, { waitUntil: 'networkidle0' });
await new Promise(r => setTimeout(r, 3500));   // Babel compiles the JSX in-browser
await page.evaluateHandle('document.fonts.ready');

const ok = await page.evaluate(() => document.body.innerText.includes('Executive summary'));
if (!ok) throw new Error('CV did not render; refusing to write a blank PDF');

await page.pdf({ path: OUT, format: 'A4', printBackground: true, preferCSSPageSize: true });
await browser.close();
server.close();

console.log('wrote', path.relative(ROOT, OUT), fs.statSync(OUT).size, 'bytes');
