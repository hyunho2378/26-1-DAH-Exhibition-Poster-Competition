# SETUP.md — 프로젝트 세팅 가이드

> 418 I'M A NOT TEAPOT — 2026-1 디지털인문예술전공 프로젝트 전시회 사이트
> 이 파일을 읽고 Claude Code에 붙여넣을 프롬프트를 사용하세요.

---

## 1. 준비 체크리스트 (Claude Code 실행 전)

```
□ Node.js 18+ 설치 확인 (node -v)
□ 포스터 이미지 19개 준비 (PNG × 18, GIF × 1)
  → public/images/works/ 폴더에 넣을 예정
  → 파일명 규칙: 01.png, 02.png ... 18.png, XX.gif
□ 작품 정보 목록 준비 (작가명, 작품명, 수상 여부)
□ CLAUDE.md, AGENTS.md 파일 준비 (기존 것 그대로 사용)
```

---

## 2. 프로젝트 초기화 커맨드

```bash
# 프로젝트 루트에서 client 폴더 생성 후 Vite 초기화
mkdir client && cd client
npm create vite@latest . -- --template react

# 의존성 설치
npm install
npm install react-router-dom
npm install lucide-react

# Tailwind CSS 설치
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

---

## 3. 폴더 구조 (초기 생성)

```
(프로젝트 루트)/            ← 이미 존재하는 폴더
├── client/                 ← Vite + React 앱 전체
│   ├── public/
│   │   ├── images/
│   │   │   └── works/      ← 포스터 이미지 여기에
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   ├── poster/
│   │   │   ├── about/
│   │   │   ├── award/
│   │   │   └── gallery/
│   │   ├── pages/
│   │   ├── data/
│   │   │   └── works.js
│   │   ├── styles/
│   │   │   └── tokens.js
│   │   ├── hooks/
│   │   ├── utils/
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
├── CLAUDE.md
├── AGENTS.md
├── DESIGN.md
├── IA.md
├── COMPONENTS.md
├── PATTERNS.md
├── ROUTES.md
├── PROGRESS.md
└── vercel.json
```

---

## 4. vercel.json

```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```

---

## 5. Tailwind 설정 (`tailwind.config.js`)

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'bg-primary':    '#0a0a0a',
        'bg-secondary':  '#111111',
        'bg-tertiary':   '#181818',
        'bg-elevated':   '#1e1e1e',
        'surface-01':    '#141414',
        'surface-02':    '#1a1a1a',
        'border-subtle': '#1f1f1f',
        'border-default':'#2a2a2a',
        'border-strong': '#3a3a3a',
        'text-primary':  '#f0f0f0',
        'text-secondary':'#999999',
        'text-muted':    '#555555',
        'text-inverse':  '#0a0a0a',
        'accent':        '#C8E63C',
        'accent-dim':    '#A8C230',
      },
      fontFamily: {
        'suit': ['SUIT Variable', 'SUIT', 'sans-serif'],
        'pretendard': ['Pretendard Variable', 'Pretendard', 'sans-serif'],
      },
      screens: {
        'xs': '320px',
        'sm': '390px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1440px',
        '3xl': '1920px',
      },
    },
  },
  plugins: [],
}
```

---

## ════════════════════════════════════════
## CLAUDE CODE 초기 프롬프트 (여기서부터 복사)
## ════════════════════════════════════════

아래 전체를 Claude Code 첫 메시지로 붙여넣으세요.

---

