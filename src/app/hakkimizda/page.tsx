import Image from "next/image";
import Link from "next/link";
import { ChatsCircle, TShirt, ListChecks } from "@phosphor-icons/react/dist/ssr";
import Breadcrumbs from "@/components/Breadcrumbs/Breadcrumbs";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "Hakkımızda",
  "İş Modası’nı tanıyın. İş kıyafetleri, kurumsal iş giyim ve koruyucu ekipman ihtiyaçlarınızı birlikte değerlendirelim.",
  "/hakkimizda",
);

export default function AboutPage() {
  return (
    <div className="container about-page">
      <Breadcrumbs items={[{ label: "Hakkımızda" }]} />
      <section className="about-intro" aria-labelledby="about-title">
        <Image
          className="about-backdrop"
          src="/images/about/workwear-background.webp"
          alt=""
          fill
          sizes="(max-width: 767px) 100vw, 90vw"
          loading="eager"
        />
        <div className="about-copy">
          <span className="section-label">İŞ MODASI HAKKINDA</span>
          <h1 id="about-title">
            İşinize uygun.
            <br />
            Ekibinize ait.
          </h1>
          <p className="about-lead">
            İş kıyafeti, bir ekibin ortak kimliğinin parçasıdır. İş Modası’nda
            çalışma alanınıza ve ekibinizin ihtiyaçlarına uygun ürünleri bir
            araya getiriyoruz.
          </p>
          <Link href="/urunler" className="button button-dark">
            Koleksiyonu keşfedin
          </Link>
        </div>
      </section>

      <section className="about-story" aria-labelledby="about-approach">
        <span className="section-label">Yaklaşımımız</span>
        <h2 id="about-approach">Her işin, her ekibin ihtiyacı farklı.</h2>
        <div className="about-story-copy">
          <p>
            Mont ve polarlardan pantolonlara, yeleklerden koruyucu ekipmanlara
            uzanan koleksiyonumuzla farklı çalışma alanları için seçenekler
            sunuyoruz. Ürün seçimini; kullanım alanı, model ve kurumsal
            ihtiyaçlarınız üzerinden birlikte değerlendiriyoruz.
          </p>
          <p>
            Ekibiniz için ürün ararken ilgili modelleri inceleyebilir, adet ve
            ürün detayları için doğrudan bizimle iletişime geçebilirsiniz. Logo
            ve firma adı uygulamalarına ilişkin taleplerinizi de bizimle
            paylaşabilirsiniz.
          </p>
        </div>
      </section>

      <section className="about-principles" aria-label="Nasıl çalışıyoruz?">
        <div>
          <ChatsCircle size={32} weight="light" aria-hidden="true" />
          <h3>İhtiyacınızı anlayalım.</h3>
          <p>
            Çalışma alanınızı, aradığınız ürünleri ve ihtiyaç duyduğunuz adedi
            paylaşın.
          </p>
        </div>
        <div>
          <TShirt size={32} weight="light" aria-hidden="true" />
          <h3>Uygun seçenekleri değerlendirelim.</h3>
          <p>
            Koleksiyondaki modelleri ekibinizin kullanımına ve kurumsal
            beklentilerinize göre birlikte ele alalım.
          </p>
        </div>
        <div>
          <ListChecks size={32} weight="light" aria-hidden="true" />
          <h3>Detayları birlikte netleştirelim.</h3>
          <p>
            Ürün, beden, adet ve kişiselleştirme sorularınızı telefon veya
            e-posta üzerinden konuşalım.
          </p>
        </div>
      </section>
    </div>
  );
}
