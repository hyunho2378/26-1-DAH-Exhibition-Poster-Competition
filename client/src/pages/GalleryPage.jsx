import { useEffect } from 'react'
import PageHeader from '../components/ui/PageHeader'
import GalleryGrid from '../components/gallery/GalleryGrid'

export default function GalleryPage() {
  useEffect(() => {
    document.title = "Gallery — 418 I'M A NOT TEAPOT"
  }, [])

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12 py-10 md:py-14">
      <PageHeader title="Gallery" />

      <div className="mt-10">
        <GalleryGrid photos={[]} />
      </div>
    </div>
  )
}
