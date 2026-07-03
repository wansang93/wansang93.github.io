import Link from 'next/link';

export const metadata = { title: '项目 — 网页' };

const versions = [
  {
    year: '2021',
    title: '2021 作品集',
    description: '第一个个人作品集网站。基于 Bootstrap Freelancer 主题，2021 年 1 月制作。',
    href: '/zh/project/webpage/2021/',
  },
];

export default function WebpageIndexZh() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/zh/project/" className="hover:text-fg">
            项目
          </Link>{' '}
          {'>'} 网页
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">网页</h1>
        <p className="mt-3 text-muted">网页项目合集。</p>
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
                <span className="text-xs text-muted">查看 →</span>
              </div>
              <p className="mt-1 text-sm text-muted">{v.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
