import Image from "next/image";
import HeroBrand from "./HeroBrand";
import type { HeroModelProps } from "./Hero.types";
import styles from "./Hero.module.css";

export default function HeroModel({ model }: HeroModelProps) {
  const isPolo = model === "polo";
  const imagePrefix = isPolo ? "polo-worn-male" : "fleece-worn-charcoal";

  return (
    <div
      className={`${styles.modelFrame}${isPolo ? ` ${styles.poloModel}` : ""}`}
      data-model={model}
    >
      <div className={styles.face} data-front aria-hidden="true">
        <Image
          src={`/images/hero/${imagePrefix}-front-transparent.webp`}
          alt=""
          fill
          sizes="(max-width: 767px) 55vw, 30vw"
          loading="eager"
          fetchPriority={isPolo ? "auto" : "high"}
        />
        <HeroBrand />
      </div>
      <div
        className={`${styles.face} ${styles.backFace}`}
        data-back
        aria-hidden="true"
      >
        <Image
          src={`/images/hero/${imagePrefix}-back-transparent.webp`}
          alt=""
          fill
          sizes="(max-width: 767px) 55vw, 30vw"
          loading="eager"
        />
        <HeroBrand back />
      </div>
      <span className={styles.turnLine} data-turn-line aria-hidden="true" />
    </div>
  );
}
