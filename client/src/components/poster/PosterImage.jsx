import { useState } from 'react'

function ErrorPlaceholder() {
  return (
    <div className="w-full h-full bg-surface-01 flex items-center justify-center">
      <span
        className="font-pretendard text-text-muted"
        style={{ fontSize: '11px', letterSpacing: '0.04em' }}
      >
        이미지를 불러올 수 없습니다
      </span>
    </div>
  )
}

// webp 경로(-thumb.webp / -full.webp)에서 원본 png 폴백 경로를 도출.
function toPngFallback(src) {
  return src.replace(/-(?:thumb|full)\.webp$/, '.png')
}

export default function PosterImage({ src, type, alt, className = '' }) {
  const [error, setError] = useState(false)
  const [loaded, setLoaded] = useState(false)

  if (error) return <ErrorPlaceholder />

  const imgClass = `${className} transition-opacity duration-300 ${loaded ? 'opacity-100' : 'opacity-0'}`

  // 애니메이션(animated webp / gif)은 plain img로 자동 재생. webp source/png 폴백 없음.
  if (type === 'gif') {
    return (
      <img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={imgClass}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    )
  }

  return (
    <picture style={{ display: 'contents' }}>
      <source srcSet={src} type="image/webp" />
      <img
        src={toPngFallback(src)}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={imgClass}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
      />
    </picture>
  )
}
