import Image from "next/image";
// Imported as a module so Next knows the intrinsic size and can generate a
// blur placeholder; the 2.1MB PNG is served as a much smaller AVIF/WebP.
import conceptArtwork from "../../../public/brand/zms-logo-concept-original.png";
import { Reveal } from "@/components/motion/Reveal";

/**
 * The one-time showcase of the original concept artwork (logo in the Abu Dhabi scene).
 * Shown at its original square proportions, never cropped, with nothing laid over it.
 * Use once across the whole site.
 */
export function BrandShowcase({ alt, className = "" }: { alt: string; className?: string }) {
  return (
    <figure className={className}>
      <div className="rounded-card border border-gold p-2 sm:p-3">
        <div className="overflow-hidden rounded-[6px]">
          <Reveal variant="scaleIn">
            <Image
              src={conceptArtwork}
              alt={alt}
              placeholder="blur"
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, calc(100vw - 48px)"
              className="block h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </figure>
  );
}
