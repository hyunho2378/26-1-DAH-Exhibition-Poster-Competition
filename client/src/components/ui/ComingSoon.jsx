export default function ComingSoon({ message }) {
  return (
    <div
      className="flex flex-col items-center justify-center py-24 gap-3"
      style={{
        border: '1px dashed #2a2a2a',
        borderRadius: '4px',
      }}
    >
      <span
        className="font-pretendard text-text-muted uppercase"
        style={{ fontSize: '11px', letterSpacing: '0.15em' }}
      >
        Coming Soon
      </span>
      {message && (
        <p
          className="font-pretendard text-text-muted text-center max-w-xs"
          style={{ fontSize: '13px', lineHeight: 1.6 }}
        >
          {message}
        </p>
      )}
    </div>
  )
}
