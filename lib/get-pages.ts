import { cache } from "react";
import { reader } from "@/lib/keystatic";

export interface PageSummary {
  slug: string;
  title: string;
  published: boolean;
}

export const getPages = cache(async (): Promise<PageSummary[]> => {
  const entries = await reader.collections.pages.all();
  return entries.map((entry) => ({
    slug: entry.slug,
    title: entry.entry.title,
    published: entry.entry.published,
  }));
});

export const getPage = cache(async (slug: string) => {
  return reader.collections.pages.read(slug);
});
