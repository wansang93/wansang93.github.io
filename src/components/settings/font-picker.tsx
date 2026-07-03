'use client';
import { FONT_OPTIONS, FONT_STACK, useFont } from '@/lib/font-settings';
import type { Lang } from '@/lib/i18n';

const dict = {
  ko: {
    title: '글꼴',
    desc: '전체 페이지에 적용되는 기본 글꼴을 선택합니다. 선택한 설정은 이 기기에 저장됩니다.',
    default: '기본',
    preview: '안녕하세요. 김완상의 개인 사이트에 오신 것을 환영합니다. 천천히 둘러보세요.',
  },
  en: {
    title: 'Font',
    desc: 'Choose the default font applied across the entire site. Your preference is saved on this device.',
    default: 'Default',
    preview: "Hello. Welcome to Wansang Kim's personal site. Take your time and look around.",
  },
  zh: {
    title: '字体',
    desc: '选择应用于整个页面的默认字体。您的偏好设置将保存在本设备上。',
    default: '默认',
    preview: '你好。欢迎来到金完相的个人网站。慢慢浏览吧。',
  },
  ja: {
    title: 'フォント',
    desc: 'サイト全体に適用されるデフォルトフォントを選択します。設定はこのデバイスに保存されます。',
    default: 'デフォルト',
    preview: 'こんにちは。キム・ワンサンの個人サイトへようこそ。ゆっくりご覧ください。',
  },
} as const;

const SAMPLE: Record<string, string> = {
  pretendard: 'Aa 가나다',
  'noto-sans-kr': 'Aa 가나다',
  suit: 'Aa 가나다',
  jua: 'Aa 가나다',
};

export function FontPicker({ lang }: { lang: Lang }) {
  const t = dict[lang];
  const { font, setFont } = useFont();

  return (
    <section className="space-y-5">
      <div>
        <h2 className="font-semibold">{t.title}</h2>
        <p className="mt-1 text-sm text-muted leading-relaxed">{t.desc}</p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {FONT_OPTIONS.map((opt) => {
          const selected = font === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setFont(opt.id)}
              className={`text-left p-4 rounded-xl border transition-all ${
                selected
                  ? 'border-accent bg-accent/5 ring-1 ring-accent/30'
                  : 'border-border hover:border-fg/40'
              }`}
            >
              <span className="block text-[10px] uppercase tracking-widest text-muted">
                {opt.name}{opt.id === 'pretendard' ? ` · ${t.default}` : ''}
              </span>
              <span
                className="mt-2 block text-xl leading-snug"
                style={{ fontFamily: FONT_STACK[opt.id] }}
                aria-hidden
              >
                {SAMPLE[opt.id]}
              </span>
              {selected && (
                <span className="mt-2 block text-[10px] text-accent font-medium">✓</span>
              )}
            </button>
          );
        })}
      </div>

      <div
        className="rounded-xl border border-border p-5 text-sm leading-relaxed text-muted transition-[font-family]"
        style={{ fontFamily: FONT_STACK[font] }}
      >
        {t.preview}
      </div>
    </section>
  );
}
