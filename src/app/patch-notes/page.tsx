export const metadata = { title: '패치노트' };

type Entry = {
  version: string;
  date: string;
  title: string;
  details: string[];
};

const entries: Entry[] = [
  {
    version: 'v0.003',
    date: '2026.06.10',
    title: '미션 개편 + 검색 + 폰트 정비',
    details: [
      '미션 페이지를 "페이지 100% 즐기기" / "히든 미션" 두 섹션으로 분리, 히든 미션 마스킹 + 힌트 토글, 카드 체크박스로 개별 초기화',
      '첫 미션 달성 시 안내 팝업, 미션 초기화 후 다시 발동',
      '폭죽 효과 단계화(일반/히든/전체 완료) + 전체 완료 시 노출되는 "🎆 미션 달성 폭죽" 버튼',
      '"2021 아카이브 방문" → "스크롤 끝까지 내리기"로 교체, "미션 페이지 도달"은 7초 카운트다운',
      '검색 모달 추가 (Ctrl/Cmd+K, 키보드 탐색, 한·영 페이지 인덱스)',
      '헤더 상단 스크롤 진행 바 + 데스크탑 nav 메뉴/유틸 구분선',
      'Pretendard 폰트 사이트 적용 + 영문 헤딩 폰트(Fraunces) 누락 수정',
      '블로그·소개·프로젝트 페이지 디자인 hierarchy 개선',
    ],
  },
  {
    version: 'v0.002',
    date: '2026.06.10',
    title: '모바일 대응 + 미션 시스템',
    details: [
      '모바일 햄버거 네비게이션 추가 (반응형 적용)',
      '메뉴와 페이지 라벨 한국어 일괄 적용 (홈 / 블로그 / 프로젝트 / 소개 등)',
      '미션 시스템 추가: 6개 미션 (미션 페이지 도달 / 다크모드 / 언어 / 프로젝트 메뉴 / 스크롤 끝 / 숨겨진 단축키)',
      '히든 미션 시스템: 잠긴 상태 마스킹 + 약간의 힌트, 달성 시 "히든 미션 달성!" 모달',
      '히든 미션 트리거 두 가지 — 데스크탑은 F12, 모바일은 상단 로고 1초 길게 누르기',
      '미션 페이지를 두 섹션으로 분리: "페이지 100% 즐기기" / "히든 미션"',
      '푸터 정리: 깃허브 / 이메일 / 미션 / 업데이트',
    ],
  },
  {
    version: 'v0.001',
    date: '2026.06.09',
    title: '사이트 전면 리뉴얼',
    details: [
      'Next.js 15 + TypeScript + Tailwind + MDX 기반으로 재구축',
      '한국어 / 영어 라우팅 (/en/* 분기)',
      'CSS 변수 기반 다크모드 + 첫 페인트부터 깜빡임 없는 테마 초기화',
      'Theme / Language 토글, 네비 드롭다운',
      '2021년 Bootstrap 포트폴리오를 /project/webpage/2021/에 아카이브로 보존',
      'GitHub Actions로 정적 빌드 + GitHub Pages 자동 배포',
      '한·영 자동 분기 404 페이지 추가',
    ],
  },
];

export default function UpdatesPage() {
  return (
    <div className="space-y-10">
      <header>
        <h1 className="font-serif text-4xl font-semibold tracking-tight">패치노트</h1>
        <p className="mt-3 text-muted">사이트 변경 이력을 기록합니다.</p>
      </header>

      <ol className="space-y-10">
        {entries.map((e) => (
          <li key={e.version} className="border-l-2 border-border pl-5">
            <div className="flex items-baseline gap-3 flex-wrap">
              <span className="font-mono text-sm text-accent">{e.version}</span>
              <span className="text-xs text-muted">{e.date}</span>
            </div>
            <h2 className="mt-2 font-serif text-xl font-semibold">{e.title}</h2>
            <ul className="mt-3 space-y-1.5 text-sm text-muted leading-relaxed">
              {e.details.map((d, i) => (
                <li key={i} className="flex gap-2">
                  <span aria-hidden className="text-border">—</span>
                  <span>{d}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}
