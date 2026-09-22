import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { features } from "@/config/features";

export type ButtonVariant = "primary" | "secondary" | "onNavy" | "secondaryOnNavy" | "secondaryOnMedia";

// `btn-sheen` adds the single gold sweep on hover (see globals.css).
const base = `${features.buttonSheen ? "btn-sheen " : ""}relative isolate overflow-hidden inline-flex min-h-12 items-center justify-center gap-2.5 rounded-ui border px-6 py-3.5 text-center text-[0.90625rem] leading-none font-semibold tracking-[0.02em] transition-colors duration-200 ease-zms disabled:pointer-events-none disabled:opacity-45`;

const variants: Record<ButtonVariant, string> = {
  primary: "border-gold bg-navy text-ivory hover:bg-gold hover:text-navy",
  // navy/55 (3.77:1 on ivory) meets WCAG 1.4.11; an approved deviation from the
  // brief's "navy at 40%" for secondary buttons — see docs/accessibility-audit.md.
  secondary: "border-navy/55 bg-transparent text-navy hover:border-gold",
  onNavy: "border-gold bg-transparent text-ivory hover:bg-gold hover:text-navy",
  secondaryOnNavy: "border-ivory/40 bg-transparent text-ivory hover:border-gold",
  /*
   * Same button over footage. `secondary` is transparent, which was fine while
   * the hero carried a heavy wash; with the wash cut back its navy label would
   * sit straight on moving video, so this variant brings its own ivory ground.
   * A `bg-*` passed through `className` cannot do this — it and the variant's
   * own `bg-transparent` are the same property, and Tailwind resolves that by
   * stylesheet order rather than by the order they appear in the attribute.
   */
  secondaryOnMedia: "border-navy/55 bg-ivory/90 text-navy hover:border-gold",
};

export function buttonClasses(variant: ButtonVariant = "primary", className = "") {
  return `${base} ${variants[variant]} ${className}`.trim();
}

type LinkButtonProps = {
  href: string;
  variant?: ButtonVariant;
  className?: string;
  children: ReactNode;
} & Omit<ComponentProps<typeof Link>, "href" | "className">;

export function ButtonLink({ href, variant, className, children, ...rest }: LinkButtonProps) {
  return (
    <Link href={href} className={buttonClasses(variant, className)} {...rest}>
      {children}
    </Link>
  );
}

type ButtonProps = { variant?: ButtonVariant } & ComponentProps<"button">;

export function Button({ variant, className, type = "button", ...rest }: ButtonProps) {
  return <button type={type} className={buttonClasses(variant, className)} {...rest} />;
}
