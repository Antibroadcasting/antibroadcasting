import { cache } from "react";
import { reader } from "@/lib/keystatic";
import type { GalleryItem } from "@/components/ui/GalleryGrid";

export const getGallery = cache(async (): Promise<GalleryItem[]> => {
  const entries = await reader.collections.gallery.all();
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.entry.title,
    client: entry.entry.client,
    category: entry.entry.category ?? "",
    image: entry.entry.image,
    imageAlt: entry.entry.imageAlt || null,
    images: (entry.entry.images ?? []).filter(
      (src): src is string => src !== null,
    ),
    description: entry.entry.description ?? null,
    featured: entry.entry.featured,
    colors: entry.entry.colors,
    year: entry.entry.year,
  }));
});
