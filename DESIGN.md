# DESIGN.md — 418 I'M A NOT TEAPOT 디자인 시스템

> 2026-1 디지털인문예술전공 프로젝트 전시회 포스터 공모전
> 플랫폼: B형 반응형 웹 (320px ~ 2560px)
> 레퍼런스: synchronized.studio 분위기 + 전시 홍보 포스터 Visual Identity 계승

---

## 1. 플랫폼 확정

| 항목 | 값 |
|---|---|
| 형태 | B형 반응형 웹 |
| 최소 너비 | 320px |
| 최대 콘텐츠 너비 | 1280px (데스크탑), 1440px (와이드) |
| 기준 뷰포트 | 1280px (디자인 기준점) |
| 네비게이션 위치 | 우측 고정 세로 헤더 (데스크탑) / 햄버거 (모바일) |

---

## 2. 색상 팔레트

### 기본 색상 (tokens.js의 `colors` 객체로 관리)

```
Background
  --color-bg-primary:    #0a0a0a   // 전체 배경 (가장 어두움)
  --color-bg-secondary:  #111111   // 카드, 섹션 배경
  --color-bg-tertiary:   #181818   // 호버 상태 배경
  --color-bg-elevated:   #1e1e1e   // 모달, 오버레이

Surface
  --color-surface-01:    #141414   // 포스터 카드 배경
  --color-surface-02:    #1a1a1a   // 입력 필드, 태그

Border
  --color-border-subtle: #1f1f1f   // 섹션 구분선 (거의 안 보임)
  --color-border-default:#2a2a2a   // 일반 테두리
  --color-border-strong: #3a3a3a   // 강조 테두리

Text
  --color-text-primary:  #f0f0f0   // 본문 메인
  --color-text-secondary:#999999   // 부제, 캡션
  --color-text-muted:    #555555   // 비활성, 힌트
  --color-text-inverse:  #0a0a0a   // 라임 버튼 위 텍스트

Accent (티팟 연두 / 전시 포스터 포인트컬러)
  --color-accent:        #C8E63C   // 메인 포인트 (라임 옐로우그린)
  --color-accent-dim:    #A8C230   // 호버 시 어두워진 액센트
  --color-accent-glow:   rgba(200,230,60,0.08)   // 미묘한 글로우용

Semantic
  --color-error:         #ff4d4d
  --color-success:       #4dff91
```

### 사용 원칙
- 배경은 `#0a0a0a` 단일 톤 유지. 그라디언트 배경 금지.
- 액센트 컬러(`#C8E63C`)는 포인트로만 사용 — 버튼, 활성 링크, 번호 인디케이터, 얇은 언더라인.
- 이미지(포스터)가 화면의 컬러를 결정하게 한다. UI는 뒤로 빠진다.
- 화이트 사용 금지. 텍스트 최대값은 `#f0f0f0`.

---

## 3. 타이포그래피

### 폰트 패밀리

```css
/* CDN 로드 순서 */

/* 1. DM Serif Display (영문 디스플레이 세리프) — 묵직하고 꽉 찬 세리프 */
/*    Bodoni/Playfair와 달리 hairline(가는 획)이 거의 없어 작아도/얇아도 안 사라짐.
      단일 굵기지만 자체가 굵고 고급스러움. synchronized식 대형 타이포에 적합. */
@import url('https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap');

/* 2. Pretendard Variable (한글/영문 body) */
@import url('https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/variable/pretendardvariable-dynamic-subset.min.css');

/* 3. SUIT Variable (숫자/인덱스/UI 레이블) */
@import url('https://cdn.jsdelivr.net/gh/sunn-us/SUIT/fonts/variable/woff2/SUIT-Variable.css');

font-family-serif:   'DM Serif Display', Georgia, serif   /* 영문 대형 디스플레이 전용 */
font-family-body:    'Pretendard Variable', 'Pretendard', sans-serif  /* 한글+영문 본문 */
font-family-ui:      'SUIT Variable', 'SUIT', sans-serif  /* 숫자/인덱스/네비 레이블 */
```

