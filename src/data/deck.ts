import { services, serviceHref } from "./services";
import { site, licenceFull } from "@/config/site";

/*
 * Home deck content: seven slides.
 *
 * Copy and objectives are unchanged from the previous Home page — only the
 * presentation is restructured. Nothing here states a statistic, a client
 * count, a track record or anything about construction.
 */

export type HeadlinePart = { text: string; italic?: boolean; accent?: boolean; break?: boolean };

/**
 * Slide identity: the anchor each slide is reached by, and its position in the
 * sequence. The labels and Roman numerals that used to sit here went with the
 * deck chrome.
 */
export const slides = [
  { id: "hero", number: "01" },
  { id: "firm", number: "02" },
  { id: "services", number: "03" },
  { id: "signature", number: "04" },
  { id: "approach", number: "05" },
  { id: "standing", number: "06" },
  { id: "contact", number: "07" },
] as const;

export const heroSlide = {
  headline: [
    { text: "Clear " },
    { text: "direction", italic: true, accent: true },
    { text: "for growing businesses", break: true },
  ] satisfies HeadlinePart[],
  text: "Management, marketing and project consultancy that turns ambition into a practical, measurable plan.",
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "Our services", href: "/services" },
  scrollCue: "Begin",
};

export const firmSlide = {
  eyebrow: "The firm · Who we are",
  headline: [
    { text: "More than consulting." },
    { text: "A " , break: true },
    { text: "stronger", italic: true, accent: true },
    { text: " tomorrow." },
  ] satisfies HeadlinePart[],
  paragraphs: [
    "ZMS Business Management Consultancy is an Abu Dhabi consultancy that helps organisations run with more structure, reach the right customers and keep their projects under control.",
    "We bring professional management practice and strategic thinking to each engagement, and turn them into practical recommendations your team can act on. The work starts with your business and your goals, and aims at progress that lasts.",
  ],
  link: { label: "More about ZMS", href: "/about" },
};

/*
 * Only values that are true and verifiable. No growth figures, client counts,
 * years of experience, team size or project counts — and no founding year.
 */
export const facts = [
  { value: "04", caption: "Licensed activities" },
  { value: "03", caption: "Services offered" },
  { value: "04", caption: "Stages in every engagement" },
  { value: site.licence, caption: "Abu Dhabi economic licence" },
];

export const servicesSlide = {
  eyebrow: "Services · What we do",
  headline: [
    { text: "Business management" },
    { text: "consultancy in ", break: true },
    { text: "Abu Dhabi", italic: true, accent: true },
  ] satisfies HeadlinePart[],
  intro:
    "Three focused services for organisations in Abu Dhabi and across the UAE. Choose one to see what it covers.",
  /** Tile plus detail panel content, drawn from the service data. */
  items: services.map((service) => ({
    slug: service.slug,
    number: service.number,
    title: service.title,
    summary: service.summary,
    bullets: service.deliverables.slice(0, 3).map((d) => d.title),
    href: serviceHref(service.slug),
  })),
  linkLabel: "Explore the service",
};

export const signatureSlide = {
  eyebrow: "The ZMS idea",
  headline: [
    { text: "Structure." },
    { text: "Strategy.", break: true },
    { text: "Growth.", italic: true, accent: true, break: true },
  ] satisfies HeadlinePart[],
};

export const approachSlide = {
  eyebrow: "Approach · How we work",
  headline: [
    { text: "A " },
    { text: "clear path", italic: true, accent: true },
    { text: "from first conversation", break: true },
    { text: "to delivery", break: true },
  ] satisfies HeadlinePart[],
  intro:
    "Every engagement follows four stages, so you always know where the work stands and what comes next.",
  link: { label: "See our approach", href: "/approach" },
};

export const standingSlide = {
  eyebrow: "Standing · Why ZMS",
  headline: [
    { text: "A " },
    { text: "professional standard", italic: true, accent: true },
    { text: "from the first conversation", break: true },
  ] satisfies HeadlinePart[],
  licensing: {
    eyebrow: "Licensing",
    title: "A licensed Abu Dhabi consultancy",
    lines: [site.legalName, site.location, licenceFull],
  },
};

export const contactSlide = {
  eyebrow: "Get in touch · Start here",
  headline: [
    { text: "Three ways" },
    { text: "to ", break: true },
    { text: "start", italic: true, accent: true },
    { text: "." },
  ] satisfies HeadlinePart[],
  intro: "Tell us which service fits, and the enquiry form opens with it selected.",
  paths: services.map((service) => ({
    number: service.number,
    title: service.title,
    text: service.summary,
    href: `/contact?service=${encodeURIComponent(service.title)}`,
  })),
};
