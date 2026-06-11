import AboutTabs from '@/components/about-tabs';

export const metadata = { title: '소개' };

export default function AboutPage() {
  return (
    <div className="space-y-8">
      <header className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-4">
          <p className="text-sm text-muted">About</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            김완상
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            데이터로 시장을 읽고, 코드로 투자하는 데이터 엔지니어가 꿈입니다.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/project/webpage/2021/site/assets/img/wansang.jpg"
          alt="김완상 프로필"
          className="w-20 sm:w-36 rounded-2xl object-contain shrink-0 border border-border"
        />
      </header>

      <AboutTabs lang="ko" />
    </div>
  );
}
