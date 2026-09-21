import type { ReactNode } from "react";
import { TOTAL, slides } from "@/data/deck";
import { Grain } from "@/components/ui/Grain";
import { PointerLight } from "@/components/ui/PointerLight";

/**
 * One deck slide: a full-height section carrying its Roman numerals in the top
 * and bottom right corners. The numerals are decorative, so they are hidden
 * from assistive technology — the rail in DeckChrome carries the real links.
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
  // Decorative, but still visible text: it has to meet contrast like any other.
  const numerals = dark ? "text-ivory/70" : "text-navy/70";

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
      data-tone={tone}
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

      <span aria-hidden className={`type-label absolute top-8 right-8 hidden lg:block ${numerals}`}>
        {slide.roman} / {romanTotal}
      </span>
      <span aria-hidden className={`type-label absolute right-8 bottom-8 hidden lg:block ${numerals}`}>
        {slide.roman} / {romanTotal}
      </span>

      <div className={`wrap relative w-full ${contentClassName}`}>{children}</div>

      {overlay}
    </section>
  );
}

const romanTotal = ["I", "II", "III", "IV", "V", "VI", "VII"][TOTAL - 1];
