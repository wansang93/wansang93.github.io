import Link from 'next/link';

export const metadata = { title: 'プロジェクト' };

const categories = [
  {
    slug: 'webpage',
    title: 'ウェブページ',
    description: '歴代の個人サイトのアーカイブ。',
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
