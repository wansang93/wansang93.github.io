import { MissionList } from '@/components/mission/mission-list';

export const metadata = { title: '任务' };

export default function MissionPageZh() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">任务</h1>
        <p className="mt-3 text-muted">
          寻找网站中隐藏的任务。进度仅保存在你的浏览器中。
        </p>
      </header>
      <MissionList lang="zh" />
    </div>
  );
}
