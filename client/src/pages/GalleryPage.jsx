import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const IMAGES = Array.from({ length: 7 }, (_, i) => `/images/gallery/gallery-0${i + 1}.jpg`)
const INTERVAL = 3500

function NavBtn({ side, disabled, onClick, hovered, onMouseEnter, onMouseLeave }) {
  const color = disabled ? '#555' : hovered ? '#C8E63C' : '#f0f0f0'
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      style={{
        position: 'absolute',
        top: '50%',
        [side]: '16px',
        transform: 'translateY(-50%)',
        background: 'rgba(0,0,0,0.5)',
        border: 'none',
        borderRadius: '4px',
        padding: '10px',
        cursor: disabled ? 'default' : 'pointer',
        color,
        display: 'flex',
        alignItems: 'center',
        transition: 'color 0.2s ease',
        zIndex: 1,
      }}
    >
      {side === 'left' ? <ChevronLeft size={28} /> : <ChevronRight size={28} />}
    </button>
  )
}

export default function GalleryPage() {
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)
  const [hoveredLeft, setHoveredLeft] = useState(false)
  const [hoveredRight, setHoveredRight] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    document.title = "Gallery — 418 I'M A TEAPOT"
  }, [])

  function startTimer() {
    clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setIndex(i => (i + 1) % IMAGES.length)
    }, INTERVAL)
  }

  useEffect(() => {
    startTimer()
    return () => clearInterval(timerRef.current)
  }, [])

  function goTo(i) {
    setVisible(false)
    setTimeout(() => {
      setIndex(i)
      setVisible(true)
      startTimer()
    }, 300)
  }

  function prev() {
    goTo((index - 1 + IMAGES.length) % IMAGES.length)
  }

  function next() {
    goTo((index + 1) % IMAGES.length)
  }

  return (
    <div
      className="px-4 md:px-6 lg:px-10 2xl:px-12"
      style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', paddingTop: '40px', paddingBottom: '40px' }}
    >
      <h1
        className="font-serif"
        style={{
          fontSize: 'clamp(40px, 8vw, 100px)',
          fontStyle: 'italic',
          fontWeight: 600,
          lineHeight: 1.0,
          letterSpacing: '-0.02em',
          color: '#f0f0f0',
          marginBottom: '32px',
        }}
      >
        Gallery
      </h1>

      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* 이미지 영역 */}
        <div style={{ position: 'relative', width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#0d0d0d' }}>
          <img
            src={IMAGES[index]}
            alt={`Gallery ${index + 1}`}
            style={{
              maxHeight: '70vh',
              width: 'auto',
              maxWidth: '100%',
              objectFit: 'contain',
              display: 'block',
              opacity: visible ? 1 : 0,
              transition: 'opacity 0.3s ease',
            }}
          />
          <NavBtn
            side="left"
            disabled={false}
            onClick={prev}
            hovered={hoveredLeft}
            onMouseEnter={() => setHoveredLeft(true)}
            onMouseLeave={() => setHoveredLeft(false)}
          />
          <NavBtn
            side="right"
            disabled={false}
            onClick={next}
            hovered={hoveredRight}
            onMouseEnter={() => setHoveredRight(true)}
            onMouseLeave={() => setHoveredRight(false)}
          />
        </div>

        {/* 라디오 점 */}
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px' }}>
          {IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              style={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                background: i === index ? '#C8E63C' : 'transparent',
                border: `1px solid ${i === index ? '#C8E63C' : '#555'}`,
                padding: 0,
                cursor: 'pointer',
                flexShrink: 0,
              }}
              aria-label={`슬라이드 ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
