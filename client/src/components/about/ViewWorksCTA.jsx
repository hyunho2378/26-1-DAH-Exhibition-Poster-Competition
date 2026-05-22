import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function ViewWorksCTA() {
  const ref = useRef(null)

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
      // 0% when bottom of element reaches viewport bottom, 100% when top reaches viewport 50%
      const progress = Math.max(0, Math.min(1, (vh - rect.top) / (vh * 0.5)))
      el.style.backgroundPosition = `${(1 - progress) * 100}% 0%`
    }

    window.addEventListener('scroll', onScroll, { passive: true })
    onScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section className="flex flex-col justify-center min-h-[40vh] md:min-h-[60vh] py-8 md:py-16">
      <Link to="/content" data-cursor="poster" className="block">
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
          }}
        >
          ENTER EXHIBITION
        </h2>
      </Link>
    </section>
  )
}
