import Link from 'next/link';

export const metadata = { title: '소개' };

const interests = ['클라우드', '머신러닝', '자동화', 'Next.js', '디자인'];

export default function AboutPage() {
  return (
    <div className="space-y-12">
      <header className="space-y-4">
        <p className="text-sm text-muted">About</p>
        <h1 className="font-serif text-5xl sm:text-6xl font-semibold tracking-tight leading-[1.05]">
          김완상
        </h1>
        <p className="text-lg text-muted leading-relaxed max-w-xl">
          소프트웨어 엔지니어. 클라우드와 머신러닝, 잘 작동하는 작은 도구를 만드는 데 관심이 많습니다.
        </p>
      </header>

      <section className="space-y-4 text-fg/90 leading-relaxed">
        <p>
          이 페이지는 새로 단장하는 중입니다. 자세한 경력과 작업 기록은 차차 채워질 예정입니다.
          그동안 출발점이 된{' '}
          <Link
            href="/project/webpage/2021/"
            className="underline decoration-accent decoration-2 underline-offset-4 hover:text-fg"
          >
            2021 포트폴리오
          </Link>
          를 참고해 주세요.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg font-semibold mb-3">관심사</h2>
        <ul className="flex flex-wrap gap-2 text-xs">
          {interests.map((tag) => (
            <li key={tag} className="px-2.5 py-1 rounded-full border border-border text-muted">
              {tag}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
