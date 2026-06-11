import PosterCard from './PosterCard'

export default function PosterGrid({ works = [], showAward = false }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
      {works.map((work, index) => (
        <PosterCard key={work.id} work={work} index={index} showAward={showAward} />
      ))}
    </div>
  )
}
