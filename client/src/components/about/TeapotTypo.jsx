import { useEffect, useRef } from 'react'

const BODY_TEXT = "I'M A TEAPOT · HUMAN TOUCH · 418 · WARMTH · the trace that never gets erased · DIGITAL HUMANITIES · ARTS · I'M A TEAPOT · 418 · HUMAN TOUCH · "
const HIGHLIGHT_WORDS = ['HUMAN', 'TOUCH', '418']
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#'

const COLS = 32
const ROWS = 32
const CHAR_W = 9
const CHAR_H = 12
const OFFSET_X = 10
const OFFSET_Y = 10
const BX = 20
const BY = 19
const SVG_W = COLS * CHAR_W + 20
const SVG_H = ROWS * CHAR_H + 20
const ROT_OX = OFFSET_X + BX * CHAR_W + CHAR_W / 2
const ROT_OY = OFFSET_Y + BY * CHAR_H + CHAR_H / 2

function makeTeapotMask() {
  const mask = Array.from({ length: ROWS }, () => new Array(COLS).fill(false))
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dx = (c - BX) / 10; const dy = (r - BY) / 10
      if (dx * dx + dy * dy <= 1) mask[r][c] = true
    }
  }
  for (let r = 0; r < ROWS; r++) {
    for (let c = 0; c < COLS; c++) {
      const dx = (c - 20) / 5; const dy = (r - 8) / 2
      if (dx * dx + dy * dy <= 1) mask[r][c] = true
    }
  }
  for (let r = 5; r <= 6; r++)
    for (let c = 18; c <= 22; c++) mask[r][c] = true
  for (let c = 0; c <= 10; c++) {
    const halfH = Math.round(1 + (c / 10) * 1.5)
    for (let r = 11 - halfH; r <= 11 + halfH; r++)
      if (r >= 0 && r < ROWS) mask[r][c] = true
  }
  for (let r = 15; r <= 23; r++) {
    const d = Math.abs(r - 19)
    if (d <= 4) { mask[r][30] = true; if (d <= 2) mask[r][31] = true }
  }
  return mask
}

const MASK = makeTeapotMask()

function buildFlatChars() {
  const flat = []
  let idx = 0
  for (let r = 0; r < ROWS; r++)
    for (let c = 0; c < COLS; c++)
      if (MASK[r][c]) { flat.push({ r, c, ch: BODY_TEXT[idx % BODY_TEXT.length] }); idx++ }
  const text = flat.map(f => f.ch).join('')
  const marked = new Uint8Array(flat.length)
  for (const word of HIGHLIGHT_WORDS) {
    let pos = 0
    while ((pos = text.indexOf(word, pos)) !== -1) {
      for (let k = pos; k < pos + word.length; k++) marked[k] = 1; pos++
    }
  }
  return flat.map((f, i) => ({ ...f, highlight: !!marked[i] }))
}

const FLAT_CHARS = buildFlatChars()

function lerp(a, b, t) { return a + (b - a) * t }
function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)) }

