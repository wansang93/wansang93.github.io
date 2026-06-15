import { MissionList } from '@/components/mission/mission-list';

export const metadata = { title: 'ミッション' };

export default function MissionPageJa() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">ミッション</h1>
        <p className="mt-3 text-muted">
          サイト内に隠れたミッションを見つけてみてください。進捗はあなたのブラウザにのみ保存されます。
        </p>
      </header>
      <MissionList lang="ja" />
    </div>
  );
}
