import type { MetadataRoute } from "next";
import { categories, products } from "@/lib/catalog";
import { siteUrl } from "@/lib/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "/",
    "/urunler",
    "/hakkimizda",
    "/iletisim",
    ...categories.map((item) => `/kategori/${item.slug}`),
    ...products.map((item) => `/urun/${item.slug}`),
  ].map((path) => ({ url: `${siteUrl}${path}` }));
}