export default function TeapotTypo() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const pourRef = useRef(null)
  const charRefs = useRef([])
  const glitchTimerRef = useRef(null)

  // 현재 렌더된 값 (lerp 대상)
  const cur = useRef({ tx: 9999, sc: 0, op: 0, rot: 0 })
  const rafRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    // 크기: viewport 너비의 20% (이전 60%의 1/3)
    function getBase() {
      const w = window.innerWidth
      // 390px(모바일) → 0.65, 768px(태블릿) → 0.38, 1440px+(데스크탑) → 0.20
      // 구간별 선형 보간
      let ratio
      if (w < 768) {
        ratio = 0.65
      } else if (w < 1440) {
        const t = (w - 768) / (1440 - 768)
        ratio = 0.38 - (0.38 - 0.20) * t
      } else {
        ratio = 0.20
      }
      return (w * ratio) / SVG_W
    }

    // progress → 목표값 계산
    function getTarget(progress) {
      const base = getBase()
      let tx, sc, op, rot
      const isMobile = window.innerWidth < 768
      const enterEnd = isMobile ? 0.10 : 0.25
      if (progress < enterEnd) {
        // 진입: 빠르게 우측에서 들어옴
        const p = progress / enterEnd
        tx = window.innerWidth * (isMobile ? 0.2 : 0.4) * (1 - p)
        sc = ((isMobile ? 0.9 : 0.7) + (isMobile ? 0.1 : 0.3) * p) * base
        op = isMobile ? Math.min(p * 4, 1) : p
        rot = 0
      } else if (progress < 0.80) {
        // 머묾+기울기 (전체의 60% — 스크롤 많이 해야 벗어남)
        const p = (progress - 0.20) / 0.60
        tx = 0
        sc = base
        op = 1
        rot = -25 * p
      } else {
        // 퇴장 — 진입의 완전한 거울 반전
        // 진입: tx = +0.5vw→0, sc = 0.6→1.0, op = 0→1
        // 퇴장: tx = 0→-0.5vw, sc = 1.0→0.6, op = 1→0 (동일 속도, 반대 방향)
        const p = (progress - 0.80) / 0.20
        tx = -window.innerWidth * 0.5 * p
        sc = (1.0 - 0.4 * p) * base
        op = 1 - p
        rot = -25
      }
      return { tx, sc, op, rot }
    }

    // 연속 rAF 루프 — lerp으로 부드럽게
    function loop() {
      rafRef.current = requestAnimationFrame(loop)

      if (!sectionRef.current || !wrapperRef.current) return

      const rect = sectionRef.current.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const progress = clamp(-rect.top / scrollable, 0, 1)

      const tgt = getTarget(progress)
      const L = 0.07  // lerp 계수 — 낮을수록 부드럽고 느림

      cur.current.tx = lerp(cur.current.tx, tgt.tx, L)
      cur.current.sc = lerp(cur.current.sc, tgt.sc, L)
      cur.current.op = lerp(cur.current.op, tgt.op, L)
      cur.current.rot = lerp(cur.current.rot, tgt.rot, L)

      const { tx, sc, op, rot } = cur.current
      wrapperRef.current.style.transform =
        `translateX(${tx}px) rotate(${rot}deg) scale(${sc})`
      wrapperRef.current.style.opacity = op

      // 쏟아지는 텍스트
      if (pourRef.current) {
        if (progress >= 0.4 && progress < 0.80) {
          const p = (progress - 0.4) / 0.4
          pourRef.current.style.opacity = clamp(p * 1.5, 0, 1)
          pourRef.current.style.transform = `translateY(${-25 * p}px)`
        } else {
          pourRef.current.style.opacity = 0
        }
      }
    }

    // 초기값: 화면 밖 우측
    cur.current = { tx: window.innerWidth * 0.5, sc: 0, op: 0, rot: 0 }
    rafRef.current = requestAnimationFrame(loop)

    // 글리치
    function scheduleGlitch() {
      glitchTimerRef.current = setTimeout(() => {
        const count = 2 + Math.floor(Math.random() * 3)
        const restore = []
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random() * charRefs.current.length)
          const el = charRefs.current[idx]
          if (el) {
            restore.push({ el, original: FLAT_CHARS[idx].ch })
            el.textContent = GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)]
          }
        }
        setTimeout(() => restore.forEach(({ el, original }) => { el.textContent = original }), 80)
        scheduleGlitch()
      }, 300 + Math.random() * 700)
    }
    scheduleGlitch()

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(glitchTimerRef.current)
    }
  }, [])

  return (
    // 180vh — 섹션 진입하면 금방 티팟 보임 (scrollable = 80vh)
    // 머무는 구간(0.2~0.8) = 80vh * 0.6 = 48vh ≈ 스크롤 4~5번
    <div ref={sectionRef} style={{ height: typeof window !== 'undefined' && window.innerWidth < 768 ? '250vh' : '180vh', position: 'relative' }}>
      <div
        style={{
          position: 'sticky',
          top: 0,
          height: '100vh',
          overflow: 'hidden',
          pointerEvents: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        aria-hidden="true"
      >
        <div
          ref={wrapperRef}
          className="select-none"
          style={{
            flexShrink: 0,
            width: SVG_W,
            height: SVG_H + 40,
            opacity: 0,
            transformOrigin: 'center center',
            willChange: 'transform, opacity',
          }}
        >
          <svg
            width={SVG_W}
            height={SVG_H}
            viewBox={`0 0 ${SVG_W} ${SVG_H}`}
            style={{ overflow: 'hidden', display: 'block' }}
          >
            <ellipse
              cx={ROT_OX} cy={ROT_OY}
              rx={10 * CHAR_W} ry={10 * CHAR_H}
              fill="none" stroke="#444" strokeWidth="0.5" opacity="0.4"
            />
            <g style={{ transformOrigin: `${ROT_OX}px ${ROT_OY}px` }}>
              {FLAT_CHARS.map(({ r, c, ch, highlight }, i) => (
                <text
                  key={i}
                  ref={el => { charRefs.current[i] = el }}
                  x={OFFSET_X + c * CHAR_W}
                  y={OFFSET_Y + r * CHAR_H + CHAR_H * 0.8}
                  fontFamily="SUIT, sans-serif"
                  fontSize={highlight ? '10' : '8'}
                  fontWeight={highlight ? '700' : '400'}
                  fill={highlight ? '#C8E63C' : '#5a5a5a'}
                  letterSpacing="0"
                >
                  {ch}
                </text>
              ))}
            </g>
          </svg>
          <div
            ref={pourRef}
            className="font-serif"
            style={{
              position: 'absolute',
              top: OFFSET_Y + 10 * CHAR_H,
              left: 0,
              fontSize: '13px',
              fontStyle: 'italic',
              color: '#C8E63C',
              opacity: 0,
              transform: 'translateY(0px)',
              whiteSpace: 'nowrap',
              letterSpacing: '-0.01em',
            }}
          >
            the trace that never gets erased
          </div>
        </div>
      </div>
    </div>
  )
}