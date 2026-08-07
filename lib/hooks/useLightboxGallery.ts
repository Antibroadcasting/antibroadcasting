"use client";

import { useCallback, useRef, useState } from "react";
import type { GalleryItem } from "@/components/ui/GalleryGrid";

export function useLightboxGallery(items: GalleryItem[]) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const restoreFocus = useCallback(
    () => triggerRefs.current[activeIndex ?? 0]?.focus(),
    [activeIndex],
  );
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () =>
      setActiveIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)),
    [items.length],
  );

  const setTriggerRef = useCallback(
    (index: number) => (el: HTMLButtonElement | null) => {
      triggerRefs.current[index] = el;
    },
    [],
  );

  return { activeItem, open, close, prev, next, restoreFocus, setTriggerRef };
}
