import Link from 'next/link';

export const metadata = { title: 'Project — Data/Dashboard' };

export default function DashboardIndex() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">
          <Link href="/project/" className="hover:text-fg">
            프로젝트
          </Link>{' '}
          {'>'} 데이터/대시보드
        </p>
        <h1 className="mt-2 font-serif text-4xl font-semibold tracking-tight">데이터/대시보드</h1>
        <p className="mt-3 text-muted">데이터 분석 및 대시보드 프로젝트</p>
      </header>

      <p className="text-sm text-muted">준비 중입니다.</p>
    </div>
  );
}
