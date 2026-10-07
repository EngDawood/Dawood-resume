// Refreshes src/data/stats.json before each build.
// Telegram has no CORS-enabled API, so the subscriber count is read at build time
// (the deploy workflow also runs on a daily schedule). On any failure the last
// known value is kept, so a flaky network never breaks the build or zeroes a number.
import { readFile, writeFile } from 'node:fs/promises';

const FILE = new URL('../src/data/stats.json', import.meta.url);
const stats = JSON.parse(await readFile(FILE, 'utf8'));
let changed = false;

async function get(url) {
  const res = await fetch(url, { headers: { 'user-agent': 'dawood-resume-build' }, signal: AbortSignal.timeout(15000) });
  if (!res.ok) throw new Error(`${url} -> HTTP ${res.status}`);
  return res;
}

try {
  const html = await (await get('https://t.me/hr_yemen')).text();
  const m = html.match(/tgme_page_extra">([\d\s ,.]+)\s*(?:subscribers|members)/i);
  const n = m ? Number(m[1].replace(/[^\d]/g, '')) : NaN;
  if (Number.isFinite(n) && n > 0) {
    stats.hrYemenSubscribers.value = n;
    changed = true;
    console.log(`[stats] @hr_yemen subscribers: ${n}`);
  } else console.warn('[stats] could not parse subscriber count, keeping', stats.hrYemenSubscribers.value);
} catch (e) {
  console.warn('[stats] telegram fetch failed, keeping last value:', e.message);
}

try {
  const j = await (await get(stats.thmanyahNpm.source)).json();
  if (Number.isFinite(j.downloads)) {
    stats.thmanyahNpm.value = j.downloads;
    stats.thmanyahNpm.period = `${j.start}..${j.end}`;
    changed = true;
    console.log(`[stats] thmanyah npm downloads (last month): ${j.downloads}`);
  }
} catch (e) {
  console.warn('[stats] npm fetch failed, keeping last value:', e.message);
}

if (changed) {
  stats.updatedAt = new Date().toISOString().slice(0, 10);
  await writeFile(FILE, JSON.stringify(stats, null, 2) + '\n');
}