```
이 프로젝트는 한림대학교 디지털인문예술전공 2026-1 포스터 공모전 전시 사이트야.
전시명: 418 I'M A NOT TEAPOT

CLAUDE.md, AGENTS.md, DESIGN.md, IA.md, COMPONENTS.md, PATTERNS.md, ROUTES.md, PROGRESS.md 파일을 모두 읽어.
읽기 전까지 코드 작성 시작하지 마.

파일을 다 읽었으면 아래 작업을 PHASE 1부터 순서대로 진행해줘.
단계별로 완료 후 나에게 확인받고 다음 단계로 넘어갈 것.

=== PHASE 1: 프로젝트 부트스트랩 ===

1. 프로젝트 루트에서 `mkdir client && cd client` 후 `npm create vite@latest . -- --template react`
2. 의존성 설치:
   - react-router-dom
   - lucide-react
   - tailwindcss postcss autoprefixer (dev)
3. tailwind.config.js — DESIGN.md의 색상/폰트/브레이크포인트 반영
4. index.html — Pretendard Variable, SUIT Variable CDN 추가
   ```
   Pretendard: https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css
   SUIT: https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css
   ```
5. src/index.css — 전역 리셋 + body bg #0a0a0a + cursor: none (데스크탑)
6. src/styles/tokens.js — DESIGN.md 기준 colors, typography, spacing, layout 전체
7. src/data/works.js — 19개 슬롯 생성 (임시 placeholder 데이터로, 실제 작품명/작가명은 내가 나중에 채울게)
   ```js
   // 구조
   export const works = [
     { id: '01', title: '작품명', author: '작가명', description: '', type: 'png',
       thumbnail: '/images/works/01.png', full: '/images/works/01.png', award: null },
     // ...19개
   ]
   ```
8. vercel.json 생성
9. ROUTES.md에 따라 App.jsx 라우터 구조 설정 (React.lazy + Suspense)
10. 빈 페이지 파일 6개 생성 (AboutPage, ContentPage, ContentDetailPage, AwardPage, GalleryPage, NotFoundPage) — 각 "페이지명 준비중" 텍스트만

PHASE 1 완료 후 `npm run dev` 실행해서 에러 없는지 확인하고 결과 알려줘.
```

---

## PHASE 2 Claude Code 프롬프트

```
PHASE 2: 레이아웃 & 공통 컴포넌트

COMPONENTS.md의 레이아웃 섹션과 공통 UI 섹션을 참고해서 아래를 구현해줘.
PATTERNS.md의 패턴들도 함께 준수해줘.

구현 순서:
1. src/hooks/useCustomCursor.js — PATTERNS.md의 커스텀 커서 패턴
2. src/hooks/useIntersectionFade.js — PATTERNS.md의 진입 페이드인 패턴
3. src/utils/workUtils.js — ROUTES.md의 유틸 함수
4. src/components/layout/ScrollToTop.jsx
5. src/components/layout/PageTransition.jsx — opacity fade 300ms
6. src/components/layout/MobileMenu.jsx — 전체화면 오버레이
7. src/components/layout/Header.jsx
   - 데스크탑: fixed right-0, w-20, full height, "418" 상단, 4개 NavLink 중앙, "2026" 하단
   - 모바일: fixed top-0, w-full, h-14, "418" 좌 + 햄버거 우
8. src/components/layout/Layout.jsx — Header + CustomCursor + ScrollToTop + children
9. src/components/ui/CustomCursor.jsx — dotRef, ringRef, 포스터 위 "VIEW"
10. 공통 UI: Button, AwardBadge, SectionLabel, Divider, BackLink, PageHeader, ComingSoon, PosterSkeleton

중요 규칙:
- tokens.js 색상만 사용, 하드코딩 금지
- 이모지 아이콘 금지 → lucide-react만
- TypeScript 금지 → JSX만
- hover 시 레이아웃 시프트 없음
- prefers-reduced-motion 처리 필수

완료 후 Header 렌더링 스크린샷 또는 현재 상태 알려줘.
```

---

## PHASE 3 Claude Code 프롬프트

