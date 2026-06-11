'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { MISSIONS, completeMission, getMissionState } from '@/lib/missions';
import { detectLang, prefixed, type Lang } from '@/lib/i18n';

type Mode = 'intro' | 'hidden';

const dict = {
  ko: {
    introBadge: '🎉 첫 미션 달성!',
    introHeadline: '미션을 발견했어요!',
    introBody: '사이트 곳곳에 숨겨진 미션이 있어요. 히든 미션도 함께 찾아보세요.',
    hiddenBadge: '히든 미션 발견',
    hiddenHeadline: (ord: string) => `${ord} 히든 미션을 달성했습니다.`,
    hiddenProgress: (c: number, t: number) => `완료 현황 (${c}/${t})`,
    hiddenBody: '미션 페이지에서 다른 미션도 확인해 보세요.',
    go: '미션 페이지로 →',
    close: '닫기',
  },
  en: {
    introBadge: '🎉 First mission!',
    introHeadline: 'You found a mission!',
    introBody: 'Missions are hidden around the site. Find the secret ones too.',
    hiddenBadge: 'Hidden mission found',
    hiddenHeadline: (ord: string) => `You unlocked your ${ord} hidden mission!`,
    hiddenProgress: (c: number, t: number) => `Progress (${c}/${t})`,
    hiddenBody: 'See your progress and other missions on the mission page.',
    go: 'Go to missions →',
    close: 'Close',
  },
  zh: {
    introBadge: '🎉 首个任务达成!',
    introHeadline: '你发现了任务!',
    introBody: '网站各处藏着小任务,也别忘了找出隐藏任务。',
    hiddenBadge: '发现隐藏任务',
    hiddenHeadline: (ord: string) => `已解锁第${ord}个隐藏任务。`,
    hiddenProgress: (c: number, t: number) => `进度 (${c}/${t})`,
    hiddenBody: '在任务页面查看其他任务吧。',
    go: '前往任务页面 →',
    close: '关闭',
  },
  ja: {
    introBadge: '🎉 はじめてのミッション達成!',
    introHeadline: 'ミッションを見つけました!',
    introBody: 'サイトのあちこちに小さなミッションが隠れています。隠しミッションも探してみてください。',
    hiddenBadge: '隠しミッション発見',
    hiddenHeadline: (ord: string) => `${ord}の隠しミッションを達成しました。`,
    hiddenProgress: (c: number, t: number) => `達成状況 (${c}/${t})`,
    hiddenBody: 'ミッションページで他のミッションも確認してください。',
    go: 'ミッションページへ →',
    close: '閉じる',
  },
} as const;

const KOREAN_ORDINALS = ['첫', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열'];

function ordinal(n: number, lang: Lang): string {
  if (n < 1) {
    if (lang === 'ko') return '히든';
    if (lang === 'zh') return '隐藏';
    if (lang === 'ja') return '隠し';
    return 'first';
  }
  if (lang === 'ko') {
    return n <= KOREAN_ORDINALS.length ? `${KOREAN_ORDINALS[n - 1]}번째` : `${n}번째`;
  }
  if (lang === 'zh' || lang === 'ja') {
    return `${n}`;
  }
  const v = n % 100;
  const s = ['th', 'st', 'nd', 'rd'];
  return `${n}${s[(v - 20) % 10] || s[v] || s[0]}`;
}

export function MissionTracker() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);
  const t = dict[lang];
  const [mode, setMode] = useState<Mode | null>(null);
  const [progress, setProgress] = useState({ completed: 0, total: 0 });

  const close = useCallback(() => setMode(null), []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'F12') {
        completeMission('discover-f12');
      } else if (e.key === 'Escape') {
        setMode(null);
      }
    }
    function onUnlocked(e: Event) {
      const detail = (e as CustomEvent<{ id: string; completedHidden: number; totalHidden: number }>).detail;
      const state = getMissionState();
      const done = MISSIONS.filter((m) => state[m.id]).length;
      if (done === 1) {
        setMode('intro');
        return;
      }
      const completed = MISSIONS.find((m) => m.id === detail?.id);
      if (completed?.hidden) {
        setProgress({ completed: detail.completedHidden, total: detail.totalHidden });
        setMode('hidden');
      }
    }
    window.addEventListener('keydown', onKey);
    window.addEventListener('missions:unlocked', onUnlocked);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('missions:unlocked', onUnlocked);
    };
  }, []);

  useEffect(() => {
    if (/^\/(en\/|zh\/|ja\/)?patch-notes\/?$/.test(pathname)) {
      completeMission('visit-patch-notes');
    }
  }, [pathname]);

  if (!mode) return null;

  const isIntro = mode === 'intro';

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="mission-modal-title"
      className="fixed inset-0 z-[70] grid place-items-center bg-black/50 backdrop-blur-sm px-6"
      onClick={close}
    >
      <div
        className="w-full max-w-md rounded-2xl border border-border bg-bg p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <p className="text-xs uppercase tracking-widest text-accent">
          {isIntro ? t.introBadge : t.hiddenBadge}
        </p>
        <h2 id="mission-modal-title" className="mt-2 font-serif text-2xl font-semibold leading-snug">
          {isIntro ? t.introHeadline : t.hiddenHeadline(ordinal(progress.completed, lang))}
        </h2>
        {!isIntro && (
          <p className="mt-2 font-mono text-xs text-muted">
            {t.hiddenProgress(progress.completed, progress.total)}
          </p>
        )}
        <p className="mt-3 text-sm text-muted leading-relaxed">
          {isIntro ? t.introBody : t.hiddenBody}
        </p>
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
