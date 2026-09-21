"use client";

import { useTransform, type MotionValue } from "motion/react";

/*
 * Helpers for scroll-linked sequences.
 *
 * Note on refs: `useScroll({ target })` measures its element on mount, so the
 * ref must be attached to a real DOM element on every render — including any
 * fallback branch — or Motion throws "Target ref is defined but not hydrated".
 * Each scene therefore owns its own ref and attaches it unconditionally; this
 * module deliberately does not hand out refs for callers to attach.
 *
 * Sequences scrub in both directions: scrolling back up plays them in reverse.
 * (An earlier version latched progress so each sequence played once; that made
 * the motion invisible on the way back, so it was removed.)
 */

/** Scroll progress mapped into a range, clamped at both ends. */
export function useScenePart(
  progress: MotionValue<number>,
  input: [number, number],
  output: [number, number],
) {
  return useTransform(progress, input, output, { clamp: true });
}
