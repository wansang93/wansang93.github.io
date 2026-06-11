import Link from 'next/link';

export const metadata = { title: '첫번째 홈페이지 제작' };

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
          첫번째 홈페이지 제작
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
        <p>현재 사이트의 출발점이자 기록 보존을 위해 원본 그대로 아카이브해 두었습니다.</p>
      </section>

      <figure className="space-y-2">
        <a
          href="/project/webpage/2021/site/index.html"
          target="_blank"
          rel="noreferrer"
          className="block overflow-hidden rounded-lg border border-border hover:border-accent transition-colors"
        >
          <img
            src="/project/webpage/2021/preview.png"
            alt="2021년 첫 홈페이지 전체 페이지 캡쳐"
            className="w-full h-auto block"
            loading="lazy"
          />
        </a>
        <figcaption className="text-xs text-muted">
          ↑ 전체 페이지 미리보기 — 헤더 / 자기소개 / 포트폴리오 / About / 호주 사진 / GAME / Contact 까지 한 화면에 쌓아 둔 single-page 구성. 이미지를 누르면 원본 페이지가 새 창으로 열립니다.
        </figcaption>
      </figure>

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
