// Tiny JSON syntax highlighter (used at build time and in the browser).
const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function highlightJson(value: unknown): string {
  const json = JSON.stringify(value, null, 2);
  return esc(json).replace(
    /("(?:\\.|[^"\\])*")(\s*:)?|\b(true|false|null)\b|(-?\d+(?:\.\d+)?)/g,
    (m, str, colon, lit, num) => {
      if (str) return colon ? `<span class="j-k">${str}</span>${colon}` : `<span class="j-s">${str}</span>`;
      if (lit) return `<span class="j-l">${lit}</span>`;
      if (num) return `<span class="j-n">${num}</span>`;
      return m;
    },
  );
}

/** Pick up to n papers, alternating sources so one source does not fill the list. */
export function interleave<T extends { source: string }>(items: T[], n: number): T[] {
  const by = new Map<string, T[]>();
  for (const it of items) (by.get(it.source) ?? by.set(it.source, []).get(it.source)!).push(it);
  const out: T[] = [];
  const queues = [...by.values()];
  while (out.length < n && queues.some((q) => q.length)) for (const q of queues) if (q.length && out.length < n) out.push(q.shift()!);
  return out;
}
