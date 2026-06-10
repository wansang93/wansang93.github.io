import Link from 'next/link';

export const metadata = { title: 'Project' };

const categories = [
  {
    slug: 'webpage',
    title: '웹페이지',
    description: '매년 리빌드한 개인 사이트 버전 아카이브',
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
              className="block rounded-lg border border-border p-5 hover:border-accent hover:bg-border/20 transition-colors"
            >
              <div className="font-serif text-xl font-semibold">{c.title}</div>
              <p className="mt-1 text-sm text-muted">{c.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
