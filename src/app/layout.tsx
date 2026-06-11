import type { Metadata } from 'next';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Nav } from '@/components/nav';
import { Footer } from '@/components/footer';
import { MissionTracker } from '@/components/mission-tracker';
import { MissionToast } from '@/components/mission-toast';
import { ScrollEndMission } from '@/components/scroll-end-mission';
import { ScrollProgress } from '@/components/scroll-progress';
import { Fireworks } from '@/components/fireworks';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter', display: 'swap' });
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-fraunces', display: 'swap' });
const jetbrains = JetBrains_Mono({ subsets: ['latin'], variable: '--font-jetbrains', display: 'swap' });
const pretendard = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
  variable: '--font-pretendard',
  display: 'swap',
  weight: '45 920',
  preload: true,
});

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

const langInitScript = `
  (function() {
    try {
      var p = window.location.pathname;
      var lang = 'ko';
      if (/^\\/en(\\/|$)/.test(p)) lang = 'en';
      else if (/^\\/zh(\\/|$)/.test(p)) lang = 'zh';
      else if (/^\\/ja(\\/|$)/.test(p)) lang = 'ja';
      document.documentElement.lang = lang;
    } catch (e) {}
  })();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${inter.variable} ${fraunces.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
      </head>
      <body className="min-h-screen font-sans">
        <ScrollProgress />
        <Nav />
        <main className="mx-auto max-w-3xl px-6 pt-24 pb-16">{children}</main>
        <Footer />
        <MissionTracker />
        <MissionToast />
        <Fireworks />
        <ScrollEndMission />
      </body>
    </html>
  );
}
