export type Lang = 'ko' | 'en';

export const LANGS: Lang[] = ['ko', 'en'];

export function detectLang(pathname: string): Lang {
  return pathname === '/en' || pathname.startsWith('/en/') ? 'en' : 'ko';
}

/** Convert a pathname to its equivalent in the target language. */
export function toLangPath(pathname: string, target: Lang): string {
  const stripped = pathname.replace(/^\/en(?=\/|$)/, '') || '/';
  if (target === 'ko') return stripped;
  return stripped === '/' ? '/en/' : `/en${stripped}`;
}

/** Prepend `/en` to an internal href when the current lang is en. */
export function prefixed(href: string, lang: Lang): string {
  if (lang === 'ko') return href;
  if (href === '/') return '/en/';
  return `/en${href}`;
}
