# PATTERNS.md — 반복 UI 패턴

> 418 I'M A NOT TEAPOT — 전시 사이트
> 아래 패턴들은 모든 페이지에서 일관되게 적용한다

---

## 1. 카드 패턴 — 포스터 카드

```jsx
// 기본 포스터 카드 구조
<Link to={`/content/${work.id}`} className="group block">
  {/* 이미지 래퍼 — A2 비율 고정 */}
  <div
    className="relative overflow-hidden"
    style={{ aspectRatio: '1 / 1.414', borderRadius: '4px' }}
  >
    <PosterImage
      src={work.thumbnail}
      type={work.type}
      alt={`${work.author} - ${work.title}`}
      className="w-full h-full object-cover transition-transform duration-250 group-hover:scale-[1.02]"
    />
    {/* 수상 배지 (오버레이) */}
    {work.award && (
      <div className="absolute top-3 right-3">
        <AwardBadge type={work.award} />
      </div>
    )}
  </div>

  {/* 카드 정보 */}
  <div className="mt-3 space-y-1">
    <span className="block text-[11px] font-suit text-accent tabular-nums">
      {work.id}
    </span>
    <p className="text-sm text-text-primary leading-snug">{work.title}</p>
    <p className="text-xs text-text-secondary">{work.author}</p>
  </div>
</Link>
```

**카드 hover 원칙**
- scale: `group-hover:scale-[1.02]` — 이미지만, 카드 전체 아님
- transition: `duration-[250ms] ease-out`
- border 색 변화: `hover:border-border-default` (기본값 border-border-subtle)
- 레이아웃 시프트 없음 (transform only)

---

## 2. 리스트 패턴 — 인포 리스트

```jsx
// 전시 정보 등 key-value 리스트
<dl className="space-y-4">
  <div className="flex flex-col gap-1">
    <dt>
      <SectionLabel>장소</SectionLabel>
    </dt>
    <dd className="text-sm text-text-primary leading-relaxed">
      한림대학교 일송기념도서관 4층 C.Square
    </dd>
  </div>
  <Divider />
  <div className="flex flex-col gap-1">
    <dt>
      <SectionLabel>기간</SectionLabel>
    </dt>
    <dd className="text-sm text-text-primary">
      2026.5.25. — 6.5. <span className="text-text-secondary">(2주)</span>
    </dd>
  </div>
</dl>
```

---

## 3. 모달 패턴

> 이 프로젝트에서는 전체 모달보다 **라우트 기반 상세 페이지** 사용을 원칙으로 함.
> 필요 시 (이미지 확대 등) 아래 패턴 사용.

```jsx
// 라이트박스형 모달 (이미지 전체화면)
{isOpen && (
  <div
    role="dialog"
    aria-modal="true"
    className="fixed inset-0 z-50 bg-bg-primary/95 flex items-center justify-center"
    onClick={onClose}
  >
    <div onClick={e => e.stopPropagation()}>
      <img src={work.full} alt={...} className="max-h-[90vh] max-w-[90vw] object-contain" />
    </div>
    <button
      onClick={onClose}
      className="absolute top-6 right-6 text-text-secondary hover:text-text-primary"
      aria-label="닫기"
    >
      <XIcon size={20} />
    </button>
  </div>
)}
```

**모달 원칙**
- 배경 클릭 시 닫힘
- ESC 키 닫힘 (`useEffect` + `keydown` 이벤트)
- 스크롤 잠금: `document.body.style.overflow = 'hidden'`
- focus trap: 첫 번째 포커스 가능 요소에 포커스

---

## 4. 빈 상태 패턴

```jsx
// 갤러리 사진 없을 때, 필터 결과 없을 때
<div className="flex flex-col items-center justify-center py-24 gap-3">
  <span className="text-[11px] text-text-muted uppercase tracking-widest">
    Coming Soon
  </span>
  <p className="text-sm text-text-muted text-center max-w-xs">
    전시 현장 사진은 행사 이후 업데이트됩니다.
  </p>
</div>
```

---

## 5. 에러 상태 패턴

