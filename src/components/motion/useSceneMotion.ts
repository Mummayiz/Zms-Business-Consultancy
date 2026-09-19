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

    const sync = () => setState({ motion: !reduced.matches, pointer: !reduced.matches && fine.matches });
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
