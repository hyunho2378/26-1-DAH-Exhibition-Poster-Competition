import { useState } from 'react'
import Marquee from '../ui/Marquee'
import ScrambleText from '../ui/ScrambleText'
import FloatingWords from './FloatingWords'

export default function HeroSection() {
  const [runSignal, setRunSignal] = useState(0)

  return (
    <section className="relative flex flex-col min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-6rem)] pt-20 pb-4 md:pt-28 md:pb-6">
      <FloatingWords />

      {/* 마퀴 — 콘텐츠 패딩 돌파 */}
      <div className="-mx-4 md:-mx-6 lg:-mx-10 2xl:-mx-12">
        <Marquee text="418 I'M A TEAPOT · DIGITAL ARTS AND HUMANITIES · 2026 ·" />
      </div>

      {/* 타이틀 + 부제 */}
      <div className="flex-1 flex flex-col justify-center">
        <h1
          className="font-serif text-text-primary"
          style={{
            fontSize: 'clamp(56px, 12.5vw, 160px)',
            lineHeight: 0.95,
            letterSpacing: '-0.03em',
            cursor: 'default',
            color: '#f0f0f0',
          }}
          onMouseEnter={() => setRunSignal(s => s + 1)}
        >
          <em style={{ fontStyle: 'italic', color: '#C8E63C' }}>
            <ScrambleText text="418" runSignal={runSignal} startDelay={0} />
          </em>
          <ScrambleText text=": I'M A" runSignal={runSignal} startDelay={180} />
          <ScrambleText text=" TEAPOT" runSignal={runSignal} startDelay={480} />
        </h1>

        <p
          className="font-pretendard text-text-secondary mt-6 md:mt-8"
          style={{
            fontSize: 'clamp(18px, 1.875vw, 24px)',
            fontWeight: 500,
            lineHeight: 1.4,
            letterSpacing: '0.01em',
          }}
        >
          Digital Arts and Humanities Exhibition Poster Competition
        </p>
      </div>
    </section>
  )
}
