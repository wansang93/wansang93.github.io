import Link from 'next/link';

export const metadata = { title: '紹介' };

export default function AboutPageJa() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">紹介</h1>
      <p className="text-muted leading-relaxed">
        キム・ワンサン。ソフトウェアエンジニア。クラウド・機械学習・自動化に関心があります。
      </p>
      <p className="text-muted leading-relaxed">
        このページは更新中です。より詳しい自己紹介と経歴を準備しています。それまでは{' '}
        <Link href="/ja/project/webpage/2021/" className="underline hover:text-fg">
          2021 年版
        </Link>
        をご覧ください。
      </p>
    </div>
  );
}
