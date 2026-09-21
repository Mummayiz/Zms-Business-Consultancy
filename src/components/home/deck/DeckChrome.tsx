"use client";

import { useEffect, useState } from "react";
import { TOTAL, slides } from "@/data/deck";

/**
 * Deck chrome: the slide counter bottom-left and the tick rail down the right
 * edge, both tracking the slide in view.
 *
 * The rail is a real navigation landmark with anchor links; the counter is
 * decorative. Both are Home-only — the shared site nav is untouched.
 */
export function DeckChrome() {
  const [active, setActive] = useState(0);
  /*
   * The chrome is fixed, so it sits over whichever slide is in view. Navy ink
   * on the navy slide left the counter and the inactive ticks invisible, so it
   * follows the slide's own tone.
   */
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const sections = slides
      .map((slide) => document.getElementById(slide.id))
      .filter((el): el is HTMLElement => Boolean(el));
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // The slide covering the middle of the viewport wins.
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const index = slides.findIndex((slide) => slide.id === visible.target.id);
        if (index >= 0) setActive(index);
        setDark((visible.target as HTMLElement).dataset.tone === "dark");
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.01, 0.5] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const current = slides[active];

  return (
    <>
      {/* Slide counter, bottom left */}
      <div
        aria-hidden
        className={`deck-chrome type-label pointer-events-none fixed bottom-6 left-6 z-30 hidden transition-colors duration-500 ease-zms lg:block ${
          dark ? "text-ivory/70" : "text-navy/70"
        }`}
      >
        Slide {current.number} / {String(TOTAL).padStart(2, "0")}
      </div>

      {/* Tick rail, right edge */}
      <nav
        aria-label="Slides"
        className="deck-chrome fixed top-1/2 right-5 z-30 hidden -translate-y-1/2 lg:block"
      >
        <ul className="flex flex-col items-end gap-4">
          {slides.map((slide, i) => {
            const isActive = i === active;
            return (
              <li key={slide.id} className="flex items-center justify-end gap-3">
                {/* The label needs a clear gutter beside the container, which
                    only exists on very wide screens; below that, ticks only. */}
                <span
                  className={`type-label hidden whitespace-nowrap transition-all duration-500 ease-zms 2xl:block ${
                    isActive
                      ? `opacity-100 ${dark ? "text-ivory" : "text-navy"}`
                      : "pointer-events-none opacity-0"
                  }`}
                  aria-hidden={!isActive}
                >
                  {slide.number} · {slide.label}
                </span>
                <a
                  href={`#${slide.id}`}
                  aria-current={isActive ? "true" : undefined}
                  className="group flex h-4 items-center"
                >
                  <span className="sr-only">
                    Slide {slide.number}: {slide.label}
                  </span>
                  <span
                    aria-hidden
                    className={`block h-px transition-all duration-500 ease-zms group-hover:bg-gold ${
                      isActive ? "w-10 bg-gold" : `w-5 ${dark ? "bg-ivory/40" : "bg-navy/28"}`
                    }`}
                  />
                </a>
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}
