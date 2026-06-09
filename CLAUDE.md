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
