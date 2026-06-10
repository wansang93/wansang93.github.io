# wansang93.github.io

김완상의 개인 사이트(블로그 + 포트폴리오). 2026년 전면 리빌드 진행 중.

## 스택 & 구조

- **Next.js 15 (App Router) + React 19 + TypeScript + Tailwind + MDX**
- `output: 'export'` (정적 사이트) → GitHub Actions로 빌드해서 GitHub Pages 배포
- `trailingSlash: true`, `images.unoptimized: true` (GH Pages 호환)

```
src/
├─ app/                 # 한국어 라우트 (디폴트)
│  ├─ layout.tsx        # 루트 레이아웃 + themeInitScript
│  ├─ page.tsx
│  ├─ not-found.tsx     # 한·영 자동 분기 404
│  ├─ blog/ about/ project/
│  └─ en/               # 영어 라우트 (/en/*)
├─ components/          # Nav, Footer, ThemeToggle, LanguageToggle
└─ lib/i18n.ts          # detectLang / prefixed / toLangPath

public/project/webpage/2021/site/   # 2021 정적 아카이브 (수정 금지)
```

## 핵심 컨벤션

### i18n
- 한국어가 디폴트, 영어는 `/en/*` prefix.
- 새 페이지 추가 시 **반드시 한·영 페어**로 만들 것. 한쪽만 만들면 LanguageToggle 누를 때 404 뜬다.
- 라우트 안의 내부 링크는 `prefixed(href, lang)` 사용해서 현재 언어 유지.
- 언어 감지는 `detectLang(pathname)` — `/en` 또는 `/en/`로 시작하면 en, 아니면 ko.

### 반응형 (모든 작업에 필수)
- **모든 페이지·컴포넌트는 모바일 / 태블릿 / 데스크탑에서 깨지지 않아야 한다.** 새 UI를 만들거나 수정할 때 항상 적용.
- 기본 컨테이너 폭: `max-w-3xl px-6 mx-auto`. 페이지 콘텐츠는 이 안에 들어가도록.
- Tailwind 브레이크포인트: `sm` 640, `md` 768, `lg` 1024. 모바일-퍼스트(베이스가 모바일, `sm:`/`md:`로 확장).
- Nav는 `< sm`에서 햄버거 메뉴, `sm+`에서 가로 메뉴 (src/components/nav.tsx 참고). 새 메뉴 항목을 추가하면 **데스크탑 ul + 모바일 panel 둘 다** 업데이트.
- 큰 디스플레이 텍스트(`text-5xl` 이상)는 모바일에선 한 단계 줄이기: 예 `text-4xl sm:text-5xl`.
- 가로로 늘어선 항목은 `flex-wrap` 또는 `flex-col sm:flex-row` 패턴으로 자연 줄바꿈.
- 절대 위치 드롭다운/모달은 가로폭이 화면을 넘지 않도록 `max-w-` 또는 `right-0`로 제한.
- 검증: dev 띄운 뒤 브라우저 DevTools의 device toolbar로 최소 **iPhone(약 390px), iPad(약 768px), 데스크탑** 세 폭에서 확인.

### 다크모드
- `:root` / `.dark` 에 CSS variables 정의 (`--color-bg`, `--color-fg`, `--color-muted`, `--color-accent`, `--color-border`). globals.css 참고.
- Tailwind `darkMode: 'class'` 설정. 클래스는 `<html>`에 붙는다.
- `layout.tsx`의 `themeInitScript`가 `<head>`에서 동기 실행 → localStorage/prefers-color-scheme 보고 `html.dark` 세팅. React 렌더 **전에** 끝나므로 첫 페인트부터 올바른 테마.
- **새 컴포넌트는 React state로 다크모드 분기하지 말 것.** Tailwind `dark:` variant 또는 CSS variables만 사용. ThemeToggle 참고 — SVG 두 개를 `hidden dark:block` / `block dark:hidden`으로 토글하는 패턴.
- 색은 가능하면 `bg-bg`, `text-fg`, `text-muted`, `border-border`, `text-accent` Tailwind 토큰 사용 (tailwind.config.ts에서 CSS var로 연결됨).

