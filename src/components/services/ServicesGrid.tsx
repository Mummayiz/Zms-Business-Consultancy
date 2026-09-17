import { services } from "@/data/services";
import { ServiceCard } from "@/components/services/ServiceCard";
import { Reveal } from "@/components/motion/Reveal";

export function ServicesGrid({ linkLabel, className = "" }: { linkLabel?: string; className?: string }) {
  return (
    // All three columns share one top edge, so the card top rules line up.
    <div className={`grid gap-14 lg:grid-cols-3 lg:gap-0 ${className}`}>
      {services.map((service, i) => (
        <Reveal
          key={service.slug}
          delay={i * 0.12}
          className="lg:px-8 lg:first:pl-0 lg:last:pr-0 lg:[&:not(:first-child)]:border-l lg:[&:not(:first-child)]:border-navy/12"
        >
          <ServiceCard service={service} linkLabel={linkLabel} />
        </Reveal>
      ))}
    </div>
  );
}
