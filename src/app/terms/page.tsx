import type { Metadata } from "next";
import { terms } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: terms.metaTitle,
  description: terms.metaDescription,
};

export default function TermsPage() {
  return <LegalDocument page={terms} />;
}
