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

export type Mission = {
  id: MissionId;
  title: { ko: string; en: string; zh: string; ja: string };
  hint: { ko: string; en: string; zh: string; ja: string };
  /** Shown on the masked card before the hidden mission is unlocked. Falls back to a generic hint if omitted. */
  lockedHint?: { ko: string; en: string; zh: string; ja: string };
  hidden?: boolean;
  persistent?: boolean;
};

export const MISSIONS: Mission[] = [
  {
    id: 'find-mission-page',
    title: {
      ko: '잠깐 멈춰서 둘러보기',
      en: 'Take a beat, look around',
      zh: '停一下,环顾四周',
      ja: '少し立ち止まってみる',
    },
    hint: {
      ko: '어떤 미션이 숨어 있는지 천천히 살펴봐요. 빨리 지나치면 놓치는 재미가 있거든요. 7초 정도 가만히 두면 첫 보상.',
      en: "See what's hiding here — speed-reading skips the small joys. Just hover for about 7 seconds and the first reward lands.",
      zh: '看看这里都藏着什么 —— 一扫而过会错过小惊喜。停留约 7 秒,首个奖励就会到手。',
      ja: 'ここに何が隠れているか、ゆっくり眺めてみてください。流し読みでは小さな楽しみを逃します。約 7 秒で最初のごほうび。',
    },
  },
  {
    id: 'toggle-dark-mode',
    title: {
      ko: '밤 모드로 옷 갈아입기',
      en: 'Slip into night mode',
      zh: '换上夜间装扮',
      ja: '夜モードに着替える',
    },
    hint: {
      ko: '늦은 밤 흰 화면이 눈을 찌르죠. 우측 상단 동그란 버튼이 분위기를 바꿔줍니다.',
      en: 'Late at night, a bright screen jabs at your eyes. The little round button in the top-right shifts the mood.',
      zh: '深夜里白屏太刺眼。右上角的小圆按钮可以切换氛围。',
      ja: '夜更けの真っ白な画面は目に刺さります。右上の小さな丸ボタンで雰囲気が変わります。',
    },
  },
  {
    id: 'toggle-language',
    title: {
      ko: '다른 나라 사람처럼 읽어보기',
      en: 'Read like a stranger',
      zh: '换个语言读一读',
      ja: '別の国の人になって読んでみる',
    },
    hint: {
      ko: '같은 페이지가 영·중·일로 다시 펼쳐져요. 누구든 막힘없이 읽을 수 있다는 뜻이기도 하고요.',
      en: 'The same page unfolds in English, Chinese, and Japanese — proof that anyone can land here without getting stuck.',
      zh: '同一页面会以英、中、日重新展开 —— 也就是说,任何人来都看得懂。',
      ja: '同じページが英・中・日でも開きます。誰が来ても読めるという意味でもあります。',
    },
  },
  {
    id: 'open-project-menu',
    title: {
      ko: '프로젝트 서랍 열어보기',
      en: 'Open the project drawer',
      zh: '打开项目抽屉',
      ja: 'プロジェクトの引き出しを開く',
    },
    hint: {
      ko: '카테고리별로 옛 작업물이 정리돼 있어요. 블로그 주인이 어떤 길을 걸어왔는지 흔적을 따라가 보세요.',
      en: 'Past work is shelved by category. Follow the trail and see which road I walked.',
      zh: '过去的作品按类别整齐摆放。沿着痕迹走一走,看看我曾经走过的路。',
      ja: '過去の作品がカテゴリごとに並んでいます。足跡をたどって、私が歩いてきた道を見てください。',
    },
  },
  {
    id: 'scroll-to-bottom',
    title: {
      ko: '바닥까지 호기심 따라가기',
      en: 'Chase curiosity to the floor',
      zh: '一路滚到底',
      ja: '一番下まで好奇心を追いかける',
    },
    hint: {
      ko: '페이지 끝이 어떻게 끝나는지 본 적 있나요? 풋터에서 진짜 마지막을 만나봐요.',
      en: "Ever seen how a page actually ends? Meet the real bottom in the footer.",
      zh: '看过页面真正的尽头吗?在页脚处遇见结尾。',
      ja: 'ページの本当の終わりを見たことありますか?フッターで最後と出会ってください。',
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
      ko: '개발자가 입버릇처럼 누르는 그 키를 한 번. 모바일이라면 이 카드를 10초 꾹 눌러봐요.',
      en: 'Press the key developers reach for instinctively. On mobile, press and hold this card for 10 seconds instead.',
      zh: '试试开发者顺手就按的那个键。手机上则按住这张卡片 10 秒钟。',
      ja: '開発者が思わず押すあのキーを。モバイルではこのカードを 10 秒押したままに。',
    },
    lockedHint: {
      ko: '개발자가 본능처럼 누르는 그 키 한 번. 모바일이면 이 카드를 10초 꾹 눌러봐요.',
      en: 'The key developers reach for on instinct. On mobile, press and hold this card for 10 seconds.',
      zh: '开发者顺手就按的那个键。手机上则按住这张卡片 10 秒钟。',
      ja: '開発者が思わず押すあのキーをひと押し。モバイルではこのカードを 10 秒押したままに。',
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
      ko: '패치노트를 굳이 들춰보는 사람은 드물어요. 여기서 가장 진성 유저로 인증.',
      en: "Hardly anyone bothers to dig through patch notes. You just earned diehard-user status here.",
      zh: '会专门翻阅补丁说明的人不多。你刚在这里成功认证为最铁的用户。',
      ja: 'パッチノートを敢えて開く人はそういません。ここで最も筋金入りユーザーとして認定。',
    },
    lockedHint: {
      ko: '꾸준히 바뀌는 흔적이 어딘가에 적혀 있어요. 그 기록을 한 번 들춰보면 자동으로 풀려요.',
      en: "Steady traces of change live in a corner of this site. Crack open that log and this unlocks itself.",
      zh: '持续变化的痕迹被记录在网站的某个角落。翻开那份记录,这便自动解开。',
      ja: '少しずつの変化がサイトのどこかに記録されています。その記録をめくれば、自動で解除されます。',
    },
    hidden: true,
  },
];

const STORAGE_KEY = 'missions:v1';

export function getMissionState(): Record<string, boolean> {
  return readStore();
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

export function completeMission(id: MissionId) {
  if (typeof window === 'undefined') return false;
  const state = readStore();
  if (state[id]) return false;
  state[id] = true;
  writeStore(state);
  const completedTotal = MISSIONS.filter((m) => state[m.id]).length;
  const completedHidden = MISSIONS.filter((m) => m.hidden && state[m.id]).length;
  const totalHidden = MISSIONS.filter((m) => m.hidden).length;
  window.dispatchEvent(
    new CustomEvent('missions:unlocked', {
      detail: { id, completedTotal, completedHidden, totalHidden },
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

