'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { prefixed } from '@/lib/i18n';
import {
  MISSIONS,
  completeMission,
  resetMission,
  useMissions,
  useMissionsActive,
  setMissionsActive,
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
    hiddenLockedHint: '웹 개발자라면 누르는 버튼이에요. 모바일이라면 이 카드를 5초 꾹 눌러봐요.',
    showExtraHint: '힌트 보기',
    hideExtraHint: '힌트 접기',
    extraHint: '패치노트에 히든 미션 달성법이 적혀있어요.',
    reset: '미션 초기화',
    cardReset: '클릭해서 초기화',
    empty: '아직 미션이 없습니다.',
    activateTitle: '미션이 꺼져 있어요',
    activateDesc: '활성화하면 사이트를 탐험하며 미션을 달성할 수 있어요. 히든 미션은 항상 발동됩니다.',
    activateBtn: '미션 활성화',
    deactivateBtn: '미션 비활성화',
    sectionMain: '페이지 100% 즐기기',
    sectionHidden: '히든 미션',
    launchFireworks: '🎆 축하하기',
    photoShortcut: '🖼️ 사진첩 바로가기',
    darkModeTitleOn: '어둠으로 들어가기',
    darkModeTitleOff: '빛으로 들어가기',
    darkModeHintOff: '화면 모드 버튼을 다시 눌러 밝은 화면으로 돌아가 보세요.',
  },
  en: {
    progressLabel: 'completed',
    completedTag: 'Done',
    pendingTag: 'Pending',
    hiddenTag: 'Hidden',
    hiddenLockedTitle: '???',
    hiddenLockedHint: 'The key developers reach for instinctively. On mobile, press and hold this card for 5 seconds.',
    showExtraHint: 'Show hint',
    hideExtraHint: 'Hide hint',
    extraHint: 'The patch notes describe how to unlock hidden missions.',
    reset: 'Reset missions',
    cardReset: 'Click to reset',
    empty: 'No missions yet.',
    activateTitle: 'Missions are off',
    activateDesc: 'Activate to earn missions as you explore the site. Hidden missions always fire.',
    activateBtn: 'Activate missions',
    deactivateBtn: 'Deactivate missions',
    sectionMain: 'Make the most of the site',
    sectionHidden: 'Hidden missions',
    launchFireworks: '🎆 Fireworks',
    photoShortcut: '🖼️ Go to photo album',
    darkModeTitleOn: 'Enter the darkness',
    darkModeTitleOff: 'Return to the light',
    darkModeHintOff: 'Press the theme button again to switch back to the light screen.',
  },
  zh: {
    progressLabel: '已完成',
    completedTag: '已完成',
    pendingTag: '未完成',
    hiddenTag: '隐藏',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '试试开发者顺手就按的那个键。手机上则按住这张卡片 5 秒钟。',
    showExtraHint: '查看提示',
    hideExtraHint: '收起提示',
    extraHint: '补丁说明里写着隐藏任务的达成方式。',
    reset: '重置任务',
    cardReset: '点击重置',
    empty: '暂无任务。',
    activateTitle: '任务已关闭',
    activateDesc: '激活后，探索网站时即可完成任务。隐藏任务始终有效。',
    activateBtn: '激活任务',
    deactivateBtn: '关闭任务',
    sectionMain: '充分体验本站',
    sectionHidden: '隐藏任务',
    launchFireworks: '🎆 烟花',
    photoShortcut: '🖼️ 前往相册',
    darkModeTitleOn: '步入黑暗',
    darkModeTitleOff: '回归光明',
    darkModeHintOff: '再次点击模式按钮，即可回到亮色界面。',
  },
  ja: {
    progressLabel: '達成',
    completedTag: '達成',
    pendingTag: '未達成',
    hiddenTag: '隠し',
    hiddenLockedTitle: '???',
    hiddenLockedHint: '開発者が思わず押すあのキーをひと押し。モバイルではこのカードを 5 秒押したままに。',
    showExtraHint: 'ヒントを見る',
    hideExtraHint: 'ヒントを閉じる',
    extraHint: 'パッチノートに隠しミッションの達成方法が書かれています。',
    reset: 'ミッションをリセット',
    cardReset: 'クリックでリセット',
    empty: 'まだミッションはありません。',
    activateTitle: 'ミッションはオフです',
    activateDesc: '有効にするとサイトを探索しながらミッションを達成できます。隠しミッションは常に有効です。',
    activateBtn: 'ミッションを有効にする',
    deactivateBtn: 'ミッションを無効にする',
    sectionMain: 'サイトを100%楽しむ',
    sectionHidden: '隠しミッション',
    launchFireworks: '🎆 花火',
    photoShortcut: '🖼️ 写真集へ移動',
    darkModeTitleOn: '暗闇へ踏み込む',
    darkModeTitleOff: '光の中へ戻る',
    darkModeHintOff: '画面モードボタンをもう一度押して、明るい画面に戻りましょう。',
  },
} as const;

