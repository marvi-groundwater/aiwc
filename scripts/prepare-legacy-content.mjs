import fs from "node:fs";
import path from "node:path";

const cwd = process.cwd();

const readJson = (file) => JSON.parse(fs.readFileSync(file, "utf8"));
const pages = readJson("/tmp/aiwc-pages.json");
const posts = [
  ...readJson("/tmp/aiwc-posts.json"),
  ...readJson("/tmp/aiwc-posts-2.json"),
];
const media = [
  ...readJson("/tmp/aiwc-media-1.json"),
  ...readJson("/tmp/aiwc-media-2.json"),
  ...readJson("/tmp/aiwc-media-3.json"),
];
const categories = readJson("/tmp/aiwc-categories.json");
const users = fs.existsSync("/tmp/aiwc-users.json") ? readJson("/tmp/aiwc-users.json") : [];
const renderedAudit = fs.existsSync("/tmp/aiwc_media_audit.json")
  ? readJson("/tmp/aiwc_media_audit.json")
  : null;
const knownSourceSlugs = new Set([
  ...pages.map((item) => item.slug),
  ...posts.map((item) => item.slug),
]);

const decodeEntities = (value = "") =>
  value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([0-9a-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#0?39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">");

const stripHtml = (value = "") =>
  decodeEntities(
    value
      .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, " ")
      .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, " ")
      .replace(/<[^>]+>/g, " ")
  )
    .replace(/\s+/g, " ")
    .trim();

const safeFileName = (item) => {
  let base = path.basename(new URL(item.source_url).pathname);
  try {
    base = decodeURIComponent(base);
  } catch {}
  base = base
    .normalize("NFKD")
    .replace(/[^a-zA-Z0-9._-]+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${item.id}-${base || `asset-${item.id}`}`;
};

const mediaRecords = media.map((item) => ({
  id: item.id,
  slug: item.slug,
  title: stripHtml(item.title?.rendered) || `AIWC media ${item.id}`,
  alt: stripHtml(item.alt_text) || stripHtml(item.caption?.rendered) || stripHtml(item.title?.rendered),
  caption: stripHtml(item.caption?.rendered),
  description: stripHtml(item.description?.rendered),
  sourceUrl: item.source_url,
  localSrc: `/media/${safeFileName(item)}`,
  type: item.media_type,
  mime: item.mime_type,
  width: item.media_details?.width ?? null,
  height: item.media_details?.height ?? null,
  parent: item.post || null,
  date: item.date?.slice(0, 10) ?? null,
}));

const mediaById = new Map(mediaRecords.map((item) => [item.id, item]));
const urlToMedia = new Map();

for (const item of media) {
  const record = mediaById.get(item.id);
  if (!record) continue;
  urlToMedia.set(item.source_url, record);
  for (const size of Object.values(item.media_details?.sizes ?? {})) {
    if (size?.source_url) urlToMedia.set(size.source_url, record);
  }
}

const normalizeUrl = (value = "") => decodeEntities(value).trim();
const externalKadambotImage = "https://lh4.googleusercontent.com/KQuhNaYuAYThmxBl2hPKutdGLHAfyGMRjkB7t1IyNNMj_lM6diA7hmdGURoIUVpe_ZGE3WrshACEmJuRUvG2JxfqKwwAMr73ZyVIT2HQxnVg25g425Ow1lyg6WqG-XegmO0VYv4wzkekLZD5Og";

const localizeUrl = (value = "") => {
  const normalized = normalizeUrl(value);
  if (!normalized) return normalized;
  if (normalized === externalKadambotImage) return "/media/external-kadambot-profile.gif";

  const directMedia = urlToMedia.get(normalized);
  if (directMedia) return directMedia.localSrc;

  try {
    const url = new URL(normalized, "https://aiwc.org.au");
    if (url.hostname === "aiwc.org.au" || url.hostname === "www.aiwc.org.au") {
      const exactMedia = urlToMedia.get(`https://aiwc.org.au${url.pathname}`);
      if (exactMedia) return exactMedia.localSrc;
      const parts = url.pathname.split("/").filter(Boolean);
      if (parts.length === 0) return "/";
      if (parts.length === 1 && knownSourceSlugs.has(parts[0])) {
        return `/${parts[0]}${url.search}${url.hash}`;
      }
      return normalized;
    }
  } catch {}

  return normalized;
};

