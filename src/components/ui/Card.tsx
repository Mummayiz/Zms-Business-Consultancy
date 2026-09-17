import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  tone?: "ivory" | "white" | "navy";
  className?: string;
  as?: "div" | "article" | "li";
};

const tones = {
  ivory: "border-navy/12 bg-ivory",
  white: "border-navy/12 bg-white",
  navy: "surface-navy border-ivory/16 bg-navy text-ivory",
};

/** Flat card: hairline border, 10px radius, no shadow. */
export function Card({ children, tone = "ivory", className = "", as: Tag = "div" }: CardProps) {
  return <Tag className={`rounded-card border p-6 lg:p-8 ${tones[tone]} ${className}`}>{children}</Tag>;
}
