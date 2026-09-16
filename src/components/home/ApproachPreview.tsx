import { approach } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TextLink } from "@/components/ui/TextLink";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { Reveal } from "@/components/motion/Reveal";

export function ApproachPreview() {
  return (
    <section aria-labelledby="approach-title" className="section-y">
      <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <SectionTitle id="approach-title" label={approach.label} title={approach.title} intro={approach.intro} />
          <TextLink href={approach.link.href} className="mt-8">
            {approach.link.label}
          </TextLink>
        </Reveal>

        <div className="lg:col-span-8 lg:pt-4">
          <ProcessSteps steps={approach.steps} />
        </div>
      </div>
    </section>
  );
}
