import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { contactSlide } from "@/data/deck";

/**
 * Three routes into the enquiry form, each carrying its service in the URL.
 * The rows echo the reference's closing pattern: bordered, numbered, with the
 * gold edge appearing on hover and focus.
 */
export function PathsForward() {
  return (
    <ul className="flex flex-col gap-4">
      {contactSlide.paths.map((path) => (
        <li key={path.title}>
          <Link
            href={path.href}
            className="group relative flex items-start gap-6 border border-navy/12 bg-white p-6 transition-colors duration-300 ease-zms hover:border-gold focus-visible:border-gold lg:p-8"
          >
            <span
              aria-hidden
              className="absolute inset-y-0 left-0 w-0.5 origin-top scale-y-0 bg-gold transition-transform duration-300 ease-zms group-hover:scale-y-100 group-focus-visible:scale-y-100"
            />
            <div className="flex-1">
              <span className="type-label text-charcoal">{path.title}</span>
              <p className="mt-3 max-w-[46ch] text-[0.9375rem] leading-relaxed">{path.text}</p>
            </div>
            <span aria-hidden className="type-label hidden text-navy/70 sm:block">
              {path.number}
            </span>
            <ArrowRight
              aria-hidden
              strokeWidth={1.5}
              className="mt-1 h-5 w-5 shrink-0 text-gold transition-transform duration-300 ease-zms group-hover:translate-x-1"
            />
          </Link>
        </li>
      ))}
    </ul>
  );
}
