import { FontPicker } from '@/components/settings/font-picker';
import { AccentPicker } from '@/components/settings/accent-picker';

export const metadata = { title: '설정' };

export default function SettingsPage() {
  return (
    <div className="space-y-10">
      <header>
        <p className="text-sm text-muted">Settings</p>
        <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">설정</h1>
        <p className="mt-3 text-muted leading-relaxed">사이트 표시 방식을 취향에 맞게 조정하세요.</p>
      </header>

      <AccentPicker lang="ko" />
      <FontPicker lang="ko" />
    </div>
  );
}
