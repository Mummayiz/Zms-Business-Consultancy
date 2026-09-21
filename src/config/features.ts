/**
 * Motion and depth layer switches.
 *
 * Each item can be turned off on its own without touching the others — set a
 * flag to `false` and that layer stops rendering entirely (no dead markup, no
 * listeners, no bundle cost beyond the unused component).
 *
 * All of these are additionally disabled at runtime when the visitor prefers
 * reduced motion, and the pointer-driven ones only run on hover-capable
 * desktop pointers.
 *
 * `heroParallax` and `depthLayer` were retired with the deck rebuild — the
 * hero video replaces them. See commit 7018980 for that work.
 */
export const features = {
  /** Scroll-linked build sequences for the deck slides and the process bars. */
  scrollScenes: true,
  /** Gold sheen that follows the pointer across navy surfaces. */
  pointerLight: true,
  /** Fine noise texture over navy surfaces. */
  grain: true,
  /** Gold highlight sweeping across buttons on hover. */
  buttonSheen: true,
} as const;
