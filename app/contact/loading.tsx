export default function Loading() {
  return (
    <div className="max-w-2xl mx-auto animate-pulse">
      <div className="h-8 w-48 bg-bg-inset rounded-md mb-4" />
      <div className="h-4 w-full max-w-sm bg-bg-inset rounded-md mb-10" />

      {/* Form skeleton */}
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-16 bg-bg-inset rounded" />
              <div className="h-10 w-full bg-bg-inset rounded-input" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-20 bg-bg-inset rounded" />
              <div className="h-10 w-full bg-bg-inset rounded-input" />
            </div>
          ))}
        </div>
        <div className="space-y-2">
          <div className="h-3 w-40 bg-bg-inset rounded" />
          <div className="h-32 w-full bg-bg-inset rounded-input" />
        </div>
        <div className="h-12 w-48 bg-bg-inset rounded-button" />
      </div>
    </div>
  );
}
