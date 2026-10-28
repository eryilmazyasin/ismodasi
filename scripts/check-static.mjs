import assert from "node:assert/strict";
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";

const root = "out";
const worker = JSON.parse(readFileSync("wrangler.json", "utf8"));
assert.equal(path.resolve(worker.assets.directory), path.resolve(root));
assert.equal(worker.assets.html_handling, "drop-trailing-slash");
assert.equal(worker.assets.not_found_handling, "404-page");
assert.ok(!worker.main && !worker.build, "Static assets must not trigger server bundling or a second framework build");
const { categories, products } = JSON.parse(readFileSync("src/data/catalog.json", "utf8"));
const routes = [
  "/", "/urunler", "/hakkimizda", "/iletisim",
  ...categories.map(({ slug }) => `/kategori/${slug}`),
  ...products.map(({ slug }) => `/urun/${slug}`),
];
const sitemap = readFileSync(path.join(root, "sitemap.xml"), "utf8");
const siteOrigin = new URL(sitemap.match(/<loc>([^<]+)<\/loc>/)[1]).origin;
assert.equal((sitemap.match(/<loc>/g) || []).length, routes.length);
assert.ok(readFileSync(path.join(root, "robots.txt"), "utf8").includes(`${siteOrigin}/sitemap.xml`));
assert.ok(existsSync(path.join(root, "404.html")), "The configured 404 handler requires a 404.html file");
assert.ok(!existsSync(path.join(root, "_worker.js")), "The export must not contain a server script among public assets");

const referencedImages = new Set();
for (const route of routes) {
  const filename = route === "/" ? "index.html" : `${route.slice(1)}.html`;
  const html = readFileSync(path.join(root, filename), "utf8");
  assert.ok(!html.includes("/_next/image?"), `Server image optimizer found in ${route}`);
  const canonical = html.match(/rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(canonical).href, new URL(route, siteOrigin).href);
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    for (const [, attribute, value] of tag.matchAll(/\b(src|srcset)="([^"]+)"/gi)) {
      const urls = attribute.toLowerCase() === "srcset"
        ? value.split(",").map((entry) => entry.trim().split(/\s+/)[0])
        : [value];
      for (const url of urls) {
        assert.ok(url.startsWith("/images/responsive/"), `Non-static image: ${url}`);
        assert.ok(existsSync(path.join(root, decodeURIComponent(url))), `Missing image: ${url}`);
        referencedImages.add(url);
      }
    }
  }
}

const redirects = readFileSync(path.join(root, "_redirects"), "utf8");
for (const { slug } of categories) {
  assert.ok(redirects.includes(`/urun/${slug} /kategori/${slug} 308\n`));
  assert.ok(redirects.includes(`/urun/${slug}/ /kategori/${slug} 308\n`));
}
assert.equal(readFileSync(path.join(root, "_headers"), "utf8"), readFileSync("public/_headers", "utf8"));
const files = readdirSync(root, { recursive: true }).filter((file) => statSync(path.join(root, file)).isFile());
assert.ok(files.length <= 20000, "Cloudflare Workers Free asset limit exceeded");
for (const file of files) assert.ok(statSync(path.join(root, file)).size <= 25 * 1024 * 1024, `Asset exceeds 25 MiB: ${file}`);
console.log(`Static export verified: ${routes.length} pages, ${referencedImages.size} referenced responsive images, ${categories.length * 2} redirects, security headers and Workers Static Assets configuration.`);
