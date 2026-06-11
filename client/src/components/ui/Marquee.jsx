export default function Marquee({
  text,
  speed = 30,
  opacity = 0.2,
  fontSize = 'clamp(28px, 4vw, 56px)',
}) {
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <div className="overflow-hidden select-none" aria-hidden="true">
      <div
        className="inline-flex whitespace-nowrap will-change-transform"
        style={{
          animation: prefersReduced
            ? 'none'
            : `marqueeSlide ${speed}s linear infinite`,
        }}
      >
        {[0, 1].map((i) => (
          <span
            key={i}
            className="font-serif text-text-primary"
            style={{ fontSize, opacity, letterSpacing: '-0.02em', paddingRight: '0.5em' }}
            aria-hidden={i > 0 ? 'true' : undefined}
          >
            {text}&nbsp;
          </span>
        ))}
      </div>
    </div>
  )
}
