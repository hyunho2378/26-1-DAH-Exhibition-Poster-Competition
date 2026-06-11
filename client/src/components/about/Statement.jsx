import FadeIn from '../ui/FadeIn'

export default function Statement() {
  return (
    <section className="relative py-24 md:py-20 overflow-hidden">

      {/* 1. Human Touch — 상단 대형, 우측 정렬 */}
      <FadeIn>
        <span
          className="font-serif text-accent block text-right"
          style={{
            fontSize: 'clamp(40px, 8vw, 120px)',
            fontStyle: 'italic',
            fontWeight: 600,
            lineHeight: 1.0,
            letterSpacing: '-0.02em',
            transition: 'letter-spacing 0.5s cubic-bezier(0.16,1,0.3,1)',
            cursor: 'default',
          }}
          onMouseEnter={e => { e.currentTarget.style.letterSpacing = '-0.01em' }}
          onMouseLeave={e => { e.currentTarget.style.letterSpacing = '-0.02em' }}
        >
          Human Touch
        </span>
      </FadeIn>

      {/* 2. 설명 문단 — 좌측 정렬, body-lg 크기 */}
      <div className="mt-20 md:mt-10">
        <FadeIn delay={0.1}>
          <p
            className="font-pretendard"
            style={{
              fontSize: 'clamp(16px, 1.3vw, 20px)',
              fontWeight: 400,
              lineHeight: 1.7,
              letterSpacing: '-0.01em',
              color: '#cccccc',
            }}
          >
            In a digital age that demands mechanical perfection,<br />
            this exhibition proves the warmth of being human:<br />
            the trace that never gets erased.
          </p>
        </FadeIn>
      </div>
    </section>
  )
}
