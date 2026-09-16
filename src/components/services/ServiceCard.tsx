import Link from "next/link";
import { ArrowRight, ChartGantt, ChartNoAxesColumnIncreasing, Network } from "lucide-react";
import type { Service, ServiceIcon } from "@/data/services";
import { serviceHref } from "@/data/services";

const icons: Record<ServiceIcon, typeof Network> = {
  administrative: Network,
  marketing: ChartNoAxesColumnIncreasing,
  project: ChartGantt,
};

type ServiceCardProps = {
  service: Service;
  linkLabel?: string;
  className?: string;
};

/**
 * Editorial service column: a hairline top edge that fills with gold on hover,
 * a large numeral, line icon, title, summary and link. The whole card is clickable
 * through the link's stretched hit area.
 */
export function ServiceCard({ service, linkLabel = "Explore the service", className = "" }: ServiceCardProps) {
  const Icon = icons[service.icon];

  return (
    <article className={`group relative flex h-full flex-col border-t border-navy/12 pt-8 ${className}`}>
      <span
        aria-hidden
        className="absolute -top-px left-0 h-0.5 w-full origin-left scale-x-0 bg-gold transition-transform duration-300 ease-zms group-hover:scale-x-100 group-focus-within:scale-x-100"
      />
      <div className="flex items-start justify-between gap-6">
        <span
          aria-hidden
          className="font-serif text-5xl leading-none font-medium text-navy lining-nums transition-transform duration-300 ease-zms group-hover:-translate-y-1"
        >
          {service.number}
        </span>
        <Icon aria-hidden strokeWidth={1.25} className="h-9 w-9 text-gold" />
      </div>

      <h3 className="type-card mt-10">{service.title}</h3>
      <p className="mt-4 max-w-[38ch] text-[0.9375rem] leading-relaxed">{service.summary}</p>

      <Link
        href={serviceHref(service.slug)}
        className="mt-8 inline-flex items-center gap-2 self-start border-b border-gold pb-1 text-[0.875rem] font-semibold text-navy after:absolute after:inset-0 after:content-['']"
      >
        {linkLabel}
        <span className="sr-only">: {service.title}</span>
        <ArrowRight
          aria-hidden
          strokeWidth={1.75}
          className="h-4 w-4 transition-transform duration-200 ease-zms group-hover:translate-x-1"
        />
      </Link>
    </article>
  );
}
