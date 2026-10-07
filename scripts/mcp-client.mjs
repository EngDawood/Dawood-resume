// Minimal MCP client over Streamable HTTP (JSON-RPC). Shared by the build scripts.
// Handles both plain JSON responses and SSE ("data: ...") responses, with or without sessions.
export async function mcpSession(url) {
  const headers = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' };
  const post = async (body, extra = {}) => {
    const res = await fetch(url, { method: 'POST', headers: { ...headers, ...extra }, body: JSON.stringify(body), signal: AbortSignal.timeout(30000) });
    if (!res.ok && res.status !== 202) throw new Error(`${url} -> HTTP ${res.status}`);
    return res;
  };
  const read = async (res) => {
    const text = await res.text();
    if (!text) return null;
    const line = text.trimStart().startsWith('{') ? text : (text.match(/^data: (.*)$/m) || [])[1];
    return line ? JSON.parse(line) : null;
  };
  const init = await post({ jsonrpc: '2.0', id: 1, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'dawood-resume', version: '1' } } });
  const sid = init.headers.get('mcp-session-id');
  await read(init);
  const extra = sid ? { 'mcp-session-id': sid } : {};
  await post({ jsonrpc: '2.0', method: 'notifications/initialized' }, extra).then((r) => r.text());
  let id = 2;
  return {
    async call(name, args) {
      const t0 = performance.now();
      const data = await read(await post({ jsonrpc: '2.0', id: id++, method: 'tools/call', params: { name, arguments: args } }, extra));
      if (!data || data.error) throw new Error(data?.error?.message || 'empty response');
      const text = data.result?.content?.find((c) => c.type === 'text')?.text ?? '{}';
      return { result: JSON.parse(text), ms: Math.round(performance.now() - t0) };
    },
  };
}
