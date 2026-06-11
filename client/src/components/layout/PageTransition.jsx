import { useRef, useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export default function PageTransition({ children }) {
  const ref = useRef(null)
  const { pathname } = useLocation()

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    el.style.transition = 'none'
    el.style.opacity = '0'
    el.style.transform = 'translateY(8px)'
    const id = requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.3s ease-out, transform 0.3s ease-out'
      el.style.opacity = '1'
      el.style.transform = 'none'
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return (
    <div ref={ref} style={{ opacity: 0 }}>
      {children}
    </div>
  )
}
