'use client';
import { useState, useEffect } from 'react';

export type FontId = 'pretendard' | 'noto-sans-kr' | 'suit' | 'jua';

export const FONT_OPTIONS: { id: FontId; name: string }[] = [
  { id: 'pretendard', name: 'Pretendard' },
  { id: 'noto-sans-kr', name: 'Noto Sans KR' },
  { id: 'suit', name: 'SUIT' },
  { id: 'jua', name: '배민 주아체' },
];

export const FONT_STACK: Record<FontId, string> = {
  pretendard: 'var(--font-pretendard), var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  'noto-sans-kr': "'Noto Sans KR', ui-sans-serif, system-ui, sans-serif",
  suit: 'var(--font-suit), ui-sans-serif, system-ui, sans-serif',
  jua: "'Jua', ui-sans-serif, system-ui, sans-serif",
};

const STORAGE_KEY = 'font';

export function getFont(): FontId {
  if (typeof window === 'undefined') return 'pretendard';
  try { return (localStorage.getItem(STORAGE_KEY) as FontId) || 'pretendard'; } catch { return 'pretendard'; }
}

export function applyFont(id: FontId) {
  if (id === 'pretendard') {
    delete document.documentElement.dataset.font;
  } else {
    document.documentElement.dataset.font = id;
  }
}

export function saveFont(id: FontId) {
  try {
    if (id === 'pretendard') localStorage.removeItem(STORAGE_KEY);
    else localStorage.setItem(STORAGE_KEY, id);
  } catch {}
  applyFont(id);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('font-changed'));
  }
}

export function useFont() {
  const [font, setFontState] = useState<FontId>('pretendard');

  useEffect(() => {
    setFontState(getFont());
  }, []);

  function setFont(id: FontId) {
    saveFont(id);
    setFontState(id);
  }

  return { font, setFont };
}
