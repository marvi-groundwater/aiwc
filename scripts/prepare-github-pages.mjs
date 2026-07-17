import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const scriptDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(scriptDir, "..");
const sourceDir = path.join(projectDir, "dist/client");
const outputDir = path.join(projectDir, "docs");
const inventory = JSON.parse(
  fs.readFileSync(path.join(projectDir, "app/data/site-content.json"), "utf8"),
);

if (!fs.existsSync(path.join(sourceDir, "index.html"))) {
  throw new Error("Static export is missing dist/client/index.html. Run with GITHUB_PAGES_EXPORT=1.");
}

fs.rmSync(outputDir, { recursive: true, force: true });
fs.cpSync(sourceDir, outputDir, { recursive: true });

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function routeFromHtml(file) {
  const relative = path.relative(outputDir, file).split(path.sep).join("/");
  if (relative === "index.html") return "/";
  if (!relative.endsWith("/index.html")) return null;
  return `/${relative.slice(0, -"/index.html".length)}`;
}

const exportedHtml = walk(outputDir).filter((file) => file.endsWith(".html"));
const exportedRoutes = new Set(exportedHtml.map(routeFromHtml).filter(Boolean));
const mediaBySourceUrl = new Map(
  inventory.media.map((item) => [item.sourceUrl, item.localSrc]),
);
const legacyDerivativeUrls = new Map([
  [
    "https://aiwc.org.au/wp-content/uploads/elementor/thumbs/Maps_Group-pq92wbh1w6iiighw6k3dlzsgc113be15ryeai3zb94.webp",
    "/media/120-Maps_Group.webp",
  ],
]);

function splitPathSuffix(value) {
  const suffixAt = value.search(/[?#]/);
  return suffixAt === -1
    ? { pathname: value, suffix: "" }
    : { pathname: value.slice(0, suffixAt), suffix: value.slice(suffixAt) };
}

function relativeRootPrefix(file) {
  const directory = path.dirname(file);
  const relative = path.relative(directory, outputDir).split(path.sep).join("/");
  return relative ? `${relative}/` : "./";
}

function localiseRootPath(value, rootPrefix) {
  const { pathname, suffix } = splitPathSuffix(value);
  if (pathname === "/") return `${rootPrefix}${suffix}`;

  let localPath = pathname.replace(/^\/+/, "");
  const routeKey = `/${localPath.replace(/\/+$/, "")}`;
  if (exportedRoutes.has(routeKey) && !localPath.endsWith("/")) localPath += "/";
  return `${rootPrefix}${localPath}${suffix}`;
}

function rewriteUrl(value, rootPrefix) {
  const decoded = value.replaceAll("&amp;", "&");
  const localMedia = mediaBySourceUrl.get(decoded) || legacyDerivativeUrls.get(decoded);
  if (localMedia) return localiseRootPath(localMedia, rootPrefix);
  if (value.startsWith("/") && !value.startsWith("//")) return localiseRootPath(value, rootPrefix);

  if (/^https?:\/\/aiwc\.org\.au(?:\/|$)/i.test(decoded)) {
    const url = new URL(decoded);
    const localAsset = mediaBySourceUrl.get(`${url.origin}${url.pathname}`);
    if (localAsset) return localiseRootPath(`${localAsset}${url.search}${url.hash}`, rootPrefix);

    const routeKey = url.pathname === "/" ? "/" : `/${url.pathname.replace(/^\/+|\/+$/g, "")}`;
    if (exportedRoutes.has(routeKey)) {
      return localiseRootPath(`${url.pathname}${url.search}${url.hash}`, rootPrefix);
    }

    if (url.pathname.startsWith("/media/")) {
      return localiseRootPath(`${url.pathname}${url.search}${url.hash}`, rootPrefix);
    }
  }

  return value;
}

function makeStaticHtml(html, file) {
  const rootPrefix = relativeRootPrefix(file);
  let result = html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replace(/<link\b(?=[^>]*\brel=["']modulepreload["'])[^>]*\/?\s*>/gi, "")
    .replace(/\sdata-rsc-css-href=["'][^"']*["']/gi, "");

  result = result.replace(/\b(href|src|poster|action)="([^"]*)"/gi, (match, attribute, value) => (
    `${attribute}="${rewriteUrl(value, rootPrefix)}"`
  ));

  result = result.replace(/\bsrcset="([^"]*)"/gi, (match, value) => {
    const rewritten = value.split(",").map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [rewriteUrl(url, rootPrefix), ...descriptor].join(" ");
    }).join(", ");
    return `srcset="${rewritten}"`;
  });

  return result;
}

