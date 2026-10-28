import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  EnvelopeSimple,
} from "@phosphor-icons/react/dist/ssr";
import { phoneHref, emailHref } from "@/lib/site";
export default function Footer() {
  return (
    <>
      <section className="contact-band">
        <div className="container contact-band-inner">
          <div>
            <span className="section-label">KURUMSAL TALEPLERİNİZ İÇİN</span>
            <h2>Ekibinizi birlikte giydirelim.</h2>
            <p>Ürün seçimi ve ihtiyaçlarınız hakkında konuşalım.</p>
          </div>
          <Link className="button button-dark" href="/iletisim">
            Bizimle iletişime geçin
          </Link>
        </div>
      </section>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-grid">
            <div>
              <Link className="brand" href="/">
                <Image src="/images/logo.png" width={44} height={42} alt="" />
                <span>
                  iş modası
                  <span className="brand-descriptor">KURUMSAL İŞ GİYİM</span>
                </span>
              </Link>
              <p>
                İşinize uygun kıyafetler.
                <br />
                Ekibinize yakışan bir görünüm.
              </p>
            </div>
            <div>
              <h3>Koleksiyonu keşfedin</h3>
              <Link href="/urunler">Tüm ürünler</Link>
              <Link href="/kategori/is-montu">İş montları</Link>
              <Link href="/kategori/ikaz-yelegi">İkaz yelekleri</Link>
              <Link href="/kategori/likrali-is-pantolonlari">
                İş pantolonları
              </Link>
            </div>
            <div>
              <h3>Birlikte çalışalım</h3>
              <a href={phoneHref}>
                <Phone size={17} />
                0536 080 1845
              </a>
              <a href={emailHref}>
                <EnvelopeSimple size={17} />
                info@ismodasi.com
              </a>
              <Link href="/iletisim">
                İletişim
              </Link>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} İş Modası</span>
            <span>Kurumsal iş kıyafetleri & koruyucu ekipman</span>
          </div>
        </div>
      </footer>
    </>
  );
}
