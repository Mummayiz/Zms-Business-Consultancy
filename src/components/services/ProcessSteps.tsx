"use client";

import { useRef } from "react";
import { m, useTransform, type MotionValue } from "motion/react";
import { stagger } from "@/lib/scroll";
import { features } from "@/config/features";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { useScrub } from "@/components/motion/useScrub";
import { ArchitecturalBars } from "@/components/brand/ArchitecturalBars";
import { Orbit } from "@/components/brand/Orbit";

export type ProcessStep = { title: string; text: string };

const HEIGHTS = [34, 54, 76, 98];

/**
 * Four rising architectural bars (last in gold) connected by the orbit,
 * followed by the stage descriptions. Not a horizontal timeline.
 *
 * The whole sequence is scroll-linked and scrubs both ways: bars grow, the
 * curve traces through them, then the stage text follows, and scrolling back up
 * runs it in reverse. It runs on phones too — it is only a handful of
 * transforms, and the scene window closes early enough (see `useScrub`) that
 * the text is never left mid-fade where it can be read.
 */
export function ProcessSteps({
  steps,
  orbit = true,
}: {
  steps: ProcessStep[];
  /** The orbit is approved only for Home "How we work" and /approach. */
  orbit?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion: motionOn } = useSceneMotion();
  const scrollLinked = features.scrollScenes && motionOn;

  const progress = useScrub(ref);
  // Bars finish, then the curve traces through them.
  const orbitDraw = useTransform(progress, [0.55, 0.85], [0, 1], { clamp: true });

  return (
    <div ref={ref}>
      <div className="relative h-36 border-b border-navy/28 sm:h-44 lg:h-[220px]">
        {/* Orbit first so the bars paint over it */}
        {orbit && (
          <Orbit
            variant="process"
            progress={scrollLinked ? orbitDraw : undefined}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
        )}
        <ArchitecturalBars
          heights={HEIGHTS}
          accentIndex={HEIGHTS.length - 1}
          progress={scrollLinked ? progress : undefined}
          className="relative z-10 grid h-full grid-cols-4 gap-6 lg:gap-8"
          barClassName="w-8 sm:w-10 lg:w-12"
        />
      </div>

      <ol className="mt-8 grid gap-x-6 gap-y-8 sm:grid-cols-2 lg:mt-10 lg:grid-cols-4 lg:gap-x-8">
        {steps.map((step, i) =>
          scrollLinked ? (
            <ScrollStep key={step.title} progress={progress} index={i} step={step} />
          ) : (
            <li key={step.title}>
              <StepBody index={i} step={step} />
            </li>
          ),
        )}
      </ol>
    </div>
  );
}

function ScrollStep({
  progress,
  index,
  step,
}: {
  progress: MotionValue<number>;
  index: number;
  step: ProcessStep;
}) {
  // Stage text follows the curve, one stage at a time, finished by ~0.97.
  const range = stagger(index, 0.08, 0.22);
  const shifted: [number, number] = [0.66 + range[0], Math.min(0.66 + range[1], 1)];
  // Transform only, never opacity — see the note in Reveal's useScrubStyle.
  const y = useTransform(progress, shifted, [40, 0], { clamp: true });

  return (
    <m.li data-motion style={{ y }}>
      <StepBody index={index} step={step} />
    </m.li>
  );
}

function StepBody({ index, step }: { index: number; step: ProcessStep }) {
  return (
    <>
      <span className="type-label text-charcoal">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="type-card mt-3">{step.title}</h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed">{step.text}</p>
    </>
  );
}
