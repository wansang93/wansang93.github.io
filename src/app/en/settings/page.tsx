import { FontPicker } from '@/components/settings/font-picker';
import { AccentPicker } from '@/components/settings/accent-picker';
import { ResetSettingsButton } from '@/components/settings/reset-settings-button';

export const metadata = { title: 'Settings' };

export default function SettingsPageEn() {
  return (
    <div className="space-y-10">
      <header className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
        <div>
          <p className="text-sm text-muted">Settings</p>
          <h1 className="mt-2 font-serif text-4xl sm:text-5xl font-semibold tracking-tight">Settings</h1>
          <p className="mt-3 text-muted leading-relaxed">Adjust how the site looks to suit your preference.</p>
        </div>
        <ResetSettingsButton lang="en" />
      </header>

      <AccentPicker lang="en" />
      <FontPicker lang="en" />
    </div>
  );
}
