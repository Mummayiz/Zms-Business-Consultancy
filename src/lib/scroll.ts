/*
 * Scroll and pointer tokens for the depth layer.
 *
 * These deliberately exceed the master brief's restraint caps (§30's ≤16px and
 * "no excessive parallax"): the Motion & Depth Upgrade supersedes them, because
 * at brief-level values the depth read as nothing at all. The deeper the plane,
 * the less it moves.
 */

/** Vertical travel over the hero's scroll-out, desktop. */
export const parallaxDesktop = {
  photo: 40,
  glow: -70,
  lines: 120,
  depth: 180,
} as const;

/** Phones: scroll only, never pointer, but still clearly moving. */
export const parallaxMobile = {
  photo: 20,
  glow: -34,
  lines: 58,
  depth: 88,
} as const;

/** Horizontal counter-shift in response to the pointer, desktop only. */
export const pointerShift = {
  photo: 10,
  glow: 16,
  lines: 22,
  depth: 30,
} as const;

/** Hero progress: 0 at rest, 1 when the hero has scrolled fully out. */
export const heroOffset = ["start start", "end start"] as const;

/**
 * Section progress: 0 as the section's top enters the bottom of the viewport,
 * 1 by the time it reaches 70% of the way up.
 *
 * The window deliberately closes early. Sequences scrub both ways, so a
 * section that is on screen while the page is at rest must already be fully
 * built — otherwise its text sits half-faded, which fails contrast. That is
 * exactly what happened on /services, where the grid sits high on the page.
 */
export const sceneOffset = ["start 100%", "start 70%"] as const;

/** Spring used to smooth pointer tracking. */
export const pointerSpring = { stiffness: 55, damping: 22, mass: 0.6 } as const;

/** Sub-range for the nth item in a staggered scroll sequence. */
export function stagger(index: number, step = 0.18, length = 0.5): [number, number] {
  const start = index * step;
  return [start, Math.min(start + length, 1)];
}
