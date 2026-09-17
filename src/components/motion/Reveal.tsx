"use client";

import { m, type Variants } from "motion/react";
import type { ReactNode } from "react";
import { fadeUp, reveal, scaleIn, staggerChildren, viewport } from "@/lib/motion";

const presets = { fadeUp, reveal, scaleIn } satisfies Record<string, Variants>;

type RevealProps = {
  children: ReactNode;
  variant?: keyof typeof presets;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "figure";
};

/** Reveals its content once when it scrolls into view. */
export function Reveal({ children, variant = "fadeUp", delay = 0, className, as = "div" }: RevealProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={presets[variant]}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
      custom={delay}
      data-motion
    >
      {children}
    </Tag>
  );
}

type StaggerProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "ul" | "ol";
};

/** Parent that staggers `RevealItem` children as the group enters view. */
export function RevealGroup({ children, delay = 0, className, as = "div" }: StaggerProps) {
  const Tag = m[as];
  return (
    <Tag
      className={className}
      variants={staggerChildren(delay)}
      initial="hidden"
      whileInView="visible"
      viewport={viewport}
    >
      {children}
    </Tag>
  );
}

export function RevealItem({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li";
}) {
  const Tag = m[as];
  return (
    <Tag className={className} variants={fadeUp} data-motion>
      {children}
    </Tag>
  );
}
