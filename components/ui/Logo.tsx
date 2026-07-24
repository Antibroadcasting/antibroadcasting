import { forwardRef } from "react";

/**
 * Header lockup (registration mark + wordmark + tagline), rendered as three
 * CSS-masked layers over the source artwork in public/images/logo-mark-*.svg.
 * Ring and dot are both static (never animate): the ring is a constant brand
 * gold, the dot is theme-foreground. Ring is last in the DOM (painted on
 * top) so its crosshair strokes cross over the dot, matching the source
 * artwork's stacking order. Only the wordmark layer (ref'd) gets the
 * foreground/gold/foreground hover animation.
 */
export const Logo = forwardRef<HTMLSpanElement, { className?: string }>(
  function Logo({ className }, ref) {
    return (
      <span
        className={`relative inline-block shrink-0 ${className ?? ""}`}
        style={{ aspectRatio: "218 / 36" }}
      >
        <span aria-hidden="true" className="logo-dot absolute inset-0" />
        <span aria-hidden="true" className="logo-ring absolute inset-0" />
        <span ref={ref} aria-hidden="true" className="logo absolute inset-0" />
      </span>
    );
  },
);
