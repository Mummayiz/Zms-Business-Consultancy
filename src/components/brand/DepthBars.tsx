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
  /** Depth in px; further back means more of the parallax swing. */
  z: number;
  tone: "navy" | "gold";
  opacity: number;
  /** Seconds, so each bar drifts out of step with the others. */
  delay: number;
};

/*
 * Twelve forms in two groups, flanking the headline and stepping back into the
 * frame. They read as architecture rather than texture, so they sit either side
 * of the text column rather than over the lattice (0–26%) or towers (72–100%).
 */
const BARS: Bar[] = [
  { left: 4, height: 40, width: 26, z: -520, tone: "navy", opacity: 0.18, delay: -25 },
  { left: 12, height: 58, width: 34, z: -420, tone: "navy", opacity: 0.2, delay: -11 },
  { left: 20, height: 34, width: 20, z: -300, tone: "gold", opacity: 0.22, delay: -17 },
  { left: 25, height: 72, width: 30, z: -200, tone: "navy", opacity: 0.24, delay: -4 },
  { left: 32, height: 46, width: 18, z: -120, tone: "navy", opacity: 0.2, delay: -21 },
  { left: 38, height: 26, width: 14, z: -60, tone: "gold", opacity: 0.18, delay: -8 },
  { left: 59, height: 30, width: 16, z: -70, tone: "gold", opacity: 0.18, delay: -14 },
  { left: 64, height: 52, width: 22, z: -150, tone: "navy", opacity: 0.22, delay: -2 },
  { left: 70, height: 78, width: 34, z: -260, tone: "navy", opacity: 0.26, delay: -19 },
  { left: 78, height: 42, width: 20, z: -360, tone: "gold", opacity: 0.2, delay: -6 },
  { left: 85, height: 64, width: 30, z: -460, tone: "navy", opacity: 0.22, delay: -23 },
  { left: 93, height: 36, width: 24, z: -560, tone: "navy", opacity: 0.18, delay: -13 },
];

export function DepthBars({
  pointerX,
  pointerY,
  scrollY,
}: {
  pointerX: MotionValue<number>;
  pointerY: MotionValue<number>;
  /** Parallax travel for the foreground plane. */
  scrollY: MotionValue<number>;
}) {
  const rotateY = useTransform(pointerX, [-0.5, 0.5], [8, -8]);
  const rotateX = useTransform(pointerY, [-0.5, 0.5], [-5, 5]);

  return (
    <m.div
      aria-hidden
      data-motion
      className="pointer-events-none absolute inset-0 overflow-hidden"
      style={{ perspective: 1000, perspectiveOrigin: "50% 45%", y: scrollY }}
    >
      <m.div className="absolute inset-0" style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}>
        {BARS.map((bar) => (
          <span
            key={`${bar.left}-${bar.z}`}
            className={`depth-bar absolute bottom-[10%] ${bar.tone === "gold" ? "bg-gold" : "bg-navy"}`}
            style={{
              left: `${bar.left}%`,
              width: bar.width,
              height: `${bar.height}%`,
              opacity: bar.opacity,
              transform: `translateZ(${bar.z}px)`,
              animationDelay: `${bar.delay}s`,
              clipPath: "polygon(0 0, 100% 18px, 100% 100%, 0 100%)",
            }}
          />
        ))}
      </m.div>
    </m.div>
  );
}
