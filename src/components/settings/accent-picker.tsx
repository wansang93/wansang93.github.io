'use client';
import { useRef } from 'react';
import { ACCENT_PRESETS, useAccent } from '@/lib/accent-settings';
import type { Lang } from '@/lib/i18n';

const PRESET_LABEL: Record<string, Record<string, string>> = {
  black:  { ko: '검정',   en: 'Black',  zh: '黑色', ja: 'ブラック' },
  wine:   { ko: '와인',   en: 'Wine',   zh: '酒红', ja: 'ワイン' },
  orange: { ko: '오렌지', en: 'Orange', zh: '橙色', ja: 'オレンジ' },
  yellow: { ko: '개나리', en: 'Yellow', zh: '黄色', ja: 'イエロー' },
  sky:    { ko: '하늘',   en: 'Sky',    zh: '天蓝', ja: 'スカイ' },
};

const dict = {
  ko: {
    title: '강조 색상',
    desc: '링크, 버튼, 포인트 등에 사용되는 색상을 선택합니다. 선택한 설정은 이 기기에 저장됩니다.',
    random: '랜덤 추천',
    custom: '직접 선택',
    currentColor: '현재 색상',
  },
  en: {
    title: 'Accent color',
    desc: 'Choose the color used for links, buttons, and highlights. Your preference is saved on this device.',
    random: 'Random',
    custom: 'Custom',
    currentColor: 'Current color',
  },
  zh: {
    title: '强调色',
    desc: '选择用于链接、按钮和高亮的颜色。您的偏好设置将保存在本设备上。',
    random: '随机推荐',
    custom: '自定义',
    currentColor: '当前颜色',
  },
  ja: {
    title: 'アクセントカラー',
    desc: 'リンク・ボタン・ポイントに使用する色を選択します。設定はこのデバイスに保存されます。',
    random: 'ランダム',
    custom: 'カスタム',
    currentColor: '現在の色',
  },
} as const;

export function AccentPicker({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { light, presetId, selectPreset, selectRandom, selectCustom } = useAccent();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-semibold">{t.title}</h2>
        <p className="mt-1 text-sm text-muted leading-relaxed">{t.desc}</p>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        {/* 프리셋 스와치 */}
        {ACCENT_PRESETS.map((preset) => {
          const selected = presetId === preset.id;
          const label = PRESET_LABEL[preset.id]?.[lang] ?? preset.id;
          return (
            <button
              key={preset.id}
              type="button"
              onClick={() => selectPreset(preset.id)}
              title={label}
              aria-label={label}
              aria-pressed={selected}
              className={`relative w-10 h-10 rounded-full transition-all ring-offset-2 ring-offset-bg ${
                selected ? 'ring-2 ring-fg/50 scale-110' : 'hover:scale-105 hover:ring-2 hover:ring-fg/20'
              }`}
              style={{ backgroundColor: preset.light }}
            >
              {selected && (
                <span className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold drop-shadow">
                  ✓
                </span>
              )}
            </button>
          );
        })}

        {/* 랜덤 추천 */}
        <button
          type="button"
          onClick={selectRandom}
          title={t.random}
          aria-label={t.random}
          aria-pressed={presetId === 'random'}
          className={`relative w-10 h-10 rounded-full transition-all ring-offset-2 ring-offset-bg overflow-hidden ${
            presetId === 'random'
              ? 'ring-2 ring-fg/50 scale-110'
              : 'hover:scale-105 hover:ring-2 hover:ring-fg/20'
          }`}
          style={{ background: 'conic-gradient(from 0deg, #f87171, #fb923c, #fbbf24, #4ade80, #38bdf8, #818cf8, #e879f9, #f87171)' }}
        >
          <span className="absolute inset-0 flex items-center justify-center" aria-hidden>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow">
              <polyline points="16 3 21 3 21 8" />
              <line x1="4" y1="20" x2="21" y2="3" />
              <polyline points="21 16 21 21 16 21" />
              <line x1="15" y1="15" x2="21" y2="21" />
            </svg>
          </span>
        </button>

        {/* 커스텀 색상 */}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          title={t.custom}
          aria-label={t.custom}
          aria-pressed={presetId === 'custom'}
          className={`relative w-10 h-10 rounded-full transition-all ring-offset-2 ring-offset-bg border-2 border-dashed flex items-center justify-center ${
            presetId === 'custom'
              ? 'ring-2 ring-fg/50 scale-110 border-border'
              : 'border-border hover:scale-105 hover:ring-2 hover:ring-fg/20 hover:border-fg/30'
          }`}
        >
          {presetId === 'custom' ? (
            <span className="text-xs font-bold text-muted" aria-hidden>✓</span>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="text-muted" aria-hidden>
              <path d="M12 5v14M5 12h14" />
            </svg>
          )}
          <input
            ref={inputRef}
            type="color"
            className="sr-only"
            value={presetId === 'custom' ? light : '#ea580c'}
            onChange={(e) => selectCustom(e.target.value)}
          />
        </button>
      </div>

      {/* 현재 색상 미리보기 */}
      <div className="flex items-center gap-3 text-sm text-muted">
        <span
          className="inline-block w-4 h-4 rounded-full flex-shrink-0"
          style={{ backgroundColor: light }}
          aria-hidden
        />
        <span>{t.currentColor}: </span>
        <code className="font-mono text-xs text-fg">{light}</code>
      </div>
    </section>
  );
}
