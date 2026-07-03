'use client';

import { useEffect, useState, useCallback } from 'react';

export type MissionId =
  | 'discover-f12'
  | 'toggle-dark-mode'
  | 'toggle-language'
  | 'open-project-menu'
  | 'scroll-to-bottom'
  | 'find-mission-page'
  | 'visit-patch-notes';

type Localized = { ko: string; en: string; zh: string; ja: string };

export type Mission = {
  id: MissionId;
  title: Localized;
  hint: Localized;
  /** Shown on the card after the mission is completed (replaces hint). */
  completedHint?: Localized;
  /** Shown on the masked card before the hidden mission is unlocked. Falls back to a generic hint if omitted. */
  lockedHint?: Localized;
  /** Custom headline for the hidden-mission modal and toast. Ignored for regular missions (title is used instead). */
  popupHeadline?: Localized;
  /** For dark-mode mission: headline when toggling back to light (meta.isDark = false). */
  popupHeadlineLight?: Localized;
  /** Brief action label shown as toast body. */
  popupBody?: Localized;
  /** Card hint when mission is done and currently in dark mode (toggle-dark-mode only). */
  popupBodyDark?: Localized;
  /** Card hint when mission is done and currently in light mode (toggle-dark-mode only). */
  popupBodyLight?: Localized;
  hidden?: boolean;
  persistent?: boolean;
};

