import type { IconName } from "@/components/ui/Icon";
import type { ProcessStep } from "@/components/services/ProcessSteps";

export type ServiceIcon = "administrative" | "marketing" | "project";

export type Deliverable = { title: string; text: string; icon: IconName };
export type Faq = { question: string; answer: string };

export type Service = {
  slug: string;
  number: string;
  title: string;
  summary: string;
  icon: ServiceIcon;
  metaDescription: string;
  intro: string;
  overview: string[];
  /** Optional regulatory note shown in the overview. */
  note?: string;
  deliverables: Deliverable[];
  audience: string[];
  engagement: ProcessStep[];
  faqs: Faq[];
};

const gettingStarted: Faq = {
  question: "How do we get started?",
  answer:
    "Book a consultation. We will talk through your situation and what you want to achieve, then propose a scope for the work.",
};

// The three currently marketable services. Max six deliverables each; every
// item from the brief is still named, with related items grouped.
export const services: Service[] = [
  {
    slug: "administrative-consultancy",
    number: "01",
    title: "Administrative Consultancy",
    summary:
      "Organisational structure, processes and policies that make day-to-day operations clearer and more efficient.",
    icon: "administrative",
    metaDescription:
      "Administrative consultancy in Abu Dhabi: organisational structure, process improvement, policies and procedures, operational studies and efficiency reviews.",
    intro:
      "Administrative consultancy in Abu Dhabi for organisations that want clearer structure, simpler processes and more efficient operations.",
    overview: [
      "Administrative consultancy helps an organisation work the way it intends to. We look at how your business is structured, how work moves through it and how decisions and procedures are documented.",
      "From there, we recommend practical changes that make daily operations clearer and more efficient, and that your team can sustain as the business grows.",
    ],
    deliverables: [
      {
        title: "Organisational structure",
        text: "Reporting lines, roles and responsibilities designed around how your business needs to work.",
        icon: "network",
      },
      {
        title: "Process mapping and improvement",
        text: "We map how work flows today, find delays and duplication, and design a simpler way forward.",
        icon: "workflow",
      },
      {
        title: "Policies and procedures",
        text: "Clear, practical policies and procedures your team can follow consistently.",
        icon: "fileText",
      },
      {
        title: "Operational studies",
        text: "Focused studies of specific operations, with findings and recommendations you can act on.",
        icon: "fileSearch",
      },
      {
        title: "Efficiency reviews",
        text: "A structured review of where time, effort and cost can be reduced without losing quality.",
        icon: "gauge",
      },
    ],
    audience: [
      "Growing businesses whose structure has not kept pace with their size",
      "Owners and managers who want clearer roles and responsibilities",
      "Organisations preparing for expansion, restructuring or new leadership",
      "Teams that rely on informal processes and want them documented",
    ],
    engagement: [
      {
        title: "Discover",
        text: "We meet with leadership, review existing documents and understand how the organisation operates today.",
      },
      {
        title: "Analyse",
        text: "We map structures and processes, identify gaps and inefficiencies, and test findings with your team.",
      },
      {
        title: "Plan",
        text: "We recommend a clear structure, improved processes and the policies needed to support them.",
      },
      {
        title: "Deliver",
        text: "We present the recommendations and, where agreed, support the roll-out and review how changes work in practice.",
      },
    ],
    faqs: [
      {
        question: "What information will you need from us?",
        answer:
          "Usually existing organisation charts, job descriptions, policies and any documented processes. If little is written down, that is fine: interviews and workshops with your team fill the gaps.",
      },
      {
        question: "Will the work disrupt our day-to-day operations?",
        answer:
          "We plan interviews and workshops around your schedule and keep the time asked of your team focused. The aim is to improve operations, not interrupt them.",
      },
      {
        question: "What do we receive at the end?",
        answer:
          "Written findings and recommendations, with supporting material such as organisation charts, process maps or draft policies, depending on the agreed scope.",
      },
      {
        question: "Can the work focus on a single department or process?",
        answer:
          "Yes. The scope is agreed at the start and can cover the whole organisation or one area, such as a single department or core process.",
      },
      gettingStarted,
    ],
  },
  {
    slug: "marketing-consultancy",
    number: "02",
    title: "Marketing Consultancy",
    summary:
      "Market research, feasibility studies and positioning, so you know who to reach, what to say and where to focus.",
    icon: "marketing",
    metaDescription:
      "Marketing consultancy in Abu Dhabi and the UAE: market research, feasibility studies, customer and competitor analysis, positioning and go-to-market planning.",
    intro:
      "Marketing consultancy in Abu Dhabi and across the UAE, built on research, evidence and a clear plan for reaching the right customers.",
    overview: [
      "Marketing consultancy gives your decisions a stronger foundation. We research markets, customers and competitors, and test whether an opportunity is viable before you commit to it.",
      "We then turn what we learn into clear positioning and practical go-to-market plans for businesses in Abu Dhabi and across the UAE.",
    ],
    deliverables: [
      {
        title: "Market research",
        text: "Evidence on market size, trends and demand, so decisions rest on facts rather than assumptions.",
        icon: "chartColumn",
      },
      {
        title: "Feasibility studies",
        text: "An objective assessment of whether a product, service or market entry is commercially viable.",
        icon: "clipboardCheck",
      },
      {
        title: "Customer and competitor analysis",
        text: "Who your customers are, what they value, and how competitors are positioned to win them.",
        icon: "users",
      },
      {
        title: "Positioning and messaging",
        text: "A clear position in the market and messages that explain why customers should choose you.",
        icon: "target",
      },
      {
        title: "Go-to-market planning",
        text: "A practical plan for launching or growing in a market: audiences, channels, priorities and timing.",
        icon: "route",
      },
      {
        title: "Marketing performance reviews",
        text: "An assessment of what current marketing achieves, and where effort and budget should change.",
        icon: "chartLine",
      },
    ],
    audience: [
      "Businesses planning to enter the Abu Dhabi or wider UAE market",
      "Companies launching a new product or service",
      "Organisations whose marketing is active but not clearly working",
      "Owners who want evidence before committing budget to a new opportunity",
    ],
    engagement: [
      {
        title: "Discover",
        text: "We agree the questions the work must answer and understand your business, offer and goals.",
      },
      {
        title: "Analyse",
        text: "We gather and analyse the market, customer and competitor information relevant to those questions.",
      },
      {
        title: "Plan",
        text: "We turn findings into recommendations: positioning, priorities and a practical go-to-market plan.",
      },
      {
        title: "Deliver",
        text: "We present the findings, hand over the documentation and, where agreed, review progress as plans are put into action.",
      },
    ],
    faqs: [
      {
        question: "What is the difference between market research and a feasibility study?",
        answer:
          "Market research describes a market: its size, customers, competitors and trends. A feasibility study uses that kind of evidence to answer a specific question, such as whether a new product or location is likely to be viable.",
      },
      {
        question: "Can you work with our existing marketing team?",
        answer:
          "Yes. We can work alongside your team, providing research, an independent review or a plan they can carry forward.",
      },
      {
        question: "What does the final deliverable look like?",
        answer:
          "Typically a written report or presentation with findings, conclusions and recommendations, sized to the questions agreed at the start.",
      },
      {
        question: "Which markets does the research cover?",
        answer:
          "The research focuses on the markets you want to understand, whether that is Abu Dhabi, the wider UAE or a specific customer segment.",
      },
      gettingStarted,
    ],
  },
  {
    slug: "project-management",
    number: "03",
    title: "Project Management",
    summary:
      "Planning, scope, budget and risk control that keep projects organised and stakeholders informed.",
    icon: "project",
    metaDescription:
      "Project management services in Abu Dhabi: planning and scheduling, scope and budget control, risk control, progress reporting, stakeholder coordination and project recovery.",
    intro:
      "Project management services in Abu Dhabi that bring structure, control and clear reporting to the projects that matter to your business.",
    overview: [
      "Project management brings structure and control to important work. We plan and schedule projects, control scope, budget and risk, and keep stakeholders informed.",
      "The result is a project where progress is visible, responsibilities are clear and issues are raised early enough to act on.",
    ],
    // Exact wording required by the brief. Do not alter.
    note: "Construction project management consultancy will be offered once the required classification is complete.",
    deliverables: [
      {
        title: "Project planning and scheduling",
        text: "Clear plans, milestones and schedules that set out what will be done, by whom and when.",
        icon: "chartGantt",
      },
      {
        title: "Scope and budget control",
        text: "Managing changes to scope and tracking spend against budget, so decisions are made with the full picture.",
        icon: "sliders",
      },
      {
        title: "Risk control",
        text: "Identifying, assessing and actively managing the risks that could affect delivery.",
        icon: "shieldCheck",
      },
      {
        title: "Progress reporting",
        text: "Regular, straightforward reporting that shows where the project stands and what needs attention.",
        icon: "fileChart",
      },
      {
        title: "Stakeholder coordination",
        text: "Keeping owners, teams and external parties aligned on priorities, decisions and responsibilities.",
        icon: "users",
      },
      {
        title: "Project recovery",
        text: "A structured review of projects that are off track, and a realistic plan to bring them back under control.",
        icon: "lifeBuoy",
      },
    ],
    audience: [
      "Organisations running projects without a dedicated project manager",
      "Businesses delivering change, systems or expansion projects",
      "Project owners who want independent progress reporting",
      "Teams with a project that has fallen behind schedule or over budget",
    ],
    engagement: [
      {
        title: "Discover",
        text: "We understand the project's objectives, current status, constraints and the people involved.",
      },
      {
        title: "Analyse",
        text: "We review plans, budgets and risks to establish a realistic baseline.",
      },
      {
        title: "Plan",
        text: "We agree the schedule, controls, reporting rhythm and responsibilities.",
      },
      {
        title: "Deliver",
        text: "We manage, monitor and report on the project, adjusting the plan as circumstances change.",
      },
    ],
    faqs: [
      {
        question: "Can you take over a project that is already running?",
        answer:
          "Yes. We start by reviewing where the project stands, then agree controls and reporting going forward. For a project that is off track, this becomes a recovery plan.",
      },
      {
        question: "How will we know how the project is progressing?",
        answer:
          "Through progress reports in an agreed format and frequency, covering schedule, budget, risks and any decisions needed from you.",
      },
      {
        question: "Do you work with our internal team or replace it?",
        answer:
          "We work with your team. Depending on the agreed scope, we can lead the project or support an internal project manager.",
      },
      {
        question: "What makes a project suitable for recovery support?",
        answer:
          "Typical signs are missed milestones, unclear ownership, growing costs or reporting that no longer reflects reality. A short review establishes whether a recovery plan is needed.",
      },
      gettingStarted,
    ],
  },
];

export const serviceHref = (slug: string) => `/services/${slug}`;

export const getService = (slug: string) => services.find((s) => s.slug === slug);

/** Options for the contact form, in display order. */
export const serviceOptions = [...services.map((s) => s.title), "Not sure yet"] as const;
