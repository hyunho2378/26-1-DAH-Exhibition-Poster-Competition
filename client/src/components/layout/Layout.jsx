import Header from './Header'
import Footer from './Footer'
import ScrollToTop from './ScrollToTop'
import CustomCursor from '../ui/CustomCursor'

export default function Layout({ children }) {
  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:px-4 focus:py-2 focus:bg-accent focus:text-text-inverse focus:font-pretendard focus:text-sm focus:rounded"
      >
        본문으로 이동
      </a>
      <ScrollToTop />
      <CustomCursor />
      <Header />

      <main
        className="min-h-screen bg-bg-primary pt-14 md:pt-24"
        id="main-content"
      >
        {children}
      </main>

      <Footer />
    </>
  )
}
