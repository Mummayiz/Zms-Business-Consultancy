"use client";

import Image, { type StaticImageData } from "next/image";
import { m, useScroll, useTransform } from "motion/react";
import { useRef, type CSSProperties } from "react";
import { features } from "@/config/features";
import { heroOffset, parallaxDesktop, parallaxMobile, pointerShift } from "@/lib/scroll";
import { usePointerOffset, useSceneMotion } from "@/components/motion/useSceneMotion";
import { DepthBars } from "@/components/brand/DepthBars";

/*
 * The hero's depth planes.
 *
 * The supplied photograph is a single flat image with no separable layers
 * (see docs/motion-depth.md), so depth comes from moving generated planes at
 * different rates over it: the photo drifts slowest, then the ivory glow,
 * then the architectural hairlines, then the foreground depth bars.
 */

// Thin architectural lines rising at the edges of the grid (md and up).
const lines = [
  { left: "0%", height: "42%" },
  { left: "calc(100% / 12)", height: "60%" },
  { left: "calc(100% * 11 / 12)", height: "64%" },
  { left: "100%", height: "82%" },
];

export function HeroBackdrop({ image }: { image: StaticImageData }) {
  const ref = useRef<HTMLDivElement>(null);
  const { motion: motionOn, pointer } = useSceneMotion();
  const parallaxOn = features.heroParallax && motionOn;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: heroOffset as unknown as ["start start", "end start"],
  });
  const { x: pointerX, y: pointerY } = usePointerOffset(pointer && features.heroParallax);

  const travel = pointer ? parallaxDesktop : parallaxMobile;
  const scroll: [number, number] = [0, 1];
  const swing: [number, number] = [-0.5, 0.5];
  const off = (value: number) => (parallaxOn ? value : 0);
  const shift = (value: number): [number, number] =>
    pointer && parallaxOn ? [value, -value] : [0, 0];

  const photoY = useTransform(scrollYProgress, scroll, [0, off(travel.photo)]);
  const photoX = useTransform(pointerX, swing, shift(pointerShift.photo));
  const glowY = useTransform(scrollYProgress, scroll, [0, off(travel.glow)]);
  const glowX = useTransform(pointerX, swing, shift(pointerShift.glow));
  const linesY = useTransform(scrollYProgress, scroll, [0, off(travel.lines)]);
  const linesX = useTransform(pointerX, swing, shift(pointerShift.lines));

  return (
    <div ref={ref} className="absolute inset-0 -z-10 overflow-hidden">
      {/* Plane 1 — the photograph */}
      <m.div className="absolute inset-0" style={{ y: photoY, x: photoX }} data-motion>
        <div className="hero-bg absolute inset-0">
          <Image
            src={image}
            alt=""
            fill
            preload
            fetchPriority="high"
            sizes="(max-width: 640px) 75vw, 100vw"
            quality={60}
            className="object-cover object-[74%_40%] md:object-[center_40%]"
          />
        </div>
      </m.div>

      {/* Plane 4 — foreground depth bars, behind the glow so the headline stays legible */}
      {features.depthLayer && pointer && <DepthBars pointerX={pointerX} pointerY={pointerY} />}

      {/* Plane 2 — the ivory glow, moving against the photo */}
      <m.div
        aria-hidden
        data-motion
        style={{ y: glowY, x: glowX }}
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_46%,rgb(251_246_234/0.9)_0%,rgb(251_246_234/0.72)_45%,rgb(251_246_234/0)_78%)] md:bg-[radial-gradient(ellipse_50%_46%_at_50%_46%,rgb(251_246_234/0.85)_0%,rgb(251_246_234/0.55)_50%,rgb(251_246_234/0)_80%)]"
      />

      {/* Plane 3 — architectural hairlines */}
      <m.div
        aria-hidden
        data-motion
        style={{ y: linesY, x: linesX }}
        className="wrap pointer-events-none absolute inset-0 hidden md:block"
      >
        <div className="relative h-full">
          {lines.map((line, i) => (
            <span
              key={line.left}
              className="hero-line absolute bottom-0 w-px bg-navy/28"
              style={{ left: line.left, height: line.height, "--i": i } as CSSProperties}
            />
          ))}
        </div>
      </m.div>

      {/* Short fade into the ivory page, pinned to the section edge */}
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-ivory/0 to-ivory" />
    </div>
  );
}
