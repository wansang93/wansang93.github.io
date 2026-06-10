import { MissionList } from '@/components/mission-list';

export const metadata = { title: 'Mission' };

export default function MissionPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">미션</h1>
        <p className="mt-3 text-muted">
          이 사이트에 숨겨진 미션을 찾아보세요. 진행 상황은 이 브라우저에만 저장됩니다.
        </p>
      </header>
      <MissionList lang="ko" />
    </div>
  );
}