"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";

export type GalleryItem = {
  slug: string;
  title: string;
  client: string | null;
  category: string;
  image: string | null;
  description: string | null;
  featured: boolean | null;
  colors: number | null;
  year: number | null;
};

function formatColors(n: number): string {
  return n === 1 ? "1 color" : `${n} colors`;
}

// ─── Lightbox ────────────────────────────────────────────────────────────────

function Lightbox({
  item,
  items,
  onClose,
  onPrev,
  onNext,
  onRestoreFocus,
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  onRestoreFocus: () => void;
}) {
  const [isVisible, setIsVisible] = useState(false);
  const currentIndex = items.findIndex((i) => i.slug === item.slug);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;
  const dialogRef = useRef<HTMLDialogElement>(null);

  // Open via showModal() for native focus trap + backdrop + AT support
  useEffect(() => {
    dialogRef.current?.showModal();
    const timer = setTimeout(() => setIsVisible(true), 10);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = useCallback(() => {
    onRestoreFocus();
    setIsVisible(false);
    setTimeout(() => {
      dialogRef.current?.close();
      onClose();
    }, 200);
  }, [onClose, onRestoreFocus]);

  // Arrow keys — Escape is intercepted to use animated close instead of native instant close
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); handleClose(); return; }
      if (e.key === "ArrowLeft" && hasPrev) { onPrev(); return; }
      if (e.key === "ArrowRight" && hasNext) { onNext(); return; }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock scroll (showModal does not do this automatically)
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  // Click on backdrop (the dialog element itself, outside the content panel)
  const handleDialogClick = useCallback((e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) handleClose();
  }, [handleClose]);

  return (
    <dialog
      ref={dialogRef}
      onClick={handleDialogClick}
      aria-label={`${item.client ?? item.title} — lightbox`}
      className={`lightbox z-200 transition-opacity duration-200 ease-out motion-reduce:transition-none ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
    >
      {/* Close — autofocus so keyboard users land here on open */}
      <button
        autoFocus
        onClick={handleClose}
        aria-label="Close lightbox"
        className="absolute top-4 right-4 text-paper/60 hover:text-paper transition-colors z-10 p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/60 hover:text-paper transition-colors z-10 p-2"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 19.5L8.25 12l7.5-7.5"
            />
          </svg>
        </button>
      )}

      {/* Next */}
      {hasNext && (
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          aria-label="Next image"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-paper/60 hover:text-paper transition-colors z-10 p-2"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      )}

      {/* Content */}
      <div
        className={`relative flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full max-h-[90vh] transition-transform duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "scale-100" : "scale-[0.98]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full md:w-auto md:flex-1 aspect-square max-h-[70vh] shrink-0">
          {item.image ? (
            <Image
              src={item.image}
              alt={`${item.client ?? item.title} screen print`}
              fill
              sizes="(min-width: 768px) 60vw, 90vw"
              className="object-contain"
              priority
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center text-paper/30 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Meta panel */}
        <div className="md:w-56 shrink-0 text-paper">
          <p className="font-semibold text-xl leading-tight">
            {item.client ?? item.title}
          </p>

          {item.description && (
            <p className="mt-2 text-sm text-paper/70 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="mt-4 space-y-1 text-sm text-paper/70">
            {item.year && <p>{item.year}</p>}
            {item.colors && <p>{formatColors(item.colors)}</p>}
            {item.category && (
              <p className="capitalize">{item.category.replace(/-/g, " ")}</p>
            )}
          </div>

          {/* Counter */}
          <p className="mt-6 text-xs text-paper/50">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </dialog>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const open = useCallback((index: number, trigger: HTMLButtonElement) => {
    triggerRef.current = trigger;
    setActiveIndex(index);
  }, []);
  const close = useCallback(() => setActiveIndex(null), []);
  const restoreFocus = useCallback(() => triggerRef.current?.focus(), []);
  const prev = useCallback(
    () => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)),
    [],
  );
  const next = useCallback(
    () =>
      setActiveIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)),
    [items.length],
  );

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {items.map((item, index) => (
          <button
            key={item.slug}
            onClick={(e) => open(index, e.currentTarget)}
            aria-label={`View ${item.client ?? item.title}`}
            className="group relative aspect-square overflow-hidden rounded-card bg-bg-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={`${item.client ?? item.title} screen print`}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-slow group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">
                No image
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-base motion-reduce:transition-none flex flex-col items-start justify-end p-4">
              <p className="text-background font-semibold text-sm leading-tight">
                {item.client ?? item.title}
              </p>
              {item.description && (
                <p className="text-background/60 text-xs mt-1 line-clamp-2 leading-snug">
                  {item.description}
                </p>
              )}
              <div className="flex items-center gap-2 mt-1.5">
                {item.year && (
                  <span className="text-background/50 text-xs">
                    {item.year}
                  </span>
                )}
                {item.colors && (
                  <span className="text-background/50 text-xs">
                    {formatColors(item.colors)}
                  </span>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>

      {activeItem &&
        createPortal(
          <Lightbox
            item={activeItem}
            items={items}
            onClose={close}
            onPrev={prev}
            onNext={next}
            onRestoreFocus={restoreFocus}
          />,
          document.body,
        )}
    </>
  );
}
