import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { getAwardWorks } from '../data/works'
import PageHeader from '../components/ui/PageHeader'
import AwardSection from '../components/award/AwardSection'
import Divider from '../components/ui/Divider'

export default function AwardPage() {
  useEffect(() => {
    document.title = "Award — 418 I'M A NOT TEAPOT"
  }, [])

  const { grand, excellence, encouragement } = getAwardWorks()

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12 py-10 md:py-14">
      <PageHeader title="Award" />

      <AwardSection type="grand" works={grand} />
      <AwardSection type="excellence" works={excellence} />
      <AwardSection type="encouragement" works={encouragement} />

      {/* 수상 미발표 상태 — 모든 award가 null인 경우 */}
      {grand.length === 0 && excellence.length === 0 && encouragement.length === 0 && (
        <div className="py-20 text-center">
          <p
            className="font-pretendard text-text-muted"
            style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
          >
            수상 결과 발표 전입니다.
          </p>
        </div>
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
    </div>
  )
}
