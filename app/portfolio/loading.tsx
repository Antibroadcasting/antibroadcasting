export default function Loading() {
  return (
    <div className="max-w-6xl mx-auto animate-pulse">
      {/* Header skeleton */}
      <div className="h-8 w-48 bg-bg-inset rounded-md mb-4" />
      <div className="h-4 w-96 bg-bg-inset rounded-md mb-12" />

      {/* Grid skeleton */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-bg-inset rounded-card" />
        ))}
      </div>
    </div>
  );
}
