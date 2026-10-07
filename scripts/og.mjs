import { chromium } from 'playwright';
// Regenerates public/og/*.png from the running site. Needs playwright + chromium:
//   pnpm build && npx serve dist -l 4321 &  then  node scripts/og.mjs
const out = new URL('../public/og', import.meta.url).pathname;
const b = await chromium.launch();
for (const lang of ['ar', 'en']) {
  const p = await b.newPage({ viewport: { width: 1200, height: 630 }, reducedMotion: 'reduce' });
  await p.goto(`http://localhost:4321/personal/${lang}/`, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.fonts.ready);
  await p.addStyleTag({ content: `.nav,.caption,.ctas,.skip{display:none!important}
    .hero{padding-top:40px!important;padding-bottom:0!important;min-height:630px!important;grid-template-columns:1.15fr .85fr!important}
    .qam{--lx:.62!important;--ly:.26!important;width:330px!important}
    .qam-svg{max-height:560px!important}.name{font-size:118px!important}html[lang=ar] .name{font-size:92px!important}` });
  await p.evaluate(() => { const f = document.querySelector('[data-qam]'); f.style.setProperty('--lx', '.62'); f.style.setProperty('--ly', '.26'); });
  await p.waitForTimeout(500);
  await p.screenshot({ path: `${out}/personal-${lang}.png` });
  await p.screenshot({ path: `${out}/cv-${lang}.png` });
  await p.close();
}
await b.close();
