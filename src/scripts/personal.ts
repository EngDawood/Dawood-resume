// Interactions for the personal site. No framework: every effect is a CSS variable or a class.
const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => r.querySelector<T>(s);
const $$ = <T extends Element = HTMLElement>(s: string, r: ParentNode = document) => [...r.querySelectorAll<T>(s)];

export function init() {
  theme();
  reveal();
  lamp();
  posters();
  filters();
  dialog();
  counters();
  liveNpm();
  copy();
}

/* ---------- day / night ---------- */
function theme() {
  const btn = $('[data-theme-toggle]');
  if (!btn) return;
  const root = document.documentElement;
  const label = $('.theme-label', btn)!;
  const sync = () => {
    const night = root.dataset.theme !== 'day';
    label.textContent = night ? btn.dataset.day! : btn.dataset.night!;
    btn.setAttribute('aria-pressed', String(!night));
  };
  sync();
  btn.addEventListener('click', () => {
    root.dataset.theme = root.dataset.theme === 'day' ? 'night' : 'day';
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
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  els.forEach((e) => io.observe(e));
  // the statement lights word by word where scroll-driven animations are unsupported
  const st = $('.statement');
  if (st && !CSS.supports('animation-timeline: view()')) {
    const so = new IntersectionObserver(([e]) => { if (e.isIntersecting) { st.classList.add('lit'); so.disconnect(); } }, { threshold: 0.4 });
    so.observe(st);
  }
}

/* ---------- hero lamp ---------- */
function lamp() {
  const fig = $<HTMLElement>('[data-qam]');
  const hero = $('[data-hero]');
  if (!fig || !hero) return;
  const svg = $<SVGSVGElement>('.qam-svg', fig)!;
  const tip = $('.qam-tip', fig)!;
  let lx = 0.5, ly = 0.3, tx = lx, ty = ly, lastMove = -1e9, visible = true, raf = 0;

  const set = () => { fig.style.setProperty('--lx', lx.toFixed(4)); fig.style.setProperty('--ly', ly.toFixed(4)); };
  set();
  hero.addEventListener('pointermove', (e) => {
    const b = svg.getBoundingClientRect();
    tx = Math.min(1.25, Math.max(-0.25, (e.clientX - b.left) / b.width));
    ty = Math.min(1.1, Math.max(-0.15, (e.clientY - b.top) / b.height));
    lastMove = performance.now();
    if (reduce) { lx = tx; ly = ty; set(); }
  });
  if (!reduce) {
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) loop(); }, { threshold: 0 }).observe(hero);
    const loop = () => {
      cancelAnimationFrame(raf);
      const step = (t: number) => {
        if (!visible) return;
        if (t - lastMove > 2600) { // idle: the sun drifts across the window
          const s = t / 5200;
          tx = 0.5 + Math.sin(s) * 0.36;
          ty = 0.27 + Math.cos(s * 0.8) * 0.12;
        }
        lx += (tx - lx) * 0.07; ly += (ty - ly) * 0.07;
        set();
        raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    loop();
  }

  // project panes: tooltip + open
  const panes = $$<SVGPathElement>('.qam-hit path', fig);
  const show = (p: SVGPathElement) => {
    tip.textContent = p.dataset.title || '';
    tip.style.left = `${p.dataset.x}%`;
    tip.style.top = `${p.dataset.y}%`;
    fig.classList.add('tipping');
    panes.forEach((q) => q.classList.toggle('on', q === p));
  };
  const hide = () => { fig.classList.remove('tipping'); panes.forEach((q) => q.classList.remove('on')); };
  for (const pane of panes) {
    pane.addEventListener('pointerenter', () => show(pane));
    pane.addEventListener('pointerleave', hide);
    pane.addEventListener('focus', () => show(pane));
    pane.addEventListener('blur', hide);
    const go = () => openProject(pane.dataset.project!);
    pane.addEventListener('click', go);
    pane.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } });
  }
}

