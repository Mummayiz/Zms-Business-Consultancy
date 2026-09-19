import { features } from "@/config/features";

/*
 * Fine noise over navy surfaces, so large dark areas do not read as flat.
 *
 * An inline SVG turbulence tile, repeated — no image file, no JavaScript, and
 * small enough (160px) that the filter is rasterised once rather than across a
 * full-width band. Blended in overlay at 3.5%, it modulates the navy's own
 * luminance instead of laying grey over it.
 */
const NOISE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='160' height='160'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='160' height='160' filter='url(%23n)'/%3E%3C/svg%3E";

export function Grain({ className = "" }: { className?: string }) {
  if (!features.grain) return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute inset-0 hidden opacity-[0.035] mix-blend-overlay md:block ${className}`}
      style={{ backgroundImage: `url("${NOISE}")`, backgroundSize: "160px 160px" }}
    />
  );
}
