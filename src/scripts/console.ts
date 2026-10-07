// Live MCP console: calls Dawood's public MCP servers from the visitor's browser.
import { McpClient } from './mcp';
import { highlightJson, interleave } from './highlight';

type Author = string | { fullname?: string; name?: string; username?: string };
type Paper = { title: string; authors?: Author[]; published_date?: string; source: string; url?: string; pdf_url?: string };
type PaperResult = { sources: { source: string; count: number; ms: number; error?: string }[]; papers: Paper[] };
type Story = { title: string; style: string; preview_url: string };

const PAPERS = new McpClient('https://paper-search-mcp.engdawood.com/mcp', false);
const STORY = new McpClient('https://storyset-mcp.engdawood.com/mcp', true);
const HOSTS = { papers: 'paper-search-mcp.engdawood.com', storyset: 'storyset-mcp.engdawood.com' };
const REPOS = { papers: 'https://github.com/EngDawood/paper-search-mcp-server', storyset: 'https://github.com/EngDawood/MCP-STORYSET' };

// Sources disagree on author shape: OpenReview sometimes sends {fullname, username} objects.
const authorName = (a: Author) => (typeof a === 'string' ? a : a?.fullname || a?.name || a?.username?.replace(/^~|\d+$/g, '').replace(/_/g, ' ') || '');

const el = <K extends keyof HTMLElementTagNameMap>(tag: K, props: Partial<HTMLElementTagNameMap[K]> & { dir?: string } = {}, ...kids: (Node | string)[]) => {
  const n = document.createElement(tag);
  Object.assign(n, props);
  if (props.dir) n.setAttribute('dir', props.dir);
  n.append(...kids);
  return n;
};

