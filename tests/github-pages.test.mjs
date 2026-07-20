import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(testDir, "..");
const docsDir = path.join(projectDir, "docs");
const inventory = JSON.parse(fs.readFileSync(path.join(projectDir, "app/data/site-content.json"), "utf8"));

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const item = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(item) : [item];
  });
}

function videoId(url) {
  const parsed = new URL(url);
  if (parsed.hostname === "youtu.be") return parsed.pathname.split("/").filter(Boolean)[0];
  return parsed.searchParams.get("v") || parsed.pathname.match(/\/(?:embed|shorts)\/([^/?]+)/)?.[1] || null;
}

test("GitHub Pages package contains the homepage and every preserved route", () => {
  const htmlFiles = walk(docsDir).filter((file) => file.endsWith(".html"));
  assert.equal(htmlFiles.length, 413);
  assert.ok(fs.existsSync(path.join(docsDir, "index.html")));
  assert.ok(fs.existsSync(path.join(docsDir, "404.html")));
  assert.ok(fs.existsSync(path.join(docsDir, ".nojekyll")));
  assert.ok(fs.existsSync(path.join(docsDir, "robots.txt")));
  assert.ok(fs.existsSync(path.join(docsDir, "sitemap.xml")));

  for (const route of ["archive", "media-library", "partners"]) {
    assert.ok(fs.existsSync(path.join(docsDir, route, "index.html")), `missing /${route}/`);
  }
  for (const entry of inventory.entries.filter((item) => item.slug)) {
    assert.ok(fs.existsSync(path.join(docsDir, entry.slug, "index.html")), `missing /${entry.slug}/`);
  }

  const entrySlugs = new Set(inventory.entries.map((entry) => entry.slug));
  for (const item of inventory.media.filter((media) => !entrySlugs.has(media.slug))) {
    assert.ok(fs.existsSync(path.join(docsDir, item.slug, "index.html")), `missing /${item.slug}/`);
  }
});

test("every image, document, video and map is present in the static media library", () => {
  const library = fs.readFileSync(path.join(docsDir, "media-library/index.html"), "utf8");
  const images = inventory.media.filter((item) => item.type === "image");
  const files = inventory.media.filter((item) => item.type === "file");
  assert.equal(images.length, 241);
  assert.equal(files.length, 5);

  for (const item of inventory.media) {
    const localFile = path.join(docsDir, item.localSrc);
    assert.ok(fs.existsSync(localFile), `missing ${item.localSrc}`);
    assert.ok(fs.statSync(localFile).size > 0, `empty ${item.localSrc}`);
    assert.ok(library.includes(path.basename(item.localSrc)), `media library omits ${item.localSrc}`);
  }
  assert.ok(fs.existsSync(path.join(docsDir, "media/external-kadambot-profile.gif")));

  for (const video of inventory.videos) {
    const id = videoId(video.url);
    assert.ok(library.includes(id || video.url), `media library omits ${video.url}`);
  }
  for (const map of inventory.maps) {
    assert.ok(library.includes(map.url) || library.includes(map.url.replaceAll("&", "&amp;")), `media library omits ${map.label}`);
  }
});

test("exported pages are pure static HTML with portable local paths", () => {
  const htmlFiles = walk(docsDir).filter((file) => file.endsWith(".html") && path.basename(file) !== "404.html");
  for (const file of htmlFiles) {
    const html = fs.readFileSync(file, "utf8");
    assert.doesNotMatch(html, /<script\b|modulepreload|\.rsc\b/i, `${file} contains application runtime output`);
    assert.doesNotMatch(html, /(?:href|src)="\/(?!\/)/i, `${file} contains a root-relative asset or route`);
    assert.doesNotMatch(html, /wp-content\/uploads|elementor\/thumbs/i, `${file} depends on the old WordPress media directory`);

    const references = [...html.matchAll(/\b(?:href|src|poster|action)="([^"]+)"/gi)].map((match) => match[1]);
    for (const reference of references) {
      if (/^(?:#|[a-z][a-z0-9+.-]*:|\/\/)/i.test(reference)) continue;
      const local = reference.split(/[?#]/, 1)[0];
      if (!local) continue;
      let decoded = local;
      try { decoded = decodeURI(local); } catch {}
      const target = path.resolve(path.dirname(file), decoded);
      assert.ok(target.startsWith(docsDir), `${file} links outside docs/: ${reference}`);
      const exists = fs.existsSync(target) && fs.statSync(target).isFile();
      assert.ok(exists, `${file} has a missing local reference: ${reference}`);
    }
  }
});

test("root index is a working fallback to the /docs GitHub Pages package", () => {
  const html = fs.readFileSync(path.join(projectDir, "index.html"), "utf8");
  assert.match(html, /<base href="\.\/docs\/">/);
  assert.match(html, /Two countries\./);
  assert.match(html, /One water future\./);
  assert.match(html, /href="\.\/about\/index\.html"/);
});
