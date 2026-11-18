import styles from "./PointsCard.module.css";

export type PointsCardProps = {
  /** adiClub points balance (primary number). */
  points: number;
  /** Points earned at this event. */
  eventPoints: number;
  /** Raffle entries earned so far. */
  raffleEntries: number;
  /** Progress toward the next raffle entry, 0 to 100. */
  progress: number;
  /** Points still needed for the next entry. Drives the supporting message. */
  pointsToNextEntry: number;
  /** Locale used to format numbers. */
  locale?: string;
  /** Copy. Defaults match the Figma design; override for i18n or singular/plural. */
  labels?: {
    balance?: string;
    eventPoints?: string;
    raffleEntries?: string;
    nextEntry?: (pointsToNextEntry: string) => string;
  };
  className?: string;
};

const defaultLabels = {
  balance: "adiClub points",
  eventPoints: "event points",
  raffleEntries: "raffle entries",
  nextEntry: (n: string) => `${n} points to your next entry`,
};

/**
 * Summary of an attendee's adiClub balance, event points, raffle entries and
 * progress to the next entry. Presentational only (no call to action).
 *
 * Theme (Default / Stan Smith) comes from the nearest `data-theme` ancestor.
 * Figma: Events - Shangai, node 1:161.
 */
export function PointsCard({
  points,
  eventPoints,
  raffleEntries,
  progress,
  pointsToNextEntry,
  locale = "en-US",
  labels,
  className,
}: PointsCardProps) {
  const l = { ...defaultLabels, ...labels };
  const fmt = (n: number) => n.toLocaleString(locale);
  const pct = Math.min(100, Math.max(0, progress));
  const message = l.nextEntry(fmt(pointsToNextEntry));

  return (
    <section
      className={[styles.card, className].filter(Boolean).join(" ")}
      aria-label={l.balance}
    >
      <p className={`${styles.label} ss-text-body-s`}>{l.balance}</p>
      <p className={styles.balance}>{fmt(points)}</p>

      <div className={styles.stats}>
        <div className={styles.stat}>
          <p className={`${styles.statValue} ss-text-headline-s`}>{fmt(eventPoints)}</p>
          <p className={`${styles.statLabel} ss-text-body-xs`}>{l.eventPoints}</p>
        </div>
        <div className={styles.stat}>
          <p className={`${styles.statValue} ss-text-headline-s`}>{fmt(raffleEntries)}</p>
          <p className={`${styles.statLabel} ss-text-body-xs`}>{l.raffleEntries}</p>
        </div>
      </div>

      <div
        className={styles.track}
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(pct)}
        aria-valuetext={message}
      >
        <div className={styles.fill} style={{ width: `${pct}%` }} />
      </div>

      <p className={`${styles.message} ss-text-body-xs`}>{message}</p>
    </section>
  );
}
