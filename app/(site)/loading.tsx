export default function Loading() {
  return (
    <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto animate-pulse">
      {/* Hero */}
      <section className="relative flex flex-col justify-center min-h-[calc(100svh-4.5rem)]">
        {/* Badge */}
        <div className="h-6 w-52 bg-bg-inset rounded-sm mb-8" />

        {/* Display headline — three stacked lines */}
        <div className="space-y-1">
          <div className="h-24 md:h-32 w-2/3 bg-bg-inset rounded-sm" />
          <div className="h-24 md:h-32 w-2/3 bg-bg-inset rounded-sm" />
          <div className="h-24 md:h-32 w-1/2 bg-bg-inset rounded-sm" />
        </div>

        {/* Sub-headline */}
        <div className="mt-6 space-y-2 max-w-md">
          <div className="h-4 w-full bg-bg-inset rounded" />
          <div className="h-4 w-5/6 bg-bg-inset rounded" />
          <div className="h-4 w-4/5 bg-bg-inset rounded" />
        </div>

        {/* CTAs */}
        <div className="flex gap-3 mt-8">
          <div className="h-10 w-32 bg-bg-inset rounded-button" />
          <div className="h-10 w-32 bg-bg-inset rounded-button" />
        </div>

        {/* Trust strip */}
        <div className="flex flex-wrap gap-6 mt-12 py-8 border-t border-border-subtle">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="space-y-1">
              <div className="h-9 w-16 bg-bg-inset rounded" />
              <div className="h-3 w-20 bg-bg-inset rounded" />
            </div>
          ))}
        </div>
      </section>

      {/* Featured Work */}
      <section className="py-16 border-t border-border-subtle">
        <div className="flex items-baseline justify-between mb-8">
          <div className="h-7 w-44 bg-bg-inset rounded" />
          <div className="h-5 w-20 bg-bg-inset rounded" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className="aspect-square bg-bg-inset rounded-card" />
          ))}
        </div>
      </section>

      {/* Process strip */}
      <section className="py-16 border-t border-border-subtle">
        <div className="flex flex-col sm:flex-row gap-px bg-border-subtle border border-border-subtle rounded-card overflow-hidden">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="flex-1 bg-bg-base p-8 flex flex-col gap-3">
              <div className="h-4 w-6 bg-bg-inset rounded" />
              <div className="h-12 w-40 bg-bg-inset rounded-sm" />
              <div className="h-4 w-full bg-bg-inset rounded" />
              <div className="h-4 w-4/5 bg-bg-inset rounded" />
            </div>
          ))}
        </div>
        <div className="mt-6 flex justify-end">
          <div className="h-5 w-36 bg-bg-inset rounded" />
        </div>
      </section>

      {/* CTA band */}
      <div className="my-8 rounded-card border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        <div className="space-y-2">
          <div className="h-10 w-48 bg-bg-inset rounded-sm" />
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
