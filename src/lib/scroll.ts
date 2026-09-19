/*
 * Scroll and pointer tokens for the depth layer.
 * Travel distances are in pixels, mirroring the plane table in the concept:
 * the deeper the plane, the less it moves.
 */

/** Vertical travel over the hero's scroll-out, desktop. */
export const parallaxDesktop = {
  photo: 12,
  glow: -24,
  lines: 40,
  depth: 60,
} as const;

/** Reduced travel for phones; scroll only, never pointer. */
export const parallaxMobile = {
  photo: 6,
  glow: -10,
  lines: 16,
  depth: 24,
} as const;

/** Horizontal counter-shift in response to the pointer, desktop only. */
export const pointerShift = {
  photo: 3,
  glow: 5,
  lines: 8,
  depth: 12,
} as const;

/** Hero progress: 0 at rest, 1 when the hero has scrolled fully out. */
export const heroOffset = ["start start", "end start"] as const;

/**
 * Section progress: 0 as the section's top reaches 85% of the viewport,
 * 1 by the time it reaches 35% — so a sequence is finished well before the
 * section sits in the middle of the screen, even on a fast scroll.
 */
export const sceneOffset = ["start 85%", "start 35%"] as const;

/** Spring used to smooth pointer tracking. */
export const pointerSpring = { stiffness: 55, damping: 22, mass: 0.6 } as const;

/** Sub-range for the nth item in a staggered scroll sequence. */
export function stagger(index: number, step = 0.12, length = 0.55): [number, number] {
  const start = index * step;
  return [start, Math.min(start + length, 1)];
}
