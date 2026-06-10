import type { Lang } from './i18n';

export type SearchItem = {
  href: string;
  title: { ko: string; en: string };
  description?: { ko: string; en: string };
};

export const SEARCH_ITEMS: SearchItem[] = [
  { href: '/', title: { ko: '홈', en: 'Home' } },
  { href: '/blog/', title: { ko: '블로그', en: 'Blog' } },
  { href: '/about/', title: { ko: '소개', en: 'About' } },
  {
    href: '/project/',
    title: { ko: '프로젝트', en: 'Project' },
    description: { ko: '프로젝트 카테고리 인덱스', en: 'Project category index' },
  },
  {
    href: '/project/webpage/',
    title: { ko: '웹페이지', en: 'Webpage' },
    description: { ko: '매년 리빌드한 개인 웹페이지', en: 'Yearly rebuilds of the personal site' },
  },
  {
    href: '/project/webpage/2021/',
    title: { ko: '웹페이지 2021', en: 'Webpage 2021' },
    description: { ko: '2021년 Bootstrap 포트폴리오 아카이브', en: '2021 Bootstrap portfolio archive' },
  },
  {
    href: '/mission/',
    title: { ko: '미션', en: 'Mission' },
    description: { ko: '사이트에 숨겨진 미션 목록', en: 'Hidden missions across the site' },
  },
  {
    href: '/patch-notes/',
    title: { ko: '패치노트', en: 'Patch notes' },
    description: { ko: '사이트 변경 이력', en: 'Changelog for this site' },
  },
];

export function searchItems(query: string, lang: Lang): SearchItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return SEARCH_ITEMS;
  return SEARCH_ITEMS.filter((item) => {
    const haystack = [
      item.title.ko,
      item.title.en,
      item.description?.ko ?? '',
      item.description?.en ?? '',
      item.href,
    ]
      .join(' ')
      .toLowerCase();
    return haystack.includes(q);
  });
}
