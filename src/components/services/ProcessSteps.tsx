"use client";

import { useRef } from "react";
import { m, useScroll, useTransform, type MotionValue } from "motion/react";
import { fadeUp, staggerChildren, viewport } from "@/lib/motion";
import { sceneOffset, stagger } from "@/lib/scroll";
import { features } from "@/config/features";
import { useLatched } from "@/components/motion/ScrollScene";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
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
 *
 * Bars grow with the scroll where motion is allowed — the one scroll-linked
 * sequence that also runs on phones, since it is only five transforms.
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

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: sceneOffset as unknown as ["start 85%", "start 35%"],
  });
  const progress = useLatched(scrollYProgress);
  const orbitDraw = useTransform(progress, [0.45, 0.85], [0, 1], { clamp: true });

  return (
    <m.div
      ref={ref}
      variants={staggerChildren(0, 0)}
      initial={scrollLinked ? undefined : "hidden"}
      whileInView={scrollLinked ? undefined : "visible"}
      viewport={viewport}
    >
      <div className="relative h-36 border-b border-navy/28 sm:h-44 lg:h-[220px]">
        {/* Orbit first so the bars paint over it */}
        {orbit && (
          <Orbit
            variant="process"
            controlled={!scrollLinked}
            progress={scrollLinked ? orbitDraw : undefined}
            delay={ORBIT_DELAY}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
          />
        )}
        <ArchitecturalBars
          heights={HEIGHTS}
          accentIndex={HEIGHTS.length - 1}
          step={RISE_STEP}
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
            <m.li
              key={step.title}
              variants={fadeUp}
              custom={(orbit ? TEXT_DELAY : ORBIT_DELAY) + i * 0.1}
              data-motion
            >
              <StepBody index={i} step={step} />
            </m.li>
          ),
        )}
      </ol>
    </m.div>
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
  // Stage text follows the orbit and is finished by ~0.93, so a fast scroll
  // never leaves it mid-fade.
  const range = stagger(index, 0.07, 0.22);
  const shifted: [number, number] = [0.5 + range[0], Math.min(0.5 + range[1], 1)];
  const opacity = useTransform(progress, shifted, [0, 1], { clamp: true });
  const y = useTransform(progress, shifted, [12, 0], { clamp: true });

  return (
    <m.li data-motion style={{ opacity, y }}>
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