```
PHASE 3: 포스터 컴포넌트

COMPONENTS.md의 '포스터 관련 컴포넌트' 섹션과 PATTERNS.md의 카드 패턴 참고해서 구현해줘.

1. src/components/poster/PosterImage.jsx
   - type === 'gif' → <img> (GIF 자동재생)
   - type === 'png' → <img loading="lazy" decoding="async">
   - onError 시 에러 플레이스홀더

2. src/components/poster/PosterCard.jsx
   - aspect-ratio: 1/1.414 (A2 세로 비율)
   - group hover: image scale(1.02), transition 250ms
   - AwardBadge 오버레이 (수상작만)
   - 하단: 번호(accent) + 작품명 + 작가명
   - Link to={`/content/${work.id}`}

3. src/components/poster/PosterGrid.jsx
   - 반응형: xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5
   - stagger 진입 애니메이션 (useIntersectionFade, index × 30ms delay)
   - gap-4 md:gap-6

4. src/components/poster/PosterDetail.jsx
   - 데스크탑 2컬럼 (60%/40%), 모바일 1컬럼
   - 좌: 포스터 max-height 90vh
   - 우: 번호(accent, display-lg) + 작품명 + 작가명 + AwardBadge + BackLink
   - 하단: 이전/다음 작품 화살표 (ChevronLeft, ChevronRight)

완료 후 더미 데이터로 /content 라우트 테스트해줘.
```

---

## PHASE 4 Claude Code 프롬프트

```
PHASE 4: 전체 페이지 구현

IA.md의 각 페이지 구성을 정확히 반영해서 구현해줘. 아래 순서로 진행.

=== AboutPage.jsx ===
IA.md 섹션 2 기준. 아래 콘텐츠를 정확히 사용해서 구현해줘.

--- [Hero 영역] ---
메인 타이틀 (display-2xl, SUIT, #f0f0f0):
  418: I'M NOT A TEAPOT

서브타이틀 (heading-lg, Pretendard, #999999):
  Digital Humanities and Arts Exhibition — Poster Competition

진입 페이드인 1회 (translateY 16px → 0, opacity 0→1, 400ms)

--- [전시 정보 블록] ---
아래 3개 항목을 나란히 또는 2~3컬럼으로 배치.
각 항목은 SectionLabel + 내용 구조.

[전시 기간]
  2026.5.25 — 6.05
  (2주간)

[Awards]
  최우수상  1팀  상금 30만원
  우수상    3팀  상금 20만원
  장려상    1팀  상금 10만원 (1학년 대상)

[전시 장소]
  Hallym University
  Ilsong Library 4th C.Square

--- [SelectedWorks] ---
수상작 또는 works[0~2] 미리보기
"View all works →" 링크 → /content

스크롤 거리 목표: 뷰포트 2개 이하

--- [Footer] ---
모든 페이지 하단에 공통 Footer 컴포넌트(src/components/layout/Footer.jsx) 만들어서 Layout.jsx에 포함시켜줘.

Footer 콘텐츠:
  좌측:
    한림대학교 디지털인문예술전공 학생회 CUBE
    강원특별자치도 춘천시 한림대학길 1 일송기념도서관 4층 C.SQUARE
    웹사이트 제작/수정 문의: 주현호 (h20222583@glab.hallym.ac.kr)

  우측 (또는 하단):
    Hallym University  DAH
    → 클릭 시 https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0
      target="_blank" rel="noopener noreferrer"

Footer 스타일:
  - border-top: 1px solid #1f1f1f
  - background: #0a0a0a
  - padding: py-8 (모바일) / py-10 (데스크탑)
  - 텍스트: caption 크기, #555555
  - "Hallym University  DAH" 링크: #999999 → hover #f0f0f0, transition 200ms
  - 데스크탑에서 우측 헤더 너비(80px)만큼 padding-right 적용

=== ContentPage.jsx ===
- PageHeader: "Content" + "19 Works"
- PosterGrid: works 전체 19개

=== ContentDetailPage.jsx ===
- useParams()로 id 추출
- workUtils.getWorkById, getAdjacentWorks 사용
- PosterDetail 렌더
- 유효하지 않은 id → NotFoundPage 렌더 (navigate 아님, 컴포넌트 조건부)

=== AwardPage.jsx ===
- PageHeader: "Award"
- 최우수상 / 우수상 / 장려상 섹션 (AwardSection × 3)
- award === null인 작품은 수상 결과 발표 전까지 숨김 처리 가능

=== GalleryPage.jsx ===
- PageHeader: "Gallery"  
- ExhibitionVenueCard (장소/일정)
- GalleryGrid (현재 Coming Soon)

=== NotFoundPage.jsx ===
- 에러코드 "418" (display-xl, accent)
- "이 페이지는 티팟이라 커피를 끓일 수 없어요"
- [← 홈으로] 버튼

모든 페이지 완료 후 각 라우트 접속해서 에러 없는지 확인해줘.
```

