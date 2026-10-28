import { useId } from "react";
import type { HeroBrandProps } from "./Hero.types";
import styles from "./Hero.module.css";

export default function HeroBrand({ back = false }: HeroBrandProps) {
  const threadId = useId();
  return (
    <div
      className={back ? styles.backBrand : styles.frontBrand}
      {...(back ? { "data-brand-back": "" } : { "data-brand-front": "" })}
    >
      <span className={styles.brandGuide} data-guide />
      <div className={styles.brandReveal} data-brand-reveal>
        <svg
          viewBox="0 0 500 110"
          className={styles.brandLetters}
          aria-hidden="true"
        >
          <defs>
            <pattern
              id={threadId}
              width="4"
              height="4"
              patternUnits="userSpaceOnUse"
            >
              <path
                d="M0 1.5H4"
                stroke="#202725"
                strokeOpacity=".25"
                strokeWidth=".6"
              />
            </pattern>
          </defs>
          <text
            x="250"
            y="75"
            textAnchor="middle"
            className={styles.thread}
            data-thread
          >
            {back ? "FİRMA ADINIZ" : "FİRMA"}
          </text>
          <text
            x="250"
            y="75"
            textAnchor="middle"
            className={styles.brandInk}
            data-ink
          >
            {back ? "FİRMA ADINIZ" : "FİRMA"}
          </text>
          <text
            x="250"
            y="75"
            textAnchor="middle"
            className={styles.brandTexture}
            data-ink
            fill={`url(#${threadId})`}
          >
            {back ? "FİRMA ADINIZ" : "FİRMA"}
          </text>
        </svg>
        <span className={styles.brandSubtitle} data-ink>
          {back ? "EKİBİNİZİN İMZASI" : "LOGONUZ"}
        </span>
      </div>
      <span className={styles.stitchNeedle} data-needle />
    </div>
  );
}
