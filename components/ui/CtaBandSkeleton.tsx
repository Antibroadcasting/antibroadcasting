export function CtaBandSkeleton({
  headingWidth = "w-64",
}: {
  headingWidth?: string;
}) {
  return (
    <div className="my-8 rounded-card border border-border-subtle px-8 md:px-12 py-16 flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
      <div className="space-y-2">
        <div className={`h-10 ${headingWidth} bg-bg-inset rounded-sm`} />
        <div className="h-4 w-72 bg-bg-inset rounded" />
      </div>
      <div className="flex gap-3">
        <div className="h-10 w-32 bg-bg-inset rounded-button" />
        <div className="h-10 w-32 bg-bg-inset rounded-button" />
      </div>
    </div>
  );
}
