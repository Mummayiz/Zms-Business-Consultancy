import Link from "next/link";
import type { ReactNode } from "react";
import { ArchitecturalBars } from "@/components/brand/ArchitecturalBars";
import { RevealGroup } from "@/components/motion/Reveal";

type PageHeaderProps = {
  title: ReactNode;
  intro?: ReactNode;
  label?: string;
  /** Optional parent link shown as the label, e.g. back to Services. */
  labelHref?: string;
};

/**
 * Plain navy page header with an H1, a short intro and low-contrast
 * architectural bars rising at the right edge. No photography, no orbit.
 */
export function PageHeader({ title, intro, label, labelHref }: PageHeaderProps) {
  return (
    <header className="surface-navy relative overflow-hidden bg-navy text-ivory">
      <div className="wrap relative grid gap-10 pt-16 pb-16 lg:grid-cols-12 lg:gap-8 lg:pt-24 lg:pb-24">
        <div className="lg:col-span-8">
          {label && (
            <p className="type-label flex items-center gap-4 text-gold">
              {labelHref ? (
                <Link href={labelHref} className="transition-colors duration-200 hover:text-ivory">
                  {label}
                </Link>
              ) : (
                label
              )}
              <span className="rule-taper" aria-hidden />
            </p>
          )}
          <h1 className="type-hero mt-6 text-ivory">{title}</h1>
          {intro && <p className="type-lead measure mt-6 text-ivory">{intro}</p>}
        </div>

        {/* Bars sit fully inside the navy band rather than running off its edge */}
        <RevealGroup className="absolute right-8 bottom-10 hidden h-[58%] w-[220px] lg:block xl:w-[260px]">
          <ArchitecturalBars
            heights={[38, 58, 80, 100]}
            tone="navy"
            className="grid h-full grid-cols-4 gap-4"
            barClassName="w-full"
          />
        </RevealGroup>
      </div>
    </header>
  );
}
