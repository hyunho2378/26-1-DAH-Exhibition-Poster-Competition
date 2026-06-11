# PROGRESS.md — 진행 상태 추적

> 418 I'M A NOT TEAPOT — 2026-1 디지털인문예술전공 전시 사이트
> 마지막 업데이트: 2026-05-22 대규모 리워크 (Bodoni Moda/GSAP제거/커서재작성/About영문화)

---

## 현재 단계: 2026-05-22 세션2 — 인터랙션/비주얼 리워크 완료

---

## PHASE 1 — 프로젝트 부트스트랩

| 항목 | 상태 | 메모 |
|---|---|---|
| Vite + React 18 초기화 | ⬜ 대기 | |
| Tailwind CSS 설치 + 설정 | ⬜ 대기 | |
| tokens.js 생성 | ⬜ 대기 | DESIGN.md 기준 |
| Pretendard + SUIT 폰트 CDN 연결 | ⬜ 대기 | index.html |
| React Router v6 설치 | ⬜ 대기 | |
| 기본 폴더 구조 생성 | ⬜ 대기 | COMPONENTS.md 기준 |
| vercel.json SPA fallback 설정 | ⬜ 대기 | |
| works.js 데이터 파일 생성 (19개 슬롯) | ⬜ 대기 | 이미지 경로 포함 |
| 전역 CSS 초기화 + 커스텀 커서 CSS | ⬜ 대기 | |

---

## PHASE 2 — 레이아웃 & 공통 컴포넌트

| 항목 | 상태 | 메모 |
|---|---|---|
| Layout.jsx | ⬜ 대기 | 우측 헤더 공간 확보 |
| Header.jsx (데스크탑 우측 세로) | ⬜ 대기 | NavLink 4개 |
| Header.jsx (모바일 상단) | ⬜ 대기 | 햄버거 버튼 |
| MobileMenu.jsx (전체화면 오버레이) | ⬜ 대기 | |
| CustomCursor.jsx | ⬜ 대기 | useCustomCursor 훅 |
| PageTransition.jsx | ⬜ 대기 | opacity fade |
| ScrollToTop.jsx | ⬜ 대기 | |
| Button.jsx (primary/ghost/text) | ⬜ 대기 | |
| AwardBadge.jsx | ⬜ 대기 | |
| SectionLabel.jsx | ⬜ 대기 | |
| Divider.jsx | ⬜ 대기 | |
| BackLink.jsx | ⬜ 대기 | |
| PageHeader.jsx | ⬜ 대기 | |
| ComingSoon.jsx | ⬜ 대기 | |
| PosterSkeleton.jsx | ⬜ 대기 | |

---

## PHASE 3 — 포스터 컴포넌트

| 항목 | 상태 | 메모 |
|---|---|---|
| PosterImage.jsx (png/gif 분기) | ⬜ 대기 | |
| PosterCard.jsx | ⬜ 대기 | A2 비율, hover scale |
| PosterGrid.jsx (반응형 2/3/4/5컬럼) | ⬜ 대기 | stagger 진입 |
| PosterDetail.jsx (2컬럼 상세) | ⬜ 대기 | 이전/다음 네비 포함 |

---

## PHASE 4 — 페이지 구현

| 항목 | 상태 | 메모 |
|---|---|---|
| AboutPage.jsx | ⬜ 대기 | HeroSection + Info + SelectedWorks |
| HeroSection.jsx | ⬜ 대기 | 418 대형 타이포 |
| ExhibitionInfo.jsx | ⬜ 대기 | 2컬럼 인포 |
| SelectedWorks.jsx | ⬜ 대기 | 수상작 미리보기 |
| ContentPage.jsx | ⬜ 대기 | 19개 전체 그리드 |
| ContentDetailPage.jsx | ⬜ 대기 | 라우트 파라미터 처리 |
| AwardPage.jsx | ⬜ 대기 | 등급별 섹션 |
| AwardSection.jsx | ⬜ 대기 | |
| GalleryPage.jsx | ⬜ 대기 | 장소 안내 + Coming Soon |
| ExhibitionVenueCard.jsx | ⬜ 대기 | |
| GalleryGrid.jsx | ⬜ 대기 | Coming Soon 상태 |
| NotFoundPage.jsx | ⬜ 대기 | 418 유머 활용 |

---

## PHASE 5 — 이미지 & 데이터

