"use client";

import type { MouseEventHandler, ReactNode } from "react";
import styles from "./ButtonIcon.module.css";

export type ButtonIconProps = {
  /** Accessible name. The button has no visible text, so this is required. */
  label: string;
  /** ADL "Size": Large 48, Medium 40 or Small 32. */
  size?: "large" | "medium" | "small";
  /** ADL "Type": Primary, Secondary or Ghost. */
  variant?: "primary" | "secondary" | "ghost";
  /** A 32px icon drawn with currentColor. Defaults to the ADL arrow (Navigation/arrow-long-forward). */
  children?: ReactNode;
  /** Renders a link instead of a button. */
  href?: string;
  onClick?: MouseEventHandler<HTMLElement>;
  type?: "button" | "submit";
  className?: string;
};

/**
 * [Global] ButtonIcon from the adidas Global Library (node 27434:2350).
 * Sizes 48 / 40 / 32 with a 32px icon centered. States: Enabled and Hover (native CSS).
 * Outerbox shadow only on Primary Large, like the Figma variants.
 */
export function ButtonIcon({
  label,
  size = "large",
  variant = "primary",
  children,
  href,
  onClick,
  type = "button",
  className,
}: ButtonIconProps) {
  const classes = [styles.button, styles[size], styles[variant], className].filter(Boolean).join(" ");
  const icon = children ?? (
    <svg viewBox="0 0 32 32" width="32" height="32" aria-hidden="true" focusable="false">
      <path
        transform="translate(4 20.7071) rotate(-90)"
        fill="currentColor"
        d="M5.35355 0 L5.35355 22.2929 L9 18.6464 L9.70711 19.3536 L4.85355 24.2071 L0 19.3536 L0.707107 18.6464 L4.35355 22.2929 L4.35355 0 L5.35355 0 Z"
      />
    </svg>
  );

  if (href) {
    return (
      <a className={classes} href={href} aria-label={label} onClick={onClick}>
        {icon}
      </a>
    );
  }

  return (
    <button type={type} className={classes} aria-label={label} onClick={onClick}>
      {icon}
    </button>
  );
}
