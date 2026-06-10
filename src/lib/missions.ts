'use client';

import { useEffect, useState, useCallback } from 'react';

export type MissionId =
  | 'discover-f12'
  | 'toggle-dark-mode'
  | 'toggle-language'
  | 'open-project-menu'
  | 'scroll-to-bottom'
  | 'find-mission-page';

export type Mission = {
  id: MissionId;
  title: { ko: string; en: string };
  hint: { ko: string; en: string };
  hidden?: boolean;
};

export const MISSIONS: Mission[] = [
  {
    id: 'discover-f12',
    title: { ko: '숨겨진 단축키 찾기', en: 'Find the hidden shortcut' },
    hint: {
      ko: '개발자 도구를 여는 그 키를 눌러보세요. 모바일이라면 상단 로고를 길게 눌러 보세요.',
      en: 'Try the key that opens developer tools. On mobile, long-press the logo at the top.',
    },
    hidden: true,
  },
  {
    id: 'toggle-dark-mode',
    title: { ko: '다크모드 켜보기', en: 'Toggle dark mode' },
    hint: {
      ko: '우측 상단의 토글 버튼을 눌러 보세요.',
      en: 'Try the toggle in the top-right corner.',
    },
  },
  {
    id: 'toggle-language',
    title: { ko: '언어 바꿔보기', en: 'Switch the language' },
    hint: {
      ko: '한국어와 영어를 오가 보세요.',
      en: 'Switch between Korean and English.',
    },
  },
  {
    id: 'open-project-menu',
    title: { ko: '프로젝트 메뉴 열기', en: 'Open the project menu' },
    hint: {
      ko: '내비게이션에서 프로젝트 메뉴를 펼쳐 보세요.',
      en: 'Expand the Project menu in the navigation.',
    },
  },
  {
    id: 'scroll-to-bottom',
    title: { ko: '스크롤 끝까지 내리기', en: 'Scroll to the bottom' },
    hint: {
      ko: '어떤 페이지든 끝까지 내려가 보세요.',
      en: 'Scroll any page all the way to the bottom.',
    },
  },
  {
    id: 'find-mission-page',
    title: { ko: '미션 페이지 도달', en: 'Reach the mission page' },
    hint: {
      ko: '이 페이지에 도착했다면 자동 완료!',
      en: 'Auto-completed once you got here.',
    },
  },
];

const STORAGE_KEY = 'missions:v1';

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

export function completeMission(id: MissionId) {
  if (typeof window === 'undefined') return false;
  const state = readStore();
  if (state[id]) return false;
  state[id] = true;
  writeStore(state);
  window.dispatchEvent(new CustomEvent('missions:unlocked', { detail: { id } }));
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