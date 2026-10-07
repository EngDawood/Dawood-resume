// A small MCP client for the browser (Streamable HTTP transport, JSON-RPC 2.0).
// Works with stateless servers (plain JSON replies) and session servers (SSE replies + mcp-session-id).

type Json = Record<string, unknown>;
export type CallResult<R> = { result: R; ms: number; request: Json };

const HEADERS = { 'content-type': 'application/json', accept: 'application/json, text/event-stream' };
const TIMEOUT = 20000;

async function readBody(res: Response) {
  const text = await res.text();
  if (!text) return null;
  const line = text.trimStart().startsWith('{') ? text : (text.match(/^data: (.*)$/m) || [])[1];
  return line ? JSON.parse(line) : null;
}

export class McpClient {
  private sid: string | null = null;
  private ready: Promise<void> | null = null;
  private id = 1;
  constructor(readonly url: string, private readonly needsSession = true) {}

  private post(body: Json, signal?: AbortSignal) {
    const headers: Record<string, string> = { ...HEADERS };
    if (this.sid) headers['mcp-session-id'] = this.sid;
    return fetch(this.url, { method: 'POST', headers, body: JSON.stringify(body), signal: signal ?? AbortSignal.timeout(TIMEOUT) });
  }

  private connect() {
    if (!this.needsSession) return Promise.resolve();
    this.ready ??= (async () => {
      const res = await this.post({ jsonrpc: '2.0', id: this.id++, method: 'initialize', params: { protocolVersion: '2025-03-26', capabilities: {}, clientInfo: { name: 'resume.engdawood.com', version: '1' } } });
      if (!res.ok) throw new Error(`initialize: HTTP ${res.status}`);
      this.sid = res.headers.get('mcp-session-id');
      await readBody(res);
      await (await this.post({ jsonrpc: '2.0', method: 'notifications/initialized' })).text();
    })().catch((e) => { this.ready = null; throw e; });
    return this.ready;
  }

  /** The JSON-RPC body that will be sent, for showing on the page. */
  describe(name: string, args: Json): Json {
    return { jsonrpc: '2.0', method: 'tools/call', params: { name, arguments: args } };
  }

  async call<R = Json>(name: string, args: Json, retry = true): Promise<CallResult<R>> {
    await this.connect();
    const request = this.describe(name, args);
    const t0 = performance.now();
    const res = await this.post({ ...request, id: this.id++ });
    if ((res.status === 404 || res.status === 400) && this.sid && retry) {
      // session expired on the server: reconnect once
      this.sid = null; this.ready = null;
      return this.call<R>(name, args, false);
    }
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const data = await readBody(res);
    if (!data || data.error) throw new Error(data?.error?.message || 'empty response');
    const text = data.result?.content?.find((c: { type: string }) => c.type === 'text')?.text ?? '{}';
    if (data.result?.isError) throw new Error(text);
    return { result: JSON.parse(text) as R, ms: Math.round(performance.now() - t0), request };
  }
}
