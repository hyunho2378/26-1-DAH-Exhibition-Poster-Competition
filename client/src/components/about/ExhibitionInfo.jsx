import FadeIn from '../ui/FadeIn'
import Divider from '../ui/Divider'

function BigLabel({ children }) {
  return (
    <div style={{ flexShrink: 0, width: 'clamp(100px, 16vw, 190px)' }}>
      <span
        className="font-serif block"
        style={{
          fontSize: 'clamp(26px, 3.2vw, 48px)',
          fontStyle: 'italic',
          lineHeight: 0.95,
          letterSpacing: '-0.02em',
          color: '#f0f0f0',
        }}
      >
        {children}
      </span>
    </div>
  )
}

const AWARDS = [
  { grade: 'Grand Prize', amount: '₩300,000', count: '1 recipient', note: null },
  { grade: 'Excellence', amount: '₩200,000', count: '3 recipients', note: null },
  { grade: 'Encouragement', amount: '₩100,000', count: '1 recipient', note: '* 1st-year students' },
]

export default function ExhibitionInfo() {
  return (
    <section className="py-12 md:py-20">
      <Divider />
      <FadeIn>
        <div className="mt-10 md:mt-16 flex flex-col gap-12 md:gap-20">

          {/* PERIOD */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 md:gap-16">
            <BigLabel>PERIOD</BigLabel>
            <div className="flex-1 sm:pt-1">
              <p
                className="font-pretendard"
                style={{ fontSize: 'clamp(15px, 1.25vw, 17px)', lineHeight: 1.7, letterSpacing: '-0.01em', color: '#f0f0f0' }}
              >
                2026.05.25. ~ 2026.06.05.
              </p>
              <p className="font-pretendard" style={{ fontSize: '13px', color: '#999', marginTop: '4px' }}>
                (2 weeks)
              </p>
            </div>
          </div>

          {/* AWARDS */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 md:gap-16">
            <BigLabel>AWARDS</BigLabel>
            <div className="flex-1">
              {AWARDS.map(({ grade, amount, count, note }, i) => (
                <div key={grade}>
                  {i > 0 && <div style={{ borderTop: '1px solid #1f1f1f' }} />}
                  <div
                    className="flex flex-wrap items-baseline gap-x-4 gap-y-1"
                    style={{ padding: '14px 0' }}
                  >
                    <span
                      className="font-pretendard"
                      style={{ color: '#666', fontSize: '13px', minWidth: '108px' }}
                    >
                      {grade}
                    </span>
                    <span
                      className="font-pretendard"
                      style={{ color: '#C8E63C', fontSize: 'clamp(14px, 1.1vw, 16px)', fontWeight: 500 }}
                    >
                      {amount}
                    </span>
                    <span className="font-pretendard" style={{ color: '#999', fontSize: '13px' }}>
                      {count}
                    </span>
                    {note && (
                      <span className="font-pretendard" style={{ color: '#555', fontSize: '11px' }}>
                        {note}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* VENUE */}
          <div className="flex flex-col sm:flex-row sm:items-start gap-5 sm:gap-10 md:gap-16">
            <BigLabel>VENUE</BigLabel>
            <div className="flex-1 sm:pt-1">
              <p
                className="font-pretendard"
                style={{ fontSize: 'clamp(15px, 1.25vw, 17px)', lineHeight: 1.7, letterSpacing: '-0.01em', color: '#f0f0f0' }}
              >
                Hallym University
              </p>
              <p
                className="font-pretendard"
                style={{ fontSize: 'clamp(15px, 1.25vw, 17px)', lineHeight: 1.7, letterSpacing: '-0.01em', color: '#f0f0f0' }}
              >
                Ilsong Library 4F C.Square
              </p>
            </div>
          </div>

        </div>
      </FadeIn>
    </section>
  )
}