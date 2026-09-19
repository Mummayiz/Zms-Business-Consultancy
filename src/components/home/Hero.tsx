import type { CSSProperties } from "react";
// Imported as a module so Next knows the intrinsic size (no upscaling).
import heroBackground from "../../../public/brand/zms-hero-background.jpg";
import { hero } from "@/data/home";
import { heroMotionVars } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { HeroBackdrop } from "./HeroBackdrop";
import { HeroDivider } from "./HeroDivider";

const step = (i: number) => ({ "--i": i }) as CSSProperties;

/**
 * Home hero. The entrance runs in CSS so the headline paints immediately
 * (no wait for hydration); timings come from the shared motion tokens.
 * Depth planes and the scroll-drawn divider are layered around it.
 */
export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      style={heroMotionVars}
    >
      {/* Abu Dhabi scene from the concept artwork, logo removed, in depth planes */}
      <HeroBackdrop image={heroBackground} />

      <div className="wrap flex min-h-[calc(100svh-72px)] flex-col items-center justify-center pt-12 pb-24 text-center lg:min-h-[calc(100svh-84px)] lg:pt-16 lg:pb-40">
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

      {/* Gold orbit divider, drawn as the hero scrolls away */}
      <HeroDivider />
    </section>
  );
}
