import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Phone,
  EnvelopeSimple,
  CaretDown,
} from "@phosphor-icons/react/dist/ssr";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ProductCard from "@/components/ProductCard/ProductCard";
import { products, getProduct, getCategory } from "@/lib/catalog";
import { pageMetadata, siteUrl, productInquiry, phoneHref } from "@/lib/site";
import type { SlugPageProps } from "@/lib/types";
export const dynamicParams = false;
export function generateStaticParams() {
  return products.map(({ slug }) => ({ slug }));
}
export async function generateMetadata({ params }: SlugPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  return pageMetadata(
    product.name,
    product.description,
    `/urun/${slug}`,
    product.image,
  );
}
export default async function ProductPage({ params }: SlugPageProps) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    description: product.description,
    image: `${siteUrl}${product.image}`,
    url: `${siteUrl}/urun/${slug}`,
    category: category.name,
    color: product.color,
  };
  const related = products
    .filter(
      (item) =>
        item.slug !== slug &&
        getCategory(item.category)?.group === category.group,
    )
    .slice(0, 4);
  return (
    <div className="container detail-page">
      <Breadcrumbs
        items={[
          { label: "Tüm ürünler", href: "/urunler" },
          { label: category.name, href: `/kategori/${category.slug}` },
          { label: product.name },
        ]}
      />
      <div className="product-detail">
        <div className="detail-photo">
          <Image
            src={product.image}
            alt={product.name}
            fill
            loading="eager"
            sizes="(max-width: 767px) 90vw, 48vw"
          />
        </div>
        <div className="detail-copy">
          <Link className="section-label" href={`/kategori/${category.slug}`}>
            {category.name}
          </Link>
          <h1>{product.name}</h1>
          <p className="detail-description">{product.description}</p>
          <dl className="product-spec">
            <div>
              <dt>Renk</dt>
              <dd>{product.color}</dd>
            </div>
            <div>
              <dt>Kategori</dt>
              <dd>{category.name}</dd>
            </div>
          </dl>
          <div className="inquiry-box">
            <h2>Ekibiniz için bu ürünü mü düşünüyorsunuz?</h2>
            <p>Adet, beden ve ürün detayları için bizimle iletişime geçin.</p>
            <a
              className="button button-dark"
              href={productInquiry(product.name, slug)}
            >
              <EnvelopeSimple size={20} /> Ürün hakkında bilgi alın
            </a>
            <a className="detail-phone" href={phoneHref}>
              <Phone size={19} /> 0536 080 1845
            </a>
          </div>
          <details className="detail-disclosure">
            <summary>
              Kurumsal talepler nasıl ilerler?
              <CaretDown size={18} />
            </summary>
            <p>
              İlgilendiğiniz ürünü ve firmanızın ihtiyacını bizimle paylaşın.
              Ürün seçimi, adet ve diğer detayları birlikte değerlendirelim.
            </p>
          </details>
          <Link href="/urunler" className="back-link">
            ← Koleksiyona dön
          </Link>
        </div>
      </div>
      {related.length > 0 && (
        <section className="related">
          <div className="collection-heading">
            <h2>Bunları da inceleyin.</h2>
          </div>
          <div className="product-grid">
            {related.map((item) => (
              <ProductCard product={item} key={item.slug} />
            ))}
          </div>
        </section>
      )}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
    </div>
  );
}
