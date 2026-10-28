"use client";

import type { ImageLoaderProps } from "next/image";

export default function imageLoader({ src, width }: ImageLoaderProps) {
  // prepare-static.mjs creates these files before both development and production builds.
  const name = src.replace(/^\/images\//, "").replace(/\.[^.]+$/, "");
  return `/images/responsive/${name}-${width}.webp`;
}
