import { NavLink, Link } from 'react-router-dom'

const NAV_ITEMS = [
  { label: 'About',   to: '/',        end: true },
  { label: 'Content', to: '/content', end: false },
  { label: 'Award',   to: '/award',   end: false },
  { label: 'Gallery', to: '/gallery', end: false },
]

export default function Header() {
  return (
    <>
      {/* 좌상단 로고 */}
      <Link
        to="/"
        aria-label="홈으로"
        className="absolute top-0 left-0 z-[100] px-4 md:px-6 lg:px-10 2xl:px-12 pt-4 pb-4 group"
      >
        <span
          className="block font-serif text-text-primary leading-none"
          style={{ fontSize: 'clamp(22px, 3vw, 28px)', fontStyle: 'italic' }}
        >
          418
        </span>
        <span
          className="block font-suit text-text-secondary group-hover:text-text-primary transition-colors duration-200 uppercase mt-1"
          style={{ fontSize: 'clamp(10px, 1.2vw, 13px)', letterSpacing: '0.12em', fontWeight: 600 }}
        >
          I&apos;M A TEAPOT
        </span>
      </Link>

      {/* 우상단 메뉴 */}
      <nav
        className="absolute top-0 right-0 z-[100] px-4 md:px-6 lg:px-10 2xl:px-12 pt-4 pb-4 flex flex-col items-end gap-1"
        aria-label="주 내비게이션"
      >
        {NAV_ITEMS.map(({ label, to, end }) => (
          <NavLink
            key={label}
            to={to}
            end={end}
            data-cursor="text"
            className={({ isActive }) =>
              `font-suit uppercase transition-colors duration-200 ${
                isActive ? 'text-text-primary' : 'text-text-secondary hover:text-text-primary'
              }`
            }
            style={{ fontSize: 'clamp(12px, 1.5vw, 15px)', letterSpacing: '0.05em', lineHeight: 1.6, fontWeight: 700 }}
          >
            {label}
          </NavLink>
        ))}
      </nav>
    </>
  )
}
