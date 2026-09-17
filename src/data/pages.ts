// Copy for About, Services overview, Contact and 404.

export const about = {
  metaTitle: "About",
  metaDescription:
    "About ZMS Business Management Consultancy, a licensed business management consultancy in Abu Dhabi serving organisations across the UAE.",
  header: {
    label: "About ZMS",
    title: "A consultancy built on structure and clear direction",
    intro:
      "ZMS Business Management Consultancy helps organisations in Abu Dhabi and across the UAE work with more structure, clearer direction and steady progress.",
  },
  who: {
    label: "Who we are",
    title: "Business management consultancy in Abu Dhabi",
    paragraphs: [
      "ZMS Business Management Consultancy is a licensed consultancy based in Abu Dhabi. We provide administrative consultancy, marketing consultancy and project management services to organisations in Abu Dhabi and across the UAE.",
      "Our work follows a clear method: understand the business, analyse the facts, agree a practical plan and support delivery. It is designed to give owners and managers the clarity they need to make confident decisions.",
    ],
  },
  // TODO: review — mission, vision and values are proposed wording, not supplied by the client.
  mission: {
    label: "Mission",
    text: "To give organisations the structure, insight and planning they need to make confident decisions and achieve steady, measurable progress.",
  },
  vision: {
    label: "Vision",
    text: "To be a trusted consultancy partner for businesses in Abu Dhabi and across the UAE, recognised for clear thinking and practical recommendations.",
  },
  values: {
    label: "Values",
    title: "How we work with clients",
    items: [
      {
        title: "Clarity",
        text: "We explain findings and recommendations in plain language, so decisions are easy to understand and act on.",
      },
      {
        title: "Integrity",
        text: "We give honest assessments, even when the answer is not the one expected.",
      },
      {
        title: "Practicality",
        text: "We recommend what can realistically be achieved with the resources available.",
      },
      {
        title: "Partnership",
        text: "We work alongside your team and respect that the final decisions are yours.",
      },
    ],
  },
  licensing: {
    label: "Licensing",
    title: "A licensed Abu Dhabi consultancy",
  },
};

export const servicesOverview = {
  metaTitle: "Services",
  metaDescription:
    "Business consultancy services in Abu Dhabi and the UAE: administrative consultancy, marketing consultancy and project management.",
  header: {
    label: "Services",
    title: "Consultancy services for growing organisations",
    intro:
      "Three focused services for organisations in Abu Dhabi and across the UAE, each built on structure, evidence and a clear plan.",
  },
  listTitle: "Our three services",
  together: {
    label: "Working together",
    title: "One approach across every service",
    paragraphs: [
      "Many engagements draw on more than one service. A feasibility study can lead to a go-to-market plan, and a new structure can be introduced as a managed project.",
      "Whichever service you need, the work follows the same four stages: discover, analyse, plan and deliver. You always know where the engagement stands and what comes next.",
    ],
    link: { label: "See how we work", href: "/approach" },
  },
};

export const contact = {
  metaTitle: "Contact",
  metaDescription:
    "Contact ZMS Business Management Consultancy in Abu Dhabi to book a consultation about administrative consultancy, marketing consultancy or project management.",
  header: {
    label: "Contact",
    title: "Book a consultation",
    intro: "Tell us about your business and what you want to achieve, and we can arrange a first conversation.",
  },
  details: {
    title: "Talk to us about your business",
    intro:
      "Use the form to send an enquiry, or contact us directly by email, phone or WhatsApp.",
    whatsappLabel: "Message us on WhatsApp",
  },
  form: {
    title: "Send an enquiry",
    submit: "Send enquiry",
    sending: "Sending…",
    // TODO: confirm with client — response-time wording.
    success: "Thanks — your enquiry has been sent. We'll get back to you shortly.",
    notConnected: "The form isn't connected yet — please email us directly.",
    failed: "Something went wrong and your enquiry was not sent. Please try again or email us directly.",
    invalid: "Please check the highlighted fields.",
  },
};

export const notFound = {
  label: "404",
  title: "Page not found",
  text: "The page you are looking for has moved or does not exist.",
};
