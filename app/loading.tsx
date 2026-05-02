export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[40vh]">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 rounded-full border-2 border-border-default border-t-[var(--color-primary-500)] animate-spin" />
        <p className="text-sm text-text-muted">Loading…</p>
      </div>
    </div>
  );
}
