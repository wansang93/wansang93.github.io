export const metadata = { title: '博客' };

export default function BlogIndexZh() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Blog</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">博客</h1>
        <p className="mt-3 text-muted leading-relaxed">记录简短的技术笔记与想法。</p>
      </header>

      <div className="rounded-2xl border border-dashed border-border bg-border/10 p-10 text-center">
        <p className="font-serif text-xl font-semibold">第一篇文章即将到来。</p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          基于 MDX 的写作系统即将上线。
          <br className="hidden sm:block" />
          趁此机会去收集任务如何？
        </p>
      </div>
    </div>
  );
}