| 항목 | 상태 | 메모 |
|---|---|---|
| 포스터 이미지 19개 추가 | ⬜ 대기 | public/images/works/ |
| works.js 실제 데이터 입력 | ⬜ 대기 | 작가명, 작품명, 수상 여부 |
| 썸네일 최적화 (WebP 변환 권장) | ⬜ 대기 | 선택사항 |

---

## PHASE 6 — 마무리 & 배포

| 항목 | 상태 | 메모 |
|---|---|---|
| prefers-reduced-motion 처리 검증 | ⬜ 대기 | |
| 접근성 검증 (alt, aria, focus) | ⬜ 대기 | |
| 반응형 브레이크포인트 검증 | ⬜ 대기 | 320 / 390 / 768 / 1024 / 1280 |
| 커스텀 커서 touch 기기 숨김 확인 | ⬜ 대기 | |
| Vercel 배포 | ⬜ 대기 | |
| 도메인 연결 (선택) | ⬜ 대기 | |
| Lighthouse 성능 측정 | ⬜ 대기 | 목표 90+ |

---

## PHASE 6 — 모션 & 비주얼 리워크 (GSAP)

| 항목 | 상태 | 메모 |
|---|---|---|
| GSAP 설치 + 중앙화 | ✅ 완료 | gsap@3.15.0, lib/gsap.js (gsap+ScrollTrigger+SplitText), hooks/useGsapContext.js |
| SplitText 사용 가능 확인 | ✅ 완료 | 3.15 무료 포함, gsap/SplitText named export |
| Fraunces 세리프 추가 | ✅ 완료 | index.html CDN, tailwind serif + display-hero, tokens.js |
| CustomCursor 라인/트레일 재작성 | ✅ 완료 | SVG polyline 트레일(체인 lerp 0.35) + 코어점, VIEW 라벨, mix-blend difference, data-cursor="poster"/"text" |
| Marquee.jsx | ✅ 완료 | fonts.ready 후 측정, x축 무한 루프 ~30s, reduced-motion 정지 |
| RevealText.jsx | ✅ 완료 | SplitText 줄 분해 + 마스크 wipe, immediate/ScrollTrigger, reduced-motion 즉시표시 |
| RevealImage.jsx | ✅ 완료 | clip-path inset + scale 1.1→1, delay prop, 에러 플레이스홀더 포함 |
| HeroSection 재작업 | ✅ 완료 | Marquee + Fraunces display-hero, NOT italic, WONK 1, RevealText immediate |
| PosterCard GSAP 호버 | ✅ 완료 | RevealImage 교체, scale 1.04 power2.out, 정보 y-4, data-cursor="poster" |
| PosterGrid stagger | ✅ 완료 | RevealImage delay = index*0.06 (≤1.2s)로 stagger 마스크 reveal |
| PageTransition wipe | ✅ 완료 | 라우트 key 변경 시 opacity+y, power3.inOut 0.4s |
| PageHeader Fraunces | ✅ 완료 | 영문 타이틀 font-serif (display-lg 크기 유지) |
| build 검증 | ✅ 완료 | vite build 성공 (1786 modules), 전 라우트 200 + 모듈 transform 정상 |
| 브라우저 시각 검증 | ⬜ 대기 | 코드/빌드 검증만 완료 — 실제 모션·커서·reveal 육안 확인 필요 |

---

## 리워크 — 폰트/About 재구성/헤더/커서/데이터 (2026-05-22)

