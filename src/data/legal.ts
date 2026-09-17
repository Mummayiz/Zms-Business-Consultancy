import { licenceFull, site } from "@/config/site";

export type LegalSection = { title: string; paragraphs: string[]; list?: string[] };
export type LegalPage = {
  metaTitle: string;
  metaDescription: string;
  title: string;
  intro: string;
  // TODO: review — set the real "last updated" date after legal review.
  lastUpdated: string;
  sections: LegalSection[];
};

/*
 * TODO: review — both documents are plain-language drafts written without
 * legal advice. They must be reviewed by a qualified UAE legal adviser before launch.
 */

export const privacy: LegalPage = {
  metaTitle: "Privacy policy",
  metaDescription: `How ${site.name} collects and uses personal information submitted through this website.`,
  title: "Privacy policy",
  intro: `This policy explains how ${site.legalName} handles personal information submitted through this website.`,
  lastUpdated: "To be confirmed",
  sections: [
    {
      title: "Who we are",
      paragraphs: [
        `This website is operated by ${site.legalName}, ${site.location}. ${licenceFull}.`,
      ],
    },
    {
      title: "Information we collect",
      paragraphs: ["When you send an enquiry through our contact form, we collect the information you provide:"],
      list: [
        "Your full name",
        "Your company name, if given",
        "Your email address",
        "Your phone number, if given",
        "The service you are interested in",
        "Your message",
      ],
    },
    {
      title: "How we use your information",
      paragraphs: [
        "We use this information to respond to your enquiry, to arrange a consultation and, if you become a client, to provide our services. We do not sell your personal information.",
      ],
    },
    {
      title: "Service providers",
      paragraphs: [
        "We use third-party providers to host this website and to deliver enquiry emails. They process information only as needed to provide those services to us.",
      ],
    },
    {
      title: "Cookies and analytics",
      // TODO: review — update if analytics or other cookies are added.
      paragraphs: ["This website does not use advertising or analytics cookies."],
    },
    {
      title: "How long we keep information",
      // TODO: review — confirm the retention period with the client and legal adviser.
      paragraphs: [
        "We keep enquiry information only for as long as it is needed for the purposes described in this policy, or as required by law.",
      ],
    },
    {
      title: "Your choices",
      // TODO: review — confirm data subject rights wording under applicable UAE law.
      paragraphs: [
        "You can ask us to tell you what personal information we hold about you, to correct it, or to delete it, subject to any legal obligations we have to keep it.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [`For any question about this policy, email ${site.email}.`],
    },
  ],
};

export const terms: LegalPage = {
  metaTitle: "Terms of use",
  metaDescription: `The terms that apply to using the ${site.name} website.`,
  title: "Terms of use",
  intro: `These terms apply to your use of this website, operated by ${site.legalName}. By using the website, you accept them.`,
  lastUpdated: "To be confirmed",
  sections: [
    {
      title: "About this website",
      paragraphs: [
        `This website provides general information about ${site.name} and its services. ${licenceFull}.`,
      ],
    },
    {
      title: "No professional advice",
      paragraphs: [
        "The content on this website is for general information only. It is not professional advice and should not be relied on for any specific decision. Advice is provided only under a written engagement agreed with us.",
      ],
    },
    {
      title: "Enquiries",
      paragraphs: [
        "Sending an enquiry does not create a client relationship. An engagement begins only when its scope and terms are agreed in writing.",
      ],
    },
    {
      title: "Intellectual property",
      // TODO: review — confirm ownership of the logo, artwork and website content.
      paragraphs: [
        `The ZMS name, logo, artwork and website content belong to ${site.legalName} and may not be copied or reused without permission.`,
      ],
    },
    {
      title: "Links to other websites",
      paragraphs: [
        "Where this website links to other websites, we are not responsible for their content or practices.",
      ],
    },
    {
      title: "Limitation of liability",
      // TODO: review — liability wording requires legal review.
      paragraphs: [
        "We take care to keep this website accurate and available, but we cannot promise that it will always be error-free or uninterrupted. To the extent permitted by law, we are not liable for any loss arising from the use of this website.",
      ],
    },
    {
      title: "Governing law",
      // TODO: review — confirm governing law and jurisdiction.
      paragraphs: [
        "These terms are governed by the laws of the Emirate of Abu Dhabi and the federal laws of the United Arab Emirates.",
      ],
    },
    {
      title: "Changes to these terms",
      paragraphs: ["We may update these terms from time to time. The current version is always published on this page."],
    },
  ],
};
