import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { MissionTracker } from '@/components/mission-tracker';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });

export const metadata: Metadata = {
  title: {
    default: 'Wansang Kim',
    template: '%s — Wansang Kim',
  },
  description: 'Personal site, blog, and project archive of Wansang Kim.',
  metadataBase: new URL('https://wansang93.github.io'),
  openGraph: {
    title: 'Wansang Kim',
    description: 'Personal site, blog, and project archive of Wansang Kim.',
    type: 'website',
  },
};

const themeInitScript = `
  (function() {
    try {
      var s = localStorage.getItem('theme');
      var m = window.matchMedia('(prefers-color-scheme: dark)').matches;
      if (s === 'dark' || (!s && m)) document.documentElement.classList.add('dark');
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${inter.variable} ${fraunces.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <Nav />
        <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">{children}</main>
        <Footer />
        <MissionTracker />
      </body>
    </html>
  );
}
