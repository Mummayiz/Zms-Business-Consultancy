"use client";

import { m, useTransform, type MotionValue } from "motion/react";
import { useId, useRef } from "react";
import { features } from "@/config/features";
import { scrubRange } from "@/lib/motion";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { useScrub } from "@/components/motion/useScrub";

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
  /** Scroll-linked draw from a parent's own window: 0 = undrawn, 1 = complete. */
  progress?: MotionValue<number>;
};

/*
 * Every mode is a separate component on purpose. `useSceneMotion` settles after
 * mount, so a component switches path once its answer arrives; rendering a
 * different component type makes React remount the SVG, which clears any
 * half-applied style (otherwise the path can stay stuck at its hidden opacity).
 *
 * The draw scrubs with the scroll in both directions. It used to be a
 * `whileInView` trigger with `once: true`, which left the arc drawn for good
 * after one pass.
 */
export function Orbit({ variant, className, delay = 0, progress }: OrbitProps) {
  const { motion: motionOn } = useSceneMotion();

  // A parent's window wins: the hero divider and the process curve time their
  // draw against a sequence rather than against the SVG's own box.
  if (progress) return <ScrollOrbit variant={variant} className={className} progress={progress} />;
  if (features.scrollScenes && motionOn)
    return <SelfScrollOrbit variant={variant} className={className} delay={delay} />;
  return <StaticOrbit variant={variant} className={className} />;
}

function Shell({
  variant,
  className,
  gradientId,
  svgRef,
  children,
  ...rest
}: {
  variant: Variant;
  className?: string;
  gradientId: string;
  svgRef?: React.Ref<SVGSVGElement>;
  children: React.ReactNode;
} & Record<string, unknown>) {
  const { viewBox, fade } = paths[variant];
  return (
    <m.svg
      ref={svgRef}
      viewBox={viewBox}
      preserveAspectRatio="none"
      aria-hidden
      focusable="false"
      className={className}
      {...rest}
    >
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

/** Draws in step with the scroll across its own box, in both directions. */
function SelfScrollOrbit({
  variant,
  className,
  delay,
}: {
  variant: Variant;
  className?: string;
  delay: number;
}) {
  const gradientId = `orbit-fade-${useId()}`;
  const ref = useRef<SVGSVGElement>(null);
  // useScrub only reads a bounding box, which an SVG element reports the same way.
  const progress = useScrub(ref as unknown as React.RefObject<HTMLElement>);
  const pathLength = useTransform(progress, scrubRange(delay), [0, 1], { clamp: true });

  return (
    <Shell variant={variant} className={className} gradientId={gradientId} svgRef={ref}>
      <m.path {...strokeProps(variant, gradientId)} data-motion initial={false} style={{ pathLength, opacity: 1 }} />
    </Shell>
  );
}

/** Fully drawn, with nothing animating: reduced motion, or scenes switched off. */
function StaticOrbit({ variant, className }: { variant: Variant; className?: string }) {
  const gradientId = `orbit-fade-${useId()}`;
  return (
    <Shell variant={variant} className={className} gradientId={gradientId}>
      <path {...strokeProps(variant, gradientId)} />
    </Shell>
  );
}
