import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function NotFoundPage() {
  useEffect(() => {
    document.title = "418 — 418 I'M A NOT TEAPOT"
  }, [])

  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center gap-6 px-6 text-center">
      <span
        className="font-suit text-accent tabular-nums"
        style={{
          fontSize: 'clamp(36px, 7.5vw, 72px)',
          fontWeight: 700,
          lineHeight: 1.1,
          letterSpacing: '-0.03em',
        }}
      >
        418
      </span>
      <p
        className="font-pretendard text-text-secondary"
        style={{
          fontSize: 'clamp(15px, 1.25vw, 16px)',
          lineHeight: 1.7,
          letterSpacing: '-0.01em',
        }}
      >
        이 페이지는 티팟이라 커피를 끓일 수 없어요
      </p>
      <Link
        to="/"
        className="font-pretendard text-text-secondary hover:text-text-primary inline-flex items-center gap-2 transition-colors duration-200 mt-2"
        style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
      >
        <ArrowLeft size={14} strokeWidth={1.5} />
        홈으로
      </Link>
    </div>
  )
}
