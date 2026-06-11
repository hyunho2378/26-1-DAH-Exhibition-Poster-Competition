import { MapPin, Calendar } from 'lucide-react'

export default function ExhibitionVenueCard() {
  return (
    <div
      className="font-pretendard"
      style={{
        background: '#111111',
        border: '1px solid #1f1f1f',
        borderRadius: '4px',
        padding: 'clamp(24px, 3vw, 40px)',
      }}
    >
      <dl className="space-y-6">
        <div className="flex gap-3">
          <Calendar size={14} strokeWidth={1.5} style={{ color: '#555555', marginTop: '3px', flexShrink: 0 }} />
          <div className="flex flex-col gap-1">
            <dt style={{ fontSize: '11px', color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              전시 기간
            </dt>
            <dd style={{ fontSize: 'clamp(15px, 1.25vw, 16px)', color: '#f0f0f0', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
              2026.05.25. ~ 2026.06.05.
              <span style={{ color: '#999999', marginLeft: '8px', fontSize: '13px' }}>(2주간)</span>
            </dd>
          </div>
        </div>

        <div className="flex gap-3">
          <MapPin size={14} strokeWidth={1.5} style={{ color: '#555555', marginTop: '3px', flexShrink: 0 }} />
          <div className="flex flex-col gap-1">
            <dt style={{ fontSize: '11px', color: '#555555', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              전시 장소
            </dt>
            <dd style={{ fontSize: 'clamp(15px, 1.25vw, 16px)', color: '#f0f0f0', lineHeight: 1.6, letterSpacing: '-0.01em' }}>
              한림대학교 일송기념도서관 4층 C.Square
              <span style={{ display: 'block', color: '#999999', fontSize: '13px', marginTop: '2px' }}>
                Hallym University · Ilsong Library 4F C.Square
              </span>
            </dd>
          </div>
        </div>
      </dl>
    </div>
  )
}
