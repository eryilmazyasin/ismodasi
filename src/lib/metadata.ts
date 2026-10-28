import type { Metadata } from "next";

export function pageMetadata(
  title: string,
  description: string,
  path: string,
  image = "/images/brand/is-modasi-logo-v2.webp",
): Metadata {
  const pageTitle = `${title} | İş Modası`;
  return {
    title: { absolute: pageTitle },
    description,
    alternates: { canonical: path },
    openGraph: {
      title: pageTitle,
      description,
      url: path,
      locale: "tr_TR",
      type: "website",
      siteName: "İş Modası",
      // Product photographs have different aspect ratios; do not advertise fixed dimensions.
      images: [{ url: image, alt: title }],
    },
    twitter: {
      card: "summary",
      title: pageTitle,
      description,
      images: [{ url: image, alt: title }],
    },
  };
}
