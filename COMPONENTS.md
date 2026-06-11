# COMPONENTS.md — 컴포넌트 정의

> 418 I'M A NOT TEAPOT — B형 반응형 웹
> 모든 컴포넌트는 tokens.js 기반, TypeScript 금지, JSX만 사용

---

## 1. 레이아웃 컴포넌트

### `Layout` — `src/components/layout/Layout.jsx`
```
전체 앱 래퍼.
- 우측 상단 헤더 포함 (데스크탑) — 글자 회전 금지, 정상 가로
- 모바일 상단 헤더 포함
- 라인 트레일 커스텀 커서 마운트
- 페이지 콘텐츠 영역 (좌우 px-6/px-10/px-16 반응형)
  · 우측 헤더는 상단 모서리에만 fixed → 전체 right-padding 80px 불필요
  · 단 각 페이지 상단 영역이 우측 메뉴와 겹치지 않게 상단 우측 여백만 확보
Props: children
```

### `Footer` — `src/components/layout/Footer.jsx`
```
모든 페이지 공통 하단 푸터. Layout.jsx에서 렌더.

[레이아웃]
  - 데스크탑: 2컬럼 (좌: 텍스트 블록 / 우: DAH 링크)
  - 모바일: 1컬럼 (좌측 텍스트 → DAH 링크 순)
  - border-top: 1px solid #1f1f1f
  - padding: py-8 (모바일) / py-10 (데스크탑)
  - 좌우 패딩: px-6 / px-10 / px-16 (본문과 동일)

[좌측 텍스트 — caption, #555555]
  한림대학교 디지털인문예술전공 학생회 CUBE
  강원특별자치도 춘천시 한림대학길 1 일송기념도서관 4층 C.SQUARE
  웹사이트 제작/수정 문의: 주현호 (h20222583@glab.hallym.ac.kr)

[우측 링크]
  텍스트: "Hallym University  DAH"
  href: https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0
  target="_blank" rel="noopener noreferrer"
  스타일: caption, #999999 → hover #f0f0f0, transition 200ms
  ExternalLinkIcon (lucide-react, 10px) 우측에 병기

Props: 없음
```

### `Header` — `src/components/layout/Header.jsx`
```
중요: 메뉴 글자를 90도 회전/세로쓰기 하지 마라.
레퍼런스 헤더는 정상 가로 텍스트가 우측 상단에 위→아래로 쌓인 형태다.

[데스크탑] fixed top-0 right-0, padding 40px, text-align right
  - 좌상단(별도): 로고 "418 / I'M NOT A TEAPOT" 약자, 정상 가로
  - 우상단: NavLink 4개 (About/Content/Award/Gallery)
    · 각 줄 정상 가로 텍스트, 우측 정렬, 세로로 나열
    · writing-mode/rotate 금지
    · 대문자, letter-spacing 0.02em, line-height 1.5~1.7
  - active 링크: #C8E63C 텍스트(또는 좌측 도트), 나머지 #999999 → hover #f0f0f0
  - 배경 투명 (border 없음)

[모바일] fixed top-0, full width, h-14
  - 좌: "418" 텍스트 로고 (가로)
  - 우: 햄버거 버튼 (Menu, lucide-react)
Props: 없음 (내부에서 useLocation)
```

### `MobileMenu` — `src/components/layout/MobileMenu.jsx`
```
전체화면 오버레이 메뉴 (모바일 전용)
- 배경: #0a0a0a, opacity transition
- 메뉴 항목: display-xl 크기, 중앙 정렬, stagger 애니메이션
- 닫기: X 버튼 또는 항목 클릭 시
Props: isOpen, onClose
```

### `CustomCursor` — `src/components/ui/CustomCursor.jsx`
```
라임 화살표 + 짧은 트레일. 데스크탑만, touch/reduced-motion 시 기본커서
- 레이어1 화살표: 일반 화살표 모양, #C8E63C(라임), 마우스 즉시 추종(지연 0)
  · 원/점 아님. CSS cursor:url(라임 화살표 svg) 또는 SVG 화살표 즉시 추종
- 레이어2 트레일: SVG polyline, 좌표 8~10개(짧게), 체인 lerp 0.3~0.4(빠르게)
  · stroke 1.5~2px, #C8E63C, opacity 0.6~0.8, linecap round
  · 멈추면 화살표 지점에 모임 (원 수렴 아님)
- 포스터 위: 화살표 옆 "VIEW"(DM Serif Display italic 13px) 페이드인
- requestAnimationFrame 단일 루프
- mix-blend-mode: difference
변경점: 이전보다 트레일 길이 절반, 추종 2배 빠르게, 화살표 추가
State/Ref: 좌표 배열, hoverType('default'|'poster')
```

