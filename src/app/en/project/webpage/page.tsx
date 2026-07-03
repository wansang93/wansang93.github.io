import Link from 'next/link';

export const metadata = { title: 'Project — Webpage' };

const versions = [
  {
    year: '2021',
    title: '2021 Portfolio',
    description: 'First personal portfolio site. Built with Bootstrap Freelancer theme, January 2021.',
    href: '/en/project/webpage/2021/',
  },
];

export default function WebpageIndexEn() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/en/project/" className="hover:text-fg">
            Project
          </Link>{' '}
          {'>'} Webpage
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Webpage</h1>
        <p className="mt-3 text-muted">Webpage project collection.</p>
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
                <span className="text-xs text-muted">View →</span>
              </div>
              <p className="mt-1 text-sm text-muted">{v.description}</p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
