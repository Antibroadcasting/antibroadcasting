import type { ReactNode } from "react";

/** Line + mono eyebrow label — the "Index 01 — ..." heading marker used above section headings. */
export function SectionLabel({
  children,
  className = "mb-12",
  lineColor = "bg-foreground/30",
  textColor = "text-text-tertiary",
}: {
  children: ReactNode;
  className?: string;
  lineColor?: string;
  textColor?: string;
}) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className={`block h-px w-8 ${lineColor}`} />
      <span
        className={`font-mono text-xs uppercase tracking-widest ${textColor}`}
      >
        {children}
      </span>
    </div>
  );
}
