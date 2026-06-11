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
    description: {
      ko: '김완상 이력서 · 경력·학력·자격증',
      en: 'Wansang Kim resume · career, education, certifications',
      zh: '金完相简历 · 经历、学历、证书',
      ja: 'キム・ワンサン 職務経歴 · 経歴・学歴・資格',
    },
    body: {
      ko: '소개 이력서 About 김완상 클라우드 기술팀 매니저 데이터 엔지니어. 경력: NDS 농심데이타시스템 클라우드기술팀 매니저 2022 현재. 사내 빌링 개발 테크블로그 JIRA 영업관리 대시보드 AWS Cloud Data Pipeline BI. Maven Cloud Service PowerPlatform 자동화 2021. 학력: 홍익대학교 컴퓨터정보통신공학과 학사 졸업 2012 2019. 안곡고등학교 인문계 2009 2012. 교육: 삼성 청년 소프트웨어 아카데미 SSAFY Java Algorithm Spring Vue 1000시간 2022. 빅데이터 활용 딥러닝 AI 설계 Python Azure R TensorFlow Keras Computer Vision 1184시간 2019. 프로젝트형 클라우드 MSA 서비스 개발 HTML CSS JS Django React AWS Docker Kubernetes 880시간 2020 2021. 병역: 대한민국 육군 25사단 수색대대 병장 만기전역 2014 2016. 해외 경험: 호주 워킹홀리데이 워킹홀리데이 Working Holiday NSW Goulburn Sydney NT Uluru VIC Melbourne TAS Hobart 2017 2018. 호주 여행 SA Adelaide Kangaroo Island 2019. 자격증: AWS DevOps Engineer Professional DOP 2025. Google Cloud SecOps GC-SecOps 2025. Google Workspace Deployment Services GWDS 2025. SnowPro Advanced Administrator Snowflake ADA 2025. SnowPro Core Certification Snowflake Core 2024. AWS Solutions Architect Professional SAP 2023. 정보처리기사 Engineer Information Processing 2022. SQL 개발자 SQLD SQL Developer 2021. 어학: TOEIC Speaking Level 5 120점 2020. 인턴: 에듀니티랩 이노베이션 아카데미 Seoul42 Java 2023. 세종특별자치시청 보안관제센터 보안 관제 인턴 2018. 기술 스택: AWS GCP Google Cloud Snowflake Data Pipeline BI SQL Python JavaScript React Next.js Java Linux Docker Kubernetes Git.',
      en: 'About Resume Wansang Kim Cloud Tech Manager Data Engineer. Work Experience: NDS Nongshim Data Systems Cloud Technology Team Manager 2022 present. Billing system tech blog JIRA sales dashboard AWS Cloud Data Pipeline BI. Maven Cloud Service PowerPlatform automation 2021. Education: Hongik University Computer Information Communication Engineering bachelor degree 2012 2019. Angok High School Liberal Arts 2009 2012. Training: Samsung SW Academy For Youth SSAFY Java Algorithm Spring Vue 1000hrs 2022. Big Data Deep Learning AI Design Python Azure R TensorFlow Keras Computer Vision 1184hrs 2019. Cloud MSA Service Development HTML CSS JS Django React AWS Docker Kubernetes 880hrs 2020 2021. Military Service: Republic of Korea Army 25th Division Reconnaissance Battalion Sergeant honorable discharge 2014 2016. International Experience: Australia Working Holiday WHV NSW Goulburn Sydney NT Uluru VIC Melbourne TAS Hobart 2017 2018. Australia Travel SA Adelaide Kangaroo Island 2019. Certifications: AWS DevOps Engineer Professional DOP 2025. Google Cloud SecOps GC-SecOps 2025. Google Workspace Deployment Services GWDS 2025. SnowPro Advanced Administrator Snowflake ADA 2025. SnowPro Core Certification 2024. AWS Solutions Architect Professional SAP 2023. Engineer Information Processing 2022. SQL Developer SQLD 2021. Language: TOEIC Speaking Level 5 120pts 2020. Internships: Edunity Lab Innovation Academy Seoul42 Java 2023. Sejong City Security Operations Center intern 2018. Tech Stack: AWS GCP Google Cloud Snowflake Data Pipeline BI SQL Python JavaScript React Next.js Java Linux Docker Kubernetes Git.',
      zh: '关于 金完相 云技术团队经理 数据工程师。工作经历: NDS 农心数据系统 云技术团队经理 2022至今。Maven Cloud Service PowerPlatform自动化 2021。学历: 弘益大学计算机信息通信工程 学士 2012-2019。安谷高中 2009-2012。培训: SSAFY Java算法 Spring Vue 2022。大数据深度学习AI设计 Python TensorFlow 2019。云MSA Docker Kubernetes React 2020-2021。兵役: 大韩民国陆军 第25师侦察营 下士退伍 2014-2016。海外经历: 澳大利亚打工度假 WHV NSW悉尼 墨尔本 霍巴特 2017-2018。澳大利亚旅行 阿德莱德 袋鼠岛 2019。资格证书: AWS DevOps工程师专家 AWS解决方案架构师专家 Snowflake ADA GC-SecOps GWDS 信息处理工程师 SQLD。语言: TOEIC口语5级。技术栈: AWS GCP Google Cloud Snowflake Python JavaScript React Next.js Java Docker Kubernetes。',
      ja: '紹介 キム・ワンサン クラウド技術チームマネージャー データエンジニア。職務経歴: NDS 農心データシステム クラウド技術チームマネージャー 2022年～現在。Maven Cloud Service PowerPlatformオートメーション 2021年。学歴: 弘益大学コンピュータ情報通信工学 学士 2012-2019。安谷高校 2009-2012。研修: SSAFY Java アルゴリズム Spring Vue 2022年。ビッグデータ深層学習AI設計 Python TensorFlow 2019年。クラウドMSA Docker Kubernetes React 2020-2021年。兵役: 大韓民国陸軍 第25師団偵察大隊 軍曹 2014-2016年。海外経験: オーストラリアワーキングホリデー WHV NSW シドニー メルボルン ホバート 2017-2018年。オーストラリア旅行 アデレード カンガルー島 2019年。資格: AWS DevOpsエンジニアプロ AWS SAPプロ Snowflake ADA GC-SecOps GWDS 情報処理技術者 SQLD。語学: TOEIC Speaking レベル5。技術スタック: AWS GCP Google Cloud Snowflake Python JavaScript React Next.js Java Docker Kubernetes。',
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
