'use client';

import { useEffect, useRef, useState } from 'react';
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
    hiddenLockedHint: '개발자가 본능처럼 누르는 그 키 한 번. 모바일이면 이 카드를 1초 꾹 눌러봐요.',
    showExtraHint: '힌트 보기',
    hideExtraHint: '힌트 접기',
    extraHint: '패치노트에 히든 미션 달성법이 적혀있어요.',
    reset: '미션 초기화',
    cardReset: '클릭해서 초기화',
    empty: '아직 미션이 없습니다.',
    sectionMain: '페이지 100% 즐기기',
    sectionHidden: '히든 미션',
    launchFireworks: '🎆 미션 달성 폭죽 터트리기',
    darkModeTitleOn: '밤 모드로 옷 갈아입기',
    darkModeTitleOff: '다시 낮으로 돌아가기',
  },
  en: {
    progressLabel: 'completed',
    completedTag: 'Done',
    pendingTag: 'Pending',
    hiddenTag: 'Hidden',
    hiddenLockedTitle: '???',
    hiddenLockedHint: 'The key developers reach for on instinct. On mobile, press and hold this card for 1 second.',
    showExtraHint: 'Show hint',
    hideExtraHint: 'Hide hint',
    extraHint: 'The patch notes describe how to unlock hidden missions.',
    reset: 'Reset missions',
    cardReset: 'Click to reset',
    empty: 'No missions yet.',
    sectionMain: 'Make the most of the site',
    sectionHidden: 'Hidden missions',
    launchFireworks: '🎆 Launch celebration fireworks',
    darkModeTitleOn: 'Slip into night mode',
    darkModeTitleOff: 'Step back into daylight',
  },
  zh: {
    progressLabel: '已完成',
    completedTag: '已完成',
    pendingTag: '未完成',
    hiddenTag: '隐藏',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '开发者顺手就按的那个键。手机上则按住这张卡片 1 秒钟。',
    showExtraHint: '查看提示',
    hideExtraHint: '收起提示',
    extraHint: '补丁说明里写着隐藏任务的达成方式。',
    reset: '重置任务',
    cardReset: '点击重置',
    empty: '暂无任务。',
    sectionMain: '充分体验本站',
    sectionHidden: '隐藏任务',
    launchFireworks: '🎆 庆祝烟花',
    darkModeTitleOn: '换上夜间装扮',
    darkModeTitleOff: '回到白天',
  },
  ja: {
    progressLabel: '達成',
    completedTag: '達成',
    pendingTag: '未達成',
    hiddenTag: '隠し',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '開発者が思わず押すあのキーをひと押し。モバイルではこのカードを 1 秒押したままに。',
    showExtraHint: 'ヒントを見る',
    hideExtraHint: 'ヒントを閉じる',
    extraHint: 'パッチノートに隠しミッションの達成方法が書かれています。',
    reset: 'ミッションをリセット',
    cardReset: 'クリックでリセット',
    empty: 'まだミッションはありません。',
    sectionMain: 'サイトを100%楽しむ',
    sectionHidden: '隠しミッション',
    launchFireworks: '🎆 ミッション達成花火',
    darkModeTitleOn: '夜モードに着替える',
    darkModeTitleOff: '昼に戻る',
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

    let interval = 0;
    let timer = 0;

    function startTimer() {
      window.clearInterval(interval);
      window.clearTimeout(timer);
      setFindCountdown(FIND_PAGE_DURATION);
      let remaining = FIND_PAGE_DURATION;
      interval = window.setInterval(() => {
        remaining -= 1;
        if (remaining > 0) {
          setFindCountdown(remaining);
        } else {
          window.clearInterval(interval);
        }
      }, 1000);
      timer = window.setTimeout(() => {
        completeMission('find-mission-page');
      }, FIND_PAGE_DURATION * 1000);
    }

    function onActivity() {
      startTimer();
    }

    startTimer();

    const events: (keyof WindowEventMap)[] = [
      'mousemove',
      'mousedown',
      'keydown',
      'wheel',
      'scroll',
      'touchstart',
      'touchmove',
    ];
    events.forEach((ev) => window.addEventListener(ev, onActivity, { passive: true }));

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, onActivity));
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
            onClick={() => reset()}
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

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    if (mission.id !== 'toggle-dark-mode') return;
    function update() {
      setIsDark(document.documentElement.classList.contains('dark'));
    }
    update();
    const observer = new MutationObserver(update);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, [mission.id]);

  const longPressEnabled = mission.id === 'discover-f12' && masked;
  const longPressTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [isPressing, setIsPressing] = useState(false);

  function startLongPress() {
    if (!longPressEnabled) return;
    setIsPressing(true);
    longPressTimer.current = setTimeout(() => {
      completeMission('discover-f12');
      setIsPressing(false);
    }, 1000);
  }
  function cancelLongPress() {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current);
      longPressTimer.current = null;
    }
    setIsPressing(false);
  }
  useEffect(() => () => cancelLongPress(), []);

  let title = masked ? t.hiddenLockedTitle : mission.title[lang];
  if (mission.id === 'toggle-dark-mode' && !masked) {
    title = isDark ? t.darkModeTitleOff : t.darkModeTitleOn;
  }
  const baseHint = masked
    ? mission.lockedHint?.[lang] || t.hiddenLockedHint
    : mission.hint[lang];

  let hintNode: React.ReactNode = baseHint;
  if (mission.id === 'find-mission-page' && !done && countdown != null) {
    const secondsText =
      lang === 'ko'
        ? `${countdown}초`
        : lang === 'zh'
          ? `${countdown}秒`
          : lang === 'ja'
            ? `${countdown}秒`
            : `${countdown} seconds`;
    const seconds = (
      <span className="text-accent font-medium tabular-nums">{secondsText}</span>
    );
    if (lang === 'ko') {
      hintNode = <>{seconds} 정도만 더 머무르면 자동으로 클리어. 그 사이 다른 미션도 한 번 훑어봐요.</>;
    } else if (lang === 'zh') {
      hintNode = <>再停留 {seconds} 自动完成。趁机看看其他任务吧。</>;
    } else if (lang === 'ja') {
      hintNode = <>あと {seconds} 留まると自動でクリア。その間に他のミッションも覗いてみてください。</>;
    } else {
      hintNode = <>Hang on {seconds} more and it clears itself. Peek at the other missions while you wait.</>;
    }
  }

  return (
    <li
      onPointerDown={startLongPress}
      onPointerUp={cancelLongPress}
      onPointerLeave={cancelLongPress}
      onPointerCancel={cancelLongPress}
      onContextMenu={longPressEnabled ? (e) => e.preventDefault() : undefined}
      className={`rounded-lg border p-5 transition-colors ${
        done
          ? 'border-accent/60 bg-accent/5'
          : masked
            ? 'border-dashed border-border bg-border/10'
            : 'border-border'
      } ${
        longPressEnabled ? 'cursor-pointer select-none touch-manipulation' : ''
      } ${isPressing ? 'scale-[0.98] bg-accent/10' : ''}`}
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
