export default function Loading() {
  return (
    <div className="w-full max-w-300 2xl:max-w-360 3xl:max-w-400 mx-auto animate-pulse">
      {/* Page header */}
      <div className="my-12 max-w-2xl">
        <div className="h-6 w-20 bg-bg-inset rounded-sm mb-4" />
        <div className="h-28 md:h-36 w-full bg-bg-inset rounded-sm mb-1" />
        <div className="h-28 md:h-36 w-full bg-bg-inset rounded-sm mb-1" />
        <div className="h-28 md:h-36 w-1/2 bg-bg-inset rounded-sm" />
      </div>

      {/* Section 01: Philosophy — image right, text left */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 items-center">
        <div className="order-2 lg:order-1 flex flex-col gap-6">
          <div className="h-3 w-40 bg-bg-inset rounded" />
          <div className="h-16 md:h-20 w-3/4 bg-bg-inset rounded-sm" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-5/6 bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-4/5 bg-bg-inset rounded" />
          </div>
          <div className="border-l-2 border-border-subtle pl-5 space-y-2">
            <div className="h-4 w-64 bg-bg-inset rounded" />
            <div className="h-3 w-48 bg-bg-inset rounded" />
          </div>
        </div>
        <div className="order-1 lg:order-2 aspect-4/3 bg-bg-inset rounded-card" />
      </div>

      {/* Section 02: Founder story — image left, text right */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-20 lg:mb-28 items-center">
        <div className="aspect-4/3 bg-bg-inset rounded-card" />
        <div className="flex flex-col gap-6">
          <div className="h-3 w-32 bg-bg-inset rounded" />
          <div className="h-16 md:h-20 w-3/4 bg-bg-inset rounded-sm" />
          <div className="space-y-3">
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-4/5 bg-bg-inset rounded" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-3/4 bg-bg-inset rounded" />
          </div>
          <div className="flex items-center gap-4 mt-2">
            <div className="space-y-1">
              <div className="h-9 w-16 bg-bg-inset rounded" />
              <div className="h-3 w-24 bg-bg-inset rounded" />
            </div>
            <div className="w-px h-10 bg-border-subtle" />
            <div className="space-y-1">
              <div className="h-9 w-16 bg-bg-inset rounded" />
              <div className="h-3 w-32 bg-bg-inset rounded" />
            </div>
          </div>
        </div>
      </div>

      {/* Section 03: Who we work with */}
      <div className="border-t border-border-subtle pt-16 mb-20">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          <div className="lg:col-span-1 space-y-4">
            <div className="h-3 w-36 bg-bg-inset rounded" />
            <div className="h-16 md:h-20 w-full bg-bg-inset rounded-sm" />
          </div>
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="border border-border-subtle rounded-card p-6 space-y-2">
                <div className="h-4 w-36 bg-bg-inset rounded" />
                <div className="h-3 w-full bg-bg-inset rounded" />
                <div className="h-3 w-5/6 bg-bg-inset rounded" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <div className="my-8 rounded-card border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="h-10 w-64 bg-bg-inset rounded-sm" />
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
