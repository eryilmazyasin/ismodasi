# İş Modası

Türkçe B2B iş kıyafeti kataloğu. Next.js App Router, TypeScript, Tailwind CSS; yerel Barlow fontları ve Phosphor ikonları.

## Çalıştırma

```sh
npm install
npm run dev
```

http://localhost:3000

```sh
npm run check:catalog
npm run build
npm start
```

## Yayınlama

`.env.example` dosyasını `.env.local` olarak kopyalayın. `NEXT_PUBLIC_SITE_URL` değerini gerçek HTTPS alan adına ayarlayıp yeniden derleyin. Canonical, Open Graph, sitemap ve ürün bilgi e-postaları bu adresi kullanır. Yerel geliştirmede varsayılan adres http://localhost:3000 olur.

Ürünler `src/data/catalog.json` içindedir. Katalog, `assets/source/products/all-products/` altındaki 20 dolu kategorinin 141 ürününü içerir. Aktif kaynak ürün görselleri `assets/source/products/all-products/` altında korunur; eski kaynaklar `assets/archive/legacy-products/` altındadır. Kaban klasörü boş olduğu için yayımlanmaz. Yayındaki dosyalar `public/images/` altında kullanım alanına göre gruplanır ve ASCII adlarıyla tutulur.

İletişim: 0536 080 1845 / info@ismodasi.com. Bilgi talebi kullanıcının e-posta uygulamasını açar; otomatik mesaj göndermez. Ödeme, sepet, üyelik veya form sunucusu bulunmaz. Beden, kumaş ve sertifikalar henüz doğrulanmadığı için belirtilmez.

İletişim sayfasındaki talep formu ad, firma, e-posta, tahmini adet ve mesaj alanlarını içerir. Gerekli alanları doğrular ve bilgileri e-posta taslağına aktarır; gönderimi kullanıcı kendi e-posta uygulamasında tamamlar. Veriler sunucuda saklanmaz. Bu sayfanın görseli imagegen ile üretilmiştir; optimize WebP dosyası public/images/contact/, kaynak ve üretim istemi assets/source/contact/ altındadır.
# ismodasi
# ismodasi
# ismodasi

## Klasör yapısı

```text
src/
  app/              # App Router sayfaları, layout, metadata ve global stiller
  components/       # PascalCase klasörlerde ortak React bileşenleri
  assets/fonts/     # next/font/local ile derlenen yazı tipleri
  data/             # Katalog verisi
  lib/              # Katalog, metadata ve site yardımcıları
  types/            # Ortak TypeScript tipleri
public/images/
  brand/            # Logo
  products/         # Yayındaki ürün görselleri
  hero/             # Aktif transparan model ve kumaş dokusu
  about/            # Hakkımızda arka planı
assets/
  source/           # Orijinal ürün, hero ve logo kaynakları
  archive/          # Kullanılmayan eski görsel türevleri
scripts/            # Katalog doğrulama araçları
```

`public` altındaki dosyalar kök URL üzerinden sunulur: örneğin `public/images/brand/logo.webp`, `/images/brand/logo.webp` olarak kullanılır. Kaynak ve arşiv dosyaları `public` dışında tutulur; site üzerinden sunulmaz. Aktif görseller `next/image` ile kullanılır. Route klasörleri URL yapısını korur.

Yayındaki ürün fotoğrafları WebP formatında ve en fazla 1600px uzun kenar sınırıyla optimize edilir; küçük kaynaklar büyütülmez. Transparanlık korunur. Logonun WebP sürümü kayıpsızdır, tarayıcı ikonu ayrı bir 64×64 PNG dosyasıdır. Eski PNG türevleri `assets/archive/products` ve `assets/archive/brand` altında korunur. Hero ve Hakkımızda görselleri zaten optimize edilmiş WebP dosyalarıdır.

## Katalog yenileme

Yeni fotoğrafları `assets/source/products/all-products/` içindeki kategori klasörlerine yerleştirin. `npm run import:catalog` tüm dosyaları WebP olarak işler, katalog ve kaynak eşlemesini üretir ve eski yayındaki ürün türevlerini temizler. Ardından `npm run check:catalog` ve `npm run build` çalıştırın. Boş kategoriler yayımlanmaz; dosya adlarından fiyat, stok, kumaş veya sertifika bilgisi üretilmez. Ana sayfa kategori başına bir ürünle sınırlı bir seçki, `/urunler` tam kataloğu gösterir. Eski kategori adıyla oluşturulmuş ürün URL’leri ilgili kategoriye yönlendirilir.

Kategori klasörü → görünen ad, URL ve menü grubu eşleşmeleri `src/data/catalog-categories.json` içinde tutulur. Silinen klasörler otomatik atlanır; yeni bir kategori eklerken bu eşlemeyi de tanımlayın. Boyutu uygun kaynak WebP dosyaları yeniden sıkıştırılmaz. Ana sayfa en fazla 24 kategori temsilcisi gösterir; katalogda şu an 20 dolu kategori vardır.
