import { cache } from "react";
import type { DocumentElement } from "@keystatic/core";
import { reader } from "@/lib/keystatic";

export interface ActivePromo {
  title: string;
  description: DocumentElement[];
  expiresAt: string | null;
  label: string | null;
  badgeImage: string | null;
  badgeImageAlt: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
}

/** First active, non-expired promo in queue order (author-set priority via drag-to-reorder). */
export const getActivePromo = cache(async (): Promise<ActivePromo | null> => {
  const banner = await reader.singletons.promoBanner.read();
  const today = new Date().toISOString().slice(0, 10);

  const promo = banner?.queue.find(
    (p) => p.active && (!p.expiresAt || p.expiresAt >= today),
  );
  if (!promo) return null;

  return {
    title: promo.title,
    description: await promo.description(),
    expiresAt: promo.expiresAt,
    label: promo.label || null,
    badgeImage: promo.badgeImage || null,
    badgeImageAlt: promo.badgeImageAlt || null,
    ctaLabel: promo.ctaLabel || null,
    ctaHref: promo.ctaHref || null,
  };
});
