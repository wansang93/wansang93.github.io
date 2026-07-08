import { FontPicker } from '@/components/settings/font-picker';
import { AccentPicker } from '@/components/settings/accent-picker';
import { ResetSettingsButton } from '@/components/settings/reset-settings-button';

export const metadata = { title: '设置' };

export default function SettingsPageZh() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Settings</p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">设置</h1>
          <p className="mt-3 text-muted leading-relaxed">根据您的喜好调整网站的显示方式。</p>
        </div>
        <ResetSettingsButton lang="zh" />
      </header>

      <AccentPicker lang="zh" />
      <FontPicker lang="zh" />
    </div>
  );
}
