import { useEffect, useRef, useState } from 'react'

const TRAIL_LENGTH = 9
const LERP = 0.35

export default function CustomCursor() {
  const [disabled] = useState(
    () =>
      window.matchMedia('(hover: none)').matches ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
  )
  const [cursorType, setCursorType] = useState('default')

  const viewRef = useRef(null)
  const trailRef = useRef(null)
  const mouse = useRef({ x: -100, y: -100 })
  const points = useRef(
    Array.from({ length: TRAIL_LENGTH }, () => ({ x: -100, y: -100 }))
  )

  useEffect(() => {
    if (disabled) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      if (viewRef.current) {
        viewRef.current.style.transform =
          `translate3d(${e.clientX + 20}px, ${e.clientY - 2}px, 0)`
      }
    }

    const onOver = (e) => {
      const el = e.target.closest('[data-cursor]')
      setCursorType(el ? el.getAttribute('data-cursor') : 'default')
    }

    let rafId
    const animate = () => {
      const pts = points.current
      pts[0].x += (mouse.current.x - pts[0].x) * LERP
      pts[0].y += (mouse.current.y - pts[0].y) * LERP
      for (let i = 1; i < pts.length; i++) {
        pts[i].x += (pts[i - 1].x - pts[i].x) * LERP
        pts[i].y += (pts[i - 1].y - pts[i].y) * LERP
      }
      if (trailRef.current) {
        trailRef.current.setAttribute(
          'points',
          pts.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')
        )
      }
      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      cancelAnimationFrame(rafId)
    }
  }, [disabled])

  if (disabled) return null

  const isPoster = cursorType === 'poster'

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: 'difference' }}
    >
      <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
        <polyline
          ref={trailRef}
          fill="none"
          stroke="#C8E63C"
          strokeWidth={isPoster ? '2.5' : '1.5'}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            opacity: isPoster ? 1.0 : 0.75,
            transition: 'stroke-width 200ms ease, opacity 200ms ease',
          }}
        />
      </svg>

      <span
        ref={viewRef}
        className="absolute top-0 left-0 font-serif text-accent"
        style={{
          fontStyle: 'italic',
          fontSize: '13px',
          letterSpacing: '0.02em',
          opacity: isPoster ? 1 : 0,
          transition: 'opacity 200ms ease',
        }}
      >
        VIEW
      </span>
    </div>
  )
}
