# ROUTES.md — React Router v6 라우팅

> 418 I'M A NOT TEAPOT — 전시 사이트
> React Router v6, JSX 전용

---

## 1. 전체 라우트 구조

```jsx
// src/main.jsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
```

```jsx
// src/App.jsx
import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import PageTransition from './components/layout/PageTransition'

// 코드 스플리팅 — 페이지별 지연 로딩
const AboutPage        = lazy(() => import('./pages/AboutPage'))
const ContentPage      = lazy(() => import('./pages/ContentPage'))
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage'))
const AwardPage        = lazy(() => import('./pages/AwardPage'))
const GalleryPage      = lazy(() => import('./pages/GalleryPage'))
const NotFoundPage     = lazy(() => import('./pages/NotFoundPage'))

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/"           element={<AboutPage />} />
          <Route path="/content"    element={<ContentPage />} />
          <Route path="/content/:id" element={<ContentDetailPage />} />
          <Route path="/award"      element={<AwardPage />} />
          <Route path="/gallery"    element={<GalleryPage />} />
          <Route path="*"           element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </Layout>
  )
}

// 페이지 로딩 중 fallback (미니멀)
function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <span className="text-xs text-text-muted tracking-widest uppercase">Loading</span>
    </div>
  )
}
```

---

## 2. 라우트 상세

### `/` — AboutPage
```
컴포넌트: src/pages/AboutPage.jsx
레이아웃: Layout (우측 헤더 포함)
데이터: works.js에서 수상작 또는 대표작 3~4개 import
스크롤: 최소 (목표 뷰포트 2개 이하)
```

### `/content` — ContentPage
```
컴포넌트: src/pages/ContentPage.jsx
레이아웃: Layout
데이터: works.js 전체 19개
그리드: 2/3/4/5컬럼 반응형
```

### `/content/:id` — ContentDetailPage
```
컴포넌트: src/pages/ContentDetailPage.jsx
파라미터: id (예: '01', '02', ..., '19')
데이터:
  const { id } = useParams()
  const work = works.find(w => w.id === id)
  const currentIndex = works.findIndex(w => w.id === id)
  const prevWork = works[currentIndex - 1] ?? null
  const nextWork = works[currentIndex + 1] ?? null

유효하지 않은 id: → NotFoundPage 렌더
```

### `/award` — AwardPage
```
컴포넌트: src/pages/AwardPage.jsx
레이아웃: Layout
데이터: works.js에서 award 필드 기준 필터
  const grandWorks      = works.filter(w => w.award === 'grand')
  const excellenceWorks = works.filter(w => w.award === 'excellence')
  const encourageWorks  = works.filter(w => w.award === 'encouragement')
```

### `/gallery` — GalleryPage
```
컴포넌트: src/pages/GalleryPage.jsx
레이아웃: Layout
데이터: 전시 장소 상수 (코드 내 하드코딩), 현장 사진 (추후 업데이트)
```

### `*` — NotFoundPage
```
컴포넌트: src/pages/NotFoundPage.jsx
레이아웃: Layout
콘텐츠:
  - 에러 코드 "418"
  - 메시지: "이 페이지는 티팟이라 커피를 끓일 수 없어요"
  - [← 홈으로] 버튼 → navigate('/')
```

---

## 3. 네비게이션 유틸

```js
// src/utils/workUtils.js

export function getWorkById(works, id) {
  return works.find(w => w.id === id) ?? null
}

export function getAdjacentWorks(works, id) {
  const index = works.findIndex(w => w.id === id)
  return {
    prev: index > 0 ? works[index - 1] : null,
    next: index < works.length - 1 ? works[index + 1] : null,
  }
}

export function getAwardWorks(works) {
  return {
    grand:        works.filter(w => w.award === 'grand'),
    excellence:   works.filter(w => w.award === 'excellence'),
    encouragement: works.filter(w => w.award === 'encouragement'),
    none:         works.filter(w => !w.award),
  }
}
```

---

## 4. 스크롤 복원

```jsx
// 페이지 이동 시 스크롤 상단으로 복원
// src/components/layout/ScrollToTop.jsx

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

// Layout.jsx 내부에 포함:
// <ScrollToTop />
```

---

## 5. 링크 사용 원칙

```jsx
// 내부 페이지 이동 → Link 또는 NavLink (react-router-dom)
import { Link, NavLink, useNavigate, useParams } from 'react-router-dom'

// 프로그래매틱 이동 (뒤로가기, 이전/다음)
const navigate = useNavigate()
navigate('/content')
navigate(-1) // 브라우저 히스토리 뒤로

// 외부 링크 → <a href="..." target="_blank" rel="noopener noreferrer">
```

---

## 6. 라우트별 페이지 타이틀 (SEO)

```jsx
// useEffect로 document.title 설정 (각 페이지 컴포넌트 내)
useEffect(() => {
  document.title = '418 I\'M A NOT TEAPOT — 디지털인문예술전공 프로젝트 전시회'
}, [])

// 상세 페이지
useEffect(() => {
  if (work) document.title = `${work.title} — 418 I'M A NOT TEAPOT`
}, [work])
```

---

## 7. Vite 배포 설정 (SPA fallback)

```js
// client/vite.config.js — 이미 있다면 추가만
export default {
  // ... 기존 설정
}

// 프로젝트 루트의 vercel.json (Vercel 배포 시 SPA 라우팅 fallback)
// rootDirectory를 "client"로 지정
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
```