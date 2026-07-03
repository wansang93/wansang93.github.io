type Localized = { ko: string; en: string; zh: string; ja: string };

export type ProjectItem = {
  /** ISO date used for sorting, most recent first. */
  date: string;
  title: Localized;
  description: Localized;
  /** Korean (unprefixed) href — use prefixed(href, lang) when rendering. */
  href: string;
};

export const PROJECTS: ProjectItem[] = [
  {
    date: '2021-01-01',
    title: {
      ko: '2021 포트폴리오',
      en: '2021 Portfolio',
      zh: '2021 作品集',
      ja: '2021 ポートフォリオ',
    },
    description: {
      ko: '첫 번째 개인 포트폴리오 사이트. Bootstrap Freelancer 테마 기반, 2021년 1월 제작.',
      en: 'First personal portfolio site. Built with Bootstrap Freelancer theme, January 2021.',
      zh: '第一个个人作品集网站。基于 Bootstrap Freelancer 主题，2021 年 1 月制作。',
      ja: '初めての個人ポートフォリオサイト。Bootstrap Freelancer テーマをベースに 2021 年 1 月制作。',
    },
    href: '/project/webpage/2021/',
  },
];

/** Most recent projects first, up to `limit`. */
export function getRecentProjects(limit?: number): ProjectItem[] {
  const sorted = [...PROJECTS].sort((a, b) => (a.date < b.date ? 1 : -1));
  return limit ? sorted.slice(0, limit) : sorted;
}
