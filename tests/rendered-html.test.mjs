import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";
import test from "node:test";
import { fileURLToPath } from "node:url";

const testDir = path.dirname(fileURLToPath(import.meta.url));
const projectDir = path.resolve(testDir, "..");
const inventory = JSON.parse(fs.readFileSync(path.join(projectDir, "app/data/site-content.json"), "utf8"));

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`https://aiwc-preview.example${pathname}`, {
      headers: {
        accept: "text/html",
        host: "aiwc-preview.example",
        "x-forwarded-host": "aiwc-preview.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) },
    },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the redesigned AIWC homepage", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AIWC — A partnership for sustainable water futures · AIWC<\/title>/i);
  assert.match(html, /Two countries\./);
  assert.match(html, /One water future\./);
  assert.match(html, /href="\/about"/);
  assert.match(html, /href="\/our-work"/);
  assert.match(html, /href="\/our-people"/);
  assert.match(html, /href="\/archive"/);
  assert.match(html, /href="\/media-library"/);
  assert.match(html, /Village Groundwater Cooperatives/);
  assert.match(html, /Young Water Professionals/);
  assert.match(html, /AIWC @ 5/);
  assert.match(html, /https:\/\/aiwc\.org\.au\/og\.png/);
  assert.doesNotMatch(html, /wp-content\/uploads|codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("renders the complete content archive and a representative profile", async () => {
  const archiveResponse = await render("/archive");
  assert.equal(archiveResponse.status, 200);
  const archiveHtml = await archiveResponse.text();
  assert.match(archiveHtml, new RegExp(`<dt>${inventory.entries.length}</dt>`));
  assert.match(archiveHtml, /Managing Groundwater Use and Sustaining Aquifer Recharge/);
  assert.match(archiveHtml, /Rejuvenation of the springs in the Himalayan region/);

  const profileResponse = await render("/basant-maheshwari");
  assert.equal(profileResponse.status, 200);
  const profileHtml = await profileResponse.text();
  assert.match(profileHtml, /Basant Maheshwari/);
  assert.match(profileHtml, /\/media\/942-Basant-Maheshwari\.webp/);
  assert.match(profileHtml, /Original web address/);
});

test("media library renders every preserved original and every video link", async () => {
  const response = await render("/media-library");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.equal(inventory.media.filter((item) => item.type === "image").length, 241);
  for (const item of inventory.media.filter((media) => media.type === "image")) {
    assert.ok(html.includes(item.localSrc), `media library should render ${item.localSrc}`);
  }
  assert.ok(html.includes("/media/external-kadambot-profile.gif"));
  for (const video of inventory.videos) {
    const id = video.url.match(/youtu\.be\/([^?&]+)/)?.[1] ?? new URL(video.url).searchParams.get("v");
    if (id) assert.ok(html.includes(id), `media library should preserve YouTube video ${id}`);
  }
  assert.match(html, /Partner network in Australia/);
  assert.match(html, /Partner network in India/);
});

test("every local media record was downloaded and every editorial record has a route slug", () => {
  assert.equal(inventory.counts.pages, 22);
  assert.equal(inventory.counts.posts, 140);
  assert.equal(inventory.counts.entries, 162);
  assert.equal(inventory.media.length, 246);

  for (const item of inventory.media) {
    const file = path.join(projectDir, "public", item.localSrc);
    assert.ok(fs.existsSync(file), `missing downloaded media ${item.localSrc}`);
    assert.ok(fs.statSync(file).size > 0, `empty downloaded media ${item.localSrc}`);
  }

  const slugs = inventory.entries.map((entry) => entry.slug).filter(Boolean);
  assert.equal(new Set(slugs).size, 161);
});

test("legacy category, author and attachment URLs resolve to designed archive pages", async () => {
  const routes = [
    "/category/our-work/training-and-capacity-building",
    "/category/australian-partner-institutes/deakin-university",
    "/attachment_category/aiwc5",
    "/attachment_tag/research",
    "/author/tracy",
    "/craig-t-simmons",
  ];

  for (const route of routes) {
    const response = await render(route);
    assert.equal(response.status, 200, `${route} should resolve`);
    assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  }
});

test("renders accessible navigation and disclosure controls", async () => {
  const response = await render("/our-people");
  const html = await response.text();
  assert.match(html, /Skip to content/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /<details/);
  assert.match(html, /<summary>/);
  assert.match(html, /Portrait of Basant Maheshwari/);
});
