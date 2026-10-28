# Görsel kaynakları

Bu klasör kaynak ve arşiv görsellerini korur; Next.js tarafından genel URL olarak sunulmaz.

- `source/brand`: orijinal logo.
- `source/products/all-products`: yayındaki kataloğun tek kaynağı; kategori ve orijinal dosya adları korunur.
- `source/hero`: sağlanan ön, sırt ve örnek model görselleri.
- `archive/hero`: artık sayfalarda kullanılmayan eski WebP türevleri.

Yayında kullanılan dosyalar `public/images/brand`, `public/images/products`, `public/images/hero` ve `public/images/about` altındadır. Yeni kaynakları bu klasörde koruyun, yalnızca kullanılan optimize edilmiş türevleri `public` altına koyun.

`archive/legacy-products` önceki kaynak kataloğu korur. Yeni ürünler `npm run import:catalog` ile üretilir; `src/data/catalog-sources.json` her ürün slug’ını orijinal fotoğrafıyla eşler.
