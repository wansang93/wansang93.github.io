import Link from 'next/link';
import { getRecentProjects } from '@/lib/projects';
import { prefixed } from '@/lib/i18n';

export default function HomePageJa() {
  const projects = getRecentProjects(3);
  return (
    <div className="space-y-16">
      <section className="pt-12">
        <p className="text-sm text-muted mb-3">こんにちは、</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          キム・ワンサン
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
          クラウド・機械学習・ちゃんと動くものづくりに関心のあるソフトウェアエンジニアです。
          このサイトは新しいスタートで、{' '}
          <Link href="/ja/project/webpage/2021/" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-fg">
            2021 年のポートフォリオ
          </Link>{' '}
          はアーカイブとして残しています。
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">最近の投稿</h2>
          <Link href="/ja/blog/" className="text-sm text-muted hover:text-fg">
            すべての投稿 →
          </Link>
        </div>
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          まだ投稿はありません。最初の記事はもうすぐ公開します。
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">プロジェクト</h2>
          <Link href="/ja/project/" className="text-sm text-muted hover:text-fg">
            すべてのプロジェクト →
          </Link>
        </div>
        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.href}>
                <Link
                  href={prefixed(p.href, 'ja')}
                  className="block rounded-lg border border-border p-5 hover:border-accent hover:bg-border/20 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-serif text-xl font-semibold">{p.title.ja}</div>
                    <span className="text-xs text-muted">詳細 →</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.description.ja}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
            プロジェクトのショーケースは準備中です。
          </div>
        )}
      </section>
    </div>
  );
}
