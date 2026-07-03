import Link from 'next/link';

export const metadata = { title: 'プロジェクト' };

const categories = [
  {
    slug: 'webpage',
    title: 'ウェブページ',
    description: 'ウェブページプロジェクト一覧。',
  },
  {
    slug: 'dashboard',
    title: 'データ/ダッシュボード',
    description: 'データ分析・ダッシュボードプロジェクト。',
  },
];

export default function ProjectIndexJa() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">プロジェクト</h1>
        <p className="mt-3 text-muted">カテゴリ別に整理したプロジェクトのアーカイブ。</p>
      </header>

      <ul className="space-y-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/ja/project/${c.slug}/`}
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
