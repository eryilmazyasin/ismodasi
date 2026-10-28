import Link from "next/link";
import { CaretRight } from "@phosphor-icons/react/dist/ssr";
import { siteUrl } from "@/lib/site";
import type { BreadcrumbItem } from "@/types/types";
export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const all = [{ label: "Ana sayfa", href: "/" }, ...items];
  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: all.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.label,
      ...(item.href ? { item: `${siteUrl}${item.href}` } : {}),
    })),
  };
  return (
    <>
      <nav className="breadcrumbs" aria-label="İçerik yolu">
        <ol>
          {all.map((item, index) => (
            <li key={index}>
              {index > 0 && <CaretRight size={11} />}{" "}
              {item.href ? (
                <Link href={item.href}>{item.label}</Link>
              ) : (
                <span aria-current="page">{item.label}</span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(schema).replace(/</g, "\u003c"),
        }}
      />
    </>
  );
}
