import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ViewWorksCTA() {
  const ref = useRef(null)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      if (ref.current) ref.current.style.backgroundPosition = '0% 0%'
      return
    }

    function onScroll() {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const vh = window.innerHeight
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.5)))
      el.style.backgroundPosition = `${(1 - progress) * 100}% 0%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="flex flex-col justify-center min-h-[40vh] md:min-h-[60vh] py-8 md:py-16">
      <Link
        to="/content"
        data-cursor="poster"
        className="block"
        style={{ cursor: 'pointer' }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <h2
          ref={ref}
          className="font-serif"
          style={{
            fontSize: 'clamp(52px, 13vw, 180px)',
            lineHeight: 0.92,
            letterSpacing: '-0.03em',
            display: 'block',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            backgroundImage: 'linear-gradient(to right, #C8E63C 50%, #f0f0f0 50%)',
            backgroundSize: '200% 100%',
            backgroundPosition: '100% 0%',
            textShadow: hovered
              ? '0 0 40px rgba(200, 230, 60, 0.8), 0 0 80px rgba(200, 230, 60, 0.4)'
              : 'none',
            transition: 'text-shadow 0.3s ease',
          }}
        >
          ENTER EXHIBITION
          <span
            style={{
              display: 'inline-block',
              transform: hovered ? 'translateX(10px)' : 'translateX(0)',
              transition: 'transform 0.3s ease',
            }}
          >
            {' →'}
          </span>
        </h2>
      </Link>
    </section>
  )
}
