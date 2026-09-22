/*
 * Motion tokens — the single source for timing across the site.
 *
 * The hero's CSS entrance keeps its own copy of these in `:root` (globals.css)
 * rather than receiving them as inline custom properties, so it cannot be
 * broken again by deleting whichever component happened to set them.
 *
 * Language: build · rise · travel · connect · progress. Nothing bounces or spins.
 */

export const ease = [0.22, 1, 0.36, 1] as const;

export const duration = {
  hover: 0.2,
  base: 0.55,
  rise: 0.7,
} as const;

/**
 * Vertical travel for reveals, in px.
 *
 * The master brief caps this at 16px; the Motion & Depth Upgrade raises it,
 * because at 16px a reveal reads as a flicker rather than a build.
 */
export const travel = 48;

export const stagger = 0.08;

/**
 * A reveal's slice of its section's scroll window, derived from the stagger
 * delay it used to be given in seconds.
 *
 * Reveals are scroll-linked rather than triggered, so they scrub both ways:
 * scrolling back up plays them in reverse. Nothing latches.
 *
 * The range has to finish by 1. `useScrub` closes the window while the
 * element's top is still low on the screen, so a reveal that completes at 1 is
 * fully built by the time it is anywhere readable — which is what keeps
 * scroll-linked opacity from leaving text half-faded at rest.
 */
export function scrubRange(delay = 0): [number, number] {
  const from = Math.min(delay * 1.1, 0.35);
  return [from, Math.min(from + 0.65, 1)];
}
