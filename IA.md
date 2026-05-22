# IA.md — 정보 구조 (Information Architecture)

> 418 I'M A NOT TEAPOT — 2026-1 디지털인문예술전공 프로젝트 전시회

---

## 1. 전체 화면/페이지 목록

| 페이지 ID | 경로 | 이름 | 설명 |
|---|---|---|---|
| `about` | `/` | About | 전시 소개, 메인 |
| `content` | `/content` | Content | 출품작 전체 목록 (19작품) |
| `content-detail` | `/content/:id` | 작품 상세 | 개별 포스터 확대 뷰 |
| `award` | `/award` | Award | 수상 결과 |
| `gallery` | `/gallery` | Gallery | 전시 현장 안내 & 갤러리 |
| `not-found` | `*` | 404 | 없는 페이지 |

---

## 2. About 페이지 구성 (풀 스토리텔링 — 뷰포트 4~5개)

> synchronized.studio처럼 스크롤하며 펼쳐지는 구성.
> **About의 모든 텍스트는 영어로 통일.** (한글 병기 없음)
> 작품 진입 이탈 방지를 위해 "VIEW WORKS" 진입점을 중간·하단 배치.
> 등장 효과는 GSAP 아님 → 단순 CSS/IntersectionObserver fade-in.

```
[섹션 1] Hero (뷰포트 1개)
  - 메인 타이틀: 418: I'M NOT A TEAPOT (DM Serif Display display-hero, "NOT"만 italic)
  - 서브타이틀: Digital Humanities and Arts Exhibition · Poster Competition
  - 상단 마퀴 1줄 (DM Serif Display, opacity 0.15~0.25, CSS 무한 루프)
  - 진입 시 단순 fade-in
  - 하단 스크롤 인디케이터 (작게, "scroll ↓")

[섹션 2] Statement / 주제 서술 (뷰포트 1개) — 전부 영어
  - 큰 영문 문장으로 전시 주제 서술 (예시, 추후 수정 가능):
    "In a digital age that demands mechanical perfection,
     this exhibition proves the warmth of being human:
     the trace that never gets erased."
  - "HUMAN TOUCH"를 대형 DM Serif Display로 강조 배치
  - 좌우 비대칭 여백 레이아웃
  - 사이 장식: 회전하는 별(sun) 또는 circle-text 1개 (가벼운 CSS)

[섹션 3] VIEW ALL WORKS (뷰포트 1개) — 중심 진입점
  - 화면을 가득 채우는 초대형 DM Serif Display 링크: "VIEW ALL WORKS ↗"
  - 호버 시 글자 색/언더라인 변형, 클릭 → /content
  - 부가 텍스트 없음 ("19 works" 삭제)
  - 19작품 전부 Content에서 동등 공개

[섹션 4] Exhibition Info (뷰포트 1개) — 맨 하단, 전부 영어
  ┌──────────────────┬──────────────────────┬────────────────────────────┐
  │ PERIOD           │ AWARDS               │ VENUE                      │
  │ 2026.5.25 ~ 6.05 │ Grand Prize  1 team  │ Hallym University          │
  │ (2 weeks)        │   ₩300,000           │ Ilsong Library 4F C.Square │
  │                  │ Excellence  3 teams  │                            │
  │                  │   ₩200,000           │                            │
  │                  │ Encouragement 1 team │                            │
  │                  │   ₩100,000           │                            │
  │                  │ * 1st-year students  │                            │
  └──────────────────┴──────────────────────┴────────────────────────────┘
  - 영문 라벨(PERIOD/AWARDS/VENUE): DM Serif Display 또는 SUIT 대문자
  - 단순 fade-in (stagger 없음)

[섹션 5] Footer (뷰포트 0.5개)
  - 학생회 CUBE 정보 + DAH 링크 (공통 Footer 컴포넌트, 이건 한글 유지 OK)
  - Footer 직전 보조 링크 "Content / Award / Gallery" 한 줄
```

**스크롤 거리 목표**: 뷰포트 4~5개. 섹션 3에 작품 진입 유도로 이탈 방지.
**전시 정보는 맨 하단(섹션 4)으로 이동** — Hero 직후가 아님.

---

## 3. Content 페이지 구성

> **인터랙션 전면 금지 (렉 제거).** 진입 fade·stagger·reveal·마퀴 전부 없음.
> 포스터 그리드는 애니메이션 없이 즉시 렌더. 호버 시 CSS scale만 허용.

```
[헤더 영역]
  - 페이지 타이틀: "Content" (DM Serif Display)
  - "19 Works" 같은 카운트 표기 제거 (선택)

[포스터 그리드]
  모바일:   2컬럼
  태블릿:   3컬럼
  데스크탑: 4컬럼
  와이드:   5컬럼

  각 카드:
    - 포스터 썸네일 (A2 비율 1:1.414), loading="lazy"
    - 작품 번호 (01~19, 액센트 컬러)
    - 작가명 / 작품명
    - 호버: CSS transition scale(1.03)만 (JS 애니메이션 없음)

  ※ 진입 애니메이션 없음 (FadeIn/stagger/IntersectionObserver 미적용)
  ※ 마퀴/장식 모션 없음

[클릭 시] → /content/:id (상세 페이지)
```

---

## 4. Content Detail 페이지 구성

