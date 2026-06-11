export const metadata = { title: '博客' };

export default function BlogIndexZh() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">博客</h1>
      <p className="text-muted">
        博客系统正在开发中。下一步,在{' '}
        <code className="font-mono text-sm">content/blog/</code> 目录下添加 MDX 文件,即可自动生成索引和文章页面。
      </p>
    </div>
  );
}
