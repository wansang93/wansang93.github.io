import { MissionList } from '@/components/mission-list';

export const metadata = { title: 'Mission' };

export default function MissionPageEn() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">Mission</h1>
        <p className="mt-3 text-muted">
          Find the hidden missions across this site. Progress is stored in your browser only.
        </p>
      </header>
      <MissionList lang="en" />
    </div>
  );
}