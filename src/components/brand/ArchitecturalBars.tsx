"use client";

import { m } from "motion/react";
import { architecturalRise } from "@/lib/motion";

type ArchitecturalBarsProps = {
  /** Bar heights as a percentage of the container, left to right. */
  heights: number[];
  /** Index of the bar rendered in gold; all others are navy. */
  accentIndex?: number;
  /** Seconds between each bar starting to rise. */
  step?: number;
  className?: string;
  barClassName?: string;
  /** "light" = navy bars for ivory surfaces; "navy" = low-contrast ivory bars on navy. */
  tone?: "light" | "navy";
};

/**
 * Slim vertical bars with a slanted top, taken from the proportions of the ZMS mark.
 * Rises when its parent motion element switches to the "visible" variant.
 */
export function ArchitecturalBars({
  heights,
  accentIndex,
  step = 0.14,
  className = "",
  barClassName = "",
  tone = "light",
}: ArchitecturalBarsProps) {
  const baseColour = tone === "navy" ? "bg-ivory/16" : "bg-navy";
  return (
    <div className={className} aria-hidden>
      {heights.map((h, i) => (
        <div key={i} className="flex h-full items-end">
          <m.div
            variants={architecturalRise}
            custom={i * step}
            data-motion
            className={barClassName}
            style={{ height: `${h}%`, transformOrigin: "bottom" }}
          >
            {/* Slanted top lives on an inner element so motion overrides never remove it */}
            <div
              className={`h-full w-full [--slant:9px] lg:[--slant:16px] ${i === accentIndex ? "bg-gold" : baseColour}`}
              style={{ clipPath: "polygon(0 0, 100% var(--slant), 100% 100%, 0 100%)" }}
            />
          </m.div>
        </div>
      ))}
    </div>
  );
}
