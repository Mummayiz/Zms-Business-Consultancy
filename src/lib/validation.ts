import { z } from "zod";
import { serviceOptions } from "@/data/services";

/*
 * Enquiry validation shared by the contact form (client) and /api/contact (server).
 */

export const MESSAGE_MIN = 20;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

const text = () => z.string().optional().default("");

export const enquirySchema = z.object({
  name: z
    .string({ error: "Enter your full name." })
    .trim()
    .min(1, "Enter your full name.")
    .max(120, "Name must be 120 characters or fewer."),
  company: text().pipe(z.string().trim().max(160, "Company must be 160 characters or fewer.")),
  email: z
    .string({ error: "Enter your email address." })
    .trim()
    .min(1, "Enter your email address.")
    .max(200, "Enter a valid email address, like name@company.ae.")
    .regex(EMAIL, "Enter a valid email address, like name@company.ae."),
  phone: text().pipe(
    z
      .string()
      .trim()
      .refine((v) => v === "" || PHONE.test(v), "Enter a valid phone number, or leave this field blank."),
  ),
  service: z
    .string({ error: "Choose a service." })
    .refine((v) => (serviceOptions as readonly string[]).includes(v), "Choose a service."),
  message: z
    .string({ error: `Enter a message of at least ${MESSAGE_MIN} characters.` })
    .trim()
    .min(MESSAGE_MIN, `Enter a message of at least ${MESSAGE_MIN} characters.`)
    .max(5000, "Message must be 5,000 characters or fewer."),
  /** Honeypot: must stay empty. Checked separately so bots get no signal. */
  website: text(),
});

export type Enquiry = z.output<typeof enquirySchema>;
/** Raw form state: every field as a string. */
export type EnquiryValues = Record<keyof Enquiry, string>;
export type EnquiryField = Exclude<keyof Enquiry, "website">;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "Not sure yet",
  message: "",
  website: "",
};

/** First error message for each field, keyed by field name. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const field = issue.path[0] as EnquiryField | undefined;
    if (field && field !== ("website" as string) && !errors[field]) errors[field] = issue.message;
  }
  return errors;
}

export function validateEnquiry(values: unknown): FieldErrors {
  const result = enquirySchema.safeParse(values);
  return result.success ? {} : toFieldErrors(result.error);
}
