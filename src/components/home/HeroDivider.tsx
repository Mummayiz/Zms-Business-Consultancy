"use client";

import { useScroll, useTransform } from "motion/react";
import { features } from "@/config/features";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { Orbit } from "@/components/brand/Orbit";

/**
 * The hero's gold divider. It draws itself as the visitor scrolls out of the
 * hero rather than on load, and holds its finished state afterwards.
 *
 * Progress comes from the page scroll rather than this element: the divider
 * sits at the very bottom of the hero, so measuring its own box would mean the
 * draw never started until the hero had already left.
 */
export function HeroDivider() {
  const { motion: motionOn } = useSceneMotion();
  const { scrollY } = useScroll();

  // Fully drawn after scrolling half a viewport, and it un-draws on the way back.
  const progress = useTransform(scrollY, (value) => {
    const span = typeof window === "undefined" ? 400 : window.innerHeight * 0.5;
    return Math.min(Math.max(value / span, 0), 1);
  });

  const scrollLinked = features.scrollScenes && motionOn;

  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-4 lg:bottom-6">
      <Orbit
        variant="divider"
        delay={0.9}
        progress={scrollLinked ? progress : undefined}
        className="h-[100px] w-full lg:h-[160px]"
      />
    </div>
  );
}
