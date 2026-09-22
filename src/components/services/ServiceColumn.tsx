"use client";

import { useRef, type ReactNode } from "react";
import { m, useTransform, type MotionStyle } from "motion/react";
import { features } from "@/config/features";
import { stagger } from "@/lib/scroll";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { useScrub } from "@/components/motion/useScrub";

/**
 * One service column. The top rule extends left to right with the scroll and
 * the content steps in behind it, each column slightly after the last, and the
 * whole thing runs in reverse on the way back up.
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
  const { motion: motionOn } = useSceneMotion();
  const scrollLinked = features.scrollScenes && motionOn;

  const progress = useScrub(ref);

  // A column at a time: rule extends, then its content steps in behind it.
  const ruleRange = stagger(index, 0.18, 0.34);
  const contentRange: [number, number] = [
    Math.min(ruleRange[0] + 0.12, 1),
    Math.min(ruleRange[1] + 0.2, 1),
  ];

  const ruleScale = useTransform(progress, ruleRange, [0, 1], { clamp: true });
  // Transform only, never opacity — see the note in Reveal's useScrubStyle.
  const y = useTransform(progress, contentRange, [56, 0], { clamp: true });

  return (
    <div ref={ref} className={className}>
      {scrollLinked ? (
        <m.div
          className="h-full"
          data-motion
          style={{ "--rule-scale": ruleScale, y } as unknown as MotionStyle}
        >
          {children}
        </m.div>
      ) : (
        <div className="h-full">{children}</div>
      )}
    </div>
  );
}
