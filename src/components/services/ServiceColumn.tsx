"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform, type MotionStyle } from "motion/react";
import { features } from "@/config/features";
import { sceneOffset, stagger } from "@/lib/scroll";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { Reveal } from "@/components/motion/Reveal";

/**
 * One service column. On desktop the top rule extends left to right with the
 * scroll and the content steps in behind it, each column slightly after the
 * last. Elsewhere it falls back to the standard one-shot reveal.
 *
 * The rule scale travels to the card as a CSS variable, so ServiceCard stays a
 * server component.
 *
 * The outer element always carries the scroll ref, in both branches: useScroll
 * measures its target on mount, and `useSceneMotion` only settles afterwards,
 * so a ref attached in just one branch would never be hydrated.
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
    offset: sceneOffset as unknown as ["start 100%", "start 70%"],
  });
  const progress = scrollYProgress;

  // A column at a time: rule extends, then its content steps in behind it.
  const ruleRange = stagger(index, 0.18, 0.34);
  const contentRange: [number, number] = [
    Math.min(ruleRange[0] + 0.12, 1),
    Math.min(ruleRange[1] + 0.2, 1),
  ];

  const ruleScale = useTransform(progress, ruleRange, [0, 1], { clamp: true });
  const opacity = useTransform(progress, contentRange, [0, 1], { clamp: true });
  const y = useTransform(progress, contentRange, [56, 0], { clamp: true });

  return (
    <div ref={ref} className={className}>
      {scrollLinked ? (
        <m.div
          className="h-full"
          data-motion
          style={{ "--rule-scale": ruleScale, opacity, y } as unknown as MotionStyle}
        >
          {children}
        </m.div>
      ) : (
        <Reveal delay={index * 0.12} className="h-full">
          {children}
        </Reveal>
      )}
    </div>
  );
}
