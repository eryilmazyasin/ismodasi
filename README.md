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

## Cloudflare Workers Static Assets üzerinde yayınlama

`.env.example` dosyasını `.env.local` olarak kopyalayın. `NEXT_PUBLIC_SITE_URL` değerini gerçek HTTPS alan adına ayarlayıp yeniden derleyin. Canonical, Open Graph, sitemap ve ürün bilgi e-postaları bu adresi kullanır. Yerel geliştirmede varsayılan adres http://localhost:3000, üretim derlemesinde https://ismodasi.com olur. Üretimde HTTPS olmayan, yerel sunucuya işaret eden veya yol/sorgu içeren alan adı ayarları derlemeyi durdurur. Farklı bir alan adı kullanacaksanız bu değeri derlemeden önce değiştirin; `NEXT_PUBLIC_` değerleri derleme sırasında sabitlenir.

Cloudflare panelinde **Workers & Pages** üzerinden `ismodasi` Worker projesini açıp GitHub reposunu bağlayın veya yeni bir Worker oluşturun. `wrangler.json`, `out/` klasörünü Static Assets olarak tanımlar. Mevcut projede daha önce otomatik OpenNext yapılandırması oluşturulduysa aşağıdaki komutlarla değiştirin:

| Ayar | Değer |
| --- | --- |
| Worker / project name | `ismodasi` (`wrangler.json` ile aynı olmalı) |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Preview command | `npm run preview` |
| Root directory | Repo kökü |
| Node.js | 22 (`.node-version` içinde tanımlı) |
| Environment variable | `NEXT_PUBLIC_SITE_URL=https://ismodasi.com` |

Build komutu `npm run build` olmalıdır; bu komut görselleri ve yönlendirmeleri de hazırlar. Deploy komutu `npm run deploy`, otomatik framework algılamasını kapatarak hazır `out/` dosyalarını yükler. OpenNext veya `opennextjs-cloudflare build` komutu eklemeyin. Bağımlılık kurulumu sırasında geliştirme bağımlılıkları da kurulmalıdır; `sharp` derlemede, `wrangler` yerel önizleme ve yayında kullanılır.

Production branch olarak `main` seçin. Workers Builds Git bağlantısı etkin olduğunda bu dala her push yeni bir build ve otomatik yayın başlatır. Diğer dallar için **Enable Preview builds** açılabilir; `npm run preview` ve `wrangler.json` içindeki `previews` ayarı ayrı önizleme yayınlarını destekler. `NEXT_PUBLIC_SITE_URL` değişkenini build değişkeni olarak tanımlayın; yalnızca runtime ortamına eklemek statik HTML içindeki adresleri değiştirmez.

İlk yayın sonrası Worker içindeki **Settings → Domains & Routes → Add → Custom Domain** üzerinden alan adını ekleyin. Alan adının DNS nameserver kayıtları Cloudflare'da yönetilmelidir. Alan adını başka firmaya taşımanız gerekmez. `www` adresini de ekleyip tercih ettiğiniz ana adrese yönlendirin. Mevcut e-posta hizmeti varsa MX, SPF, DKIM ve DMARC kayıtlarını DNS geçişinde koruyun. Özel bir Cache Everything kuralı eklemeyin; Workers Static Assets'in varsayılan önbelleği kullanılır.

Git entegrasyonu kullanmadan CLI ile manuel dağıtım için `npm run build` sonrasında `npm run deploy` komutunu kullanın. Önce `npx wrangler login` ile hesabınıza giriş yapın. Yayın çıktısı yalnızca `out/` klasörüdür; `_headers`, `_redirects` ve `404.html` bu klasöre dahildir. `npm run deploy` mevcut çıktıyı yükler, yeniden build yapmaz. Uzak yayına çıkmadan yapılandırmayı kontrol etmek için `npm run deploy -- --dry-run` kullanılabilir.

Ürünler `src/data/catalog.json` içindedir. Katalog, `assets/source/products/all-products/` altındaki 20 dolu kategorinin 141 ürününü içerir. Aktif kaynak ürün görselleri `assets/source/products/all-products/` altında korunur; eski kaynaklar `assets/archive/legacy-products/` altındadır. Kaban klasörü boş olduğu için yayımlanmaz. Yayındaki dosyalar `public/images/` altında kullanım alanına göre gruplanır ve ASCII adlarıyla tutulur.

İletişim: 0536 080 1845 / info@ismodasi.com. Ürün detaylarındaki bilgi talebi e-posta uygulamasını açar. İletişim sayfasındaki form ise Workers `/api/contact` uç noktası üzerinden `info@ismodasi.com` adresine otomatik e-posta gönderir. Ödeme, sepet veya üyelik bulunmaz. Beden, kumaş ve sertifikalar henüz doğrulanmadığı için belirtilmez.

