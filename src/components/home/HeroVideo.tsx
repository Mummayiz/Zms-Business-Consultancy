"use client";

import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/*
 * Hero background: poster first, video second.
 *
 * The poster is a plain <img>, not next/image: the client supplied these files
 * already encoded and compressed for the web, and re-encoding them at the
 * optimiser's quality would only soften them. It paints immediately and is the
 * LCP element.
 *
 * Each video has its own poster, frame-zero of that exact file, so the handover
 * is invisible. The poster pair is chosen by <picture> at parse time and the
 * video pair on mount, so exactly one of each is ever downloaded — and the
 * video never before first paint.
 *
 * Atmosphere only: no captions, no audio, no controls, and nothing that says
 * where the footage was shot.
 */

const LANDSCAPE = {
  video: "/media/hero-desktop.mp4",
  poster: "/media/hero-poster.jpg",
  width: 1920,
  height: 1080,
};

const PORTRAIT = {
  video: "/media/hero-mobile.mp4",
  poster: "/media/hero-poster-mobile.jpg",
  width: 1080,
  height: 1920,
};

const FALLBACK = "/brand/zms-hero-background.jpg";

/**
 * Which pair to play, or null for poster-only. Read through
 * useSyncExternalStore so the server renders the poster and the client settles
 * on mount without a setState cascade. Re-reads if the viewport crosses the
 * breakpoint or the motion preference changes.
 */
function useVideoPair() {
  return useSyncExternalStore(
    (onChange) => {
      const queries = [
        window.matchMedia("(min-width: 768px)"),
        window.matchMedia("(prefers-reduced-motion: reduce)"),
      ];
      queries.forEach((q) => q.addEventListener("change", onChange));
      return () => queries.forEach((q) => q.removeEventListener("change", onChange));
    },
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return null;
      return window.matchMedia("(min-width: 768px)").matches ? LANDSCAPE : PORTRAIT;
    },
    () => null,
  );
}

export function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const pair = useVideoPair();
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);

  /*
   * Attach the source only after the page has finished loading and the main
   * thread is idle.
   *
   * Downloading it any earlier competes with the poster for bandwidth on a
   * throttled connection: measured on mobile, starting the video immediately
   * pushed LCP from ~3.0s to 3.4–4.5s and the Lighthouse score to 80. Deferring
   * costs nothing visually, because the poster is already the finished frame.
   *
   * Connections that ask for less data, or report themselves as slow, keep the
   * poster and never fetch the video at all.
   */
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !pair) return;

    const connection = (
      navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }
    ).connection;
    if (connection?.saveData || /2g|3g/.test(connection?.effectiveType ?? "")) return;

    const supportsIdle = typeof window.requestIdleCallback === "function";
    let handle = 0;

    const start = () => {
      const run = () => {
        video.src = pair.video;
        video.load();
        video.play()?.catch(() => setFailed(true));
      };
      handle = supportsIdle ? window.requestIdleCallback(run, { timeout: 2500 }) : window.setTimeout(run, 1200);
    };

    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });

    return () => {
      window.removeEventListener("load", start);
      if (!handle) return;
      if (supportsIdle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
    };
  }, [pair]);

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden bg-ivory">
      {/*
        Poster: paints first and is the LCP element.
        <picture> rather than a JS swap, so the browser picks the right file
        while parsing the HTML and downloads exactly one. Choosing it in an
        effect meant phones fetched the landscape poster first and the portrait
        one after hydration — 232KB, and LCP at 2.6s instead of ~1.5s.
      */}
      <picture>
        {!failed && <source media="(min-width: 768px)" srcSet={LANDSCAPE.poster} />}
        <img
          src={failed ? FALLBACK : PORTRAIT.poster}
          alt=""
          width={PORTRAIT.width}
          height={PORTRAIT.height}
          fetchPriority="high"
          className="absolute inset-0 h-full w-full object-cover object-[74%_40%] md:object-[center_40%]"
        />
      </picture>

      {pair && !failed && (
        <video
          ref={videoRef}
          aria-label="Background video"
          muted
          loop
          playsInline
          autoPlay
          preload="none"
          poster={pair.poster}
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[74%_40%] transition-opacity duration-700 ease-zms md:object-[center_40%] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/*
        Legibility scrim. The supplied footage is darker and busier than the
        still it replaces: measured against the video, navy text came in at
        2.56:1. The ivory wash below carries it past AA while leaving the right
        of the frame clear, where there is no text.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(251_246_234/0.9)_0%,rgb(251_246_234/0.82)_55%,rgb(251_246_234/0.9)_100%)] md:bg-[linear-gradient(to_right,rgb(251_246_234/0.95)_0%,rgb(251_246_234/0.9)_34%,rgb(251_246_234/0.55)_58%,rgb(251_246_234/0.12)_82%,rgb(251_246_234/0)_100%)]"
      />
      {/* Soft ivory glow, as on the previous hero */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[radial-gradient(ellipse_85%_55%_at_50%_50%,rgb(251_246_234/0.5)_0%,rgb(251_246_234/0.2)_45%,rgb(251_246_234/0)_78%)] md:bg-[radial-gradient(ellipse_58%_52%_at_34%_52%,rgb(251_246_234/0.55)_0%,rgb(251_246_234/0.25)_50%,rgb(251_246_234/0)_80%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-ivory/0 to-ivory" />
    </div>
  );
}