### `Marquee` — `src/components/ui/Marquee.jsx`
```
반복 텍스트 무한 마퀴 (CSS only, GSAP 아님)
- text 반복, DM Serif Display 대형, opacity 0.15~0.25
- CSS @keyframes translateX 무한 루프, transform translate3d + will-change
- prefers-reduced-motion: 정지
- 성능 부담 시 제거 가능 (선택 요소)
Props: text, speed, opacity, fontSize
```

### `FadeIn` — `src/components/ui/FadeIn.jsx`
```
RevealText/RevealImage를 대체하는 단일 경량 컴포넌트
- IntersectionObserver로 진입 시 1회 fade-in (opacity 0→1, translateY 12px→0)
- duration 0.4~0.5s, ease-out, once
- GSAP/SplitText/clip-path 사용 안 함
- reduced-motion: 즉시 표시
- immediate prop이면 마운트 즉시 재생 (Hero용)
Props: children, immediate, delay, className
※ 이전 RevealText, RevealImage는 삭제하고 이 컴포넌트로 통합
```

### `PageTransition` — `src/components/layout/PageTransition.jsx`
```
라우트 전환 시 overlay wipe 또는 opacity fade (0.4s)
- 새 페이지 콘텐츠 마스크 reveal로 진입
- React Router v6 location key 기반
Props: children
```

---

## 2. 공통 UI 컴포넌트

### `Button` — `src/components/ui/Button.jsx`
```
variant: 'primary' | 'ghost' | 'text'
size: 'sm' | 'md' | 'lg'

primary: bg #C8E63C, text #0a0a0a, hover bg #A8C230
ghost: border #2a2a2a, text #f0f0f0, hover border #3a3a3a bg #141414
text: text #999999, hover text #f0f0f0, 언더라인 width 애니메이션

Props: variant, size, onClick, href, children, disabled, className
```

### `AwardBadge` — `src/components/ui/AwardBadge.jsx`
```
type: 'grand' | 'excellence' | 'encouragement'

grand:        border #C8E63C, text #C8E63C, bg rgba(200,230,60,0.05)
excellence:   border #888, text #ccc, bg transparent
encouragement: border #555, text #999, bg transparent

라벨: 최우수상 / 우수상 / 장려상
크기: caption, px-3 py-1, border-radius 2px
Props: type
```

### `SectionLabel` — `src/components/ui/SectionLabel.jsx`
```
섹션 제목 레이블 (예: "Selected Works", "Info")
- 스타일: caption 크기, letter-spacing 0.15em, uppercase
- 색상: #555555
- 좌측 작은 라인 또는 번호 선택 가능
Props: children, number (선택)
```

### `Divider` — `src/components/ui/Divider.jsx`
```
1px solid #1f1f1f 수평선
Props: className
```

### `BackLink` — `src/components/ui/BackLink.jsx`
```
← [텍스트] 링크
- ArrowLeftIcon (lucide-react)
- body-sm, #999999, hover #f0f0f0
Props: to, children
```

---

## 3. 포스터 관련 컴포넌트

### `PosterCard` — `src/components/poster/PosterCard.jsx`
```
포스터 그리드에서 사용하는 카드 단위

[레이아웃]
  - 이미지 컨테이너: aspect-ratio 1/1.414 (A2 비율), overflow hidden, border-radius 4px
  - 하단 정보 영역: 번호 + 작가명 + 작품명

[스타일]
  - 배경: #141414
  - border: 1px solid #1f1f1f
  - hover: border-color #2a2a2a, image scale(1.02, transition 250ms)
  - 번호: caption, #C8E63C, SUIT
  - 작품명: body-sm, #f0f0f0
  - 작가명: caption, #999999

[상태]
  - 수상작: AwardBadge 이미지 우상단 오버레이

Props: work (id, title, author, type, thumbnail, award)
       onClick (선택, 없으면 Link로 동작)
```

