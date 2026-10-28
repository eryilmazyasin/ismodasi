import type { Metadata } from "next";
export const siteUrl = new URL(
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
).origin;
export const phoneHref = "tel:+905360801845";
export const emailHref = "mailto:info@ismodasi.com";
export function productInquiry(name: string, slug: string) {
  const subject = `${name} — Ürün bilgi talebi`;
  const body = `Merhaba,\n\n${name} hakkında bilgi almak istiyorum.\nÜrün: ${siteUrl}/urun/${slug}\n\nFirma adı:\nİhtiyaç duyulan adet:\nİletişim bilgisi:\n`;
  return `${emailHref}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/is-montu.png",
): Metadata {
  return {
    title: { absolute: `${title} | İş Modası` },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | İş Modası`,
      description,
      url: path,
      locale: "tr_TR",
      type: "website",
      siteName: "İş Modası",
      images: [{ url: image, width: 1024, height: 1536, alt: title }],
    },
  };
}
