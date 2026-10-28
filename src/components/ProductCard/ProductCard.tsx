import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/catalog";
import type { ProductCardProps } from "@/lib/types";
export default function ProductCard({
  product,
  priority = false,
}: ProductCardProps) {
  return (
    <article className="product-card">
      <Link
        href={`/urun/${product.slug}`}
        className="product-photo"
        aria-label={`${product.name} ürününü incele`}
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 46vw, (max-width: 1023px) 30vw, 23vw"
          loading={priority ? "eager" : "lazy"}
        />
      </Link>
      <div className="product-info">
        <span className="product-category">
          {getCategory(product.category)?.name}
        </span>
        <h3>
          <Link href={`/urun/${product.slug}`}>{product.name}</Link>
        </h3>
        <span className="product-color">{product.color}</span>
        <Link className="product-link" href={`/urun/${product.slug}`}>
          Ürünü incele
        </Link>
      </div>
    </article>
  );
}
