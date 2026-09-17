import type { Metadata } from "next";
import { approachPage } from "@/data/approach";
import { cta } from "@/data/home";
import { PageHeader } from "@/components/layout/PageHeader";
import { CtaBand } from "@/components/layout/CtaBand";
import { SectionTitle } from "@/components/ui/SectionTitle";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { StageBar } from "@/components/services/StageBar";
import { Reveal } from "@/components/motion/Reveal";

export const metadata: Metadata = {
  title: approachPage.metaTitle,
  description: approachPage.metaDescription,
};

export default function ApproachPage() {
  const { overview, stages } = approachPage;

  return (
    <>
      <PageHeader {...approachPage.header} />

      {/* Overview graphic with the orbit (approved location) */}
      <section aria-labelledby="overview-title" className="section-y">
        <div className="wrap">
          <Reveal>
            <SectionTitle id="overview-title" label={overview.label} title={overview.title} />
          </Reveal>
          <div className="mt-12 lg:mt-16">
            <ProcessSteps steps={overview.steps} />
          </div>
        </div>
      </section>

      {/* Each stage in detail */}
      <section aria-labelledby="stages-title" className="border-t border-navy/12">
        <h2 id="stages-title" className="sr-only">
          {approachPage.stagesTitle}
        </h2>
        {stages.map((stage, i) => (
          <article
            key={stage.title}
            aria-labelledby={`stage-${i}`}
            className={`section-y ${i > 0 ? "border-t border-navy/12" : ""}`}
          >
            <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-8">
              <Reveal className="flex gap-6 lg:col-span-4">
                <StageBar index={i} total={stages.length} />
                <div>
                  <span className="type-label text-charcoal">Stage {String(i + 1).padStart(2, "0")}</span>
                  <h3 id={`stage-${i}`} className="type-section mt-3">
                    {stage.title}
                  </h3>
                  <p className="mt-4 text-[0.9375rem] leading-relaxed">{stage.summary}</p>
                </div>
              </Reveal>

              <Reveal delay={0.1} className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:col-start-6 lg:gap-12">
                <div className="sm:col-span-2">
                  <h4 className="type-label text-navy">What happens</h4>
                  <p className="type-lead measure mt-3">{stage.happens}</p>
                </div>
                <div>
                  <h4 className="type-label text-navy">What you receive</h4>
                  <p className="mt-3 text-[0.9375rem] leading-relaxed">{stage.receives}</p>
                </div>
                <div>
                  <h4 className="type-label text-navy">A typical engagement includes</h4>
                  <ul className="mt-3 flex flex-col gap-2 text-[0.9375rem] leading-relaxed">
                    {stage.includes.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </section>

      <CtaBand {...cta} />
    </>
  );
}
