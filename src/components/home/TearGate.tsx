"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { site } from "@/config/site";

/*
 * Tear-to-enter gate.
 *
 * Dragging horizontally tears the ivory panel open along a jagged edge with a
 * gold line; past a third of the width it completes on its own.
 *
 * Every escape hatch the reference lacks is here: SKIP INTRO is always visible
 * and focusable, Enter or Space opens it without any drag (WCAG 2.5.7), it
 * appears once per session, and it never renders at all under reduced motion.
 */

const THRESHOLD = 0.33;
const SEEN_KEY = "zms-gate-seen";

/**
 * The panel keeps everything to the right of a jagged vertical edge at
 * `offset`. One CSS polygon, so the tear is a single property to animate.
 */
function tornPolygon(offset: number) {
  const teeth = 24;
  const points: string[] = [];
  for (let i = 0; i <= teeth; i++) {
    const y = (i / teeth) * 100;
    const jitter = i % 2 === 0 ? 0 : 1.8 + (i % 3) * 0.6;
    points.push(`${Math.min(100, offset + jitter)}% ${y}%`);
  }
  points.push("100% 100%", "100% 0%");
  return `polygon(${points.join(", ")})`;
}

/**
 * Whether the gate should appear: never on the server, never under reduced
 * motion, and only once per session. Read through useSyncExternalStore rather
 * than an effect, so there is no setState-during-effect cascade.
 */
function useShouldGate() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      try {
        if (sessionStorage.getItem(SEEN_KEY) === "1") return false;
      } catch {
        // storage blocked: fall through to the motion preference
      }
      return !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    },
    () => false,
  );
}

export function TearGate() {
  const shouldGate = useShouldGate();
  const [dismissed, setDismissed] = useState(false);
  const [open, setOpen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const panelRef = useRef<HTMLDivElement>(null);

  const dismiss = () => {
    setProgress(120);
    setOpen(true);
    try {
      sessionStorage.setItem(SEEN_KEY, "1");
    } catch {
      // storage blocked: the gate simply appears again next visit
    }
    // Hand focus to the hero heading once the panel has gone.
    window.setTimeout(() => {
      document.getElementById("hero-title")?.focus?.();
      setDismissed(true);
    }, 900);
  };

  /*
   * Move focus into the panel as soon as it appears, and listen for the
   * keyboard at the window. A handler on the panel alone never fires: focus
   * starts on <body>, and events bubble up, not down — which left Enter dead.
   */
  /*
   * Flag the gate on the document while it is up. The torn edge deliberately
   * leaves a few percent of the left uncovered, which was enough to show the
   * slide counter through it; the deck chrome fades out until the gate has
   * gone. See `[data-gate="open"]` in globals.css.
   */
  useEffect(() => {
    if (!shouldGate || dismissed) return;
    const root = document.documentElement;
    root.dataset.gate = "open";
    return () => {
      delete root.dataset.gate;
    };
  }, [shouldGate, dismissed]);

  useEffect(() => {
    if (!shouldGate || dismissed) return;
    panelRef.current?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Enter" && event.key !== " " && event.key !== "Spacebar") return;
      const target = event.target as HTMLElement | null;
      // Let the buttons inside the gate handle their own activation.
      if (target?.closest("button")) return;
      event.preventDefault();
      dismiss();
    };

    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [shouldGate, dismissed]);

  useEffect(() => {
    if (dismissed || open || !dragging) return;

    const onMove = (event: PointerEvent) => {
      const travelled = (event.clientX - startX.current) / window.innerWidth;
      const next = Math.max(0, travelled) * 100;
      setProgress(next);
      if (travelled > THRESHOLD) {
        setDragging(false);
        dismiss();
      }
    };
    const onUp = () => {
      setDragging(false);
      setProgress(0); // snap shut if the drag did not go far enough
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("pointercancel", onUp);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("pointercancel", onUp);
    };
  }, [dismissed, open, dragging]);

  if (!shouldGate || dismissed) return null;

  const offset = Math.min(progress, 120);

  return (
    <div
      ref={panelRef}
      role="dialog"
      aria-modal="true"
      aria-label="Introduction"
      onPointerDown={(event) => {
        setDragging(true);
        startX.current = event.clientX;
      }}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          dismiss();
        }
      }}
      tabIndex={-1}
      className={`fixed inset-0 z-[70] touch-pan-y select-none ${open ? "pointer-events-none" : ""}`}
      style={{ transition: open ? "opacity 700ms var(--ease-zms)" : undefined, opacity: open ? 0 : 1 }}
    >
      {/* The panel itself, torn along a jagged edge */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center bg-ivory"
        style={{
          clipPath: tornPolygon(offset),
          transition: dragging ? undefined : "clip-path 600ms var(--ease-zms)",
        }}
      >
        <Image
          src="/brand/zms-logo-original.png"
          alt={site.name}
          width={845}
          height={935}
          sizes="150px"
          className="h-auto w-[132px]"
          priority
        />

        <p className="type-label mt-10 flex items-center gap-3 text-navy">
          <span aria-hidden className="text-gold">
            ◆
          </span>
          Tear to enter
          <span aria-hidden className="text-gold">
            ◆
          </span>
        </p>
        <p className="mt-4 max-w-[40ch] px-6 text-center text-[0.9375rem] text-charcoal">
          Press and drag anywhere to open, or press Enter.
        </p>

        <button
          type="button"
          onClick={dismiss}
          className="type-label mt-10 border-b border-gold pb-2 text-navy focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
        >
          Begin the tour
        </button>
      </div>

      {/* Gold line riding the torn edge */}
      <span
        aria-hidden
        className="absolute inset-y-0 w-px bg-gold"
        style={{
          left: `${offset}%`,
          opacity: offset > 0 && offset < 100 ? 1 : 0,
          transition: dragging ? undefined : "left 600ms var(--ease-zms), opacity 300ms linear",
        }}
      />

      <button
        type="button"
        onClick={dismiss}
        className="type-label fixed right-6 bottom-6 z-[71] text-navy underline-offset-8 hover:underline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-navy"
      >
        Skip intro
      </button>
    </div>
  );
}
