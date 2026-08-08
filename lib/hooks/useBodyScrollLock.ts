"use client";

import { useLayoutEffect } from "react";

// Module-level count, shared across every component using this hook, so
// two independent lockers (e.g. the mobile nav drawer and the lightbox)
// don't unlock scroll out from under each other — scroll only unlocks when
// the last active lock releases.
let lockCount = 0;

export function useBodyScrollLock(locked: boolean) {
  useLayoutEffect(() => {
    if (!locked) return;

    lockCount++;
    if (lockCount === 1) {
      document.body.style.overflow = "hidden";
    }

    return () => {
      lockCount--;
      if (lockCount === 0) {
        document.body.style.overflow = "";
      }
    };
  }, [locked]);
}