### 라우팅 컨벤션
- Project 카테고리는 `src/app/project/<category>/page.tsx` 인덱스 + 하위 페이지.
- 옛 사이트 아카이브는 `/project/webpage/<year>/` 경로 규칙. 실제 정적 파일은 `public/project/webpage/<year>/site/` 에 통째로 보존, Next.js 페이지(`src/app/project/webpage/<year>/page.tsx`)는 설명 + "새 창으로 열기" 링크.
- **`public/project/webpage/2021/` 폴더는 절대 수정 금지** (아카이브). 손대야 할 일이 생기면 사용자에게 먼저 확인.

### Nav 드롭다운
- `src/components/nav.tsx`의 `DropdownMenu`는 Project 메뉴용. 새 Project 카테고리 추가하면 `projectMenu.groups`에도 항목 추가해야 보임.

### 검색 (Ctrl/Cmd+K)
- 헤더 우측 돋보기 버튼 또는 Ctrl/Cmd+K로 검색 모달 열림. 라우트별 페이지 인덱스에서 substring 매칭.
- 검색 인덱스는 [src/lib/search.ts](src/lib/search.ts)의 `SEARCH_ITEMS` 배열에 정의. href는 한국어 경로(절대), 클릭 시 현재 lang에 맞춰 `/en/`이 자동 prefix됨.
- **새 페이지를 추가할 때마다 SEARCH_ITEMS에도 항목 추가** — 안 그러면 검색에서 안 보임. KO/EN title 둘 다, 가능하면 description도.

### 미션 시스템 (이스터에그)
- 사이트에 숨겨진 미션. 진입로는 **Footer 링크만**이라 일반 사용자에겐 잘 안 보임.
- 미션 정의는 [src/lib/missions.ts](src/lib/missions.ts)의 `MISSIONS` 배열에 추가. `id` 타입(`MissionId`)도 함께 확장.
- 진행 상태는 `localStorage['missions:v1']`에 저장. SSR 안전.
- 완료 처리는 두 가지 경로:
  - 이벤트 hook (예: F12 keydown) → `completeMission('id')` 호출. `MissionTracker`가 모달도 띄움.
  - UI 토글 (예: 미션 페이지에서 직접 체크) → `useMissions().toggle('id')`.
- 새 미션 추가 시 체크리스트:
  - `MissionId` 유니온에 추가
  - `MISSIONS`에 KO/EN 타이틀·힌트 작성
  - 완료 트리거를 어디서 부를지 결정 (이벤트 / 페이지 방문 / 수동)
  - 필요하면 [src/components/mission-tracker.tsx](src/components/mission-tracker.tsx)에 모달 트리거 추가

## 빌드 & 검증

- `npm run dev` — 로컬 개발 서버 (localhost:3000)
- `npm run build` — 정적 export
- `npm run typecheck` — TS 검증
- `npm run lint` — Next.js lint
- UI 변경 후엔 dev 서버 띄워서 다크/라이트, 한·영 토글, 404까지 직접 확인.

## 새 작업 체크리스트

새 페이지·기능 추가할 때 빠지기 쉬운 것들:

- [ ] 한국어판 + 영어판 둘 다 만들었나? (`src/app/foo/page.tsx` + `src/app/en/foo/page.tsx`)
- [ ] 내부 `<Link>`에 `prefixed(href, lang)` 썼나? 아니면 영어판에서는 `/en/...` 절대경로?
- [ ] Nav에 노출이 필요한 경로면 `src/components/nav.tsx`에도 추가했나?
- [ ] 새 색·간격은 CSS var 또는 기존 Tailwind 토큰 썼나? 하드코딩 색 안 됨.
- [ ] 다크모드에서 시각 확인했나?
