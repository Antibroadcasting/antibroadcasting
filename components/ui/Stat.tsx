import type { ReactNode } from "react";

/** Big display number + mono label pair — used in hero/stats strips. */
export function Stat({
  value,
  label,
  valueClassName = "text-[clamp(2.5rem,5vw,4.5rem)]",
}: {
  value: ReactNode;
  label: ReactNode;
  valueClassName?: string;
}) {
  return (
    <div>
      <span
        className={`block font-display font-black leading-none text-text-primary ${valueClassName}`}
      >
        {value}
      </span>
      <span className="block font-mono uppercase tracking-widest text-xs text-text-tertiary mt-1">
        {label}
      </span>
    </div>
  );
}
