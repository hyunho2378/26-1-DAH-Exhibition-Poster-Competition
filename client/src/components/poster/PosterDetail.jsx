import { useState, useEffect, useRef } from 'react'
import PosterImage from './PosterImage'
import AwardBadge from '../ui/AwardBadge'
import BackLink from '../ui/BackLink'

// aiContribution 본문이 "AI 활용 및 학생의 기여" 또는 "N. AI..." 머리말로 시작하면
// 소제목과 중복되므로 그 첫 줄만 제거 (원문 손상 아님, 표시상 중복 제거).
function stripAiHeading(text) {
  if (!text) return text
  const lines = text.split('\n')
  const first = lines[0].trim()
  const isRedundant =
    /^\d+\.\s*AI\s*활용\s*및\s*학생의\s*기여/.test(first) ||
    /^AI\s*활용\s*및\s*학생의\s*기여/.test(first)
  if (!isRedundant) return text
  const rest = lines.slice(1)
  while (rest.length && rest[0].trim() === '') rest.shift()
  return rest.join('\n')
}

function formatTitle(title) {
  const idx = title.indexOf(' (')
  if (idx === -1) return title
  return <>{title.slice(0, idx)}<br />{title.slice(idx + 1)}</>
}

function DetailSection({ label, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className="font-pretendard uppercase"
        style={{ fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', color: '#C8E63C' }}
      >
        {label}
      </span>
      <p
        className="font-pretendard whitespace-pre-line"
        style={{ fontSize: 'clamp(14px, 1.2vw, 15px)', lineHeight: 1.75, letterSpacing: '-0.01em', color: '#cccccc' }}
      >
        {children}
      </p>
    </div>
  )
}

export default function PosterDetail({ work }) {
  const isCarousel = work.type === 'carousel'
  const [activeIndex, setActiveIndex] = useState(isCarousel ? 1 : 0)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!isCarousel) return
    intervalRef.current = setInterval(() => {
      setActiveIndex(i => (i + 1) % work.images.length)
    }, 5000)
    return () => clearInterval(intervalRef.current)
  }, [isCarousel, work.images?.length])

  const displaySrc = isCarousel ? work.images[activeIndex].src : work.full
  const displayType = isCarousel ? work.images[activeIndex].type : work.type

  return (
    <div className="min-h-screen flex flex-col">
      {/* 2컬럼 메인 레이아웃 */}
      <div className="flex flex-col md:flex-row flex-1">

        {/* 좌측: 포스터 이미지 (60%) */}
        <div className="md:w-[60%] flex flex-col items-center justify-start px-4 pt-6 pb-0 md:px-6 md:pt-12 md:pb-12 lg:px-10">
          <div className="relative bg-surface-01" style={{ lineHeight: 0 }}>
            <PosterImage
              src={displaySrc}
              type={displayType}
              alt={`${work.author} - ${work.title}`}
              className="w-auto max-h-[90vh] object-contain"
            />
          </div>
        </div>

        {/* 우측: 정보 패널 (40%) */}
        <div className="md:w-[40%] flex flex-col gap-5 px-4 py-8 md:px-6 md:py-12 lg:px-10">

          <BackLink to="/content">작품 목록</BackLink>

          {/* 작품 번호 */}
          <span
            className="font-serif text-text-primary tabular-nums"
            style={{
              fontSize: 'clamp(40px, 5vw, 72px)',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              lineHeight: 1.0,
            }}
          >
            {work.id}
          </span>

          {/* 작품명 */}
          <h1
            className="font-pretendard text-accent whitespace-pre-line"
            style={{
              fontSize: 'clamp(22px, 2.5vw, 32px)',
              fontWeight: 700,
              lineHeight: 1.3,
              letterSpacing: '-0.02em',
              wordBreak: 'keep-all',
              overflowWrap: 'break-word',
            }}
          >
            {formatTitle(work.title)}
          </h1>

          {/* 작가명 + 학과 */}
          <div className="flex flex-col gap-1">
            <span
              className="font-pretendard text-text-primary"
              style={{ fontSize: '16px', fontWeight: 600, letterSpacing: '-0.01em', lineHeight: 1.4 }}
            >
              {work.author}
            </span>
            {(work.studentId || work.department) && (
              <span
                className="font-pretendard text-text-secondary"
                style={{ fontSize: '13px', fontWeight: 400, letterSpacing: '-0.01em' }}
              >
                {[work.studentId, work.department].filter(Boolean).join(' / ')}
              </span>
            )}
          </div>

          {/* 작품 소개 */}
          {work.description && (
            <DetailSection label="작품 소개">{work.description}</DetailSection>
          )}

          {/* AI 활용 및 학생의 기여 */}
          {work.aiContribution && (
            <DetailSection label="AI 활용 및 학생의 기여">
              {stripAiHeading(work.aiContribution)}
            </DetailSection>
          )}

          {/* 수상 배지 */}
          {work.award && (
            <div>
              <AwardBadge type={work.award} />
            </div>
          )}

        </div>
      </div>

    </div>
  )
}
