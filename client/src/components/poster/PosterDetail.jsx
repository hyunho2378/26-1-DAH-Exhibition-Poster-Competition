import { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import PosterImage from './PosterImage'
import AwardBadge from '../ui/AwardBadge'
import BackLink from '../ui/BackLink'

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
  return title
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

function CarouselDot({ active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 8,
        height: 8,
        borderRadius: '50%',
        background: active ? '#C8E63C' : 'transparent',
        border: `1px solid ${active ? '#C8E63C' : '#555'}`,
        padding: 0,
        cursor: 'pointer',
        flexShrink: 0,
      }}
      aria-label="슬라이드 이동"
    />
  )
}

function NavButton({ onClick, disabled, children, side }) {
  const [hovered, setHovered] = useState(false)
  const color = disabled ? '#666' : hovered ? '#C8E63C' : '#f0f0f0'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: 'absolute',
        top: '50%',
        [side]: '12px',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.5)',
        borderRadius: '4px',
        zIndex: 2,
        color,
        border: 'none',
        padding: '8px',
        cursor: disabled ? 'default' : 'pointer',
        transition: 'color 0.2s ease',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {children}
    </button>
  )
}

export default function PosterDetail({ work }) {
  const isCarousel = work.type === 'carousel'
  const [activeIndex, setActiveIndex] = useState(0)

  const displaySrc = isCarousel ? work.images[activeIndex].src : work.full
  const displayType = isCarousel ? work.images[activeIndex].type : work.type

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-col md:flex-row flex-1">

        {/* 좌측: 포스터 이미지 (60%) */}
        <div className="md:w-[60%] flex flex-col items-center justify-start px-4 pt-6 pb-0 md:px-6 md:pt-12 md:pb-12 lg:px-10">
          {isCarousel ? (
            <div className="flex flex-col items-center gap-4">
              {/* 단일 이미지와 동일 규칙: w-auto max-h-[90vh], 이미지 원본 비율 */}
              <div className="relative bg-surface-01 inline-block" style={{ lineHeight: 0 }}>
                <PosterImage
                  src={displaySrc}
                  type={displayType}
                  alt={`${work.author} - ${work.title}`}
                  className="w-auto max-h-[85vh] object-contain"
                />
                <NavButton
                  onClick={() => setActiveIndex(i => i - 1)}
                  disabled={activeIndex === 0}
                  side="left"
                >
                  <ChevronLeft size={28} />
                </NavButton>
                <NavButton
                  onClick={() => setActiveIndex(i => i + 1)}
                  disabled={activeIndex === work.images.length - 1}
                  side="right"
                >
                  <ChevronRight size={28} />
                </NavButton>
              </div>

              {/* 점 인디케이터 */}
              <div className="flex items-center gap-2">
                {work.images.map((_, i) => (
                  <CarouselDot
                    key={i}
                    active={i === activeIndex}
                    onClick={() => setActiveIndex(i)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="relative bg-surface-01" style={{ lineHeight: 0 }}>
              <PosterImage
                src={displaySrc}
                type={displayType}
                alt={`${work.author} - ${work.title}`}
                className="w-auto max-h-[90vh] object-contain"
              />
            </div>
          )}
        </div>

        {/* 우측: 정보 패널 (40%) */}
        <div className="md:w-[40%] flex flex-col gap-5 px-4 py-8 md:px-6 md:py-12 lg:px-10">

          <BackLink to="/content">작품 목록</BackLink>

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

          {work.description && (
            <DetailSection label="작품 소개">{work.description}</DetailSection>
          )}

          {work.aiContribution && (
            <DetailSection label="AI 활용 및 학생의 기여">
              {stripAiHeading(work.aiContribution)}
            </DetailSection>
          )}

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