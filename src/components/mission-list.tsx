'use client';

import { useEffect, useState } from 'react';
import {
  MISSIONS,
  completeMission,
  resetMission,
  useMissions,
  type Mission,
} from '@/lib/missions';
import type { Lang } from '@/lib/i18n';

const dict = {
  ko: {
    progressLabel: '완료',
    completedTag: '완료',
    pendingTag: '미완료',
    hiddenTag: '히든',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '웹 개발자라면 누르는 버튼이에요. 모바일에서는 로고에 비밀이 있어요.',
    showExtraHint: '힌트 보기',
    hideExtraHint: '힌트 접기',
    extraHint: '패치노트에 히든 미션 달성법이 적혀있어요.',
    reset: '미션 초기화',
    cardReset: '클릭해서 초기화',
    empty: '아직 미션이 없습니다.',
    sectionMain: '페이지 100% 즐기기',
    sectionHidden: '히든 미션',
    launchFireworks: '🎆 미션 달성 폭죽 터트리기',
  },
  en: {
    progressLabel: 'completed',
    completedTag: 'Done',
    pendingTag: 'Pending',
    hiddenTag: 'Hidden',
    hiddenLockedTitle: '???',
    hiddenLockedHint: "It's a button web developers press. On mobile, the logo holds a secret.",
    showExtraHint: 'Show hint',
    hideExtraHint: 'Hide hint',
    extraHint: 'The patch notes describe how to unlock hidden missions.',
    reset: 'Reset missions',
    cardReset: 'Click to reset',
    empty: 'No missions yet.',
    sectionMain: 'Make the most of the site',
    sectionHidden: 'Hidden missions',
    launchFireworks: '🎆 Launch celebration fireworks',
  },
} as const;

type Dict = (typeof dict)[Lang];

type SectionHint = { show: string; hide: string; body: string };

const FIND_PAGE_DURATION = 7;

export function MissionList({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { state, reset } = useMissions();
  const [findCountdown, setFindCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (state['find-mission-page']) {
      setFindCountdown(null);
      return;
    }
    setFindCountdown(FIND_PAGE_DURATION);
    let remaining = FIND_PAGE_DURATION;
    const interval = window.setInterval(() => {
      remaining -= 1;
      if (remaining > 0) {
        setFindCountdown(remaining);
      } else {
        window.clearInterval(interval);
        setFindCountdown(null);
      }
    }, 1000);
    const timer = window.setTimeout(() => {
      completeMission('find-mission-page');
    }, FIND_PAGE_DURATION * 1000);
    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
    };
  }, [state]);

  const done = MISSIONS.filter((m) => state[m.id]).length;
  const total = MISSIONS.length;
  const allDone = total > 0 && done === total;
  const mainMissions = MISSIONS.filter((m) => !m.hidden);
  const hiddenMissions = MISSIONS.filter((m) => m.hidden);

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between text-sm">
        <p className="text-muted">
          {done} / {total} {t.progressLabel}
        </p>
        {done > 0 && (
          <button
            type="button"
            onClick={() => {
              reset();
              completeMission('find-mission-page');
            }}
            className="text-xs text-muted hover:text-fg transition-colors"
          >
            {t.reset}
          </button>
        )}
      </div>

      {total === 0 ? (
        <p className="text-sm text-muted">{t.empty}</p>
      ) : (
        <>
          {mainMissions.length > 0 && (
            <MissionSection
              title={t.sectionMain}
              missions={mainMissions}
              state={state}
              lang={lang}
              t={t}
              findCountdown={findCountdown}
            />
          )}
          {hiddenMissions.length > 0 && (
            <MissionSection
              title={t.sectionHidden}
              missions={hiddenMissions}
              state={state}
              lang={lang}
              t={t}
              hint={{ show: t.showExtraHint, hide: t.hideExtraHint, body: t.extraHint }}
            />
          )}
        </>
      )}

      {allDone && (
        <div className="pt-4 flex justify-center">
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('fireworks:trigger'))}
            className="px-5 py-3 rounded-lg border border-accent/40 bg-accent/10 text-fg hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            {t.launchFireworks}
          </button>
        </div>
      )}
    </div>
  );
}

