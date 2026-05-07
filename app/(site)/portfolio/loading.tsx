export default function Loading() {
  return (
    <div className="w-full max-w-300 2xl:max-w-360 3xl:max-w-400 mx-auto animate-pulse">
      {/* Page header */}
      <div className="my-12 max-w-2xl">
        <div className="h-6 w-24 bg-bg-inset rounded-sm mb-4" />
        <div className="h-28 md:h-36 w-full bg-bg-inset rounded-sm mb-1" />
        <div className="h-28 md:h-36 w-1/2 bg-bg-inset rounded-sm" />
      </div>

      {/* Category filter pills */}
      <div className="flex flex-wrap gap-2 mb-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-8 bg-bg-inset rounded-full"
            style={{ width: `${64 + i * 16}px` }}
          />
        ))}
      </div>

      {/* Gallery grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {Array.from({ length: 9 }).map((_, i) => (
          <div key={i} className="aspect-square bg-bg-inset rounded-card" />
        ))}
      </div>

      {/* CTA band */}
      <div className="my-8 rounded-card border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="h-10 w-56 bg-bg-inset rounded-sm" />
          <div className="h-4 w-72 bg-bg-inset rounded" />
        </div>
        <div className="flex gap-3">
          <div className="h-10 w-32 bg-bg-inset rounded-button" />
          <div className="h-10 w-32 bg-bg-inset rounded-button" />
        </div>
      </div>
    </div>
  );
}
