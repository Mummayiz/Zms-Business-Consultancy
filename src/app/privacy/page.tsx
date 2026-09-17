import type { Metadata } from "next";
import { privacy } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata: Metadata = {
  title: privacy.metaTitle,
  description: privacy.metaDescription,
};

export default function PrivacyPage() {
  return <LegalDocument page={privacy} />;
}
