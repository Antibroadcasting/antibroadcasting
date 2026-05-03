export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-8 w-64 bg-bg-inset rounded-md mb-4" />
      <div className="h-4 w-full max-w-md bg-bg-inset rounded-md mb-12" />

      {/* Process steps skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-3 w-6 bg-bg-inset rounded" />
            <div className="h-5 w-32 bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-3/4 bg-bg-inset rounded" />
          </div>
        ))}
      </div>

      {/* FAQ skeleton */}
      <div className="h-6 w-48 bg-bg-inset rounded mb-6" />
      <div className="divide-y divide-border-subtle border-y border-border-subtle">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="py-5">
            <div className="h-4 w-3/4 bg-bg-inset rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
