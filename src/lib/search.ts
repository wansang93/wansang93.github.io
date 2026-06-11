import { LANGS, type Lang } from './i18n';
import { MISSIONS } from './missions';
import { PATCH_NOTES } from './patch-notes';

type Localized = { ko: string; en: string; zh: string; ja: string };

export type SearchItem = {
  href: string;
  title: Localized;
  description?: Localized;
  body: Localized;
};

export type SearchResult = {
  item: SearchItem;
  snippet: string;
  score: number;
};

function joinByLang(build: (l: Lang) => string): Localized {
  return {
    ko: build('ko'),
    en: build('en'),
    zh: build('zh'),
    ja: build('ja'),
  };
}

const missionsBody: Localized = joinByLang((l) =>
  MISSIONS.map((m) => `${m.title[l]} ${m.hint[l]}`).join(' '),
);

const patchBody: Localized = joinByLang((l) =>
  PATCH_NOTES.map(
    (n) => `${n.version} ${n.title[l]} ${n.details[l].join(' ')}`,
  ).join(' '),
);

export const SEARCH_ITEMS: SearchItem[] = [
  {
    href: '/',
    title: { ko: '홈', en: 'Home', zh: '首页', ja: 'ホーム' },
    body: {
      ko: '안녕하세요, 김완상입니다. 클라우드와 머신러닝, 그리고 잘 작동하는 것을 만드는 일에 관심이 많은 소프트웨어 엔지니어입니다. 이 사이트는 새로 시작하는 버전이며, 2021년 포트폴리오는 아카이브로 보존되어 있습니다. 최근 글: 아직 작성된 글이 없습니다. 곧 첫 글이 올라올 예정입니다. 프로젝트: 프로젝트 쇼케이스는 준비 중입니다. 지금은 2021년 아카이브를 확인하실 수 있습니다.',
      en: "Hello, I'm Wansang Kim. A software engineer interested in the cloud, machine learning, and building things that just work. This site is a fresh start — the 2021 portfolio is preserved as an archive. Recent posts: No posts yet. The first one is coming soon. Projects: Project showcase coming. For now, see the 2021 archive.",
      zh: '你好,我是金完相。一名对云、机器学习以及打造稳定可用的产品感兴趣的软件工程师。这个网站是一次全新的开始 —— 2021 年的作品集作为存档保留。最新文章:暂无文章,第一篇即将到来。项目:项目展示即将上线。目前可先查看 2021 年存档。',
      ja: 'こんにちは、キム・ワンサンです。クラウド・機械学習・ちゃんと動くものづくりに関心のあるソフトウェアエンジニアです。このサイトは新しいスタートで、2021 年のポートフォリオはアーカイブとして残しています。最近の投稿: まだ投稿はありません。最初の記事はもうすぐ公開します。プロジェクト: プロジェクトショーケースは準備中です。今は 2021 年のアーカイブをご覧ください。',
    },
  },
  {
    href: '/blog/',
    title: { ko: '블로그', en: 'Blog', zh: '博客', ja: 'ブログ' },
    body: {
      ko: '블로그. 짧은 기술 노트와 생각을 기록합니다. 첫 글을 준비하고 있어요. MDX 기반의 글 시스템이 곧 추가됩니다. 그 사이에 미션을 모아 보는 건 어떨까요?',
      en: 'Blog. The blog system is in progress. In the next step, adding MDX files under content/blog/ will automatically generate the index and post pages.',
      zh: '博客。博客系统正在开发中。下一步,在 content/blog/ 目录下添加 MDX 文件,即可自动生成索引和文章页面。',
      ja: 'ブログ。ブログシステムは準備中です。次のステップで content/blog/ 配下に MDX ファイルを追加すると、一覧と各記事のページが自動で生成されます。',
    },
  },
  {
    href: '/about/',
    title: { ko: '소개', en: 'About', zh: '关于', ja: '紹介' },
    body: {
      ko: 'About 김완상. 소프트웨어 엔지니어. 클라우드와 머신러닝, 잘 작동하는 작은 도구를 만드는 데 관심이 많습니다. 이 페이지는 새로 단장하는 중입니다. 자세한 경력과 작업 기록은 차차 채워질 예정입니다. 그동안 출발점이 된 2021 포트폴리오를 참고해 주세요. 관심사: 클라우드 머신러닝 자동화 Next.js 디자인.',
      en: 'About Wansang Kim. Software engineer. Interested in the cloud, machine learning, and automation. This page is being refreshed. A fuller bio and work history is coming. In the meantime, see the 2021 version.',
      zh: '关于 金完相。软件工程师。对云、机器学习和自动化感兴趣。本页正在更新。更完整的简介和经历即将上线。在此之前,请查看 2021 年版本。',
      ja: '紹介 キム・ワンサン。ソフトウェアエンジニア。クラウド・機械学習・自動化に関心があります。このページは更新中です。より詳しい自己紹介と経歴を準備しています。それまでは 2021 年版をご覧ください。',
    },
  },
  {
    href: '/project/',
    title: { ko: '프로젝트', en: 'Project', zh: '项目', ja: 'プロジェクト' },
    description: {
      ko: '프로젝트 카테고리 인덱스',
      en: 'Project category index',
      zh: '项目分类索引',
      ja: 'プロジェクトカテゴリ一覧',
    },
    body: {
      ko: 'Project 프로젝트. 카테고리별로 정리된 프로젝트 아카이브입니다. 웹페이지: 매년 리빌드한 개인 사이트 버전 아카이브.',
      en: 'Project. A project archive organized by category. Webpage: Archive of previous personal website versions.',
      zh: '项目。按类别整理的项目存档。网页:历代个人网站版本的存档。',
      ja: 'プロジェクト。カテゴリ別に整理したプロジェクトのアーカイブ。ウェブページ:歴代の個人サイトのアーカイブ。',
    },
  },
  {
    href: '/project/webpage/',
    title: { ko: '웹페이지', en: 'Webpage', zh: '网页', ja: 'ウェブページ' },
    description: {
      ko: '매년 리빌드한 개인 웹페이지',
      en: 'Yearly rebuilds of the personal site',
      zh: '每年重建的个人网站',
      ja: '毎年作り直した個人サイト',
    },
    body: {
      ko: '프로젝트 / 웹페이지. 매년 리빌드한 개인 웹페이지 버전 아카이브. 2021년 첫번째 홈페이지 제작. 첫 번째 버전. Start Bootstrap Freelancer 테마 기반 단일 페이지 포트폴리오.',
      en: 'Project / Webpage. Yearly rebuilds of the personal site, archived by version. 2021 My first homepage. The first version. A single-page portfolio based on the Start Bootstrap Freelancer theme.',
      zh: '项目 / 网页。每年重建的个人网站,按版本存档。2021 我的第一个个人主页。第一个版本。基于 Start Bootstrap Freelancer 主题的单页作品集。',
      ja: 'プロジェクト / ウェブページ。毎年作り直した個人サイトをバージョンごとにアーカイブ。2021 はじめてのホームページ。最初のバージョン。Start Bootstrap Freelancer テーマをベースにしたシングルページのポートフォリオ。',
    },
  },
  {
    href: '/project/webpage/2021/',
    title: {
      ko: '웹페이지 2021',
      en: 'Webpage 2021',
      zh: '网页 2021',
      ja: 'ウェブページ 2021',
    },
    description: {
      ko: '2021년 Bootstrap 포트폴리오 아카이브',
      en: '2021 Bootstrap portfolio archive',
      zh: '2021 年 Bootstrap 作品集存档',
      ja: '2021年 Bootstrap ポートフォリオのアーカイブ',
    },
    body: {
      ko: '프로젝트 / 웹페이지 / 2021. 첫번째 홈페이지 제작. 첫 번째 개인 웹페이지 · 2021년 1월 작성. Start Bootstrap의 Freelancer 테마를 베이스로 만든 단일 페이지 포트폴리오입니다. 학부 시절 프로젝트와 호주 여행 사진, 자기소개를 한 화면에 모았습니다. 현재 사이트의 출발점이자 기록 보존을 위해 원본 그대로 아카이브해 두었습니다. 전체 페이지 미리보기 — 헤더 / 자기소개 / 포트폴리오 / About / 호주 사진 / GAME / Contact 까지 한 화면에 쌓아 둔 single-page 구성. Stack: HTML CSS Bootstrap 4 jQuery Font Awesome. 아카이브 새 창으로 열기.',
      en: "Project / Webpage / 2021. My first homepage. First personal website written January 2021. A single-page portfolio built on top of Start Bootstrap's Freelancer theme. It gathered undergrad projects, photos from a trip to Australia, and a short bio onto one screen. It is the starting point of the current site and is archived as-is for the record. Full-page preview — header, bio, portfolio, About, Australia photos, Game, and Contact all stacked into one single-page layout. Stack: HTML CSS Bootstrap 4 jQuery Font Awesome. Open archive in a new tab.",
      zh: '项目 / 网页 / 2021. 我的第一个个人主页。第一个个人网站 · 2021 年 1 月制作。基于 Start Bootstrap 的 Freelancer 主题构建的单页作品集。把大学时期的项目、澳大利亚旅行的照片和简短的自我介绍汇集在同一屏幕上。这是当前网站的起点,以原样存档作为记录。整页预览 —— 单页布局,依次包含页眉、自我介绍、作品集、About、澳大利亚旅行照片、Game 和 Contact。技术栈: HTML CSS Bootstrap 4 jQuery Font Awesome。在新标签页打开存档。',
      ja: 'プロジェクト / ウェブページ / 2021. はじめてのホームページ。初めての個人サイト · 2021 年 1 月制作。Start Bootstrap の Freelancer テーマをベースに作ったシングルページのポートフォリオ。学部時代のプロジェクト、オーストラリア旅行の写真、簡単な自己紹介を 1 画面にまとめました。今のサイトの出発点で、当時の状態のまま記録としてアーカイブしています。全ページプレビュー —— ヘッダー / 自己紹介 / ポートフォリオ / About / オーストラリアの写真 / Game / Contact までシングルページに重ねた構成。スタック: HTML CSS Bootstrap 4 jQuery Font Awesome。アーカイブを新しいタブで開く。',
    },
  },
  {
    href: '/mission/',
    title: { ko: '미션', en: 'Mission', zh: '任务', ja: 'ミッション' },
    description: {
      ko: '사이트에 숨겨진 미션 목록',
      en: 'Hidden missions across the site',
      zh: '网站中隐藏的任务列表',
      ja: 'サイトに隠されたミッション一覧',
    },
    body: joinByLang((l) => {
      const intro: Localized = {
        ko: '미션. 이 사이트에 숨겨진 미션을 찾아보세요. 진행 상황은 이 브라우저에만 저장됩니다. 페이지 100% 즐기기. 히든 미션.',
        en: 'Mission. Find the hidden missions across this site. Progress is stored in your browser only. Make the most of the site. Hidden missions.',
        zh: '任务。在网站中寻找隐藏的任务。进度仅保存在你的浏览器中。充分体验本站。隐藏任务。',
        ja: 'ミッション。サイト内に隠れたミッションを見つけてみてください。進捗はあなたのブラウザにのみ保存されます。サイトを100%楽しむ。隠しミッション。',
      };
      return `${intro[l]} ${missionsBody[l]}`;
    }),
  },
  {
    href: '/patch-notes/',
    title: {
      ko: '패치노트',
      en: 'Patch notes',
      zh: '补丁说明',
      ja: 'パッチノート',
    },
    description: {
      ko: '사이트 변경 이력',
      en: 'Changelog for this site',
      zh: '本站变更记录',
      ja: 'サイトの変更履歴',
    },
    body: joinByLang((l) => {
      const intro: Localized = {
        ko: '패치노트. 사이트 변경 이력을 기록합니다.',
        en: 'Patch notes. A running log of changes to this site.',
        zh: '补丁说明。本站的变更记录。',
        ja: 'パッチノート。このサイトの変更履歴です。',
      };
      return `${intro[l]} ${patchBody[l]}`;
    }),
  },
];

