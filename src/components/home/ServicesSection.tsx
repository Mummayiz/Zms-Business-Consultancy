import { servicesSection } from "@/data/home";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesSection() {
  return (
    <section aria-labelledby="services-title" className="section-y border-t border-navy/12">
      <div className="wrap">
        <Reveal className="lg:grid lg:grid-cols-12 lg:gap-8">
          <SectionTitle
            id="services-title"
            label={servicesSection.label}
            title={servicesSection.title}
            intro={servicesSection.intro}
            className="lg:col-span-8"
          />
        </Reveal>

        <ServicesGrid linkLabel={servicesSection.linkLabel} className="mt-14 lg:mt-20" />
      </div>
    </section>
  );
}
