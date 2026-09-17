import { z } from "zod";
import { MESSAGE_MAX, validateEnquiry, type EnquiryField, type FieldErrors } from "@/lib/enquiry";

/*
 * Server-side validation for /api/contact.
 * zod checks the payload shape and normalises values; the field rules come
 * from lib/enquiry.ts so the browser and the API can never disagree.
 * Keep this module out of client components: it would add ~90KB to the bundle.
 */

const field = (max: number) => z.string().max(max).optional().default("");

export const enquirySchema = z
  .object({
    name: field(400),
    company: field(400),
    email: field(400),
    phone: field(100),
    service: field(200),
    message: field(MESSAGE_MAX * 2),
    website: field(400),
  })
  .transform((values) => ({
    name: values.name.trim(),
    company: values.company.trim(),
    email: values.email.trim(),
    phone: values.phone.trim(),
    service: values.service.trim(),
    message: values.message.trim(),
    website: values.website.trim(),
  }))
  .superRefine((values, ctx) => {
    for (const [path, message] of Object.entries(validateEnquiry(values))) {
      ctx.addIssue({ code: "custom", path: [path], message });
    }
  });

export type Enquiry = z.output<typeof enquirySchema>;

/** First error message per field. */
export function toFieldErrors(error: z.ZodError): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of error.issues) {
    const key = issue.path[0] as EnquiryField | undefined;
    if (key && key !== ("website" as string) && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}
