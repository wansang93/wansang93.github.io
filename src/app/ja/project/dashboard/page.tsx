import Link from 'next/link';

export const metadata = { title: 'プロジェクト — データ/ダッシュボード' };

export default function DashboardIndexJa() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/ja/project/" className="hover:text-fg">
            プロジェクト
          </Link>{' '}
          {'>'} データ/ダッシュボード
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">データ/ダッシュボード</h1>
        <p className="mt-3 text-muted">データ分析・ダッシュボードプロジェクト。</p>
      </header>

      <p className="text-sm text-muted">準備中です。</p>
    </div>
  );
}
