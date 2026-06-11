'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { detectLang, prefixed } from '@/lib/i18n';

export default function NotFound() {
  const pathname = usePathname() || '/';
  const lang = detectLang(pathname);

  const dict = {
    ko: {
      title: '페이지를 찾을 수 없습니다',
      desc: '주소가 잘못되었거나 페이지가 이동/삭제되었습니다.',
      home: '홈으로',
    },
    en: {
      title: 'Page not found',
      desc: 'The URL is wrong, or the page has moved or been removed.',
      home: 'Back home',
    },
    zh: {
      title: '页面未找到',
      desc: '网址有误,或页面已被移动 / 删除。',
      home: '返回首页',
    },
    ja: {
      title: 'ページが見つかりません',
      desc: 'URL が間違っているか、ページが移動・削除されました。',
      home: 'ホームへ',
    },
  } as const;
  const t = dict[lang];

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center space-y-6">
      <p className="font-serif text-6xl font-semibold tracking-tight text-accent">404</p>
      <h1 className="font-serif text-2xl font-semibold">{t.title}</h1>
      <p className="text-muted">{t.desc}</p>
      <Link
        href={prefixed('/', lang)}
        className="inline-flex items-center px-5 py-3 rounded-lg border border-border hover:border-accent hover:bg-border/20 transition-colors text-sm font-medium"
      >
        {t.home} →
      </Link>
    </div>
  );
}