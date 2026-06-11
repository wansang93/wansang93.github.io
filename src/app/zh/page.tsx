import Link from 'next/link';

export default function HomePageZh() {
  return (
    <div className="space-y-16">
      <section className="pt-12">
        <p className="text-sm text-muted mb-3">你好,我是</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          金完相
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
          一名对云、机器学习以及打造稳定可用的产品感兴趣的软件工程师。
          这个网站是一次全新的开始 ——{' '}
          <Link href="/zh/project/webpage/2021/" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-fg">
            2021 年的作品集
          </Link>{' '}
          作为存档保留。
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">最新文章</h2>
          <Link href="/zh/blog/" className="text-sm text-muted hover:text-fg">
            全部文章 →
          </Link>
        </div>
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          暂无文章,第一篇即将到来。
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">项目</h2>
          <Link href="/zh/project/" className="text-sm text-muted hover:text-fg">
            全部项目 →
          </Link>
        </div>
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          项目展示即将上线。目前可先查看{' '}
          <Link href="/zh/project/webpage/2021/" className="underline hover:text-fg">
            2021 年存档
          </Link>
          。
        </div>
      </section>
    </div>
  );
}
