export type Lang = 'ko' | 'en' | 'zh' | 'ja';

export const LANGS: Lang[] = ['ko', 'en', 'zh', 'ja'];

const PREFIXED_LANGS: Exclude<Lang, 'ko'>[] = ['en', 'zh', 'ja'];

export const LANG_LABEL: Record<Lang, string> = {
  ko: '한국어',
  en: 'English',
  zh: '中文',
  ja: '日本語',
};

export const LANG_SHORT: Record<Lang, string> = {
  ko: 'KO',
  en: 'EN',
  zh: 'ZH',
  ja: 'JA',
};

export function detectLang(pathname: string): Lang {
  for (const lang of PREFIXED_LANGS) {
    if (pathname === `/${lang}` || pathname.startsWith(`/${lang}/`)) return lang;
  }
  return 'ko';
}

/** Convert a pathname to its equivalent in the target language. */
export function toLangPath(pathname: string, target: Lang): string {
  let stripped = pathname;
  for (const lang of PREFIXED_LANGS) {
    const re = new RegExp(`^/${lang}(?=/|$)`);
    if (re.test(stripped)) {
      stripped = stripped.replace(re, '') || '/';
      break;
    }
  }
  if (!stripped) stripped = '/';
  if (target === 'ko') return stripped;
  return stripped === '/' ? `/${target}/` : `/${target}${stripped}`;
}

/** Prepend the lang segment to an internal href when needed. */
export function prefixed(href: string, lang: Lang): string {
  if (lang === 'ko') return href;
  if (href === '/') return `/${lang}/`;
  return `/${lang}${href}`;
}