---

## PHASE 5 Claude Code 프롬프트 (이미지 추가 시)

```
PHASE 5: 실제 데이터 입력

public/images/works/ 폴더에 포스터 이미지를 추가했어.
파일명: 01.png ~ 18.png, XX.gif (GIF 작품 번호 알려줄게)

아래 작품 정보로 src/data/works.js를 업데이트해줘:
[작품 정보 목록을 여기에 붙여넣기]

형식:
- id: '01' ~ '19' (문자열)
- title: 작품명
- author: 작가명  
- type: 'png' 또는 'gif'
- thumbnail: '/images/works/01.png' (썸네일 = 원본 동일 경로)
- full: '/images/works/01.png'
- award: null | 'grand' | 'excellence' | 'encouragement'

업데이트 완료 후 /content, /award 페이지 확인해줘.
```

---

## 6. 주의사항 (전체 작업 공통)

```
1. DESIGN.md의 색상, 간격, 타이포그래피 규칙을 항상 준수
2. localStorage, sessionStorage 사용 금지
3. TypeScript 금지 → JavaScript JSX만
4. 이모지 아이콘 금지 → lucide-react 또는 inline SVG
5. hover 시 레이아웃 시프트 금지 (transform만 사용)
6. prefers-reduced-motion 분기 항상 처리
7. GIF 작품은 autoplay, loop, controls 없음
8. 모든 img 태그에 alt 속성 필수
9. 커스텀 커서는 touch 기기에서 반드시 숨김
10. PROGRESS.md를 작업 완료 시마다 업데이트
```

---

## PHASE 6 Claude Code 프롬프트 (모션 & 비주얼 리워크)

> 현재 사이트가 "AI가 만든 평범한 사이트" 느낌인 것을 synchronized.studio 수준의 고급 톤으로 끌어올리는 단계.
> 핵심: 세리프 디스플레이 + GSAP 마스크 reveal + 라인 트레일 커서 + 마퀴.

