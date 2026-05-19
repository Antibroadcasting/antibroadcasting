"use client";

import { useState, useEffect, useCallback, useRef, type MouseEvent } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { RegistrationMark } from "./RegistrationMark";

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
      {/* Corner registration marks */}
      <RegistrationMark className="absolute top-7 left-7 w-5 h-5 text-paper/40 pointer-events-none" />
      <RegistrationMark className="absolute top-7 right-7 w-5 h-5 text-gold/70 pointer-events-none" />
      <RegistrationMark className="absolute bottom-7 left-7 w-5 h-5 text-paper/40 pointer-events-none" />
      <RegistrationMark className="absolute bottom-7 right-7 w-5 h-5 text-paper/40 pointer-events-none" />

      {/* Close — autofocus so keyboard users land here on open */}
      <button
        autoFocus
        onClick={handleClose}
        aria-label="Close lightbox"
        className="absolute top-8 right-8 z-10 w-14 h-14 rounded-full bg-ink-2 border border-paper/10 text-paper flex items-center justify-center hover:bg-gold hover:text-ink hover:border-gold transition-colors focus-visible:outline-2 focus-visible:outline-gold focus-visible:outline-offset-2"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>


      {/* Content */}
      <div
        className={`relative grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 max-w-[1300px] w-full max-h-[calc(100vh-80px)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
          isVisible ? "scale-100" : "scale-[0.98]"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Image */}
        <div className="relative aspect-square bg-ink-2 border border-paper/10 overflow-hidden">
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
        <div className="flex flex-col text-paper py-2">
          {item.category && (
            <span className="self-start font-mono text-[10px] uppercase tracking-[0.22em] font-bold px-2.5 py-1 bg-gold text-ink mb-4">
              {item.category.replace(/-/g, " ")}
            </span>
          )}

          <h2 className="font-display font-black uppercase text-[44px] leading-[0.95] tracking-[-0.01em] m-0 mb-3">
            {item.client ?? item.title}
          </h2>

          {item.client && (
            <p className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/40 mb-6">
              {item.title}
            </p>
          )}

          {item.description && (
            <p className="text-base leading-relaxed text-paper/70 mb-7">
              {item.description}
            </p>
          )}

          <div className="mt-auto border-t border-paper/10 pt-5 grid grid-cols-2 gap-x-5 gap-y-3.5">
            {item.year && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">Year</span>
                <span className="font-display font-black uppercase text-[22px] leading-none">{item.year}</span>
              </div>
            )}
            {item.colors && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">Colors</span>
                <span className="font-display font-black uppercase text-[22px] leading-none text-gold">{item.colors}</span>
              </div>
            )}
            {item.category && (
              <div className="flex flex-col gap-1 col-span-2">
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-paper/40">Garment</span>
                <span className="font-display font-black uppercase text-[22px] leading-none">{item.category.replace(/-/g, " ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination pill */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center bg-ink-2 border border-paper/10 rounded-full overflow-hidden whitespace-nowrap">
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          disabled={!hasPrev}
          aria-label="Previous image"
          className="flex items-center justify-center w-10 h-10 text-paper hover:text-gold transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
          </svg>
        </button>
        <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-paper/60 px-1 select-none">
          <span className="text-paper font-semibold">{String(currentIndex + 1).padStart(2, "0")}</span>
          <span className="mx-2">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </span>
        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          disabled={!hasNext}
          aria-label="Next image"
          className="flex items-center justify-center w-10 h-10 text-paper hover:text-gold transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
        </button>
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
