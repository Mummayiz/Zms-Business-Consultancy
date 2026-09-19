import { ButtonLink } from "@/components/ui/Button";
import { Grain } from "@/components/ui/Grain";
import { PointerLight } from "@/components/ui/PointerLight";
import { Reveal } from "@/components/motion/Reveal";

type CtaBandProps = {
  title: string;
  text: string;
  action: { label: string; href: string };
};

export function CtaBand({ title, text, action }: CtaBandProps) {
  return (
    <section aria-labelledby="cta-title" className="surface-navy relative overflow-hidden bg-navy text-ivory">
      <PointerLight />
      <Grain />
      <div className="wrap relative py-16 lg:py-24">
        <Reveal className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <div>
            <span className="rule-taper mb-6 w-16" aria-hidden />
            <h2 id="cta-title" className="type-section text-ivory">
              {title}
            </h2>
            <p className="type-lead mt-4 text-ivory">{text}</p>
          </div>
          <ButtonLink href={action.href} variant="onNavy" className="self-start lg:self-auto">
            {action.label}
          </ButtonLink>
        </Reveal>
      </div>
    </section>
  );
}
