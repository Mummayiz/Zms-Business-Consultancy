"use client";

import { useRef, useState, type FormEvent, type ReactNode } from "react";
import { CircleAlert, CircleCheck } from "lucide-react";
import { contact } from "@/data/pages";
import { serviceOptions } from "@/data/services";
import { site } from "@/config/site";
import { Field } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import {
  FIELD_ORDER,
  MESSAGE_MIN,
  emptyEnquiry,
  validateEnquiry,
  type EnquiryField,
  type EnquiryValues,
  type FieldErrors,
} from "@/lib/enquiry";

type Status = "idle" | "sending" | "success" | "notConnected" | "failed";

export function ContactForm() {
  const [values, setValues] = useState<EnquiryValues>(emptyEnquiry);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [touched, setTouched] = useState<Partial<Record<EnquiryField, boolean>>>({});
  const [status, setStatus] = useState<Status>("idle");
  const [showSummary, setShowSummary] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);
  const successRef = useRef<HTMLDivElement>(null);
  const { form } = contact;

  const update = (field: keyof EnquiryValues, value: string) => {
    const next = { ...values, [field]: value };
    setValues(next);
    if (field !== "website" && touched[field]) {
      setErrors((prev) => ({ ...prev, [field]: validateEnquiry(next)[field] }));
    }
  };

  const blur = (field: EnquiryField) => {
    setTouched((prev) => ({ ...prev, [field]: true }));
    setErrors((prev) => ({ ...prev, [field]: validateEnquiry(values)[field] }));
  };

  const focusFirstError = (errs: FieldErrors) => {
    const first = FIELD_ORDER.find((f) => errs[f]);
    if (!first) return;
    // Bring the summary notice into view too, then move focus to the first invalid field.
    formRef.current?.scrollIntoView({ block: "start" });
    formRef.current?.querySelector<HTMLElement>(`#enquiry-${first}`)?.focus({ preventScroll: true });
  };

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "sending") return;

    const errs = validateEnquiry(values);
    setTouched(Object.fromEntries(FIELD_ORDER.map((f) => [f, true])));
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setShowSummary(true);
      focusFirstError(errs);
      return;
    }

    setShowSummary(false);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      if (res.ok) {
        setStatus("success");
        requestAnimationFrame(() => successRef.current?.focus());
        return;
      }
      if (res.status === 503) {
        setStatus("notConnected");
        return;
      }
      if (res.status === 400) {
        const data = (await res.json().catch(() => null)) as { errors?: FieldErrors } | null;
        if (data?.errors && Object.keys(data.errors).length > 0) {
          setErrors(data.errors);
          setShowSummary(true);
          setStatus("idle");
          focusFirstError(data.errors);
          return;
        }
      }
      setStatus("failed");
    } catch {
      setStatus("failed");
    }
  }

  if (status === "success") {
    return (
      <div
        ref={successRef}
        tabIndex={-1}
        role="status"
        className="flex items-start gap-4 rounded-card border border-navy/12 bg-white p-8 focus:outline-none"
      >
        <CircleCheck aria-hidden strokeWidth={1.5} className="h-6 w-6 shrink-0 text-gold" />
        <p className="type-lead text-navy">{form.success}</p>
      </div>
    );
  }

  const sending = status === "sending";
  const fieldError = (f: EnquiryField) => (touched[f] ? errors[f] : undefined);

  return (
    <form ref={formRef} noValidate onSubmit={onSubmit} className="relative rounded-card border border-navy/12 bg-white p-6 sm:p-8 lg:p-10">
      <h2 className="type-card">{form.title}</h2>

      <div aria-live="polite" className="empty:hidden">
        {showSummary && Object.values(errors).some(Boolean) && (
          <Notice>{form.invalid}</Notice>
        )}
        {status === "notConnected" && (
          <Notice>
            {form.notConnected}{" "}
            <a href={`mailto:${site.email}`} className="border-b border-gold font-semibold">
              {site.email}
            </a>
          </Notice>
        )}
        {status === "failed" && (
          <Notice>
            {form.failed}{" "}
            <a href={`mailto:${site.email}`} className="border-b border-gold font-semibold">
              {site.email}
            </a>
          </Notice>
        )}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        <Field id="enquiry-name" label="Full name" error={fieldError("name")}>
          {(c) => (
            <input
              {...c}
              name="name"
              type="text"
              autoComplete="name"
              required
              value={values.name}
              onChange={(e) => update("name", e.target.value)}
              onBlur={() => blur("name")}
            />
          )}
        </Field>

        <Field id="enquiry-company" label="Company" optional error={fieldError("company")}>
          {(c) => (
            <input
              {...c}
              name="company"
              type="text"
              autoComplete="organization"
              value={values.company}
              onChange={(e) => update("company", e.target.value)}
              onBlur={() => blur("company")}
            />
          )}
        </Field>

        <Field id="enquiry-email" label="Email" error={fieldError("email")}>
          {(c) => (
            <input
              {...c}
              name="email"
              type="email"
              autoComplete="email"
              inputMode="email"
              required
              value={values.email}
              onChange={(e) => update("email", e.target.value)}
              onBlur={() => blur("email")}
            />
          )}
        </Field>

        <Field id="enquiry-phone" label="Phone" optional error={fieldError("phone")}>
          {(c) => (
            <input
              {...c}
              name="phone"
              type="tel"
              autoComplete="tel"
              inputMode="tel"
              value={values.phone}
              onChange={(e) => update("phone", e.target.value)}
              onBlur={() => blur("phone")}
            />
          )}
        </Field>

        <Field id="enquiry-service" label="Service of interest" error={fieldError("service")} className="sm:col-span-2">
          {(c) => (
            <select
              {...c}
              name="service"
              value={values.service}
              onChange={(e) => update("service", e.target.value)}
              onBlur={() => blur("service")}
            >
              {serviceOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
          )}
        </Field>

        <Field
          id="enquiry-message"
          label="Message"
          hint={`At least ${MESSAGE_MIN} characters.`}
          error={fieldError("message")}
          className="sm:col-span-2"
        >
          {(c) => (
            <textarea
              {...c}
              name="message"
              rows={6}
              required
              value={values.message}
              onChange={(e) => update("message", e.target.value)}
              onBlur={() => blur("message")}
              className={`${c.className} min-h-40 resize-y`}
            />
          )}
        </Field>

        {/* Honeypot: hidden from people and assistive technology */}
        <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
          <label htmlFor="enquiry-website">Leave this field empty</label>
          <input
            id="enquiry-website"
            name="website"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </div>
      </div>

      <Button type="submit" variant="primary" disabled={sending} className="mt-8 w-full sm:w-auto">
        {sending ? form.sending : form.submit}
      </Button>
    </form>
  );
}

function Notice({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="mt-6 flex items-start gap-3 rounded-ui border-2 border-navy p-4 text-[0.9375rem] leading-snug text-navy">
      <CircleAlert aria-hidden strokeWidth={1.75} className="mt-0.5 h-5 w-5 shrink-0" />
      <span>{children}</span>
    </p>
  );
}
