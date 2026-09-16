"use client";

import { MotionConfig } from "motion/react";
import type { ReactNode } from "react";

/**
 * Respects prefers-reduced-motion for transforms. Opacity, clip and path
 * animations are also neutralised in CSS (see `[data-motion]` in globals.css)
 * so reduced-motion users get instant, final states.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
