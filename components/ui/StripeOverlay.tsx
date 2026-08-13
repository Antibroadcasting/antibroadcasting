import type { CSSProperties } from "react";

/** Diagonal 45° stripe texture overlay — screen-print halftone motif. */
export function StripeOverlay({
  opacity = 0.12,
  className = "",
}: {
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none bg-texture-stripe ${className}`}
      style={{ "--texture-stripe-opacity": opacity } as CSSProperties}
    />
  );
}
