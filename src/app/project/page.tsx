import Link from 'next/link';

export const metadata = { title: 'Project' };

const categories = [
  {
    slug: 'webpage',
    title: '웹페이지',
    description: '웹페이지 프로젝트 모음',
  },
  {
    slug: 'dashboard',
    title: '데이터/대시보드',
    description: '데이터 분석 및 대시보드 프로젝트',
  },
];

export default function ProjectIndex() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Project</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">프로젝트</h1>
        <p className="mt-3 text-muted leading-relaxed">카테고리별로 정리된 프로젝트 아카이브입니다.</p>
      </header>

      <ul className="space-y-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/project/${c.slug}/`}
              className="flex items-baseline gap-3 rounded-lg border border-border px-5 py-4 hover:border-accent hover:bg-border/20 transition-colors"
            >
              <span className="font-serif text-xl font-semibold shrink-0">{c.title}</span>
              <span className="text-sm text-muted truncate">{c.description}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
