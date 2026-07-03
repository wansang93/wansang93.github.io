import Link from 'next/link';

export const metadata = { title: 'Project' };

const categories = [
  {
    slug: 'webpage',
    title: 'Webpage',
    description: 'Webpage project collection.',
  },
  {
    slug: 'dashboard',
    title: 'Data/Dashboard',
    description: 'Data analysis and dashboard projects.',
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
