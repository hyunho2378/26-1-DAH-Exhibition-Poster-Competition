export default function Footer() {
  return (
    <footer
      className="bg-bg-primary px-4 md:px-6 lg:px-10 2xl:px-12 py-8 md:py-10"
      style={{ borderTop: '1px solid #1f1f1f' }}
    >
      <div className="flex flex-col md:flex-row md:justify-between gap-6 md:gap-0">

        {/* 좌측: DAH SVG 로고 + L-HUSS */}
        <div className="flex flex-col gap-3 items-start">
          <a
            href="https://sites.google.com/glab.hallym.ac.kr/dah-hallym/about?authuser=0"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 transition-colors duration-200"
            style={{ color: '#555555' }}
            onMouseEnter={e => { e.currentTarget.style.color = '#f0f0f0' }}
            onMouseLeave={e => { e.currentTarget.style.color = '#555555' }}
          >
            <svg
              viewBox="0 0 395.47 169.67"
              height="24"
              fill="currentColor"
              aria-hidden="true"
              style={{ display: 'block', flexShrink: 0 }}
            >
              <path d="M5.58,165.84c-.78,0-1.31,0-1.6,0l-3.97-.04L1.58,0l4.08.15c7.4.27,181.37,7.44,180.62,86.92-.73,76.48-161.58,78.77-180.7,78.77ZM9.45,8.3l-1.43,149.56c25.94-.36,169.68-5.32,170.31-70.87C178.96,21.43,35.66,9.86,9.45,8.3Z"/>
              <path d="M277.02,169.67l-185.99-1.77L156.73,3.12l61.92.59,58.37,165.96ZM102.71,160.06l163.05,1.55L213,11.61l-50.9-.49-59.39,148.94Z"/>
              <polygon points="393.97 165.68 386.02 165.6 386.82 81.55 241.36 81.55 241.36 164.07 233.41 164.18 229.01 6.44 236.96 6.21 238.83 73.6 383.37 73.6 387.54 7.54 395.47 7.83 393.97 165.68"/>
            </svg>
            <span
              className="font-pretendard"
              style={{ fontSize: '11px', lineHeight: 1.5, letterSpacing: '0em' }}
            >
              Hallym University&nbsp;&nbsp;DAH
            </span>
          </a>
          <span
            className="font-pretendard"
            style={{ fontSize: '11px', lineHeight: 1.5, letterSpacing: '0em', color: '#555555' }}
          >
            한림대학교 인문사회 융합인재양성사업단(L-HUSS) X 디지털인문예술전공
          </span>
        </div>

        {/* 우측: 텍스트 블록 */}
        <div
          className="font-pretendard flex flex-col gap-1 md:text-right"
          style={{ fontSize: '11px', lineHeight: 1.7, color: '#555555', letterSpacing: '0em' }}
        >
          <span>한림대학교 디지털인문예술전공 운영위원회 LUCID</span>
          <span>강원특별자치도 춘천시 한림대학길 1 일송기념도서관 4층 C.SQUARE</span>
          <span>웹사이트 제작/수정 문의: 주현호 (h20222583@glab.hallym.ac.kr)</span>
        </div>

      </div>
    </footer>
  )
}
