import Link from 'next/link';

export const metadata = { title: '关于' };

export default function AboutPageZh() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">关于</h1>
      <p className="text-muted leading-relaxed">
        金完相。软件工程师。对云、机器学习和自动化感兴趣。
      </p>
      <p className="text-muted leading-relaxed">
        本页正在更新。更完整的简介和经历即将上线。在此之前,请查看{' '}
        <Link href="/zh/project/webpage/2021/" className="underline hover:text-fg">
          2021 年版本
        </Link>
        。
      </p>
    </div>
  );
}
