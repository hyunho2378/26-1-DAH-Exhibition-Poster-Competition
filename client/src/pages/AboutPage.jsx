import { useEffect } from 'react'
import HeroSection from '../components/about/HeroSection'
import TeapotTypo from '../components/about/TeapotTypo'
import Statement from '../components/about/Statement'
import ViewWorksCTA from '../components/about/ViewWorksCTA'
import ExhibitionInfo from '../components/about/ExhibitionInfo'
import FadeIn from '../components/ui/FadeIn'

export default function AboutPage() {
  useEffect(() => {
    document.title = "418 I'M A NOT TEAPOT — 디지털인문예술전공 프로젝트 전시회"
  }, [])

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12">
      <HeroSection />

      {/* 티팟 전용 250vh 섹션 — sticky 방식, 텍스트와 완전 분리 */}
      <TeapotTypo />

      <Statement />

      {/* [3] Imperfection — 우측 정렬, 라임, 중간 크기 */}
      <div className="py-24 md:py-10">
        <FadeIn>
          <p
            className="font-serif text-right"
            style={{
              fontSize: 'clamp(24px, 3vw, 44px)',
              fontStyle: 'italic',
              letterSpacing: '-0.02em',
              lineHeight: 1.2,
              color: '#f0f0f0',
            }}
          >
            Imperfection is the proof of a human hand.
          </p>
        </FadeIn>
      </div>

      {/* [3] L-HUSS × DAH — 좌측 정렬, 화이트, 대형 */}
      <div className="pb-24 md:pb-10">
        <FadeIn>
          <span
            className="font-serif block"
            style={{
              fontSize: 'clamp(40px, 8vw, 120px)',
              fontStyle: 'italic',
              fontWeight: 600,
              lineHeight: 1.0,
              letterSpacing: '-0.02em',
              color: '#C8E63C',
            }}
          >
            L-HUSS × DAH
          </span>
        </FadeIn>
      </div>

      <ViewWorksCTA />
      <ExhibitionInfo />
    </div>
  )
}
