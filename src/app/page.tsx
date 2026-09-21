import { pageMetadata } from "@/lib/seo";
import {
  approachSlide,
  contactSlide,
  firmSlide,
  heroSlide,
  servicesSlide,
  signatureSlide,
  standingSlide,
} from "@/data/deck";
import { approach, cta, signature, why } from "@/data/home";
import { licenceFull, site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { TextLink } from "@/components/ui/TextLink";
import { CtaBand } from "@/components/layout/CtaBand";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { ProcessSteps } from "@/components/services/ProcessSteps";
import { BrandShowcase } from "@/components/brand/BrandShowcase";
import { Orbit } from "@/components/brand/Orbit";
import { HeroVideo } from "@/components/home/HeroVideo";
import { HeroDivider } from "@/components/home/HeroDivider";
import { TearGate } from "@/components/home/TearGate";
import { ServiceSelector } from "@/components/home/ServiceSelector";
import { PathsForward } from "@/components/home/PathsForward";
import { Slide } from "@/components/home/deck/Slide";
import { Eyebrow } from "@/components/home/deck/Eyebrow";
import { DisplayHeading } from "@/components/home/deck/DisplayHeading";
import { FactsRow } from "@/components/home/deck/FactsRow";
import { CornerPanel } from "@/components/home/deck/CornerPanel";

export const metadata = pageMetadata({
  absoluteTitle: "ZMS Business Management Consultancy | Abu Dhabi, UAE",
  description:
    "Business management consultancy in Abu Dhabi. Administrative consultancy, marketing consultancy and project management services that turn ambition into a practical, measurable plan.",
  path: "/",
});

export default function HomePage() {
  const confirmedPoints = why.points.filter((point) => point.confirmed);

  return (
    <>
      <TearGate />

      {/* 01 — Hero */}
      <Slide
        id="hero"
        labelledBy="hero-title"
        className="isolate border-t-0"
        contentClassName="py-10 pb-20 lg:pb-10"
        background={<HeroVideo />}
        overlay={
          <a
            href="#firm"
            className="type-label absolute inset-x-0 bottom-6 mx-auto flex w-fit items-center gap-3 text-navy lg:bottom-12"
          >
            {heroSlide.scrollCue}
            <span aria-hidden className="h-px w-12 bg-gold" />
            <span aria-hidden className="deck-cue">
              ↓
            </span>
          </a>
        }
      >
        <div className="max-w-[48rem]">
          {/*
            The deck brief calls for a gold accent on the video hero, as the
            reference has. Ours reads against a bright scene behind an ivory
            glow, where gold measures ~2.4:1 — the contrast the master brief
            forbids outright. The accent is italic navy here instead.
          */}
          <div className="hero-mask">
            <DisplayHeading as="h1" id="hero-title" parts={heroSlide.headline} tone="light" focusable />
          </div>

          <p
            className="type-lead hero-step mt-8 max-w-[52ch] text-charcoal"
            style={{ "--i": 2 } as React.CSSProperties}
          >
            {heroSlide.text}
          </p>

          <div className="hero-step mt-10 flex flex-wrap gap-4" style={{ "--i": 3 } as React.CSSProperties}>
            <ButtonLink href={heroSlide.primary.href} variant="primary">
              {heroSlide.primary.label}
            </ButtonLink>
            <ButtonLink href={heroSlide.secondary.href} variant="secondary">
              {heroSlide.secondary.label}
            </ButtonLink>
          </div>
        </div>

        <HeroDivider />
      </Slide>

      {/* 02 — The firm */}
      <Slide id="firm" labelledBy="firm-title">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <Eyebrow>{firmSlide.eyebrow}</Eyebrow>
            <DisplayHeading id="firm-title" parts={firmSlide.headline} className="mt-8" />
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-5 lg:col-start-8 lg:pt-4">
            {firmSlide.paragraphs.map((paragraph) => (
              <p key={paragraph} className="type-lead measure mb-6 last:mb-0">
                {paragraph}
              </p>
            ))}
            <TextLink href={firmSlide.link.href} className="mt-6">
              {firmSlide.link.label}
            </TextLink>
          </Reveal>
        </div>

        <Reveal delay={0.2}>
          <FactsRow className="mt-20 lg:mt-24" />
        </Reveal>
      </Slide>

      {/* 03 — Services */}
      <Slide id="services" labelledBy="services-title">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-7">
            <Eyebrow>{servicesSlide.eyebrow}</Eyebrow>
            <DisplayHeading id="services-title" parts={servicesSlide.headline} size="md" className="mt-8" />
          </Reveal>
          <Reveal delay={0.12} className="lg:col-span-4 lg:col-start-9 lg:pt-6">
            <p className="type-lead measure">{servicesSlide.intro}</p>
          </Reveal>
        </div>

        <Reveal delay={0.18} className="mt-16">
          <ServiceSelector />
        </Reveal>
      </Slide>

      {/* 04 — Signature */}
      <Slide id="signature" tone="dark" labelledBy="signature-title">
        <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-6">
            <BrandShowcase alt={signature.showcaseAlt} />
          </Reveal>

          <div className="lg:col-span-5 lg:col-start-8">
            <Reveal>
              <Eyebrow tone="dark">{signatureSlide.eyebrow}</Eyebrow>
              <DisplayHeading id="signature-title" parts={signatureSlide.headline} tone="dark" className="mt-8" />
            </Reveal>

            <Orbit variant="signature" delay={0.3} className="mt-6 h-[90px] w-full lg:-ml-16 lg:w-[calc(100%+4rem)]" />

            <Reveal delay={0.18}>
              <p className="type-lead measure mt-4 text-ivory">{signature.intro}</p>
            </Reveal>

            <RevealGroup as="ul" delay={0.24} className="mt-10 border-t border-ivory/16">
              {signature.pillars.map((pillar) => (
                <RevealItem as="li" key={pillar.title} className="border-b border-ivory/16 py-6">
                  <h3 className="font-serif text-2xl leading-tight font-semibold text-ivory">{pillar.title}</h3>
                  <p className="mt-2 text-[0.9375rem] leading-relaxed text-ivory">{pillar.text}</p>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </Slide>

      {/* 05 — Approach */}
      <Slide id="approach" labelledBy="approach-title">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-4">
            <Eyebrow>{approachSlide.eyebrow}</Eyebrow>
            <DisplayHeading id="approach-title" parts={approachSlide.headline} size="md" className="mt-8" />
            <p className="type-lead measure mt-8">{approachSlide.intro}</p>
            <TextLink href={approachSlide.link.href} className="mt-8">
              {approachSlide.link.label}
            </TextLink>
          </Reveal>

          <div className="lg:col-span-7 lg:col-start-6 lg:pt-6">
            <ProcessSteps steps={approach.steps} />
          </div>
        </div>
      </Slide>

      {/* 06 — Standing */}
      <Slide id="standing" labelledBy="standing-title">
        <Reveal className="max-w-[46rem]">
          <Eyebrow>{standingSlide.eyebrow}</Eyebrow>
          <DisplayHeading id="standing-title" parts={standingSlide.headline} size="md" className="mt-8" />
        </Reveal>

        <RevealGroup as="ul" delay={0.12} className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <RevealItem as="li" className="sm:col-span-2 lg:col-span-1">
            <CornerPanel eyebrow={standingSlide.licensing.eyebrow} title={standingSlide.licensing.title}>
              <ul className="flex flex-col gap-2">
                <li className="font-medium text-navy">{site.legalName}</li>
                <li>{site.location}</li>
                <li>{licenceFull}</li>
              </ul>
            </CornerPanel>
          </RevealItem>

          {confirmedPoints.map((point) => (
            <RevealItem as="li" key={point.title}>
              <CornerPanel title={point.title} divider={false}>
                <p>{point.text}</p>
              </CornerPanel>
            </RevealItem>
          ))}
        </RevealGroup>
      </Slide>

      {/* 07 — Get in touch */}
      <Slide id="contact" labelledBy="contact-title" className="pb-0">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <Eyebrow>{contactSlide.eyebrow}</Eyebrow>
            <DisplayHeading id="contact-title" parts={contactSlide.headline} className="mt-8" />
            <p className="type-lead measure mt-8">{contactSlide.intro}</p>
          </Reveal>

          <Reveal delay={0.12} className="lg:col-span-6 lg:col-start-7">
            <PathsForward />
          </Reveal>
        </div>
      </Slide>

      <CtaBand {...cta} />
    </>
  );
}
