import Link from 'next/link';

export const metadata = { title: '我的第一个个人主页' };

export default function Webpage2021Zh() {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/zh/project/" className="hover:text-fg">
            项目
          </Link>{' '}
          {'>'}{' '}
          <Link href="/zh/project/webpage/" className="hover:text-fg">
            网页
          </Link>{' '}
          {'>'} 2021
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
          我的第一个个人主页
        </h1>
        <p className="mt-2 text-sm text-muted">
          第一个个人网站 · 2021 年 1 月制作
        </p>
      </header>

      <section className="space-y-4 text-fg/90 leading-relaxed">
        <p>
          基于 Start Bootstrap 的 Freelancer 主题构建的单页作品集。
          把大学时期的项目、澳大利亚旅行的照片和简短的自我介绍汇集在同一屏幕上。
        </p>
        <p>这是当前网站的起点,以原样存档作为记录。</p>
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
            alt="2021 年首版个人主页整页截图"
            className="w-full h-auto block"
            loading="lazy"
          />
        </a>
        <figcaption className="text-xs text-muted">
          ↑ 整页预览 —— 单页布局,依次包含页眉、自我介绍、作品集、About、澳大利亚旅行照片、Game 和 Contact。点击图片可在新标签页中打开原始页面。
        </figcaption>
      </figure>

      <section>
        <h2 className="font-serif text-lg font-semibold mb-3">技术栈</h2>
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
          在新标签页打开存档
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </section>
    </article>
  );
}