| 항목 | 상태 | 메모 |
|---|---|---|
| works.js 신규 데이터 | ✅ 완료 | 사용자가 덮어씀. studentId/department/aiContribution/슬러그, 원문 \n 보존, id19 carousel |
| PosterDetail AI 기여 분리 | ✅ 완료 | "작품 소개"/"AI 활용 및 학생의 기여" 소제목 분리, whitespace-pre-line, null 숨김 |
| AI 머리말 중복 제거 | ✅ 완료 | id04·05(주현호) "3. AI 활용 및 학생의 기여" 머리말만 제거 (검증 통과, 타 작품 원문 보존) |
| About 5섹션 재구성 | ✅ 완료 | Hero / ThemeStatement(신규) / ExhibitionInfo / ViewWorksCTA(신규) / 보조 nav. SelectedWorks 삭제 |
| ThemeStatement 카피 | 🔄 검수대기 | 주제문 초안 작성됨 — 사용자 검수/교체 필요 |
| ViewWorksCTA | ✅ 완료 | 초대형 Fraunces "VIEW ALL WORKS ↗" → /content, "19 works · 19 students" |
| 폰트 강제 체크리스트 | ✅ 완료 | Hero 부제 Pretendard 500+자간, PageHeader Fraunces display-2xl, VIEW ALL WORKS/마퀴/상세 작품번호 Fraunces |
| 헤더 재작성 (회전 제거) | ✅ 완료 | DESIGN 6장/IA 8장 갱신본: 좌상단 로고 + 우상단 가로 스택 메뉴. writing-mode/rotate 제거. Layout/Footer pr-20 제거 |
| CustomCursor 두껍게 | ✅ 완료 | 코어 10px(호버18)/트레일 stroke 3.5px·12점/lerp 0.55·0.45, VIEW Fraunces italic 13px |
| 장식 요소 | ✅ 완료 | CircleText(회전 원형텍스트, motion-safe) 1개 + 섹션 구분 마퀴 1개 |
| 성능 패스 | ✅ 완료 | 그리드 stagger 0.05, transform/opacity/clip-path만, reduced-motion/touch 폴백 |
| build/transform 검증 | ✅ 완료 | vite build 성공(1787 modules), 전 라우트 200, 신규 모듈 transform 정상 |
| 60fps·브라우저 육안 검증 | ⬜ 대기 | 헤드리스 환경 측정 불가 — 실기기 dev 확인 필요 |

---

## 대규모 리워크 — Bodoni Moda/GSAP제거/커서/About영문화 (2026-05-22)

| 항목 | 상태 | 메모 |
|---|---|---|
| 폰트 전환: Fraunces → Bodoni Moda | ✅ 완료 | index.html CDN, tailwind.config.js, tokens.js. opsz 96 이하, WONK 축 제거 |
| GSAP 완전 제거 | ✅ 완료 | npm uninstall gsap, lib/gsap.js·useGsapContext.js 삭제 |
| RevealText/RevealImage 삭제 | ✅ 완료 | FadeIn.jsx(IntersectionObserver)로 대체 |
| Marquee CSS 재작성 | ✅ 완료 | @keyframes marqueeSlide translateX, prefers-reduced-motion 정지 |
| PageTransition CSS 재작성 | ✅ 완료 | rAF opacity+transform, GSAP 제거 |
| PosterCard CSS 호버 | ✅ 완료 | group-hover:scale-[1.03] transition 400ms, GSAP 제거 |
| ExhibitionInfo 영문화 + FadeIn | ✅ 완료 | PERIOD/AWARDS/VENUE, ₩표기, 1st-year students |
| HeroSection Bodoni Moda + FadeIn | ✅ 완료 | opsz 96, wght 700, WONK 제거 |
| ThemeStatement → Statement.jsx | ✅ 완료 | 영문 카피, FadeIn, CircleText 유지 |
| ViewWorksCTA FadeIn + 부제 제거 | ✅ 완료 | 19 works 텍스트 삭제, opsz 96 |
| AboutPage 섹션 순서 재배치 | ✅ 완료 | Hero→Statement→ViewWorksCTA→ExhibitionInfo→SecondaryNav |
| CustomCursor 점 제거, 긴 라인 | ✅ 완료 | 20pt, lerp 0.15, stroke 1.5px/2.5px, dot 완전 제거 |
| PageHeader opsz 96 | ✅ 완료 | 120→96 (Bodoni Moda 최대값) |
| build 검증 | ✅ 완료 | vite build 성공(1779 modules), GSAP 0KB |
| 브라우저 육안 검증 | ⬜ 대기 | 실기기 확인 필요 |

---

## 마진 축소 + 푸터 개편 + 그리드 (2026-05-22)

