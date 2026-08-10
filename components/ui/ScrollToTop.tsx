"use client";

import { useEffect } from "react";

/**
 * The App Router's default scroll-to-top on navigation doesn't fire when a
 * route renders the not-found boundary in place (as opposed to a normal
 * page transition) — and `data-scroll-behavior="smooth"` on <html> would
 * animate it visibly if it did. Force an instant reset on mount instead.
 */
export function ScrollToTop() {
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
