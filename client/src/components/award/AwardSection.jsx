import SectionLabel from '../ui/SectionLabel'
import PosterGrid from '../poster/PosterGrid'
import Divider from '../ui/Divider'

const LABELS = {
  grand: '최우수상',
  excellence: '우수상',
  encouragement: '장려상',
}

const PRIZE_INFO = {
  grand: '1팀 · 상금 30만원',
  excellence: '3팀 · 상금 20만원',
  encouragement: '1팀 · 상금 10만원 (1학년 대상)',
}

export default function AwardSection({ type, works }) {
  if (!works || works.length === 0) return null

  return (
    <section className="py-10 md:py-12">
      <Divider />
      <div className="mt-8 mb-6 flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4">
        <SectionLabel>{LABELS[type]}</SectionLabel>
        <span
          className="font-pretendard text-text-muted"
          style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
        >
          {PRIZE_INFO[type]}
        </span>
      </div>
      <PosterGrid works={works} showAward />
    </section>
  )
}
