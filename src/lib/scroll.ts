/*
 * Scroll tokens for the deck's scroll-linked sequences.
 *
 * The hero parallax planes and pointer-shift tokens were removed with the deck
 * rebuild: the hero is a video now. They remain in git history (commit
 * 7018980) if that direction is ever revisited.
 */

/** Spring used to smooth pointer tracking on navy surfaces. */
export const pointerSpring = { stiffness: 55, damping: 22, mass: 0.6 } as const;

/*
 * The section window itself lives in `useScrub`, expressed against the live
 * bounding box rather than as a Motion `offset` pair. The offset form cached
 * the element's document position on mount, which went stale whenever the
 * layout settled afterwards.
 */

/** Sub-range for the nth item in a staggered scroll sequence. */
export function stagger(index: number, step = 0.18, length = 0.5): [number, number] {
  const start = index * step;
  return [start, Math.min(start + length, 1)];
}
