import type { NextConfig } from "next";
import catalog from "./src/data/catalog.json";
const nextConfig: NextConfig = {
  devIndicators: false,
  async redirects() {
    return catalog.categories.map((category) => ({
      source: `/urun/${category.slug}`,
      destination: `/kategori/${category.slug}`,
      permanent: true,
    }));
  },
};
export default nextConfig;
