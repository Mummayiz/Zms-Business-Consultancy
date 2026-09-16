import Image from "next/image";
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
              src="/brand/zms-logo-concept-original.png"
              alt={alt}
              width={1254}
              height={1254}
              sizes="(min-width: 1280px) 600px, (min-width: 1024px) 48vw, calc(100vw - 48px)"
              className="block h-auto w-full"
            />
          </Reveal>
        </div>
      </div>
    </figure>
  );
}
