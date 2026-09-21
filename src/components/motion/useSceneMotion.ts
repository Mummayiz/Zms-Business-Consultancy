"use client";

import { useEffect, useState } from "react";
import { useMotionValue, useSpring, type MotionValue } from "motion/react";
import { pointerSpring } from "@/lib/scroll";

/**
 * What the current device and preferences allow.
 *
 * Both values start `false` so the server render and the first client render
 * agree; they settle on mount. Anything gated on `pointer` is therefore
 * desktop-with-a-real-pointer only, and everything switches off under
 * reduced motion.
 */
export function useSceneMotion() {
  const [state, setState] = useState({ motion: false, pointer: false });

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const fine = window.matchMedia("(min-width: 768px) and (hover: hover) and (pointer: fine)");

    /*
     * `?motion=on` lets a visitor watch the motion layer even though their
     * system asks for reduced motion — useful for reviewing the site on a
     * machine with Windows "Animation effects" turned off. It is opt-in by the
     * visitor themselves; without it the system preference always wins.
     *
     * The choice is remembered for the browser session, so it survives
     * navigation between pages (otherwise clicking any nav link dropped the
     * parameter and the motion vanished again). `?motion=off` clears it.
     */
    const param = new URLSearchParams(window.location.search).get("motion");
    let stored: string | null = null;
    try {
      if (param === "on") sessionStorage.setItem("zms-motion", "on");
      if (param === "off") sessionStorage.removeItem("zms-motion");
      stored = sessionStorage.getItem("zms-motion");
    } catch {
      // Private mode or blocked storage: fall back to the parameter alone.
    }
    const forced = param === "on" || (param !== "off" && stored === "on");
    // Also releases the CSS reduced-motion overrides (see globals.css).
    document.documentElement.toggleAttribute("data-force-motion", forced);

    const sync = () => {
      const allowed = forced || !reduced.matches;
      setState({ motion: allowed, pointer: allowed && fine.matches });
    };
    sync();

    reduced.addEventListener("change", sync);
    fine.addEventListener("change", sync);
    return () => {
      reduced.removeEventListener("change", sync);
      fine.removeEventListener("change", sync);
    };
  }, []);

  return state;
}

/**
 * Pointer position as two spring-smoothed motion values in the range -0.5…0.5,
 * measured against the viewport. Updates never re-render React: the listener
 * writes straight into motion values, throttled to one animation frame.
 */
export function usePointerOffset(enabled: boolean): { x: MotionValue<number>; y: MotionValue<number> } {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, pointerSpring);
  const y = useSpring(rawY, pointerSpring);

  useEffect(() => {
    if (!enabled) {
      rawX.set(0);
      rawY.set(0);
      return;
    }

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        rawX.set(event.clientX / window.innerWidth - 0.5);
        rawY.set(event.clientY / window.innerHeight - 0.5);
      });
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled, rawX, rawY]);

  return { x, y };
}
