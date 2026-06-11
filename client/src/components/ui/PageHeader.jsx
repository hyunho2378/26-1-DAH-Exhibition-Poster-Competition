import Divider from './Divider'

export default function PageHeader({ title, subtitle, count, className = '' }) {
  return (
    <div className={`mb-8 md:mb-12 ${className}`}>
      <div className="flex items-baseline gap-4 mb-3">
        <h1
          className="font-serif text-text-primary"
          style={{
            fontSize: 'clamp(44px, 8vw, 104px)',
            letterSpacing: '-0.03em',
            lineHeight: 1.0,
          }}
        >
          {title}
        </h1>
        {count && (
          <span
            className="font-pretendard text-text-muted"
            style={{ fontSize: '13px', letterSpacing: '-0.01em' }}
          >
            {count}
          </span>
        )}
      </div>
      {subtitle && (
        <p
          className="font-pretendard text-text-secondary mb-4"
          style={{ fontSize: 'clamp(15px, 1.25vw, 16px)', lineHeight: 1.7 }}
        >
          {subtitle}
        </p>
      )}
      <Divider />
    </div>
  )
}
