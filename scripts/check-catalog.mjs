import assert from "node:assert/strict";
import { readFileSync, existsSync } from "node:fs";
const { categories, products } = JSON.parse(
  readFileSync("src/lib/catalog.json", "utf8"),
);
assert.equal(products.length, 12);
assert.equal(categories.length, 12);
assert.equal(new Set(products.map((p) => p.slug)).size, 12);
for (const category of categories) {
  assert.equal(
    products.filter((p) => p.category === category.slug).length,
    1,
    category.name,
  );
  assert.ok(!category.name.toLocaleLowerCase("tr-TR").includes("kaban"));
}
for (const product of products) {
  assert.ok(existsSync(`public${product.image}`), product.image);
  assert.ok(categories.some((c) => c.slug === product.category));
  assert.match(product.slug, /^[a-z0-9-]+$/);
}
console.log(
  "Catalog verified: 12 products, 12 categories, one product per category, all images present.",
);
