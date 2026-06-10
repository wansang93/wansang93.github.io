'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { detectLang, prefixed, type Lang } from '@/lib/i18n';
import { completeMission } from '@/lib/missions';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';

type NavLabels = {
  home: string;
  blog: string;
  project: string;
  about: string;
  webpage: string;
  all: (label: string) => string;
  menu: string;
  close: string;
};

const dict: Record<Lang, NavLabels> = {
  ko: {
    home: '홈',
    blog: '블로그',
    project: '프로젝트',
    about: '소개',
    webpage: '웹페이지',
    all: (label) => `${label} 전체`,
    menu: '메뉴 열기',
    close: '메뉴 닫기',
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    project: 'Project',
    about: 'About',
    webpage: 'Webpage',
    all: (label) => `All ${label}`,
    menu: 'Open menu',
    close: 'Close menu',
  },
};

export function Nav() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const [mobileOpen, setMobileOpen] = useState(false);
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const longPressFired = useRef(false);

  function startLogoPress() {
    longPressFired.current = false;
    longPressTimer.current = setTimeout(() => {
      longPressFired.current = true;
      completeMission('discover-f12');
    }, 1000);
  }

  function cancelLogoPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
  }

  function onLogoClick(e: React.MouseEvent) {
    if (longPressFired.current) {
      e.preventDefault();
      longPressFired.current = false;
    }
  }

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setMobileOpen(false);
    }
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
    };
  }, [mobileOpen]);

  const links = [
    { key: 'home', href: prefixed('/', lang), label: t.home },
    { key: 'blog', href: prefixed('/blog/', lang), label: t.blog },
    { key: 'about', href: prefixed('/about/', lang), label: t.about },
  ];

  const projectMenu = {
    label: t.project,
    href: prefixed('/project/', lang),
    groups: [
      {
        title: t.webpage,
        href: prefixed('/project/webpage/', lang),
        items: [{ label: '2021', href: prefixed('/project/webpage/2021/', lang) }],
      },
    ],
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 backdrop-blur bg-bg/80 border-b border-border">
      <nav className="mx-auto max-w-3xl px-6 h-16 flex items-center justify-between">
        <Link
          href={prefixed('/', lang)}
          onPointerDown={startLogoPress}
          onPointerUp={cancelLogoPress}
          onPointerLeave={cancelLogoPress}
          onPointerCancel={cancelLogoPress}
          onClick={onLogoClick}
          onContextMenu={(e) => e.preventDefault()}
          className="font-serif text-lg font-semibold tracking-tight select-none touch-manipulation"
        >
          wansang
          <span className="text-accent">.</span>
        </Link>

        <ul className="hidden sm:flex items-center gap-1 text-sm">
          <li>
            <Link
              href={links[0].href}
              className="px-3 py-2 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
            >
              {links[0].label}
            </Link>
          </li>
          <li>
            <Link
              href={links[1].href}
              className="px-3 py-2 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
            >
              {links[1].label}
            </Link>
          </li>
          <DropdownMenu menu={projectMenu} allLabel={t.all(t.project)} />
          <li>
            <Link
              href={links[2].href}
              className="px-3 py-2 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
            >
              {links[2].label}
            </Link>
          </li>
          <li className="ml-1 flex items-center gap-1">
            <ThemeToggle />
            <LanguageToggle />
          </li>
        </ul>

        <div className="sm:hidden flex items-center gap-1">
          <ThemeToggle />
          <LanguageToggle />
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? t.close : t.menu}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-panel"
            className="w-9 h-9 grid place-items-center rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
          >
            {mobileOpen ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div
          id="mobile-nav-panel"
          className="sm:hidden border-t border-border bg-bg max-h-[calc(100vh-4rem)] overflow-y-auto"
        >
          <ul className="mx-auto max-w-3xl px-6 py-3 space-y-1 text-sm">
            <li>
              <Link href={links[0].href} className="block px-3 py-3 rounded-md hover:bg-border/40 transition-colors">
                {links[0].label}
              </Link>
            </li>
            <li>
              <Link href={links[1].href} className="block px-3 py-3 rounded-md hover:bg-border/40 transition-colors">
                {links[1].label}
              </Link>
            </li>
            <li>
              <Link
                href={projectMenu.href}
                onClick={() => completeMission('open-project-menu')}
                className="block px-3 py-3 rounded-md hover:bg-border/40 transition-colors"
              >
                {projectMenu.label}
              </Link>
              <ul className="ml-3 pl-3 border-l border-border">
                {projectMenu.groups.map((group) => (
                  <li key={group.title} className="space-y-1">
                    <Link
                      href={group.href}
                      className="block px-3 py-2 rounded-md text-xs uppercase tracking-wider text-muted hover:text-fg hover:bg-border/40 transition-colors"
                    >
                      {group.title}
                    </Link>
                    <ul>
                      {group.items.map((sub) => (
                        <li key={sub.href}>
                          <Link
                            href={sub.href}
                            className="block px-3 py-2 rounded-md hover:bg-border/40 transition-colors"
                          >
                            {sub.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </li>
            <li>
              <Link href={links[2].href} className="block px-3 py-3 rounded-md hover:bg-border/40 transition-colors">
                {links[2].label}
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}

type Menu = {
  label: string;
  href: string;
  groups: { title: string; href: string; items: { label: string; href: string }[] }[];
};

function DropdownMenu({ menu, allLabel }: { menu: Menu; allLabel: string }) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (open) completeMission('open-project-menu');
  }, [open]);

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

  function handleEnter() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setOpen(true);
  }
  function handleLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 150);
  }

  return (
    <li ref={ref} className="relative" onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-haspopup="true"
        className="px-3 py-2 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors flex items-center gap-1"
      >
        {menu.label}
        <svg
          width="10"
          height="10"
          viewBox="0 0 12 12"
          className={`transition-transform ${open ? 'rotate-180' : ''}`}
          aria-hidden
        >
          <path d="M2 4l4 4 4-4" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-64 rounded-lg border border-border bg-bg shadow-lg overflow-hidden">
          <Link
            href={menu.href}
            onClick={() => setOpen(false)}
            className="block px-4 py-3 text-sm font-medium border-b border-border hover:bg-border/40"
          >
            {allLabel}
          </Link>
          {menu.groups.map((group) => (
            <div key={group.title} className="py-2">
              <Link
                href={group.href}
                onClick={() => setOpen(false)}
                className="block px-4 py-1 text-xs uppercase tracking-wider text-muted hover:text-fg"
              >
                {group.title}
              </Link>
              <ul>
                {group.items.map((sub) => (
                  <li key={sub.href}>
                    <Link
                      href={sub.href}
                      onClick={() => setOpen(false)}
                      className="block px-4 py-2 text-sm hover:bg-border/40"
                    >
                      {sub.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </li>
  );
}