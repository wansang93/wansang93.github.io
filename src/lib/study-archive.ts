type Localized = { ko: string; en: string; zh: string; ja: string };

export type StudyRepo = {
  name: string;
  href: string;
  description: Localized;
};

export type StudyCategory = {
  id: string;
  title: Localized;
  description: Localized;
  repos: StudyRepo[];
};

export const STUDY_CATEGORIES: StudyCategory[] = [
  {
    id: 'algorithm',
    title: { ko: '알고리즘 · 문제 풀이', en: 'Algorithm & Problem Solving', zh: '算法与刷题', ja: 'アルゴリズム・問題演習' },
    description: {
      ko: '백준·프로그래머스·SW Expert Academy 등에서 꾸준히 풀어온 문제 풀이 기록입니다.',
      en: "Ongoing problem-solving log across BAEKJOON, Programmers, SW Expert Academy, and more.",
      zh: '在 BAEKJOON、Programmers、SW Expert Academy 等平台持续刷题的记录。',
      ja: 'BAEKJOON・プログラマーズ・SW Expert Academy などで継続的に解いてきた問題演習の記録です。',
    },
    repos: [
      {
        name: 'Algorithm',
        href: 'https://github.com/wansang93/Algorithm',
        description: {
          ko: '백준, 프로그래머스, SWEA, LeetCode 풀이 + 코딩테스트 대비 팀노트',
          en: 'BAEKJOON, Programmers, SWEA, LeetCode solutions + a coding-test cheat sheet',
          zh: 'BAEKJOON、Programmers、SWEA、LeetCode 题解 + 面试刷题速查表',
          ja: 'BAEKJOON・プログラマーズ・SWEA・LeetCode の解答 + コーディングテスト対策ノート',
        },
      },
    ],
  },
  {
    id: 'frontend',
    title: { ko: '프론트엔드 · 웹', en: 'Frontend & Web', zh: '前端与 Web', ja: 'フロントエンド・Web' },
    description: {
      ko: 'HTML/CSS/JavaScript부터 Vue까지, 책과 강의를 따라가며 정리한 프론트엔드 학습 기록입니다.',
      en: 'Frontend study notes from HTML/CSS/JavaScript through Vue, following books and courses.',
      zh: '从 HTML/CSS/JavaScript 到 Vue，跟随书籍和课程整理的前端学习记录。',
      ja: 'HTML/CSS/JavaScript から Vue まで、書籍や講座に沿って整理したフロントエンド学習記録です。',
    },
    repos: [
      {
        name: 'Web',
        href: 'https://github.com/wansang93/Web',
        description: {
          ko: '모던 자바스크립트, 반응형 웹, JavaScript30, Vue 실습 프로젝트 모음',
          en: 'Modern JavaScript, responsive web, JavaScript30, and Vue practice projects',
          zh: '现代 JavaScript、响应式网页、JavaScript30、Vue 练习项目合集',
          ja: 'モダン JavaScript、レスポンシブ Web、JavaScript30、Vue 実習プロジェクト集',
        },
      },
    ],
  },
  {
    id: 'cloud',
    title: { ko: '클라우드 · 인프라', en: 'Cloud & Infra', zh: '云与基础设施', ja: 'クラウド・インフラ' },
    description: {
      ko: 'AWS, 리눅스, Docker·Kubernetes를 중심으로 정리한 운영 환경 학습 기록입니다.',
      en: 'Operations-focused study notes centered on AWS, Linux, and Docker/Kubernetes.',
      zh: '围绕 AWS、Linux、Docker/Kubernetes 整理的运维学习记录。',
      ja: 'AWS・Linux・Docker/Kubernetes を中心にまとめた運用環境の学習記録です。',
    },
    repos: [
      {
        name: 'OS_Cloud',
        href: 'https://github.com/wansang93/OS_Cloud',
        description: {
          ko: 'AWS 자격증, 리눅스마스터 1급, 도커·쿠버네티스 학습 정리',
          en: 'AWS certification, Linux Master, Docker/Kubernetes study notes',
          zh: 'AWS 认证、Linux Master、Docker/Kubernetes 学习整理',
          ja: 'AWS 認定資格、リナックスマスター1級、Docker/Kubernetes 学習まとめ',
        },
      },
    ],
  },
  {
    id: 'data-ai',
    title: { ko: '데이터 · AI', en: 'Data & AI', zh: '数据与 AI', ja: 'データ・AI' },
    description: {
      ko: '파이썬 기초부터 데이터 분석, 머신러닝·딥러닝, 자격증 준비까지 아우르는 기록입니다.',
      en: 'Covers Python fundamentals through data analysis, machine learning/deep learning, and certification prep.',
      zh: '涵盖 Python 基础、数据分析、机器学习/深度学习到考证准备。',
      ja: 'Python の基礎からデータ分析、機械学習・深層学習、資格対策までを扱った記録です。',
    },
    repos: [
      {
        name: 'Python',
        href: 'https://github.com/wansang93/Python',
        description: {
          ko: '파이썬 기초 문법과 스타일 가이드 정리',
          en: 'Python fundamentals and style guide notes',
          zh: 'Python 基础语法与风格指南整理',
          ja: 'Python の基礎文法とスタイルガイドのまとめ',
        },
      },
      {
        name: 'DataAnalysis',
        href: 'https://github.com/wansang93/DataAnalysis',
        description: {
          ko: '판다스 데이터 분석, MySQL·MongoDB, SQLP·빅데이터분석기사 자격증',
          en: 'Pandas data analysis, MySQL/MongoDB, SQLP and Big Data Analyst certifications',
          zh: 'Pandas 数据分析、MySQL/MongoDB、SQLP 与大数据分析师认证',
          ja: 'Pandas データ分析、MySQL/MongoDB、SQLP・ビッグデータ分析士資格',
        },
      },
      {
        name: 'AI',
        href: 'https://github.com/wansang93/AI',
        description: {
          ko: '텐서플로 기초, 딥러닝 강의 정리, 빅데이터분석기사 준비',
          en: 'TensorFlow basics, deep learning course notes, Big Data Analyst prep',
          zh: 'TensorFlow 基础、深度学习课程整理、大数据分析师备考',
          ja: 'TensorFlow の基礎、深層学習講座のまとめ、ビッグデータ分析士対策',
        },
      },
    ],
  },
  {
    id: 'projects-tools',
    title: { ko: '토이 프로젝트 · 도구', en: 'Toy Projects & Tools', zh: '小项目与工具', ja: 'トイプロジェクト・ツール' },
    description: {
      ko: '작게 직접 만들어본 프로젝트와, 협업 도구를 익힌 기록입니다.',
      en: 'Small self-built projects, plus notes from learning collaboration tools.',
      zh: '亲手做的小项目，以及协作工具的学习记录。',
      ja: '実際に作ってみた小さなプロジェクトと、協業ツールを学んだ記録です。',
    },
    repos: [
      {
        name: 'Block_chain',
        href: 'https://github.com/wansang93/Block_chain',
        description: {
          ko: '블록체인 기초 학습 + 업비트 시세를 크롤링·분석하는 Market_bot',
          en: 'Blockchain fundamentals + Market_bot, a crawler/analyzer for Upbit prices',
          zh: '区块链基础学习 + Market_bot（抓取分析 Upbit 行情的机器人）',
          ja: 'ブロックチェーンの基礎学習 + Upbit の相場を収集・分析する Market_bot',
        },
      },
      {
        name: 'Practice-Git',
        href: 'https://github.com/wansang93/Practice-Git',
        description: {
          ko: 'Git·GitHub 기초를 정리한 튜토리얼 노트',
          en: 'Tutorial notes covering Git/GitHub basics',
          zh: 'Git/GitHub 基础教程笔记',
          ja: 'Git・GitHub の基礎をまとめたチュートリアルノート',
        },
      },
    ],
  },
];
