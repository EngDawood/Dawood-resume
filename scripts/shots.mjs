import { chromium } from 'playwright';
// Captures the live project websites into public/shots/ (run manually; needs playwright).
const out = new URL('../public/shots', import.meta.url).pathname;
const sites = [
  ['tamkeen', 'https://tit-edu-sa.vercel.app/'],
  ['yemen-map', 'https://yemen-map.dawod.workers.dev/'],
  ['thmanyah', 'https://engdawood.github.io/thmanyah-font-web/examples/demo.html'],
];
const b = await chromium.launch();
for (const [id, u] of sites) {
  const p = await b.newPage({ viewport: { width: 1280, height: 800 }, deviceScaleFactor: 1 });
  try {
    await p.goto(u, { waitUntil: 'networkidle', timeout: 45000 });
  } catch (e) { console.log(id, 'nav warn', e.message.slice(0, 80)); }
  await p.waitForTimeout(3500);
  await p.screenshot({ path: `${out}/${id}.png` }); // convert to .webp (960x600) afterwards
  console.log(id, 'ok');
  await p.close();
}
await b.close();
