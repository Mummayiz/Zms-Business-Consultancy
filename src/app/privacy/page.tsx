import { pageMetadata } from "@/lib/seo";
import { privacy } from "@/data/legal";
import { LegalDocument } from "@/components/legal/LegalDocument";

export const metadata = pageMetadata({
  title: privacy.metaTitle,
  description: privacy.metaDescription,
  path: "/privacy",
});

export default function PrivacyPage() {
  return <LegalDocument page={privacy} />;
}