const parseAttributes = (raw = "") => {
  const attrs = {};
  const matcher = /([^\s=/>]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g;
  let match;
  while ((match = matcher.exec(raw))) {
    attrs[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? "";
  }
  return attrs;
};

const escapeAttribute = (value = "") =>
  String(value)
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

const allowedTags = new Set([
  "p", "h1", "h2", "h3", "h4", "h5", "h6", "ul", "ol", "li", "a", "img",
  "figure", "figcaption", "strong", "b", "em", "i", "blockquote", "table", "thead",
  "tbody", "tfoot", "tr", "th", "td", "br", "hr", "iframe", "video", "source",
]);

const sanitizeHtml = (raw = "") => {
  let html = raw
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, "")
    .replace(/<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi, "")
    .replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi, "")
    .replace(/<input\b[^>]*>/gi, "")
    .replace(/<button\b[^>]*>[\s\S]*?<\/button>/gi, "");

  html = html.replace(/<\/?([a-zA-Z0-9:-]+)\b([^>]*)>/g, (match, rawTag, rawAttrs) => {
    const tag = rawTag.toLowerCase();
    const closing = /^<\//.test(match);
    if (!allowedTags.has(tag)) return "";
    if (closing) return `</${tag}>`;

    const attrs = parseAttributes(rawAttrs);

    if (tag === "a") {
      const href = localizeUrl(attrs.href || "");
      if (!href || /^javascript:/i.test(href)) return "<a>";
      const external = /^(https?:)?\/\//i.test(href) && !/^https?:\/\/(?:www\.)?aiwc\.org\.au/i.test(href);
      return `<a href="${escapeAttribute(href)}"${external ? ' target="_blank" rel="noreferrer"' : ""}>`;
    }

    if (tag === "img") {
      const classId = (attrs.class || "").match(/wp-image-(\d+)/)?.[1];
      const record = classId ? mediaById.get(Number(classId)) : urlToMedia.get(normalizeUrl(attrs.src || ""));
      const src = record?.localSrc || localizeUrl(attrs.src || "");
      if (!src) return "";
      const alt = stripHtml(attrs.alt) || record?.alt || record?.title || "AIWC image";
      const width = record?.width || Number(attrs.width) || null;
      const height = record?.height || Number(attrs.height) || null;
      return `<img src="${escapeAttribute(src)}" alt="${escapeAttribute(alt)}"${width ? ` width="${width}"` : ""}${height ? ` height="${height}"` : ""} loading="lazy">`;
    }

    if (tag === "iframe") {
      const src = normalizeUrl(attrs.src || "");
      if (!/^https?:\/\/(?:www\.)?(?:youtube(?:-nocookie)?\.com|youtu\.be|player\.vimeo\.com)\//i.test(src)) return "";
      const title = stripHtml(attrs.title) || "AIWC video";
      return `<iframe src="${escapeAttribute(src)}" title="${escapeAttribute(title)}" loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>`;
    }

    if (tag === "video" || tag === "source") {
      const src = localizeUrl(attrs.src || "");
      if (!src) return tag === "video" ? "<video controls>" : "";
      return `<${tag} src="${escapeAttribute(src)}"${tag === "video" ? " controls" : ""}>`;
    }

    return `<${tag}>`;
  });

  return html
    .replace(/<(p|h[1-6]|ul|ol|li|figure|figcaption|blockquote)>\s*<\/\1>/gi, "")
    .replace(/(?:<br>\s*){3,}/gi, "<br><br>")
    .replace(/\s+\n/g, "\n")
    .trim();
};

const allRawEntries = [
  ...pages.map((item) => ({ ...item, sourceType: "page" })),
  ...posts.map((item) => ({ ...item, sourceType: "post" })),
];

const peoplePageLinks = new Map();
for (const countrySlug of ["our-people-in-australia", "our-people-in-india"]) {
  const page = pages.find((item) => item.slug === countrySlug);
  const linked = new Set();
  for (const match of page?.content?.rendered?.matchAll(/href=["']https?:\/\/(?:www\.)?aiwc\.org\.au\/([^?#"']+)/gi) ?? []) {
    linked.add(match[1].replace(/\/$/, ""));
  }
  peoplePageLinks.set(countrySlug, linked);
}

const categoryById = new Map(categories.map((item) => [item.id, {
  id: item.id,
  name: stripHtml(item.name),
  slug: item.slug,
  count: item.count,
  parent: item.parent || null,
}]));

const entryRecords = allRawEntries.map((item) => {
  const rawHtml = item.content?.rendered ?? "";
  const linkedMediaIds = new Set();

  for (const match of rawHtml.matchAll(/wp-image-(\d+)/gi)) linkedMediaIds.add(Number(match[1]));
  for (const [url, record] of urlToMedia) {
    if (rawHtml.includes(url)) linkedMediaIds.add(record.id);
  }
  for (const record of mediaRecords) {
    if (record.parent === item.id) linkedMediaIds.add(record.id);
  }
  if (item.featured_media) linkedMediaIds.add(item.featured_media);

  const categoryRecords = (item.categories ?? [])
    .map((id) => categoryById.get(id))
    .filter(Boolean);
  const title = stripHtml(item.title?.rendered) || "Untitled AIWC record";
  const fullText = stripHtml(rawHtml);
  const excerpt = stripHtml(item.excerpt?.rendered) || fullText.slice(0, 260);

  const countries = [];
  if (peoplePageLinks.get("our-people-in-australia")?.has(item.slug)) countries.push("Australia");
  if (peoplePageLinks.get("our-people-in-india")?.has(item.slug)) countries.push("India");

  const hrefs = [...rawHtml.matchAll(/(?:href|src)=["']([^"']+)["']/gi)]
    .map((match) => normalizeUrl(match[1]));
  const youtube = [...new Set(hrefs.filter((href) => /youtu(?:\.be|be\.com)|youtube-nocookie\.com/i.test(href)))];

  return {
    id: item.id,
    slug: item.slug === "home" ? "" : item.slug,
    sourceSlug: item.slug,
    sourceType: item.sourceType,
    authorId: item.author || null,
    title,
    excerpt: excerpt.length > 280 ? `${excerpt.slice(0, 277).trim()}…` : excerpt,
    date: item.date?.slice(0, 10) ?? null,
    modified: item.modified?.slice(0, 10) ?? null,
    sourceUrl: item.link,
    bodyHtml: sanitizeHtml(rawHtml),
    featuredMediaId: item.featured_media || null,
    mediaIds: [...linkedMediaIds].filter((id) => mediaById.has(id)).sort((a, b) => a - b),
    categories: categoryRecords,
    countries,
    youtube,
  };
});

const renderedEmbeds = renderedAudit?.embeds ?? [];
const videoRecords = renderedEmbeds
  .filter((item) => /youtu(?:\.be|be\.com)/i.test(item.url))
  .map((item) => ({
    url: item.url,
    label:
      item.occurrences.flatMap((occurrence) => occurrence.label ?? []).find(Boolean) ||
      (item.url.includes("@") ? "Australia India Water Centre on YouTube" : "AIWC video"),
    pages: [...new Set(item.occurrences.map((occurrence) => occurrence.page))],
  }));
const allYouTube = [...new Set([
  ...entryRecords.flatMap((entry) => entry.youtube),
  ...videoRecords.map((item) => item.url),
])].sort();
const mapEmbeds = renderedEmbeds
  .filter((item) => /google\.com\/maps/i.test(item.url))
  .map((item) => ({
    url: item.url,
    label: item.url.includes("16_LBN") ? "Partner network in India" : "Partner network in Australia",
    pages: [...new Set(item.occurrences.map((occurrence) => occurrence.page))],
  }));
const sourceDocuments = (renderedAudit?.documents ?? []).map((item) => ({
  url: localizeUrl(item.url),
  sourceUrl: item.url,
  label: item.occurrences.flatMap((occurrence) => occurrence.label ?? []).find(Boolean) || path.basename(new URL(item.url).pathname),
  pages: [...new Set(item.occurrences.map((occurrence) => occurrence.page))],
}));
const allInternalSlugs = new Set(entryRecords.map((entry) => entry.slug));
const sourceUrls = new Set(entryRecords.map((entry) => entry.sourceUrl));

const output = {
  generatedAt: new Date().toISOString(),
  source: "https://aiwc.org.au",
  counts: {
    pages: pages.length,
    posts: posts.length,
    entries: entryRecords.length,
    media: mediaRecords.length,
    images: mediaRecords.filter((item) => item.type === "image").length,
    files: mediaRecords.filter((item) => item.type !== "image").length,
    youtubeLinks: allYouTube.length,
  },
  categories: [...categoryById.values()].sort((a, b) => a.name.localeCompare(b.name)),
  authors: users.map((item) => ({ id: item.id, slug: item.slug, name: item.name, url: item.link })),
  entries: entryRecords,
  media: mediaRecords,
  youtube: allYouTube,
  videos: videoRecords,
  maps: mapEmbeds,
  documents: sourceDocuments,
  audit: {
    internalSlugs: [...allInternalSlugs].sort(),
    sourceUrls: [...sourceUrls].sort(),
  },
};

fs.mkdirSync(path.join(cwd, "app", "data"), { recursive: true });
fs.mkdirSync(path.join(cwd, "public", "media"), { recursive: true });
fs.writeFileSync(
  path.join(cwd, "app", "data", "site-content.json"),
  `${JSON.stringify(output, null, 2)}\n`
);

const curlConfig = mediaRecords
  .map((item) => `url = "${item.sourceUrl.replace(/"/g, '\\"')}"\noutput = "public${item.localSrc}"`)
  .join("\n");
fs.writeFileSync("/tmp/aiwc-media-curl.cfg", `${curlConfig}\n`);

console.log(JSON.stringify({
  output: "app/data/site-content.json",
  ...output.counts,
  missingFeaturedMedia: entryRecords.filter((entry) => entry.featuredMediaId && !mediaById.has(entry.featuredMediaId)).length,
}, null, 2));
