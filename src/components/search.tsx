'use client';

import { usePathname, useRouter } from 'next/navigation';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { detectLang, prefixed } from '@/lib/i18n';
import { searchItems } from '@/lib/search';

const dict = {
  ko: {
    open: '검색 열기 (Ctrl+K)',
    placeholder: '페이지 검색...',
    empty: '검색 결과가 없습니다.',
    hintNav: '↑↓ 이동',
    hintEnter: 'Enter 이동',
    hintEsc: 'Esc 닫기',
  },
  en: {
    open: 'Open search (Ctrl+K)',
    placeholder: 'Search pages...',
    empty: 'No results.',
    hintNav: '↑↓ to move',
    hintEnter: 'Enter to go',
    hintEsc: 'Esc to close',
  },
} as const;

export function Search() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  const results = useMemo(() => searchItems(query, lang), [query, lang]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        setOpen((v) => !v);
      }
    }
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, []);

  useEffect(() => {
    if (open) {
      setQuery('');
      setActive(0);
      // focus input after render
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  // Keep active item in view
  useEffect(() => {
    const el = listRef.current?.children[active] as HTMLElement | undefined;
    el?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  const close = useCallback(() => setOpen(false), []);

  const go = useCallback(
    (href: string) => {
      router.push(prefixed(href, lang));
      setOpen(false);
    },
    [lang, router]
  );

  function onKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => Math.min(i + 1, Math.max(results.length - 1, 0)));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const item = results[active];
      if (item) go(item.href);
    } else if (e.key === 'Escape') {
      e.preventDefault();
      close();
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label={t.open}
        title={t.open}
        className="w-9 h-9 grid place-items-center rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
          <circle cx="11" cy="11" r="7" />
          <path d="M21 21l-4.3-4.3" />
        </svg>
      </button>

      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={t.open}
          className="fixed inset-0 z-[70] flex items-start justify-center bg-black/50 backdrop-blur-sm px-4 pt-20 sm:pt-28"
          onClick={close}
        >
          <div
            className="w-full max-w-lg rounded-2xl border border-border bg-bg shadow-xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative border-b border-border">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" aria-hidden>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="7" />
                  <path d="M21 21l-4.3-4.3" />
                </svg>
              </span>
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onKeyDown}
                placeholder={t.placeholder}
                className="w-full bg-transparent pl-11 pr-4 py-4 text-base outline-none placeholder:text-muted"
              />
            </div>

            <ul
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto py-2"
              role="listbox"
              aria-label={t.open}
            >
              {results.length === 0 ? (
                <li className="px-4 py-6 text-center text-sm text-muted">{t.empty}</li>
              ) : (
                results.map((item, i) => {
                  const isActive = i === active;
                  return (
                    <li key={item.href} role="option" aria-selected={isActive}>
                      <button
                        type="button"
                        onMouseEnter={() => setActive(i)}
                        onClick={() => go(item.href)}
                        className={`w-full flex items-baseline justify-between gap-4 text-left px-4 py-3 transition-colors ${
                          isActive ? 'bg-border/60 text-fg' : 'text-muted hover:bg-border/40'
                        }`}
                      >
                        <span className="flex flex-col min-w-0">
                          <span className={`text-sm font-medium ${isActive ? 'text-fg' : 'text-fg/90'}`}>
                            {item.title[lang]}
                          </span>
                          {item.description && (
                            <span className="text-xs text-muted truncate">{item.description[lang]}</span>
                          )}
                        </span>
                        <span className="font-mono text-[11px] text-muted shrink-0">
                          {prefixed(item.href, lang)}
                        </span>
                      </button>
                    </li>
                  );
                })
              )}
            </ul>

            <div className="hidden sm:flex items-center justify-end gap-4 px-4 py-2 border-t border-border text-[11px] text-muted">
              <span>{t.hintNav}</span>
              <span>{t.hintEnter}</span>
              <span>{t.hintEsc}</span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
