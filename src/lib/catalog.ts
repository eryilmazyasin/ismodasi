import data from "@/data/catalog.json";
import type { Category, Product } from "@/types/types";
export const categories: Category[] = data.categories;
export const products: Product[] = data.products;
export const groups = [
  "İş Kıyafetleri",
  "Yüksek Görünürlük",
  "Koruyucu Ekipman",
];
export const getCategory = (slug: string) =>
  categories.find((item) => item.slug === slug);
export const getProduct = (slug: string) =>
  products.find((item) => item.slug === slug);
// Turkish casing must run before accent folding so both “iş” and “IS” match.
export function normalizeSearch(value: string) {
  return value
    .toLocaleLowerCase("tr-TR")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ı/g, "i")
    .trim();
}
