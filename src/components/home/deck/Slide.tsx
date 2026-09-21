import type { ReactNode } from "react";
import { slides } from "@/data/deck";
import { Grain } from "@/components/ui/Grain";
import { PointerLight } from "@/components/ui/PointerLight";

/**
 * One deck slide: a full-height section, dark or light, with optional
 * full-bleed layers behind and in front of its padded content column.
 */
export function Slide({
  id,
  tone = "light",
  labelledBy,
  className = "",
  contentClassName = "",
  background,
  overlay,
  children,
}: {
  id: (typeof slides)[number]["id"];
  tone?: "light" | "dark";
  labelledBy?: string;
  className?: string;
  contentClassName?: string;
  /** Full-bleed layer behind the slide, outside the padded content column. */
  background?: ReactNode;
  /**
   * Full-bleed layer in front of the slide, outside the padded content column,
   * and after it in tab order. Anything positioned against the slide's own
   * edges belongs here: inside the column, `bottom-*` resolves against the
   * height of the text, not the slide, which put the hero's scroll cue on top
   * of its own buttons.
   */
  overlay?: ReactNode;
  children: ReactNode;
}) {
  const slide = slides.find((s) => s.id === id)!;
  const dark = tone === "dark";

  /*
   * The nav is sticky, so it holds 72px (84px from lg) of the viewport on every
   * slide. Measuring against the full svh made each slide that much taller than
   * the space it actually has, which pushed the hero's scroll cue off the
   * bottom of the first screen.
   */
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      data-slide={slide.number}
      className={`deck-slide relative flex min-h-[calc(100svh-72px)] flex-col justify-center overflow-hidden py-24 lg:min-h-[calc(100svh-84px)] lg:py-28 ${
        dark ? "surface-navy bg-navy text-ivory" : "border-t border-navy/12"
      } ${className}`}
    >
      {background}

      {dark && (
        <>
          <PointerLight />
          <Grain />
        </>
      )}

      <div className={`wrap relative w-full ${contentClassName}`}>{children}</div>

      {overlay}
    </section>
  );
}
