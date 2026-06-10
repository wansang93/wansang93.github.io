export const metadata = { title: '블로그' };

export default function BlogIndex() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Blog</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">블로그</h1>
        <p className="mt-3 text-muted leading-relaxed">짧은 기술 노트와 생각을 기록합니다.</p>
      </header>

      <div className="rounded-2xl border border-dashed border-border bg-border/10 p-10 text-center">
        <p className="font-serif text-xl font-semibold">첫 글을 준비하고 있어요.</p>
        <p className="mt-2 text-sm text-muted leading-relaxed">
          MDX 기반의 글 시스템이 곧 추가됩니다.
          <br className="hidden sm:block" />
          그 사이에 미션을 모아 보는 건 어떨까요?
        </p>
      </div>
    </div>
  );
}
