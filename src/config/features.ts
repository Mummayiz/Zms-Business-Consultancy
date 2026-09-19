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
 */
export const features = {
  /** Multi-plane parallax in the hero (photo, glow, hairlines, foreground bars). */
  heroParallax: true,
  /** Scroll-linked build sequences for services, signature and the process bars. */
  scrollScenes: true,
  /** CSS 3D architectural bars behind the hero headline. */
  depthLayer: true,
  /** Gold sheen that follows the pointer across navy surfaces. */
  pointerLight: true,
  /** Fine noise texture over navy surfaces. */
  grain: true,
  /** Gold highlight sweeping across buttons on hover. */
  buttonSheen: true,
} as const;
