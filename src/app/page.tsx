import Link from 'next/link';
import { getRecentProjects } from '@/lib/projects';

export default function HomePage() {
  const projects = getRecentProjects(3);
  return (
    <div className="space-y-16">
      <section className="pt-12">
        <p className="text-sm text-muted mb-3">안녕하세요,</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          김완상입니다.
        </h1>
        <p className="mt-6 text-lg text-muted leading-relaxed max-w-xl">
          클라우드와 머신러닝, 그리고 잘 작동하는 것을 만드는 일에 관심이 많은 소프트웨어 엔지니어입니다.
          이 사이트는 새로 시작하는 버전이며,{' '}
          <Link href="/project/webpage/2021/" className="underline decoration-accent decoration-2 underline-offset-4 hover:text-fg">
            2021년 포트폴리오
          </Link>
          는 아카이브로 보존되어 있습니다.
        </p>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">최근 글</h2>
          <Link href="/blog/" className="text-sm text-muted hover:text-fg">
            전체 보기 →
          </Link>
        </div>
        <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
          아직 작성된 글이 없습니다. 곧 첫 글이 올라올 예정입니다.
        </div>
      </section>

      <section>
        <div className="flex items-baseline justify-between mb-6">
          <h2 className="font-serif text-2xl font-semibold">프로젝트</h2>
          <Link href="/project/" className="text-sm text-muted hover:text-fg">
            전체 보기 →
          </Link>
        </div>
        {projects.length > 0 ? (
          <ul className="space-y-3">
            {projects.map((p) => (
              <li key={p.href}>
                <Link
                  href={p.href}
                  className="block rounded-lg border border-border p-5 hover:border-accent hover:bg-border/20 transition-colors"
                >
                  <div className="flex items-baseline justify-between gap-4">
                    <div className="font-serif text-xl font-semibold">{p.title.ko}</div>
                    <span className="text-xs text-muted">자세히 →</span>
                  </div>
                  <p className="mt-1 text-sm text-muted">{p.description.ko}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <div className="border border-dashed border-border rounded-lg p-10 text-center text-muted text-sm">
            프로젝트 쇼케이스는 준비 중입니다.
          </div>
        )}
      </section>
    </div>
  );
}
