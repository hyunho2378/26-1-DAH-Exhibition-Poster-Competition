import { Routes, Route } from 'react-router-dom'
import { Suspense, lazy } from 'react'
import Layout from './components/layout/Layout'
import PageTransition from './components/layout/PageTransition'

const AboutPage         = lazy(() => import('./pages/AboutPage'))
const ContentPage       = lazy(() => import('./pages/ContentPage'))
const ContentDetailPage = lazy(() => import('./pages/ContentDetailPage'))
const AwardPage         = lazy(() => import('./pages/AwardPage'))
const GalleryPage       = lazy(() => import('./pages/GalleryPage'))
const NotFoundPage      = lazy(() => import('./pages/NotFoundPage'))

function PageFallback() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-bg-primary">
      <span className="text-caption text-text-muted tracking-widest uppercase font-pretendard">
        Loading
      </span>
    </div>
  )
}

export default function App() {
  return (
    <Layout>
      <Suspense fallback={<PageFallback />}>
        <PageTransition>
        <Routes>
          <Route path="/"            element={<AboutPage />} />
          <Route path="/content"     element={<ContentPage />} />
          <Route path="/content/:id" element={<ContentDetailPage />} />
          <Route path="/award"       element={<AwardPage />} />
          <Route path="/gallery"     element={<GalleryPage />} />
          <Route path="*"            element={<NotFoundPage />} />
        </Routes>
        </PageTransition>
      </Suspense>
    </Layout>
  )
}
