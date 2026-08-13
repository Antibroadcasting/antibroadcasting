import type { CSSProperties } from "react";

/** Broadside dot-texture overlay — screen-print halftone motif for flat color surfaces. */
export function DotOverlay({
  color,
  size = "9px",
  opacity = 0.12,
  className = "",
}: {
  color: string;
  size?: string;
  opacity?: number;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none bg-texture-dots ${className}`}
      style={
        {
          "--texture-dots-color": color,
          "--texture-dots-size": size,
          "--texture-dots-opacity": opacity,
        } as CSSProperties
      }
    />
  );
}