/* ---------- gallery posters: hover lights the window ---------- */
function posters() {
  for (const win of $$('.win-btn')) {
    const art = $('.win-art', win)!;
    const svg = $<SVGSVGElement>('svg', art)!;
    let raf = 0;
    win.addEventListener('pointermove', (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const b = svg.getBoundingClientRect();
        const x = (e.clientX - b.left) / b.width, y = (e.clientY - b.top) / b.height;
        art.style.setProperty('--px', `${(x * 300).toFixed(1)}px`);
        art.style.setProperty('--py', `${(y * 400).toFixed(1)}px`);
        if (!reduce) {
          art.style.setProperty('--rx', `${((0.5 - y) * 7).toFixed(2)}deg`);
          art.style.setProperty('--ry', `${((x - 0.5) * 9).toFixed(2)}deg`);
        }
      });
    });
    win.addEventListener('pointerleave', () => {
      cancelAnimationFrame(raf);
      ['--px', '--py', '--rx', '--ry'].forEach((v) => art.style.removeProperty(v));
    });
    win.addEventListener('click', () => openProject(win.dataset.open!));
  }
}

/* ---------- filters ---------- */
function filters() {
  const btns = $$<HTMLButtonElement>('.filter');
  const wins = $$('.win');
  for (const b of btns) b.addEventListener('click', () => {
    const g = b.dataset.filter!;
    btns.forEach((x) => { x.classList.toggle('on', x === b); x.setAttribute('aria-pressed', String(x === b)); });
    for (const w of wins) {
      const show = g === 'all' || w.dataset.group === g;
      if (show) { w.hidden = false; requestAnimationFrame(() => w.classList.remove('out')); }
      else { w.classList.add('out'); setTimeout(() => { if (w.classList.contains('out')) w.hidden = true; }, reduce ? 0 : 260); }
    }
  });
}

/* ---------- project dialog ---------- */
let dlg: HTMLDialogElement | null = null;
let opener: Element | null = null;
function dialog() {
  dlg = $<HTMLDialogElement>('#project-dialog');
  if (!dlg) return;
  dlg.addEventListener('click', (e) => { if (e.target === dlg || (e.target as Element).closest('[data-close]')) close(); });
  dlg.addEventListener('close', () => { document.body.classList.remove('locked'); (opener as HTMLElement | null)?.focus?.(); });
}
function close() { dlg?.close(); }
function openProject(id: string) {
  if (!dlg) return;
  opener = document.activeElement;
  const tpl = $<HTMLTemplateElement>(`template[data-tpl="${id}"]`);
  const art = $(`.win[data-id="${id}"] .win-art svg`);
  if (!tpl) return;
  const body = $('.sheet-body', dlg)!, artBox = $('.sheet-art', dlg)!;
  body.replaceChildren(tpl.content.cloneNode(true));
  $('.d-title', body)?.setAttribute('id', 'dlg-title');
  artBox.replaceChildren(art ? art.cloneNode(true) : document.createTextNode(''));
  dlg.showModal();
  document.body.classList.add('locked');
  $<HTMLElement>('[data-close]', dlg)?.focus();
}

/* ---------- counters ---------- */
function counters() {
  const nums = $$('.num[data-count]');
  if (reduce || !('IntersectionObserver' in window)) return;
  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (!e.isIntersecting) continue;
      io.unobserve(e.target);
      run(e.target as HTMLElement);
    }
  }, { threshold: 0.6 });
  nums.forEach((n) => io.observe(n));
}
function run(el: HTMLElement) {
  const target = Number(el.dataset.count);
  const fmt = new Intl.NumberFormat(el.dataset.locale || 'en-US');
  const t0 = performance.now(), dur = 1500;
  const tick = (t: number) => {
    const k = Math.min(1, (t - t0) / dur);
    const eased = 1 - Math.pow(1 - k, 4);
    el.textContent = fmt.format(Math.round(target * eased));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
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
