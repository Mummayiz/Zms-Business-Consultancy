import { NextResponse } from "next/server";
import { enquirySchema, toFieldErrors } from "@/lib/validation";
import { getEmailConfig, sendEnquiry } from "@/lib/email";
import { contact } from "@/data/pages";

const MAX_BODY_BYTES = 20_000;

const json = (body: Record<string, unknown>, status = 200) => NextResponse.json(body, { status });

export async function POST(request: Request) {
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "too_large" }, 413);

  let body: unknown;
  try {
    const raw = await request.text();
    if (raw.length > MAX_BODY_BYTES) return json({ ok: false, code: "too_large" }, 413);
    body = JSON.parse(raw);
  } catch {
    return json({ ok: false, code: "invalid_json" }, 400);
  }

  // Honeypot: silently accept and discard anything that filled the hidden field.
  if (
    typeof body === "object" &&
    body !== null &&
    typeof (body as { website?: unknown }).website === "string" &&
    (body as { website: string }).website.trim() !== ""
  ) {
    return json({ ok: true });
  }

  const parsed = enquirySchema.safeParse(body);
  if (!parsed.success) {
    return json({ ok: false, code: "invalid", errors: toFieldErrors(parsed.error) }, 400);
  }

  // Never fake success: without email configuration the form is not connected.
  const config = getEmailConfig();
  if (!config) {
    return json({ ok: false, code: "not_configured", message: contact.form.notConnected }, 503);
  }

  const result = await sendEnquiry(config, parsed.data);
  if (!result.ok) return json({ ok: false, code: "send_failed" }, 502);

  return json({ ok: true });
}
