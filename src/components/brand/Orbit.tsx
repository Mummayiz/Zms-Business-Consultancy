"use client";

import { m, type MotionValue } from "motion/react";
import { useId } from "react";
import { lineDraw, viewport } from "@/lib/motion";

/*
 * Simplified orbit paths inspired by the logo's gold ring — never a trace of it.
 * Approved locations only: hero divider, Signature section, approach/process.
 * The SVG stretches horizontally; give it a CSS height close to the viewBox
 * height so the stroke stays about 1.5px thick.
 */
const paths = {
  /*
   * Hero divider: a shallow, symmetric arc inset from both edges and fading out
   * at each end, so it reads as a drawn segment of the orbit rather than a
   * diagonal line across the page.
   */
  divider: { viewBox: "0 0 1440 160", d: "M300 58 Q 720 120 1140 58", fade: true },
  // Shorter arc carrying the eye from the showcase to the headline.
  signature: { viewBox: "0 0 600 120", d: "M0 108 C 160 104, 380 74, 600 10", fade: false },
  /*
   * Process: starts at the top of bar 01 and ends at the top of bar 04.
   * The viewBox matches the bar grid (4 columns, 800 x 220), so the ends land
   * on the bars at any width. Rendered behind the bars.
   */
  process: { viewBox: "0 0 800 220", d: "M24 146 C 200 134, 400 86, 648 10", fade: false },
} as const;

type Variant = keyof typeof paths;

type OrbitProps = {
  variant: Variant;
  className?: string;
  delay?: number;
  /** Drives the draw from a parent's variant state instead of its own viewport trigger. */
  controlled?: boolean;
  /** Scroll-linked draw: 0 = undrawn, 1 = complete. Overrides the viewport trigger. */
  progress?: MotionValue<number>;
};

/*
 * The two modes are separate components on purpose. `useSceneMotion` settles
 * after mount, so a component can switch from the variant-driven path to the
 * scroll-linked one; rendering different component types makes React remount
 * the SVG, which clears any half-applied variant state (otherwise the path
 * stays stuck in its "hidden" opacity).
 */
export function Orbit({ variant, className, delay = 0, controlled = false, progress }: OrbitProps) {
  return progress ? (
    <ScrollOrbit variant={variant} className={className} progress={progress} />
  ) : (
    <VariantOrbit variant={variant} className={className} delay={delay} controlled={controlled} />
  );
}

function Shell({
  variant,
  className,
  gradientId,
  children,
  ...rest
}: {
  variant: Variant;
  className?: string;
  gradientId: string;
  children: React.ReactNode;
} & Record<string, unknown>) {
  const { viewBox, fade } = paths[variant];
  return (
    <m.svg viewBox={viewBox} preserveAspectRatio="none" aria-hidden focusable="false" className={className} {...rest}>
      {fade && (
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="var(--color-gold)" stopOpacity="0" />
            <stop offset="30%" stopColor="var(--color-gold)" stopOpacity="1" />
            <stop offset="70%" stopColor="var(--color-gold)" stopOpacity="1" />
            <stop offset="100%" stopColor="var(--color-gold)" stopOpacity="0" />
          </linearGradient>
        </defs>
      )}
      {children}
    </m.svg>
  );
}

const strokeProps = (variant: Variant, gradientId: string) => ({
  d: paths[variant].d,
  fill: "none",
  stroke: paths[variant].fade ? `url(#${gradientId})` : "var(--color-gold)",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
});

/** Draws in step with a scroll progress value. */
function ScrollOrbit({
  variant,
  className,
  progress,
}: {
  variant: Variant;
  className?: string;
  progress: MotionValue<number>;
}) {
  const gradientId = `orbit-fade-${useId()}`;
  return (
    <Shell variant={variant} className={className} gradientId={gradientId}>
      <m.path
        {...strokeProps(variant, gradientId)}
        data-motion
        initial={false}
        style={{ pathLength: progress, opacity: 1 }}
      />
    </Shell>
  );
}

/** Draws once when it scrolls into view, or when a parent switches variant. */
function VariantOrbit({
  variant,
  className,
  delay,
  controlled,
}: {
  variant: Variant;
  className?: string;
  delay: number;
  controlled: boolean;
}) {
  const gradientId = `orbit-fade-${useId()}`;
  const trigger = controlled ? {} : { initial: "hidden", whileInView: "visible", viewport };

  return (
    <Shell variant={variant} className={className} gradientId={gradientId} {...trigger}>
      <m.path {...strokeProps(variant, gradientId)} data-motion variants={lineDraw} custom={delay} />
    </Shell>
  );
}