### 폰트 역할 분담 (중요)

| 폰트 | 사용처 | 안 쓰는 곳 |
|---|---|---|
| **DM Serif Display** (세리프) | 영문 대형 디스플레이: Hero 타이틀, 페이지 대제목, 마퀴, 영문 라벨 대형, 작품 번호 대형 | 한글, 본문, 작은 UI |
| **Pretendard** | 모든 한글, 본문, 작품 설명, 작품명(한글), 부제 | 영문 대형 디스플레이 |
| **SUIT** | 숫자(01~19), 네비 메뉴 영문 라벨, tabular-nums | 본문 |

원칙: **큰 영문 = DM Serif Display / 한글·본문 = Pretendard / 숫자·UI = SUIT.**
한글 제목(개화, 촉 등)은 Pretendard weight 600~700.
DM Serif Display는 단일 굵기지만 자체가 묵직해서 어느 크기에서도 잘 보임 (Bodoni처럼 hairline 사라지는 문제 없음). 이탤릭 변형 보유.

### 폰트 적용 강제 체크리스트 (전부 DM Serif Display로)
- [ ] Hero 메인: DM Serif Display, display-hero, "NOT"만 italic + #C8E63C(프라이머리 컬러)
- [ ] Hero 부제: Pretendard weight 500, #999999 (영문)
- [ ] 페이지 대제목(Content/Award/Gallery): DM Serif Display display-2xl
- [ ] "VIEW ALL WORKS": DM Serif Display 대형
- [ ] 작품 번호(01~19): DM Serif Display 또는 SUIT, tabular-nums
- [ ] 마퀴: DM Serif Display, opacity 낮게
- [ ] 헤더 메뉴(About/Content...): SUIT weight 600~700 (얇게 쓰지 마라 — 현재 너무 얇아 안 보임)
- [ ] About 전시 정보: 전부 영문

### 타입 스케일 (B형 반응형)

| 토큰명 | 모바일 | 데스크탑 | 폰트 | weight | 용도 |
|---|---|---|---|---|---|
| `display-hero` | 56px | 160px | DM Serif Display | 400(고정) | Hero 메인 (화면 압도) |
| `display-2xl` | 44px | 104px | DM Serif Display | 400 | 페이지 대제목 영문 |
| `display-xl` | 36px | 72px | DM Serif Display | 400 | 섹션 대제목 영문 |
| `display-lg` | 28px | 48px | DM Serif Display/Pretendard | 400/700 | 페이지 타이틀 |
| `heading-xl` | 22px | 32px | Pretendard | 700 | 카드 제목, 한글 작품명 대형 |
| `heading-lg` | 18px | 24px | Pretendard | 600 | 서브 제목 |
| `heading-md` | 16px | 20px | Pretendard | 600 | 레이블 |
| `body-lg` | 16px | 18px | Pretendard | 400 | 본문 강조 |
| `body-md` | 15px | 16px | Pretendard | 400 | 기본 본문 |
| `body-sm` | 13px | 14px | Pretendard | 400 | 부연 설명 |
| `caption` | 11px | 12px | SUIT/Pretendard | 600 | 캡션, 메타, 네비 (얇게 금지) |

