import { notFound } from "next/navigation";
import Catalog from "@/components/Catalog/Catalog";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { categories, products, getCategory } from "@/lib/catalog";
import { pageMetadata } from "@/lib/metadata";
import type { SlugPageProps } from "@/types/types";
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
    products.find((product) => product.category === slug)?.image,
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
