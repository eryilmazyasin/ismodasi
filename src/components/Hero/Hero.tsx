"use client";

import Image from "next/image";
import Link from "next/link";
import { useLayoutEffect, useRef, useState } from "react";
import { ArrowDown, ArrowRight, ArrowUpRight } from "@phosphor-icons/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HeroBrand from "./HeroBrand";
import type { HeroNavigation } from "./Hero.types";
import styles from "./Hero.module.css";

const steps = [
  { title: "Ürününüz", detail: "İşinize uygun modeller.", target: 0.12 },
  { title: "Logonuz", detail: "Göğüste sizin imzanız.", target: 0.49 },
  { title: "Firma adınız", detail: "Her açıdan sizin.", target: 1 },
];

export default function Hero() {
  const root = useRef<HTMLElement>(null);
  const navigate = useRef<HeroNavigation>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (!root.current) return;
    const element = root.current;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    const select = gsap.utils.selector(element);
    let disposed = false;

    media.add(
      {
        always: "all",
        motion:
          "(prefers-reduced-motion: no-preference) and ((min-height: 700px) or (max-width: 767px))",
        mobile: "(max-width: 767px)",
      },
      (context) => {
        const mobile = Boolean(context.conditions?.mobile);
        // Phones use the stage buttons so the story does not trap a long scroll.
        // Scroll scrubbing is restored on phones; the buttons remain shortcuts.
        const animated = Boolean(context.conditions?.motion);
        const sticky = element.querySelector<HTMLElement>(`.${styles.sticky}`)!;
        const buttons =
          element.querySelectorAll<HTMLButtonElement>("[data-step]");
        let lastPhase = -1;

        function updatePhase(progress: number) {
          const phase =
            progress < 0.22 ? 0 : progress < 0.56 ? 1 : progress < 0.81 ? 2 : 3;
          if (phase === lastPhase) return;
          lastPhase = phase;
          element.dataset.phase = String(phase);
          element
            .querySelectorAll<HTMLElement>("[data-caption]")
            .forEach((caption, index) => {
              caption.setAttribute("aria-hidden", String(index !== phase));
            });
          buttons.forEach((button, index) => {
            if (index === Math.min(phase, 2))
              button.setAttribute("aria-current", "step");
            else button.removeAttribute("aria-current");
          });
        }

        // Every material layer uses the same photograph and registration, so the
        // fleece texture and seams stay fixed while its color and yoke change.
        // The yoke now follows the unchanged body color. Only branding and
        // front/back presentation animate; both photos show the same blue fleece.
        gsap.set(
          select(
            "[data-back], [data-guide], [data-callout], [data-ink], [data-needle], [data-turn-guide], [data-turn-line]",
          ),
          { opacity: 0 },
        );
        gsap.set(select("[data-front]"), {
          opacity: 1,
          rotationY: 0,
          xPercent: 0,
          clipPath: "inset(0 0 0 0)",
        });
        gsap.set(select("[data-back]"), {
          rotationY: 0,
          xPercent: 0,
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.set(select("[data-thread]"), { strokeDashoffset: 180 });
        gsap.set(select("[data-brand-reveal]"), {
          clipPath: "inset(0 100% 0 0)",
        });
        gsap.set(select("[data-needle]"), { x: 0 });
        gsap.set(select("[data-turn-ring]"), { rotation: 0 });
        gsap.set(select("[data-turn-line]"), { x: 0 });

        const timeline = gsap.timeline({
          paused: !animated,
          defaults: { ease: "none" },
          onUpdate: () => updatePhase(timeline.progress()),
          ...(animated
            ? {
                scrollTrigger: {
                  id: "hero-customization",
                  trigger: element,
                  // Let the mobile copy scroll away before holding the full model
                  // in view, including on screens shorter than the hero content.
                  start: () =>
                    `top ${mobile ? Math.min(12, window.innerHeight - sticky.offsetHeight - 12) : 24}px`,
                  onRefreshInit: () => {
                    if (mobile)
                      gsap.set(sticky, {
                        top: Math.min(12, window.innerHeight - sticky.offsetHeight - 12),
                      });
                  },
                  end: () =>
                    `+=${Math.max(1, element.offsetHeight - sticky.offsetHeight)}`,
                  scrub: 0.35,
                  invalidateOnRefresh: true,
                },
              }
            : {}),
        });

        const frontBrand =
          element.querySelector<HTMLElement>("[data-brand-front]")!;
        const backBrand =
          element.querySelector<HTMLElement>("[data-brand-back]")!;
        // Reuse the story's scroll progress; the decorative layer never moves
        // the headline or adds a second scroll listener.
        if (animated)
          timeline.fromTo(
            select("[data-hero-texture]"),
            { y: mobile ? -12 : -28 },
            { y: mobile ? 12 : 28, duration: 1 },
            0,
          );
        timeline
          .to(
            select("[data-brand-front] [data-guide], [data-front-callout]"),
            { opacity: 1, duration: 0.06 },
            0.22,
          )
          .to(
            select("[data-brand-front] [data-brand-reveal]"),
            { clipPath: "inset(0 0% 0 0)", duration: 0.17 },
            0.24,
          )
          .to(
            select("[data-brand-front] [data-thread]"),
            { strokeDashoffset: 0, duration: 0.17 },
            0.24,
          )
          .set(select("[data-brand-front] [data-needle]"), { opacity: 1 }, 0.24)
          .to(
            select("[data-brand-front] [data-needle]"),
            { x: () => frontBrand.clientWidth, duration: 0.17 },
            0.24,
          )
          .to(
            select("[data-brand-front] [data-ink]"),
            { opacity: 1, duration: 0.06 },
            0.36,
          )
          .to(
            select(
              "[data-brand-front] [data-guide], [data-brand-front] [data-needle]",
            ),
            { opacity: 0, duration: 0.04 },
            0.42,
          )
          .to(
            select("[data-front-callout]"),
            { opacity: 0, duration: 0.05 },
            0.51,
          )
          .to(select("[data-turn-guide]"), { opacity: 1, duration: 0.05 }, 0.54)
          // The scan reveals the reverse view without squeezing or stretching
          // the photographed person into an artificial side profile.
          .set(select("[data-back], [data-turn-line]"), { opacity: 1 }, 0.56)
          .to(
            select("[data-front]"),
            { clipPath: "inset(0 0 0 100%)", duration: 0.24 },
            0.56,
          )
          .to(
            select("[data-back]"),
            { clipPath: "inset(0 0% 0 0)", duration: 0.24 },
            0.56,
          )
          .to(
            select("[data-turn-line]"),
            {
              x: () =>
                element.querySelector<HTMLElement>(`.${styles.modelFrame}`)!
                  .clientWidth,
              duration: 0.24,
            },
            0.56,
          )
          .set(select("[data-front]"), { opacity: 0 }, 0.8)
          .to(select("[data-turn-line]"), { opacity: 0, duration: 0.03 }, 0.8)
          .to(
            select("[data-turn-ring]"),
            { rotation: 180, duration: 0.24 },
            0.56,
          )
          .to(select("[data-turn-guide]"), { opacity: 0, duration: 0.05 }, 0.81)
          .to(
            select("[data-brand-back] [data-guide], [data-back-callout]"),
            { opacity: 1, duration: 0.04 },
            0.81,
          )
          .set(select("[data-brand-back] [data-needle]"), { opacity: 1 }, 0.83)
          .to(
            select("[data-brand-back] [data-brand-reveal]"),
            { clipPath: "inset(0 0% 0 0)", duration: 0.12 },
            0.83,
          )
          .to(
            select("[data-brand-back] [data-thread]"),
            { strokeDashoffset: 0, duration: 0.12 },
            0.83,
          )
          .to(
            select("[data-brand-back] [data-needle]"),
            { x: () => backBrand.clientWidth, duration: 0.12 },
            0.83,
          )
          .to(
            select("[data-brand-back] [data-ink]"),
            { opacity: 1, duration: 0.05 },
            0.91,
          )
          .to(
            select(
              "[data-brand-back] [data-guide], [data-brand-back] [data-needle]",
            ),
            { opacity: 0, duration: 0.04 },
            0.96,
          );

        element.dataset.enhanced = "true";
        updatePhase(0);
        if (!animated) timeline.progress(mobile ? steps[0].target : 1);

        // CSS owns the sticky geometry; ScrollTrigger only scrubs the inner
        // layers. This avoids pin spacers jumping when mobile browser bars resize.
        navigate.current = (step) => {
          const progress = steps[step].target;
          if (animated && timeline.scrollTrigger) {
            const trigger = timeline.scrollTrigger;
            window.scrollTo({
              top: trigger.start + (trigger.end - trigger.start) * progress,
              behavior: "smooth",
            });
          } else timeline.progress(progress);
        };
        return () => {
          navigate.current = null;
        };
      },
      element,
    );
    setReady(true);

    // Font metrics can settle after hydration. Refresh only our measurements,
    // and ignore the promise if the user has already navigated away.
    document.fonts.ready.then(() => {
      if (!disposed) ScrollTrigger.refresh();
    });
    return () => {
      disposed = true;
      media.revert();
      navigate.current = null;
      delete element.dataset.enhanced;
      delete element.dataset.phase;
    };
  }, []);

  return (
    <section
      ref={root}
      className={styles.experience}
      aria-label="İş kıyafetinin ekibinize özel dönüşümü"
      data-phase="0"
    >
      <noscript>
        <style>{`.${styles.experience}{height:auto!important}.${styles.sticky}{position:relative!important}`}</style>
      </noscript>
      <div className={styles.sticky}>
        <div className={styles.atmosphere} aria-hidden="true">
          <div className={styles.fabricTexture} data-hero-texture>
            <Image
              src="/images/hero/workwear-texture.webp"
              alt=""
              fill
              sizes="(max-width: 767px) 100vw, 75vw"
            />
          </div>
        </div>
        <div className={styles.layout}>
          <div className={styles.copy}>
            <span className={styles.eyebrow}>İŞ GİYİMİNDE SİZİN İMZANIZ</span>
            <h1>
              <span className={styles.headlineIntro}>
                Ekibiniz <br className={styles.mobileBreak} />
                ilk bakışta
              </span>
              <span className={styles.headlineHighlight}>
                <span className={styles.headlineWord}>fark</span>{" "}
                <span className={styles.headlineRest}>edilsin.</span>
              </span>
            </h1>
            <p>
              Logonuz göğüste, firma adınız sırtta. Her detayda ekibinizin
              kimliği.
            </p>
            <div className={styles.actions}>
              <Link href="/iletisim" className="button button-dark">
                Ekibinize özel teklif alın
              </Link>
              <Link href="#katalog" className={styles.catalogLink}>
                Koleksiyonu keşfedin <ArrowRight size={16} />
              </Link>
            </div>
            <ol className={styles.steps} aria-label="Kişiselleştirme aşamaları">
              {steps.map((step, index) => (
                <li key={step.title}>
                  <button
                    type="button"
                    data-step={index}
                    disabled={!ready}
                    onClick={() => navigate.current?.(index)}
                  >
                    <span className={styles.stepNumber}>0{index + 1}</span>
                    <span>
                      <strong>{step.title}</strong>
                      <small>{step.detail}</small>
                    </span>
                    <span className={styles.stepLine} />
                  </button>
                </li>
              ))}
            </ol>
          </div>
          <figure
            className={styles.stage}
            aria-label="Aynı füme poların önüne temsili logo, sırtına firma adı işlenir. Kişiselleştirme aşamalarında ön ve sırt görünümünü keşfedin."
          >
            <div className={styles.stageTop}>
              <span>EKİBİNİZE ÖZEL İŞ GİYİM.</span>
              <span>İş Modası</span>
            </div>
            <div className={styles.modelFrame}>
              <div className={styles.face} data-front aria-hidden="true">
                <Image
                  src="/images/hero/fleece-worn-charcoal-front-transparent.webp"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 68vw, 35vw"
                  loading="eager"
                  fetchPriority="high"
                />
                <HeroBrand />
              </div>
              <div
                className={`${styles.face} ${styles.backFace}`}
                data-back
                aria-hidden="true"
              >
                <Image
                  src="/images/hero/fleece-worn-charcoal-back-transparent.webp"
                  alt=""
                  fill
                  sizes="(max-width: 767px) 68vw, 35vw"
                  loading="eager"
                />
                <HeroBrand back />
              </div>
              <span
                className={styles.turnLine}
                data-turn-line
                aria-hidden="true"
              />
            </div>
            <div
              className={styles.callout}
              data-callout
              data-front-callout
              aria-hidden="true"
            >
              <span>GÖĞÜS</span>
              <strong>Logo işlemesi</strong>
              <i />
            </div>
            <div
              className={`${styles.callout} ${styles.backCallout}`}
              data-callout
              data-back-callout
              aria-hidden="true"
            >
              <span>SIRT</span>
              <strong>Firma adı</strong>
              <i />
            </div>
            <div
              className={styles.turnGuide}
              data-turn-guide
              aria-hidden="true"
            >
              <span className={styles.turnRing} data-turn-ring />
              <span>180°</span>
            </div>
            <figcaption className={styles.stageBottom}>
              <div className={styles.captionStack}>
                <div data-caption="0" aria-hidden="false">
                  <span className={styles.swatch} />
                  <div>
                    <small>01 / ÜRÜNÜNÜZ</small>
                    <strong>Ekibinize uygun iş giyim.</strong>
                  </div>
                </div>
                <div data-caption="1" aria-hidden="true">
                  <span className={styles.signature}>
                    <ArrowUpRight size={26} />
                  </span>
                  <div>
                    <small>02 / LOGONUZ</small>
                    <strong>İmzanız, ilmek ilmek.</strong>
                  </div>
                </div>
                <div data-caption="2" aria-hidden="true">
                  <span className={styles.signature}>
                    <ArrowUpRight size={26} />
                  </span>
                  <div>
                    <small>ÖNDEN ARKAYA</small>
                    <strong>Aynı ürün. Aynı kimlik.</strong>
                  </div>
                </div>
                <div data-caption="3" aria-hidden="true">
                  <span className={styles.signature}>
                    <ArrowUpRight size={26} />
                  </span>
                  <div>
                    <small>03 / FİRMA ADINIZ</small>
                    <strong>Her açıdan sizin ekibiniz.</strong>
                  </div>
                </div>
              </div>
              <span className={styles.exampleNote}>Temsili işleme</span>
            </figcaption>
          </figure>
        </div>
        <div className={styles.scrollFoot}>
          <span>Önünde logonuz. Arkasında adınız.</span>
          <span className={styles.scrollCue}>
            Dönüşümü keşfedin <ArrowDown size={14} />
          </span>
          <span className={styles.finishCue}>Her açıdan aynı kimlik.</span>
        </div>
      </div>
    </section>
  );
}
