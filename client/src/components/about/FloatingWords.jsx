const WORDS = [
  { text: '418', x: '72%', y: '12%', size: '11px', delay: '0s', dur: '4.2s' },
  { text: 'HTTP 418', x: '63%', y: '68%', size: '10px', delay: '1.1s', dur: '5.5s' },
  { text: '{ teapot: false }', x: '66%', y: '38%', size: '9px', delay: '0.4s', dur: '3.8s' },
  { text: 'brew', x: '58%', y: '82%', size: '12px', delay: '2.0s', dur: '6.1s' },
  { text: 'trace', x: '78%', y: '52%', size: '11px', delay: '0.7s', dur: '4.7s' },
  { text: '0x418', x: '61%', y: '22%', size: '11px', delay: '1.6s', dur: '5.0s' },
  { text: 'error → art', x: '70%', y: '76%', size: '10px', delay: '0.3s', dur: '3.5s' },
  { text: 'warmth', x: '55%', y: '45%', size: '10px', delay: '2.5s', dur: '6.8s' },
  { text: 'I\'M NOT A TEAPOT', x: '59%', y: '90%', size: '9px', delay: '1.3s', dur: '5.2s' },
]

export default function FloatingWords() {
  return (
    <div
      className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      aria-hidden="true"
    >
      {WORDS.map(({ text, x, y, size, delay, dur }) => (
        <span
          key={text}
          className="absolute font-suit text-text-muted"
          style={{
            left: x,
            top: y,
            fontSize: size,
            letterSpacing: '0.05em',
            fontWeight: 600,
            opacity: 0.18,
            animation: `floatGlitch ${dur} ${delay} infinite`,
            whiteSpace: 'nowrap',
          }}
        >
          {text}
        </span>
      ))}
    </div>
  )
}
