# İş Modası

Türkçe B2B iş kıyafeti kataloğu. Next.js App Router, TypeScript, Tailwind CSS; yerel Barlow fontları ve Phosphor ikonları.

## Çalıştırma

```sh
npm ci
npm run dev
```

http://localhost:3000

```sh
npm run check:catalog
npm run build
npm start
```

## Cloudflare Pages üzerinde yayınlama

`.env.example` dosyasını `.env.local` olarak kopyalayın. `NEXT_PUBLIC_SITE_URL` değerini gerçek HTTPS alan adına ayarlayıp yeniden derleyin. Canonical, Open Graph, sitemap ve ürün bilgi e-postaları bu adresi kullanır. Yerel geliştirmede varsayılan adres http://localhost:3000, üretim derlemesinde https://ismodasi.com olur. Üretimde HTTPS olmayan, yerel sunucuya işaret eden veya yol/sorgu içeren alan adı ayarları derlemeyi durdurur. Farklı bir alan adı kullanacaksanız bu değeri derlemeden önce değiştirin; `NEXT_PUBLIC_` değerleri derleme sırasında sabitlenir.

Cloudflare panelinde **Workers & Pages → Create application → Pages → Import an existing Git repository** yolunu kullanın. Workers projesi yerine Pages projesi oluşturun. Ayarlar:

| Ayar | Değer |
| --- | --- |
| Framework preset | Next.js (Static HTML Export) |
| Build command | `npm run build` |
| Build output directory | `out` |
| Root directory | Repo kökü |
| Node.js | 22 (`.node-version` içinde tanımlı) |
| Environment variable | `NEXT_PUBLIC_SITE_URL=https://ismodasi.com` |

Preset farklı bir build komutu önerirse `npm run build` olarak değiştirin; bu komut görselleri ve yönlendirmeleri de hazırlar. Bağımlılık kurulumu sırasında geliştirme bağımlılıkları da kurulmalıdır; `sharp` derlemede, `wrangler` yerel önizlemede kullanılır.

İlk yayın sonrası **Custom domains → Set up a domain** üzerinden alan adını ekleyin. Kök alan adı için DNS nameserver kayıtlarını Cloudflare'a yönlendirin. Alan adını başka firmaya taşımanız gerekmez. `www` adresini de ekleyip tercih ettiğiniz ana adrese yönlendirin. Mevcut e-posta hizmeti varsa MX, SPF, DKIM ve DMARC kayıtlarını DNS geçişinde koruyun. Özel bir Cache Everything kuralı eklemeyin; Pages'in varsayılan önbelleği kullanılır.

Git entegrasyonu kullanmadan CLI ile manuel dağıtım için `npm run build` sonrasında `npx wrangler pages deploy out` komutunu kullanın; bu komut Cloudflare hesabınızla giriş yapmanızı ve Pages projesini seçmenizi ister. Yayın çıktısı yalnızca `out/` klasörüdür. `_headers`, `_redirects` ve `404.html` bu klasöre dahildir. Cloudflare hesabına giriş veya dağıtım bu repo tarafından otomatik yapılmaz.

Ürünler `src/data/catalog.json` içindedir. Katalog, `assets/source/products/all-products/` altındaki 20 dolu kategorinin 141 ürününü içerir. Aktif kaynak ürün görselleri `assets/source/products/all-products/` altında korunur; eski kaynaklar `assets/archive/legacy-products/` altındadır. Kaban klasörü boş olduğu için yayımlanmaz. Yayındaki dosyalar `public/images/` altında kullanım alanına göre gruplanır ve ASCII adlarıyla tutulur.

İletişim: 0536 080 1845 / info@ismodasi.com. Bilgi talebi kullanıcının e-posta uygulamasını açar; otomatik mesaj göndermez. Ödeme, sepet, üyelik veya form sunucusu bulunmaz. Beden, kumaş ve sertifikalar henüz doğrulanmadığı için belirtilmez.

