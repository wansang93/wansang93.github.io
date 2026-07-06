import { STUDY_CATEGORIES } from '@/lib/study-archive';
import type { Lang } from '@/lib/i18n';

const dict: Record<Lang, { eyebrow: string; title: string; intro: string }> = {
  ko: {
    eyebrow: 'Blog',
    title: '블로그',
    intro: '그동안 GitHub에 꾸준히 기록해 온 학습 내용을 주제별로 정리했습니다. 각 링크는 실제 저장소로 연결됩니다.',
  },
  en: {
    eyebrow: 'Blog',
    title: 'Blog',
    intro: "A topic-based index of what I've been studying and recording on GitHub over time. Each link opens the actual repository.",
  },
  zh: {
    eyebrow: 'Blog',
    title: '博客',
    intro: '按主题整理了长期以来在 GitHub 上持续记录的学习内容，每个链接都会跳转到实际仓库。',
  },
  ja: {
    eyebrow: 'Blog',
    title: 'ブログ',
    intro: 'これまで GitHub にコツコツ記録してきた学習内容をテーマ別に整理しました。各リンクは実際のリポジトリに繋がります。',
  },
};

export function StudyArchive({ lang }: { lang: Lang }) {
  const t = dict[lang];

  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">{t.eyebrow}</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">{t.title}</h1>
        <p className="mt-3 text-muted leading-relaxed">{t.intro}</p>
      </header>

      <div className="divide-y divide-border">
        {STUDY_CATEGORIES.map((category) => (
          <section key={category.id} className="py-8 first:pt-0 space-y-4">
            <div>
              <h2 className="font-serif text-xl font-semibold">{category.title[lang]}</h2>
              <p className="mt-1 text-sm text-muted leading-relaxed">{category.description[lang]}</p>
            </div>
            <ul className="divide-y divide-border/60 -my-1">
              {category.repos.map((repo) => (
                <li key={repo.href}>
                  <a
                    href={repo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-start gap-3 py-3 -mx-2 px-2 rounded-md hover:bg-border/20 transition-colors"
                  >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" className="mt-1 shrink-0 text-muted" aria-hidden>
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
                    </svg>
                    <div className="min-w-0 flex-1">
                      <p className="flex items-center gap-1.5 font-medium text-fg group-hover:text-accent transition-colors">
                        {repo.name}
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 text-muted group-hover:text-accent transition-colors" aria-hidden>
                          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                          <path d="M15 3h6v6" />
                          <path d="M10 14 21 3" />
                        </svg>
                      </p>
                      <p className="text-sm text-muted leading-relaxed">{repo.description[lang]}</p>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </div>
  );
}
