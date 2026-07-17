import assert from "node:assert/strict";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("https://aiwc-preview.example/", {
      headers: {
        accept: "text/html",
        host: "aiwc-preview.example",
        "x-forwarded-host": "aiwc-preview.example",
        "x-forwarded-proto": "https",
      },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the complete AIWC experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>AIWC — A partnership for sustainable water futures · AIWC<\/title>/i);
  assert.match(html, /Two countries\./);
  assert.match(html, /One water future\./);
  assert.match(html, /id="about"/);
  assert.match(html, /id="work"/);
  assert.match(html, /id="education"/);
  assert.match(html, /id="people"/);
  assert.match(html, /id="partners"/);
  assert.match(html, /id="knowledge"/);
  assert.match(html, /id="contact"/);
  assert.match(html, /Village Groundwater Cooperatives/);
  assert.match(html, /Young Water Professionals/);
  assert.match(html, /AIWC @ 5/);
  assert.match(html, /https:\/\/aiwc-preview\.example\/og\.png/);
  assert.doesNotMatch(html, /codex-preview|Your site is taking shape|SkeletonPreview/);
});

test("renders accessible navigation and native disclosure controls", async () => {
  const response = await render();
  const html = await response.text();

  assert.match(html, /Skip to content/);
  assert.match(html, /aria-label="Primary navigation"/);
  assert.match(html, /<details[^>]*open=""/);
  assert.match(html, /<summary>/);
});
