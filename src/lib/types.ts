import type { ReactNode } from "react";
export type Category = {
  slug: string;
  name: string;
  group: string;
  description: string;
};
export type Product = {
  slug: string;
  name: string;
  category: string;
  image: string;
  color: string;
  description: string;
};
export type SlugPageProps = { params: Promise<{ slug: string }> };
export type ChildrenProps = { children: ReactNode };
export type BreadcrumbItem = { label: string; href?: string };
export type CatalogProps = { initialCategory?: string; compact?: boolean };
export type ProductCardProps = { product: Product; priority?: boolean };
