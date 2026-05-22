export default function Divider({ className = '' }) {
  return (
    <hr
      className={`border-none ${className}`}
      style={{ borderTop: '1px solid #1f1f1f', margin: 0 }}
    />
  )
}
