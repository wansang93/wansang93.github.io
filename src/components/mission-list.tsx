'use client';

import { useEffect } from 'react';
import { MISSIONS, completeMission, useMissions } from '@/lib/missions';
import type { Lang } from '@/lib/i18n';

const dict = {
  ko: {
    progressLabel: '완료',
    completedTag: '완료',
    pendingTag: '미완료',
    hiddenTag: '히든',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '아직 발견되지 않은 미션입니다.',
    reset: '진행상황 초기화',
    empty: '아직 미션이 없습니다.',
  },
  en: {
    progressLabel: 'completed',
    completedTag: 'Done',
    pendingTag: 'Pending',
    hiddenTag: 'Hidden',
    hiddenLockedTitle: '???',
    hiddenLockedHint: 'A mission yet to be discovered.',
    reset: 'Reset progress',
    empty: 'No missions yet.',
  },
} as const;

export function MissionList({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { state, reset } = useMissions();

  useEffect(() => {
    completeMission('find-mission-page');
  }, []);

  const done = MISSIONS.filter((m) => state[m.id]).length;
  const total = MISSIONS.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">
          {done} / {total} {t.progressLabel}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={reset}
            className="text-xs text-muted hover:text-fg transition-colors"
          >
            {t.reset}
          </button>
        )}
      </div>

      {total === 0 ? (
        <p className="text-sm text-muted">{t.empty}</p>
      ) : (
        <ul className="space-y-3">
          {MISSIONS.map((m) => {
            const isDone = !!state[m.id];
            const isHidden = !!m.hidden;
            const masked = isHidden && !isDone;
            const title = masked ? t.hiddenLockedTitle : m.title[lang];
            const hint = masked ? t.hiddenLockedHint : m.hint[lang];
            return (
              <li
                key={m.id}
                className={`rounded-lg border p-5 transition-colors ${
                  isDone
                    ? 'border-accent/60 bg-accent/5'
                    : masked
                      ? 'border-dashed border-border bg-border/10'
                      : 'border-border'
                }`}
              >
                <div className="flex items-start gap-4">
                  <span
                    aria-hidden
                    className={`mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full border shrink-0 ${
                      isDone
                        ? 'border-accent bg-accent text-white'
                        : 'border-border text-muted'
                    }`}
                  >
                    {isDone ? (
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12l5 5L20 7" />
                      </svg>
                    ) : masked ? (
                      <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="4" y="11" width="16" height="9" rx="2" />
                        <path d="M8 11V7a4 4 0 0 1 8 0v4" />
                      </svg>
                    ) : (
                      <span className="text-[10px]">?</span>
                    )}
                  </span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-baseline justify-between gap-3 flex-wrap">
                      <h3
                        className={`font-serif text-lg font-semibold ${
                          masked ? 'text-muted tracking-widest' : ''
                        }`}
                      >
                        {title}
                      </h3>
                      <span
                        className={`text-[10px] uppercase tracking-widest ${
                          isDone
                            ? isHidden
                              ? 'text-accent'
                              : 'text-accent'
                            : 'text-muted'
                        }`}
                      >
                        {isHidden && isDone
                          ? t.hiddenTag
                          : isDone
                            ? t.completedTag
                            : t.pendingTag}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted leading-relaxed">{hint}</p>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}