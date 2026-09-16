import type { CSSProperties } from "react";
import type { Transition, Variants } from "motion/react";

/*
 * Motion tokens — the single source for timing across the site.
 * Motion variants below and the hero's CSS keyframes (via `heroMotionVars`)
 * both read from these values.
 * Language: build · rise · travel · connect · progress. Nothing bounces or spins.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  hover: 0.2,
  base: 0.55,
  rise: 0.7,
  draw: 1.4,
  background: 1.4,
} as const;

/** Maximum vertical travel for reveals, in px (brief: ≤16px). */
export const travel = 12;

export const stagger = 0.08;

export const viewport = { once: true, margin: "0px 0px -12% 0px" } as const;

/**
 * Variants accept an optional delay through Motion's `custom` prop.
 * The delay is only set when given, so a parent's stagger timing still applies.
 */
const timed = (t: Transition, delay?: number): Transition => (delay ? { ...t, delay } : t);

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: travel },
  visible: (delay?: number) => ({
    opacity: 1,
    y: 0,
    transition: timed({ duration: duration.base, ease }, delay),
  }),
};

/** Controlled mask reveal, rising from the bottom edge. */
export const reveal: Variants = {
  hidden: { clipPath: "inset(100% 0% 0% 0%)" },
  visible: (delay?: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    transition: timed({ duration: duration.rise, ease }, delay),
  }),
};

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 1.04 },
  visible: (delay?: number) => ({
    opacity: 1,
    scale: 1,
    transition: timed({ duration: duration.rise, ease }, delay),
  }),
};

/** Vertical growth for architectural bars. Pair with `transformOrigin: "bottom"`. */
export const architecturalRise: Variants = {
  hidden: { scaleY: 0 },
  visible: (delay?: number) => ({
    scaleY: 1,
    transition: timed({ duration: duration.rise, ease }, delay),
  }),
};

/** A gold line drawing itself along its path. */
export const lineDraw: Variants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: (delay?: number) => ({
    pathLength: 1,
    opacity: 1,
    transition: {
      pathLength: timed({ duration: duration.draw, ease }, delay),
      opacity: timed({ duration: 0.2 }, delay),
    },
  }),
};

export function staggerChildren(delayChildren = 0, each: number = stagger): Variants {
  return {
    hidden: {},
    visible: { transition: { delayChildren, staggerChildren: each } },
  };
}

/** CSS custom properties that let the hero's keyframes share these tokens. */
export const heroMotionVars = {
  "--motion-ease": `cubic-bezier(${ease.join(", ")})`,
  "--motion-base": `${duration.base}s`,
  "--motion-rise": `${duration.rise}s`,
  "--motion-bg": `${duration.background}s`,
  "--motion-stagger": `${stagger}s`,
  "--motion-travel": `${travel}px`,
} as CSSProperties;
