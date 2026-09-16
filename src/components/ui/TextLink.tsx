import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ReactNode } from "react";

/** Inline navy link with a gold underline and a travelling arrow. */
export function TextLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group inline-flex items-center gap-2 border-b border-gold pb-1 text-[0.875rem] font-semibold text-navy ${className}`}
    >
      {children}
      <ArrowRight
        aria-hidden
        strokeWidth={1.75}
        className="h-4 w-4 transition-transform duration-200 ease-zms group-hover:translate-x-1"
      />
    </Link>
  );
}
