import { cache } from "react";
import { reader } from "@/lib/keystatic";

export interface ArtRequirementSection {
  heading: string;
  items: string[];
}

export const getArtRequirements = cache(async (): Promise<ArtRequirementSection[]> => {
  const entries = await reader.collections.artRequirements.all();
  return entries
    .map((entry) => ({
      heading: entry.entry.heading,
      items: [...(entry.entry.items ?? [])],
      order: entry.entry.order ?? 99,
    }))
    .sort((a, b) => a.order - b.order)
    .map(({ heading, items }) => ({ heading, items }));
});
