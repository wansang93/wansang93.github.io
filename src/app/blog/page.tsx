export const metadata = { title: 'Blog' };

export default function BlogIndex() {
  return (
    <div>
      <h1 className="font-serif text-4xl font-semibold tracking-tight mb-4">블로그</h1>
      <p className="text-muted">
        글 시스템은 준비 중입니다. MDX 파일을 <code className="font-mono text-sm">content/blog/</code> 에 추가하면
        자동으로 목록과 페이지가 생성되도록 다음 단계에서 만들 예정입니다.
      </p>
    </div>
  );
}
