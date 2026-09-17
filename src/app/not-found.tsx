import type { Metadata } from "next";
import { notFound } from "@/data/pages";
import { robotsMeta } from "@/lib/seo";
import { ButtonLink } from "@/components/ui/Button";

export const metadata: Metadata = {
  title: notFound.title,
  robots: robotsMeta(true),
};

export default function NotFound() {
  return (
    <section aria-labelledby="not-found-title" className="section-y">
      <div className="wrap grid items-end gap-12 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-7">
          <p className="type-label flex items-center gap-4 text-navy">
            {notFound.label}
            <span className="rule-taper" aria-hidden />
          </p>
          <h1 id="not-found-title" className="type-hero mt-6">
            {notFound.title}
          </h1>
          <p className="type-lead measure mt-6">{notFound.text}</p>
          <div className="mt-10 flex flex-wrap gap-4">
            <ButtonLink href="/" variant="primary">
              Go to the home page
            </ButtonLink>
            <ButtonLink href="/services" variant="secondary">
              Our services
            </ButtonLink>
          </div>
        </div>

        {/* Four bars, the last one missing: the path that is not there */}
        <div aria-hidden className="hidden h-56 items-end gap-6 lg:col-span-4 lg:col-start-9 lg:flex">
          {[34, 56, 78].map((h) => (
            <span
              key={h}
              className="block w-10 bg-navy"
              style={{ height: `${h}%`, clipPath: "polygon(0 0, 100% 14px, 100% 100%, 0 100%)" }}
            />
          ))}
          {/* The fourth step: gold, but not yet reached */}
          <span
            className="block h-full w-10 bg-gold/40"
            style={{ clipPath: "polygon(0 0, 100% 14px, 100% 100%, 0 100%)" }}
          />
        </div>
      </div>
    </section>
  );
}
