import Link from 'next/link';

export const metadata = { title: 'Project — Webpage' };

const versions = [
  {
    year: '2021',
    title: '2021 — Bootstrap Portfolio',
    description: '첫 번째 버전. Start Bootstrap Freelancer 테마 기반 단일 페이지 포트폴리오.',
    href: '/project/webpage/2021/',
  },
];

export default function WebpageIndex() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/project/" className="hover:text-fg">
            Project
          </Link>{' '}
          / Webpage
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Webpage</h1>
        <p className="mt-3 text-muted">매년 리빌드한 개인 웹페이지 버전 아카이브.</p>
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
