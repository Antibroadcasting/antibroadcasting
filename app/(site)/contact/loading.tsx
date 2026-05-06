export default function Loading() {
  return (
    <div className="w-full max-w-400 mx-auto animate-pulse">
      {/* Page header */}
      <div className="my-12 max-w-2xl">
        <div className="h-6 w-24 bg-bg-inset rounded-sm mb-4" />
        <div className="h-28 md:h-36 w-full bg-bg-inset rounded-sm mb-1" />
        <div className="h-28 md:h-36 w-2/5 bg-bg-inset rounded-sm" />
      </div>

      {/* Two-column layout */}
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Contact info sidebar (right on desktop) */}
        <div className="w-full lg:w-1/3 lg:order-2">
          <div className="lg:max-w-96 mx-auto p-8 xl:p-16 bg-bg-muted border border-border-subtle rounded-md space-y-4">
            <div className="h-10 w-48 bg-bg-inset rounded-sm" />
            <div className="space-y-1">
              <div className="h-5 w-56 bg-bg-inset rounded" />
              <div className="h-5 w-48 bg-bg-inset rounded" />
            </div>
            <div className="h-5 w-36 bg-bg-inset rounded" />
            <div className="h-5 w-52 bg-bg-inset rounded" />
            <div className="flex gap-1 -ml-2">
              {Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="h-9 w-9 bg-bg-inset rounded" />
              ))}
            </div>
            <div className="h-4 w-44 bg-bg-inset rounded" />
          </div>
        </div>

        {/* Form */}
        <div className="flex-1 border border-border-subtle rounded-md p-8 lg:p-16">
          <div className="h-10 w-72 bg-bg-inset rounded-sm mb-4" />
          <div className="space-y-2 mb-10">
            <div className="h-4 w-full max-w-sm bg-bg-inset rounded" />
            <div className="h-4 w-2/3 bg-bg-inset rounded" />
          </div>

          <div className="space-y-6">
            {/* Name + Email */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-16 bg-bg-inset rounded" />
                  <div className="h-10 w-full bg-bg-inset rounded-input" />
                </div>
              ))}
            </div>

            {/* Quantity + Colors */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-24 bg-bg-inset rounded" />
                  <div className="h-10 w-full bg-bg-inset rounded-input" />
                  <div className="h-3 w-36 bg-bg-inset rounded" />
                </div>
              ))}
            </div>

            {/* Garment + Timeline */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {Array.from({ length: 2 }).map((_, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="h-3 w-20 bg-bg-inset rounded" />
                  <div className="h-10 w-full bg-bg-inset rounded-input" />
                </div>
              ))}
            </div>

            {/* Message */}
            <div className="space-y-1.5">
              <div className="h-3 w-44 bg-bg-inset rounded" />
              <div className="h-32 w-full bg-bg-inset rounded-input" />
            </div>

            {/* File upload */}
            <div className="h-20 w-full bg-bg-inset rounded-input" />

            {/* Submit */}
            <div className="h-10 w-44 bg-bg-inset rounded-button" />
          </div>
        </div>
      </div>
    </div>
  );
}
