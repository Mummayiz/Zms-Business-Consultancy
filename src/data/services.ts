export type ServiceIcon = "administrative" | "marketing" | "project";

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
};

// The three currently marketable services. Full page content is added in Phase 3.
export const services: Service[] = [
  {
    slug: "administrative-consultancy",
    number: "01",
    title: "Administrative Consultancy",
    summary:
      "Organisational structure, processes and policies that make day-to-day operations clearer and more efficient.",
    icon: "administrative",
  },
  {
    slug: "marketing-consultancy",
    number: "02",
    title: "Marketing Consultancy",
    summary:
      "Market research, feasibility studies and positioning, so you know who to reach, what to say and where to focus.",
    icon: "marketing",
  },
  {
    slug: "project-management",
    number: "03",
    title: "Project Management",
    summary:
      "Planning, scope, budget and risk control that keep projects organised and stakeholders informed.",
    icon: "project",
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;
