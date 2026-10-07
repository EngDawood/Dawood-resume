import { chromium } from 'playwright';
// Regenerates public/og/*.png from the running site. Needs playwright + chromium:
//   pnpm build && npx serve dist -l 4321 &  then  node scripts/og.mjs
const out = new URL('../public/og', import.meta.url).pathname;
const b = await chromium.launch();
for (const lang of ['ar', 'en']) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: 'reduce', colorScheme: 'light' });
  await p.goto(`http://localhost:4321/personal/${lang}/`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.waitForTimeout(3500);
  await p.addStyleTag({ content: `.nav,.ctas,.c-top,.c-panel .c-form,.c-io,.c-foot{display:none!important}
    .hero{min-height:630px!important;padding:44px 56px!important;grid-template-columns:1fr 1fr!important;gap:44px!important}
    .c-results{max-height:none!important}.c-panel{padding-top:14px!important}
    .name{font-size:${lang === "ar" ? 74 : 70}px!important}.line{font-size:20px!important;margin-bottom:0!important}` });
  await p.waitForTimeout(400);
  await p.screenshot({ path: `${out}/personal-${lang}.png` });
  await p.screenshot({ path: `${out}/cv-${lang}.png` });
  await p.close();
}
await b.close();
