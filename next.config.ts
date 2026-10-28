import type { NextConfig } from "next";
import imageSizes from "./src/data/image-sizes.json";
const nextConfig: NextConfig = {
  devIndicators: false,
  poweredByHeader: false,
  output: "export",
  images: {
    loader: "custom",
    loaderFile: "./src/lib/image-loader.ts",
    ...imageSizes,
  },
};
export default nextConfig;