İletişim sayfasındaki talep formu ad, firma, e-posta, tahmini adet ve mesaj alanlarını içerir. Gerekli alanları hem tarayıcıda hem Worker üzerinde doğrular; başarılı API yanıtından sonra talebin alındığını gösterir. Başarısız gönderimlerde alanlar korunur. Talep verileri uygulama veritabanına veya loglarına yazılmaz; teslimat için Cloudflare ve Resend üzerinden işlenir ve alıcı posta kutusuna iletilir. Bu sayfanın görseli imagegen ile üretilmiştir; optimize WebP dosyası public/images/contact/, kaynak ve üretim istemi assets/source/contact/ altındadır.

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

Node.js 22 kullanın. Kilit dosyasındaki bağımlılıkları `npm ci` ile kurun. `npm run check:catalog`, `npm audit --omit=dev` ve `npm run build` komutlarını çalıştırın. Derleme sonundaki `check:static` kontrolü sayfaları, görsel dosyalarını, yönlendirmeleri, Workers yapılandırmasını ve dosya sınırlarını doğrular. Ardından `npm start` ile http://127.0.0.1:8787 adresinde yerel Workers Static Assets önizlemesini açıp katalog aramasını, kategori filtrelerini, mobil menüyü ve iletişim formunu kontrol edin. `/robots.txt` ve `/sitemap.xml` adreslerinin gerçek alan adını gösterdiğini doğrulayın.

Proje `output: "export"` ile statik yayınlanır; üretimde Next.js sunucusu, Workers adaptörü veya ücretli görsel servisi gerekmez. `next start` bu yapı için kullanılmaz. Alan adı ve TLS ayarlarını Cloudflare panelinde tamamlayın. İletişim formunun canlı teslimatı için aşağıdaki Resend yapılandırması tamamlanmalıdır.

## Formdan otomatik e-posta gönderimi

Statik site Workers Static Assets üzerinde kalır. `src/worker/index.ts` yalnızca `/api/contact` gönderimlerini işler; diğer istekleri `ASSETS` üzerinden sunar. Next.js API route veya OpenNext kullanılmaz.

1. [Resend](https://resend.com) hesabınızda **Domains** bölümüne `bildirim.ismodasi.com` gönderici alt alan adını ekleyin. Resend'in gösterdiği DNS kayıtlarını Cloudflare DNS'e ekleyip doğrulayın. Yalnızca gönderimi etkinleştirin; Natro'nun kök alan adına ait MX, SPF, DKIM ve mevcut yönlendirme kayıtlarını değiştirmeyin.
2. **API Keys** bölümünden yalnızca gönderim yetkili, bu alan adına sınırlı bir anahtar oluşturun.
3. Cloudflare'da `ismodasi` Worker → **Settings → Variables and Secrets** altında `RESEND_API_KEY` adında **Secret** ekleyin. Bu anahtarı Git'e veya `NEXT_PUBLIC_` değişkenlerine yazmayın. CLI alternatifi: `npx wrangler secret put RESEND_API_KEY`. Preview kullanıyorsanız onun secret ayarını da ayrıca tamamlayın.
4. `wrangler.json` içindeki `CONTACT_FROM` varsayılanı `İş Modası <form@bildirim.ismodasi.com>` şeklindedir. Doğruladığınız gönderici alan adı farklıysa bu değeri ona göre güncelleyin. Alıcı kodda sabit `info@ismodasi.com` olarak tutulur; ziyaretçi adresi yalnızca `Reply-To` olur. Natro'daki mevcut yönlendirme, gelen e-postayı kişisel adresinize iletmeye devam eder.
5. Değişiklikleri pushlayıp yayın tamamlandıktan sonra `/iletisim` üzerinden bir test talebi gönderin. Resend gönderim kayıtlarını ve alıcı kutusunu kontrol edin. API kabulü, mesajın spam klasörüne düşmeyeceğini garanti etmez.

Anahtar tanımlanmamışsa form başarılı görünmez; kullanıcıya e-posta/telefon ile ulaşma seçeneği sunulur. Gönderim sunucuda 10 saniye, tarayıcıda 20 saniye ile sınırlıdır. Aynı formu tekrar denemek Resend'in 24 saatlik idempotency anahtarıyla yinelenen gönderimi önler. Alan değiştiğinde yeni bir talep kimliği üretilir. Sunucu, aynı origin kontrolü, gizli bot alanı ve Cloudflare Rate Limiting binding ile IP başına yaklaşık 3 istek/dakika uygular; sayaçlar Cloudflare konumu bazındadır.

Yerel test için `.dev.vars.example` dosyasını `.dev.vars` olarak kopyalayıp gerçek anahtarı yalnızca bu dosyaya yazın; dosya Git dışında tutulur. `npm run build` ve `npm start` ile form API'sini de içeren önizlemeyi açın (`npm run dev` yalnızca Next.js sayfalarını sunar). `npm run test:contact`, gerçek e-posta göndermeden derlenmiş Worker üzerinde sahte sağlayıcıyla gönderim, hata, güvenlik ve tekrar deneme senaryolarını kontrol eder.
