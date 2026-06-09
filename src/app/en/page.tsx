import Link from 'next/link';

export default function HomePageEn() {
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
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          Project showcase coming. For now, see the{' '}
          <Link href="/en/project/webpage/2021/" className="underline hover:text-fg">
            2021 archive
          </Link>
          .
        </div>
      </section>
    </div>
  );
}
