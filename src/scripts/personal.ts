// Interactions for the personal site. No framework: classes, CSS variables and small modules.
import { initConsole } from './console';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function init() {
  theme();
  reveal();
  initConsole();
  filters();
  dialog();
  counters();
  liveNpm();
  copy();
}

/* ---------- light / dark ---------- */
function theme() {
  const btn = $('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const label = $('.theme-label', btn)!;
  const sync = () => {
    const dark = root.dataset.theme === 'dark';
    label.textContent = dark ? btn.dataset.light! : btn.dataset.dark!; // the label names the mode you switch to
    btn.setAttribute('aria-pressed', String(dark));
  };
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    try { localStorage.setItem('dr-theme', root.dataset.theme); } catch {}
    sync();
  });
}

/* ---------- reveal on enter ---------- */
function reveal() {
  const els = $$('.reveal');
  if (reduce || !('IntersectionObserver' in window)) { els.forEach((e) => e.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }, { rootMargin: '0px 0px -6% 0px', threshold: 0.08 });
  els.forEach((e) => io.observe(e));
}

/* ---------- project filters ---------- */
function filters() {
  const btns = $$<HTMLButtonElement>('.filter');
  const cards = $$('.card');
  for (const b of btns) b.addEventListener('click', () => {
    const g = b.dataset.filter!;
    btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    for (const c of cards) {
      const show = g === 'all' || c.dataset.group === g;
      if (show) { c.hidden = false; requestAnimationFrame(() => c.classList.remove('out')); }
      else { c.classList.add('out'); setTimeout(() => { if (c.classList.contains('out')) c.hidden = true; }, reduce ? 0 : 220); }
    }
  });
}

/* ---------- project dialog ---------- */
function dialog() {
  const dlg = $<HTMLDialogElement>('#project-dialog');
  if (!dlg) return;
  let opener: HTMLElement | null = null;
  const close = () => dlg.close();
  dlg.addEventListener('click', (e) => { if (e.target === dlg || (e.target as Element).closest('[data-close]')) close(); });
  dlg.addEventListener('close', () => { document.body.classList.remove('locked'); opener?.focus(); });
  for (const btn of $$<HTMLButtonElement>('.card-btn')) btn.addEventListener('click', () => {
    const id = btn.dataset.open!;
    const tpl = $<HTMLTemplateElement>(`template[data-tpl="${id}"]`);
    if (!tpl) return;
    opener = btn;
    const body = $('.sheet-body', dlg)!, vis = $('.sheet-vis', dlg)!;
    body.replaceChildren(tpl.content.cloneNode(true));
    $('.d-title', body)?.setAttribute('id', 'dlg-title');
    const v = $('[data-vis]', btn);
    vis.replaceChildren(...(v ? [v.cloneNode(true)] : []));
    dlg.classList.toggle('has-vis', !!v);
    dlg.showModal();
    document.body.classList.add('locked');
    $<HTMLElement>('[data-close]', dlg)?.focus();
  });
}

/* ---------- counters ---------- */
function counters() {
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      const el = e.target as HTMLElement;
      const target = Number(el.dataset.count);
      const fmt = new Intl.NumberFormat(el.dataset.locale || 'en-US');
      const t0 = performance.now();
      const tick = (t: number) => {
        const k = Math.min(1, (t - t0) / 1400);
        el.textContent = fmt.format(Math.round(target * (1 - Math.pow(1 - k, 4))));
        if (k < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    }
  }, { threshold: 0.6 });
  $$('.num[data-count]').forEach((n) => io.observe(n));
}

/* ---------- live npm downloads (api.npmjs.org allows browser requests) ---------- */
async function liveNpm() {
  try {
    const res = await fetch('https://api.npmjs.org/downloads/point/last-month/@dawod/thmanyah-font-web');
    if (!res.ok) return;
    const { downloads } = await res.json();
    if (!Number.isFinite(downloads)) return;
    for (const el of $$('[data-live="npm"]')) {
      el.dataset.count = String(downloads);
      el.textContent = new Intl.NumberFormat(el.dataset.locale || 'en-US').format(downloads);
    }
  } catch { /* the build-time number stays */ }
}

/* ---------- copy email ---------- */
function copy() {
  const toast = $('.toast');
  for (const b of $$<HTMLButtonElement>('[data-copy]')) b.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(b.dataset.copy!);
      if (toast) { toast.textContent = b.dataset.done!; toast.classList.add('show'); setTimeout(() => toast.classList.remove('show'), 1800); }
    } catch { location.href = `mailto:${b.dataset.copy}`; }
  });
}
