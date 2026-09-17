import { Resend } from "resend";
import type { Enquiry } from "@/lib/enquiry-schema";
import { site } from "@/config/site";

type EmailConfig = { apiKey: string; to: string; from: string };

/** Returns null unless every required environment variable is set. */
export function getEmailConfig(): EmailConfig | null {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  const to = process.env.CONTACT_TO_EMAIL?.trim();
  const from = process.env.CONTACT_FROM_EMAIL?.trim();
  if (!apiKey || !to || !from) return null;
  return { apiKey, to, from };
}

const singleLine = (value: string) => value.replace(/[\r\n]+/g, " ").trim();

export async function sendEnquiry(config: EmailConfig, enquiry: Enquiry): Promise<{ ok: boolean }> {
  const resend = new Resend(config.apiKey);

  const lines = [
    `New enquiry from the ${site.name} website`,
    "",
    `Name: ${enquiry.name}`,
    `Company: ${enquiry.company || "—"}`,
    `Email: ${enquiry.email}`,
    `Phone: ${enquiry.phone || "—"}`,
    `Service of interest: ${enquiry.service}`,
    "",
    "Message:",
    enquiry.message,
  ];

  try {
    const { error } = await resend.emails.send({
      from: config.from,
      to: config.to,
      replyTo: enquiry.email,
      subject: singleLine(`Website enquiry: ${enquiry.service} — ${enquiry.name}`).slice(0, 180),
      text: lines.join("\n"),
    });
    if (error) {
      console.error("[contact] Resend rejected the email:", error.name, error.message);
      return { ok: false };
    }
    return { ok: true };
  } catch (err) {
    console.error("[contact] Failed to send email:", err instanceof Error ? err.message : err);
    return { ok: false };
  }
}
