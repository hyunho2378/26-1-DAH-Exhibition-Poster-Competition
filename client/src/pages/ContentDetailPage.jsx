import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getWorkById } from '../data/works'
import PosterDetail from '../components/poster/PosterDetail'
import NotFoundPage from './NotFoundPage'

export default function ContentDetailPage() {
  const { id } = useParams()
  const work = getWorkById(id)

  useEffect(() => {
    if (work) {
      document.title = `${work.title} — 418 I'M A NOT TEAPOT`
    }
  }, [work])

  if (!work) return <NotFoundPage />

  return <PosterDetail work={work} />
}