### `PosterGrid` — `src/components/poster/PosterGrid.jsx`
```
포스터 카드 그리드 래퍼
- 2 / 3 / 4 / 5 컬럼 (xs/md/lg/2xl)
- gap-4 (모바일), gap-6 (데스크탑)
- stagger 진입 애니메이션 (IntersectionObserver, 1회만)
Props: works[], showAward (선택)
```

### `PosterDetail` — `src/components/poster/PosterDetail.jsx`
```
작품 상세 뷰 (2컬럼)

[좌측 이미지 패널]
  - 포스터 원본 표시, max-height 90vh
  - GIF: autoPlay, loop, 컨트롤 없음
  - PNG: img 태그

[우측 정보 패널]
  - 번호 (display-lg, #C8E63C)
  - 작품명 (heading-xl)
  - 작가명 (body-lg, #999)
  - 작품 설명 (body-md, 있을 경우)
  - AwardBadge (있을 경우)
  - BackLink

[하단 네비게이션]
  - 이전/다음 작품 화살표 버튼

Props: work, prevWork, nextWork
```

### `PosterImage` — `src/components/poster/PosterImage.jsx`
```
이미지/GIF를 type에 따라 적절하게 렌더링하는 래퍼
- png: <img loading="lazy" alt="작가명 - 작품명" />
- gif: <img loading="lazy" /> (GIF는 자동 재생됨)
- 스켈레톤 로딩 상태 포함
Props: src, type, alt, className
```

---

## 4. About 페이지 전용 컴포넌트

### `HeroSection` — `src/components/about/HeroSection.jsx`
```
전시명 대형 표시 (뷰포트 1개 채움)
- "418: I'M NOT A TEAPOT" → DM Serif Display display-hero, "NOT"만 italic
- 부제 → Pretendard weight 500, #999999 (영문)
- 상단 Marquee 1줄 (CSS)
- FadeIn(immediate)
- 하단 스크롤 인디케이터 "scroll ↓"
```

### `Statement` — `src/components/about/Statement.jsx`
```
전시 주제 서술 섹션 (뷰포트 1개) — 전부 영어
- 큰 영문 문장 (예시, 추후 수정):
  "In a digital age that demands mechanical perfection,
   this exhibition proves the warmth of being human —
   the trace that never gets erased."
- "HUMAN TOUCH" 대형 DM Serif Display 강조
- 좌우 비대칭 여백 레이아웃
- 회전 별/circle-text 장식 1개 (CSS)
- FadeIn 스크롤 진입
※ 파일명 ThemeStatement → Statement로 정리 (선택)
```

### `ViewWorksCTA` — `src/components/about/ViewWorksCTA.jsx`
```
초대형 작품 진입 링크 (뷰포트 1개)
- 화면 채우는 DM Serif Display 초대형 "VIEW ALL WORKS ↗"
- 호버 시 색/언더라인 변형
- 부가 텍스트 없음 ("19 works · 19 students" 삭제)
- Link → /content
- data-cursor="poster"
```

### `ExhibitionInfo` — `src/components/about/ExhibitionInfo.jsx`
```
전시 정보 3컬럼 (About 맨 하단, 전부 영어)
- PERIOD / AWARDS / VENUE
  · PERIOD: 2026.5.25 — 6.05 (2 weeks)
  · AWARDS: Grand Prize 1 team ₩300,000 / Excellence 3 teams ₩200,000 /
            Encouragement 1 team ₩100,000 / * 1st-year students
  · VENUE: Hallym University / Ilsong Library 4F C.Square
- 영문 라벨: DM Serif Display 또는 SUIT 대문자
- 단순 FadeIn (stagger 없음)
```

---

## 5. Award 페이지 전용 컴포넌트

### `AwardSection` — `src/components/award/AwardSection.jsx`
```
수상 등급 단위 섹션
- SectionLabel (최우수상, 우수상, 장려상)
- 수상 정보: 상금, 인원
- 수상작 PosterCard (크기 조정)
Props: type, prize, count, works[]
```

