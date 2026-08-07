import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { CtaBandSkeleton } from "@/components/ui/CtaBandSkeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto animate-pulse">
      {/* Page header */}
      <PageHeaderSkeleton pillWidth="w-28" lastLineWidth="w-3/5" lineCount={3} />

      {/* Intro text */}
      <div className="mb-12 space-y-2 max-w-xl">
        <div className="h-4 w-full bg-bg-inset rounded" />
        <div className="h-4 w-4/5 bg-bg-inset rounded" />
      </div>

      {/* Process steps */}
      <div className="flex flex-col sm:flex-row gap-px bg-border-subtle border border-border-subtle rounded-card overflow-hidden mb-16">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="flex-1 bg-bg-base p-8 flex flex-col gap-3">
            <div className="h-4 w-6 bg-bg-inset rounded" />
            <div className="h-12 w-40 bg-bg-inset rounded-sm" />
            <div className="h-4 w-full bg-bg-inset rounded" />
            <div className="h-4 w-4/5 bg-bg-inset rounded" />
          </div>
        ))}
      </div>

      {/* Art requirements + FAQ two-column */}
      <div className="flex flex-col xl:flex-row gap-8">
        {/* Art requirements */}
        <div className="flex-1">
          <div className="h-20 md:h-24 w-3/4 bg-bg-inset rounded-sm mb-8" />
          <div className="flex flex-col gap-6 p-4">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="space-y-2">
                <div className="h-3 w-40 bg-bg-inset rounded" />
                {Array.from({ length: 3 }).map((_, j) => (
                  <div key={j} className="flex gap-3 items-start">
                    <div className="mt-2 shrink-0 w-1 h-1 rounded-full bg-bg-inset" />
                    <div
                      className="h-4 bg-bg-inset rounded"
                      style={{ width: `${70 + j * 10}%` }}
                    />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        {/* FAQ */}
        <div className="flex-1">
          <div className="h-20 md:h-24 w-3/4 bg-bg-inset rounded-sm mb-8" />
          <div className="divide-y divide-border-subtle border-y border-border-subtle">
            {Array.from({ length: 8 }).map((_, i) => (
              <div key={i} className="py-5 flex items-center justify-between">
                <div
                  className="h-4 bg-bg-inset rounded"
                  style={{ width: `${55 + (i % 3) * 12}%` }}
                />
                <div className="h-4 w-4 bg-bg-inset rounded ml-4" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA band */}
      <CtaBandSkeleton headingWidth="w-64" />
    </div>
  );
}
