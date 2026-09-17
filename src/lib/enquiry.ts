import { serviceOptions } from "@/data/services";

/*
 * Single source of truth for enquiry field rules and messages.
 * Deliberately dependency-free so the contact form does not ship a
 * validation library to the browser. The server wraps these same rules in a
 * zod schema (see lib/enquiry-schema.ts), so the rules exist in one place.
 */

export type EnquiryValues = {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
  /** Honeypot: must stay empty. */
  website: string;
};

export type EnquiryField = Exclude<keyof EnquiryValues, "website">;
export type FieldErrors = Partial<Record<EnquiryField, string>>;

export const MESSAGE_MIN = 20;
export const MESSAGE_MAX = 5000;

export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
export const PHONE = /^[+()\d\s-]{7,20}$/;

export const emptyEnquiry: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "Not sure yet",
  message: "",
  website: "",
};

export const FIELD_ORDER: EnquiryField[] = ["name", "company", "email", "phone", "service", "message"];

const str = (value: unknown) => (typeof value === "string" ? value.trim() : "");

/** Field-level validation. Returns one message per invalid field. */
export function validateEnquiry(values: Partial<EnquiryValues> | unknown): FieldErrors {
  const v = (values ?? {}) as Partial<EnquiryValues>;
  const errors: FieldErrors = {};

  const name = str(v.name);
  if (!name) errors.name = "Enter your full name.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (str(v.company).length > 160) errors.company = "Company must be 160 characters or fewer.";

  const email = str(v.email);
  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email) || email.length > 200)
    errors.email = "Enter a valid email address, like name@company.ae.";

  const phone = str(v.phone);
  if (phone && !PHONE.test(phone)) errors.phone = "Enter a valid phone number, or leave this field blank.";

  if (!(serviceOptions as readonly string[]).includes(str(v.service))) errors.service = "Choose a service.";

  const message = str(v.message);
  if (message.length < MESSAGE_MIN) errors.message = `Enter a message of at least ${MESSAGE_MIN} characters.`;
  else if (message.length > MESSAGE_MAX) errors.message = "Message must be 5,000 characters or fewer.";

  return errors;
}

/** True when the hidden honeypot field was filled in. */
export function isHoneypotFilled(body: unknown): boolean {
  return typeof body === "object" && body !== null && str((body as { website?: unknown }).website) !== "";
}
