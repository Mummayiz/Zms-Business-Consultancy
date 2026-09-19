"use client";

import { m, useTransform, type MotionValue } from "motion/react";

/*
 * Architectural depth layer: slim slanted-top bars from the logo mark, placed
 * at different depths with CSS 3D. Flat colours only — no textures, lighting
 * or post-processing — and it sits behind the hero glow, so the headline is
 * never competing with it.
 *
 * Rendered only where `features.depthLayer` is on, the pointer is fine and
 * motion is allowed; the hero is composed to look complete without it.
 */

type Bar = {
  /** Horizontal position as a percentage of the hero width. */
  left: number;
  /** Height as a percentage of the hero height. */
  height: number;
  width: number;
  /** Depth in px; negative sits further back. */
  z: number;
  tone: "navy" | "gold";
  opacity: number;
  /** Seconds, so each bar drifts out of step with the others. */
  delay: number;
};

/*
 * Placed in the quieter parts of the frame — the hazy band either side of the
 * headline — rather than over the lattice (0–26%) or the towers (72–100%),
 * where they would read as glass slabs laid over photographic detail.
 */
const BARS: Bar[] = [
  { left: 22, height: 44, width: 10, z: -260, tone: "navy", opacity: 0.07, delay: -18 },
  { left: 28, height: 62, width: 14, z: -180, tone: "navy", opacity: 0.09, delay: -6 },
  { left: 34, height: 32, width: 8, z: -120, tone: "gold", opacity: 0.1, delay: -12 },
  { left: 63, height: 54, width: 12, z: -200, tone: "navy", opacity: 0.08, delay: -3 },
  { left: 69, height: 70, width: 16, z: -140, tone: "navy", opacity: 0.1, delay: -21 },
  { left: 76, height: 38, width: 9, z: -90, tone: "gold", opacity: 0.09, delay: -9 },
];

export function DepthBars({ pointerX, pointerY }: { pointerX: MotionValue<number>; pointerY: MotionValue<number> }) {
  // A few degrees of tilt only — the scene breathes, it never swings.
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [3.5, -3.5]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [-2, 2]);

  return (
    <m.div
      aria-hidden
      data-motion
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: 1200, perspectiveOrigin: "50% 45%" }}
    >
      <m.div className="absolute inset-0" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {BARS.map((bar) => (
          <span
            key={`${bar.left}-${bar.z}`}
            className={`depth-bar absolute bottom-[12%] ${bar.tone === "gold" ? "bg-gold" : "bg-navy"}`}
            style={{
              left: `${bar.left}%`,
              width: bar.width,
              height: `${bar.height}%`,
              opacity: bar.opacity,
              transform: `translateZ(${bar.z}px)`,
              animationDelay: `${bar.delay}s`,
              clipPath: "polygon(0 0, 100% 14px, 100% 100%, 0 100%)",
            }}
          />
        ))}
      </m.div>
    </m.div>
  );
}
