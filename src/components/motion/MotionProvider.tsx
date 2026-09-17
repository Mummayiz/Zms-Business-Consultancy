"use client";

import { LazyMotion, MotionConfig } from "motion/react";
import type { ReactNode } from "react";

const loadFeatures = () => import("./features").then((mod) => mod.default);

/**
 * Respects prefers-reduced-motion for transforms. Opacity, clip and path
 * animations are also neutralised in CSS (see `[data-motion]` in globals.css)
 * so reduced-motion users get instant, final states.
 *
 * `strict` forbids the full `motion.*` components, which would pull the whole
 * library into the initial bundle. Use `m.*` from "motion/react" instead.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <LazyMotion features={loadFeatures} strict>
        {children}
      </LazyMotion>
    </MotionConfig>
  );
}
