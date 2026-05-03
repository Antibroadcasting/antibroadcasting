"use client";

import { useState, useEffect, useCallback } from "react";
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
}: {
  item: GalleryItem;
  items: GalleryItem[];
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
}) {
  const currentIndex = items.findIndex((i) => i.slug === item.slug);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < items.length - 1;

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext) onNext();
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  // Lock scroll while open
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <div
      className="fixed inset-0 z-200 flex items-center justify-center bg-black/90 p-4 md:p-8"
      onClick={onClose}
      role="dialog"
      aria-modal
      aria-label={`${item.client ?? item.title} — lightbox`}
    >
      {/* Close */}
      <button
        onClick={onClose}
        aria-label="Close"
        className="absolute top-4 right-4 text-white/60 hover:text-white transition-colors z-10 p-2"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
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
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          aria-label="Previous"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          aria-label="Next"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-white/60 hover:text-white transition-colors z-10 p-2"
        >
          <svg
            className="w-8 h-8"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
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
        className="relative flex flex-col md:flex-row items-center gap-6 max-w-5xl w-full max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative w-full md:w-auto md:flex-1 aspect-square max-h-[70vh] flex-shrink-0">
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
            <div className="absolute inset-0 flex items-center justify-center text-white/30 text-sm">
              No image
            </div>
          )}
        </div>

        {/* Meta panel */}
        <div className="md:w-56 flex-shrink-0 text-white">
          <p className="font-semibold text-lg leading-tight">
            {item.client ?? item.title}
          </p>

          {item.description && (
            <p className="mt-2 text-sm text-white/60 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="mt-4 space-y-1 text-sm text-white/40">
            {item.year && <p>{item.year}</p>}
            {item.colors && <p>{formatColors(item.colors)}</p>}
            {item.category && (
              <p className="capitalize">{item.category.replace(/-/g, " ")}</p>
            )}
          </div>

          {/* Counter */}
          <p className="mt-6 text-xs text-white/25">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </div>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);
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
            onClick={() => open(index)}
            aria-label={`View ${item.client ?? item.title}`}
            className="group relative aspect-square overflow-hidden rounded-card bg-bg-inset focus:outline-none focus-visible:ring-2 focus-visible:ring-border-strong"
          >
            {item.image ? (
              <Image
                src={item.image}
                alt={`${item.client ?? item.title} screen print`}
                fill
                sizes="(min-width: 768px) 33vw, 50vw"
                className="object-cover transition-transform duration-slow group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">
                No image
              </div>
            )}

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-base flex flex-col items-start justify-end p-4">
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
          />,
          document.body,
        )}
    </>
  );
}
