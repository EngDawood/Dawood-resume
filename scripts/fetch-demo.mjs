// Captures a real response from each public MCP server into src/data/demo.json.
// The live console on the personal site shows this when a visitor's browser cannot reach a server.
import { readFile, writeFile } from 'node:fs/promises';
import { mcpSession } from './mcp-client.mjs';

const FILE = new URL('../src/data/demo.json', import.meta.url);
let demo = {};
try { demo = JSON.parse(await readFile(FILE, 'utf8')); } catch {}
export const PAPER_SOURCES = ['arxiv', 'pubmed', 'crossref', 'europepmc', 'openalex', 'openreview'];

try {
  const s = await mcpSession('https://paper-search-mcp.engdawood.com/mcp');
  const query = 'Arabic natural language processing';
  const { result, ms } = await s.call('search_papers', { query, sources: PAPER_SOURCES, max_results_per_source: 3 });
  demo.papers = {
    query, ms,
    sources: result.sources.map(({ source, count, ms, error }) => ({ source, count, ms, ...(error ? { error: true } : {}) })),
    papers: result.papers.slice(0, 12).map((p) => ({
      title: p.title, authors: (p.authors || []).slice(0, 3).map((a) => (typeof a === 'string' ? a : a?.fullname || a?.name || '')).filter(Boolean), year: (p.published_date || '').slice(0, 4), source: p.source, url: p.url || p.pdf_url || '',
    })),
  };
  console.log(`[demo] papers: ${demo.papers.papers.length} in ${ms}ms`);
} catch (e) { console.warn('[demo] paper-search failed, keeping last capture:', e.message); }

try {
  const s = await mcpSession('https://storyset-mcp.engdawood.com/mcp');
  const query = 'developer';
  const { result, ms } = await s.call('search', { query, limit: 6 });
  demo.storyset = { query, ms, results: result.results.map(({ title, slug, style, preview_url, page_url }) => ({ title, slug, style, preview_url, page_url })) };
  console.log(`[demo] storyset: ${demo.storyset.results.length} in ${ms}ms`);
} catch (e) { console.warn('[demo] storyset failed, keeping last capture:', e.message); }

try {
  const s = await mcpSession('https://jobs.engdawood.com/mcp');
  const query = 'engineer';
  const { result, ms } = await s.call('search_jobs', { query, limit: 6 });
  demo.jobs = {
    query, ms, total: result.meta?.total ?? result.jobs.length,
    jobs: result.jobs.map(({ title, company, location, deadline, source, source_url }) => ({ title, company: company || '', location: location || '', deadline: deadline || '', source: source || '', url: source_url || '' })),
  };
  console.log(`[demo] jobs: ${demo.jobs.jobs.length} in ${ms}ms`);
} catch (e) { console.warn('[demo] jobs failed, keeping last capture:', e.message); }

// The downloader MCP needs a shared secret. It is read from the build environment (a repo secret),
// used only here, and never written to the page: the site only ever sees the captured platform list.
if (process.env.PUBLIC_API_KEY) {
  try {
    const s = await mcpSession('https://dl.engdawood.com/mcp', { 'x-api-key': process.env.PUBLIC_API_KEY });
    const { result, ms } = await s.call('list_supported_platforms', {});
    demo.downloader = { ms, platforms: result.platforms };
    console.log(`[demo] downloader: ${demo.downloader.platforms.length} platforms in ${ms}ms`);
  } catch (e) { console.warn('[demo] downloader failed, keeping last capture:', e.message); }
} else {
  console.warn('[demo] PUBLIC_API_KEY not set, keeping last downloader capture');
}

demo.updatedAt = new Date().toISOString().slice(0, 10);
await writeFile(FILE, JSON.stringify(demo, null, 2) + '\n');
