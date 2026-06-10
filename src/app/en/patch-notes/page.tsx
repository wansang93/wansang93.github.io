export const metadata = { title: 'Patch notes' };

type Entry = {
  version: string;
  date: string;
  title: string;
  details: string[];
};

const entries: Entry[] = [
  {
    version: 'v0.003',
    date: '2026.06.10',
    title: 'Missions overhaul + search + typography fix',
    details: [
      'Mission page split into "Make the most of the site" / "Hidden missions", masked hidden missions with a hint toggle, per-card reset via the orange check icon',
      'First-mission intro popup, fires again after a full reset',
      'Tiered fireworks (regular / hidden / all-complete) plus an "🎆 Launch celebration fireworks" button while everything is done',
      '"Visit 2021 archive" → "Scroll to bottom"; "Reach the mission page" runs a 7-second countdown',
      'Search modal (Ctrl/Cmd+K, keyboard navigation, KO + EN page index)',
      '2px scroll progress bar above the header, divider between desktop nav items and utilities',
      'Pretendard shipped site-wide and English headings render Fraunces again',
      'Cleaned up layout hierarchy on blog / about / project pages',
    ],
  },
  {
    version: 'v0.002',
    date: '2026.06.10',
    title: 'Mobile support + mission system',
    details: [
      'Added a mobile hamburger nav (fully responsive)',
      'Korean labels applied across menus and page titles (홈 / 블로그 / 프로젝트 / 소개, etc.)',
      'Mission system with 6 missions (reach mission page / dark mode / language / project menu / scroll end / hidden shortcut)',
      'Hidden-mission flow: masked title with a small hint, plus an "unlocked!" modal on completion',
      'Two hidden-mission triggers — F12 on desktop, 1s long-press on the header logo for mobile',
      'Mission page split into two sections: "Make the most of the site" and "Hidden missions"',
      'Footer cleaned up: GitHub / Email / Mission / Updates',
    ],
  },
  {
    version: 'v0.001',
    date: '2026.06.09',
    title: 'Full site rebuild',
    details: [
      'Rebuilt on Next.js 15 + TypeScript + Tailwind + MDX',
      'Korean / English routing (/en/* split)',
      'CSS-variable dark mode with no-flash theme init',
      'Theme / language toggle and nav dropdown',
      'Preserved the 2021 Bootstrap portfolio under /project/webpage/2021/ as a read-only archive',
      'GitHub Actions for static build + GitHub Pages deploy',
      'Custom 404 page with KO/EN auto-detect',
    ],
  },
];

export default function UpdatesPageEn() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Patch notes</h1>
        <p className="mt-3 text-muted">A running log of changes to this site.</p>
      </header>

      <ol className="space-y-10">
        {entries.map((e) => (
          <li key={e.version} className="border-l-2 border-border pl-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-sm text-accent">{e.version}</span>
              <span className="text-xs text-muted">{e.date}</span>
            </div>
            <h2 className="mt-2 font-serif text-xl font-semibold">{e.title}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted leading-relaxed">
              {e.details.map((d, i) => (
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
