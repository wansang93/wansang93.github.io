import Link from 'next/link';

export const metadata = { title: 'はじめてのホームページ' };

export default function Webpage2021Ja() {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/ja/project/" className="hover:text-fg">
            プロジェクト
          </Link>{' '}
          {'>'}{' '}
          <Link href="/ja/project/webpage/" className="hover:text-fg">
            ウェブページ
          </Link>{' '}
          {'>'} 2021
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
          はじめてのホームページ
        </h1>
        <p className="mt-2 text-sm text-muted">
          初めての個人サイト · 2021 年 1 月制作
        </p>
      </header>

      <section className="space-y-4 text-fg/90 leading-relaxed">
        <p>
          Start Bootstrap の Freelancer テーマをベースに作ったシングルページのポートフォリオ。
          学部時代のプロジェクト、オーストラリア旅行の写真、簡単な自己紹介を 1 画面にまとめました。
        </p>
        <p>今のサイトの出発点で、当時の状態のまま記録としてアーカイブしています。</p>
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
            alt="2021 年の初代ホームページの全ページキャプチャ"
            className="w-full h-auto block"
            loading="lazy"
          />
        </a>
        <figcaption className="text-xs text-muted">
          ↑ 全ページプレビュー —— ヘッダー / 自己紹介 / ポートフォリオ / About / オーストラリアの写真 / Game / Contact までシングルページに重ねた構成。画像をクリックすると、元のページが新しいタブで開きます。
        </figcaption>
      </figure>

      <section>
        <h2 className="font-serif text-lg font-semibold mb-3">スタック</h2>
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
          アーカイブを新しいタブで開く
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </section>
    </article>
  );
}
