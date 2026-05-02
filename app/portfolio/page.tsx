import type { Metadata } from "next";
import Image from "next/image";
import { reader } from "@/lib/keystatic";
import { siteConfig } from "@/lib/site-config";

export const metadata: Metadata = {
  title: "Portfolio",
  description:
    "Browse our screen printing work — bands, artists, and events across Minneapolis and beyond.",
};

const CATEGORIES = [
  { label: "All Work", value: "all" },
  ...siteConfig.categories.gallery,
];

export default async function PortfolioPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;
  const activeCategory = category ?? "all";

  const galleryEntries = await reader.collections.gallery.all();

  const items = galleryEntries
    .map((entry) => ({
      slug: entry.slug,
      title: entry.entry.title,
      client: entry.entry.client,
      category: entry.entry.category,
      image: entry.entry.image,
      featured: entry.entry.featured,
      colors: entry.entry.colors,
      year: entry.entry.year,
    }))
    .filter(
      (item) => activeCategory === "all" || item.category === activeCategory,
    );

  return (
    <section className="w-full max-w-400 mx-auto lg:px-4">
      <header className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Portfolio</h1>
        <p className="text-text-secondary">
          A selection of work across bands, local artists, events, and
          businesses.
        </p>
      </header>

      {/* Category filter */}
      <div className="flex flex-wrap gap-2 mb-10">
        {CATEGORIES.map((cat) => {
          const isActive = activeCategory === cat.value;
          return (
            <a
              key={cat.value}
              href={
                cat.value === "all" ? "/portfolio" : `?category=${cat.value}`
              }
              className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
                isActive
                  ? "bg-foreground text-background border-foreground"
                  : "bg-transparent text-text-secondary border-border-default hover:border-border-strong"
              }`}
            >
              {cat.label}
            </a>
          );
        })}
      </div>

      {/* Gallery grid */}
      {items.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {items.map((item) => (
            <div
              key={item.slug}
              className="group relative aspect-square overflow-hidden rounded-card bg-bg-inset"
            >
              {item.image ? (
                <Image
                  src={item.image}
                  alt={`${item.client ?? item.title} screen print`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-slow group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center text-text-muted text-xs">
                  No image
                </div>
              )}

              {/* Hover overlay */}
              <div className="absolute inset-0 bg-foreground/80 opacity-0 group-hover:opacity-100 transition-opacity duration-base flex flex-col items-start justify-end p-4">
                <p className="text-background font-semibold text-sm leading-tight">
                  {item.client ?? item.title}
                </p>
                {item.year && (
                  <p className="text-background/60 text-xs mt-0.5">
                    {item.year}
                    {item.colors ? ` · ${item.colors}c` : ""}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState category={activeCategory} />
      )}
    </section>
  );
}

function EmptyState({ category }: { category: string }) {
  const label =
    CATEGORIES.find((c) => c.value === category)?.label ?? "this category";
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
        <a
          href="/portfolio"
          className="mt-6 text-sm font-medium text-text-primary underline underline-offset-4"
        >
          View all work
        </a>
      )}
    </div>
  );
}