```
세션 시작. 작업 전 아래 파일을 순서대로 전부 읽어라.
1. CLAUDE.md
2. DESIGN.md
3. client/src/styles/tokens.js
4. IA.md
5. ROUTES.md
6. COMPONENTS.md
7. PATTERNS.md
8. PROGRESS.md
9. AGENTS.md
읽기가 완료되기 전까지 코드를 한 줄도 작성하지 마라.

---

=== PHASE 6: 모션 & 비주얼 리워크 ===

현재 사이트는 기능은 동작하지만 synchronized.studio 같은 고급 톤이 전혀 없다.
DESIGN.md의 갱신된 3장(타이포그래피)·7장(라인 커서)·8장(GSAP 모션)을 그대로 구현한다.
작업 전에 변경 계획을 보고하고, 승인받으면 시작해라.

[1] GSAP 설치 및 중앙화
  - npm install gsap
  - client/src/lib/gsap.js 생성:
    gsap, ScrollTrigger, SplitText를 import하고 gsap.registerPlugin()으로 등록 후 re-export
    (SplitText는 최신 GSAP에서 무료 포함. 만약 사용 불가하면 직접 줄 단위 span 분해 유틸로 대체하고 보고해라)
  - client/src/hooks/useGsapContext.js 생성:
    gsap.context()로 스코프 격리 + 언마운트 시 revert() 자동 정리하는 훅

[2] 폰트 — Fraunces 세리프 추가
  - client/index.html <head>에 Fraunces CDN 추가:
    https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300..900;1,9..144,300..900&display=swap
  - tailwind.config.js fontFamily에 추가:
    'serif': ['Fraunces', 'Georgia', 'serif']
  - tokens.js 타이포그래피에 display-hero(모바일56/데스크탑160, Fraunces) 추가
  - 폰트 역할: 큰 영문=Fraunces / 한글·본문=Pretendard / 숫자·UI=SUIT (DESIGN.md 3장 표 그대로)

[3] 라인/트레일 커서 — CustomCursor.jsx 전면 재작성
  - 기존 점+링 방식 폐기
  - 코어 점 4px(#C8E63C, 즉시 추종) + SVG polyline 트레일(좌표 8~12개 체인 lerp 0.35, stroke 1px opacity 0.5)
  - 멈추면 꼬리 소멸, 빠르면 길게 흐름
  - 포스터 위: 코어 12px + "VIEW"(Fraunces italic 11px) + 트레일 opacity 0.8
  - data-cursor="poster" / data-cursor="text" 속성으로 호버 타입 감지
  - touch(hover:none) 및 prefers-reduced-motion 시 비활성 + OS 커서 복원
  - mix-blend-mode: difference

[4] 모션 컴포넌트 신규 생성
  - client/src/components/ui/Marquee.jsx
    text 반복, Fraunces 대형, opacity 0.15~0.25, GSAP x축 seamless 무한루프(~30s, ease none),
    reduced-motion 정지
  - client/src/components/ui/RevealText.jsx
    SplitText(또는 대체 유틸)로 줄 분해 → 부모 overflow-hidden + child y:100%→0 마스크 wipe,
    stagger 0.08s, duration 1.0s, ease expo.out, ScrollTrigger once:true start "top 85%",
    immediate prop이면 즉시 재생(Hero용), reduced-motion 즉시표시
  - client/src/components/ui/RevealImage.jsx
    clip-path inset(100% 0 0 0)→inset(0) + 내부 이미지 scale(1.1)→1, duration 1.0~1.2s expo.out,
    ScrollTrigger once:true, reduced-motion 즉시표시

[5] HeroSection.jsx 재작업 — 가장 중요
  - "418: I'M NOT A TEAPOT"을 Fraunces display-hero로 화면을 압도하는 크기 (clamp 56px~160px)
  - "NOT"만 italic 변형으로 리듬 (synchronized 스타일)
  - WONK 축 살짝: font-variation-settings 'WONK' 1
  - RevealText로 진입 시 마스크 wipe (immediate)
  - 상단에 Marquee 1줄: "418 I'M NOT A TEAPOT · DIGITAL HUMANITIES AND ARTS · 2026 ·" 반복
  - 부제는 Pretendard 유지

[6] 포스터 컴포넌트 GSAP 전환
  - PosterCard: 호버 시 이미지 scale(1.04) duration 0.6s power2.out, 정보 살짝 상승+밝아짐 (레이아웃 시프트 금지)
  - PosterCard 이미지를 RevealImage로 교체
  - PosterGrid: 카드 stagger 마스크 reveal (index stagger 0.05~0.08, 전체 1.2s 이내)
  - data-cursor="poster" 속성 부여

[7] PageTransition.jsx — wipe 전환
  - 라우트 변경 시 opacity fade 또는 overlay wipe 0.4s, 새 콘텐츠 reveal 진입

[8] 페이지 대제목들 Fraunces 적용
  - PageHeader의 영문 타이틀(Content/Award/Gallery)을 Fraunces display-2xl로
  - "Selected Works" 등 영문 라벨 대형 표기도 Fraunces

검증:
  - npm run dev로 전 라우트 확인 (커서 흐름, Hero reveal, 마퀴, 카드 stagger, 페이지 전환)
  - prefers-reduced-motion 켜고 모든 애니메이션 폴백 확인
  - 모바일 폭(390px)에서 마퀴/커서 비활성 및 reveal 단순 fade 폴백 확인
  - npm run build 에러 없음 확인
  - PROGRESS.md PHASE 6 항목 ✅ 업데이트

각 단계 완료 시 무엇이 어떻게 바뀌었는지 요약 보고해라.
```

---

## 7. 라이브러리 설치 요약 (PHASE 6 기준)

```bash
cd client
npm install gsap
# Fraunces는 CDN 로드이므로 설치 불필요
# SplitText가 무료 미포함이면 직접 분해 유틸로 대체 (Claude Code가 판단 후 보고)
```