for (const file of exportedHtml) {
  if (path.basename(file) === "404.html") continue;
  const html = fs.readFileSync(file, "utf8");
  fs.writeFileSync(file, makeStaticHtml(html, file));
}

for (const file of walk(outputDir)) {
  if (/\.(?:rsc|js|map)$/i.test(file)) fs.rmSync(file);
}
for (const generatedPath of [".vite", ".assetsignore", "_headers"]) {
  fs.rmSync(path.join(outputDir, generatedPath), { recursive: true, force: true });
}

fs.writeFileSync(path.join(outputDir, ".nojekyll"), "");
fs.writeFileSync(path.join(projectDir, ".nojekyll"), "");

const coreSitemapRoutes = [
  "/", "/about", "/our-work", "/our-people", "/partners", "/archive", "/media-library", "/contact",
];
const entryRoutes = inventory.entries.filter((entry) => entry.slug).map((entry) => `/${entry.slug}`);
const entrySlugs = new Set(inventory.entries.map((entry) => entry.slug));
const mediaRoutes = inventory.media.filter((item) => !entrySlugs.has(item.slug)).map((item) => `/${item.slug}`);
const sitemapRoutes = [...new Set([...coreSitemapRoutes, ...entryRoutes, ...mediaRoutes])];
const sitemap = [
  "<?xml version=\"1.0\" encoding=\"UTF-8\"?>",
  "<urlset xmlns=\"http://www.sitemaps.org/schemas/sitemap/0.9\">",
  ...sitemapRoutes.map((route) => `  <url><loc>https://aiwc.org.au${route === "/" ? "/" : `${route}/`}</loc></url>`),
  "</urlset>",
  "",
].join("\n");
fs.writeFileSync(path.join(outputDir, "sitemap.xml"), sitemap);
fs.writeFileSync(
  path.join(outputDir, "robots.txt"),
  "User-agent: *\nAllow: /\n\nSitemap: https://aiwc.org.au/sitemap.xml\n",
);

const notFound = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="noindex">
  <title>Page not found · AIWC</title>
  <style>
    :root{color-scheme:light;--ink:#08232d;--river:#197a91;--paper:#f5f1e7;--gold:#c59a52}
    *{box-sizing:border-box}body{margin:0;min-height:100vh;display:grid;place-items:center;padding:28px;color:var(--ink);background:linear-gradient(135deg,#e7e2d6,#c8d7d4);font-family:Arial,sans-serif}
    main{width:min(760px,100%);padding:clamp(34px,8vw,78px);border-top:8px solid var(--gold);background:var(--paper);box-shadow:0 28px 80px rgba(8,35,45,.16)}
    p:first-child{margin:0 0 32px;color:var(--river);font-size:.72rem;font-weight:700;letter-spacing:.14em;text-transform:uppercase}
    h1{max-width:620px;margin:0 0 22px;font:600 clamp(3.4rem,10vw,7rem)/.92 Georgia,serif;letter-spacing:-.05em}
    p{max-width:570px;font-size:1.08rem;line-height:1.7}a{display:inline-block;margin-top:20px;padding:15px 20px;color:white;background:var(--ink);text-decoration:none;font-weight:700}
  </style>
</head>
<body><main><p>Australia India Water Centre · 404</p><h1>This current has changed course.</h1><p>The page may have moved into AIWC’s redesigned archive. Return home to continue exploring the Centre’s work, people and water knowledge.</p><a id="home-link" href="https://aiwc.org.au/">Return to AIWC home →</a></main></body>
</html>
`;
fs.writeFileSync(path.join(outputDir, "404.html"), notFound);

const pagesIndex = fs.readFileSync(path.join(outputDir, "index.html"), "utf8");
const rootIndex = pagesIndex.replace(
  "<head>",
  "<head><base href=\"./docs/\"><!-- GitHub Pages fallback; publish /docs for canonical URLs. -->",
);
fs.writeFileSync(path.join(projectDir, "index.html"), rootIndex);

const finalFiles = walk(outputDir);
const finalHtml = finalFiles.filter((file) => file.endsWith(".html"));
const finalMedia = finalFiles.filter((file) => file.includes(`${path.sep}media${path.sep}`));
console.log(`GitHub Pages package prepared in docs/: ${finalHtml.length} HTML files, ${finalMedia.length} local media files.`);
