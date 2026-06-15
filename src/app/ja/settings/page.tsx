import { FontPicker } from '@/components/settings/font-picker';
import { AccentPicker } from '@/components/settings/accent-picker';

export const metadata = { title: '設定' };

export default function SettingsPageJa() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Settings</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">設定</h1>
        <p className="mt-3 text-muted leading-relaxed">サイトの表示方法をお好みに合わせて調整できます。</p>
      </header>

      <AccentPicker lang="ja" />
      <FontPicker lang="ja" />
    </div>
  );
}
