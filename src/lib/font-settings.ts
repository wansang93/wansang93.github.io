'use client';
import { useState, useEffect } from 'react';

export type FontId = 'pretendard' | 'inter' | 'fraunces' | 'system';

export const FONT_OPTIONS: { id: FontId; name: string }[] = [
  { id: 'pretendard', name: 'Pretendard' },
  { id: 'inter', name: 'Inter' },
  { id: 'fraunces', name: 'Fraunces' },
  { id: 'system', name: 'System' },
];

export const FONT_STACK: Record<FontId, string> = {
  pretendard: 'var(--font-pretendard), var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  inter: 'var(--font-inter), ui-sans-serif, system-ui, sans-serif',
  fraunces: 'var(--font-fraunces), ui-serif, Georgia, serif',
  system: 'system-ui, -apple-system, "Segoe UI", Roboto, sans-serif',
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
