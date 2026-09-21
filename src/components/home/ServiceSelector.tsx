"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { m } from "motion/react";
import { servicesSlide } from "@/data/deck";
import { duration, ease } from "@/lib/motion";

/*
 * Tile selector: three tiles beside a detail panel that swaps on hover, tap,
 * click and keyboard focus.
 *
 * Keyboard: the tiles are a tablist, arrow keys move between them, and the
 * panel is the tabpanel. Below `lg` the panels are stacked and all visible, so
 * nothing on a phone hides behind an interaction.
 */
const items = servicesSlide.items;

export function ServiceSelector() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const current = items[active];

  const onKeyDown = (event: React.KeyboardEvent) => {
    const last = items.length - 1;
    let next: number | null = null;
    if (event.key === "ArrowRight" || event.key === "ArrowDown") next = active === last ? 0 : active + 1;
    if (event.key === "ArrowLeft" || event.key === "ArrowUp") next = active === 0 ? last : active - 1;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = last;
    if (next === null) return;
    event.preventDefault();
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <>
      {/* Desktop: tiles + swapping detail panel */}
      <div className="hidden gap-8 lg:grid lg:grid-cols-12">
        <div
          role="tablist"
          aria-label="Services"
          aria-orientation="vertical"
          onKeyDown={onKeyDown}
          className="flex flex-col gap-4 lg:col-span-5"
        >
          {items.map((item, i) => {
            const isActive = i === active;
            return (
              <button
                key={item.slug}
                ref={(el) => {
                  tabs.current[i] = el;
                }}
                role="tab"
                id={`tile-${item.slug}`}
                aria-selected={isActive}
                aria-controls="service-detail"
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActive(i)}
                onMouseEnter={() => setActive(i)}
                onFocus={() => setActive(i)}
                className={`group relative border p-6 text-left transition-colors duration-300 ease-zms ${
                  isActive ? "border-gold bg-gold text-navy" : "border-navy/12 bg-white text-navy hover:border-gold"
                }`}
              >
                <span className={`type-label ${isActive ? "text-navy" : "text-charcoal"}`}>{item.number}</span>
                <span className="mt-3 block font-serif text-[1.625rem] leading-tight font-semibold">{item.title}</span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="service-detail"
          aria-labelledby={`tile-${current.slug}`}
          className="border-t border-navy/12 pt-8 lg:col-span-6 lg:col-start-7"
        >
          <m.div
            key={current.slug}
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: duration.base, ease }}
            data-motion
          >
            <div className="type-label flex items-center justify-between text-charcoal">
              <span>{current.title}</span>
              <span aria-hidden>Service {current.number}</span>
            </div>

            <h3 className="mt-6 font-serif text-[clamp(2rem,1.5rem+1.4vw,2.75rem)] leading-tight font-semibold text-navy">
              {current.title}
            </h3>
            <p className="type-lead measure mt-5">{current.summary}</p>

            <ul className="mt-8 flex flex-col gap-3">
              {current.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-4 text-[0.9375rem]">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-gold" />
                  {bullet}
                </li>
              ))}
            </ul>

            <Link
              href={current.href}
              className="group mt-10 inline-flex items-center gap-4 border border-navy/28 px-6 py-4 text-[0.8125rem] font-semibold tracking-[0.18em] text-navy uppercase transition-colors duration-200 ease-zms hover:border-gold"
            >
              {servicesSlide.linkLabel}
              <span aria-hidden className="h-px w-10 bg-gold transition-all duration-300 ease-zms group-hover:w-16" />
              <ArrowRight aria-hidden strokeWidth={1.5} className="h-4 w-4" />
            </Link>
          </m.div>
        </div>
      </div>

      {/* Mobile: stacked panels, nothing hidden behind an interaction */}
      <div className="flex flex-col gap-10 lg:hidden">
        {items.map((item) => (
          <article key={item.slug} className="border-t border-navy/12 pt-6">
            <span className="type-label text-charcoal">{item.number}</span>
            <h3 className="type-card mt-3">{item.title}</h3>
            <p className="mt-3 text-[0.9375rem] leading-relaxed">{item.summary}</p>
            <ul className="mt-5 flex flex-col gap-2">
              {item.bullets.map((bullet) => (
                <li key={bullet} className="flex items-start gap-3 text-[0.9375rem]">
                  <span aria-hidden className="mt-3 h-px w-4 shrink-0 bg-gold" />
                  {bullet}
                </li>
              ))}
            </ul>
            <Link
              href={item.href}
              className="mt-6 inline-flex items-center gap-2 border-b border-gold pb-1 text-[0.875rem] font-semibold text-navy"
            >
              {servicesSlide.linkLabel}
              <ArrowRight aria-hidden strokeWidth={1.75} className="h-4 w-4" />
            </Link>
          </article>
        ))}
      </div>
    </>
  );
}
