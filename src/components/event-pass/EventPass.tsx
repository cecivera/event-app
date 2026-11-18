import type { ReactNode } from "react";
import styles from "./EventPass.module.css";

export type EventPassStatus = "valid" | "checked-in";

export type EventPassProps = {
  /** Event title shown in the header. */
  eventName: string;
  /** Attendee name. */
  guestName: string;
  /** Personal code shown under the QR, e.g. "SS-1001". */
  code: string;
  /** Guest type, e.g. "Guest", "VIP", "Press". */
  guestType: string;
  /** Plus-one text, e.g. "Yes (+1)". */
  plusOne: string;
  /** Pass status. Valid before the door, checked-in after staff scan. */
  status: EventPassStatus;
  /** QR image or element. Falls back to a placeholder square. */
  qr?: ReactNode;
  /** Copy. Defaults match the Figma design; override for i18n. */
  labels?: {
    guestType?: string;
    plusOne?: string;
    status?: string;
    valid?: string;
    checkedIn?: string;
  };
  className?: string;
};

const defaultLabels = {
  guestType: "Guest type",
  plusOne: "Plus one",
  status: "Status",
  valid: "Valid",
  checkedIn: "Checked in",
};

/**
 * Attendee pass with QR. The status variant switches Valid and Checked in.
 * Colors come from the theme tokens (data-theme on an ancestor).
 * Figma: Events - Shangai, node 1:160.
 */
export function EventPass({
  eventName,
  guestName,
  code,
  guestType,
  plusOne,
  status,
  qr,
  labels,
  className,
}: EventPassProps) {
  const l = { ...defaultLabels, ...labels };
  const isCheckedIn = status === "checked-in";
  const statusText = isCheckedIn ? l.checkedIn : l.valid;

  return (
    <article
      className={[styles.pass, className].filter(Boolean).join(" ")}
      aria-label={`${eventName}, ${guestName}`}
    >
      <header className={styles.header}>
        <p className={`${styles.eventName} ss-text-body-xs-bold`}>{eventName}</p>
        <h2 className={`${styles.guestName} ss-text-headline-s`}>{guestName}</h2>
      </header>

      <div className={styles.qr}>
        {qr ?? <div className={styles.qrPlaceholder} role="img" aria-label="QR code" />}
        <p className={`${styles.code} ss-text-body-m-bold`}>{code}</p>
      </div>

      <dl className={styles.rows}>
        <div className={styles.row}>
          <dt className={`${styles.rowLabel} ss-text-body-s`}>{l.guestType}</dt>
          <dd className={`${styles.rowValue} ss-text-body-s-bold`} style={{ margin: 0 }}>
            {guestType}
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={`${styles.rowLabel} ss-text-body-s`}>{l.plusOne}</dt>
          <dd className={`${styles.rowValue} ss-text-body-s-bold`} style={{ margin: 0 }}>
            {plusOne}
          </dd>
        </div>
        <div className={styles.row}>
          <dt className={`${styles.rowLabel} ss-text-body-s`}>{l.status}</dt>
          <dd style={{ margin: 0 }}>
            <span
              className={`${styles.chip} ss-text-body-xs-bold ${
                isCheckedIn ? styles.chipCheckedIn : styles.chipValid
              }`}
            >
              {statusText}
            </span>
          </dd>
        </div>
      </dl>
    </article>
  );
}
