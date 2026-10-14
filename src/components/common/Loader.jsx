/** Full-page loading spinner shown during lazy-loaded route transitions. */
export function Loader() {
  return (
    <div
      role="status"
      aria-label="Loading"
      className="flex min-h-[60vh] items-center justify-center"
    >
      <span className="inline-block h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-brand-600" />
    </div>
  )
}

/** Skeleton card placeholder used while properties are being rendered. */
export function SkeletonCard() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-card animate-pulse">
      <div className="h-52 bg-gray-200" />
      <div className="p-5 space-y-3">
        <div className="h-4 w-3/4 rounded bg-gray-200" />
        <div className="h-3 w-1/2 rounded bg-gray-200" />
        <div className="h-5 w-1/3 rounded bg-gray-200" />
        <div className="flex gap-4 pt-2">
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-3 w-12 rounded bg-gray-200" />
          <div className="h-3 w-16 rounded bg-gray-200" />
        </div>
      </div>
    </div>
  )
}
