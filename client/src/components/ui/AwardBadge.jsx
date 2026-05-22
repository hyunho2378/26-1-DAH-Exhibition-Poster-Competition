const config = {
  grand: {
    label: '최우수상',
    style: {
      border: '1px solid #C8E63C',
      color: '#C8E63C',
      background: 'rgba(200,230,60,0.05)',
    },
  },
  excellence: {
    label: '우수상',
    style: {
      border: '1px solid #888888',
      color: '#cccccc',
      background: 'transparent',
    },
  },
  encouragement: {
    label: '장려상',
    style: {
      border: '1px solid #555555',
      color: '#999999',
      background: 'transparent',
    },
  },
}

export default function AwardBadge({ type }) {
  const { label, style } = config[type] ?? {}
  if (!label) return null

  return (
    <span
      className="inline-block font-pretendard text-xs px-3 py-1"
      style={{ ...style, borderRadius: '2px', fontSize: '11px', letterSpacing: '0.04em' }}
    >
      {label}
    </span>
  )
}
