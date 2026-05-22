import { useEffect, useRef } from 'react'
const BODY_TEXT = "I'M NOT A TEAPOT · HUMAN TOUCH · 418 · WARMTH · the trace that never gets erased · DIGITAL HUMANITIES · ARTS · I'M NOT A TEAPOT · 418 · HUMAN TOUCH · "
const HIGHLIGHT_WORDS = ['HUMAN', 'TOUCH', '418']
const GLITCH_CHARS = '!<>-_\\/[]{}=+*^?#'
const COLS = 32, ROWS = 32, CHAR_W = 9, CHAR_H = 12
const OFFSET_X = 10, OFFSET_Y = 10, BX = 20, BY = 19
const SVG_W = COLS * CHAR_W + 20, SVG_H = ROWS * CHAR_H + 20
const ROT_OX = OFFSET_X + BX * CHAR_W + CHAR_W / 2
const ROT_OY = OFFSET_Y + BY * CHAR_H + CHAR_H / 2
function makeTeapotMask() {
  const mask = Array.from({ length: ROWS }, () => new Array(COLS).fill(false))
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const dx = (c - BX) / 10, dy = (r - BY) / 10
    if (dx*dx + dy*dy <= 1) mask[r][c] = true
  }
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++) {
    const dx = (c - 20) / 5, dy = (r - 8) / 2
    if (dx*dx + dy*dy <= 1) mask[r][c] = true
  }
  for (let r = 5; r <= 6; r++) for (let c = 18; c <= 22; c++) mask[r][c] = true
  for (let c = 0; c <= 10; c++) {
    const halfH = Math.round(1 + (c/10)*1.5)
    for (let r = 11-halfH; r <= 11+halfH; r++) if (r>=0&&r<ROWS) mask[r][c] = true
  }
  for (let r = 15; r <= 23; r++) {
    const d = Math.abs(r-19)
    if (d<=4) { mask[r][30]=true; if(d<=2) mask[r][31]=true }
  }
  return mask
}
const MASK = makeTeapotMask()
function buildFlatChars() {
  const flat = []; let idx = 0
  for (let r = 0; r < ROWS; r++) for (let c = 0; c < COLS; c++)
    if (MASK[r][c]) { flat.push({ r, c, ch: BODY_TEXT[idx % BODY_TEXT.length] }); idx++ }
  const text = flat.map(f=>f.ch).join('')
  const marked = new Uint8Array(flat.length)
  for (const word of HIGHLIGHT_WORDS) {
    let pos = 0
    while ((pos = text.indexOf(word, pos)) !== -1) {
      for (let k = pos; k < pos+word.length; k++) marked[k] = 1; pos++
    }
  }
  return flat.map((f,i) => ({ ...f, highlight: !!marked[i] }))
}
const FLAT_CHARS = buildFlatChars()
const lerp = (a,b,t) => a+(b-a)*t
const clamp = (v,lo,hi) => Math.max(lo,Math.min(hi,v))
export default function TeapotTypo() {
  const sectionRef = useRef(null)
  const wrapperRef = useRef(null)
  const pourRef = useRef(null)
  const charRefs = useRef([])
  const glitchTimerRef = useRef(null)
  const cur = useRef({ tx: 9999, sc: 0, op: 0, rot: 0 })
  const rafRef = useRef(null)
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const getBase = () => (window.innerWidth * 0.20) / SVG_W
    const getTarget = (p) => {
      const base = getBase()
      if (p < 0.20) {
        const t = p/0.20
        return { tx: window.innerWidth*0.5*(1-t), sc:(0.6+0.4*t)*base, op:t, rot:0 }
      } else if (p < 0.80) {
        const t = (p-0.20)/0.60
        return { tx:0, sc:base, op:1, rot:-25*t }
      } else {
        const t = (p-0.80)/0.20
        return { tx:0, sc:base, op:1-t, rot:-25 }
      }
    }
    function loop() {
      rafRef.current = requestAnimationFrame(loop)
      if (!sectionRef.current || !wrapperRef.current) return
      const rect = sectionRef.current.getBoundingClientRect()
      const scrollable = rect.height - window.innerHeight
      if (scrollable <= 0) return
      const progress = clamp(-rect.top / scrollable, 0, 1)
      const tgt = getTarget(progress)
      const L = 0.07
      cur.current.tx  = lerp(cur.current.tx,  tgt.tx,  L)
      cur.current.sc  = lerp(cur.current.sc,  tgt.sc,  L)
      cur.current.op  = lerp(cur.current.op,  tgt.op,  L)
      cur.current.rot = lerp(cur.current.rot, tgt.rot, L)
      const { tx, sc, op, rot } = cur.current
      wrapperRef.current.style.transform = `translateX(${tx}px) rotate(${rot}deg) scale(${sc})`
      wrapperRef.current.style.opacity = op
      if (pourRef.current) {
        if (progress >= 0.4 && progress < 0.80) {
          const t = (progress-0.4)/0.4
          pourRef.current.style.opacity = clamp(t*1.5,0,1)
          pourRef.current.style.transform = `translateY(${-25*t}px)`
        } else { pourRef.current.style.opacity = 0 }
      }
    }
    cur.current = { tx: window.innerWidth*0.5, sc:0, op:0, rot:0 }
    rafRef.current = requestAnimationFrame(loop)
    function scheduleGlitch() {
      glitchTimerRef.current = setTimeout(() => {
        const count = 2+Math.floor(Math.random()*3), restore = []
        for (let i = 0; i < count; i++) {
          const idx = Math.floor(Math.random()*charRefs.current.length)
          const el = charRefs.current[idx]
          if (el) { restore.push({el, original:FLAT_CHARS[idx].ch}); el.textContent = GLITCH_CHARS[Math.floor(Math.random()*GLITCH_CHARS.length)] }
        }
        setTimeout(() => restore.forEach(({el,original}) => { el.textContent=original }), 80)
        scheduleGlitch()
      }, 300+Math.random()*700)
    }
    scheduleGlitch()
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      clearTimeout(glitchTimerRef.current)
    }
  }, [])
  return (
    <div ref={sectionRef} style={{ height:'180vh', position:'relative' }}>
      <div style={{ position:'sticky', top:0, height:'100vh', overflow:'hidden', pointerEvents:'none', display:'flex', alignItems:'center', justifyContent:'center' }} aria-hidden="true">
        <div ref={wrapperRef} className="select-none" style={{ flexShrink:0, width:SVG_W, height:SVG_H+40, opacity:0, transformOrigin:'center center', willChange:'transform,opacity' }}>
          <svg width={SVG_W} height={SVG_H} viewBox={`0 0 ${SVG_W} ${SVG_H}`} style={{ overflow:'hidden', display:'block' }}>
            <ellipse cx={ROT_OX} cy={ROT_OY} rx={10*CHAR_W} ry={10*CHAR_H} fill="none" stroke="#444" strokeWidth="0.5" opacity="0.4"/>
            <g style={{ transformOrigin:`${ROT_OX}px ${ROT_OY}px` }}>
              {FLAT_CHARS.map(({r,c,ch,highlight},i) => (
                <text key={i} ref={el=>{charRefs.current[i]=el}} x={OFFSET_X+c*CHAR_W} y={OFFSET_Y+r*CHAR_H+CHAR_H*0.8} fontFamily="SUIT, sans-serif" fontSize={highlight?'10':'8'} fontWeight={highlight?'700':'400'} fill={highlight?'#C8E63C':'#5a5a5a'} letterSpacing="0">{ch}</text>
              ))}
            </g>
          </svg>
          <div ref={pourRef} className="font-serif" style={{ position:'absolute', top:OFFSET_Y+10*CHAR_H, left:0, fontSize:'13px', fontStyle:'italic', color:'#C8E63C', opacity:0, transform:'translateY(0px)', whiteSpace:'nowrap', letterSpacing:'-0.01em' }}>the trace that never gets erased</div>
        </div>
      </div>
    </div>
  )
}
