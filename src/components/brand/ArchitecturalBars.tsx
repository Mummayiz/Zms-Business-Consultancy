"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { stagger } from "@/lib/scroll";

type ArchitecturalBarsProps = {
  /** Bar heights as a percentage of the container, left to right. */
  heights: number[];
  /** Index of the bar rendered in gold; all others are navy. */
  accentIndex?: number;
  className?: string;
  barClassName?: string;
  /** "light" = navy bars for ivory surfaces; "navy" = low-contrast ivory bars on navy. */
  tone?: "light" | "navy";
  /** Scroll progress; without it the bars render at full height, unanimated. */
  progress?: MotionValue<number>;
};

/**
 * Slim vertical bars with a slanted top, taken from the proportions of the ZMS mark.
 *
 * They grow with scroll progress and shrink again on the way back up. Without a
 * progress value — reduced motion, or scenes switched off — they simply stand at
 * full height; there is no one-shot rise that could latch.
 */
export function ArchitecturalBars({
  heights,
  accentIndex,
  className = "",
  barClassName = "",
  tone = "light",
  progress,
}: ArchitecturalBarsProps) {
  const baseColour = tone === "navy" ? "bg-ivory/16" : "bg-navy";

  return (
    <div className={className} aria-hidden>
      {heights.map((h, i) => (
        <div key={i} className="flex h-full items-end">
          {progress ? (
            <ScrollBar
              progress={progress}
              index={i}
              height={h}
              className={barClassName}
              colour={i === accentIndex ? "bg-gold" : baseColour}
            />
          ) : (
            <div className={barClassName} style={{ height: `${h}%` }}>
              <Slant colour={i === accentIndex ? "bg-gold" : baseColour} />
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

/** One bar, growing from the baseline in step with the scroll. */
function ScrollBar({
  progress,
  index,
  height,
  className,
  colour,
}: {
  progress: MotionValue<number>;
  index: number;
  height: number;
  className: string;
  colour: string;
}) {
  // One bar at a time, each taking its time: the whole run lands by ~0.6.
  const scaleY = useTransform(progress, stagger(index, 0.12, 0.26), [0, 1], { clamp: true });

  return (
    <m.div data-motion className={className} style={{ height: `${height}%`, transformOrigin: "bottom", scaleY }}>
      <Slant colour={colour} />
    </m.div>
  );
}

/** Slanted top lives on an inner element so motion overrides never remove it. */
function Slant({ colour }: { colour: string }) {
  return (
    <div
      className={`h-full w-full [--slant:9px] lg:[--slant:16px] ${colour}`}
      style={{ clipPath: "polygon(0 0, 100% var(--slant), 100% 100%, 0 100%)" }}
    />
  );
}
