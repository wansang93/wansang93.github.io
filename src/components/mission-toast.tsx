'use client';

import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import { MISSIONS } from '@/lib/missions';
import { detectLang, prefixed } from '@/lib/i18n';

const VISIBLE_MS = 7000;
const INTRO_MS = 10000;
const FADE_MS = 250;

const dict = {
  ko: {
    achieved: '미션 달성',
    close: '닫기',
    introBadge: '🎉 첫 미션 달성!',
    introBody: '사이트 곳곳에 미션이 숨겨져 있어요.',
    goMissions: '미션 보러 가기 →',
  },
  en: {
    achieved: 'Mission complete',
    close: 'Close',
    introBadge: '🎉 First mission!',
    introBody: 'More missions are hidden around the site.',
    goMissions: 'See all missions →',
  },
  zh: {
    achieved: '任务达成',
    close: '关闭',
    introBadge: '🎉 首个任务达成!',
    introBody: '网站各处还藏着更多任务。',
    goMissions: '查看任务页面 →',
  },
  ja: {
    achieved: 'ミッション達成',
    close: '閉じる',
    introBadge: '🎉 はじめてのミッション達成!',
    introBody: 'サイトのあちこちにミッションが隠れています。',
    goMissions: 'ミッションページへ →',
  },
} as const;

type Dict = (typeof dict)[keyof typeof dict];
type Toast = { id: number; title: string; intro: boolean };

export function MissionToast() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: number) => {
    setToasts((ts) => ts.filter((x) => x.id !== id));
  }, []);

  useEffect(() => {
    function onUnlocked(e: Event) {
      const detail = (e as CustomEvent<{ id: string; completedTotal: number }>).detail;
      const mission = MISSIONS.find((m) => m.id === detail?.id);
      if (!mission) return;
      const id = Date.now() + Math.floor(Math.random() * 1000);
      const intro = detail.completedTotal === 1;
      setToasts((ts) => [...ts, { id, title: mission.title[lang], intro }]);
    }
    window.addEventListener('missions:unlocked', onUnlocked);
    return () => window.removeEventListener('missions:unlocked', onUnlocked);
  }, [lang]);

  if (toasts.length === 0) return null;

  return (
    <div
      aria-live="polite"
      className="fixed bottom-4 right-4 z-[75] flex flex-col gap-2 pointer-events-none max-w-[calc(100vw-2rem)]"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemove={() => dismiss(toast.id)}
          t={t}
          missionHref={prefixed('/mission/', lang)}
        />
      ))}
    </div>
  );
}

function ToastItem({
  toast,
  onRemove,
  t,
  missionHref,
}: {
  toast: Toast;
  onRemove: () => void;
  t: Dict;
  missionHref: string;
}) {
  const visibleMs = toast.intro ? INTRO_MS : VISIBLE_MS;
  const [leaving, setLeaving] = useState(false);
  const [paused, setPaused] = useState(false);
  const remainingRef = useRef(visibleMs);
  const startedAtRef = useRef(0);
  const leavingTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const removeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const leavingRef = useRef(false);

  function clearTimers() {
    if (leavingTimerRef.current) clearTimeout(leavingTimerRef.current);
    if (removeTimerRef.current) clearTimeout(removeTimerRef.current);
  }

  function startTimers(ms: number) {
    clearTimers();
    startedAtRef.current = Date.now();
    leavingTimerRef.current = setTimeout(() => { leavingRef.current = true; setLeaving(true); }, ms);
    removeTimerRef.current = setTimeout(() => onRemove(), ms + FADE_MS);
  }

  useEffect(() => {
    startTimers(visibleMs);
    return clearTimers;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function pause() {
    if (leavingRef.current) return;
    const elapsed = Date.now() - startedAtRef.current;
    remainingRef.current = Math.max(0, remainingRef.current - elapsed);
    clearTimers();
    setPaused(true);
  }

  function resume() {
    if (leavingRef.current) return;
    startTimers(remainingRef.current);
    setPaused(false);
  }

  function dismiss() {
    clearTimers();
    leavingRef.current = true;
    setLeaving(true);
    setTimeout(onRemove, FADE_MS);
  }

  return (
    <div
      className={`pointer-events-auto rounded-lg border border-border bg-bg shadow-lg overflow-hidden max-w-full ${toast.intro ? 'w-80' : 'w-72'}`}
      style={{
        animation: leaving
          ? `toast-out ${FADE_MS}ms ease-in forwards`
          : `toast-in ${FADE_MS}ms ease-out`,
      }}
      onMouseEnter={pause}
      onMouseLeave={resume}
      onTouchStart={pause}
      onTouchEnd={resume}
      onTouchCancel={resume}
    >
      <div className="h-0.5 bg-border/40">
        <div
          className="h-full bg-accent origin-left"
          style={{
            animation: leaving ? 'none' : `toast-progress ${visibleMs}ms linear forwards`,
            animationPlayState: paused ? 'paused' : 'running',
          }}
        />
      </div>
      <div className="px-4 py-3">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-widest text-accent">
              {toast.intro ? t.introBadge : t.achieved}
            </p>
            <p className="mt-1 text-sm font-medium leading-snug">{toast.title}</p>
          </div>
          <button
            type="button"
            onClick={dismiss}
            aria-label={t.close}
            className={`shrink-0 -m-1 p-1 rounded-md transition-all flex items-center gap-1 ${
              paused
                ? 'text-fg bg-border/50 ring-1 ring-border px-2'
                : 'text-muted hover:text-fg hover:bg-border/40'
            }`}
          >
            {paused && <span className="text-xs font-medium">{t.close}</span>}
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
              <path d="M6 6l12 12M6 18L18 6" />
            </svg>
          </button>
        </div>
        {toast.intro && (
          <div className="mt-3 flex items-center justify-between gap-2">
            <p className="text-xs text-muted">{t.introBody}</p>
            <Link
              href={missionHref}
              onClick={dismiss}
              className="shrink-0 text-xs font-medium text-accent hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              {t.goMissions}
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