const SNIPPET_BEFORE = 30;
const SNIPPET_AFTER = 80;

function extractSnippet(text: string, q: string): string {
  if (!text) return '';
  const lower = text.toLowerCase();
  const idx = lower.indexOf(q);
  if (idx === -1) {
    return text.length > 110 ? text.slice(0, 110).trimEnd() + '…' : text;
  }
  const start = Math.max(0, idx - SNIPPET_BEFORE);
  const end = Math.min(text.length, idx + q.length + SNIPPET_AFTER);
  const prefix = start > 0 ? '…' : '';
  const suffix = end < text.length ? '…' : '';
  return prefix + text.slice(start, end).trim() + suffix;
}

function previewFor(item: SearchItem, lang: Lang): string {
  return item.description?.[lang] || extractSnippet(item.body[lang], '');
}

export function searchItems(query: string, lang: Lang): SearchResult[] {
  const tokens = query.trim().toLowerCase().split(/\s+/).filter(Boolean);

  if (tokens.length === 0) {
    return SEARCH_ITEMS.map((item) => ({
      item,
      snippet: previewFor(item, lang),
      score: 0,
    }));
  }

  const matchesAll = (text: string) => tokens.every((t) => text.includes(t));

  const results: SearchResult[] = [];
  for (const item of SEARCH_ITEMS) {
    const titleAll = LANGS.map((l) => item.title[l]).join(' ').toLowerCase();
    const descAll = LANGS.map((l) => item.description?.[l] || '').join(' ').toLowerCase();
    const bodyAll = LANGS.map((l) => item.body[l]).join(' ').toLowerCase();
    const href = item.href.toLowerCase();

    let score = 0;
    if (matchesAll(titleAll)) score = 4;
    else if (matchesAll(descAll)) score = 3;
    else if (matchesAll(href)) score = 2;
    else if (matchesAll(bodyAll)) score = 1;

    if (score === 0) continue;

    // Snippet: prefer body[lang], else any language that has the match, else preview
    let snippet = '';
    const tryLangs: Lang[] = [lang, ...LANGS.filter((l) => l !== lang)];
    for (const tryLang of tryLangs) {
      const body = item.body[tryLang];
      const lowerBody = body.toLowerCase();
      const hit = tokens.find((t) => lowerBody.includes(t));
      if (hit) {
        snippet = extractSnippet(body, hit);
        break;
      }
    }
    if (!snippet) snippet = previewFor(item, lang);

    results.push({ item, snippet, score });
  }

  results.sort((a, b) => b.score - a.score);
  return results;
}