---

## 6. Gallery 페이지 전용 컴포넌트

### `ExhibitionVenueCard` — `src/components/gallery/ExhibitionVenueCard.jsx`
```
전시 장소/일정 카드
- 배경: #111111, border #1f1f1f
- 아이콘: MapPinIcon, CalendarIcon (lucide-react)
- 장소: 한림대학교 일송기념도서관 4층 C.Square
- 기간: 2026.5.25. ~ 6.5.
```

### `GalleryGrid` — `src/components/gallery/GalleryGrid.jsx`
```
현장 사진 그리드 (향후 업데이트 예정)
- 현재: ComingSoon 상태 표시
- 향후: 균등 그리드 or 마소너리
Props: photos[] (빈 배열이면 ComingSoon)
```

### `ComingSoon` — `src/components/ui/ComingSoon.jsx`
```
콘텐츠 준비중 플레이스홀더
- 텍스트: "Coming Soon"
- caption 크기, #555555
- 점선 border 박스
Props: message (선택)
```

---

## 7. 공통 페이지 헤더

### `PageHeader` — `src/components/ui/PageHeader.jsx`
```
각 페이지 최상단 제목 영역
- 페이지명 (display-lg, SUIT)
- 서브 설명 (body-md, #999, 선택)
- 하단 Divider
Props: title, subtitle (선택), count (선택, "19 Works" 등)
```

---

## 8. 스켈레톤 / 로딩

### `PosterSkeleton` — `src/components/ui/PosterSkeleton.jsx`
```
포스터 카드 로딩 상태
- 이미지 영역: #141414 배경, pulse 애니메이션 (아주 약하게)
- 텍스트 영역: 2줄 placeholder
```

---

## 컴포넌트 파일 구조 요약

```
(프로젝트 루트)/            ← 이미 존재하는 폴더
├── client/                 ← Vite + React 앱
│   └── src/
│       ├── components/
│       │   ├── layout/
│       │   │   ├── Layout.jsx
│       │   │   ├── Header.jsx
│       │   │   ├── Footer.jsx
│       │   │   ├── MobileMenu.jsx
│       │   │   └── PageTransition.jsx
│       │   ├── ui/
│       │   │   ├── Button.jsx
│       │   │   ├── AwardBadge.jsx
│       │   │   ├── SectionLabel.jsx
│       │   │   ├── Divider.jsx
│       │   │   ├── BackLink.jsx
│       │   │   ├── PageHeader.jsx
│       │   │   ├── ComingSoon.jsx
│       │   │   ├── PosterSkeleton.jsx
│       │   │   ├── Marquee.jsx
│       │   │   ├── FadeIn.jsx
│       │   │   └── CustomCursor.jsx
│       │   ├── poster/
│       │   │   ├── PosterCard.jsx
│       │   │   ├── PosterGrid.jsx
│       │   │   ├── PosterDetail.jsx
│       │   │   └── PosterImage.jsx
│       │   ├── about/
│       │   │   ├── HeroSection.jsx
│       │   │   ├── Statement.jsx
│       │   │   ├── ViewWorksCTA.jsx
│       │   │   └── ExhibitionInfo.jsx
│       │   ├── award/
│       │   │   └── AwardSection.jsx
│       │   └── gallery/
│       │       ├── ExhibitionVenueCard.jsx
│       │       └── GalleryGrid.jsx
│       ├── pages/
│       │   ├── AboutPage.jsx
│       │   ├── ContentPage.jsx
│       │   ├── ContentDetailPage.jsx
│       │   ├── AwardPage.jsx
│       │   ├── GalleryPage.jsx
│       │   └── NotFoundPage.jsx
│       ├── data/
│       │   └── works.js
│       ├── styles/
│       │   └── tokens.js
│       ├── hooks/
│       │   ├── useCustomCursor.js
│       │   └── useIntersectionFade.js
│       └── utils/
│           └── workUtils.js
├── CLAUDE.md
├── AGENTS.md
├── DESIGN.md
├── IA.md
├── COMPONENTS.md
├── PATTERNS.md
├── ROUTES.md
└── PROGRESS.md
```