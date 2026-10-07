// Geometry for the qamariya (Sana'a stained-glass window) artwork.
// Angles are in degrees; 180..360 sweeps the upper half (SVG y grows downward).
const rad = (d: number) => (d * Math.PI) / 180;
const f = (n: number) => +n.toFixed(2);
const pt = (cx: number, cy: number, r: number, a: number) => [f(cx + r * Math.cos(rad(a))), f(cy + r * Math.sin(rad(a)))];

/** Annular sector between radii r1..r2 and angles a1..a2, shrunk by `gap` on every side. */
export function sector(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number, gap = 0) {
  const R1 = Math.max(0, r1 + gap / 2);
  const R2 = r2 - gap / 2;
  const d2 = (gap / 2 / R2) * (180 / Math.PI);
  const d1 = R1 > 0 ? (gap / 2 / R1) * (180 / Math.PI) : 0;
  const large = a2 - a1 > 180 ? 1 : 0;
  const [ox1, oy1] = pt(cx, cy, R2, a1 + d2);
  const [ox2, oy2] = pt(cx, cy, R2, a2 - d2);
  if (R1 <= 0.01) return `M${f(cx)} ${f(cy)}L${ox1} ${oy1}A${f(R2)} ${f(R2)} 0 ${large} 1 ${ox2} ${oy2}Z`;
  const [ix2, iy2] = pt(cx, cy, R1, a2 - d1);
  const [ix1, iy1] = pt(cx, cy, R1, a1 + d1);
  return `M${ox1} ${oy1}A${f(R2)} ${f(R2)} 0 ${large} 1 ${ox2} ${oy2}L${ix2} ${iy2}A${f(R1)} ${f(R1)} 0 ${large} 0 ${ix1} ${iy1}Z`;
}

/** Arch outline: half-circle of radius r centred at (cx, cy) on top of a rectangle down to `bottom`. */
export function arch(cx: number, cy: number, r: number, bottom: number) {
  return `M${f(cx - r)} ${f(bottom)}V${f(cy)}A${f(r)} ${f(r)} 0 0 1 ${f(cx + r)} ${f(cy)}V${f(bottom)}Z`;
}

/** Centre of a sector, normalised to the viewBox (used to place tooltips). */
export function sectorCentre(cx: number, cy: number, r1: number, r2: number, a1: number, a2: number) {
  return pt(cx, cy, (r1 + r2) / 2, (a1 + a2) / 2);
}

/** Small deterministic PRNG so the artwork is identical on every build. */
export function rng(seed: number) {
  let s = seed >>> 0;
  return () => ((s = (s * 1664525 + 1013904223) >>> 0) / 2 ** 32);
}

export const GLASS = {
  ruby: '#c9382e',
  cobalt: '#2f5bd6',
  emerald: '#1f9c6b',
  amber: '#f0a12e',
  clear: '#eadfc6',
  teal: '#178a8a',
  smoke: '#8c7a5e',
} as const;
export type Glass = keyof typeof GLASS;
