export const metadata = { title: 'ブログ' };

export default function BlogIndexJa() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Blog</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">ブログ</h1>
        <p className="mt-3 text-muted leading-relaxed">短い技術メモと考えを記録します。</p>
      </header>

      <div className="rounded-2xl border border-dashed border-border bg-border/10 p-10 text-center">
        <p className="font-serif text-xl font-semibold">最初の記事を準備中です。</p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          MDX ベースの記事システムがまもなく追加されます。
          <br className="hidden sm:block" />
          その間に、ミッションを集めてみませんか？
        </p>
      </div>
    </div>
  );
}
