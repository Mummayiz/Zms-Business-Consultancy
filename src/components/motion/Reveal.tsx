"use client";

import {
  Children,
  cloneElement,
  createContext,
  isValidElement,
  useContext,
  useRef,
  type ComponentType,
  type ReactElement,
  type ReactNode,
} from "react";
import { m, useMotionTemplate, useTransform, type MotionStyle, type MotionValue } from "motion/react";
import { features } from "@/config/features";
import { scrubRange, stagger, travel } from "@/lib/motion";
import { useSceneMotion } from "@/components/motion/useSceneMotion";
import { useScrub } from "@/components/motion/useScrub";

/*
 * Section reveals, scroll-linked in both directions.
 *
 * These used to be `whileInView` with `viewport={{ once: true }}`: each reveal
 * fired on entry and then held its finished state, so scrolling back up showed
 * nothing. They are now driven continuously by the section's own scroll
 * progress, so they build on the way down and un-build on the way up.
 *
 * Two rules keep the content readable, both of which a latched reveal never had
 * to worry about:
 *
 * 1. The window closes early (see `useScrub`), while the element's top is still
 *    low on the screen. Anything sitting where it can actually be read is at
 *    progress 1 and fully built, so scroll-linked opacity never leaves text
 *    half-faded when the page is at rest.
 * 2. With motion off — reduced motion, or `features.scrollScenes` disabled —
 *    the static branch renders a plain element with no transform and no
 *    opacity, so there is no state to get stuck in.
 *
 * The live and static branches are deliberately different component types.
 * `useSceneMotion` settles after mount, and rendering a different type makes
 * React remount, which avoids a half-applied style surviving the switch.
 */

type Variant = "fadeUp" | "reveal" | "scaleIn";
type Tag = "div" | "li" | "figure" | "ul" | "ol";

/*
 * `m[as]` is a union of motion components whose ref types differ per tag, which
 * no single ref satisfies. The cast is only about the ref: props stay checked
 * at each call site through the exported components below.
 */
type LooseTag = ComponentType<Record<string, unknown>>;

/** Progress of the enclosing RevealGroup, so items stagger against one window. */
const GroupProgress = createContext<MotionValue<number> | null>(null);

/**
 * One reveal's styles, scrubbed from `progress`.
 *
 * Deliberately transform-only: no reveal animates opacity.
 *
 * axe evaluates every element in the document, including the ones below the
 * fold, and it composites ancestor opacity into its contrast maths. A
 * scroll-linked fade therefore leaves whichever section straddles the window at
 * a fractional opacity whenever the page is at rest, and that reads as failing
 * text — measured on /approach, stage copy came out at 1.79:1 against a 3:1
 * requirement. The latched `whileInView` version escaped this only because its
 * resting state was exactly 0, which axe skips as invisible.
 *
 * Transform and clip-path carry the build instead. Both are compositor-cheap,
 * neither touches the rendered colour of text, and the guarantee that follows
 * is stronger than anything a fade could offer: copy is legible at every scroll
 * position, in both directions, because it is never less than fully opaque.
 *
 * Every value is built on every call and the variant picks between them: hooks
 * cannot be called conditionally, and a few spare motion values are far cheaper
 * than a branch that changes the hook order.
 */
function useScrubStyle(variant: Variant, progress: MotionValue<number>, delay: number): MotionStyle {
  const range = scrubRange(delay);
  const y = useTransform(progress, range, [travel, 0], { clamp: true });
  const scale = useTransform(progress, range, [1.06, 1], { clamp: true });
  // Built from a number rather than interpolated between two inset() strings.
  const hidden = useTransform(progress, range, [100, 0], { clamp: true });
  const clipPath = useMotionTemplate`inset(${hidden}% 0% 0% 0%)`;

  if (variant === "reveal") return { clipPath };
  if (variant === "scaleIn") return { scale };
  return { y };
}

function Static({ children, className, as }: { children: ReactNode; className?: string; as: Tag }) {
  const Plain = as;
  return <Plain className={className}>{children}</Plain>;
}

type RevealProps = {
  children: ReactNode;
  variant?: Variant;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
};

export function Reveal({ children, variant = "fadeUp", delay = 0, className, as = "div" }: RevealProps) {
  const { motion: motionOn } = useSceneMotion();

  return features.scrollScenes && motionOn ? (
    <ScrubReveal variant={variant} delay={delay} className={className} as={as}>
      {children}
    </ScrubReveal>
  ) : (
    <Static className={className} as={as}>
      {children}
    </Static>
  );
}

function ScrubReveal({ children, variant, delay, className, as }: Required<Omit<RevealProps, "className">> & { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const style = useScrubStyle(variant, useScrub(ref), delay);
  const Motion = m[as] as LooseTag;

  return (
    <Motion ref={ref} className={className} data-motion style={style}>
      {children}
    </Motion>
  );
}

type GroupProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
};

/**
 * Parent for `RevealItem` children. It owns one scroll window and hands each
 * child a slice of it, so the group staggers against a single measurement
 * instead of each item measuring itself.
 */
export function RevealGroup({ children, delay = 0, className, as = "div" }: GroupProps) {
  const { motion: motionOn } = useSceneMotion();

  return features.scrollScenes && motionOn ? (
    <ScrubGroup delay={delay} className={className} as={as}>
      {children}
    </ScrubGroup>
  ) : (
    <Static className={className} as={as}>
      {children}
    </Static>
  );
}

function ScrubGroup({ children, delay, className, as }: Required<Omit<GroupProps, "className">> & { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const progress = useScrub(ref);
  const Motion = m[as] as LooseTag;

  return (
    <GroupProgress.Provider value={progress}>
      <Motion ref={ref} className={className}>
        {Children.map(children, (child, i) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<{ delay?: number }>, { delay: delay + i * stagger })
            : child,
        )}
      </Motion>
    </GroupProgress.Provider>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
  /** Set by RevealGroup from the child's position; not passed at call sites. */
  delay?: number;
}) {
  const progress = useContext(GroupProgress);

  // No progress means the group rendered static, so this item does too.
  return progress ? (
    <ScrubItem progress={progress} delay={delay} className={className} as={as}>
      {children}
    </ScrubItem>
  ) : (
    <Static className={className} as={as}>
      {children}
    </Static>
  );
}

function ScrubItem({
  children,
  progress,
  delay,
  className,
  as,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  delay: number;
  className?: string;
  as: "div" | "li";
}) {
  const style = useScrubStyle("fadeUp", progress, delay);
  const Motion = m[as] as LooseTag;

  return (
    <Motion className={className} data-motion style={style}>
      {children}
    </Motion>
  );
}
