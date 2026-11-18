"use client";

import { Button } from "../button";
import { Tag } from "../tag";
import styles from "./EarnPoints.module.css";

export type EarnPointsItem = {
  id: string;
  /** Activity name, e.g. "Arrive and check in". */
  title: string;
  /** Points line, e.g. "+100 points". */
  points: string;
  /** Completed activities show a DONE tag instead of the SCAN button. */
  done?: boolean;
};

export type EarnPointsProps = {
  items: EarnPointsItem[];
  /** Called with the item id when the user taps SCAN. */
  onScan?: (id: string) => void;
  /** Copy. Defaults match the Figma design; override for i18n. */
  labels?: { title?: string; scan?: string; done?: string };
  className?: string;
};

const defaultLabels = { title: "Earn points", scan: "Scan", done: "Done" };

/**
 * List of event activities. Pending items have a SCAN button, completed ones a DONE tag.
 * Figma: Events - Shangai, node 35:65 ("Suma puntos", states Antes / Despues).
 *
 * SCAN is the ADL Button (Secondary) and DONE is the ADL Tag (Membership, bold), so it follows ADL
 * and does not change with the theme. Figma still draws both by hand: swap them for ADL instances.
 */
export function EarnPoints({ items, onScan, labels, className }: EarnPointsProps) {
  const l = { ...defaultLabels, ...labels };

  return (
    <section className={[styles.card, className].filter(Boolean).join(" ")} aria-label={l.title}>
      <h2 className={`${styles.title} ss-text-headline-s`}>{l.title}</h2>
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={item.id} className={styles.row}>
            <div className={styles.text}>
              <p className={`${styles.name} ss-text-body-m`}>{item.title}</p>
              <p className={`${styles.points} ss-text-body-s`}>{item.points}</p>
            </div>
            {item.done ? (
              <Tag type="membership" bold>
                {l.done}
              </Tag>
            ) : (
              <Button
                variant="secondary"
                icon={false}
                onClick={() => onScan?.(item.id)}
              >
                {l.scan}
              </Button>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}
