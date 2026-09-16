import { why } from "@/data/home";
import { licenceFull } from "@/config/site";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export function WhyZms() {
  // Unconfirmed commitments stay in data but are never presented as fact.
  const points = why.points.filter((p) => p.confirmed);

  return (
    <section aria-labelledby="why-title" className="section-y border-t border-navy/12">
      <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
        <Reveal className="lg:col-span-4">
          <SectionTitle id="why-title" label={why.label} title={why.title} />
        </Reveal>

        <RevealGroup as="ul" className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-y-14">
          {points.map((point) => (
            <RevealItem as="li" key={point.title} className="border-l-2 border-gold pl-6">
              <h3 className="font-serif text-[1.625rem] leading-tight font-semibold">{point.title}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed">{point.text}</p>
              {"showLicence" in point && point.showLicence && (
                <p className="mt-3 text-[0.8125rem] leading-relaxed font-medium text-navy">{licenceFull}.</p>
              )}
            </RevealItem>
          ))}
        </RevealGroup>
      </div>
    </section>
  );
}
