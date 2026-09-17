import Image from "next/image";
import type { CSSProperties } from "react";
// Imported as a module so Next knows the intrinsic size (no upscaling) and can
// generate a blur placeholder.
import heroBackground from "../../../public/brand/zms-hero-background.jpg";
import { hero } from "@/data/home";
import { heroMotionVars } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { Orbit } from "@/components/brand/Orbit";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

// Thin architectural lines rising at the edges of the grid (md and up).
const lines = [
  { left: "0%", height: "42%" },
  { left: "calc(100% / 12)", height: "60%" },
  { left: "calc(100% * 11 / 12)", height: "64%" },
  { left: "100%", height: "82%" },
];

/**
 * Home hero. The entrance runs in CSS so the headline paints immediately
 * (no wait for hydration); timings come from the shared motion tokens.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      style={heroMotionVars}
    >
      {/* Abu Dhabi scene from the concept artwork, logo removed */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="hero-bg absolute inset-0">
          <Image
            src={heroBackground}
            alt=""
            fill
            preload
            fetchPriority="high"
            /*
             * This is a soft background behind an ivory glow, so it tolerates a
             * lower resolution and quality. Phones ask for ~75vw (about 640px at
             * DPR 2) instead of the full 1254px source, which is the difference
             * between an 83KB and a ~20KB LCP image on a slow connection.
             */
            sizes="(max-width: 640px) 75vw, 100vw"
            quality={60}
            className="object-cover object-[74%_40%] md:object-[center_40%]"
          />
        </div>
        {/* Soft ivory glow behind the text */}
        <div
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(ellipse_85%_50%_at_50%_46%,rgb(251_246_234/0.9)_0%,rgb(251_246_234/0.72)_45%,rgb(251_246_234/0)_78%)] md:bg-[radial-gradient(ellipse_50%_46%_at_50%_46%,rgb(251_246_234/0.85)_0%,rgb(251_246_234/0.55)_50%,rgb(251_246_234/0)_80%)]"
        />
        {/* Short fade into the ivory page */}
        <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-ivory/0 to-ivory" />
      </div>

      <div aria-hidden className="wrap pointer-events-none absolute inset-0 hidden md:block">
        <div className="relative h-full">
          {lines.map((line, i) => (
            <span
              key={line.left}
              className="hero-line absolute bottom-0 w-px bg-navy/28"
              style={{ left: line.left, height: line.height, ...step(i) }}
            />
          ))}
        </div>
      </div>

      <div className="wrap flex min-h-[calc(100svh-72px)] flex-col items-center justify-center pt-16 pb-32 text-center lg:min-h-[calc(100svh-84px)] lg:pb-40">
        <p className="type-label flex items-center gap-4 text-navy">
          <span className="rule-taper hero-rule origin-right" aria-hidden />
          <span className="hero-step" style={step(0)}>
            {hero.label}
          </span>
          <span className="rule-taper hero-rule origin-left" aria-hidden />
        </p>

        <h1 id="hero-title" className="type-hero hero-step mt-7 max-w-[20ch] text-navy" style={step(1)}>
          {hero.title}
        </h1>

        <p className="type-lead hero-step mt-6 max-w-[54ch] text-charcoal" style={step(2)}>
          {hero.text}
        </p>

        <div className="hero-step mt-10 flex flex-wrap justify-center gap-4" style={step(3)}>
          <ButtonLink href={hero.primary.href} variant="primary">
            {hero.primary.label}
          </ButtonLink>
          <ButtonLink href={hero.secondary.href} variant="secondary">
            {hero.secondary.label}
          </ButtonLink>
        </div>
      </div>

      {/* Gold orbit divider drawing across the fade */}
      <Orbit
        variant="divider"
        delay={0.9}
        className="pointer-events-none absolute inset-x-0 bottom-4 h-[100px] w-full lg:bottom-6 lg:h-[160px]"
      />
    </section>
  );
}
