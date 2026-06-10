import Link from 'next/link';

export const metadata = { title: 'Webpage 2021' };

export default function Webpage2021() {
  return (
    <article className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/project/" className="hover:text-fg">
            프로젝트
          </Link>{' '}
          /{' '}
          <Link href="/project/webpage/" className="hover:text-fg">
            웹페이지
          </Link>{' '}
          / 2021
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">
          웹페이지 2021
        </h1>
        <p className="mt-2 text-sm text-muted">
          첫 번째 개인 웹페이지 · 2021년 1월 작성
        </p>
      </header>

      <section className="space-y-4 text-fg/90 leading-relaxed">
        <p>
          Start Bootstrap의 Freelancer 테마를 베이스로 만든 단일 페이지 포트폴리오입니다.
          학부 시절 프로젝트와 호주 여행 사진, 자기소개를 한 화면에 모았습니다.
        </p>
        <p>
          현재 사이트의 출발점이자 기록 보존을 위해 원본 그대로 아카이브해 두었습니다.
          이후 버전은 같은 경로 규칙(<code className="font-mono text-sm bg-border/40 px-1.5 py-0.5 rounded">/project/webpage/&lt;연도&gt;/</code>)으로 계속 추가됩니다.
        </p>
      </section>

      <section>
        <h2 className="font-serif text-lg font-semibold mb-3">Stack</h2>
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
          아카이브 새 창으로 열기
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M7 17L17 7" />
            <path d="M7 7h10v10" />
          </svg>
        </a>
      </section>
    </article>
  );
}
