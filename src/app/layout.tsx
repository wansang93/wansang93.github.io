import type { Metadata } from 'next';
import Script from 'next/script';
import { Inter, Fraunces, JetBrains_Mono } from 'next/font/google';
import localFont from 'next/font/local';
import { Nav } from '@/components/layout/nav';
import { Footer } from '@/components/layout/footer';
import { MissionTracker } from '@/components/mission/mission-tracker';
import { MissionToast } from '@/components/mission/mission-toast';
import { ScrollEndMission } from '@/components/mission/scroll-end-mission';
import { ScrollProgress } from '@/components/layout/scroll-progress';
import { Fireworks } from '@/components/effects/fireworks';
import '@fontsource/noto-sans-kr/400.css';
import '@fontsource/noto-sans-kr/700.css';
import '@fontsource/jua/400.css';
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
const suit = localFont({
  src: '../../public/fonts/SUIT-Variable.woff2',
  variable: '--font-suit',
  display: 'swap',
  weight: '100 900',
  preload: false,
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

const accentInitScript = `
  (function() {
    try {
      var al = localStorage.getItem('accent-light');
      var ad = localStorage.getItem('accent-dark');
      if (al && ad) {
        function h(x) { return parseInt(x,16); }
        function toRgb(s) { return h(s.slice(1,3))+' '+h(s.slice(3,5))+' '+h(s.slice(5,7)); }
        document.documentElement.style.setProperty('--accent-light', toRgb(al));
        document.documentElement.style.setProperty('--accent-dark', toRgb(ad));
      }
    } catch (e) {}
  })();
`;

const fontInitScript = `
  (function() {
    try {
      var f = localStorage.getItem('font');
      if (f && f !== 'pretendard') document.documentElement.dataset.font = f;
    } catch (e) {}
  })();
`;

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

const GA_ID = process.env.NEXT_PUBLIC_GA_ID;
const ADSENSE_CLIENT = process.env.NEXT_PUBLIC_ADSENSE_CLIENT;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${pretendard.variable} ${suit.variable} ${inter.variable} ${fraunces.variable} ${jetbrains.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: accentInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: fontInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <script dangerouslySetInnerHTML={{ __html: langInitScript }} />
        {ADSENSE_CLIENT && (
          <Script
            async
            strategy="afterInteractive"
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_CLIENT}`}
            crossOrigin="anonymous"
          />
        )}
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
        {GA_ID && (
          <>
            <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
            <Script id="ga4-init" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
