import type { Lang } from './i18n';

type Localized = { ko: string; en: string; zh: string; ja: string };
type LocalizedList = { ko: string[]; en: string[]; zh: string[]; ja: string[] };

export type PatchNote = {
  version: string;
  date: string;
  title: Localized;
  details: LocalizedList;
};

export const PATCH_NOTES: PatchNote[] = [
  {
    version: 'v0.008',
    date: '2026.06.15',
    title: {
      ko: '설정 페이지 + 로고 인터랙션',
      en: 'Settings page + logo interactions',
      zh: '设置页面 + Logo 交互动效',
      ja: '設定ページ + ロゴインタラクション',
    },
    details: {
      ko: [
        '하단 풋터에 "설정" 메뉴가 생겼어요 — 폰트와 강조색을 취향에 맞게 바꿀 수 있습니다',
        '강조색은 검정·와인·오렌지·개나리·하늘 5가지 프리셋, 랜덤 추천, 직접 선택 중 고를 수 있어요',
        '색상을 바꾸면 헤더 로고에 무지개 빛이 잠깐 흐르고, 폰트를 바꾸면 글자가 슬롯머신처럼 한 번 돌아요',
        '미션 5개의 제목과 힌트 문구를 더 자연스럽게 전면 재작성했어요',
      ],
      en: [
        'A "Settings" link is now in the footer — choose your preferred font and accent color',
        'Accent color comes with 5 presets (black, wine, orange, forsythia yellow, sky blue), a random pick, or a custom color',
        'Changing the color flashes a rainbow sweep on the header logo; changing the font spins it like a slot machine',
        'All 5 mission titles and hints have been rewritten to feel more natural',
      ],
      zh: [
        '页脚新增「设置」入口 —— 可以自由选择字体和强调色',
        '强调色提供 5 种预设（黑色、酒红、橙色、迎春黄、天蓝），以及随机推荐和自定义选项',
        '更换颜色时，顶部 logo 会短暂闪过彩虹渐变；更换字体时，字母会像老虎机一样滚动一下',
        '5 个任务的标题和提示文案已全面改写，读起来更自然',
      ],
      ja: [
        'フッターに「設定」リンクが追加 —— フォントとアクセントカラーを好みに合わせて変更できます',
        'アクセントカラーは 5 種類のプリセット（ブラック・ワイン・オレンジ・イエロー・スカイ）+ ランダム推薦 + カスタムから選べます',
        'カラーを変えるとヘッダーロゴに虹色がさっと流れ、フォントを変えると文字がスロットマシンのように回ります',
        '5 つのミッションのタイトルとヒント文言をすべて書き直し、より自然な表現に',
      ],
    },
  },
  {
    version: 'v0.007',
    date: '2026.06.11',
    title: {
      ko: '미션 알림 토스트 개선 + 힌트 문구 수정',
      en: 'Mission toast improvements + hint copy updates',
      zh: '任务提示优化 + 说明文案修改',
      ja: 'ミッション通知の改善 + ヒント文言の修正',
    },
    details: {
      ko: [
        '첫 미션 달성 알림이 팝업 대신 토스트로 바뀌었어요 — 10초 유지되고 미션 페이지 바로가기 링크도 함께 표시됩니다',
        '미션 토스트에 마우스를 올리거나 모바일에서 손을 대면 타이머가 멈춥니다. 이때 닫기 버튼이 강조 표시됩니다',
        '다크모드가 이미 켜진 상태에서 "밤 모드" 미션 힌트가 더 자연스러운 문구로 바뀝니다',
        '히든 미션 카드 롱프레스 시간을 1초에서 10초로 변경했어요',
      ],
      en: [
        'First-mission alert is now a toast instead of a modal — stays for 10 seconds and includes a shortcut to the mission page',
        'Hovering or touching a mission toast pauses the timer; the close button is highlighted while paused',
        'The "night mode" mission hint now shows a different message when dark mode is already on',
        'Hidden mission card long-press duration changed from 1 second to 10 seconds',
      ],
      zh: [
        '首个任务达成提示从弹窗改为底部通知 —— 显示 10 秒，并附带任务页面快捷链接',
        '将鼠标悬停或触摸任务通知时，计时器暂停，关闭按钮同时高亮显示',
        '夜间模式已开启时，"夜间模式"任务的提示文案会自动切换为更合适的内容',
        '隐藏任务卡片长按时间从 1 秒改为 10 秒',
      ],
      ja: [
        '初ミッション達成の通知がポップアップからトーストに変更 —— 10秒間表示され、ミッションページへのリンク付き',
        'ミッション通知にマウスを乗せるかタッチすると、タイマーが一時停止し、閉じるボタンが強調表示されます',
        '夜モードがすでにオンの場合、ミッションのヒントが状況に合った文言に切り替わります',
        '隠しミッションカードの長押し時間を1秒から10秒に変更',
      ],
    },
  },
  {
    version: 'v0.006',
    date: '2026.06.11',
    title: {
      ko: '소개 페이지 타임라인 인터랙션 + 이력서 레이아웃 개선',
      en: 'About page timeline interactions + résumé layout polish',
      zh: '关于页面时间轴交互 + 简历布局优化',
      ja: '自己紹介ページのタイムライン操作 + 職歴レイアウト改善',
    },
    details: {
      ko: [
        '경력 바 그래프에 마우스 오버·터치 인터랙션 추가 — 해당 바가 강조되고 상단에 기간 정보가 뜹니다',
        '바를 클릭하면 아래 이력서의 해당 섹션으로 자동 스크롤, 플로팅 "타임라인으로" 버튼으로 바로 돌아올 수 있습니다',
        '모바일은 첫 번째 탭으로 확대 확인, 두 번째 탭으로 스크롤 이동, 바 밖을 탭하면 원상복구',
        '이력서 날짜 옆에 총 기간(예: 6개월, 1년 9개월)이 바로 표시됩니다',
        '이력서 각 항목의 기간이 타임라인 바와 일치하도록 수정 (호주 워킹홀리데이 11개월, 호주여행 1~3월 등)',
        '첫 번째 홈페이지 페이지 구성 변경 — 스택과 열기 버튼을 맨 위로 이동',
      ],
      en: [
        'Career bar graph now responds to hover and touch — the selected bar highlights with a duration info pill',
        'Clicking a bar scrolls to that section in the résumé below; a floating button brings you back to the timeline',
        'Mobile: first tap expands, second tap scrolls, tapping outside the graph resets',
        'Duration (e.g. 6m, 1y 9m) now appears inline next to each date in the résumé',
        'Résumé durations now match the timeline bar lengths exactly (AU Working Holiday 11m, AU Trip Jan–Mar, etc.)',
        'First homepage page reordered — stack and open button moved to the top',
      ],
      zh: [
        '职业经历条形图现在支持悬停和触摸交互 —— 选中的条目高亮显示，并弹出时间段信息',
        '点击条目可自动滚动到简历对应章节，浮动按钮可快速返回时间轴',
        '移动端：第一次点击展开，第二次点击跳转，点击图表外侧恢复',
        '简历中每个日期旁边直接显示总时长（如 6个月、1年9个月）',
        '简历各项时长已与时间轴条形对齐（澳洲打工度假11个月、澳洲旅行1~3月等）',
        '第一个主页页面重新排版 —— 技术栈和打开按钮移至顶部',
      ],
      ja: [
        '職歴バーグラフにホバー・タッチ操作を追加 —— 選択したバーがハイライトされ、期間情報が表示されます',
        'バーをクリックすると職歴の該当セクションへスクロール。フローティングボタンでタイムラインに戻れます',
        'モバイル：1回タップで拡大確認、2回目のタップでスクロール、外側をタップで元に戻る',
        '職歴の各日付の横に合計期間（例：6ヶ月、1年9ヶ月）が表示されます',
        '職歴の各期間がタイムラインバーと一致するよう修正（ワーキングホリデー11ヶ月、旅行1〜3月など）',
        '最初のホームページページの構成を変更 —— スタックと開くボタンを最上部へ移動',
      ],
    },
  },
  {
    version: 'v0.005',
    date: '2026.06.11',
    title: {
      ko: '전체 검색 + 풋터 단장 + 미션 재미 살리기',
      en: 'Full-text search + cleaner footer + missions that feel like missions',
      zh: '全文搜索 + 页脚整理 + 让任务更像任务',
      ja: '全文検索 + フッター整理 + ミッションらしさを取り戻す',
    },
    details: {
      ko: [
        '검색이 페이지 제목뿐 아니라 사이트 본문까지 뒤져서, 매칭된 구절을 미리보기로 보여줍니다',
        '풋터 정리 — 가운데에는 미션·패치노트만 남기고, 우측에 GitHub·Instagram·Facebook·YouTube 아이콘으로 깔끔하게',
        '미션 문구를 다시 썼어요 — 메뉴명 같던 제목은 한 문장 톤을 살리고, 안내는 "왜 그 행동을 하는지" 위주로',
        '모바일 비밀 단축키 트리거 이동 — 상단 로고 누르기 대신 히든 미션 카드를 1초 꾹 누르기로',
        '새 히든 미션 추가 — 이 패치노트 페이지를 들춰본 분께 드리는 작은 인증입니다',
        '헤더 로고가 `wansang.` 에서 `wansang93`(점이 93으로 바뀜)',
      ],
      en: [
        'Search now reads the actual page content, not just titles — results show a preview of the matching passage',
        'Footer cleanup — only Mission and Patch notes in the middle, with GitHub / Instagram / Facebook / YouTube icons on the right',
        'Mission copy rewritten — playful one-liners instead of menu-like titles, hints focused on why the action matters',
        'Hidden-shortcut trigger moved on mobile — long-press the masked mission card instead of the header logo',
        'New hidden mission — opening this patch notes page is itself a quiet little badge of honor',
        'Header logo changed from `wansang.` to `wansang93` (the dot became 93)',
      ],
      zh: [
        '搜索现在会读取页面正文,不仅是标题 —— 结果里直接显示匹配段落的预览',
        '页脚整理 —— 中间只保留任务和补丁说明,右侧整齐摆上 GitHub / Instagram / Facebook / YouTube 图标',
        '任务文案重写 —— 标题不再像菜单名一样直白,提示也以「为什么做这件事」为核心',
        '移动端隐藏快捷键触发位置改变 —— 不再是按顶部 logo 1 秒,改为按住对应任务卡片 1 秒',
        '新增隐藏任务 —— 打开这个补丁说明页面本身就是一个小勋章',
        '顶部 logo 从 `wansang.` 改为 `wansang93`(把点换成了 93)',
      ],
      ja: [
        '検索がページタイトルだけでなく本文も読みに行きます —— ヒットした一節がプレビューで表示',
        'フッターを整理 —— 中央はミッションとパッチノートだけ。右側に GitHub / Instagram / Facebook / YouTube アイコン',
        'ミッション文言を書き直し —— メニュー名のような直球タイトルをやめ、ヒントは「なぜそれをするか」を中心に',
        'モバイルの隠しショートカット発動位置を変更 —— ヘッダーロゴ長押しから、隠しミッションカードを 1 秒長押しに',
        '新しい隠しミッション —— このパッチノートを開くこと自体が、ちょっとした認定バッジ',
        'ヘッダーロゴが `wansang.` から `wansang93` へ(ドットが 93 に)',
      ],
    },
  },
  {
    version: 'v0.004',
    date: '2026.06.11',
    title: {
      ko: '中文 · 日本語 추가 + 폰트 깜빡임 제거',
      en: 'Chinese + Japanese added, no more font flicker',
      zh: '新增中文 · 日本語 + 消除字体闪烁',
      ja: '中文 · 日本語 を追加 + フォントのちらつき解消',
    },
    details: {
      ko: [
        '中文 / 日本語 페이지 추가 — 홈·소개·블로그·미션·프로젝트·패치노트까지 사이트 전체를 4개 언어로 번역',
        '새로고침할 때 글자가 한 번 바뀌어 보이던 깜빡임을 없앰 (한·영 폰트 + 중·일 시스템 폰트 모두)',
        '검색창의 ↑↓ / Enter / Esc 단축키가 결과 위에 마우스를 올린 뒤에도 정상 동작',
        '"첫번째 홈페이지 제작" 페이지의 2021년 프리뷰를 첫 화면만이 아닌 전체 페이지 캡쳐로 교체',
      ],
      en: [
        'Added Chinese (中文) and Japanese (日本語) — every page (home, about, blog, missions, projects, patch notes) now lives in four languages',
        'Removed the brief text flicker on refresh, for both Korean / English fonts and Chinese / Japanese system fonts',
        'Search box keyboard shortcuts (↑↓ / Enter / Esc) keep working even after hovering or clicking a result',
        'Replaced the 2021 archive preview on the "My first homepage" page with a full-page capture (not just the first screen)',
      ],
      zh: [
        '新增中文 / 日本語 —— 首页、关于、博客、任务、项目、补丁说明等所有页面均已支持四种语言',
        '消除了刷新时文字短暂跳动的闪烁(韩英字体与中日系统字体均已修复)',
        '搜索框的 ↑↓ / Enter / Esc 快捷键在鼠标悬停或点击结果之后也能正常工作',
        '将「我的第一个个人主页」页面的 2021 预览替换为整页截图,而不再只显示首屏',
      ],
      ja: [
        '中文 / 日本語 を追加 —— ホーム・紹介・ブログ・ミッション・プロジェクト・パッチノートなど全ページが 4 言語に対応',
        'リロード時に文字が一瞬切り替わって見えるちらつきを解消(韓・英フォントと中・日のシステムフォント、両方とも)',
        '検索ボックスの ↑↓ / Enter / Esc ショートカットが、結果にマウスを乗せたあとやクリックしたあとでも正常に動作',
        '「はじめてのホームページ」ページの 2021 プレビューを、ファーストビューだけでなくページ全体のキャプチャに差し替え',
      ],
    },
  },
  {
    version: 'v0.003',
    date: '2026.06.10',
    title: {
      ko: '미션 개편 + 검색 + 폰트 정비',
      en: 'Missions overhaul + search + typography fix',
      zh: '任务系统重构 + 搜索 + 字体修复',
      ja: 'ミッション刷新 + 検索 + タイポグラフィ修正',
    },
    details: {
      ko: [
        '미션 페이지를 "페이지 100% 즐기기" / "히든 미션" 두 섹션으로 분리, 히든 미션 마스킹 + 힌트 토글, 카드 체크박스로 개별 초기화',
        '첫 미션 달성 시 안내 팝업, 미션 초기화 후 다시 발동',
        '폭죽 효과 단계화(일반/히든/전체 완료) + 전체 완료 시 노출되는 "🎆 미션 달성 폭죽" 버튼',
        '"2021 아카이브 방문" → "스크롤 끝까지 내리기"로 교체, "미션 페이지 도달"은 7초 카운트다운',
        '검색 모달 추가 (Ctrl/Cmd+K, 키보드 탐색, 한·영 페이지 인덱스)',
        '헤더 상단 스크롤 진행 바 + 데스크탑 nav 메뉴/유틸 구분선',
        'Pretendard 폰트 사이트 적용 + 영문 헤딩 폰트(Fraunces) 누락 수정',
        '블로그·소개·프로젝트 페이지 디자인 hierarchy 개선',
      ],
      en: [
        'Mission page split into "Make the most of the site" / "Hidden missions", masked hidden missions with a hint toggle, per-card reset via the orange check icon',
        'First-mission intro popup, fires again after a full reset',
        'Tiered fireworks (regular / hidden / all-complete) plus an "🎆 Launch celebration fireworks" button while everything is done',
        '"Visit 2021 archive" → "Scroll to bottom"; "Reach the mission page" runs a 7-second countdown',
        'Search modal (Ctrl/Cmd+K, keyboard navigation, KO + EN page index)',
        '2px scroll progress bar above the header, divider between desktop nav items and utilities',
        'Pretendard shipped site-wide and English headings render Fraunces again',
        'Cleaned up layout hierarchy on blog / about / project pages',
      ],
      zh: [
        '任务页面拆分为「充分体验本站」/「隐藏任务」,隐藏任务以遮罩显示并配合提示开关,可通过橙色对勾图标逐张重置',
        '首次完成任务时弹出引导,全部重置后会再次出现',
        '分级烟花(普通 / 隐藏 / 全完成),完成全部任务后还会出现「🎆 庆祝烟花」按钮',
        '将「访问 2021 存档」改为「滚动到底部」;「到达任务页面」增加 7 秒倒计时',
        '搜索弹窗(Ctrl/Cmd+K,支持键盘导航,KO + EN 页面索引)',
        '在导航栏顶部添加 2px 的滚动进度条,桌面端导航与工具之间增加分隔线',
        '全站统一使用 Pretendard,英文标题恢复使用 Fraunces',
        '整理了 blog / about / project 页面的布局层级',
      ],
      ja: [
        'ミッションページを「サイトを100%楽しむ」/「隠しミッション」に分割。隠しミッションはマスク表示+ヒント開閉、オレンジのチェックアイコンで個別にリセット可',
        '最初のミッション達成時に案内ポップアップを表示。全リセット後に再度表示',
        '段階的な花火(通常 / 隠し / 全達成)。全達成時には「🎆 ミッション達成花火」ボタンも追加',
        '「2021 アーカイブを訪問」→「一番下までスクロール」に変更。「ミッションページに到達」は 7 秒のカウントダウンに',
        '検索モーダル(Ctrl/Cmd+K、キーボード操作、KO + EN のページ索引)',
        'ヘッダー上部に 2px のスクロール進捗バー、デスクトップではナビとユーティリティの間に区切り線',
        'Pretendard をサイト全体に適用。英語見出しは再び Fraunces で描画',
        'blog / about / project ページのレイアウト階層を整理',
      ],
    },
  },
  {
    version: 'v0.002',
    date: '2026.06.10',
    title: {
      ko: '모바일 대응 + 미션 시스템',
      en: 'Mobile support + mission system',
      zh: '移动端支持 + 任务系统',
      ja: 'モバイル対応 + ミッションシステム',
    },
    details: {
      ko: [
        '모바일 햄버거 네비게이션 추가 (반응형 적용)',
        '메뉴와 페이지 라벨 한국어 일괄 적용 (홈 / 블로그 / 프로젝트 / 소개 등)',
        '미션 시스템 추가: 6개 미션 (미션 페이지 도달 / 다크모드 / 언어 / 프로젝트 메뉴 / 스크롤 끝 / 숨겨진 단축키)',
        '히든 미션 시스템: 잠긴 상태 마스킹 + 약간의 힌트, 달성 시 "히든 미션 달성!" 모달',
        '히든 미션 트리거 두 가지 — 데스크탑은 F12, 모바일은 상단 로고 1초 길게 누르기',
        '미션 페이지를 두 섹션으로 분리: "페이지 100% 즐기기" / "히든 미션"',
        '푸터 정리: 깃허브 / 이메일 / 미션 / 업데이트',
      ],
      en: [
        'Added a mobile hamburger nav (fully responsive)',
        'Korean labels applied across menus and page titles (홈 / 블로그 / 프로젝트 / 소개, etc.)',
        'Mission system with 6 missions (reach mission page / dark mode / language / project menu / scroll end / hidden shortcut)',
        'Hidden-mission flow: masked title with a small hint, plus an "unlocked!" modal on completion',
        'Two hidden-mission triggers — F12 on desktop, 1s long-press on the header logo for mobile',
        'Mission page split into two sections: "Make the most of the site" and "Hidden missions"',
        'Footer cleaned up: GitHub / Email / Mission / Updates',
      ],
      zh: [
        '添加移动端汉堡菜单(完整响应式)',
        '菜单和页面标题统一应用韩文标签(홈 / 블로그 / 프로젝트 / 소개 等)',
        '任务系统含 6 个任务(到达任务页 / 深色模式 / 语言 / 项目菜单 / 滚动到底 / 隐藏快捷键)',
        '隐藏任务流程:遮罩标题配合小提示,完成后弹出「已解锁!」模态框',
        '两种隐藏任务触发方式 —— 桌面端按 F12,移动端长按顶部 logo 1 秒',
        '任务页面拆分为两个部分:「充分体验本站」与「隐藏任务」',
        '页脚整理为:GitHub / Email / 任务 / 更新',
      ],
      ja: [
        'モバイル向けのハンバーガーナビを追加(フルレスポンシブ)',
        'メニューやページタイトルに韓国語ラベルを適用(홈 / 블로그 / 프로젝트 / 소개 など)',
        '6 つのミッションを実装(ミッションページ到達 / ダークモード / 言語 / プロジェクトメニュー / スクロール末端 / 隠しショートカット)',
        '隠しミッションの流れ:マスクされたタイトル+小さなヒント、達成時に「アンロック!」モーダルを表示',
        '隠しミッションのトリガーは 2 種類 —— デスクトップは F12、モバイルはヘッダーロゴを 1 秒長押し',
        'ミッションページを「サイトを100%楽しむ」と「隠しミッション」の 2 セクションに分割',
        'フッターを整理:GitHub / メール / ミッション / 更新',
      ],
    },
  },
  {
    version: 'v0.001',
    date: '2026.06.09',
    title: {
      ko: '사이트 전면 리뉴얼',
      en: 'Full site rebuild',
      zh: '网站全面重建',
      ja: 'サイト全面リビルド',
    },
    details: {
      ko: [
        'Next.js 15 + TypeScript + Tailwind + MDX 기반으로 재구축',
        '한국어 / 영어 라우팅 (/en/* 분기)',
        'CSS 변수 기반 다크모드 + 첫 페인트부터 깜빡임 없는 테마 초기화',
        'Theme / Language 토글, 네비 드롭다운',
        '2021년 Bootstrap 포트폴리오를 /project/webpage/2021/에 아카이브로 보존',
        'GitHub Actions로 정적 빌드 + GitHub Pages 자동 배포',
        '한·영 자동 분기 404 페이지 추가',
      ],
      en: [
        'Rebuilt on Next.js 15 + TypeScript + Tailwind + MDX',
        'Korean / English routing (/en/* split)',
        'CSS-variable dark mode with no-flash theme init',
        'Theme / language toggle and nav dropdown',
        'Preserved the 2021 Bootstrap portfolio under /project/webpage/2021/ as a read-only archive',
        'GitHub Actions for static build + GitHub Pages deploy',
        'Custom 404 page with KO/EN auto-detect',
      ],
      zh: [
        '基于 Next.js 15 + TypeScript + Tailwind + MDX 重建',
        '韩文 / 英文路由(/en/* 分支)',
        '基于 CSS 变量的深色模式,无闪烁主题初始化',
        '主题 / 语言切换与导航下拉菜单',
        '将 2021 年 Bootstrap 作品集保留在 /project/webpage/2021/,作为只读存档',
        'GitHub Actions 静态构建 + GitHub Pages 部署',
        '支持 KO/EN 自动识别的自定义 404 页面',
      ],
      ja: [
        'Next.js 15 + TypeScript + Tailwind + MDX でリビルド',
        '韓国語 / 英語のルーティング(/en/* で分岐)',
        'CSS 変数ベースのダークモード+チラつかないテーマ初期化',
        'テーマ / 言語トグルとナビゲーションのドロップダウン',
        '2021 年の Bootstrap ポートフォリオを /project/webpage/2021/ に読み取り専用でアーカイブ',
        'GitHub Actions による静的ビルド + GitHub Pages デプロイ',
        'KO/EN を自動判定するカスタム 404 ページ',
      ],
    },
  },
];

export function patchNoteText(note: PatchNote, lang: Lang): string {
  return `${note.version} ${note.title[lang]} ${note.details[lang].join(' ')}`;
}