```jsx
// 이미지 로드 실패
<div
  className="w-full h-full bg-surface-01 flex items-center justify-center"
  style={{ aspectRatio: '1 / 1.414' }}
>
  <span className="text-xs text-text-muted">이미지를 불러올 수 없습니다</span>
</div>

// 404 에러 페이지는 NotFoundPage.jsx에서 처리
```

---

## 6. 페이지 진입 페이드인 패턴

```jsx
// useIntersectionFade 훅 사용
// 스크롤 시 요소가 뷰포트 진입할 때 1회만 페이드인
// prefers-reduced-motion 시 즉시 표시

// hooks/useIntersectionFade.js
import { useEffect, useRef, useState } from 'react'

export function useIntersectionFade(options = {}) {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) { setIsVisible(true); return }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect() // 1회만
        }
      },
      { threshold: 0.1, ...options }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return { ref, isVisible }
}

// 사용법
function MySection() {
  const { ref, isVisible } = useIntersectionFade()
  return (
    <div
      ref={ref}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'none' : 'translateY(16px)',
        transition: 'opacity 0.4s ease-out, transform 0.4s ease-out',
      }}
    >
      ...
    </div>
  )
}
```

---

## 7. Stagger 그리드 패턴

```jsx
// PosterGrid에서 카드마다 지연 적용
{works.map((work, index) => (
  <div
    key={work.id}
    style={{
      opacity: isVisible ? 1 : 0,
      transform: isVisible ? 'none' : 'translateY(12px)',
      transition: `opacity 0.4s ease-out ${index * 60}ms, transform 0.4s ease-out ${index * 60}ms`,
    }}
  >
    <PosterCard work={work} />
  </div>
))}

// 주의: stagger delay 최대 400ms 이내로 (19개 × 60ms = 1140ms → 30ms로 줄일 것)
// 19개 × 30ms = 570ms — 마지막 카드 기준 허용 범위
```

---

## 8. 내비게이션 링크 패턴 (우측 헤더)

```jsx
// 세로 배치, 활성 상태 처리
<NavLink
  to="/content"
  className={({ isActive }) =>
    `relative text-xs tracking-widest uppercase transition-colors duration-200 ${
      isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
    }`
  }
>
  {({ isActive }) => (
    <>
      {isActive && (
        <span className="absolute -left-3 top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-accent" />
      )}
      Content
    </>
  )}
</NavLink>
```

---

## 9. 반응형 이미지 패턴

```jsx
// 포스터 이미지 최적 로딩
<img
  src={src}
  alt={alt}
  loading="lazy"
  decoding="async"
  className={className}
  onError={e => {
    e.target.style.display = 'none'
    // 에러 플레이스홀더 표시
  }}
/>
```

---

## 10. 커스텀 커서 패턴

```js
// hooks/useCustomCursor.js
import { useEffect, useRef } from 'react'

export function useCustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const mouse = useRef({ x: 0, y: 0 })
  const ring = useRef({ x: 0, y: 0 })

  useEffect(() => {
    // touch 기기 스킵
    if (window.matchMedia('(hover: none)').matches) return

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX - 4}px, ${e.clientY - 4}px)`
      }
    }

    const animate = () => {
      ring.current.x += (mouse.current.x - ring.current.x) * 0.12
      ring.current.y += (mouse.current.y - ring.current.y) * 0.12
      if (ringRef.current) {
        ringRef.current.style.transform =
          `translate(${ring.current.x - 16}px, ${ring.current.y - 16}px)`
      }
      requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    const raf = requestAnimationFrame(animate)
    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(raf)
    }
  }, [])

  return { dotRef, ringRef }
}
```

---

## 11. 섹션 구분 패턴

```jsx
// 섹션 사이 구분 (일관된 여백 + 라인)
<section className="py-16 md:py-24">
  <SectionLabel number="01">About</SectionLabel>
  <Divider className="mt-4 mb-8" />
  {/* 콘텐츠 */}
</section>
```

---

## 패턴 사용 시 절대 규칙

1. 레이아웃 시프트 유발하는 hover 효과 금지 (margin, padding 변화 금지)
2. `transition` 없는 color/opacity 변화 금지
3. 스크롤 진입 애니메이션은 반드시 1회만 (`observer.disconnect()`)
4. 이미지는 항상 `alt` 포함, `loading="lazy"` 기본
5. `prefers-reduced-motion` 분기 처리 필수