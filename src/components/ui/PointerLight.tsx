"use client";

import { useEffect, useRef, useState } from "react";
import { features } from "@/config/features";
import { useSceneMotion } from "@/components/motion/useSceneMotion";

/**
 * A soft gold sheen that follows the pointer across a navy surface.
 *
 * Drop it inside any `relative` navy section. It listens on its parent and
 * writes CSS variables directly — no React re-renders while the pointer moves.
 * Desktop pointers only, off under reduced motion, and capped at 8% gold so it
 * reads as a sheen rather than a spotlight.
 */
export function PointerLight({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { pointer } = useSceneMotion();
  const [active, setActive] = useState(false);
  const enabled = features.pointerLight && pointer;

  useEffect(() => {
    const el = ref.current;
    const surface = el?.parentElement;
    if (!enabled || !el || !surface) return;

    let frame = 0;
    const onMove = (event: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        const rect = surface.getBoundingClientRect();
        el.style.setProperty("--px", `${event.clientX - rect.left}px`);
        el.style.setProperty("--py", `${event.clientY - rect.top}px`);
      });
    };
    const onEnter = () => setActive(true);
    const onLeave = () => setActive(false);

    surface.addEventListener("pointermove", onMove, { passive: true });
    surface.addEventListener("pointerenter", onEnter);
    surface.addEventListener("pointerleave", onLeave);
    return () => {
      surface.removeEventListener("pointermove", onMove);
      surface.removeEventListener("pointerenter", onEnter);
      surface.removeEventListener("pointerleave", onLeave);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <div
      ref={ref}
      aria-hidden
      className={`pointer-events-none absolute inset-0 transition-opacity duration-500 ease-zms ${
        active ? "opacity-100" : "opacity-0"
      } ${className}`}
      style={{
        background:
          "radial-gradient(620px circle at var(--px, 50%) var(--py, 40%), rgb(200 154 61 / 0.18), rgb(200 154 61 / 0.07) 40%, transparent 70%)",
      }}
    />
  );
}
