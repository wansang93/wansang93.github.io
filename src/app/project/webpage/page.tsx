import Link from 'next/link';

export const metadata = { title: 'Project — Webpage' };

const versions = [
  {
    year: '2021',
    title: '2021 포트폴리오',
    description: '첫 번째 개인 포트폴리오 사이트. Bootstrap Freelancer 테마 기반, 2021년 1월 제작.',
    href: '/project/webpage/2021/',
  },
];

export default function WebpageIndex() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/project/" className="hover:text-fg">
            프로젝트
          </Link>{' '}
          {'>'} 웹페이지
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">웹페이지</h1>
        <p className="mt-3 text-muted">웹페이지 프로젝트 모음</p>
      </header>

      <ul className="space-y-3">
        {versions.map((v) => (
          <li key={v.year}>
            <Link
              href={v.href}
              className="block rounded-lg border border-border p-5 hover:border-accent hover:bg-border/20 transition-colors"
            >
              <div className="flex items-baseline justify-between gap-4">
                <div className="font-serif text-xl font-semibold">{v.title}</div>
                <span className="text-xs text-muted">자세히 →</span>
              </div>
              <p className="mt-1 text-sm text-muted">{v.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
