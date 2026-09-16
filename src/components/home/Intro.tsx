import { intro } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TextLink } from "@/components/ui/TextLink";
import { Reveal } from "@/components/motion/Reveal";

export function Intro() {
  return (
    <section aria-labelledby="intro-title" className="section-y">
      <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-5">
          <SectionTitle id="intro-title" label={intro.label} title={intro.title} />
        </Reveal>

        <Reveal
          delay={0.1}
          className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-navy/12 lg:pt-14 lg:pl-12"
        >
          {intro.paragraphs.map((p) => (
            <p key={p} className="type-lead measure mb-5 last:mb-0">
              {p}
            </p>
          ))}
          <TextLink href={intro.link.href} className="mt-8">
            {intro.link.label}
          </TextLink>
        </Reveal>
      </div>
    </section>
  );
}
