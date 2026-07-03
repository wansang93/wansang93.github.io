import Link from 'next/link';
import { getRecentProjects } from '@/lib/projects';
import { prefixed } from '@/lib/i18n';

export default function HomePageEn() {
  const projects = getRecentProjects(3);
  return (
    <div className="space-y-16">
      <section className="pt-12">
        <p className="text-sm text-muted mb-3">Hello, I&apos;m</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          Wansang Kim
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
          A software engineer interested in the cloud, machine learning, and building things that just work.
          This site is a fresh start — the{' '}
          <Link href="/en/project/webpage/2021/" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-fg">
            2021 portfolio
          </Link>{' '}
          is preserved as an archive.
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">Recent posts</h2>
          <Link href="/en/blog/" className="text-sm text-muted hover:text-fg">
            All posts →
          </Link>
        </div>
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          No posts yet. The first one is coming soon.
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">Projects</h2>
          <Link href="/en/project/" className="text-sm text-muted hover:text-fg">
            All projects →
          </Link>
        </div>
        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.href}>
                <Link
                  href={prefixed(p.href, 'en')}
                  className="block rounded-lg border border-border p-5 hover:border-accent hover:bg-border/20 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-serif text-xl font-semibold">{p.title.en}</div>
                    <span className="text-xs text-muted">View →</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.description.en}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
            Project showcase coming soon.
          </div>
        )}
      </section>
    </div>
  );
}
