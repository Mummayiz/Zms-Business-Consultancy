import { pageMetadata } from "@/lib/seo";
import { terms } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = pageMetadata({
  title: terms.metaTitle,
  description: terms.metaDescription,
  path: "/terms",
});

export default function TermsPage() {
  return <LegalDocument page={terms} />;
}
