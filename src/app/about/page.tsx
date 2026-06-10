import Link from 'next/link';

export const metadata = { title: 'About' };

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">소개</h1>
      <p className="text-muted leading-relaxed">
        김완상. 소프트웨어 엔지니어. 클라우드·머신러닝·자동화에 관심이 많습니다.
      </p>
      <p className="text-muted leading-relaxed">
        이 페이지는 새 단장 중입니다. 자세한 경력과 소개는 곧 업데이트됩니다. 그동안{' '}
        <Link href="/project/webpage/2021/" className="underline hover:text-fg">
          2021 버전
        </Link>
        을 참고해 주세요.
      </p>
    </div>
  );
}
