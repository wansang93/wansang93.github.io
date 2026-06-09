import Link from 'next/link';

export const metadata = { title: 'About' };

export default function AboutPageEn() {
  return (
    <div className="space-y-6">
      <h1 className="font-serif text-4xl font-semibold tracking-tight">About</h1>
      <p className="text-muted leading-relaxed">
        Wansang Kim. Software engineer. Interested in the cloud, machine learning, and automation.
      </p>
      <p className="text-muted leading-relaxed">
        This page is being refreshed. A fuller bio and work history is coming. In the meantime, see the{' '}
        <Link href="/en/project/webpage/2021/" className="underline hover:text-fg">
          2021 version
        </Link>
        .
      </p>
    </div>
  );
}
