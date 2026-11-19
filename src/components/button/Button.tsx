"use client";

import type { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  children: ReactNode;
  /** ADL "Type": Primary, Secondary or Membership. */
  variant?: "primary" | "secondary" | "membership";
  /** ADL "Full width": stretches to the container. */
  fullWidth?: boolean;
  /** ADL "State=Disabled". Not available for Secondary in ADL, it reuses the disabled look here. */
  disabled?: boolean;
  /** ADL "State=Loading": shows the text loader instead of the label. */
  loading?: boolean;
  /** Trailing 32px arrow. ADL always shows it, hide it only in tight layouts. */
  icon?: boolean;
  /** Renders a link instead of a button. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  className?: string;
};

/**
 * [Global] Button from the adidas Global Library (node 614:5356).
 * Hover is native CSS. Min height 48, min width 80, label body-m bold.
 *
 * Outerbox shadow and the arrow (Navigation/arrow-long, 32px) are copied from Figma.
 */
export function Button({
  children,
  variant = "primary",
  fullWidth = false,
  disabled = false,
  loading = false,
  icon = true,
  href,
  onClick,
  type = "button",
  className,
}: ButtonProps) {
  const inactive = disabled || loading;
  const classes = [
    styles.button,
    styles[variant],
    fullWidth ? styles.fullWidth : "",
    inactive ? styles.inactive : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = loading ? (
    <span className={styles.loader} role="status">
      Loading...
      <span className={styles.loaderBar} aria-hidden="true" />
    </span>
  ) : (
    <>
      <span className={styles.label}>{children}</span>
      {icon && (
        <svg className={styles.icon} viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
          <path transform="translate(4 20.7071) rotate(-90)" fill="currentColor" d="M5.35355 0 L5.35355 22.2929 L9 18.6464 L9.70711 19.3536 L4.85355 24.2071 L0 19.3536 L0.707107 18.6464 L4.35355 22.2929 L4.35355 0 L5.35355 0 Z" />
        </svg>
      )}
    </>
  );

  if (href && !inactive) {
    return (
      <a className={classes} href={href} onClick={onClick}>
        {content}
      </a>
    );
  }

  return (
    <button
      type={type}
      className={classes}
      disabled={inactive}
      aria-busy={loading || undefined}
      onClick={onClick}
    >
      {content}
    </button>
  );
}
