import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function BackLink({ to, children = '뒤로' }) {
  return (
    <Link
      to={to}
      className="inline-flex items-center gap-2 font-pretendard text-text-secondary hover:text-text-primary transition-colors duration-200"
      style={{ fontSize: '13px' }}
    >
      <ArrowLeft size={14} strokeWidth={1.5} />
      {children}
    </Link>
  )
}
