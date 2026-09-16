import { services, serviceHref } from "./services";

export type NavLink = { label: string; href: string };

export const primaryNav: (NavLink & { children?: NavLink[] })[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: services.map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
  },
  { label: "Approach", href: "/approach" },
  { label: "Contact", href: "/contact" },
];

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

export const primaryCta: NavLink = { label: "Book a consultation", href: "/contact" };

export const footerNav = {
  company: [
    { label: "About", href: "/about" },
    { label: "Approach", href: "/approach" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavLink[],
  services: services.map((s) => ({ label: s.title, href: serviceHref(s.slug) })),
  legal: [
    { label: "Privacy policy", href: "/privacy" },
    { label: "Terms of use", href: "/terms" },
  ] satisfies NavLink[],
};
