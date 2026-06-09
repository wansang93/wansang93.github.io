'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { detectLang, prefixed, type Lang } from '@/lib/i18n';
import { ThemeToggle } from './theme-toggle';
import { LanguageToggle } from './language-toggle';

type NavLabels = {
  home: string;
  blog: string;
  project: string;
  about: string;
  webpage: string;
  all: (label: string) => string;
};

const dict: Record<Lang, NavLabels> = {
  ko: {
    home: 'Home',
    blog: 'Blog',
    project: 'Project',
    about: 'About',
    webpage: 'Webpage',
    all: (label) => `${label} 전체`,
  },
  en: {
    home: 'Home',
    blog: 'Blog',
    project: 'Project',
    about: 'About',
    webpage: 'Webpage',
    all: (label) => `All ${label}`,
  },
};

export function Nav() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

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
        <Link href={prefixed('/', lang)} className="font-serif text-lg font-semibold tracking-tight">
          wansang
          <span className="text-accent">.</span>
        </Link>
        <ul className="flex items-center gap-1 text-sm">
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
      </nav>
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
