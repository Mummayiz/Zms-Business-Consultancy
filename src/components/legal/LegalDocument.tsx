import type { LegalPage } from "@/data/legal";
import { site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";

export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader label="Legal" title={page.title} intro={page.intro} />

      <section className="section-y">
        <div className="wrap">
          <article className="measure">
            {site.isPlaceholder && (
              <p className="mb-10 border-l-2 border-navy/28 pl-5 text-[0.9375rem] text-charcoal">
                Draft pending legal review.
              </p>
            )}
            <p className="type-label text-charcoal">Last updated: {page.lastUpdated}</p>

            {page.sections.map((section) => (
              <div key={section.title} className="mt-12">
                <h2 className="font-serif text-[1.875rem] leading-tight font-semibold">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="mt-4 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="mt-4 flex flex-col gap-2">
                    {section.list.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-gold" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </article>
        </div>
      </section>
    </>
  );
}
