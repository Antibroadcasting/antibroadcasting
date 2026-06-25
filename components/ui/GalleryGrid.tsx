"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import type { CSSProperties } from "react";
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

// ─── Magazine layout sizing ───────────────────────────────────────────────────

type CardSize = "std" | "wide" | "tall";

/**
 * Assigns magazine layout sizes using a positional 5-item repeating cycle.
 * No CMS field needed — pattern is purely algorithmic.
 *
 * Cycle: wide → tall → std → std → std → (repeat)
 *
 * On a 12-col desktop grid this produces two alternating row types:
 *   Row A: wide (8-col landscape) + tall (4-col portrait)  = 12 ✓
 *   Row B: std  (4-col square)    × 3                      = 12 ✓
 *
 * Mobile collapses all sizes to uniform 2-up square cards.
 */
function assignSizes(items: GalleryItem[]): CardSize[] {
  return items.map((_, i) => {
    const pos = i % 5;
    if (pos === 0) return "wide";
    if (pos === 1) return "tall";
    return "std";
  });
}

// Grid: 2-col mobile / 6-col tablet / 12-col desktop
//   md (768-1024px): wide (4) + tall (2) = 6  |  std (2) × 3 = 6
//   lg (1024px+):    wide (6) + tall (3) + std (3) = 12 per editorial row  |  std (3) × 4 = 12
const colSpan: Record<CardSize, string> = {
  std: "col-span-1 md:col-span-2 lg:col-span-3",
  wide: "col-span-1 md:col-span-4 lg:col-span-6",
  tall: "col-span-1 md:col-span-2 lg:col-span-3",
};

// Mobile: all square. Tablet+: wide = landscape, tall = portrait.
const imageAspect: Record<CardSize, string> = {
  std: "aspect-square",
  wide: "aspect-square md:aspect-[4/3]",
  tall: "aspect-square md:aspect-[3/4]",
};

