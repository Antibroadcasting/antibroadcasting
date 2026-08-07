import { PageHeaderSkeleton } from "@/components/ui/PageHeaderSkeleton";
import { CtaBandSkeleton } from "@/components/ui/CtaBandSkeleton";

export default function Loading() {
  return (
    <div className="w-full max-w-300 xl:max-w-360 2xl:max-w-400 mx-auto animate-pulse">
      {/* Page header */}
      <PageHeaderSkeleton pillWidth="w-24" lastLineWidth="w-1/2" lineCount={3} />

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
      <CtaBandSkeleton headingWidth="w-56" />
    </div>
  );
}
