"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, type RefObject } from "react";
import { useMotionValue, useScroll, useTransform, type MotionValue } from "motion/react";

/*
 * Scroll progress for one element.
 *
 * This replaces `useScroll({ target, offset })`, which measured its target's
 * document position once on mount and cached it with no invalidation. That
 * broke quietly: on /services/[slug] the layout settled after Motion had
 * measured, so two sections held a stale window and sat at opacity 0 — on
 * screen and unreadable — until the page was scrolled a thousand pixels past
 * them.
 *
 * Two things matter in how the position is measured here.
 *
 * It comes from the `offsetTop` chain, not `getBoundingClientRect()`. A rect is
 * the *transformed* box, and these reveals translate their own element by up to
 * `travel` px — so a rect-derived progress feeds back into itself, and the
 * sequence settles at a different value depending on which direction you
 * arrived from. Measured as hysteresis: the same scroll position read up to 1.0
 * apart scrolling down versus back up. `offsetTop` ignores transforms.
 *
 * And it is re-measured on everything that can move the box without scrolling:
 * a late web font, an image settling, a rotation, a reflow above it on the
 * page. So there is a cache, but never a stale one.
 *
 * The window is expressed as a fraction of viewport height:
 *
 *   top = ENTER * vh  → 0   (just below the fold)
 *   top = BUILT * vh  → 1   (low on the screen, but readable)
 *
 * Anything whose top is above `BUILT` is clamped to 1. That is the property
 * that keeps scroll-linked opacity honest: a reveal sitting anywhere in the
 * reading area is fully built, so it can never be caught half-faded at rest,
 * while still animating visibly as it rises through the bottom of the screen.
 */

const ENTER = 1.02;
const BUILT = 0.78;

/** Where an element must sit for its reveal to be complete, as a fraction of the viewport. */
export const BUILT_AT = BUILT;

/**
 * Layout position relative to the document, ignoring transforms.
 *
 * SVG elements have no `offsetTop`; they fall back to the rect, which is safe
 * because nothing translates them — the orbit animates `pathLength` only.
 */
function layoutTop(el: HTMLElement): number {
  if (typeof el.offsetTop !== "number") {
    return el.getBoundingClientRect().top + window.scrollY;
  }
  let top = 0;
  let node: HTMLElement | null = el;
  while (node) {
    top += node.offsetTop;
    node = node.offsetParent as HTMLElement | null;
  }
  return top;
}

export function useScrub(ref: RefObject<HTMLElement | null>): MotionValue<number> {
  const { scrollY } = useScroll();
  /*
   * The element's layout position, held as a motion value rather than a ref.
   *
   * It has to be part of Motion's dependency graph. An earlier version kept it
   * in a ref and pushed the result into a standalone `useMotionValue` by hand,
   * which computed the right number and never reached the DOM: the derived
   * `useTransform` in the caller had subscribed to a value Motion did not know
   * was changing, so every reveal stayed at its initial opacity until the first
   * scroll event nudged the graph. Deriving progress from both inputs means a
   * re-measure propagates on its own.
   *
   * -1 marks "not measured yet" and is far enough below any real position that
   * the first paint shows finished content rather than blank space.
   */
  const docTop = useMotionValue(-1);
  /*
   * Viewport height is an input too, not read inside the transform. The window
   * defines its bounds as fractions of it, so on rotation or a resize the
   * result has to change even when the scroll position and the layout position
   * both stay put — and a transform only recomputes when one of its inputs
   * does.
   */
  const viewport = useMotionValue(0);
  const raf = useRef(0);

  const progress = useTransform([scrollY, docTop, viewport], ([sy, dt, vh]: number[]) => {
    if (dt < 0 || vh <= 0) return 1;
    const top = dt - sy;
    const p = (ENTER * vh - top) / ((ENTER - BUILT) * vh);
    return p < 0 ? 0 : p > 1 ? 1 : p;
  });

  const remeasure = useCallback(() => {
    const el = ref.current;
    if (!el) return;
    viewport.set(window.innerHeight || 1);
    docTop.set(layoutTop(el));
  }, [ref, docTop, viewport]);

  // Before first paint, so nothing below the fold is briefly shown built.
  useLayoutEffect(remeasure, [remeasure]);

  useEffect(() => {
    const schedule = () => {
      if (raf.current) return;
      raf.current = requestAnimationFrame(() => {
        raf.current = 0;
        remeasure();
      });
    };

    /*
     * Measure again straight after mount. The layout effect above runs before
     * the rest of the page has necessarily reached its final height, and a
     * reveal that measured too early held its default of 1: every section below
     * the fold sat fully built on load and then snapped to hidden on the first
     * scroll event.
     */
    schedule();

    window.addEventListener("resize", schedule);
    window.addEventListener("load", schedule);
    document.fonts?.ready.then(schedule).catch(() => {});

    const el = ref.current;
    const observer = new ResizeObserver(schedule);
    if (el) observer.observe(el);
    if (document.body) observer.observe(document.body);

    return () => {
      window.removeEventListener("resize", schedule);
      window.removeEventListener("load", schedule);
      observer.disconnect();
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [remeasure, ref]);

  return progress;
}