### 타이포그래피 원칙
- **DM Serif Display**: 단일 굵기(400)지만 자체가 묵직함. `letter-spacing` -0.01em ~ -0.02em, `line-height` 0.95~1.05
  - Hero는 `display-hero`로 viewport를 압도하는 크기
  - 이탤릭(`italic`)을 강조 단어에 섞어 리듬 (예: "I'M *NOT* A TEAPOT", NOT은 italic + #C8E63C)
  - hairline이 없어 작은 크기에서도 안 깨짐 (Bodoni 문제 해결)
- **Pretendard 본문**: `letter-spacing` -0.01em, `line-height` 1.6~1.7
- **UI/네비/캡션**: 얇은 weight(300~400) 금지. 최소 500~600 이상으로 가독성 확보. (현재 전부 너무 얇아 안 보임)
- **숫자(01~19)**: SUIT 또는 DM Serif Display, `font-variant-numeric: tabular-nums`
- 화이트 금지, 텍스트 최대 `#f0f0f0`
- **em dash(—) 사용 금지.** 기간 표기는 물결(~) 또는 "to" 또는 하이픈(-) 사용. (예: "2026.5.25 ~ 6.05")

---

## 4. 간격 시스템 (4pt 배수)

```js
spacing: {
  '0':   '0px',
  '1':   '4px',
  '2':   '8px',
  '3':   '12px',
  '4':   '16px',
  '5':   '20px',
  '6':   '24px',
  '8':   '32px',
  '10':  '40px',
  '12':  '48px',
  '16':  '64px',
  '20':  '80px',
  '24':  '96px',
  '32':  '128px',
}
```

---

## 5. 브레이크포인트

```js
screens: {
  'xs':  '320px',
  'sm':  '390px',
  'md':  '768px',
  'lg':  '1024px',
  'xl':  '1280px',
  '2xl': '1440px',
  '3xl': '1920px',
}
```

---

## 6. 레이아웃 시스템

### 그리드

```
모바일(~768px):   4컬럼, 마진 16px, 거터 12px
태블릿(768px~):   8컬럼, 마진 24px, 거터 16px
데스크탑(1024px~): 12컬럼, 마진 40px, 거터 24px, max-width 1280px
```

### 우측 상단 헤더 (데스크탑 전용) — 중요: 글자 회전 금지

> 레퍼런스(synchronized.studio)의 헤더는 **글자를 90도 눕히지 않는다.**
> 각 메뉴는 정상 가로 방향 텍스트이며, 메뉴 항목들이 우측 상단에 위→아래로 쌓여 있을 뿐이다.
> `writing-mode: vertical-*`, `transform: rotate()` 절대 사용 금지.

```
position: fixed, top: 0, right: 0
padding: 40px (top/right)
text-align: right (우측 정렬)
z-index: 100

[구조 — 위에서 아래로 정상 가로 텍스트]
  About
  Content        ← 각 줄은 가로 정상 방향, 우측 정렬, 세로로 나열
  Award
  Gallery
  (공백)
  Archive 또는 연도 등 보조 (선택)

타이포: caption~heading-md, 대문자, letter-spacing 0.02em
색상: 기본 #999999, hover #f0f0f0, active(#C8E63C 점 또는 텍스트)
줄 간격: 각 항목 line-height 1.5~1.7
```

콘텐츠는 우측 헤더가 fixed라서 영역을 거의 침범하지 않음(우측 상단 모서리에만 위치).
좌측 상단에는 로고 "418 / I'M NOT A TEAPOT" 약자를 정상 가로로 배치 (synchronized의 좌상단 로고처럼).

### 콘텐츠 영역
```
좌우 패딩: px-6 / px-10 / px-16 (반응형)
우측 헤더는 상단 모서리에만 있으므로 전체 right-padding 80px는 불필요.
단 Hero 등 상단 콘텐츠가 우측 메뉴와 겹치지 않도록 상단 우측 여백만 확보.
```

---

## 7. 커스텀 커서 — 라임 화살표 + 짧은 트레일

> 변경: 트레일이 너무 길고 느렸음 → **길이 절반 이하, 추종 속도 2배.**
> 그리고 마우스 끝에 **일반 화살표 커서(라임색)** 가 보여야 함 (원 아님, 진짜 커서 모양).

### 구성 (화살표 + 짧은 트레일)

```
[레이어 1] 화살표 커서 (마우스 끝)
  - 일반 화살표(arrow/pointer) 모양, 색상 #C8E63C (라임)
  - 원/점 아님 — 진짜 커서 화살표 형태 (SVG arrow 또는 CSS cursor: url 라임 화살표)
  - 마우스에 즉시(지연 0) 추종
  - 가장 단순한 방법: CSS `cursor: url(라임화살표.svg), auto` 로 OS 커서 자체를 라임 화살표로 교체
    (또는 SVG 화살표를 마우스 좌표에 즉시 따라붙임)

[레이어 2] 짧은 트레일 라인
  - SVG polyline, 좌표 개수 8~10개로 축소 (이전 16~24개 → 절반 이하)
  - stroke 1.5~2px, #C8E63C, opacity 0.6~0.8, linecap round
  - 각 점 lerp 계수 0.3~0.4로 상향 (이전 0.15 → 2배 이상 빠르게 추종)
    · 빠르게 움직이면 짧게 뻗음, 멈추면 화살표 지점에 모임
  - 원 수렴/축소 표현 없음

[호버 반응]
  - 포스터 위: 화살표 옆에 작은 "VIEW" 텍스트(DM Serif Display italic 13px) 페이드인
  - 트레일 stroke 살짝 굵게
```

### 구현 노트
- `position: fixed`, `pointer-events: none`, `z-index: 9999`
- 트레일 점 체인: `points[i] += (points[i-1] - points[i]) * 0.35` (빠르게)
- 점 개수 8~10개 (짧게)
- requestAnimationFrame 단일 루프
- 화살표는 OS 커서를 라임 SVG로 교체하거나, 별도 SVG를 마우스에 즉시 추종 (지연 없음)
- `prefers-reduced-motion`/touch: 트레일 비활성, 화살표(또는 기본 커서)만 유지
- `mix-blend-mode: difference` 옵션

---

## 8. 모션 / 인터랙션 — 최소화 (렉 제거 우선)

**Content 진입 렉의 원인은 GSAP reveal/마퀴/stagger였음. 전부 걷어내고 단순 CSS fade만 남긴다.**
**라이브러리: GSAP 제거. 커서 트레일(rAF)과 CSS transition만 사용.**

### 8-1. Hero 진입
```
- 단순 CSS fade-in + 약간의 translateY (opacity 0→1, y 12px→0)
- duration 0.5s, ease ease-out, 페이지 최초 1회
- 마스크 wipe / SplitText 사용 안 함
```

### 8-2. 스크롤 등장
```
- IntersectionObserver로 진입 시 1회 fade-in (opacity 0→1, y 12px→0)
- duration 0.4s, once
- 마스크 reveal / clip-path / scale 줌 사용 안 함 (가벼운 fade만)
- prefers-reduced-motion: 즉시 표시
```

### 8-3. 포스터 그리드
```
- stagger 없음. 그리드 전체가 한 번에 fade-in (또는 아주 짧은 stagger 0.02s)
- 19개 카드 동시 reveal 부담 제거
```

### 8-4. 포스터 카드 호버
```
- 이미지 scale(1.03), CSS transition 0.4s ease-out
- 레이아웃 시프트 금지 (transform/opacity만)
- GSAP 아님, 순수 CSS hover
```

### 8-5. 페이지 전환
```
- 단순 opacity fade (0.3s). overlay wipe 없음.
```

### 8-6. 마퀴
```
- About 상단 마퀴는 유지하되 CSS @keyframes translateX 무한 루프로 (GSAP 아님)
- transform: translate3d + will-change: transform (GPU)
- opacity 0.15~0.25
- prefers-reduced-motion: 정지
- 부담되면 제거 가능 (선택 요소)
```

### 제거된 것 (이전 PHASE6에서 넣었던 것들 롤백)
- ❌ GSAP, ScrollTrigger, SplitText 전부 제거
- ❌ 마스크 wipe reveal (텍스트/이미지)
- ❌ clip-path 이미지 오픈 + scale 줌
- ❌ 그리드 stagger reveal
- ❌ RevealText, RevealImage 컴포넌트 (단순 FadeIn 하나로 대체)

### 금지
- WebGL / Three.js / canvas 3D
- 패럴랙스
- 자동재생 캐러셀 (박채빈 GIF·수동 캐러셀은 예외)
- 스크롤 하이재킹

### 이징 함수 (CSS)
```
--ease-out:  cubic-bezier(0.16, 1, 0.3, 1)
fade:        ease-out, 0.4~0.5s
hover:       ease-out, 0.4s
전환:        ease, 0.3s
```

### 성능 가드
- GSAP 제거로 번들·런타임 부담 대폭 감소
- 애니메이션은 transform/opacity만 (layout 유발 속성 금지)
- IntersectionObserver는 `once` (한 번 보이면 해제)
- 커서 트레일 단일 rAF 루프만 상시 동작 (가벼움)
- 60fps 안 나오면: 마퀴부터 제거 → 커서 점 개수 축소
- 모바일: 커서 비활성, 마퀴 정지/제거, fade만

---

## 9. 이미지 처리

- 포스터 이미지: `aspect-ratio: 1/√2` (A2 세로 비율 ≈ 1:1.414) 고정
- `object-fit: cover`, `loading: "lazy"`
- 배경 블러 없음 — 포스터 자체가 컬러를 담당
- GIF 작품: 자동 재생, loop, `playsinline`
- 이미지 컨테이너: `overflow: hidden`, 부드러운 모서리 `border-radius: 4px`
- 포스터 상세 뷰: 원본 비율 유지, 최대 높이 90vh

---

## 10. 컴포넌트별 스타일 규칙

### 포스터 카드
```
배경: #141414
border: 1px solid #1f1f1f
border-radius: 4px
hover: border-color #2a2a2a, scale(1.02)
작품 번호: caption, #C8E63C, SUIT
작가명: body-sm, #f0f0f0
작품명: heading-md, #f0f0f0
```

### 버튼
```
Primary: bg #C8E63C, text #0a0a0a, font-weight 600, px-6 py-3, hover bg #A8C230
Ghost:   border 1px #2a2a2a, text #f0f0f0, hover border #3a3a3a, bg #141414
Text:    text #999999, hover text #f0f0f0, underline 애니메이션
```

### 수상 배지
```
최우수상: border 1px #C8E63C, text #C8E63C, bg rgba(200,230,60,0.05)
우수상:   border 1px #888, text #ccc, bg transparent
장려상:   border 1px #555, text #999, bg transparent
```

### 섹션 구분
- 수평선: `border-top: 1px solid #1f1f1f`
- 섹션 간 간격: `pt-24 pb-24` (모바일 `pt-16 pb-16`)

---

## 11. 접근성

- WCAG 2.1 AA 준수
- 색상 대비: 텍스트 #f0f0f0 on #0a0a0a = 18.7:1 ✅
- 액센트 #C8E63C on #0a0a0a = 9.2:1 ✅
- 모든 이미지: `alt` 필수 (`작가명 - 작품명` 형식)
- 키보드 네비게이션: `focus-visible` 스타일 (`outline: 2px solid #C8E63C`)
- `prefers-reduced-motion`: 모든 애니메이션 비활성화 처리 필수
- `aria-label`, `role` 적절히 사용

---

## 12. 성능 원칙

- 이미지: WebP 우선, PNG fallback, `loading="lazy"`
- 폰트: `display: swap`, Variable font 사용으로 단일 파일 로드
- JS 번들: 페이지별 코드 스플리팅 (React.lazy + Suspense)
- CSS: Tailwind purge 적용 (미사용 클래스 제거)
- 애니메이션: CSS transition 우선, JS 최소화
- 목표 Lighthouse 성능: 90+ (모바일 기준)