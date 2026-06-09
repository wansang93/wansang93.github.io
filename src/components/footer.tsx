'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { detectLang, prefixed } from '@/lib/i18n';

const dict = {
  ko: { archive: '2021 아카이브' },
  en: { archive: '2021 archive' },
} as const;

export function Footer() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];

  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-3xl px-6 py-10 flex flex-col sm:flex-row justify-between gap-4 text-sm text-muted">
        <div>© 2026 Wansang Kim</div>
        <div className="flex gap-4">
          <a href="https://github.com/wansang93" target="_blank" rel="noreferrer" className="hover:text-fg">
            GitHub
          </a>
          <a href="mailto:wansangk93@gmail.com" className="hover:text-fg">
            Email
          </a>
          <Link href={prefixed('/project/webpage/2021/', lang)} className="hover:text-fg">
            {t.archive}
          </Link>
        </div>
      </div>
    </footer>
  );
}
