'use client';

import { useCallback, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MISSIONS } from '@/lib/missions';
import { detectLang } from '@/lib/i18n';

const VISIBLE_MS = 4500;
const FADE_MS = 250;

const dict = {
  ko: { achieved: '미션 달성', close: '닫기' },
  en: { achieved: 'Mission complete', close: 'Close' },
  zh: { achieved: '任务达成', close: '关闭' },
  ja: { achieved: 'ミッション達成', close: '閉じる' },
} as const;

type Toast = {
  id: number;
  title: string;
  leaving: boolean;
};

export function MissionToast() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((ts) => ts.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    window.setTimeout(() => {
      setToasts((ts) => ts.filter((x) => x.id !== id));
    }, FADE_MS);
  }, []);

  useEffect(() => {
    const timers: number[] = [];
    function onUnlocked(e: Event) {
      const detail = (e as CustomEvent<{ id: string }>).detail;
      const mission = MISSIONS.find((m) => m.id === detail?.id);
      if (!mission) return;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const title = mission.title[lang];
      setToasts((ts) => [...ts, { id, title, leaving: false }]);

      const startLeaving = window.setTimeout(() => {
        setToasts((ts) => ts.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
      }, VISIBLE_MS);
      const remove = window.setTimeout(() => {
        setToasts((ts) => ts.filter((x) => x.id !== id));
      }, VISIBLE_MS + FADE_MS);
      timers.push(startLeaving, remove);
    }

    window.addEventListener('missions:unlocked', onUnlocked);
    return () => {
      window.removeEventListener('missions:unlocked', onUnlocked);
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [lang]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[75] flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)]"
    >
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className="pointer-events-auto rounded-lg border border-border bg-bg shadow-lg overflow-hidden w-72 max-w-full"
          style={{
            animation: toast.leaving
              ? `toast-out ${FADE_MS}ms ease-in forwards`
              : `toast-in ${FADE_MS}ms ease-out`,
          }}
        >
          <div className="h-0.5 bg-border/40">
            <div
              className="h-full bg-accent origin-left"
              style={{
                animation: toast.leaving
                  ? 'none'
                  : `toast-progress ${VISIBLE_MS}ms linear forwards`,
              }}
            />
          </div>
          <div className="px-4 py-3 flex items-start justify-between gap-3">
            <div className="min-w-0">
              <p className="text-[10px] uppercase tracking-widest text-accent">{t.achieved}</p>
              <p className="mt-1 text-sm font-medium leading-snug">{toast.title}</p>
            </div>
            <button
              type="button"
              onClick={() => dismiss(toast.id)}
              aria-label={t.close}
              title={t.close}
              className="shrink-0 -m-1 p-1 rounded-md text-muted hover:text-fg hover:bg-border/40 transition-colors"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M6 6l12 12M6 18L18 6" />
              </svg>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
