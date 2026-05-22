import { useEffect, useRef } from 'react'
import { NavLink } from 'react-router-dom'
import { X } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'About',   to: '/',        end: true },
  { label: 'Content', to: '/content', end: false },
  { label: 'Award',   to: '/award',   end: false },
  { label: 'Gallery', to: '/gallery', end: false },
]

export default function MobileMenu({ isOpen, onClose }) {
  const closeRef = useRef(null)

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      closeRef.current?.focus()
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose])

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="메뉴"
      className="fixed inset-0 z-[200] bg-bg-primary md:hidden"
      style={{
        opacity: isOpen ? 1 : 0,
        pointerEvents: isOpen ? 'auto' : 'none',
        transition: 'opacity 300ms ease',
      }}
    >
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="메뉴 닫기"
        className="absolute top-4 right-4 p-2 text-text-muted hover:text-text-primary transition-colors duration-200"
      >
        <X size={20} strokeWidth={1.5} />
      </button>

      <nav className="flex flex-col items-center justify-center h-full gap-10">
        {NAV_ITEMS.map(({ label, to, end }, index) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            onClick={onClose}
            className={({ isActive }) =>
              `font-suit font-bold transition-colors duration-200 ${
                isActive ? 'text-text-primary' : 'text-text-muted hover:text-text-secondary'
              }`
            }
            style={{
              fontSize: 'clamp(36px, 5.6vw, 72px)',
              letterSpacing: '-0.03em',
              opacity: isOpen ? 1 : 0,
              transform: isOpen ? 'none' : 'translateY(16px)',
              transition: `opacity 400ms ease ${index * 60}ms, transform 400ms ease ${index * 60}ms`,
            }}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