```
[레이아웃: 2컬럼 (데스크탑) / 1컬럼 (모바일)]

좌측 (60%):
  - 포스터 이미지 대형 표시 (최대 90vh)
  - GIF면 자동 재생

우측 (40%):
  - 작품 번호 (액센트)
  - 작품명 (heading-xl)
  - 작가명 (body-lg)
  - 작품 소개 (본문, 있을 경우)
  - 수상 배지 (있을 경우)
  - [← Back] 링크

[네비게이션]
  - 이전 작품 / 다음 작품 화살표 (하단 또는 양옆)
```

---

## 5. Award 페이지 구성

```
[헤더]
  - "Award" 타이틀

[수상 결과]
  ┌─────────────────────────────────────────────┐
  │ 🏆 최우수상 (1점, 30만원)                    │
  │    [포스터 이미지 중형] 작품명 / 작가명        │
  ├─────────────────────────────────────────────┤
  │ 🥈 우수상 (3점, 20만원)                      │
  │    [포스터 이미지 소형 3개]                   │
  ├─────────────────────────────────────────────┤
  │ 🎖 장려상 (1점, 10만원, 1학년 대상)           │
  │    [포스터 이미지 소형]                       │
  └─────────────────────────────────────────────┘

[미수상 출품작 안내]
  - 모든 출품작은 Content 페이지에서 확인 가능
  - [View All Works →]
```

---

## 6. Gallery 페이지 구성

```
[헤더]
  - "Gallery" 타이틀
  - 전시 기간, 장소 요약

[전시 정보 카드]
  - 전시명: 418 I'M A NOT TEAPOT
  - 주제: 휴먼 터치(Human Touch)
  - 장소: 한림대학교 일송기념도서관 4층 C.Square
  - 일시: 2026.5.25. ~ 6.5. (2주)
  - 오프라인 전시 지도 or 캠퍼스 안내 텍스트

[현장 사진] (전시 이후 업데이트 예정)
  - 현재: "Coming Soon" 상태
  - 향후: 마소너리 또는 균등 그리드 레이아웃
```

---

## 7. 네비게이션 플로우

```
About (/)
  ├── [Content →]      → /content
  ├── [Award →]        → /award
  └── [Gallery →]      → /gallery

Content (/content)
  └── [카드 클릭]      → /content/:id
                            ├── [← Back]       → /content
                            ├── [← Prev]       → /content/:prev-id
                            └── [Next →]       → /content/:next-id

Award (/award)
  └── [포스터 클릭]    → /content/:id

Gallery (/gallery)
  └── 독립 페이지 (외부 링크 없음)
```

---

## 8. 우측 상단 헤더 메뉴 구성

> 글자 회전/세로쓰기 금지. 정상 가로 텍스트가 우측 상단에 위→아래로 쌓이는 형태.

```
[데스크탑 — fixed top-right, text-align right]

  [좌상단 — 별도 로고]
    418
    I'M NOT A TEAPOT  (약자, 정상 가로)

  [우상단 — 메뉴, 우측 정렬, 세로 나열, 각 줄은 가로 정상 방향]
    About
    Content
    Award
    Gallery

  ※ writing-mode: vertical-* 금지
  ※ transform: rotate() 금지
  ※ 메뉴는 "글자가 누운 것"이 아니라 "항목들이 줄바꿈되어 쌓인 것"
```

```
[모바일 — 햄버거 메뉴]
  - 우상단 햄버거 버튼
  - 전체 화면 오버레이 메뉴
  - 메뉴 항목 크게, 중앙 정렬
```

---

## 9. 데이터 구조 (works 배열)

```js
// src/data/works.js
export const works = [
  {
    id: '01',
    title: '작품명',
    author: '작가명',
    description: '작품 소개 (선택)',
    type: 'png' | 'gif',
    thumbnail: '/images/works/01_thumbnail.png',   // 저해상도
    full: '/images/works/01_full.png',             // 고해상도
    award: null | 'grand' | 'excellence' | 'encouragement',
  },
  // ... 19개
]
```

---

## 10. Footer (공통 — 모든 페이지)

```
src/components/layout/Footer.jsx
Layout.jsx에 포함 → 모든 페이지 하단에 공통 렌더

[레이아웃: 데스크탑 2컬럼 / 모바일 1컬럼]
border-top: 1px solid #1f1f1f
background: #0a0a0a
padding: py-8 (모바일) / py-10 (데스크탑)
데스크탑: padding-right 80px (우측 헤더 여백)

좌측 텍스트 블록 (caption, #555555):
  한림대학교 디지털인문예술전공 학생회 CUBE
  강원특별자치도 춘천시 한림대학길 1 일송기념도서관 4층 C.SQUARE
  웹사이트 제작/수정 문의: 주현호 (h20222583@glab.hallym.ac.kr)

우측 링크 (또는 모바일에서는 좌측 하단):
  "Hallym University  DAH"
  → href: https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0
  → target="_blank" rel="noopener noreferrer"
  → 스타일: caption, #999999, hover #f0f0f0, transition 200ms
```

---

## 11. 404 페이지

```
- 중앙 정렬
- 에러 코드: "418" (티팟 유머 활용 — I'M A TEAPOT HTTP 코드)
- 메시지: "이 페이지는 티팟이라 커피를 끓일 수 없어요"
- [← 홈으로] 버튼
```