const imageSizes: Record<CardSize, string> = {
  std: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
  wide: "(min-width: 1024px) 50vw, (min-width: 768px) 67vw, 50vw",
  tall: "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw",
};

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
      if (e.key === "Escape") {
        e.preventDefault();
        handleClose();
        return;
      }
      if (e.key === "ArrowLeft" && hasPrev) {
        onPrev();
        return;
      }
      if (e.key === "ArrowRight" && hasNext) {
        onNext();
        return;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleClose, onPrev, onNext, hasPrev, hasNext]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleDialogClick = useCallback(
    (e: React.MouseEvent<HTMLDialogElement>) => {
      if (e.target === dialogRef.current) handleClose();
    },
    [handleClose],
  );

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
        <svg
          className="w-5 h-5"
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

      {/* Content */}
      <div
        className={`relative grid grid-cols-1 md:grid-cols-[1fr_320px] gap-10 max-w-325 w-full max-h-[calc(100vh-80px)] transition-transform duration-200 ease-out motion-reduce:transition-none ${
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
            <span className="self-start font-mono text-3xs uppercase tracking-mega font-bold px-2.5 py-1 bg-gold text-ink mb-4">
              {item.category.replace(/-/g, " ")}
            </span>
          )}

          <h2 className="font-display font-black uppercase text-[44px] leading-[0.95] tracking-[-0.01em] m-0 mb-3">
            {item.client ?? item.title}
          </h2>

          {item.client && (
            <p className="font-mono text-2xs uppercase tracking-mega text-paper/40 mb-6">
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
                <span className="font-mono text-3xs uppercase tracking-mega text-paper/40">
                  Year
                </span>
                <span className="font-display font-black uppercase text-[22px] leading-none">
                  {item.year}
                </span>
              </div>
            )}
            {item.colors && (
              <div className="flex flex-col gap-1">
                <span className="font-mono text-3xs uppercase tracking-mega text-paper/40">
                  Colors
                </span>
                <span className="font-display font-black uppercase text-[22px] leading-none text-gold">
                  {item.colors}
                </span>
              </div>
            )}
            {item.category && (
              <div className="flex flex-col gap-1 col-span-2">
                <span className="font-mono text-3xs uppercase tracking-mega text-paper/40">
                  Category
                </span>
                <span className="font-display font-black uppercase text-[22px] leading-none">
                  {item.category.replace(/-/g, " ")}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Pagination pill */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 flex items-center bg-ink-2 border border-paper/10 rounded-full overflow-hidden whitespace-nowrap">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onPrev();
          }}
          disabled={!hasPrev}
          aria-label="Previous image"
          className="flex items-center justify-center w-10 h-10 text-paper hover:text-gold transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg
            className="w-4 h-4"
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
        <span className="font-mono text-2xs uppercase tracking-mega text-paper/60 px-1 select-none">
          <span className="text-paper font-semibold">
            {String(currentIndex + 1).padStart(2, "0")}
          </span>
          <span className="mx-2">/</span>
          <span>{String(items.length).padStart(2, "0")}</span>
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onNext();
          }}
          disabled={!hasNext}
          aria-label="Next image"
          className="flex items-center justify-center w-10 h-10 text-paper hover:text-gold transition-colors disabled:opacity-25 disabled:pointer-events-none"
        >
          <svg
            className="w-4 h-4"
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
      </div>
    </dialog>
  );
}

// ─── Gallery Card ─────────────────────────────────────────────────────────────

function GalleryCard({
  item,
  index,
  size,
  onOpen,
  triggerRef,
}: {
  item: GalleryItem;
  index: number;
  size: CardSize;
  onOpen: (index: number) => void;
  triggerRef: (el: HTMLButtonElement | null) => void;
}) {
  return (
    // group on the outer div so both the image hover and the text color
    // transition respond to hovering anywhere on the card
    <div className={`${colSpan[size]} group`}>
      {/* ── Image frame ─────────────────────────────────────────── */}
      <button
        ref={triggerRef}
        onClick={() => onOpen(index)}
        aria-label={`View ${item.client ?? item.title}`}
        className="relative w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-focus-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
      >
        <div
          className={`relative overflow-hidden bg-ink-3 border border-foreground/15 ${imageAspect[size]}`}
        >
          {/* Photo */}
          {item.image && (
            <Image
              src={item.image}
              alt={`${item.client ?? item.title} screen print`}
              fill
              sizes={imageSizes[size]}
              className="object-cover transition-transform duration-slow group-hover:scale-105 motion-reduce:group-hover:scale-100"
            />
          )}

          {/* Diagonal stripe texture — matches FeaturedWorkGrid and hero image */}
          <div
            className="absolute inset-0 z-10 pointer-events-none bg-texture-stripe"
            style={{ "--texture-stripe-opacity": 0.12 } as CSSProperties}
          />

          {/* Index badge — top-left, consistent with FeaturedWorkGrid "No. 01" */}
          <div className="absolute top-3 left-3 z-20 bg-ink border border-foreground/25 px-2 py-0.5">
            <span className="font-mono text-3xs uppercase tracking-widest text-paper/70">
              No.&nbsp;{String(index + 1).padStart(2, "0")}
            </span>
          </div>

          {/* Placeholder when no image */}
          {!item.image && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center gap-2 pointer-events-none">
              <RegistrationMark className="w-8 h-8 text-paper/20" />
              <span className="font-mono text-3xs uppercase tracking-widest text-paper/30">
                Garment Photo
              </span>
            </div>
          )}

          {/* Hover scrim */}
          <div className="absolute inset-0 z-20 bg-ink/0 group-hover:bg-ink/20 transition-colors duration-300 motion-reduce:transition-none pointer-events-none" />
        </div>
      </button>

      {/* ── Metadata below card ──────────────────────────────────── */}
      <div className="mt-3 pt-3 border-t border-foreground/10 flex flex-col lg:flex-row justify-between lg:items-start lg:gap-3 w-full">
        <p className="font-display uppercase font-black text-text-primary text-lg leading-none group-hover:text-text-accent transition-colors duration-base">
          {item.client ?? item.title}
        </p>
        <div className="text-right shrink-0">
          {item.year && (
            <p className="font-mono text-3xs uppercase tracking-widest text-text-tertiary leading-relaxed">
              {item.year}
            </p>
          )}
          {item.colors && (
            <p className="font-mono text-3xs uppercase tracking-widest text-text-accent">
              {formatColors(item.colors)}
            </p>
          )}
          {item.category && (
            <p className="font-mono text-3xs uppercase tracking-widest text-text-tertiary">
              {item.category.replace(/-/g, " ")}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── GalleryGrid ──────────────────────────────────────────────────────────────

export function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const triggerRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const sizes = assignSizes(items);

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

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-6 lg:grid-cols-12 gap-x-4 gap-y-8 md:gap-x-5 md:gap-y-12 lg:gap-x-6 lg:gap-y-14">
        {items.map((item, index) => (
          <GalleryCard
            key={item.slug}
            item={item}
            index={index}
            size={sizes[index]}
            onOpen={open}
            triggerRef={(el) => {
              triggerRefs.current[index] = el;
            }}
          />
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
