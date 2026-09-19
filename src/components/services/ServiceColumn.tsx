"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, type MotionStyle } from "motion/react";
import { features } from "@/config/features";
import { sceneOffset, stagger } from "@/lib/scroll";
import { useLatched } from "@/components/motion/ScrollScene";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * One service column. On desktop the top rule extends left to right with the
 * scroll and the content steps in behind it, each column slightly after the
 * last. Elsewhere it falls back to the standard one-shot reveal.
 *
 * The rule scale travels to the card as a CSS variable, so ServiceCard stays a
 * server component.
 */
export function ServiceColumn({
  index,
  className,
  children,
}: {
  index: number;
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { pointer } = useSceneMotion();
  const scrollLinked = features.scrollScenes && pointer;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: sceneOffset as unknown as ["start 85%", "start 35%"],
  });
  const progress = useLatched(scrollYProgress);

  const ruleRange = stagger(index, 0.1, 0.4);
  const contentRange: [number, number] = [
    Math.min(ruleRange[0] + 0.15, 1),
    Math.min(ruleRange[1] + 0.25, 1),
  ];

  const ruleScale = useTransform(progress, ruleRange, [0, 1], { clamp: true });
  const opacity = useTransform(progress, contentRange, [0, 1], { clamp: true });
  const y = useTransform(progress, contentRange, [12, 0], { clamp: true });

  if (!scrollLinked) {
    return (
      <Reveal delay={index * 0.12} className={className}>
        {children}
      </Reveal>
    );
  }

  return (
    <m.div
      ref={ref}
      className={className}
      data-motion
      // Motion writes the rule scale into a CSS variable the card reads.
      style={{ "--rule-scale": ruleScale, opacity, y } as unknown as MotionStyle}
    >
      {children}
    </m.div>
  );
}
