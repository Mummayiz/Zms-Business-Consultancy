import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getService, serviceHref, services } from "@/data/services";
import { pageMetadata } from "@/lib/seo";
import { cta } from "@/data/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Icon } from "@/components/ui/Icon";
import { FAQ } from "@/components/ui/FAQ";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

// Only the three marketable services exist; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return services.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: PageProps<"/services/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  return pageMetadata({
    title: service.title,
    description: service.metaDescription,
    path: serviceHref(service.slug),
  });
}

export default async function ServicePage({ params }: PageProps<"/services/[slug]">) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  return (
    <>
      <PageHeader label="Services" labelHref="/services" title={service.title} intro={service.intro} />

      {/* Overview */}
      <section aria-labelledby="overview-title" className="section-y">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="overview-title" label="Overview" title={`How ${service.title} helps`} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-navy/12 lg:pt-14 lg:pl-12">
            {service.overview.map((p) => (
              <p key={p} className="type-lead measure mb-5 last:mb-0">
                {p}
              </p>
            ))}
            {service.note && (
              <p className="measure mt-8 border-l-2 border-navy/28 pl-5 text-[0.9375rem] leading-relaxed text-charcoal">
                {service.note}
              </p>
            )}
          </Reveal>
        </div>
      </section>

      {/* What we deliver */}
      <section aria-labelledby="deliver-title" className="section-y border-t border-navy/12">
        <div className="wrap">
          <Reveal>
            <SectionTitle id="deliver-title" label="Scope" title="What we deliver" />
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:mt-16 lg:grid-cols-3">
            {service.deliverables.map((item) => (
              <RevealItem as="li" key={item.title} className="border-t border-navy/12 pt-8">
                <Icon name={item.icon} className="h-8 w-8 text-gold" />
                <h3 className="type-card mt-6">{item.title}</h3>
                <p className="mt-3 text-[0.9375rem] leading-relaxed">{item.text}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who it's for */}
      <section aria-labelledby="audience-title" className="surface-navy section-y bg-navy text-ivory">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="audience-title" tone="navy" label="Who it's for" title="Who this service is for" />
          </Reveal>
          <RevealGroup as="ul" className="lg:col-span-6 lg:col-start-7">
            {service.audience.map((line) => (
              <RevealItem
                as="li"
                key={line}
                className="flex items-start gap-5 border-b border-ivory/16 py-5 first:pt-0 lg:first:pt-5"
              >
                <span aria-hidden className="mt-1 h-5 w-0.5 shrink-0 bg-gold" />
                <span className="type-lead text-ivory">{line}</span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* How the engagement works */}
      <section aria-labelledby="engagement-title" className="section-y">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <SectionTitle
              id="engagement-title"
              label="Engagement"
              title="How the engagement works"
              intro="The same four stages as every ZMS engagement, applied to this service."
            />
          </Reveal>
          <div className="lg:col-span-8 lg:pt-4">
            <ProcessSteps steps={service.engagement} orbit={false} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section aria-labelledby="faq-title" className="section-y border-t border-navy/12">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <SectionTitle id="faq-title" label="FAQ" title="Common questions" />
          </Reveal>
          <div className="lg:col-span-8">
            <FAQ items={service.faqs} />
          </div>
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
