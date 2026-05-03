export default function Loading() {
  return (
    <div className="max-w-3xl mx-auto animate-pulse">
      <div className="h-8 w-48 bg-bg-inset rounded-md mb-4" />
      <div className="h-4 w-80 bg-bg-inset rounded-md mb-10" />
      <div className="space-y-6">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="h-4 w-3/4 bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
          </div>
        ))}
      </div>
    </div>
  );
}
