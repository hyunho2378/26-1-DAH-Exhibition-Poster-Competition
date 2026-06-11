export default function GalleryGrid({ photos = [] }) {
  if (photos.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3">
        <span
          className="font-pretendard text-text-muted uppercase"
          style={{ fontSize: '11px', letterSpacing: '0.15em' }}
        >
          Coming Soon
        </span>
        <p
          className="font-pretendard text-text-muted text-center"
          style={{ fontSize: '13px', letterSpacing: '-0.01em', maxWidth: '280px', lineHeight: 1.6 }}
        >
          전시 현장 사진은 행사 이후 업데이트됩니다.
        </p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
      {photos.map((photo, i) => (
        <div key={i} style={{ aspectRatio: '4/3', overflow: 'hidden', borderRadius: '4px', background: '#141414' }}>
          <img
            src={photo.src}
            alt={photo.alt ?? '전시 현장'}
            loading="lazy"
            decoding="async"
            className="w-full h-full object-cover"
          />
        </div>
      ))}
    </div>
  )
}
