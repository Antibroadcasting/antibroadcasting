import type { Metadata } from "next";
import Link from "next/link";
import { reader } from "@/lib/keystatic";
import { GalleryGrid } from "@/components/ui/GalleryGrid";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our screen printing work — bands, artists, and events across Minneapolis and beyond.",
};

/** Turn a raw category slug into a readable label. */
function formatCategoryLabel(value: string): string {
  return value
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "all";

  const galleryEntries = await reader.collections.gallery.all();

  const allItems = galleryEntries.map((entry) => ({
    slug: entry.slug,
    title: entry.entry.title,
    client: entry.entry.client,
    category: entry.entry.category ?? "",
    image: entry.entry.image,
    description: entry.entry.description ?? null,
    featured: entry.entry.featured,
    colors: entry.entry.colors,
    year: entry.entry.year,
  }));

  // Build category list dynamically from actual content
  const categoryValues = Array.from(
    new Set(allItems.map((i) => i.category).filter(Boolean)),
  ).sort();

  const categories = [
    { label: "All Work", value: "all" },
    ...categoryValues.map((v) => ({ label: formatCategoryLabel(v), value: v })),
  ];

  const filteredItems =
    activeCategory === "all"
      ? allItems
      : allItems.filter((item) => item.category === activeCategory);

  return (
    <section className="w-full max-w-400 mx-auto">
      <header className="my-12 max-w-2xl">
        <span className="inline-block text-xs font-mono font-black tracking-widest uppercase text-text-inverse bg-(--color-secondary-500) px-3 py-1 mb-4">
          Portfolio
        </span>
        <h1 className="font-display font-black text-[clamp(4.25rem,18vw,8rem)] uppercase leading-[0.85] text-text-primary">
          Our work.
        </h1>
      </header>

      {/* Category filter — only shown when there are multiple categories */}
      {categoryValues.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.value;
            return (
              <Link
                key={cat.value}
                href={
                  cat.value === "all" ? "/portfolio" : `?category=${cat.value}`
                }
                className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-text-secondary border-border-default hover:border-border-strong"
                  }`}
              >
                {cat.label}
              </Link>
            );
          })}
        </div>
      )}

      {/* Gallery grid */}
      {filteredItems.length > 0 ? (
        <GalleryGrid items={filteredItems} />
      ) : (
        <EmptyState category={activeCategory} categories={categories} />
      )}
    </section>
  );
}

function EmptyState({
  category,
  categories,
}: {
  category: string;
  categories: { label: string; value: string }[];
}) {
  const label =
    categories.find((c) => c.value === category)?.label ?? "this category";
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="w-16 h-16 rounded-full bg-bg-inset flex items-center justify-center mb-6">
        <svg
          className="w-8 h-8 text-text-muted"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={1.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909"
          />
        </svg>
      </div>
      <h2 className="text-lg font-semibold mb-2">No work here yet</h2>
      <p className="text-text-secondary text-sm max-w-xs">
        {category === "all"
          ? "Portfolio images will appear here once they've been added to the CMS."
          : `No ${label.toLowerCase()} work has been added yet.`}
      </p>
      {category !== "all" && (
        <Link
          href="/portfolio"
          className="mt-6 text-sm font-medium text-text-primary underline underline-offset-4"
        >
          View all work
        </Link>
      )}
    </div>
  );
}
