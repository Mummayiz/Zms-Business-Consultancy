import type { Metadata } from "next";
import { servicesOverview } from "@/data/pages";
import { cta } from "@/data/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { TextLink } from "@/components/ui/TextLink";
import { ServicesGrid } from "@/components/services/ServicesGrid";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: servicesOverview.metaTitle,
  description: servicesOverview.metaDescription,
};

export default function ServicesPage() {
  const { together } = servicesOverview;

  return (
    <>
      <PageHeader {...servicesOverview.header} />

      <section aria-labelledby="service-list-title" className="section-y">
        <div className="wrap">
          <h2 id="service-list-title" className="sr-only">
            {servicesOverview.listTitle}
          </h2>
          <ServicesGrid />
        </div>
      </section>

      <section aria-labelledby="together-title" className="section-y border-t border-navy/12">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="together-title" label={together.label} title={together.title} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-navy/12 lg:pt-14 lg:pl-12">
            {together.paragraphs.map((p) => (
              <p key={p} className="type-lead measure mb-5 last:mb-0">
                {p}
              </p>
            ))}
            <TextLink href={together.link.href} className="mt-8">
              {together.link.label}
            </TextLink>
          </Reveal>
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
