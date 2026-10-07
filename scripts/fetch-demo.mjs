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

demo.updatedAt = new Date().toISOString().slice(0, 10);
await writeFile(FILE, JSON.stringify(demo, null, 2) + '\n');
