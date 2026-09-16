import type { ProcessStep } from "@/components/services/ProcessSteps";

export const hero = {
  label: "Abu Dhabi",
  title: "Clear direction for growing businesses",
  text: "Management, marketing and project consultancy that turns ambition into a practical, measurable plan.",
  primary: { label: "Book a consultation", href: "/contact" },
  secondary: { label: "Our services", href: "/services" },
};

export const intro = {
  label: "About ZMS",
  title: "More than consulting. A stronger tomorrow.",
  paragraphs: [
    "ZMS Business Management Consultancy is an Abu Dhabi consultancy that helps organisations run with more structure, reach the right customers and keep their projects under control.",
    "We bring professional management practice and strategic thinking to each engagement, and turn them into practical recommendations your team can act on. The work starts with your business and your goals, and aims at progress that lasts.",
  ],
  link: { label: "More about ZMS", href: "/about" },
};

export const servicesSection = {
  label: "Services",
  title: "Business management consultancy in Abu Dhabi",
  intro:
    "Three focused services for organisations in Abu Dhabi and across the UAE, each built on structure, evidence and a clear plan.",
  linkLabel: "Explore the service",
};

export const signature = {
  label: "The ZMS idea",
  title: ["Structure.", "Strategy.", "Growth."],
  intro:
    "The ZMS mark is built from three ideas: architectural structure, a guiding orbit and vertical growth. The same ideas shape how we work with every client.",
  pillars: [
    {
      glyph: "structure",
      title: "Structure",
      text: "Clear organisation, defined responsibilities and processes that hold up as you grow.",
    },
    {
      glyph: "strategy",
      title: "Strategy",
      text: "Decisions grounded in evidence, and a direction everyone in the business understands.",
    },
    {
      glyph: "growth",
      title: "Growth",
      text: "Practical plans that turn ambition into steady, measurable progress.",
    },
  ] as const,
  showcaseAlt:
    "The ZMS Business Management Consultancy logo set in an Abu Dhabi scene, with a lattice structure, waterfront towers and warm sunlight.",
};

export const approach = {
  label: "How we work",
  title: "A clear path from first conversation to delivery",
  intro:
    "Every engagement follows four stages, so you always know where the work stands and what comes next.",
  link: { label: "See our approach", href: "/approach" },
  steps: [
    {
      title: "Discover",
      text: "We learn how your business works, what you want to achieve and what is holding progress back.",
    },
    {
      title: "Analyse",
      text: "We study the facts — operations, market and data — to find the issues that matter most.",
    },
    {
      title: "Plan",
      text: "We agree a practical plan with clear priorities, responsibilities and measures.",
    },
    {
      title: "Deliver",
      text: "We support implementation and review progress so the plan turns into results.",
    },
  ] satisfies ProcessStep[],
};

type WhyPoint = { title: string; text: string; confirmed: boolean; showLicence?: boolean };

export const why = {
  label: "Why ZMS",
  title: "A professional standard from the first conversation",
  points: [
    {
      title: "Practical recommendations",
      text: "Advice shaped around your resources and your market, written so your team can put it to work.",
      confirmed: true,
    },
    {
      title: "Abu Dhabi licensed consultancy",
      text: "A consultancy licensed and based in Abu Dhabi.",
      confirmed: true,
      // Licence statement comes from site config.
      showLicence: true,
    },
    {
      title: "Client-focused approach",
      text: "We start with your goals and keep you informed at every stage, so decisions stay with you.",
      confirmed: true,
    },
    {
      title: "Professional standards",
      text: "Structured methods, clear documentation and a consistent, professional way of working.",
      confirmed: true,
    },
    // TODO: confirm with client — not shown until confirmed.
    {
      title: "Clear scope and pricing",
      text: "Every engagement starts with an agreed scope and a clear fee before work begins.",
      confirmed: false,
    },
    // TODO: confirm with client — not shown until confirmed.
    {
      title: "Direct senior involvement",
      text: "Senior consultants lead the work from the first meeting to final delivery.",
      confirmed: false,
    },
  ] satisfies WhyPoint[],
};

export const cta = {
  title: "Ready to talk about your business?",
  text: "Book a first consultation.",
  action: { label: "Book a consultation", href: "/contact" },
};
