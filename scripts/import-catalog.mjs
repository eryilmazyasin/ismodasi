import { readdirSync, readFileSync, mkdirSync, writeFileSync, rmSync, renameSync, copyFileSync } from "node:fs";
import path from "node:path";
import sharp from "sharp";

const sourceRoot = "assets/source/products/all-products";
const stagingRoot = "output/catalog-images";
const outputRoot = "public/images/products";
const categoryDefinitions = JSON.parse(readFileSync("src/data/catalog-categories.json", "utf8"));
const nameRepairs = new Map([
  ["Parlak Mavi İş Güvenliği Baretii", "Parlak Mavi İş Güvenliği Bareti"],
  ["Güvenlik Pantolonu SarıLaci", "Güvenlik Pantolonu Sarı Lacivert"],
  ["Siyah Polar Boyunluk Product Shot", "Siyah Polar Boyunluk"],
  ["Lacivert Uzun Kollu Polo Gömlek (1)", "Lacivert Uzun Kollu Polo Gömlek"],
  ["yeşil uzun kollu polo####", "Yeşil Uzun Kollu Polo Tişört"],
  ["Özel Güvenlik Pantolonu  Yönergeye Uygu", "Özel Güvenlik Pantolonu"],
]);
const colorNames = ["Sarı", "Turuncu", "Kırmızı", "Lacivert", "Saks Mavi", "Kraliyet Mavisi", "Turkuaz Mavi", "Mavi", "Siyah", "Antrasit", "Füme", "Gri", "Beyaz", "Yeşil", "Haki", "Bordo"];

function createSlug(value) {
  return value.toLocaleLowerCase("tr-TR").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/ı/g, "i").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
function formatProductName(filename) {
  const stem = path.parse(filename).name.normalize("NFC");
  if (nameRepairs.has(stem)) return nameRepairs.get(stem);
  return stem
    .replace(/(Lacivert|Gri|Sarı|Turuncu)(?=Kırmızı|Saks|Gri|Lacivert|Laci)/g, "$1 ")
    .replace(/T-Shirt/gi, "Tişört")
    .replace(/(?:Ürün Çekimi|Beyaz Zeminde|Beyaz Fondan)/gi, "")
    .trim()
    .split(/\s+/)
    .map((word) => /^(hi-vis|3m|atg|yds|cofra|era|camp|eksed|dpro|ffp[123]|s[123]p?|nr|ci|lg|fo|sr|oil|ac|rd40|epdm|s1101sgafkt|h510a|h520a|h510p3e|h540a|gpp05|elsp|ul|el|i|ii|iii|kt|eks-536-dk|g3000|g3001|h-700|440v)$/i.test(word) ? ({"hi-vis":"Hi-Vis"}[word.toLowerCase()] || word.toUpperCase()) : word.charAt(0).toLocaleUpperCase("tr-TR") + word.slice(1).toLocaleLowerCase("tr-TR"))
    .join(" ");
}
function getProductColors(name) {
  const found = colorNames.filter((color) => name.toLocaleLowerCase("tr-TR").includes(color.toLocaleLowerCase("tr-TR")));
  // Specific blue shades should not also appear as a second generic blue value.
  return found.filter((color) => color !== "Mavi" || !found.some((other) => other !== color && /mavi/i.test(other))).join(" / ");
}

const directories = readdirSync(sourceRoot, { withFileTypes: true }).filter((entry) => entry.isDirectory());
const categories = [];
const products = [];
const usedSlugs = new Set();
const sourceMap = {};
rmSync(stagingRoot, { recursive: true, force: true });
mkdirSync(stagingRoot, { recursive: true });
let sourceBytes = 0;
let optimizedBytes = 0;
for (const { folder: folderName, ...definition } of categoryDefinitions) {
  const directory = directories.find((entry) => entry.name.normalize("NFC") === folderName);
  if (!directory) continue;
  const category = {
    ...definition,
    description: `${definition.name} modellerini inceleyin. Ekibinizin ihtiyaçlarına yönelik ürün bilgisi ve kurumsal talepleriniz için İş Modası ile iletişime geçin.`,
  };
  const folder = path.join(sourceRoot, directory.name);
  const files = readdirSync(folder).filter((file) => /\.(png|jpe?g|webp|avif)$/i.test(file)).sort((a, b) => a.localeCompare(b, "tr"));
  if (!files.length) continue;
  categories.push(category);
  mkdirSync(path.join(stagingRoot, category.slug), { recursive: true });
  for (const file of files) {
    const name = formatProductName(file);
    const baseSlug = createSlug(name);
    let slug = baseSlug;
    for (let suffix = 2; usedSlugs.has(slug); suffix++) slug = `${baseSlug}-${suffix}`;
    usedSlugs.add(slug);
    const source = path.join(folder, file);
    const image = `/images/products/${category.slug}/${slug}.webp`;
    const destination = path.join(stagingRoot, category.slug, `${slug}.webp`);
    const metadata = await sharp(source).metadata();
    // Existing optimized WebP sources are copied losslessly when resizing is unnecessary.
    let info;
    if (metadata.format === "webp" && metadata.width <= 1600 && metadata.height <= 1600 && (!metadata.orientation || metadata.orientation === 1)) {
      copyFileSync(source, destination);
      info = { size: readFileSync(source).length };
    } else {
      info = await sharp(source).rotate().resize({ width: 1600, height: 1600, fit: "inside", withoutEnlargement: true }).webp({ quality: 84, alphaQuality: 100, effort: 6 }).toFile(destination);
    }
    sourceBytes += readFileSync(source).length;
    optimizedBytes += info.size;
    const color = getProductColors(name);
    // Filenames supply names and colors only; unverified fabric or safety claims are not inferred.
    products.push({ slug, name, category: category.slug, image, color, description: `${name}. Ürün detayları, beden ve kurumsal adet talepleriniz için bizimle iletişime geçin.` });
    sourceMap[slug] = source;
  }
}
// Reject unhandled populated folders instead of silently dropping user-supplied products.
for (const directory of directories) {
  if (categoryDefinitions.some(({ folder }) => folder === directory.name.normalize("NFC"))) continue;
  if (readdirSync(path.join(sourceRoot, directory.name)).some((file) => /\.(png|jpe?g|webp|avif)$/i.test(file))) throw new Error(`Unmapped category: ${directory.name}`);
}
if (!products.length) throw new Error("No products imported");
rmSync(outputRoot, { recursive: true, force: true });
renameSync(stagingRoot, outputRoot);
writeFileSync("src/data/catalog.json", JSON.stringify({ categories, products }, null, 2) + "\n");
writeFileSync("src/data/catalog-sources.json", JSON.stringify(sourceMap, null, 2) + "\n");
console.log(JSON.stringify({ categories: categories.length, products: products.length, sourceBytes, optimizedBytes, perCategory: Object.fromEntries(categories.map((category) => [category.name, products.filter((product) => product.category === category.slug).length])) }, null, 2));