| 항목 | 상태 | 메모 |
|---|---|---|
| tokens.js pagePadding 추가 | ✅ 완료 | px-4/md:px-6/lg:px-10/2xl:px-12, maxWidth 1440px로 변경 |
| AboutPage 마진 + max-width 제거 | ✅ 완료 | px-4 md:px-6 lg:px-10 2xl:px-12, max-w/mx-auto 삭제 |
| ContentPage 마진 + max-width 제거 | ✅ 완료 | 동일 |
| AwardPage 마진 + max-width 제거 | ✅ 완료 | 동일 |
| GalleryPage 마진 + max-width 제거 | ✅ 완료 | 동일 |
| HeroSection pt/pb 재설정 | ✅ 완료 | pt-20 pb-16 / md:pt-28 md:pb-20, 마퀴 음수 마진 토큰 기준 |
| Footer 좌우 교체 + DAH SVG 로고 | ✅ 완료 | 좌=DAH SVG인라인(fill currentColor #555→hover #f0f0f0)+링크 / 우=텍스트블록 |
| PosterGrid 컬럼 축소 | ✅ 완료 | 2/3/3/4 (xs:2 md:3 lg:3 xl:4), 5컬럼 제거 |
| PosterDetail 내부 px 교체 | ✅ 완료 | px-4 md:px-6 lg:px-10 (3개 패널 전부) |
| build 검증 | ✅ 완료 | vite build 1779 modules, 오류 없음 |

---

## 이미지 최적화 + 헤더 텍스트 (2026-05-22)

| 항목 | 상태 | 메모 |
|---|---|---|
| 이미지 최적화 스크립트 | ✅ 완료 | scripts/optimize-images.mjs (sharp), PNG→webp thumb/full, GIF→animated webp |
| 19개 PNG → webp 변환 | ✅ 완료 | 원본 PNG 보존. thumb 최대 600×850px, full 최대 1200×1700px |
| heunyeol GIF(351MB) → animated webp | ✅ 완료 | heunyeol-anim.webp 14MB (96% 감소), ffmpeg lossy 65 |
| works.js 이미지 경로 webp 갱신 | ✅ 완료 | thumbnail/full 모두 .webp. id19 carousel images도 .webp |
| PosterImage.jsx webp+fallback | ✅ 완료 | `<picture>` webp source + toPngFallback. gif type은 plain img |
| PosterCard.jsx webp+fallback | ✅ 완료 | inline PosterImg, `<picture>` webp + .png fallback |
| 헤더 로고 크기 확대 | ✅ 완료 | "418" 20→28px, 부제 12→13px |
| 헤더 네비 텍스트 확대 | ✅ 완료 | 14→15px, weight 600→700 |
| build 검증 | ✅ 완료 | vite build 1779 modules, 오류 없음 |

---

## 인터랙션/비주얼 리워크 (2026-05-22 세션2)

| 항목 | 상태 | 메모 |
|---|---|---|
| Header absolute (스크롤 함께 올라감) | ✅ 완료 | fixed → absolute, background/blur/radius 제거 |
| ScrambleText.jsx 신규 | ✅ 완료 | runSignal prop, startDelay, 좌→우 순차 확정 |
| Hero 타이틀 디코딩 효과 | ✅ 완료 | 3개 ScrambleText, hover 재디코딩, runSignal |
| 마퀴 ARTS 먼저 수정 | ✅ 완료 | "DIGITAL ARTS AND HUMANITIES" |
| TeapotTypo 스크롤 속도 절반 이하 | ✅ 완료 | ih×0.7 → ih×1.8 |
| TeapotTypo center-drift 제거 | ✅ 완료 | tx/ty 삭제, scale만, transformOrigin bottom-right |
| TeapotTypo 글리치 글자 | ✅ 완료 | DOM 직접 접근, setTimeout 80ms, React 재렌더 없음 |
| TeapotTypo 모바일 표시 | ✅ 완료 | block, getBaseScale(iw/580) |
| ENTER EXHIBITION 스크롤 연동 | ✅ 완료 | scroll listener, DOM 직접 업데이트, transition 없음 |
| ExhibitionInfo 1st-year 같은 줄 | ✅ 완료 | inline span, marginLeft 6px |
| Statement 구조 개편 | ✅ 완료 | Human Touch 상단 → 설명 → 인용구 우하단 |
| L-HUSS × DAH 중간 표기 | ✅ 완료 | AboutPage Statement↔ViewWorksCTA 사이 |
| Footer L-HUSS 좌측 이동 | ✅ 완료 | DAH 로고 아래 |
| FloatingWords.jsx 신규 | ✅ 완료 | 9개 단어, CSS floatGlitch 애니메이션, HeroSection 내 |
| floatGlitch keyframe | ✅ 완료 | index.css 추가 |
| build 검증 | ✅ 완료 | vite build 1779 modules, 오류 없음 |
| 브라우저 육안 검증 | ⬜ 대기 | 실기기 확인 필요 |

---

## UI 디테일 전면 정리 (2026-05-22)

| 항목 | 상태 | 메모 |
|---|---|---|
| PosterCard 카드 번호 두껍게 | ✅ 완료 | 11px→15px, weight 700, 라임 유지 |
| PosterCard 작품명 두껍게 | ✅ 완료 | 13px→15px, weight 600 |
| PosterCard 작가명 두껍게 | ✅ 완료 | weight 500, #ccc |
| PosterDetail 작품 번호 화이트 | ✅ 완료 | text-accent→text-text-primary |
| PosterDetail 작품명 라임 | ✅ 완료 | text-text-primary→text-accent |
| PosterDetail 작가명 두 줄 분리 | ✅ 완료 | author(600 #f0f0f0 16px) + department(400 #999 13px) |
| PosterDetail 소제목 밝게 | ✅ 완료 | #999 700 13px uppercase |
| PosterDetail 본문 #ccc | ✅ 완료 | color #cccccc |
| PosterDetail 작품목록 상단 이동 | ✅ 완료 | BackLink → 작품 번호 위로 |
| HeroSection scroll 인디케이터 제거 | ✅ 완료 | ArrowDown import도 제거 |
| ViewWorksCTA "ALL" 제거 | ✅ 완료 | "VIEW ALL WORKS" → "VIEW WORKS" |
| ExhibitionInfo 여백 확대 | ✅ 완료 | py-12 md:py-16 → py-16 md:py-24 |
| ExhibitionInfo team→recipient | ✅ 완료 | 3개 항목 전부 |
| GalleryPage subtitle 제거 | ✅ 완료 | PageHeader subtitle prop 삭제 |
| GalleryPage VenueCard 제거 | ✅ 완료 | ExhibitionVenueCard + Divider import/사용 삭제 |
| Header 배경 블러 | ✅ 완료 | fixed inset-x-0 h-[70px] z-[99] rgba(10,10,10,0.85) blur(12px) |
| Header 좌우 padding 정렬 | ✅ 완료 | 로고/메뉴 p-10→px-4 md:px-6 lg:px-10 2xl:px-12 pt-4 |
| build 검증 | ✅ 완료 | vite build 1778 modules, 오류 없음 |

---

## 상태 범례

```
⬜ 대기    — 아직 시작 안 함
🔄 진행중  — 현재 작업 중
✅ 완료    — 구현 완료
🐛 버그    — 알려진 이슈
⏸ 보류    — 의도적으로 미룸
```

---

## 이슈 로그

| 날짜 | 이슈 | 상태 |
|---|---|---|
| - | - | - |

---

## 결정 사항 로그 (ADR)

| 날짜 | 결정 | 이유 |
|---|---|---|
| 초기 | 라우트 기반 상세 페이지 (모달 아님) | URL 공유 가능, 브라우저 히스토리 자연스러움 |
| 초기 | GIF 자동재생, loop | 전시 작품 특성상 작가의 의도 그대로 표현 |
| 초기 | works.js 정적 데이터 | 19개 고정 작품, 서버 불필요 |
| PHASE6 | Fraunces 세리프 추가 (영문 디스플레이) | synchronized 고급 톤 재현, WONK축=Human Touch 주제 일치 |
| PHASE6 | GSAP + ScrollTrigger + SplitText 풀 도입 | 마스크 reveal/마퀴/스크롤 등장 질감 재현 |
| PHASE6 | 커스텀 커서 라인/트레일형으로 전면 교체 | 점+링은 평범함, synchronized식 흐르는 선 |

---

## PHASE 6 — 모션 & 비주얼 리워크 (synchronized 톤)

| 항목 | 상태 | 메모 |
|---|---|---|
| GSAP 설치 (gsap, ScrollTrigger, SplitText) | ⬜ 대기 | npm i gsap |
| Fraunces CDN 추가 + tokens 폰트 갱신 | ⬜ 대기 | index.html, tokens.js |
| lib/gsap.js (플러그인 등록 중앙화) | ⬜ 대기 | |
| useGsapContext.js (cleanup 훅) | ⬜ 대기 | gsap.context + revert |
| CustomCursor 라인/트레일형 재작성 | ⬜ 대기 | polyline 체인 lerp |
| Marquee.jsx | ⬜ 대기 | About 상단 1줄 |
| RevealText.jsx (SplitText 마스크) | ⬜ 대기 | |
| RevealImage.jsx (clip-path 오픈) | ⬜ 대기 | |
| HeroSection 재작업 (display-hero, reveal) | ⬜ 대기 | 초대형 Fraunces |
| PosterCard/Grid 호버·stagger GSAP 전환 | ⬜ 대기 | |
| PageTransition wipe 전환 | ⬜ 대기 | |
| reduced-motion 전체 폴백 검증 | ⬜ 대기 | |
| 모바일 성능 폴백 (마퀴/트레일 감소) | ⬜ 대기 | |