const configuredUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://ismodasi.com"
      : "http://localhost:3000"),
);

// Reject invalid deployment URLs before they reach canonical links and the sitemap.
if (
  !["http:", "https:"].includes(configuredUrl.protocol) ||
  configuredUrl.username || configuredUrl.password ||
  configuredUrl.pathname !== "/" || configuredUrl.search || configuredUrl.hash ||
  (process.env.NODE_ENV === "production" &&
    (configuredUrl.protocol !== "https:" ||
      ["localhost", "127.0.0.1", "[::1]"].includes(configuredUrl.hostname)))
) {
  throw new Error("NEXT_PUBLIC_SITE_URL must be a site origin (HTTPS and a public hostname in production).");
}

export const siteUrl = configuredUrl.origin;
export const phoneHref = "tel:+905360801845";
export const whatsappHref = "https://wa.me/905360801845";
export const emailHref = "mailto:info@ismodasi.com";
export function productInquiry(name: string, slug: string) {
  const subject = `${name} — Ürün bilgi talebi`;
  const body = `Merhaba,\n\n${name} hakkında bilgi almak istiyorum.\nÜrün: ${siteUrl}/urun/${slug}\n\nFirma adı:\nİhtiyaç duyulan adet:\nİletişim bilgisi:\n`;
  return `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
