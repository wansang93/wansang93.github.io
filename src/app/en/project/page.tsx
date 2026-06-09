import Link from 'next/link';

export const metadata = { title: 'Project' };

const categories = [
  {
    slug: 'webpage',
    title: 'Webpage',
    description: 'Archive of previous personal website versions.',
  },
];

export default function ProjectIndexEn() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Project</h1>
        <p className="mt-3 text-muted">A project archive organized by category.</p>
      </header>

      <ul className="space-y-3">
        {categories.map((c) => (
          <li key={c.slug}>
            <Link
              href={`/en/project/${c.slug}/`}
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
