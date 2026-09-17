"use client";

import { m } from "motion/react";
import { useId } from "react";
import { lineDraw, viewport } from "@/lib/motion";

/*
 * Simplified orbit paths inspired by the logo's gold ring — never a trace of it.
 * Approved locations only: hero divider, Signature section, approach/process.
 * The SVG stretches horizontally; give it a CSS height close to the viewBox
 * height so the stroke stays about 1.5px thick.
 */
const paths = {
  /*
   * Hero divider: a shallow, symmetric arc inset from both edges and fading out
   * at each end, so it reads as a drawn segment of the orbit rather than a
   * diagonal line across the page.
   */
  divider: { viewBox: "0 0 1440 160", d: "M300 58 Q 720 120 1140 58", fade: true },
  // Shorter arc carrying the eye from the showcase to the headline.
  signature: { viewBox: "0 0 600 120", d: "M0 108 C 160 104, 380 74, 600 10", fade: false },
  /*
   * Process: starts at the top of bar 01 and ends at the top of bar 04.
   * The viewBox matches the bar grid (4 columns, 800 x 220), so the ends land
   * on the bars at any width. Rendered behind the bars.
   */
  process: { viewBox: "0 0 800 220", d: "M24 146 C 200 134, 400 86, 648 10", fade: false },
} as const;

type OrbitProps = {
  variant: keyof typeof paths;
  className?: string;
  delay?: number;
  /** Drives the draw from a parent's variant state instead of its own viewport trigger. */
  controlled?: boolean;
};

export function Orbit({ variant, className, delay = 0, controlled = false }: OrbitProps) {
  const { viewBox, d, fade } = paths[variant];
  const gradientId = `orbit-fade-${useId()}`;
  const trigger = controlled ? {} : { initial: "hidden", whileInView: "visible", viewport };

  return (
    <m.svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
      {...trigger}
    >
      {fade && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--color-gold)" stopOpacity="1" />
            <stop offset="70%" stopColor="var(--color-gold)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      <m.path
        d={d}
        fill="none"
        stroke={fade ? `url(#${gradientId})` : "var(--color-gold)"}
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={lineDraw}
        custom={delay}
        data-motion
      />
    </m.svg>
  );
}
