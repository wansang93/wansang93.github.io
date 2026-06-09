'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { detectLang, toLangPath } from '@/lib/i18n';

export function LanguageToggle() {
  const pathname = usePathname() || '/';
  const current = detectLang(pathname);
  const other = current === 'ko' ? 'en' : 'ko';
  const otherPath = toLangPath(pathname, other);

  return (
    <Link
      href={otherPath}
      aria-label={current === 'ko' ? 'Switch to English' : '한국어로 보기'}
      title={current === 'ko' ? 'English' : '한국어'}
      className="h-9 px-2 grid place-items-center rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors text-xs font-medium tracking-wide"
    >
      {current === 'ko' ? 'EN' : 'KO'}
    </Link>
  );
}