function MissionSection({
  title,
  missions,
  state,
  lang,
  t,
  hint,
  findCountdown,
}: {
  title: string;
  missions: Mission[];
  state: Record<string, boolean>;
  lang: Lang;
  t: Dict;
  hint?: SectionHint;
  findCountdown?: number | null;
}) {
  const [hintOpen, setHintOpen] = useState(false);
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="text-xs uppercase tracking-widest text-muted font-medium">{title}</h2>
        {hint && (
          <button
            type="button"
            onClick={() => setHintOpen((v) => !v)}
            aria-expanded={hintOpen}
            className="text-xs text-muted hover:text-fg underline decoration-dotted underline-offset-4 transition-colors"
          >
            {hintOpen ? hint.hide : hint.show}
          </button>
        )}
      </div>
      {hint && hintOpen && (
        <p className="text-xs text-muted leading-relaxed border-l-2 border-border pl-3">{hint.body}</p>
      )}
      <ul className="space-y-3">
        {missions.map((m) => (
          <MissionCard
            key={m.id}
            mission={m}
            done={!!state[m.id]}
            lang={lang}
            t={t}
            countdown={m.id === 'find-mission-page' ? findCountdown : undefined}
          />
        ))}
      </ul>
    </section>
  );
}

function MissionCard({
  mission,
  done,
  lang,
  t,
  countdown,
}: {
  mission: Mission;
  done: boolean;
  lang: Lang;
  t: Dict;
  countdown?: number | null;
}) {
  const isHidden = !!mission.hidden;
  const isPersistent = !!mission.persistent;
  const masked = isHidden && !done && !isPersistent;
  const title = masked ? t.hiddenLockedTitle : mission.title[lang];
  const baseHint = masked ? t.hiddenLockedHint : mission.hint[lang];

  let hintNode: React.ReactNode = baseHint;
  if (mission.id === 'find-mission-page' && !done && countdown != null) {
    const seconds = (
      <span className="text-accent font-medium tabular-nums">
        {lang === 'ko' ? `${countdown}초` : `${countdown} seconds`}
      </span>
    );
    hintNode =
      lang === 'ko' ? (
        <>이 페이지에 {seconds} 이상 머무르면 자동으로 달성돼요.</>
      ) : (
        <>Stay on this page for at least {seconds} and it unlocks automatically.</>
      );
  }

  return (
    <li
      className={`rounded-lg border p-5 transition-colors ${
        done
          ? 'border-accent/60 bg-accent/5'
          : masked
            ? 'border-dashed border-border bg-border/10'
            : 'border-border'
      }`}
    >
      <div className="flex items-start gap-4">
        {done ? (
          isPersistent ? (
            <span
              aria-hidden
              className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full border border-accent bg-accent text-white shrink-0 cursor-not-allowed"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12l5 5L20 7" />
              </svg>
            </span>
          ) : (
            <button
              type="button"
              onClick={() => resetMission(mission.id)}
              aria-label={t.cardReset}
              title={t.cardReset}
              className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full border border-accent bg-accent text-white shrink-0 hover:opacity-70 transition-opacity"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 12l5 5L20 7" />
              </svg>
            </button>
          )
        ) : (
          <span
            aria-hidden
            className="mt-0.5 inline-grid h-6 w-6 place-items-center rounded-full border border-border text-muted shrink-0"
          >
            {masked ? (
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="4" y="11" width="16" height="9" rx="2" />
                <path d="M8 11V7a4 4 0 0 1 8 0v4" />
              </svg>
            ) : (
              <span className="text-[10px]">?</span>
            )}
          </span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-baseline justify-between gap-3 flex-wrap">
            <h3
              className={`font-serif text-lg font-semibold ${
                masked ? 'text-muted tracking-widest' : ''
              }`}
            >
              {title}
            </h3>
            <span className={`text-[10px] uppercase tracking-widest ${done ? 'text-accent' : 'text-muted'}`}>
              {isHidden && done ? t.hiddenTag : done ? t.completedTag : t.pendingTag}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted leading-relaxed">{hintNode}</p>
        </div>
      </div>
    </li>
  );
}
