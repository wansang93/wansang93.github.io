import AboutTabs from '@/components/about/about-tabs';

export const metadata = { title: 'About' };

export default function AboutPageEn() {
  return (
    <div className="space-y-8">
      <header className="flex flex-row items-start justify-between gap-4">
        <div className="space-y-4">
          <p className="text-sm text-muted">About</p>
          <h1 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight leading-[1.05]">
            Wansang Kim
          </h1>
          <p className="text-lg text-muted leading-relaxed max-w-xl">
            Dreaming of reading markets with data and investing through code.
          </p>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/project/webpage/2021/site/assets/img/wansang.jpg"
          alt="Wansang Kim"
          className="w-20 sm:w-36 rounded-2xl object-contain shrink-0 border border-border"
        />
      </header>

      <AboutTabs lang="en" />
    </div>
  );
}
