import { serviceOptions } from "@/data/services";

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

export const emptyEnquiry: EnquiryValues = {
  name: "",
  company: "",
  email: "",
  phone: "",
  service: "Not sure yet",
  message: "",
  website: "",
};

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE = /^[+()\d\s-]{7,20}$/;

export function validateEnquiry(values: EnquiryValues): FieldErrors {
  const errors: FieldErrors = {};
  const name = values.name.trim();
  const email = values.email.trim();
  const phone = values.phone.trim();
  const message = values.message.trim();

  if (!name) errors.name = "Enter your full name.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (values.company.trim().length > 160) errors.company = "Company must be 160 characters or fewer.";

  if (!email) errors.email = "Enter your email address.";
  else if (!EMAIL.test(email) || email.length > 200)
    errors.email = "Enter a valid email address, like name@company.ae.";

  if (phone && !PHONE.test(phone)) errors.phone = "Enter a valid phone number, or leave this field blank.";

  if (!(serviceOptions as readonly string[]).includes(values.service)) errors.service = "Choose a service.";

  if (message.length < MESSAGE_MIN) errors.message = `Enter a message of at least ${MESSAGE_MIN} characters.`;
  else if (message.length > 5000) errors.message = "Message must be 5,000 characters or fewer.";

  return errors;
}
