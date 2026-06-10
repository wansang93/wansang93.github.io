'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { completeMission } from '@/lib/missions';
import { detectLang, prefixed } from '@/lib/i18n';

const dict = {
  ko: {
    badge: '히든 미션 발견',
    headline: '히든 미션을 달성했습니다!',
    body: '이 사이트에 숨겨진 미션을 찾아냈어요. 미션 페이지에서 다른 미션도 확인해 보세요.',
    go: '미션 페이지로 →',
    close: '닫기',
  },
  en: {
    badge: 'Hidden mission found',
    headline: 'You unlocked a hidden mission!',
    body: 'You discovered something secret. See your progress and other missions on the mission page.',
    go: 'Go to missions →',
    close: 'Close',
  },
} as const;

export function MissionTracker() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const [open, setOpen] = useState(false);

  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'F12') {
        completeMission('discover-f12');
      } else if (e.key === 'Escape') {
        setOpen(false);
      }
    }
    function onUnlocked(e: Event) {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      if (detail?.id === 'discover-f12') setOpen(true);
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('missions:unlocked', onUnlocked);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('missions:unlocked', onUnlocked);
    };
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-modal-title"
      className="fixed inset-0 z-[60] grid place-items-center bg-black/50 backdrop-blur-sm px-6"
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-bg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-widest text-accent">{t.badge}</p>
        <h2 id="mission-modal-title" className="mt-2 font-serif text-2xl font-semibold leading-snug">
          {t.headline}
        </h2>
        <p className="mt-3 text-sm text-muted leading-relaxed">{t.body}</p>
        <div className="mt-6 flex items-center justify-end gap-2">
          <button
            type="button"
            onClick={close}
            className="px-4 py-2 rounded-md text-sm text-muted hover:text-fg hover:bg-border/40 transition-colors"
          >
            {t.close}
          </button>
          <Link
            href={prefixed('/mission/', lang)}
            onClick={close}
            className="px-4 py-2 rounded-md text-sm font-medium bg-accent text-white hover:opacity-90 transition-opacity"
          >
            {t.go}
          </Link>
        </div>
      </div>
    </div>
  );
}