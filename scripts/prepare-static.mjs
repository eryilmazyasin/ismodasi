import { mkdir, readdir, readFile, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const imageRoot = "public/images";
const outputRoot = path.join(imageRoot, "responsive");
const { deviceSizes, imageSizes } = JSON.parse(await readFile("src/data/image-sizes.json", "utf8"));
const { categories } = JSON.parse(await readFile("src/data/catalog.json", "utf8"));
const widths = [...imageSizes, ...deviceSizes];

// Rebuild only generated derivatives; source images and catalog originals stay intact.
await rm(outputRoot, { recursive: true, force: true });
const images = (await readdir(imageRoot, { recursive: true }))
  .filter((file) => /\.(webp|png|jpe?g|avif)$/i.test(file));
const usedNames = new Set();
sharp.concurrency(1);
for (let offset = 0; offset < images.length; offset += 4) {
  await Promise.all(images.slice(offset, offset + 4).map(async (file) => {
    const name = file.slice(0, -path.extname(file).length);
    if (usedNames.has(name)) throw new Error(`Duplicate image name: ${name}`);
    usedNames.add(name);
    await mkdir(path.join(outputRoot, path.dirname(file)), { recursive: true });
    for (const width of widths) {
      await sharp(path.join(imageRoot, file))
        .rotate()
        .resize({ width, withoutEnlargement: true })
        .webp({ quality: 84, alphaQuality: 100 })
        .toFile(path.join(outputRoot, `${name}-${width}.webp`));
    }
  }));
}

// Keep legacy category URLs working as the catalog changes, without a Next.js server.
const redirects = categories.flatMap(({ slug }) => [
  `/urun/${slug} /kategori/${slug} 308`,
  `/urun/${slug}/ /kategori/${slug} 308`,
]);
await writeFile("public/_redirects", `${redirects.join("\n")}\n`);
console.log(`Prepared ${images.length * widths.length} responsive images and ${redirects.length} Cloudflare redirects.`);
