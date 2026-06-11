import { PATCH_NOTES } from '@/lib/patch-notes';

export const metadata = { title: 'Patch notes' };

export default function UpdatesPageEn() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Patch notes</h1>
        <p className="mt-3 text-muted">A running log of changes to this site.</p>
      </header>

      <ol className="space-y-10">
        {PATCH_NOTES.map((e) => (
          <li key={e.version} className="border-l-2 border-border pl-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-sm text-accent">{e.version}</span>
              <span className="text-xs text-muted">{e.date}</span>
            </div>
            <h2 className="mt-2 font-serif text-xl font-semibold">{e.title.en}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted leading-relaxed">
              {e.details.en.map((d, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-border">—</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
