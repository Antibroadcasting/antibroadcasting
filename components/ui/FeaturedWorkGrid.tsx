"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { RegistrationMark } from "./RegistrationMark";
import type { GalleryItem } from "./GalleryGrid";

// ─── Lightbox ─────────────────────────────────────────────────────────────────

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

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") { e.preventDefault(); handleClose(); return; }
      if (e.key === "ArrowLeft" && hasPrev) { onPrev(); return; }
      if (e.key === "ArrowRight" && hasNext) { onNext(); return; }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

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
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* Prev */}
      {hasPrev && (
        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          aria-label="Previous image"
          className="absolute left-4 top-1/2 -translate-y-1/2 text-paper/60 hover:text-paper transition-colors z-10 p-2"
        >
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
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
          <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
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

        {/* Meta panel — lightbox always renders on a dark backdrop, use paper tokens */}
        <div className="md:w-56 shrink-0 text-paper">
          <p className="font-display font-black uppercase text-2xl leading-tight">
            {item.client ?? item.title}
          </p>

          {item.description && (
            <p className="mt-2 text-sm text-paper/70 leading-relaxed">
              {item.description}
            </p>
          )}

          <div className="mt-4 space-y-1 font-mono text-xs uppercase tracking-widest">
            {item.year && <p className="text-paper/60">{item.year}</p>}
            {item.colors && <p className="text-gold">{item.colors} Color{item.colors !== 1 ? "s" : ""}</p>}
            {item.category && (
              <p className="text-paper/60">{item.category.replace(/-/g, " ")}</p>
            )}
          </div>

          <p className="mt-6 font-mono text-xs text-paper/50 uppercase tracking-widest">
            {currentIndex + 1} / {items.length}
          </p>
        </div>
      </div>
    </dialog>
  );
}

// ─── Grid ─────────────────────────────────────────────────────────────────────

const aspectClasses = ["aspect-[3/4]", "aspect-[2/3]", "aspect-[4/5]"] as const;

export function FeaturedWorkGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeItem = activeIndex !== null ? items[activeIndex] : null;

  const open = useCallback((index: number) => setActiveIndex(index), []);
  const close = useCallback(() => setActiveIndex(null), []);
  const restoreFocus = useCallback(() => triggerRefs.current[activeIndex ?? 0]?.focus(), [activeIndex]);
  const prev = useCallback(() => setActiveIndex((i) => (i !== null && i > 0 ? i - 1 : i)), []);
  const next = useCallback(() => setActiveIndex((i) => (i !== null && i < items.length - 1 ? i + 1 : i)), [items.length]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-[5fr_4fr_3fr] gap-5 items-start">
        {items.slice(0, 3).map((item, i) => (
          <div key={item.slug} className={i === 1 ? "md:mt-20" : ""}>

            {/* Card — clickable */}
            <button
              ref={(el) => { triggerRefs.current[i] = el; }}
              onClick={() => open(i)}
              aria-label={`View ${item.client ?? item.title}`}
              className="group relative w-full text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
            >
              <div className={`relative overflow-hidden bg-ink-3 border border-foreground/15 ${aspectClasses[i]}`}>
                {/* Photo */}
                {item.image && (
                  <Image
                    src={item.image}
                    alt={`${item.client ?? item.title} screen print`}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                    className="object-cover z-0 transition-transform duration-500 group-hover:scale-105 motion-reduce:group-hover:scale-100"
                  />
                )}

                {/* Diagonal stripe overlay */}
                <div
                  className="absolute inset-0 z-10"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(45deg, transparent, transparent 8px, oklch(0% 0 0 / 0.15) 8px, oklch(0% 0 0 / 0.15) 9px)",
                  }}
                />

                {/* NO. badge */}
                <div className="absolute top-3 left-3 z-20 bg-ink border border-foreground/25 px-2 py-0.5">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-text-tertiary">
                    No.&nbsp;{String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Placeholder — only when no image */}
                {!item.image && (
                  <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2">
                    <RegistrationMark className="w-8 h-8 text-paper/20" />
                    <span className="font-mono text-[10px] uppercase tracking-widest text-paper/30">
                      Garment Photo
                    </span>
                  </div>
                )}

                {/* Hover scrim */}
                <div className="absolute inset-0 z-20 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 motion-reduce:transition-none" />
              </div>
            </button>

            {/* Metadata */}
            <div className="mt-4 flex justify-between items-start gap-4">
              <p className="font-display uppercase font-black text-text-primary text-[clamp(1.25rem,2vw,2rem)] leading-none">
                {item.client}
              </p>
              <div className="text-right shrink-0">
                <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary leading-relaxed">
                  {item.year}
                </p>
                <p className="font-mono text-xs uppercase tracking-widest text-text-accent">
                  {item.colors} Color{item.colors !== 1 ? "s" : ""}
                </p>
                {item.category && (
                  <p className="font-mono text-xs uppercase tracking-widest text-text-tertiary">
                    {item.category}
                  </p>
                )}
              </div>
            </div>
          </div>
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
