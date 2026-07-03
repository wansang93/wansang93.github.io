import Link from 'next/link';

export const metadata = { title: 'プロジェクト — ウェブページ' };

const versions = [
  {
    year: '2021',
    title: '2021 ポートフォリオ',
    description: '初めての個人ポートフォリオサイト。Bootstrap Freelancer テーマをベースに 2021 年 1 月制作。',
    href: '/ja/project/webpage/2021/',
  },
];

export default function WebpageIndexJa() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/ja/project/" className="hover:text-fg">
            プロジェクト
          </Link>{' '}
          {'>'} ウェブページ
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">ウェブページ</h1>
        <p className="mt-3 text-muted">ウェブページプロジェクト一覧。</p>
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
                <span className="text-xs text-muted">見る →</span>
              </div>
              <p className="mt-1 text-sm text-muted">{v.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
