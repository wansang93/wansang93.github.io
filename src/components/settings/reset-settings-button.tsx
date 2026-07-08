'use client';
import { saveFont } from '@/lib/font-settings';
import { resetAccent } from '@/lib/accent-settings';
import type { Lang } from '@/lib/i18n';

const dict: Record<Lang, string> = {
  ko: '기본값으로 설정',
  en: 'Reset to default',
  zh: '恢复默认设置',
  ja: 'デフォルトに戻す',
};

export function ResetSettingsButton({ lang }: { lang: Lang }) {
  function handleReset() {
    saveFont('pretendard');
    resetAccent();
  }

  return (
    <button
      type="button"
      onClick={handleReset}
      className="shrink-0 px-4 py-2 rounded-lg border border-border text-sm text-muted hover:text-fg hover:border-fg/40 transition-colors"
    >
      {dict[lang]}
    </button>
  );
}
