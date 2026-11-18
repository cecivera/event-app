import type { ReactNode } from "react";
import styles from "./Tag.module.css";

export type TagProps = {
  children: ReactNode;
  /** ADL "Type". Subtle has no on-dark version in ADL. */
  type?: "default" | "subtle" | "membership";
  /** ADL "Bold". */
  bold?: boolean;
  /** ADL "On dark". */
  onDark?: boolean;
  /** Optional 20px icon before or after the label (ADL "Icon=Leading / Trailing"). */
  iconLeading?: ReactNode;
  iconTrailing?: ReactNode;
  className?: string;
};

/**
 * [Global] Tag from the adidas Global Library (node 629:3351).
 * A label that shows a category or status. Height 28, no radius, body-s 14/20.
 */
export function Tag({
  children,
  type = "default",
  bold = false,
  onDark = false,
  iconLeading,
  iconTrailing,
  className,
}: TagProps) {
  const classes = [styles.tag, styles[type], bold ? styles.bold : "", onDark ? styles.onDark : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      {iconLeading && <span className={styles.icon}>{iconLeading}</span>}
      <span className={styles.label}>{children}</span>
      {iconTrailing && <span className={styles.icon}>{iconTrailing}</span>}
    </span>
  );
}
