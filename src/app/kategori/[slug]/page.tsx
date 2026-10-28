import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog/Catalog";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { categories, getCategory } from "@/lib/catalog";
import { pageMetadata } from "@/lib/site";
import type { SlugPageProps } from "@/lib/types";
export const dynamicParams = false;
export function generateStaticParams() {
  return categories.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return pageMetadata(
    category.name,
    category.description,
    `/kategori/${slug}`,
    `/images/${slug}.png`,
  );
}
export default async function CategoryPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const category = getCategory(slug);
  if (!category) notFound();
  return (
    <div className="container listing-page">
      <Breadcrumbs
        items={[
          { label: "Tüm ürünler", href: "/urunler" },
          { label: category.name },
        ]}
      />
      <div className="page-heading">
        <span className="section-label">{category.group}</span>
        <h1>{category.name}</h1>
        <p>{category.description}</p>
      </div>
      <Catalog initialCategory={slug} />
    </div>
  );
}
