import { useState } from 'react'
import { Link } from 'react-router-dom'
import AwardBadge from '../ui/AwardBadge'

function formatTitle(title) {
  return title
}

function PosterImg({ src, alt, className }) {
  const [error, setError] = useState(false)
  if (error) {
    return (
      <div className="w-full h-full bg-surface-01 flex items-center justify-center">
        <span className="font-pretendard text-text-muted" style={{ fontSize: '11px' }}>
          이미지를 불러올 수 없습니다
        </span>
      </div>
    )
  }
  const fallback = src.replace(/-(?:thumb|full)\.webp$/, '.png')
  return (
    <picture style={{ display: 'contents' }}>
      <source srcSet={src} type="image/webp" />
      <img
        src={fallback}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={className}
        onError={() => setError(true)}
      />
    </picture>
  )
}

export default function PosterCard({ work, onClick }) {
  const content = (
    <>
      {/* 이미지 컨테이너 — A2 비율 고정 */}
      <div
        className="relative overflow-hidden border border-border-subtle group-hover:border-border-default transition-colors duration-[250ms] bg-surface-01"
        style={{ aspectRatio: '1 / 1.414', borderRadius: '4px' }}
        data-cursor="poster"
      >
        <PosterImg
          src={work.thumbnail}
          alt={`${work.author} - ${work.title}`}
          className="w-full h-full object-cover transition-transform duration-[400ms] ease-out group-hover:scale-[1.03]"
        />
        {work.award && (
          <div className="absolute top-3 right-3">
            <AwardBadge type={work.award} />
          </div>
        )}
      </div>

      {/* 카드 정보 */}
      <div className="mt-3 space-y-1">
        <span
          className="block font-suit text-accent tabular-nums"
          style={{ fontSize: '15px', letterSpacing: '0.04em', fontWeight: 700 }}
        >
          {work.id}
        </span>
        <p
          className="font-pretendard text-text-primary leading-snug whitespace-pre-line"
          style={{ fontSize: '17px', fontWeight: 600, letterSpacing: '-0.01em' }}
        >
          {formatTitle(work.title)}
        </p>
        <p
          className="font-pretendard"
          style={{ fontSize: '14px', fontWeight: 500, color: '#cccccc' }}
        >
          {work.author}
        </p>
      </div>
    </>
  )

  if (onClick) {
    return (
      <div
        className="group block cursor-none"
        onClick={onClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === 'Enter' && onClick()}
      >
        {content}
      </div>
    )
  }

  return (
    <Link to={`/content/${work.id}`} className="group block">
      {content}
    </Link>
  )
}