type Dict = (typeof dict)[Lang];
type SectionHint = { show: string; hide: string; body: string };

const FIND_PAGE_DURATION = 7;

export function MissionList({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { state, reset } = useMissions();
  const missionsActive = useMissionsActive();
  const [findCountdown, setFindCountdown] = useState<number | null>(null);

  useEffect(() => {
    if (!missionsActive || state['find-mission-page']) {
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

    startTimer();

    const events: (keyof WindowEventMap)[] = [
      'mousemove', 'mousedown', 'keydown', 'wheel', 'scroll', 'touchstart', 'touchmove',
    ];
    events.forEach((ev) => window.addEventListener(ev, startTimer, { passive: true }));

    return () => {
      window.clearInterval(interval);
      window.clearTimeout(timer);
      events.forEach((ev) => window.removeEventListener(ev, startTimer));
    };
  }, [state, missionsActive]);

  const done = MISSIONS.filter((m) => state[m.id]).length;
  const total = MISSIONS.length;
  const allDone = total > 0 && done === total;
  const mainMissions = MISSIONS.filter((m) => !m.hidden);
  const hiddenMissions = MISSIONS.filter((m) => m.hidden);

  return (
    <div className="space-y-8">
      {/* 활성화 토글 */}
      {!missionsActive ? (
        <div className="rounded-xl border border-border bg-fg/[0.02] p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <div className="flex-1">
            <p className="font-semibold text-fg text-sm">{t.activateTitle}</p>
            <p className="text-xs text-muted mt-1 leading-relaxed">{t.activateDesc}</p>
          </div>
          <button
            type="button"
            onClick={() => setMissionsActive(true)}
            className="shrink-0 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:opacity-90 transition-opacity self-start sm:self-auto"
          >
            {t.activateBtn}
          </button>
        </div>
      ) : (
        <div className="flex items-center justify-between">
          <span className="text-xs text-accent font-medium">● {lang === 'ko' ? '미션 진행 중' : lang === 'zh' ? '任务进行中' : lang === 'ja' ? 'ミッション進行中' : 'Missions active'}</span>
          <button
            type="button"
            onClick={() => setMissionsActive(false)}
            className="text-xs text-muted hover:text-fg transition-colors"
          >
            {t.deactivateBtn}
          </button>
        </div>
      )}

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
        <div className="pt-4 flex flex-wrap justify-center gap-3">
          <Link
            href={`${prefixed('/about/', lang)}?tab=photo`}
            className="px-5 py-3 rounded-lg border border-accent/40 bg-accent/10 text-fg hover:bg-accent/20 transition-colors text-sm font-medium"
          >
            {t.photoShortcut}
          </Link>
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
    }, 5000);
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
  if (!done) {
    if (mission.id === 'toggle-dark-mode' && !masked && isDark) {
      hintNode = t.darkModeHintOff;
    }
  } else {
    if (mission.id === 'toggle-dark-mode') {
      hintNode = (isDark ? mission.popupBodyDark?.[lang] : mission.popupBodyLight?.[lang]) ?? baseHint;
    } else if (mission.completedHint) {
      hintNode = mission.completedHint[lang];
    }
  }
  if (mission.id === 'find-mission-page' && !done && countdown != null) {
    const secondsText =
      lang === 'ko' ? `${countdown}초`
      : lang === 'zh' ? `${countdown}秒`
      : lang === 'ja' ? `${countdown}秒`
      : `${countdown} seconds`;
    const seconds = <span className="text-accent font-medium tabular-nums">{secondsText}</span>;
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
      } ${longPressEnabled ? 'cursor-pointer select-none touch-manipulation' : ''} ${
        isPressing ? 'scale-[0.98] bg-accent/10' : ''
      }`}
    >
      <div className="flex items-start gap-4">
        {/* 완료 체크 / 미완료 원 */}
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
            <h3 className={`font-serif text-lg font-semibold ${masked ? 'text-muted tracking-widest' : ''}`}>
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
