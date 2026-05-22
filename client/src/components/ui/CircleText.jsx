import { useId } from 'react'

export default function CircleText({
  text = "418 · I'M NOT A TEAPOT · DIGITAL HUMANITIES & ARTS · ",
  size = 150,
  duration = 22,
  className = '',
}) {
  const rawId = useId()
  const pathId = `circle-${rawId.replace(/:/g, '')}`
  const cx = size / 2
  const r = size / 2 - 13
  const d = `M ${cx},${cx} m -${r},0 a ${r},${r} 0 1,1 ${r * 2},0 a ${r},${r} 0 1,1 -${r * 2},0`

  return (
    <div
      className={`pointer-events-none select-none ${className}`}
      style={{ width: size, height: size }}
      aria-hidden="true"
    >
      <div
        className="w-full h-full motion-safe:animate-[spin_var(--ct-dur)_linear_infinite]"
        style={{ '--ct-dur': `${duration}s` }}
      >
        <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full">
          <defs>
            <path id={pathId} d={d} fill="none" />
          </defs>
          <text
            className="font-serif fill-text-muted"
            style={{ fontSize: '11px', letterSpacing: '0.16em' }}
          >
            <textPath href={`#${pathId}`}>{text}</textPath>
          </text>
        </svg>
      </div>
    </div>
  )
}
