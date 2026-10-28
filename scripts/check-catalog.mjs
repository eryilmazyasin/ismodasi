import assert from "node:assert/strict";
import { readFileSync, existsSync, readdirSync } from "node:fs";
import path from "node:path";
const { categories, products } = JSON.parse(
  readFileSync("src/data/catalog.json", "utf8"),
);
const sources = JSON.parse(readFileSync("src/data/catalog-sources.json", "utf8"));
const sourceRoot = "assets/source/products/all-products";
const sourceImages = readdirSync(sourceRoot, { recursive: true })
  .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))
  .map((file) => path.join(sourceRoot, file));
assert.ok(products.length > 0);
assert.ok(categories.length > 0);
assert.equal(products.length, sourceImages.length, "Every supplied image must be imported");
assert.equal(new Set(products.map((product) => product.slug)).size, products.length);
assert.equal(new Set(categories.map((category) => category.slug)).size, categories.length);
assert.deepEqual(new Set(Object.values(sources)), new Set(sourceImages));
for (const category of categories) {
  assert.ok(products.some((product) => product.category === category.slug), category.name);
  assert.match(category.slug, /^[a-z0-9-]+$/);
}
for (const product of products) {
  assert.ok(existsSync(`public${product.image}`), product.image);
  assert.ok(existsSync(sources[product.slug]), product.slug);
  assert.ok(categories.some((category) => category.slug === product.category));
  assert.match(product.slug, /^[a-z0-9-]+$/);
  assert.ok(product.image.startsWith(`/images/products/${product.category}/`));
  assert.ok(product.image.endsWith(".webp"));
  assert.ok(product.name.trim());
  assert.ok(product.description.trim());
}
const publishedImages = readdirSync("public/images/products", { recursive: true })
  .filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file));
assert.equal(publishedImages.length, products.length, "No obsolete published images should remain");
console.log(`Catalog verified: ${products.length} products, ${categories.length} populated categories, all source images imported, no obsolete product images.`);
