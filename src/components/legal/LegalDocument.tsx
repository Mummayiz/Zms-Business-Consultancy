import type { LegalPage } from "@/data/legal";
import { site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";

const slug = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

export function LegalDocument({ page }: { page: LegalPage }) {
  return (
    <>
      <PageHeader label="Legal" title={page.title} intro={page.intro} />

      <section className="section-y">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:gap-8">
          <article className="lg:col-span-7">
            {site.isPlaceholder && (
              <p className="mb-10 border-l-2 border-navy/40 pl-5 text-[0.9375rem] text-charcoal">
                Draft pending legal review.
              </p>
            )}
            <p className="type-label text-charcoal">Last updated: {page.lastUpdated}</p>

            {page.sections.map((section) => (
              <div key={section.title} className="mt-12 scroll-mt-32" id={slug(section.title)}>
                <h2 className="font-serif text-[1.875rem] leading-tight font-semibold">{section.title}</h2>
                {section.paragraphs.map((p) => (
                  <p key={p} className="measure mt-4 leading-relaxed">
                    {p}
                  </p>
                ))}
                {section.list && (
                  <ul className="measure mt-4 flex flex-col gap-2">
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

          {/* Section index, sticky beside the prose on wide screens */}
          <nav aria-labelledby="doc-index" className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-32 border-t border-navy/12 pt-6">
              <h2 id="doc-index" className="type-label text-navy">
                On this page
              </h2>
              <ol className="mt-5 flex flex-col gap-3">
                {page.sections.map((section) => (
                  <li key={section.title}>
                    <a
                      href={`#${slug(section.title)}`}
                      className="flex gap-3 border-l-2 border-transparent pl-4 text-[0.9375rem] leading-snug text-charcoal transition-colors duration-200 hover:border-gold hover:text-navy"
                    >
                      {section.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
        </div>
      </section>
    </>
  );
}
