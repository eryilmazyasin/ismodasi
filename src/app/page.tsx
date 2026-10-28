import Image from "next/image";
import Link from "next/link";
import Catalog from "@/components/Catalog/Catalog";
import Hero from "@/components/Hero/Hero";
import { pageMetadata } from "@/lib/site";
export const metadata = pageMetadata(
  "Ekibiniz için iş kıyafetleri",
  "İş Modası ile iş montları, pantolonlar, yelekler ve koruyucu ekipmanları keşfedin. Kurumsal iş giyim ihtiyaçlarınız için iletişime geçin.",
  "/",
);
export default function Home() {
  return (
    <>
      <Hero />
      <section className="category-strip" aria-label="Öne çıkan kategoriler">
        <div className="container">
          <span className="strip-title">İşinize göre keşfedin</span>
          <Link href="/kategori/is-montu">
            İş montları
          </Link>
          <Link href="/kategori/likrali-is-pantolonlari">
            İş pantolonları
          </Link>
          <Link href="/kategori/ikaz-yelegi">
            Yelekler
          </Link>
          <Link href="/kategori/kafa-koruma">
            Koruyucu ekipman
          </Link>
        </div>
      </section>
      <div className="container collection">
        <div className="collection-heading">
          <div>
            <span className="section-label">ÜRÜN KOLEKSİYONU</span>
            <h2>İşinize uygun olanı bulun.</h2>
          </div>
          <Link href="/urunler" className="text-link">
            Tüm koleksiyon
          </Link>
        </div>
        <Catalog compact />
      </div>
      <section className="container workwear-story">
        <div className="story-image">
          <Image
            src="/images/muhendis-yelegi.png"
            alt="Sarı lacivert mühendis yeleği"
            fill
            sizes="(max-width: 767px) 90vw, 40vw"
          />
        </div>
        <div className="story-copy">
          <span className="section-label">HER EKİBİN İHTİYACI FARKLI</span>
          <h2>
            Aynı ekibin
            <br />
            bir parçası.
          </h2>
          <p>
            Birlikte çalışan bir ekibin görünümü de bir bütün olmalı. İş
            kıyafetlerinizi seçerken kullanım alanınızı ve kurumsal
            ihtiyaçlarınızı birlikte değerlendirelim.
          </p>
          <Link className="text-link" href="/iletisim">
            İhtiyacınızı konuşalım
          </Link>
        </div>
      </section>
    </>
  );
}
