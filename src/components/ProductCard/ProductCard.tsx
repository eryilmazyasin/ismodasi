import Image from "next/image";
import Link from "next/link";
import { getCategory } from "@/lib/catalog";
import type { ProductCardProps } from "@/types/types";
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
          sizes="(max-width: 767px) calc((100vw - 54px) / 2), (max-width: 1023px) calc((100vw - 104px) / 3), (max-width: 1440px) calc((100vw - 184px) / 4), 314px"
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
      </div>
    </article>
  );
}
