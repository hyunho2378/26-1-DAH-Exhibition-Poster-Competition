import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Divider from '../components/ui/Divider'

// A2 비율 카드 (1:1.414) — 내부 비워둠 (나중에 이미지 넣을 자리)
function AwardCard({ label, size = 'normal' }) {
  const isLarge = size === 'large'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '12px',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: isLarge ? '400px' : '100%',
          aspectRatio: '1 / 1.414',
          backgroundColor: '#141414',
          border: '1px solid #1f1f1f',
          borderRadius: '4px',
        }}
      />
      {label && (
        <span
          className="font-suit"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#555555',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {label}
        </span>
      )}
    </div>
  )
}

export default function AwardPage() {
  useEffect(() => {
    document.title = "Award — 418 I'M A NOT TEAPOT"
  }, [])

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12 py-10 md:py-14">
      <PageHeader title="Award" />

      {/* 최우수상 섹션 */}
      <section style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        {/* 라벨 */}
        <p
          className="font-suit"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#999999',
            textTransform: 'uppercase',
            fontWeight: 600,
            marginBottom: '32px',
            textAlign: 'center',
          }}
        >
          Grand Prize
        </p>

        {/* 카드 — 중앙 정렬 */}
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: '400px' }}>
            <AwardCard size="large" />
          </div>
        </div>
      </section>

      <Divider />

      {/* 우수상 + 장려상 섹션 */}
      <section style={{ paddingTop: '48px', paddingBottom: '48px' }}>
        {/* 4컬럼 그리드 */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '16px',
          }}
          className="award-lower-grid"
        >
          {/* 우수상 3개 */}
          <AwardCard label="Excellence" />
          <AwardCard label="Excellence" />
          <AwardCard label="Excellence" />
          {/* 장려상 1개 */}
          <AwardCard label="Encouragement" />
        </div>
      </section>

      <Divider />
      <div className="py-8">
        <Link
          to="/content"
          className="font-pretendard text-text-secondary hover:text-text-primary inline-flex items-center gap-2 transition-colors duration-200"
          style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
        >
          모든 출품작 보기
          <ArrowRight size={14} strokeWidth={1.5} />
        </Link>
      </div>

      {/* 모바일 2컬럼 반응형 */}
      <style>{`
        @media (max-width: 767px) {
          .award-lower-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
      `}</style>
    </div>
  )
}
