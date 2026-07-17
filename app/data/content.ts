import rawContent from "./site-content.json";

export type CategoryRecord = {
  id: number;
  name: string;
  slug: string;
  count: number;
  parent: number | null;
};

export type MediaRecord = {
  id: number;
  slug: string;
  title: string;
  alt: string;
  caption: string;
  description: string;
  sourceUrl: string;
  localSrc: string;
  type: "image" | "file";
  mime: string;
  width: number | null;
  height: number | null;
  parent: number | null;
  date: string | null;
};

export type EntryRecord = {
  id: number;
  slug: string;
  sourceSlug: string;
  sourceType: "page" | "post";
  authorId: number | null;
  title: string;
  excerpt: string;
  date: string | null;
  modified: string | null;
  sourceUrl: string;
  bodyHtml: string;
  featuredMediaId: number | null;
  mediaIds: number[];
  categories: CategoryRecord[];
  countries: string[];
  youtube: string[];
};

type SiteContent = {
  generatedAt: string;
  source: string;
  counts: {
    pages: number;
    posts: number;
    entries: number;
    media: number;
    images: number;
    files: number;
    youtubeLinks: number;
  };
  categories: CategoryRecord[];
  authors: Array<{ id: number; slug: string; name: string; url: string }>;
  entries: EntryRecord[];
  media: MediaRecord[];
  youtube: string[];
  videos: Array<{ url: string; label: string; pages: string[] }>;
  maps: Array<{ url: string; label: string; pages: string[] }>;
  documents: Array<{ url: string; sourceUrl: string; label: string; pages: string[] }>;
};

export const siteContent = rawContent as SiteContent;
export const entries = siteContent.entries;
export const media = siteContent.media;
export const images = media.filter((item) => item.type === "image");
export const files = media.filter((item) => item.type !== "image");

const entryBySlug = new Map(entries.map((entry) => [entry.slug, entry]));
const mediaById = new Map(media.map((item) => [item.id, item]));
const mediaBySlug = new Map(media.map((item) => [item.slug, item]));

export const primaryNavigation = [
  { number: "01", label: "Home", href: "/" },
  { number: "02", label: "About", href: "/about" },
  { number: "03", label: "Our work", href: "/our-work" },
  { number: "04", label: "People", href: "/our-people" },
  { number: "05", label: "Knowledge", href: "/archive" },
  { number: "06", label: "Media", href: "/media-library" },
  { number: "07", label: "Contact", href: "/contact" },
] as const;

export function getEntry(slug: string) {
  return entryBySlug.get(slug);
}

export function getMedia(id: number | null) {
  return id ? mediaById.get(id) : undefined;
}

export function getMediaBySlug(slug: string) {
  return mediaBySlug.get(slug);
}

export function getEntryMedia(entry: EntryRecord) {
  return entry.mediaIds
    .map((id) => mediaById.get(id))
    .filter((item): item is MediaRecord => Boolean(item));
}

export function getEntryImage(entry: EntryRecord) {
  return getMedia(entry.featuredMediaId) ?? getEntryMedia(entry).find((item) => item.type === "image");
}

export function entriesInCategory(slug: string) {
  return entries
    .filter((entry) => entry.categories.some((category) => category.slug === slug))
    .sort((a, b) => (b.date ?? "").localeCompare(a.date ?? ""));
}

export function peopleInCountry(country?: "Australia" | "India") {
  return entries
    .filter((entry) => entry.countries.length > 0 && (!country || entry.countries.includes(country)))
    .sort((a, b) => a.title.localeCompare(b.title));
}

export function entryHref(entry: EntryRecord) {
  return entry.slug ? `/${entry.slug}` : "/";
}

export function entryLabel(entry: EntryRecord) {
  if (entry.countries.length) return `${entry.countries.join(" + ")} member`;
  if (entry.categories.length) return entry.categories[0].name;
  return entry.sourceType === "page" ? "Centre page" : "AIWC record";
}

export function relatedEntries(entry: EntryRecord, limit = 3) {
  const categoryIds = new Set(entry.categories.map((category) => category.id));
  return entries
    .filter((candidate) =>
      candidate.id !== entry.id &&
      (candidate.countries.some((country) => entry.countries.includes(country)) ||
        candidate.categories.some((category) => categoryIds.has(category.id)))
    )
    .sort((a, b) => {
      const aImage = getEntryImage(a) ? 1 : 0;
      const bImage = getEntryImage(b) ? 1 : 0;
      return bImage - aImage || (b.date ?? "").localeCompare(a.date ?? "");
    })
    .slice(0, limit);
}

export function formatDate(date: string | null) {
  if (!date) return "AIWC archive";
  return new Intl.DateTimeFormat("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}