export const MISSIONS: Mission[] = [
  {
    id: 'find-mission-page',
    title: {
      ko: '기다림의 미학',
      en: 'The Art of Waiting',
      zh: '等待的美学',
      ja: '待つことの美学',
    },
    hint: {
      ko: '7초 정도만 더 머물러 보세요. 짧은 기다림 뒤에 미션이 완료됩니다.',
      en: 'Stay just 7 more seconds. The mission completes after a brief wait.',
      zh: '再停留约 7 秒。短暂的等待后任务便会完成。',
      ja: 'あと約 7 秒だけ留まってください。少し待てばミッションが完了します。',
    },
    completedHint: {
      ko: '머무는 시간도 하나의 관심이라고 생각해요. 다른 미션도 천천히 찾아보세요.',
      en: 'The time you spend here is a form of attention. Explore the other missions at your own pace.',
      zh: '停留的时间本身也是一种关注。慢慢探索其他任务吧。',
      ja: 'ここで過ごす時間も、一つの関心だと思います。他のミッションもゆっくり探してみてください。',
    },
    popupBody: {
      ko: '7초 기다리기',
      en: 'Waited 7 seconds',
      zh: '等待了 7 秒',
      ja: '7 秒待ちました',
    },
  },
  {
    id: 'toggle-dark-mode',
    title: {
      ko: '어둠으로 들어가기',
      en: 'Step into the dark',
      zh: '进入暗黑模式',
      ja: '暗闇へ踏み込む',
    },
    hint: {
      ko: '우측 상단 동그란 버튼으로 화면 분위기를 바꿔보세요.',
      en: 'The round button in the top-right changes the screen mood.',
      zh: '右上角的小圆按钮可以切换屏幕氛围。',
      ja: '右上の丸いボタンで画面の雰囲気を変えてみてください。',
    },
    popupHeadlineLight: {
      ko: '빛으로 들어가기',
      en: 'Return to the light',
      zh: '回归光明',
      ja: '光の中へ戻る',
    },
    popupBody: {
      ko: '다크모드 버튼 클릭',
      en: 'Dark mode toggled',
      zh: '切换了深色模式',
      ja: 'ダークモードを切り替えました',
    },
    popupBodyDark: {
      ko: '어두운 화면으로 바꿨어요. 원하는 분위기로 페이지를 즐겨보세요.',
      en: 'Switched to the dark screen. Enjoy the page in your preferred mood.',
      zh: '已切换为暗黑画面。按自己喜欢的氛围浏览页面吧。',
      ja: '暗い画面に切り替えました。好みの雰囲気でページをお楽しみください。',
    },
    popupBodyLight: {
      ko: '다시 낮의 화면으로 돌아왔어요. 원하는 분위기로 페이지를 즐겨보세요.',
      en: 'Back to the bright screen. Enjoy the page in your preferred mood.',
      zh: '回到了明亮画面。按自己喜欢的氛围浏览页面吧。',
      ja: '明るい画面に戻りました。好みの雰囲気でページをお楽しみください。',
    },
  },
  {
    id: 'toggle-language',
    title: {
      ko: '세계로 열린 문',
      en: 'A Door to the World',
      zh: '通往世界的门',
      ja: '世界への扉',
    },
    hint: {
      ko: '언어 버튼을 눌러 지원하는 언어들을 확인해보세요.',
      en: 'Press the language button to check which languages are supported.',
      zh: '点击语言按钮查看支持哪些语言。',
      ja: '言語ボタンを押して、対応言語を確認してみてください。',
    },
    completedHint: {
      ko: '같은 페이지도 다른 언어로 보면 조금 다르게 느껴집니다. 편한 언어로 페이지를 둘러볼 수 있습니다.',
      en: 'The same page feels slightly different in another language. Browse in whichever language feels most natural.',
      zh: '同一页面用不同语言来看，感觉会有些不同。可以用自己最顺手的语言浏览。',
      ja: '同じページでも別の言語で見ると、少し違う印象になります。お好きな言語でページをお楽しみください。',
    },
    popupBody: {
      ko: '언어 버튼 클릭',
      en: 'Language button clicked',
      zh: '点击了语言按钮',
      ja: '言語ボタンをクリックしました',
    },
  },
  {
    id: 'open-project-menu',
    title: {
      ko: '기록의 서랍',
      en: 'The Archive Drawer',
      zh: '记录的抽屉',
      ja: '記録の引き出し',
    },
    hint: {
      ko: '프로젝트 목록을 열어 어떤 작업들이 있는지 확인해보세요.',
      en: 'Open the project list to see what work is in there.',
      zh: '打开项目列表，看看有哪些作品。',
      ja: 'プロジェクト一覧を開いて、どんな作業があるか確認してみてください。',
    },
    completedHint: {
      ko: '지금까지의 작업 흔적을 발견했어요. 좋아하는 것들을 하나씩 쌓아가고 있습니다.',
      en: 'You found traces of work so far. Stacking up the things I love, one by one.',
      zh: '发现了迄今为止的作品痕迹。正在一点一点地积累自己喜欢的事物。',
      ja: 'これまでの作業の痕跡を発見しました。好きなものを一つずつ積み上げています。',
    },
    popupBody: {
      ko: '프로젝트 목차 클릭',
      en: 'Project menu opened',
      zh: '点击了项目目录',
      ja: 'プロジェクト一覧を開きました',
    },
  },
  {
    id: 'scroll-to-bottom',
    title: {
      ko: '끝에서 시작되는 것',
      en: 'What Begins at the End',
      zh: '从终点开始的事',
      ja: '終わりから始まるもの',
    },
    hint: {
      ko: '페이지 가장 아래까지 내려가 풋터에 담긴 내용을 확인해보세요.',
      en: 'Scroll all the way to the bottom and see what the footer holds.',
      zh: '一直向下滚动到页面底部，看看页脚里有什么。',
      ja: 'ページの一番下までスクロールして、フッターに何があるか確認してみてください。',
    },
    completedHint: {
      ko: '마지막 체크포인트에 도착했습니다. 풋터에 담긴 내용을 확인해보세요.',
      en: "You've reached the last checkpoint. See what the footer holds.",
      zh: '到达了最后的检查点。看看页脚里有什么吧。',
      ja: '最後のチェックポイントに到達しました。フッターに何があるか確認してみてください。',
    },
    popupBody: {
      ko: '페이지 하단으로 이동',
      en: 'Reached the bottom',
      zh: '到达了页面底部',
      ja: 'ページの一番下に到達しました',
    },
  },
  {
    id: 'discover-f12',
    title: {
      ko: '비밀의 단축키 한 번',
      en: 'A secret key, just once',
      zh: '按一下秘密键',
      ja: '秘密のキーをひと押し',
    },
    hint: {
      ko: '웹 개발자라면 누르는 버튼이에요. 모바일이라면 이 카드를 5초 꾹 눌러봐요.',
      en: 'The key developers reach for instinctively. On mobile, press and hold this card for 5 seconds instead.',
      zh: '试试开发者顺手就按的那个键。手机上则按住这张卡片 5 秒钟。',
      ja: '開発者が思わず押すあのキーをひと押し。モバイルではこのカードを 5 秒押したままに。',
    },
    lockedHint: {
      ko: '웹 개발자라면 누르는 버튼이에요. 모바일이라면 이 카드를 5초 꾹 눌러봐요.',
      en: 'The key developers reach for instinctively. On mobile, press and hold this card for 5 seconds instead.',
      zh: '试试开发者顺手就按的那个键。手机上则按住这张卡片 5 秒钟。',
      ja: '開発者が思わず押すあのキーをひと押し。モバイルではこのカードを 5 秒押したままに。',
    },
    popupHeadline: {
      ko: '숨겨진 웹 개발자 미션을 발견했습니다.',
      en: 'You found the hidden developer mission.',
      zh: '你发现了隐藏的开发者任务。',
      ja: '隠れた開発者ミッションを発見しました。',
    },
    popupBody: {
      ko: '웹 개발자의 시선으로 다른 미션에 도전해보세요.',
      en: "Try the other missions with a developer's perspective.",
      zh: '用开发者的视角挑战其他任务吧。',
      ja: '開発者の目線で他のミッションにも挑戦してみてください。',
    },
    hidden: true,
  },
  {
    id: 'visit-patch-notes',
    title: {
      ko: '이 웹페이지에 관심이 많군요? 패치노트까지 들어오다니',
      en: 'Interested in this site, huh? You made it to the patch notes',
      zh: '对这个网站挺有兴趣嘛?连补丁说明都进来了',
      ja: 'このサイトに関心がある人ですね?パッチノートまで入ってくるとは',
    },
    hint: {
      ko: '꾸준히 바뀌는 흔적이 어딘가에 적혀 있어요. 그 기록을 한 번 찾아보세요.',
      en: "Somewhere on this site, steady traces of change are written down. Find that record.",
      zh: '网站某处记录着持续变化的痕迹。找到那份记录看看吧。',
      ja: 'このサイトのどこかに変化の記録があります。その記録を一度探してみてください。',
    },
    lockedHint: {
      ko: '꾸준히 바뀌는 흔적이 어딘가에 적혀 있어요. 그 기록을 한 번 찾아보세요.',
      en: "Somewhere on this site, steady traces of change are written down. Find that record.",
      zh: '网站某处记录着持续变化的痕迹。找到那份记录看看吧。',
      ja: 'このサイトのどこかに変化の記録があります。その記録を一度探してみてください。',
    },
    popupHeadline: {
      ko: '패치노트를 클릭한 분들을 위한 히든 미션이 열렸습니다.',
      en: 'A hidden mission unlocked for patch-notes readers.',
      zh: '专为点开补丁说明的你开启了隐藏任务。',
      ja: 'パッチノートを開いた方のための隠しミッションが解放されました。',
    },
    popupBody: {
      ko: '이런 관심을 주시는 사람을 기다렸어요!',
      en: "We've been waiting for someone this curious!",
      zh: '一直在等有这份关心的人！',
      ja: 'こんな関心を持つ人を待っていました！',
    },
    hidden: true,
  },
];

