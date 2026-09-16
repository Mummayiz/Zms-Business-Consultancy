import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { footerNav } from "@/data/navigation";
import { licenceShort, site } from "@/config/site";

const linkClass = "transition-colors duration-200 hover:text-gold";

function ContactLink({ href, children }: { href: string; children: ReactNode }) {
  // Placeholder numbers must not be dialable or messageable.
  if (site.isPlaceholder) return <span>{children}</span>;
  return (
    <a href={href} className={linkClass}>
      {children}
    </a>
  );
}

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="surface-navy border-t border-ivory/16 bg-navy text-ivory">
      <div className="wrap pt-16 pb-8 lg:pt-20">
        <div className="grid gap-12 border-b border-ivory/16 pb-12 sm:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-4">
            <Link href="/" aria-label={`${site.name} — home`} className="inline-block">
              <Image
                src="/brand/zms-logo-original-reversed.png"
                alt={`${site.name} — ${site.tagline}`}
                width={845}
                height={935}
                sizes="170px"
                className="h-auto w-[150px] lg:w-[170px]"
              />
            </Link>
          </div>

          <FooterColumn title="Company" className="lg:col-span-2">
            {footerNav.company.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Services" className="lg:col-span-3">
            {footerNav.services.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </FooterColumn>

          <FooterColumn title="Contact" className="lg:col-span-3">
            <li>{site.location}</li>
            <li>
              <a href={`mailto:${site.email}`} className={linkClass}>
                {site.email}
              </a>
            </li>
            <li>
              <ContactLink href={`tel:${site.phone.replace(/\s+/g, "")}`}>{site.phone}</ContactLink>
            </li>
            <li>
              <ContactLink href={`https://wa.me/${site.whatsapp}`}>WhatsApp</ContactLink>
            </li>
          </FooterColumn>
        </div>

        <div className="flex flex-col gap-4 pt-6 text-[0.8125rem] leading-relaxed md:flex-row md:items-center md:justify-between">
          <p>
            © {year} {site.legalName}
            <span className="mx-3 hidden text-gold md:inline" aria-hidden>
              |
            </span>
            <span className="block md:inline">{licenceShort}</span>
          </p>
          <ul className="flex gap-6">
            {footerNav.legal.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className={linkClass}>
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  className = "",
  children,
}: {
  title: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div className={className}>
      <h2 className="type-label mb-5 text-gold">{title}</h2>
      <ul className="flex flex-col gap-3 text-[0.9375rem]">{children}</ul>
    </div>
  );
}
