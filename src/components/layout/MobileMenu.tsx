"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Menu, X } from "lucide-react";
import { primaryCta, primaryNav } from "@/data/navigation";
import { site } from "@/config/site";
import { ease } from "@/lib/motion";
import { ButtonLink } from "@/components/ui/Button";
import { isActive } from "@/data/navigation";

const FOCUSABLE = 'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])';

export function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false);
  const openButtonRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);

  const close = () => {
    setOpen(false);
    openButtonRef.current?.focus();
  };

  useEffect(() => {
    if (!open) return;
    const panel = panelRef.current;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel?.querySelector<HTMLElement>("[data-autofocus]")?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setOpen(false);
        openButtonRef.current?.focus();
        return;
      }
      if (e.key !== "Tab" || !panel) return;
      const nodes = Array.from(panel.querySelectorAll<HTMLElement>(FOCUSABLE));
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  const linkClass = (href: string) =>
    `flex min-h-12 items-center border-l-2 pl-4 text-lg font-medium text-ivory transition-colors duration-200 hover:border-gold ${
      isActive(pathname, href) && (href !== "/services" || pathname === "/services")
        ? "border-gold"
        : "border-transparent"
    }`;

  return (
    <div className="lg:hidden">
      <button
        ref={openButtonRef}
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="inline-flex h-11 w-11 items-center justify-center rounded-ui border border-navy/40 text-navy"
      >
        <Menu aria-hidden strokeWidth={1.5} className="h-5 w-5" />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            ref={panelRef}
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="surface-navy fixed inset-0 z-50 flex flex-col overflow-y-auto bg-navy"
            initial={{ clipPath: "inset(0% 0% 100% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
            transition={{ duration: 0.4, ease }}
            data-motion
          >
            <div className="wrap flex h-[72px] shrink-0 items-center justify-between border-b border-ivory/16">
              <Link href="/" onClick={() => setOpen(false)} aria-label={`${site.name} — home`}>
                <Image
                  src="/brand/zms-nav-original-reversed.png"
                  alt="ZMS"
                  width={1413}
                  height={535}
                  sizes="120px"
                  className="h-10 w-auto"
                />
              </Link>
              <button
                type="button"
                data-autofocus
                aria-label="Close menu"
                onClick={close}
                className="inline-flex h-11 w-11 items-center justify-center rounded-ui border border-ivory/40 text-ivory"
              >
                <X aria-hidden strokeWidth={1.5} className="h-5 w-5" />
              </button>
            </div>

            <nav aria-label="Mobile" className="wrap flex flex-1 flex-col py-10">
              <ul className="flex flex-col gap-2">
                {primaryNav.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setOpen(false)}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className={linkClass(item.href)}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <ul className="mt-1 mb-3 ml-4 flex flex-col border-l border-ivory/16">
                        {item.children.map((child) => (
                          <li key={child.href}>
                            <Link
                              href={child.href}
                              onClick={() => setOpen(false)}
                              aria-current={pathname === child.href ? "page" : undefined}
                              className={`flex min-h-11 items-center pl-5 text-[0.9375rem] text-ivory transition-colors duration-200 hover:text-gold ${
                                pathname === child.href ? "text-gold" : ""
                              }`}
                            >
                              {child.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>

              <div className="mt-auto pt-10">
                <ButtonLink
                  href={primaryCta.href}
                  variant="onNavy"
                  className="w-full"
                  onClick={() => setOpen(false)}
                >
                  {primaryCta.label}
                </ButtonLink>
                <p className="mt-6 type-label text-gold">Abu Dhabi</p>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
