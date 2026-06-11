export const metadata = { title: 'ブログ' };

export default function BlogIndexJa() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">ブログ</h1>
      <p className="text-muted">
        ブログシステムは準備中です。次のステップで{' '}
        <code className="font-mono text-sm">content/blog/</code> 配下に MDX ファイルを追加すると、一覧と各記事のページが自動で生成されます。
      </p>
    </div>
  );
}
