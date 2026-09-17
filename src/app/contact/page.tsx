import { pageMetadata } from "@/lib/seo";
import { Mail, MapPin, MessageCircle, Phone } from "lucide-react";
import type { ReactNode } from "react";
import { contact } from "@/data/pages";
import { site } from "@/config/site";
import { PageHeader } from "@/components/layout/PageHeader";
import { buttonClasses } from "@/components/ui/Button";
import { ContactForm } from "@/components/contact/ContactForm";
import { Reveal } from "@/components/motion/Reveal";

export const metadata = pageMetadata({
  title: contact.metaTitle,
  description: contact.metaDescription,
  path: "/contact",
});

function DetailRow({ icon, label, children }: { icon: ReactNode; label: string; children: ReactNode }) {
  return (
    <div className="flex items-start gap-4 border-b border-navy/12 py-5">
      <span className="mt-0.5 text-gold">{icon}</span>
      <div>
        <dt className="type-label text-charcoal">{label}</dt>
        <dd className="mt-1.5 font-medium text-navy">{children}</dd>
      </div>
    </div>
  );
}

export default function ContactPage() {
  const { details } = contact;
  const iconClass = "h-5 w-5";
  const telHref = `tel:${site.phone.replace(/\s+/g, "")}`;
  const whatsappHref = `https://wa.me/${site.whatsapp}`;

  return (
    <>
      <PageHeader {...contact.header} />

      <section aria-labelledby="details-title" className="section-y">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-8">
          <Reveal className="lg:col-span-5">
            <h2 id="details-title" className="type-section">
              {details.title}
            </h2>
            <p className="type-lead measure mt-5">{details.intro}</p>

            <dl className="mt-10 border-t border-navy/12">
              <DetailRow icon={<Mail aria-hidden strokeWidth={1.5} className={iconClass} />} label="Email">
                <a href={`mailto:${site.email}`} className="border-b border-gold">
                  {site.email}
                </a>
              </DetailRow>
              <DetailRow icon={<Phone aria-hidden strokeWidth={1.5} className={iconClass} />} label="Phone">
                {/* Placeholder numbers are shown but not dialable */}
                {site.isPlaceholder ? site.phone : <a href={telHref}>{site.phone}</a>}
              </DetailRow>
              <DetailRow icon={<MapPin aria-hidden strokeWidth={1.5} className={iconClass} />} label="Location">
                {site.location}
              </DetailRow>
            </dl>

            {site.isPlaceholder ? (
              <span aria-disabled="true" className={buttonClasses("primary", "mt-8 cursor-not-allowed opacity-45")}>
                <MessageCircle aria-hidden strokeWidth={1.5} className="h-4 w-4" />
                {details.whatsappLabel}
              </span>
            ) : (
              <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className={buttonClasses("primary", "mt-8")}>
                <MessageCircle aria-hidden strokeWidth={1.5} className="h-4 w-4" />
                {details.whatsappLabel}
              </a>
            )}
          </Reveal>

          <Reveal delay={0.1} className="lg:col-span-7">
            <ContactForm />
          </Reveal>
        </div>
      </section>
    </>
  );
}
