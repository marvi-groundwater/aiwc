import type { MetadataRoute } from "next";
import { entries, entryHref, media } from "@/app/data/content";

const base = "https://aiwc.org.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const core: MetadataRoute.Sitemap = [
    { url: base, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/about`, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/our-work`, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/our-people`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/partners`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/archive`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${base}/media-library`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`, changeFrequency: "yearly", priority: 0.8 },
  ];

  const entryRoutes: MetadataRoute.Sitemap = entries
    .filter((entry) => entry.slug)
    .map((entry) => ({
      url: `${base}${entryHref(entry)}`,
      lastModified: entry.modified ?? entry.date ?? undefined,
      changeFrequency: entry.countries.length ? "yearly" : "monthly",
      priority: entry.countries.length ? 0.55 : 0.65,
    }));

  const entrySlugs = new Set(entries.map((entry) => entry.slug));
  const attachmentRoutes: MetadataRoute.Sitemap = media
    .filter((item) => !entrySlugs.has(item.slug))
    .map((item) => ({
      url: `${base}/${item.slug}`,
      lastModified: item.date ?? undefined,
      changeFrequency: "yearly",
      priority: 0.2,
    }));

  return [...new Map([...core, ...entryRoutes, ...attachmentRoutes].map((item) => [item.url, item])).values()];
}
