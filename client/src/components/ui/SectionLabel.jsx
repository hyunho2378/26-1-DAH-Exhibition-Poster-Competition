export default function SectionLabel({ children, number, className = '' }) {
  return (
    <span
      className={`inline-flex items-center gap-2 font-pretendard text-text-muted uppercase ${className}`}
      style={{ fontSize: '11px', letterSpacing: '0.15em' }}
    >
      {number != null && (
        <span className="font-suit text-accent tabular-nums">{String(number).padStart(2, '0')}</span>
      )}
      {children}
    </span>
  )
}
