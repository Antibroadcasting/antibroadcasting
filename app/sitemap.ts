import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://antibroadcasting.com";

  // Static pages use a pinned date; portfolio stays dynamic since CMS content changes.
  const staticDate = new Date("2026-05-06");

  return [
    { url: base, lastModified: staticDate, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/portfolio`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/how-it-works`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/about`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, lastModified: staticDate, changeFrequency: "monthly", priority: 0.8 },
  ];
}
