import Link from 'next/link';

export const metadata = { title: '项目 — 数据/仪表盘' };

export default function DashboardIndexZh() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/zh/project/" className="hover:text-fg">
            项目
          </Link>{' '}
          {'>'} 数据/仪表盘
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">数据/仪表盘</h1>
        <p className="mt-3 text-muted">数据分析与仪表盘项目。</p>
      </header>

      <p className="text-sm text-muted">准备中。</p>
    </div>
  );
}
