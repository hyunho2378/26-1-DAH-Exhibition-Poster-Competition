import { useRef, useEffect, useState } from 'react'

const CHARS = '!<>-_\\/[]{}=+*^?#01'

function scrambleChar() {
  return CHARS[Math.floor(Math.random() * CHARS.length)]
}

export default function ScrambleText({ text, runSignal = 0, startDelay = 0, className = '' }) {
  const [display, setDisplay] = useState(text)
  const rafRef = useRef(null)
  const timerRef = useRef(null)

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (prefersReduced) {
      setDisplay(text)
      return
    }

    function run() {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      const duration = text.length * 40
      const start = performance.now()

      function frame(now) {
        const elapsed = now - start
        const progress = Math.min(elapsed / duration, 1)
        const result = text
          .split('')
          .map((char, i) => {
            if (char === ' ') return ' '
            if (progress >= (i + 1) / text.length) return char
            return scrambleChar()
          })
          .join('')
        setDisplay(result)
        if (progress < 1) {
          rafRef.current = requestAnimationFrame(frame)
        } else {
          setDisplay(text)
        }
      }
      rafRef.current = requestAnimationFrame(frame)
    }

    timerRef.current = setTimeout(run, startDelay)
    return () => {
      clearTimeout(timerRef.current)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [runSignal])

  return <span className={className}>{display}</span>
}
