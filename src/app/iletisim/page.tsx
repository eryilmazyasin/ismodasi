import {
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { pageMetadata, phoneHref, emailHref } from "@/lib/site";
export const metadata = pageMetadata(
  "İletişim",
  "İş Modası kurumsal iş kıyafeti talepleriniz için 0536 080 1845 ve info@ismodasi.com üzerinden bize ulaşın.",
  "/iletisim",
);
export default function ContactPage() {
  return (
    <div className="container contact-page">
      <Breadcrumbs items={[{ label: "İletişim" }]} />
      <div className="contact-layout">
        <div className="page-heading">
          <span className="section-label">BİRLİKTE ÇALIŞALIM</span>
          <h1>
            Ekibiniz için
            <br />
            konuşalım<span className="accent-period">.</span>
          </h1>
          <p>
            İlgilendiğiniz ürünleri, çalışma alanınızı ve ihtiyaç duyduğunuz
            adedi paylaşın. İş kıyafetlerinizi birlikte planlayalım.
          </p>
          <Link className="text-link" href="/urunler">
            Önce ürünleri keşfedin
          </Link>
        </div>
        <div className="contact-methods">
          <a href={phoneHref}>
            <Phone size={28} />
            <span>
              <small>BİZİ ARAYIN</small>
              <strong>0536 080 1845</strong>
            </span>
          </a>
          <a href={emailHref}>
            <EnvelopeSimple size={28} />
            <span>
              <small>E-POSTA GÖNDERİN</small>
              <strong>info@ismodasi.com</strong>
            </span>
          </a>
          <p>
            E-postanızda firma adınızı ve ilgili ürünü belirtmeniz, ihtiyacınızı
            daha iyi anlamamıza yardımcı olur.
          </p>
        </div>
      </div>
    </div>
  );
}
