import { cache } from "react";
import { reader } from "@/lib/keystatic";

export interface FaqItem {
  slug: string;
  question: string;
  answer: string;
  category: string;
}

export const getFaq = cache(async (): Promise<FaqItem[]> => {
  const entries = await reader.collections.faq.all();
  return entries
    .map((entry) => ({
      slug: entry.slug,
      question: entry.entry.question,
      answer: entry.entry.answer,
      category: entry.entry.category,
      order: entry.entry.order ?? 99,
    }))
    .sort((a, b) => {
      if (a.category !== b.category) return a.category.localeCompare(b.category);
      return a.order - b.order;
    })
    .map(({ slug, question, answer, category }) => ({ slug, question, answer, category }));
});
