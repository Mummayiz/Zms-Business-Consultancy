"use client";

import { useMotionValue, useMotionValueEvent, useTransform, type MotionValue } from "motion/react";

/*
 * Helpers for scroll-linked sequences.
 *
 * Note on refs: `useScroll({ target })` measures its element on mount, so the
 * ref must be attached to a real DOM element on every render — including any
 * fallback branch — or Motion throws "Target ref is defined but not hydrated".
 * Each scene therefore owns its own ref and attaches it unconditionally; this
 * module deliberately does not hand out refs for callers to attach.
 */

/**
 * A progress value that only ever moves forwards.
 *
 * Scroll-linked values reverse by nature; the brief asks for sequences that
 * play once. This holds each sequence at its furthest point, so scrolling back
 * up leaves the section built rather than replaying it.
 */
export function useLatched(source: MotionValue<number>): MotionValue<number> {
  const latched = useMotionValue(source.get());

  useMotionValueEvent(source, "change", (value) => {
    if (value > latched.get()) latched.set(value);
  });

  return latched;
}

/** Latched progress mapped into a range, clamped at both ends. */
export function useScenePart(
  progress: MotionValue<number>,
  input: [number, number],
  output: [number, number],
) {
  return useTransform(progress, input, output, { clamp: true });
}
