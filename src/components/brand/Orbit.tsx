"use client";

import { motion } from "motion/react";
import { lineDraw, viewport } from "@/lib/motion";

/*
 * Simplified orbit paths inspired by the logo's gold ring — never a trace of it.
 * Approved locations only: hero divider, Signature section, approach/process.
 * The SVG stretches horizontally; give it a CSS height close to the viewBox
 * height so the stroke stays about 1.5px thick.
 */
const paths = {
  // Wide, low sweep rising to the right: the hero divider.
  divider: { viewBox: "0 0 1440 160", d: "M-40 150 C 360 132, 900 70, 1480 8" },
  // Shorter arc carrying the eye from the showcase to the headline.
  signature: { viewBox: "0 0 600 120", d: "M0 108 C 160 104, 380 74, 600 10" },
  // Passes through the rising bars, like the ring through the mark.
  process: { viewBox: "0 0 800 220", d: "M-10 200 C 240 190, 520 120, 810 18" },
} as const;

type OrbitProps = {
  variant: keyof typeof paths;
  className?: string;
  delay?: number;
  /** Drives the draw from a parent's variant state instead of its own viewport trigger. */
  controlled?: boolean;
};

export function Orbit({ variant, className, delay = 0, controlled = false }: OrbitProps) {
  const { viewBox, d } = paths[variant];
  const trigger = controlled ? {} : { initial: "hidden", whileInView: "visible", viewport };

  return (
    <motion.svg
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
      {...trigger}
    >
      <motion.path
        d={d}
        fill="none"
        stroke="var(--color-gold)"
        strokeWidth={1.5}
        strokeLinecap="round"
        variants={lineDraw}
        custom={delay}
        data-motion
      />
    </motion.svg>
  );
}
