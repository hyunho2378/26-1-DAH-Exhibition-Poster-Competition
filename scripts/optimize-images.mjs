// scripts/optimize-images.mjs
// 원본(.png/.gif)은 읽기 전용. 압축본은 새 파일명(-thumb.webp / -full.webp / .webp)으로만 생성한다.
//
// PNG  → {slug}-thumb.webp (max 800px,  q80) + {slug}-full.webp (max 2400px, q90)
// GIF  → {slug}.webp        (애니메이션 webp, max 1080px, q60)  ※ ffmpeg 없이 sharp로 처리
//
// 실행: 프로젝트 루트에서  node scripts/optimize-images.mjs

import sharp from 'sharp'
import { readdir, stat } from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const WORKS_DIR = path.resolve(__dirname, '../client/public/images/works')

const fmt = (bytes) => {
  if (bytes >= 1024 * 1024) return `${(bytes / 1024 / 1024).toFixed(2)} MB`
  return `${(bytes / 1024).toFixed(1)} KB`
}

const sizeOf = async (p) => (await stat(p)).size

async function processPng(slug, inputPath) {
  const before = await sizeOf(inputPath)

  const thumbOut = path.join(WORKS_DIR, `${slug}-thumb.webp`)
  const fullOut = path.join(WORKS_DIR, `${slug}-full.webp`)

  await sharp(inputPath)
    .resize({ width: 800, withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(thumbOut)

  await sharp(inputPath)
    .resize({ width: 2400, withoutEnlargement: true })
    .webp({ quality: 90 })
    .toFile(fullOut)

  const thumbSize = await sizeOf(thumbOut)
  const fullSize = await sizeOf(fullOut)

  console.log(
    `  PNG  ${slug}\n` +
    `       원본    ${fmt(before)}\n` +
    `       thumb   ${fmt(thumbSize)}  (${slug}-thumb.webp)\n` +
    `       full    ${fmt(fullSize)}  (${slug}-full.webp)`
  )

  return { before, after: thumbSize + fullSize }
}

async function processGif(slug, inputPath) {
  const before = await sizeOf(inputPath)
  const out = path.join(WORKS_DIR, `${slug}.webp`)

  try {
    // 애니메이션 GIF는 프레임이 세로로 쌓여 기본 픽셀 한도를 초과하므로 해제한다.
    await sharp(inputPath, { animated: true, limitInputPixels: false })
      .resize({ width: 1080, withoutEnlargement: true })
      .webp({ quality: 60, effort: 4 })
      .toFile(out)

    const after = await sizeOf(out)
    console.log(
      `  GIF  ${slug}\n` +
      `       원본    ${fmt(before)}\n` +
      `       webp    ${fmt(after)}  (${slug}.webp, 애니메이션 유지)`
    )
    return { before, after, ok: true }
  } catch (err) {
    console.log(
      `  GIF  ${slug}  — 변환 실패 (원본 ${fmt(before)} 보존)\n` +
      `       사유: ${err.message}`
    )
    return { before, after: 0, ok: false }
  }
}

async function main() {
  const entries = await readdir(WORKS_DIR)

  // 원본만 대상: 이미 생성된 webp/숨김파일 제외
  const pngs = entries.filter((f) => f.toLowerCase().endsWith('.png'))
  const gifs = entries.filter((f) => f.toLowerCase().endsWith('.gif'))

  console.log(`\n대상 디렉터리: ${WORKS_DIR}`)
  console.log(`PNG ${pngs.length}개, GIF ${gifs.length}개\n`)

  let totalBefore = 0
  let totalAfter = 0

  console.log('── PNG 압축 ─────────────────────────────────')
  for (const file of pngs.sort()) {
    const slug = path.basename(file, path.extname(file))
    const { before, after } = await processPng(slug, path.join(WORKS_DIR, file))
    totalBefore += before
    totalAfter += after
  }

  if (gifs.length) {
    console.log('\n── GIF 압축 (애니메이션 webp) ───────────────')
    for (const file of gifs.sort()) {
      const slug = path.basename(file, path.extname(file))
      const { before, after } = await processGif(slug, path.join(WORKS_DIR, file))
      totalBefore += before
      totalAfter += after
    }
  }

  const saved = totalBefore - totalAfter
  const pct = totalBefore ? ((saved / totalBefore) * 100).toFixed(1) : '0'

  console.log('\n══ 합계 ═════════════════════════════════════')
  console.log(`  before  ${fmt(totalBefore)}`)
  console.log(`  after   ${fmt(totalAfter)}  (압축본 합계)`)
  console.log(`  절감    ${fmt(saved)}  (${pct}%)`)
  console.log(`  ※ 원본 파일은 그대로 보존됨`)
  console.log('═════════════════════════════════════════════\n')
}

main().catch((err) => {
  console.error('스크립트 오류:', err)
  process.exit(1)
})
