import Catalog from "@/components/Catalog/Catalog";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";
export const metadata = pageMetadata(
  "Tüm ürünler",
  "İş Modası iş kıyafetleri ve koruyucu ekipman koleksiyonu. Ürünleri kategoriye göre inceleyin.",
  "/urunler",
);
export default function ProductsPage() {
  return (
    <div className="container listing-page">
      <Breadcrumbs items={[{ label: "Tüm ürünler" }]} />
      <div className="page-heading">
        <span className="section-label">İŞ MODASI KOLEKSİYONU</span>
        <h1>İşin her alanı için.</h1>
        <p>
          İş kıyafetleri, yüksek görünürlük ürünleri ve koruyucu ekipmanları
          keşfedin.
        </p>
      </div>
      <Catalog />
    </div>
  );
}
