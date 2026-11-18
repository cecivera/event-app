"use client";

import styles from "./EventBanner.module.css";

export type EventBannerProps = {
  /** Headline under the image. */
  title: string;
  /** Supporting line. */
  description: string;
  /** Call-to-action label. */
  ctaLabel: string;
  /** Makes the CTA a link. Without it the CTA is a button driven by onCtaClick. */
  ctaHref?: string;
  onCtaClick?: () => void;
  /** Event image. Without it, a branded placeholder shows `wordmark`. */
  imageSrc?: string;
  imageAlt?: string;
  /** Text on the placeholder when there is no image. */
  wordmark?: string;
  className?: string;
};

/**
 * Event banner for the Earn points and Connect accounts screens.
 * Placeholder background uses the theme's accent-strong token.
 * Figma: Events - Shangai, node 1:174.
 */
export function EventBanner({
  title,
  description,
  ctaLabel,
  ctaHref,
  onCtaClick,
  imageSrc,
  imageAlt = "",
  wordmark = "STAN SMITH",
  className,
}: EventBannerProps) {
  const cta = (
    <>
      <span className="ss-text-body-m-bold">{ctaLabel}</span>
      <span className={`${styles.arrow} ss-text-body-m-bold`} aria-hidden="true">
        →
      </span>
    </>
  );

  return (
    <article className={[styles.banner, className].filter(Boolean).join(" ")}>
      <div className={styles.image}>
        {imageSrc ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={imageSrc} alt={imageAlt} />
        ) : (
          <p className={styles.wordmark}>{wordmark}</p>
        )}
      </div>
      <div className={styles.body}>
        <h2 className={`${styles.title} ss-text-headline-s-mobile`}>{title}</h2>
        <p className={`${styles.description} ss-text-body-s`}>{description}</p>
        {ctaHref ? (
          <a className={styles.cta} href={ctaHref}>
            {cta}
          </a>
        ) : (
          <button type="button" className={styles.cta} onClick={onCtaClick}>
            {cta}
          </button>
        )}
      </div>
    </article>
  );
}