const STORAGE_KEY = 'missions:v1';
const ACTIVE_KEY = 'missions:active';

export function getMissionsActive(): boolean {
  if (typeof window === 'undefined') return false;
  try { return localStorage.getItem(ACTIVE_KEY) === 'true'; } catch { return false; }
}

export function setMissionsActive(active: boolean) {
  try { localStorage.setItem(ACTIVE_KEY, String(active)); } catch {}
  window.dispatchEvent(new CustomEvent('missions:active-change'));
}

export function useMissionsActive() {
  const [active, setActive] = useState(false);
  useEffect(() => {
    setActive(getMissionsActive());
    function sync() { setActive(getMissionsActive()); }
    window.addEventListener('missions:active-change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('missions:active-change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);
  return active;
}

export function getMissionState(): Record<string, boolean> {
  return readStore();
}

export function allMissionsCompleted(state: Record<string, boolean>): boolean {
  return MISSIONS.every((m) => state[m.id]);
}

function readStore(): Record<string, boolean> {
  if (typeof window === 'undefined') return {};
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Record<string, boolean>) : {};
  } catch {
    return {};
  }
}

function writeStore(state: Record<string, boolean>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {}
  window.dispatchEvent(new CustomEvent('missions:change'));
}

export function resetMission(id: MissionId) {
  if (typeof window === 'undefined') return false;
  const state = readStore();
  if (!state[id]) return false;
  delete state[id];
  writeStore(state);
  return true;
}

export function completeMission(id: MissionId, meta?: Record<string, unknown>) {
  if (typeof window === 'undefined') return false;
  const mission = MISSIONS.find((m) => m.id === id);
  // 히든 미션은 항상 발동, 일반 미션은 시스템이 활성일 때만
  if (!mission?.hidden && !getMissionsActive()) return false;
  const state = readStore();
  if (state[id]) return false;
  state[id] = true;
  writeStore(state);
  const completedTotal = MISSIONS.filter((m) => state[m.id]).length;
  const completedHidden = MISSIONS.filter((m) => m.hidden && state[m.id]).length;
  const totalHidden = MISSIONS.filter((m) => m.hidden).length;
  window.dispatchEvent(
    new CustomEvent('missions:unlocked', {
      detail: { id, completedTotal, completedHidden, totalHidden, meta },
    })
  );
  return true;
}

export function useMissions() {
  const [state, setState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    setState(readStore());
    function sync() {
      setState(readStore());
    }
    window.addEventListener('missions:change', sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener('missions:change', sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  const toggle = useCallback((id: MissionId, value?: boolean) => {
    const next = readStore();
    next[id] = value ?? !next[id];
    writeStore(next);
  }, []);

  const reset = useCallback(() => {
    writeStore({});
  }, []);

  return { state, toggle, reset };
}

