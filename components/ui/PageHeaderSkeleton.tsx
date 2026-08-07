export function PageHeaderSkeleton({
  pillWidth = "w-24",
  lastLineWidth = "w-1/2",
  lineCount = 3,
}: {
  pillWidth?: string;
  lastLineWidth?: string;
  lineCount?: 2 | 3;
}) {
  return (
    <div className="my-12 max-w-2xl">
      <div className={`h-6 ${pillWidth} bg-bg-inset rounded-sm mb-4`} />
      {Array.from({ length: lineCount - 1 }).map((_, i) => (
        <div
          key={i}
          className="h-28 md:h-36 w-full bg-bg-inset rounded-sm mb-1"
        />
      ))}
      <div className={`h-28 md:h-36 ${lastLineWidth} bg-bg-inset rounded-sm`} />
    </div>
  );
}
