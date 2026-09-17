"use client";

import { m } from "motion/react";
import { fadeUp, staggerChildren, viewport } from "@/lib/motion";
import { ArchitecturalBars } from "@/components/brand/ArchitecturalBars";
import { Orbit } from "@/components/brand/Orbit";

export type ProcessStep = { title: string; text: string };

const HEIGHTS = [34, 54, 76, 98];
const RISE_STEP = 0.14;
// Orbit starts once the last bar is most of the way up; text follows the orbit.
const ORBIT_DELAY = HEIGHTS.length * RISE_STEP + 0.25;
const TEXT_DELAY = ORBIT_DELAY + 0.35;

/**
 * Four rising architectural bars (last in gold) connected by the orbit,
 * followed by the stage descriptions. Not a horizontal timeline.
 */
export function ProcessSteps({
  steps,
  orbit = true,
}: {
  steps: ProcessStep[];
  /** The orbit is approved only for Home "How we work" and /approach. */
  orbit?: boolean;
}) {
  return (
    <m.div
      variants={staggerChildren(0, 0)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      <div className="relative h-36 border-b border-navy/28 sm:h-44 lg:h-[220px]">
        {/* Orbit first so the bars paint over it */}
        {orbit && (
          <Orbit
            variant="process"
            controlled
            delay={ORBIT_DELAY}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
        )}
        <ArchitecturalBars
          heights={HEIGHTS}
          accentIndex={HEIGHTS.length - 1}
          step={RISE_STEP}
          className="relative z-10 grid h-full grid-cols-4 gap-6 lg:gap-8"
          barClassName="w-8 sm:w-10 lg:w-12"
        />
      </div>

      <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-8">
        {steps.map((step, i) => (
          <m.li
            key={step.title}
            variants={fadeUp}
            custom={(orbit ? TEXT_DELAY : ORBIT_DELAY) + i * 0.1}
            data-motion
          >
            <span className="type-label text-charcoal">{String(i + 1).padStart(2, "0")}</span>
            <h3 className="type-card mt-3">{step.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed">{step.text}</p>
          </m.li>
        ))}
      </ol>
    </m.div>
  );
}
