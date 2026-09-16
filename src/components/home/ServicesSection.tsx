import { servicesSection } from "@/data/home";
import { services } from "@/data/services";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";

// Desktop columns step upward left to right, like the rising bars of the mark.
const rise = ["lg:pt-24", "lg:pt-12", "lg:pt-0"];

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

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-3 lg:gap-0">
          {services.map((service, i) => (
            <Reveal
              key={service.slug}
              delay={i * 0.12}
              className={`${rise[i]} lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-navy/12`}
            >
              <ServiceCard service={service} linkLabel={servicesSection.linkLabel} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