İletişim sayfasındaki talep formu ad, firma, e-posta, tahmini adet ve mesaj alanlarını içerir. Gerekli alanları doğrular ve bilgileri e-posta taslağına aktarır; gönderimi kullanıcı kendi e-posta uygulamasında tamamlar. Veriler sunucuda saklanmaz. Bu sayfanın görseli imagegen ile üretilmiştir; optimize WebP dosyası public/images/contact/, kaynak ve üretim istemi assets/source/contact/ altındadır.

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

`public` altındaki dosyalar kök URL üzerinden sunulur: örneğin `public/images/brand/logo.webp`, `/images/brand/logo.webp` olarak kullanılır. Kaynak ve arşiv dosyaları `public` dışında tutulur; site üzerinden sunulmaz. Aktif görseller `next/image` ve yerel statik görsel yükleyicisi ile kullanılır. `npm run dev` ve `npm run build` öncesinde `scripts/prepare-static.mjs`, 320–1600px aralığında altı genişlik için WebP türevlerini `public/images/responsive/` altında üretir; küçük kaynaklar büyütülmez. Tarayıcı `sizes` ve `srcset` ile uygun dosyayı seçer. Bu türevler ile katalogdan üretilen `public/_redirects` Git dışında tutulur ve her derlemede yeniden hazırlanır. Güvenlik başlıkları `public/_headers` içinde tutulur. Route klasörleri URL yapısını korur.

Yayındaki ürün fotoğrafları WebP formatında ve en fazla 1600px uzun kenar sınırıyla optimize edilir; küçük kaynaklar büyütülmez. Transparanlık korunur. Logonun WebP sürümü kayıpsızdır, tarayıcı ikonu ayrı bir 64×64 PNG dosyasıdır. Eski PNG türevleri `assets/archive/products` ve `assets/archive/brand` altında korunur. Hero ve Hakkımızda görselleri zaten optimize edilmiş WebP dosyalarıdır.

## Katalog yenileme

Yeni fotoğrafları `assets/source/products/all-products/` içindeki kategori klasörlerine yerleştirin. `npm run import:catalog` tüm dosyaları WebP olarak işler, katalog ve kaynak eşlemesini üretir ve eski yayındaki ürün türevlerini temizler. Ardından `npm run check:catalog` ve `npm run build` çalıştırın. Boş kategoriler yayımlanmaz; dosya adlarından fiyat, stok, kumaş veya sertifika bilgisi üretilmez. Ana sayfa kategori başına bir ürünle sınırlı bir seçki, `/urunler` tam kataloğu gösterir. Eski kategori adıyla oluşturulmuş ürün URL’leri ilgili kategoriye yönlendirilir.

Kategori klasörü → görünen ad, URL ve menü grubu eşleşmeleri `src/data/catalog-categories.json` içinde tutulur. Silinen klasörler otomatik atlanır; yeni bir kategori eklerken bu eşlemeyi de tanımlayın. Boyutu uygun kaynak WebP dosyaları yeniden sıkıştırılmaz. Ana sayfa en fazla 24 kategori temsilcisi gösterir; katalogda şu an 20 dolu kategori vardır.

## Yayın öncesi kontrol

Node.js 22 kullanın. Kilit dosyasındaki bağımlılıkları `npm ci` ile kurun. `npm run check:catalog`, `npm audit --omit=dev` ve `npm run build` komutlarını çalıştırın. Derleme sonundaki `check:static` kontrolü sayfaları, görsel dosyalarını, yönlendirmeleri ve Pages dosya sınırlarını doğrular. Ardından `npm start` ile http://127.0.0.1:8788 adresinde Cloudflare Pages önizlemesini açıp katalog aramasını, kategori filtrelerini, mobil menüyü ve iletişim formunu kontrol edin. `/robots.txt` ve `/sitemap.xml` adreslerinin gerçek alan adını gösterdiğini doğrulayın.

Proje `output: "export"` ile statik yayınlanır; üretimde Next.js sunucusu, Workers adaptörü veya ücretli görsel servisi gerekmez. `next start` bu yapı için kullanılmaz. Alan adı ve TLS ayarlarını Cloudflare panelinde tamamlayın. İletişim formu e-posta taslağı açar; otomatik teslimat için bir form sunucusu yapılandırılmış değildir.
