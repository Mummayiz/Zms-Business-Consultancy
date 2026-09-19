"use client";

import { useRef, type ReactNode } from "react";
import { m, useScroll, useTransform } from "motion/react";
import { features } from "@/config/features";
import { sceneOffset } from "@/lib/scroll";
import { useLatched } from "@/components/motion/ScrollScene";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { Orbit } from "@/components/brand/Orbit";

/**
 * Signature section depth: the showcase image travels slower than the text as
 * the section passes, and the orbit draws between them on scroll.
 * Desktop only — on phones the section keeps its one-shot reveals.
 */
export function SignatureScene({
  image,
  textTop,
  textBottom,
  orbitClassName,
}: {
  image: ReactNode;
  /** Label and headline — the orbit is drawn directly beneath these. */
  textTop: ReactNode;
  /** Intro and pillars, below the orbit. */
  textBottom: ReactNode;
  orbitClassName: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { pointer } = useSceneMotion();
  const scrollLinked = features.scrollScenes && pointer;

  // Section travel, not hero travel: measured across the whole section pass.
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], [18, -18]);
  const textY = useTransform(scrollYProgress, [0, 1], [42, -42]);

  const { scrollYProgress: sceneProgress } = useScroll({
    target: ref,
    offset: sceneOffset as unknown as ["start 85%", "start 35%"],
  });
  const orbitDraw = useLatched(useTransform(sceneProgress, [0.15, 0.8], [0, 1], { clamp: true }));

  const orbit = (
    <Orbit
      variant="signature"
      delay={0.3}
      progress={scrollLinked ? orbitDraw : undefined}
      className={orbitClassName}
    />
  );

  const column = (
    <>
      {textTop}
      {orbit}
      {textBottom}
    </>
  );

  if (!scrollLinked) {
    return (
      <div ref={ref} className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-6">{image}</div>
        <div className="lg:col-span-5 lg:col-start-8">{column}</div>
      </div>
    );
  }

  return (
    <div ref={ref} className="wrap grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
      <m.div data-motion style={{ y: imageY }} className="lg:col-span-6">
        {image}
      </m.div>
      <m.div data-motion style={{ y: textY }} className="lg:col-span-5 lg:col-start-8">
        {column}
      </m.div>
    </div>
  );
}
