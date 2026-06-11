export default function PosterSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* 이미지 영역 */}
      <div
        className="w-full bg-surface-01"
        style={{
          aspectRatio: '1 / 1.414',
          borderRadius: '4px',
          animation: 'skeletonPulse 2s ease-in-out infinite',
        }}
      />
      {/* 텍스트 플레이스홀더 */}
      <div className="flex flex-col gap-2 mt-1">
        <div
          className="bg-surface-01"
          style={{ height: '10px', width: '30%', borderRadius: '2px', animation: 'skeletonPulse 2s ease-in-out infinite' }}
        />
        <div
          className="bg-surface-01"
          style={{ height: '12px', width: '70%', borderRadius: '2px', animation: 'skeletonPulse 2s ease-in-out infinite 100ms' }}
        />
      </div>
    </div>
  )
}
