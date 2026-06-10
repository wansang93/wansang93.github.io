'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { detectLang, prefixed } from '@/lib/i18n';

const dict = {
  ko: { github: '깃허브', email: '이메일', mission: '미션', patchNotes: '패치노트' },
  en: { github: 'GitHub', email: 'Email', mission: 'Mission', patchNotes: 'Patch notes' },
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
            {t.github}
          </a>
          <a href="mailto:wansangk93@gmail.com" className="hover:text-fg">
            {t.email}
          </a>
          <Link href={prefixed('/mission/', lang)} className="hover:text-fg">
            {t.mission}
          </Link>
          <Link href={prefixed('/patch-notes/', lang)} className="hover:text-fg">
            {t.patchNotes}
          </Link>
        </div>
      </div>
    </footer>
  );
}
