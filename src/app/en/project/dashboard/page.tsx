import Link from 'next/link';

export const metadata = { title: 'Project — Data/Dashboard' };

export default function DashboardIndexEn() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/en/project/" className="hover:text-fg">
            Project
          </Link>{' '}
          {'>'} Data/Dashboard
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">Data/Dashboard</h1>
        <p className="mt-3 text-muted">Data analysis and dashboard projects.</p>
      </header>

      <p className="text-sm text-muted">Coming soon.</p>
    </div>
  );
}
