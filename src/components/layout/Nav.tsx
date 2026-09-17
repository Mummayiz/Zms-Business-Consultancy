"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { isActive, primaryCta, primaryNav } from "@/data/navigation";
import { site } from "@/config/site";
import { ButtonLink } from "@/components/ui/Button";
import { MobileMenu } from "./MobileMenu";

const linkBase =
  "relative inline-flex items-center py-2 text-[0.90625rem] font-medium text-navy after:absolute after:inset-x-0 after:bottom-0 after:origin-left after:bg-gold after:transition-transform after:duration-200 after:ease-zms";

function underline(active: boolean) {
  return active ? "after:h-0.5 after:scale-x-100" : "after:h-px after:scale-x-0 hover:after:scale-x-100";
}

export function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b border-navy/12 bg-ivory transition-shadow duration-200 ${
        scrolled ? "shadow-[0_6px_18px_-12px_rgb(8_31_45/0.25)]" : ""
      }`}
    >
      <div className="wrap flex h-[72px] items-center justify-between gap-8 lg:h-[84px]">
        <Link href="/" className="shrink-0" aria-label={`${site.name} — home`}>
          <Image
            src="/brand/zms-nav-original.png"
            alt="ZMS"
            width={1413}
            height={535}
            preload
            sizes="140px"
            className="h-10 w-auto lg:h-12"
          />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {primaryNav.map((item) =>
              item.children ? (
                <li key={item.href}>
                  <ServicesDropdown
                    label={item.label}
                    href={item.href}
                    items={item.children}
                    pathname={pathname}
                  />
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isActive(pathname, item.href) ? "page" : undefined}
                    className={`${linkBase} ${underline(isActive(pathname, item.href))}`}
                  >
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="hidden lg:block">
          <ButtonLink href={primaryCta.href} variant="primary" className="min-h-11 px-5 py-3">
            {primaryCta.label}
          </ButtonLink>
        </div>

        <MobileMenu pathname={pathname} />
      </div>
    </header>
  );
}

function ServicesDropdown({
  label,
  href,
  items,
  pathname,
}: {
  label: string;
  href: string;
  items: { label: string; href: string }[];
  pathname: string;
}) {
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const canHover = useRef(false);
  const active = isActive(pathname, href);

  /*
   * Open on hover only on devices that really hover. On a touch screen a tap
   * fires mouseenter and click together, which would open and immediately
   * close the menu — so touch users get click-to-open instead.
   */
  useEffect(() => {
    canHover.current = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }, []);

  useEffect(() => {
    if (!open) return;
    const onPointer = (e: PointerEvent) => {
      if (!wrapperRef.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointer);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onPointer);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrapperRef}
      className="relative flex items-center"
      onMouseEnter={() => canHover.current && setOpen(true)}
      onMouseLeave={() => canHover.current && setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <Link
        href={href}
        aria-current={pathname === href ? "page" : undefined}
        className={`${linkBase} ${underline(active)}`}
      >
        {label}
      </Link>
      <button
        ref={toggleRef}
        type="button"
        aria-expanded={open}
        aria-controls={menuId}
        aria-label={`${open ? "Hide" : "Show"} ${label.toLowerCase()} menu`}
        onClick={() => setOpen((v) => !v)}
        className="-mr-2 ml-0.5 inline-flex h-8 w-8 items-center justify-center rounded-ui text-navy"
      >
        <ChevronDown
          aria-hidden
          strokeWidth={1.75}
          className={`h-4 w-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <div
        id={menuId}
        hidden={!open}
        className="absolute top-full left-1/2 w-72 -translate-x-1/2 pt-3"
      >
        <ul className="rounded-card border border-navy/12 bg-ivory py-2 shadow-[0_18px_40px_-24px_rgb(8_31_45/0.35)]">
          {items.map((item) => {
            const current = pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={current ? "page" : undefined}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 border-l-2 px-5 py-3 text-[0.90625rem] font-medium text-navy transition-colors duration-200 hover:border-gold ${
                    current ? "border-gold" : "border-transparent"
                  }`}
                >
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
