import {
  EnvelopeSimple,
  Phone,
} from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";
import Image from "next/image";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import ContactForm from "@/components/ContactForm/ContactForm";
import { pageMetadata } from "@/lib/metadata";
import { phoneHref, emailHref } from "@/lib/site";
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
        <div className="contact-photo">
          <Image
            src="/images/contact/workwear-consultation.webp"
            alt="Kumaş örnekleri ve iş kıyafetleri üzerinden birlikte seçim yapan iki kişinin elleri"
            fill
            loading="eager"
            sizes="(max-width: 700px) 100vw, 50vw"
          />
        </div>
      </div>
      <section className="contact-inquiry" aria-label="İletişim ve talep formu">
        <div className="contact-methods">
          <span className="section-label">DOĞRUDAN ULAŞIN</span>
          <h2>İlk adımı birlikte atalım.</h2>
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
            Ürün seçimi, adet ve kurumsal uygulama ihtiyaçlarınız hakkında
            konuşmak için bizi arayabilir veya formu doldurabilirsiniz.
          </p>
        </div>
        <ContactForm />
      </section>
    </div>
  );
}
