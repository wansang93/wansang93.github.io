'use client';
import { useState, useEffect } from 'react';

export type AccentPresetId =
  | 'black' | 'wine' | 'orange' | 'yellow' | 'sky'
  | 'random' | 'custom';

export const ACCENT_PRESETS: {
  id: Exclude<AccentPresetId, 'random' | 'custom'>;
  light: string;
  dark: string;
}[] = [
  { id: 'black',  light: '#1c1917', dark: '#d6d3d1' },
  { id: 'wine',   light: '#881337', dark: '#fb7185' },
  { id: 'orange', light: '#ea580c', dark: '#fb923c' },
  { id: 'yellow', light: '#ca8a04', dark: '#fde047' },
  { id: 'sky',    light: '#0284c7', dark: '#38bdf8' },
];

function hexToRgb(hex: string): string {
  return `${parseInt(hex.slice(1, 3), 16)} ${parseInt(hex.slice(3, 5), 16)} ${parseInt(hex.slice(5, 7), 16)}`;
}

function hslToHex(h: number, s: number, l: number): string {
  const sn = s / 100;
  const ln = l / 100;
  const a = sn * Math.min(ln, 1 - ln);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return Math.round(255 * (ln - a * Math.max(-1, Math.min(k - 3, Math.min(9 - k, 1)))))
      .toString(16)
      .padStart(2, '0');
  };
  return `#${f(0)}${f(8)}${f(4)}`;
}

export function randomAccentPair(): { light: string; dark: string } {
  const hue = Math.floor(Math.random() * 360);
  return {
    light: hslToHex(hue, 72, 44),
    dark:  hslToHex(hue, 72, 64),
  };
}

export function applyAccent(light: string, dark: string) {
  document.documentElement.style.setProperty('--accent-light', hexToRgb(light));
  document.documentElement.style.setProperty('--accent-dark', hexToRgb(dark));
}

export function saveAccent(light: string, dark: string) {
  try {
    localStorage.setItem('accent-light', light);
    localStorage.setItem('accent-dark', dark);
  } catch {}
  applyAccent(light, dark);
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('accent-changed'));
  }
}

export function getStoredAccent(): { light: string; dark: string } | null {
  if (typeof window === 'undefined') return null;
  try {
    const light = localStorage.getItem('accent-light');
    const dark = localStorage.getItem('accent-dark');
    if (light && dark) return { light, dark };
  } catch {}
  return null;
}

export function resetAccent() {
  try {
    localStorage.removeItem('accent-light');
    localStorage.removeItem('accent-dark');
  } catch {}
  document.documentElement.style.removeProperty('--accent-light');
  document.documentElement.style.removeProperty('--accent-dark');
  window.dispatchEvent(new CustomEvent('accent-changed'));
}

function initialAccentState(): { light: string; dark: string; presetId: AccentPresetId } {
  const stored = getStoredAccent();
  if (!stored) return { light: '#ea580c', dark: '#fb923c', presetId: 'orange' };
  const match = ACCENT_PRESETS.find((p) => p.light === stored.light && p.dark === stored.dark);
  return { light: stored.light, dark: stored.dark, presetId: match?.id ?? 'custom' };
}

const DEFAULT_ACCENT_STATE: { light: string; dark: string; presetId: AccentPresetId } = {
  light: '#ea580c',
  dark: '#fb923c',
  presetId: 'orange',
};

export function useAccent() {
  const [{ light, dark, presetId }, setState] = useState(DEFAULT_ACCENT_STATE);

  useEffect(() => {
    function sync() {
      setState(initialAccentState());
    }
    sync();
    window.addEventListener('accent-changed', sync);
    return () => window.removeEventListener('accent-changed', sync);
  }, []);

  function selectPreset(id: Exclude<AccentPresetId, 'random' | 'custom'>) {
    const preset = ACCENT_PRESETS.find((p) => p.id === id)!;
    setState({ light: preset.light, dark: preset.dark, presetId: id });
    saveAccent(preset.light, preset.dark);
  }

  function selectRandom() {
    const pair = randomAccentPair();
    setState({ light: pair.light, dark: pair.dark, presetId: 'random' });
    saveAccent(pair.light, pair.dark);
  }

  function selectCustom(hex: string) {
    setState({ light: hex, dark: hex, presetId: 'custom' });
    saveAccent(hex, hex);
  }

  return { light, dark, presetId, selectPreset, selectRandom, selectCustom };
}
