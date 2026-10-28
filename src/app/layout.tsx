import type { Metadata } from "next";
import localFont from "next/font/local";
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import { siteUrl } from "@/lib/site";
import type { ChildrenProps } from "@/types/types";
import "./globals.css";
const barlow = localFont({
  src: [
    { path: "../assets/fonts/Barlow-Regular.ttf", weight: "400" },
    { path: "../assets/fonts/Barlow-Medium.ttf", weight: "500" },
    { path: "../assets/fonts/Barlow-SemiBold.ttf", weight: "600" },
    { path: "../assets/fonts/Barlow-Bold.ttf", weight: "700" },
  ],
  variable: "--font-barlow",
  display: "swap",
});
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "İş Modası | Kurumsal İş Kıyafetleri",
    template: "%s | İş Modası",
  },
  description:
    "Ekibiniz için iş kıyafetleri ve koruyucu ekipman. İş Modası ürün kataloğunu inceleyin, kurumsal ihtiyaçlarınız için bizimle iletişime geçin.",
  icons: { icon: "/images/brand/icon.png" },
};
export default function RootLayout({ children }: ChildrenProps) {
  return (
    <html lang="tr" className={barlow.variable} data-scroll-behavior="smooth">
      <body>
        <a className="skip-link" href="#main">
          İçeriğe geç
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
