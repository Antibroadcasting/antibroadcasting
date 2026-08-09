import { cache } from "react";
import { reader } from "@/lib/keystatic";

export interface ActivePromo {
  slug: string;
  title: string;
  description: string;
  expiresAt: string | null;
  label: string | null;
  badgeImage: string | null;
  ctaLabel: string | null;
  ctaHref: string | null;
}

/** Active, non-expired promo with the soonest expiry (undated promos rank last). */
export const getActivePromo = cache(async (): Promise<ActivePromo | null> => {
  const entries = await reader.collections.promos.all();
  const today = new Date().toISOString().slice(0, 10);

  const live = entries
    .filter((e) => e.entry.active)
    .filter((e) => !e.entry.expiresAt || e.entry.expiresAt >= today)
    .sort((a, b) => {
      if (!a.entry.expiresAt) return 1;
      if (!b.entry.expiresAt) return -1;
      return a.entry.expiresAt.localeCompare(b.entry.expiresAt);
    });

  const promo = live[0];
  if (!promo) return null;

  return {
    slug: promo.slug,
    title: promo.entry.title,
    description: promo.entry.description ?? "",
    expiresAt: promo.entry.expiresAt,
    label: promo.entry.label || null,
    badgeImage: promo.entry.badgeImage || null,
    ctaLabel: promo.entry.ctaLabel || null,
    ctaHref: promo.entry.ctaHref || null,
  };
});
