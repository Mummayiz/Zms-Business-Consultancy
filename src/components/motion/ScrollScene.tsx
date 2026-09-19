"use client";

import { useRef, type ReactNode, type RefObject } from "react";
import {
  useMotionValue,
  useMotionValueEvent,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { sceneOffset } from "@/lib/scroll";

/**
 * Progress of a section through the viewport, 0 → 1 (see `sceneOffset`).
 * Returns a ref to attach to the section and its progress value.
 */
export function useSceneProgress<T extends HTMLElement = HTMLDivElement>(): {
  ref: RefObject<T | null>;
  progress: MotionValue<number>;
} {
  const ref = useRef<T>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: sceneOffset as unknown as ["start 85%", "start 35%"],
  });
  return { ref, progress: scrollYProgress };
}

/**
 * A progress value that only ever moves forwards.
 *
 * Scroll-linked values reverse by nature; the brief asks for sequences that
 * play once. This holds each sequence at its furthest point, so scrolling back
 * up leaves the section built rather than replaying it.
 */
export function useLatched(source: MotionValue<number>): MotionValue<number> {
  const latched = useMotionValue(source.get());

  useMotionValueEvent(source, "change", (value) => {
    if (value > latched.get()) latched.set(value);
  });

  return latched;
}

/** Latched progress mapped into a range, clamped at both ends. */
export function useScenePart(
  progress: MotionValue<number>,
  input: [number, number],
  output: [number, number],
) {
  return useTransform(progress, input, output, { clamp: true });
}

/** Wraps a section, giving its children a latched scroll progress value. */
export function ScrollScene({
  children,
  className,
  as: Tag = "div",
}: {
  children: (progress: MotionValue<number>) => ReactNode;
  className?: string;
  as?: "div" | "section";
}) {
  const { ref, progress } = useSceneProgress<HTMLDivElement>();
  const latched = useLatched(progress);

  return (
    <Tag ref={ref} className={className}>
      {children(latched)}
    </Tag>
  );
}
