import { pageMetadata } from "@/lib/seo";
import { about } from "@/data/pages";
import { cta } from "@/data/home";
import { licenceFull, site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { Card } from "@/components/ui/Card";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: about.metaTitle,
  description: about.metaDescription,
  path: "/about",
});

export default function AboutPage() {
  return (
    <>
      <PageHeader {...about.header} />

      {/* Who ZMS is */}
      <section aria-labelledby="who-title" className="section-y">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="who-title" label={about.who.label} title={about.who.title} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7 lg:border-l lg:border-navy/12 lg:pl-12">
            {about.who.paragraphs.map((p) => (
              <p key={p} className="type-lead measure mb-5 last:mb-0">
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Mission and vision */}
      <section aria-label="Mission and vision" className="border-t border-navy/12">
        <div className="wrap grid lg:grid-cols-2">
          {[about.mission, about.vision].map((block, i) => (
            <Reveal
              key={block.label}
              delay={i * 0.1}
              className={`py-14 lg:py-20 ${i === 0 ? "lg:pr-16" : "border-t border-navy/12 lg:border-t-0 lg:border-l lg:pl-16"}`}
            >
              <h2 className="type-label flex items-center gap-4 text-navy">
                {block.label}
                <span className="rule-taper" aria-hidden />
              </h2>
              <p className="mt-6 font-serif text-[clamp(1.625rem,1.3rem+1vw,2.25rem)] leading-snug font-semibold text-navy">
                {block.text}
              </p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" className="section-y border-t border-navy/12">
        <div className="wrap">
          <Reveal>
            <SectionTitle id="values-title" label={about.values.label} title={about.values.title} />
          </Reveal>
          <RevealGroup as="ul" className="mt-12 grid gap-6 sm:grid-cols-2 lg:mt-16 lg:grid-cols-4">
            {about.values.items.map((value, i) => (
              <RevealItem as="li" key={value.title}>
                <Card className="h-full">
                  {/* Rising marker: one slim bar per value, each taller than the last */}
                  <div aria-hidden className="flex h-10 items-end">
                    <span className="w-2 bg-gold" style={{ height: `${40 + i * 20}%` }} />
                  </div>
                  <h3 className="type-card mt-6">{value.title}</h3>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed">{value.text}</p>
                </Card>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Licensing */}
      <section aria-labelledby="licensing-title" className="section-y border-t border-navy/12">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <SectionTitle id="licensing-title" label={about.licensing.label} title={about.licensing.title} />
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-6 lg:col-start-7">
            <Card tone="white">
              <dl className="divide-y divide-navy/12">
                <div className="pb-5">
                  <dt className="type-label text-charcoal">Company</dt>
                  <dd className="mt-2 font-medium text-navy">{site.legalName}</dd>
                </div>
                <div className="py-5">
                  <dt className="type-label text-charcoal">Location</dt>
                  <dd className="mt-2 font-medium text-navy">{site.location}</dd>
                </div>
                <div className="pt-5">
                  <dt className="type-label text-charcoal">Licence</dt>
                  <dd className="mt-2 font-medium text-navy">{licenceFull}</dd>
                </div>
              </dl>
            </Card>
          </Reveal>
        </div>
      </section>

      <CtaBand {...cta} />
    </>
  );
}
