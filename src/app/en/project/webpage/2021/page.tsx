import Link from 'next/link';

export const metadata = { title: 'My first homepage' };

export default function Webpage2021En() {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/en/project/" className="hover:text-fg">
            Project
          </Link>{' '}
          {'>'}{' '}
          <Link href="/en/project/webpage/" className="hover:text-fg">
            Webpage
          </Link>{' '}
          {'>'} 2021
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
          My first homepage
        </h1>
        <p className="mt-2 text-sm text-muted">
          First personal website · written January 2021
        </p>
      </header>

      <section>
        <h2 className="font-serif text-lg font-semibold mb-3">Stack</h2>
        <ul className="flex flex-wrap gap-2 text-xs">
          {['HTML', 'CSS', 'Bootstrap 4', 'jQuery', 'Font Awesome'].map((t) => (
            <li
              key={t}
              className="px-2.5 py-1 rounded-full border border-border text-muted"
            >
              {t}
            </li>
          ))}
        </ul>
      </section>

      <section className="pt-2">
        <a
          href="/project/webpage/2021/site/index.html"
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-accent text-white font-medium hover:opacity-90 transition-opacity"
        >
          Open previous homepage in a new tab
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </section>

      <section className="space-y-4 text-fg/90 leading-relaxed">
        <p>
          A single-page portfolio built on top of Start Bootstrap&apos;s Freelancer theme.
          It gathered undergrad projects, photos from a trip to Australia, and a short bio onto one screen.
        </p>
        <p>It is the starting point of the current site and is archived as-is for the record.</p>
      </section>

      <figure className="space-y-2">
        <a
          href="/project/webpage/2021/site/index.html"
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-lg border border-border hover:border-accent transition-colors"
        >
          <img
            src="/project/webpage/2021/preview.png"
            alt="Full-page capture of the original 2021 homepage"
            className="w-full h-auto block"
            loading="lazy"
          />
        </a>
        <figcaption className="text-xs text-muted">
          ↑ Full-page preview — header, bio, portfolio, About, Australia photos, Game, and Contact all stacked into one single-page layout. Click the image to open the original page in a new tab.
        </figcaption>
      </figure>
    </article>
  );
}
