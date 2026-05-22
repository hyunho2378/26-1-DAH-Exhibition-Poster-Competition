import { useEffect } from 'react'
import { works } from '../data/works'
import PageHeader from '../components/ui/PageHeader'
import PosterGrid from '../components/poster/PosterGrid'

export default function ContentPage() {
  useEffect(() => {
    document.title = "Content — 418 I'M A NOT TEAPOT"
  }, [])

  return (
    <div className="px-4 md:px-6 lg:px-10 2xl:px-12 py-10 md:py-14">
      <PageHeader title="Content" />
      <PosterGrid works={works} />
    </div>
  )
}