export function initConsole() {
  const root = document.querySelector<HTMLElement>('[data-console]');
  if (!root) return;
  const S: Record<string, string> = JSON.parse(root.dataset.strings || '{}');
  const saved = root.dataset.saved || '';
  const paperSources: string[] = JSON.parse(root.dataset.sources || '[]');
  const status = root.querySelector<HTMLElement>('[data-status]')!;
  const dot = root.querySelector<HTMLElement>('[data-dot]')!;
  const host = root.querySelector<HTMLElement>('[data-host]')!;
  const repo = root.querySelector<HTMLAnchorElement>('[data-repo]')!;
  const fmtSec = (ms: number) => `${(ms / 1000).toLocaleString(document.documentElement.lang === 'ar' ? 'ar-EG' : 'en-US', { maximumFractionDigits: 2 })} ${S.sec}`;
  const setStatus = (kind: 'idle' | 'busy' | 'ok' | 'fail', text: string) => {
    status.textContent = text;
    root.dataset.state = kind;
    dot.dataset.state = kind;
  };

  /* ---------- tabs ---------- */
  const tabs = [...root.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
  const select = (t: HTMLButtonElement, focus = false) => {
    for (const x of tabs) {
      const on = x === t;
      x.setAttribute('aria-selected', String(on));
      x.tabIndex = on ? 0 : -1;
      root.querySelector<HTMLElement>(`#${x.getAttribute('aria-controls')}`)!.hidden = !on;
    }
    const key = t.dataset.tab as 'papers' | 'storyset';
    host.textContent = HOSTS[key];
    repo.href = REPOS[key];
    if (focus) t.focus();
    if (key === 'storyset' && !storyLoaded) { storyLoaded = true; runStory(storyInput.value); }
  };
  tabs.forEach((t, i) => {
    t.addEventListener('click', () => select(t));
    t.addEventListener('keydown', (e) => {
      const rtl = document.documentElement.dir === 'rtl';
      let next = 0;
      if (e.key === 'ArrowRight') next = rtl ? -1 : 1;
      else if (e.key === 'ArrowLeft') next = rtl ? 1 : -1;
      if (!next) return;
      e.preventDefault();
      select(tabs[(i + next + tabs.length) % tabs.length], true);
    });
  });

  /* ---------- papers ---------- */
  const pForm = root.querySelector<HTMLFormElement>('[data-form="papers"]')!;
  const pInput = pForm.querySelector<HTMLInputElement>('input')!;
  const pReq = root.querySelector<HTMLElement>('#panel-papers [data-req]')!;
  const pSources = root.querySelector<HTMLElement>('[data-sources-list]')!;
  const pResults = root.querySelector<HTMLElement>('[data-results]')!;
  let busyPapers = false;

  const renderSources = (sources: PaperResult['sources']) => {
    const max = Math.max(1, ...sources.map((s) => s.ms));
    pSources.replaceChildren(...sources.map((s) => {
      const li = el('li', {}, el('span', { className: 's-name' }, s.source), el('span', { className: 's-bar' }, el('i')), el('span', { className: 's-ms' }, `${s.ms} ms`), el('span', { className: 's-n' }, s.error ? '×' : String(s.count)));
      if (s.error) li.classList.add('err');
      li.style.setProperty('--w', `${Math.max(4, (s.ms / max) * 100).toFixed(1)}%`);
      return li;
    }));
    pSources.classList.remove('grow'); void pSources.offsetWidth; pSources.classList.add('grow');
  };
  const renderPapers = (papers: Paper[]) => {
    const list = interleave(papers, 6);
    if (!list.length) { pResults.replaceChildren(el('li', { className: 'r-empty' }, S.empty)); return; }
    pResults.replaceChildren(...list.map((r) => {
      const year = (r.published_date || '').slice(0, 4);
      const authors = (r.authors || []).slice(0, 3).map(authorName).filter(Boolean).join(', ');
      return el('li', {},
        el('a', { className: 'r-title', href: r.url || r.pdf_url || '#', target: '_blank', rel: 'noopener', dir: 'ltr' }, r.title),
        el('span', { className: 'r-meta', dir: 'ltr' }, `${authors}${year ? ` · ${year}` : ''}`),
        el('span', { className: 'r-src', dir: 'ltr' }, r.source));
    }));
  };

  async function runPapers(query: string) {
    query = query.trim();
    if (!query || busyPapers) return;
    busyPapers = true;
    const args = { query, sources: paperSources, max_results_per_source: 3 };
    pReq.innerHTML = highlightJson(PAPERS.describe('search_papers', args));
    root.querySelector('#panel-papers')!.classList.add('busy');
    setStatus('busy', S.loading);
    try {
      const { result, ms } = await PAPERS.call<PaperResult>('search_papers', args);
      renderSources(result.sources);
      renderPapers(result.papers);
      setStatus('ok', `${S.live} ${fmtSec(ms)}`);
    } catch {
      setStatus('fail', S.failed);
    } finally {
      busyPapers = false;
      root.querySelector('#panel-papers')!.classList.remove('busy');
    }
  }
  pForm.addEventListener('submit', (e) => { e.preventDefault(); runPapers(pInput.value); });
  pForm.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.addEventListener('click', () => { pInput.value = b.dataset.q!; runPapers(b.dataset.q!); }));

  /* ---------- storyset ---------- */
  const sForm = root.querySelector<HTMLFormElement>('[data-form="storyset"]')!;
  const storyInput = sForm.querySelector<HTMLInputElement>('input')!;
  const sReq = root.querySelector<HTMLElement>('#panel-storyset [data-req]')!;
  const grid = root.querySelector<HTMLElement>('[data-grid]')!;
  const big = root.querySelector<HTMLImageElement>('[data-big]')!;
  let storyLoaded = false, busyStory = false, current = big.getAttribute('src') || '';
  const palettes = new Map<string, string>();

  const pick = (btn: HTMLButtonElement) => {
    grid.querySelectorAll('.c-thumb').forEach((b) => { b.classList.toggle('on', b === btn); b.setAttribute('aria-pressed', String(b === btn)); });
    current = btn.dataset.src!;
    big.src = current;
    big.alt = btn.dataset.title || '';
  };
  const bindThumbs = () => grid.querySelectorAll<HTMLButtonElement>('.c-thumb').forEach((b) => b.addEventListener('click', () => pick(b)));
  bindThumbs();

  async function runStory(query: string) {
    query = query.trim();
    if (!query || busyStory) return;
    busyStory = true;
    const args = { query, limit: 6 };
    sReq.innerHTML = highlightJson(STORY.describe('search', args));
    setStatus('busy', S.loading);
    try {
      const { result, ms } = await STORY.call<{ results: Story[] }>('search', args);
      const items = result.results || [];
      if (!items.length) { grid.replaceChildren(el('li', { className: 'r-empty' }, S.empty)); setStatus('ok', `${S.live} ${fmtSec(ms)}`); return; }
      grid.replaceChildren(...items.map((r, i) => {
        const img = el('img', { src: r.preview_url, alt: `${r.title} (${r.style})`, loading: 'lazy', width: 160, height: 120 });
        const btn = el('button', { type: 'button', className: `c-thumb${i === 0 ? ' on' : ''}` }, img);
        btn.dataset.src = r.preview_url; btn.dataset.title = r.title;
        btn.setAttribute('aria-pressed', String(i === 0));
        return el('li', {}, btn);
      }));
      bindThumbs();
      pick(grid.querySelector<HTMLButtonElement>('.c-thumb')!);
      setStatus('ok', `${S.live} ${fmtSec(ms)}`);
    } catch {
      setStatus('fail', S.failed);
    } finally { busyStory = false; }
  }
  sForm.addEventListener('submit', (e) => { e.preventDefault(); runStory(storyInput.value); });
  sForm.querySelectorAll<HTMLButtonElement>('[data-q]').forEach((b) => b.addEventListener('click', () => { storyInput.value = b.dataset.q!; runStory(b.dataset.q!); }));

  // recolor: find the illustration's main colour (extract_palette), then swap it (recolor_svg)
  const neutral = (hex: string) => {
    const n = parseInt(hex.slice(1), 16), r = n >> 16, g = (n >> 8) & 255, b = n & 255;
    return Math.max(r, g, b) - Math.min(r, g, b) < 40; // greys, white, near-black
  };
  root.querySelectorAll<HTMLButtonElement>('.sw').forEach((sw) => sw.addEventListener('click', async () => {
    if (busyStory || !current) return;
    busyStory = true;
    root.querySelectorAll('.sw').forEach((x) => x.classList.toggle('on', x === sw));
    const source = current.startsWith('https://stories.freepiklabs.com') ? current : decodeURIComponent(new URL(current).searchParams.get('src') || '');
    setStatus('busy', S.loading);
    const t0 = performance.now();
    try {
      let main = palettes.get(source);
      if (!main) {
        sReq.innerHTML = highlightJson(STORY.describe('extract_palette', { source, top: 6 }));
        const { result } = await STORY.call<{ palette: { color: string }[] }>('extract_palette', { source, top: 6 });
        main = (result.palette.find((p) => !neutral(p.color)) || result.palette[0]).color;
        palettes.set(source, main);
      }
      const args = { source, mapping: { [main]: sw.dataset.color! } };
      sReq.innerHTML = highlightJson(STORY.describe('recolor_svg', args));
      const { result } = await STORY.call<{ url: string }>('recolor_svg', args);
      big.src = result.url;
      current = result.url;
      setStatus('ok', `${S.live} ${fmtSec(Math.round(performance.now() - t0))}`);
    } catch {
      setStatus('fail', S.recolorFailed);
    } finally { busyStory = false; }
  }));

  /* ---------- first live call when the console comes into view ---------- */
  setStatus('idle', `${S.saved} ${saved}`);
  const io = new IntersectionObserver(([e]) => {
    if (!e.isIntersecting) return;
    io.disconnect();
    runPapers(pInput.value);
  }, { threshold: 0.3 });
  io.observe(root);
}
