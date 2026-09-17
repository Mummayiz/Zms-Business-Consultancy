import { approach as homeApproach } from "./home";

export type Stage = {
  title: string;
  summary: string;
  happens: string;
  receives: string;
  includes: string[];
};

export const approachPage = {
  metaTitle: "How we work",
  metaDescription:
    "How ZMS works: a four-stage consultancy approach — discover, analyse, plan and deliver — for businesses in Abu Dhabi and across the UAE.",
  header: {
    label: "Approach",
    title: "How we work",
    intro:
      "Every ZMS engagement follows the same four stages. The depth of each stage depends on the work, but the structure stays the same, so you always know where things stand.",
  },
  overview: {
    label: "Four stages",
    title: "From first conversation to delivery",
    steps: homeApproach.steps,
  },
  stagesTitle: "Each stage in detail",
  stages: [
    {
      title: "Discover",
      summary: "Understand the business and agree what the work must achieve.",
      happens:
        "We meet with you to understand your business, your objectives and the question or problem behind the engagement. We review the information you already have and agree what success looks like.",
      receives: "A shared understanding of your objectives, and an agreed scope for the work.",
      includes: [
        "An initial consultation",
        "Review of existing documents and data",
        "Conversations with key people",
        "An agreed scope and timeline",
      ],
    },
    {
      title: "Analyse",
      summary: "Establish the facts and separate symptoms from causes.",
      happens:
        "We gather the facts about operations, markets, customers or project status, and analyse them to find the issues that matter most.",
      receives: "Clear findings, backed by evidence, on what is working and what needs to change.",
      includes: [
        "Interviews and workshops",
        "Process, market or project analysis",
        "Identification of gaps, risks and opportunities",
        "A review of findings with you",
      ],
    },
    {
      title: "Plan",
      summary: "Turn findings into a practical plan your team can act on.",
      happens:
        "We turn the findings into practical recommendations and a plan with clear priorities, responsibilities and measures of progress.",
      receives: "A written plan with priorities set out clearly and responsibilities agreed.",
      includes: [
        "Recommendations and options",
        "Priorities and sequencing",
        "Roles and responsibilities",
        "Measures to track progress",
      ],
    },
    {
      title: "Deliver",
      summary: "Put the plan into action and keep progress visible.",
      happens:
        "We present the plan and, where agreed, support implementation, reviewing progress and adjusting the plan as circumstances change.",
      receives: "Final deliverables and, where agreed, ongoing support and progress reviews.",
      includes: [
        "Presentation of recommendations",
        "Handover of documentation",
        "Implementation support, where agreed",
        "Progress reviews",
      ],
    },
  ] satisfies Stage[],
};
