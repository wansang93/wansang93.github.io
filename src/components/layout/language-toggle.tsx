'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { LANGS, LANG_LABEL, LANG_SHORT, detectLang, toLangPath } from '@/lib/i18n';
import { completeMission } from '@/lib/missions';

export function LanguageToggle() {
  const pathname = usePathname() || '/';
  const current = detectLang(pathname);
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    }
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onClick);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => { setOpen((v) => !v); completeMission('toggle-language'); }}
        aria-expanded={open}
        aria-haspopup="true"
        aria-label={LANG_LABEL[current]}
        className="h-9 px-2 grid place-items-center rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors text-xs font-medium tracking-wide"
      >
        {LANG_SHORT[current]}
      </button>

      {open && (
        <ul className="absolute right-0 mt-2 w-36 rounded-lg border border-border bg-bg shadow-lg overflow-hidden py-1 text-sm">
          {LANGS.map((lang) => {
            const isCurrent = lang === current;
            return (
              <li key={lang}>
                <Link
                  href={toLangPath(pathname, lang)}
                  onClick={() => setOpen(false)}
                  aria-current={isCurrent ? 'true' : undefined}
                  className={`flex items-center justify-between px-3 py-2 transition-colors ${
                    isCurrent ? 'text-fg bg-border/40' : 'text-muted hover:text-fg hover:bg-border/40'
                  }`}
                >
                  <span>{LANG_LABEL[lang]}</span>
                  <span className="text-[10px] tracking-widest">{LANG_SHORT[lang]}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
