import Link from 'next/link';

export const metadata = { title: '项目' };

const categories = [
  {
    slug: 'webpage',
    title: '网页',
    description: '网页项目合集。',
  },
  {
    slug: 'dashboard',
    title: '数据/仪表盘',
    description: '数据分析与仪表盘项目。',
  },
];

export default function ProjectIndexZh() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">项目</h1>
        <p className="mt-3 text-muted">按类别整理的项目存档。</p>
      </header>

      <ul className="space-y-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/zh/project/${c.slug}/`}
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
