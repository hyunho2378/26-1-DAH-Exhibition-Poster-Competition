import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import PageHeader from '../components/ui/PageHeader'
import Divider from '../components/ui/Divider'
import { getAwardWorks } from '../data/works'

const GRADE_LABEL = {
  grand: 'Grand Prize',
  excellence: 'Excellence',
  encouragement: 'Encouragement',
}

function AwardCard({ work, large = false }) {
  const [hovered, setHovered] = useState(false)

  return (
    <Link
      to={`/content/${work.id}`}
      style={{ textDecoration: 'none' }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px',
          transition: 'transform 0.2s ease',
          transform: hovered ? 'scale(1.02)' : 'scale(1)',
        }}
      >
        <div
          style={{
            width: '100%',
            aspectRatio: '1 / 1.414',
            backgroundColor: '#141414',
            border: '1px solid #1f1f1f',
            borderRadius: '4px',
            overflow: 'hidden',
          }}
        >
          <img
            src={work.thumbnail}
            alt={work.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
          />
        </div>
        <span
          className="font-suit"
          style={{
            fontSize: '11px',
            letterSpacing: '0.08em',
            color: '#C8E63C',
            textTransform: 'uppercase',
            fontWeight: 600,
          }}
        >
          {GRADE_LABEL[work.award]}
        </span>
        <p
          className="font-pretendard"
          style={{
            fontSize: large ? '17px' : '14px',
            fontWeight: 600,
            color: '#f0f0f0',
            lineHeight: 1.3,
            letterSpacing: '-0.01em',
            margin: 0,
          }}
        >
          {work.title}
        </p>
        <span
          className="font-pretendard"
          style={{ fontSize: '13px', color: '#999', fontWeight: 400 }}
        >
          {work.author}
        </span>
      </div>
    </Link>
  )
}

export default function AwardPage() {
  useEffect(() => {
    document.title = "Award — 418 I'M A NOT TEAPOT"
  }, [])

  const { grand, excellence, encouragement } = getAwardWorks()
  const grandWork = grand[0]
  const lowerWorks = [excellence[0], excellence[2], excellence[1], ...encouragement]

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12 py-10 md:py-14">
      <PageHeader title="Award" />

      {/* 최우수상 */}
      {grandWork && (
        <section style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <div style={{ width: '100%', maxWidth: '380px' }}>
              <AwardCard work={grandWork} large />
            </div>
          </div>
        </section>
      )}

      <Divider />

      {/* 우수상 + 장려상 */}
      {lowerWorks.length > 0 && (
        <section style={{ paddingTop: '48px', paddingBottom: '48px' }}>
          <div
            className="award-lower-grid"
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '16px',
            }}
          >
            {lowerWorks.map(w => (
              <AwardCard key={w.id} work={w} />
            ))}
          </div>
        </section>
      )}

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
