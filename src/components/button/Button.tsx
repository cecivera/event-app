"use client";

import type { MouseEventHandler, ReactNode } from "react";
import styles from "./Button.module.css";

export type ButtonProps = {
  children: ReactNode;
  /** ADL "Type": Primary, Secondary or Membership. */
  variant?: "primary" | "secondary" | "membership";
  /** ADL "On dark": inverse colors for dark backgrounds. */
  onDark?: boolean;
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
 * Not implemented yet: the offset "Outerbox" drop shadow (the Figma prop dropShadow) and the
 * original ADL arrow asset. The arrow is a stand-in until the SVG can be exported from Figma.
 */
export function Button({
  children,
  variant = "primary",
  onDark = false,
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
    onDark ? styles.onDark : "",
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
          <path d="M8 16h16M18 10l6 6-6 6" fill="none" stroke="currentColor" strokeWidth="2" />
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
