import Link from 'next/link';

export const metadata = { title: '项目' };

const categories = [
  {
    slug: 'webpage',
    title: '网页',
    description: '历代个人网站版本的存档。',
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
