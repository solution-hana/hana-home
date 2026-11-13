# Changelog

이 프로젝트의 모든 주목할 만한 변경 사항은 이 파일에 문서화됩니다.

형식은 [Keep a Changelog](https://keepachangelog.com/ko/1.1.0/)를 따르며,
이 프로젝트는 [Semantic Versioning](https://semver.org/lang/ko/)을 준수합니다.

## [Unreleased]

## [1.5.2] - 2026-11-13

### Added

- 공지사항(`/support/notice`) 상단에 '태양광 정보' 안내 줄 — 홍보센터의 태양광 정보 글 목록(`/promotion/column`)으로 이동

### Fixed

- 태양광 정보 2번·7번 글의 부처명을 '기후에너지환경부(구 환경부)'로 수정 (2025-10-01 정부조직 개편 반영)

## [1.5.1] - 2026-11-12

### Changed

- 의존성 minor·patch 업데이트 14건 — `@chakra-ui/react` 3.38.0, `@supabase/supabase-js` 2.119.0, `@tanstack/react-query` 5.107.1, `@tiptap/*` 3.33.0, `recharts` 3.10.1, `typescript-eslint` 8.72.1, `eslint-plugin-react-refresh` 0.5.7
- `slick-carousel` 2.0.0 — 메이저 업데이트지만 영향 범위가 좁다. 이 프로젝트는 CSS 두 개(`slick.css`·`slick-theme.css`)만 가져다 쓰고 `react-slick` 은 이 패키지에 의존하지 않는다. 실질 변경은 `.slick-slider` 의 `user-select` 가 `none` → `text` 로 바뀐 것뿐이며, 보완 규칙 `.slick-list.draggable` 은 react-slick 이 해당 클래스를 붙이지 않아 적용되지 않는다. 시공사례 캐러셀은 자동 재생 전용(`arrows`·`dots` 미사용)이라 조작에 영향 없음
- `eslint-plugin-react-hooks` 7.1.1 — `recommended` 가 React Compiler 규칙 14개를 추가로 켜면서 기존 코드에서 error 16건이 발생해 린트가 실패했음(`set-state-in-effect` 13건, `refs` 2건, `purity` 1건). `rules-of-hooks`·`exhaustive-deps` 는 v5 와 같은 수준으로 유지하고 신규 규칙은 warn 으로 내려 단계적으로 수정하도록 `eslint.config.js` 에 명시

## [1.5.0] - 2026-11-11

### Added

- 홍보센터 '태양광 정보' 페이지 (`/promotion/column`) — 질문형 글 19편을 코드 페이지로 추가. 글별 주소·Article 구조화 데이터·프리렌더·사이트맵 경로 포함
- 보안 헤더 (`vercel.json`) — HSTS, nosniff, 프레임 차단, Referrer-Policy, Permissions-Policy. 스크립트·연결 출처를 제한하는 전체 CSP 는 Report-Only 로 추가
- 외부 주소 검사 (`src/shared/utils/url.ts`), 게시글 본문 거르개 (`sanitizeContent`), JSON-LD 이스케이프 (`serializeJsonLd`)
- Dependabot 설정 (`.github/dependabot.yml`)
- 스레드·인스타그램 링크와 소셜 채널 주소
- README 작업 원칙(브랜치 · PR 흐름)

### Fixed

- SMP·REC 시세가 0 으로 보이는 경우 보완 — 가중치·거래량 값이 비어 있을 때의 계산, REC 조회 범위, 조회 실패 시 마지막 정상값 표시

### Security

- 팝업·포트폴리오 링크와 이미지 주소, 게시글 본문의 주소·색상 값을 그리기 전에 검증
- 이미지 올리기 형식 제한(jpg·png·webp·gif·avif), 새 창 링크에 `noopener,noreferrer`
- 브라우저 콘솔에 값을 찍던 디버그 로그 제거

## [1.4.0] - 2026-11-05

### Added

- 빌드 후 프리렌더 파이프라인 (`scripts/prerender.mjs`) — Puppeteer로 전 경로를 실제 렌더링해 정적 HTML로 저장. 시공사례·공지사항처럼 Supabase에서 데이터를 받아오는 페이지도 내용이 채워진 상태로 생성되므로, JS를 실행하지 않는 검색·AI 크롤러가 본문을 읽을 수 있음
- 프리렌더와 사이트맵이 공유하는 경로 모듈 (`scripts/routes.mjs`) — 공지사항 상세 경로는 빌드 시점에 DB에서 조회해 둘이 어긋나지 않도록 구성
- 경로별 SEO 설정 (`src/shared/config/seo.ts`)과 적용 훅 (`src/shared/hooks/useSeo.ts`) — 페이지마다 title·description·canonical·OG 태그를 분리
- 구조화 데이터(JSON-LD) — 전 페이지 `Organization`, 오시는 길 `LocalBusiness`, 자주묻는질문 `FAQPage`. 회사 정보는 `constants.ts`의 기존 상수를 그대로 사용
- OG 공유 이미지 (`public/og-image.jpg`)와 생성 스크립트 (`scripts/generate-og-image.mjs`)
- 404 페이지 정적 생성 (`404.html`)

### Changed

- 사이트맵 수록 URL 6개 → 24개 (전 콘텐츠 경로 + 공지사항 상세)
- robots.txt 정책을 `vite.config.ts`에서 관리 — 관리자·공지 편집기·준비중 경로 `Disallow` 추가, 네이버(Yeti) 크롤러 정책 명시
- `vercel.json` — 부모 경로(`/about`, `/business` 등)를 301 리다이렉트로 전환하고, 전체 경로 rewrite를 관리자·공지 상세로만 한정
- 공지사항 상세 메타데이터를 DB의 제목·본문으로 구성해 글마다 구분되도록 변경
- 빌드·배포 Node 버전을 22 LTS로 고정 (`engines.node`, `.nvmrc`)
- 견적 문의 메일 발송 요청에서 수신자 주소 필드 제거 — Edge Function이 `subject`·`html`만 받고 수신자를 서버에서 고정 처리하도록 변경된 데 맞춤
- ESLint 9 플랫 설정(`eslint.config.js`)으로 전환 — ESLint 9가 `.eslintrc.*`를 읽지 않아 린트가 설정 파일을 찾지 못하고 실패하던 상태를 복구. `typescript-eslint`·`@eslint/js`·`globals`를 명시적 devDependency로 추가하고, lint 스크립트에서 불필요해진 `--ext` 제거
- 타입체크 룰셋(`recommendedTypeChecked`)은 보류하고 `no-explicit-any`를 warn으로 강등 — 설정 오류로 한 번도 실제 적용된 적이 없어 위반 183건(41개 파일)이 누적되어 있어, 린트 게이트를 먼저 통과시킨 뒤 단계적으로 도입
- `sendInquiry`를 `useSendInquiry`로 이름 변경 — `useMutation`을 호출하는 커스텀 훅이므로 훅 네이밍 규칙 적용

### Removed

- 태양광 모듈 청소 페이지에 주석으로 남아 있던 외부 업체 연락처·명함 이미지 — 요구사항에 따라 비노출 처리된 뒤 소스에만 보존되어 있던 정보를 완전히 제거

### Security

- 의존성 보안 취약점 16건(high 15, moderate 1) 해소 — axios, vite, svgo, `@tiptap/core`, brace-expansion 등. `sharp`는 libvips·libheif·librsvg 취약점 해소를 위해 0.35.5로 상향
- 견적 문의 메일 템플릿의 HTML 이스케이프 누락 해소 — 고객이 입력한 이름·연락처·주소·문의 내용이 이스케이프 없이 보간되어 임의 마크업 삽입(HTML 인젝션)이 가능했고, `<`·`&`가 포함된 일반적인 입력에도 메일 레이아웃이 깨졌음

### Fixed

- 모든 하위 페이지의 canonical이 홈(`/`)을 가리켜 색인에서 중복 페이지로 취급되던 문제
- `og:image`에 해당하는 실제 파일이 없어 공유·미리보기 이미지가 HTML로 응답되던 문제
- 존재하지 않는 URL이 404 대신 200을 반환하던 soft 404 문제
- 에디터 툴바·링크 메뉴가 훅 호출보다 앞에서 조기 반환해, `editor`가 준비되는 시점에 훅 개수가 바뀌며 렌더가 깨질 수 있던 문제

## [1.3.0] - 2026-08-27

### Added

- 공통 페이지 레이아웃 컴포넌트 (`PageLayout`) — 헤더, 푸터, 서브히어로, 플로팅 버튼을 한곳에서 구성
- 회사소개 페이지 인증·증명 섹션 (`IntroCert`) — 중소벤처기업 확인서, 품질경영시스템 인증서, 생산물배상책임보험 가입증명서를 그리드로 표시. 이미지는 프로젝트 내부 에셋(`src/assets/images/cert/`)을 사용

### Changed

- `PageLayout`을 메인, 회사소개, 사업소개, 시공사례, 홍보, 고객센터 페이지에 적용. 페이지마다 헤더·푸터·서브히어로를 반복하던 구조를 제거하고, 본문이 짧아도 푸터가 화면 하단에 유지되도록 개선. 라우트 변경 시 스크롤 초기화도 레이아웃에서 일괄 처리
- 팝업창 컴포넌트 스타일 수정 — 모서리 라운드, 그림자·테두리, 하단 버튼 정렬 및 순서
- 회사소개 페이지 전반 UI 수정 — 인증 섹션 추가에 맞춰 인사말, 비전, 핵심가치 등 섹션 스타일 정리

### Fixed

- 서브히어로 섹션 높이 기본값 수정

## [1.2.0] - 2026-08-04

### Added

- 관리자 시공사례 관리 대시보드 및 라우트 연결
- 시공사례 공통 컴포넌트

### Changed

- 시공사례 페이지 리팩토링 및 메인 페이지 조회 로직 개선
- 시공사례 타입 정의 정리 및 하드코딩 데이터 제거

### Fixed

- 팝업 관리 대시보드 스타일 수정

### Removed

- 미사용 리소스

## [1.1.0] - 2026-07-27

### Added

- 관리자 대시보드, 사이드바, 인증(세션 토큰 검증) 및 관리자 라우트
- 팝업 표시/숨기기(로컬 스토리지) 및 관리자 팝업 CRUD·미리보기
- 헤더 로그아웃·설정 아이콘
- 이미지 업로드 경로 설정 (`useBucket` 통합)

### Changed

- 회사 주소 상수 수정 (부안읍 → 행안면)
- Chakra UI 등 의존성 패키지 업데이트

### Fixed

- 이미지 업로드 경로 인자 필수화

## [1.0.0] - 2026-04-10

### Added

- 하나솔루션 홈페이지 초기 공개 릴리스 (Vite + React + TypeScript + Supabase)
- 메인·회사소개·사업소개(RE100, RPS, PPA, 가정용·주차장 태양광, 리파워링, 청소모듈 등)·시공사례·고객센터
- SMP/REC 시세 인사이트, 예상 수익계산기, 견적문의(메일 전송·봇 방지)
- 공지사항·게시판 및 Tiptap 기반 에디터(이미지 업로드 포함)
- 로그인, 네이버 지도, SEO(메타·사이트맵)·이미지 최적화, README

### Fixed

- 링크·버튼 스타일, 견적문의 노출 조건, SEO 및 요청사항 반영

[unreleased]: https://github.com/jae-yon/hana-home/compare/v1.3.0...HEAD
[1.3.0]: https://github.com/jae-yon/hana-home/compare/v1.2.0...v1.3.0
[1.2.0]: https://github.com/jae-yon/hana-home/compare/v1.1.0...v1.2.0
[1.1.0]: https://github.com/jae-yon/hana-home/compare/v1.0.0...v1.1.0
[1.0.0]: https://github.com/jae-yon/hana-home/releases/tag/v1.0.0
