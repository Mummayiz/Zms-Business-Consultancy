/*
 * Scroll tokens for the deck's scroll-linked sequences.
 *
 * The hero parallax planes and pointer-shift tokens were removed with the deck
 * rebuild: the hero is a video now. They remain in git history (commit
 * 7018980) if that direction is ever revisited.
 */

/** Spring used to smooth pointer tracking on navy surfaces. */
export const pointerSpring = { stiffness: 55, damping: 22, mass: 0.6 } as const;

/**
 * Section progress: 0 as the section's top enters the bottom of the viewport,
 * 1 by the time it reaches 70% of the way up.
 *
 * The window deliberately closes early. Sequences scrub both ways, so a
 * section that is on screen while the page is at rest must already be fully
 * built — otherwise its text sits half-faded, which fails contrast.
 */
export const sceneOffset = ["start 100%", "start 70%"] as const;

/** Sub-range for the nth item in a staggered scroll sequence. */
export function stagger(index: number, step = 0.18, length = 0.5): [number, number] {
  const start = index * step;
  return [start, Math.min(start + length, 1)];
}
