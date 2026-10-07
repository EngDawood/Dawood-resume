import type { Lang } from './data/resume';

const BASE = import.meta.env.BASE_URL.replace(/\/$/, '');
/** Prefix an absolute site path with the deploy base ("/ar/" -> "/Dawood-resume/ar/"). */
export const url = (path: string) => `${BASE}${path}`;
export const dirOf = (lang: Lang) => (lang === 'ar' ? 'rtl' : 'ltr');
export const other = (lang: Lang): Lang => (lang === 'ar' ? 'en' : 'ar');
