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
 * Each video has its own poster, frame zero of that exact file, so the handover
 * is invisible. <picture> picks the poster at parse time and the effect picks
 * the video on mount, so exactly one poster and one video are ever downloaded —
 * and the video never before first paint.
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

/*
 * Frame zero of hero-mobile.mp4 at the size a phone actually paints it: 780px
 * covers a 390px viewport at DPR 2, where the supplied 1080×1920 poster was
 * 128KB of detail no phone could resolve. Both are supplied files, served as
 * given. WebP first, JPEG for anything that cannot read it.
 */
const PORTRAIT = {
  video: "/media/hero-mobile.mp4",
  posterWebp: "/media/hero-poster-mobile-780.webp",
  poster: "/media/hero-poster-mobile-780.jpg",
  width: 780,
  height: 1387,
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
        {!failed && (
          <>
            {/* Desktop first: on ≥768px this wins and nothing below is read. */}
            <source media="(min-width: 768px)" srcSet={LANDSCAPE.poster} />
            {/* Phones: WebP where it is understood, else the <img> JPEG. */}
            <source type="image/webp" srcSet={PORTRAIT.posterWebp} />
          </>
        )}
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
          /*
           * No poster attribute. The <img> above is already frame zero and sits
           * beneath this element, which stays at opacity 0 until it can play, so
           * a poster here would never be seen — but it would still be fetched,
           * and on phones it no longer matches the file <picture> chose. That is
           * a third download of the same frame.
           */
          onCanPlay={() => setReady(true)}
          onError={() => setFailed(true)}
          className={`absolute inset-0 h-full w-full object-cover object-[74%_40%] transition-opacity duration-700 ease-zms md:object-[center_40%] ${
            ready ? "opacity-100" : "opacity-0"
          }`}
        />
      )}

      {/*
        A light wash over the whole frame, and nothing more.

        This layer used to carry the legibility scrim at 0.82–0.95 ivory across
        the full hero, plus a centred radial glow on top. Together they erased
        the footage below about 1200px: at 768px the left two thirds were cream,
        and at 375px only a strip down the right-hand edge survived.

        The wash that makes the headline readable is now scaled to the text
        block instead — `.hero-glow`, rendered inside the content column — so
        this layer only has to take the glare off the footage and settle it
        behind ivory page furniture.
      */}
      <div
        aria-hidden
        className="absolute inset-0 bg-[linear-gradient(to_bottom,rgb(251_246_234/0.34)_0%,rgb(251_246_234/0.14)_38%,rgb(251_246_234/0.24)_100%)] md:bg-[linear-gradient(to_right,rgb(251_246_234/0.3)_0%,rgb(251_246_234/0.16)_46%,rgb(251_246_234/0.04)_76%,rgb(251_246_234/0)_100%)]"
      />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-40 bg-linear-to-b from-ivory/0 to-ivory" />
    </div>
  );
}
